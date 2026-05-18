"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { quizQuestions, type QuizAnswers } from "@/lib/quizQuestions";
import QuizProgress from "@/components/QuizProgress";
import QuizQuestionCard from "@/components/QuizQuestionCard";
import QuizStageIntro from "@/components/QuizStageIntro";

type Phase =
  | "intro-1"
  | "stage-1"
  | "intro-2"
  | "stage-2"
  | "intro-3"
  | "done";

const stage1Questions = quizQuestions.filter((q) => q.stage === 1);
const stage2Questions = quizQuestions.filter((q) => q.stage === 2);

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro-1");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  // Clear any stale answers from a previous session when the quiz starts
  useEffect(() => {
    sessionStorage.removeItem("bugbite_quiz_answers");
  }, []);

  const currentQuestions = phase === "stage-1" ? stage1Questions : stage2Questions;
  const currentQuestion = currentQuestions[questionIndex];
  const stageLabel = phase === "stage-1" ? "Stage 1 of 3" : "Stage 2 of 3";

  const handleAnswer = (value: string) => {
    if (!currentQuestion) return;

    const newAnswers = { ...answers, [currentQuestion.dimension]: value };
    setAnswers(newAnswers);

    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (phase === "stage-1") {
      setPhase("intro-2");
      setQuestionIndex(0);
    } else {
      sessionStorage.setItem("bugbite_quiz_answers", JSON.stringify(newAnswers));
      setPhase("intro-3");
    }
  };

  const handleBack = () => {
    if (phase === "stage-1") {
      if (questionIndex > 0) {
        setQuestionIndex(questionIndex - 1);
      } else {
        // Back to Stage 1 intro
        setPhase("intro-1");
      }
    } else if (phase === "stage-2") {
      if (questionIndex > 0) {
        setQuestionIndex(questionIndex - 1);
      } else {
        // Back to last question of Stage 1
        setPhase("stage-1");
        setQuestionIndex(stage1Questions.length - 1);
      }
    }
  };

  const startStage = (stage: 1 | 2) => {
    setPhase(stage === 1 ? "stage-1" : "stage-2");
    setQuestionIndex(0);
  };

  const goToResult = () => {
    setPhase("done");
    router.push("/quiz/result");
  };

  // Determine if Back button should be shown
  const canGoBack =
    (phase === "stage-1" && (questionIndex > 0 || true)) ||
    (phase === "stage-2");

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      <AnimatePresence mode="wait">
        {phase === "intro-1" && (
          <QuizStageIntro key="intro-1" stage={1} onContinue={() => startStage(1)} />
        )}
        {phase === "stage-1" && currentQuestion && (
          <motion.div key="stage-1" className="w-full">
            <QuizProgress
              current={questionIndex}
              total={stage1Questions.length}
              stageLabel={stageLabel}
            />
            <AnimatePresence mode="wait">
              <QuizQuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                initialValue={answers[currentQuestion.dimension]}
                onAnswer={handleAnswer}
                onBack={canGoBack ? handleBack : undefined}
              />
            </AnimatePresence>
          </motion.div>
        )}
        {phase === "intro-2" && (
          <QuizStageIntro key="intro-2" stage={2} onContinue={() => startStage(2)} />
        )}
        {phase === "stage-2" && currentQuestion && (
          <motion.div key="stage-2" className="w-full">
            <QuizProgress
              current={questionIndex}
              total={stage2Questions.length}
              stageLabel={stageLabel}
            />
            <AnimatePresence mode="wait">
              <QuizQuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                initialValue={answers[currentQuestion.dimension]}
                onAnswer={handleAnswer}
                onBack={handleBack}
              />
            </AnimatePresence>
          </motion.div>
        )}
        {phase === "intro-3" && (
          <QuizStageIntro key="intro-3" stage={3} onContinue={goToResult} />
        )}
        {phase === "done" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="text-5xl mb-4">✨</div>
            <p className="text-[#1A3A2A]/60">Finding your spirit bug...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
