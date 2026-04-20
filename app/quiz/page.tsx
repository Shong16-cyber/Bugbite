"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { quizQuestions, type QuizAnswers } from "@/lib/quizQuestions";
import QuizProgress from "@/components/QuizProgress";
import QuizQuestionCard from "@/components/QuizQuestionCard";
import QuizStageIntro from "@/components/QuizStageIntro";

type Phase = "intro-1" | "stage-1" | "intro-2" | "stage-2" | "done";

const stage1Questions = quizQuestions.filter((q) => q.stage === 1);
const stage2Questions = quizQuestions.filter((q) => q.stage === 2);

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro-1");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentQuestions = phase === "stage-1" ? stage1Questions : stage2Questions;
  const currentQuestion = currentQuestions[questionIndex];
  const stageLabel = phase === "stage-1" ? "Stage 1 of 2" : "Stage 2 of 2";

  const handleAnswer = (value: string) => {
    if (!currentQuestion) return;

    const newAnswers = { ...answers, [currentQuestion.dimension]: value };
    setAnswers(newAnswers);

    // Move to next question or next phase
    if (questionIndex < currentQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (phase === "stage-1") {
      // Stage 1 done, go to stage 2 intro
      setPhase("intro-2");
      setQuestionIndex(0);
    } else {
      // Stage 2 done - pass answers to result screen via sessionStorage
      sessionStorage.setItem("bugbite_quiz_answers", JSON.stringify(newAnswers));
      setPhase("done");
      // Issue #4 will build the result screen. For now, redirect to placeholder.
      router.push("/quiz/result");
    }
  };

  const startStage = (stage: 1 | 2) => {
    setPhase(stage === 1 ? "stage-1" : "stage-2");
    setQuestionIndex(0);
  };

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
                onAnswer={handleAnswer}
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
                onAnswer={handleAnswer}
              />
            </AnimatePresence>
          </motion.div>
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
