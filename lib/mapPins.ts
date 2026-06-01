export type MapPin = {
  id: string;
  country: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude]
  dish: string;
  insect: string;
  emoji: string;
  illustration: string;
  sceneIllustration: string;
  description: string;
  culturalContext: string;
};

export const mapPins: MapPin[] = [
  {
    id: "mexico",
    country: "Mexico",
    region: "Oaxaca, Mexico",
    coordinates: [-96.7, 17.0],
    dish: "Chapulines",
    insect: "Grasshopper",
    emoji: "🦗",
    illustration: "/illustrations/map/chapulines.png",
    sceneIllustration: "/illustrations/scenes/oaxaca-market.png",
    description:
      "Chapulines are toasted grasshoppers seasoned with lime, chili, garlic, and salt. Crunchy, tangy, and wildly addictive — often served in tacos or eaten as a snack.",
    culturalContext:
      "A staple in Oaxacan cuisine for thousands of years, chapulines are sold in markets and street stalls across the region. They're a symbol of local food culture, not a novelty.",
  },
  {
    id: "thailand",
    country: "Thailand",
    region: "Thailand",
    coordinates: [100.9, 15.9],
    dish: "Jing Leed",
    insect: "Cricket",
    emoji: "🦗",
    illustration: "/illustrations/map/jing-leed.png",
    sceneIllustration: "/illustrations/scenes/thailand-night-market.png",
    description:
      "Jing Leed are deep-fried crickets seasoned with Thai herbs and spices. Crispy on the outside, soft inside — a beloved street snack found on almost every night market cart.",
    culturalContext:
      "Cricket farming is a booming industry in Thailand, with over 20,000 farms producing insects for local consumption and export. Jing Leed is comfort food, not a dare.",
  },
  {
    id: "south_korea",
    country: "South Korea",
    region: "South Korea",
    coordinates: [127.7, 35.9],
    dish: "Beondegi",
    insect: "Silkworm pupa",
    emoji: "🐛",
    illustration: "/illustrations/map/beondegi.png",
    sceneIllustration: "/illustrations/scenes/seoul-street-cup.png",
    description:
      "Beondegi are steamed or boiled silkworm pupae, sold in paper cups at street stalls and pojangmacha (street food tents). Chewy, savory, with a distinctive earthy flavor.",
    culturalContext:
      "A nostalgic street food for many Koreans, beondegi has been popular since the 1960s. It's a high-protein snack that older generations grew up eating — though younger Koreans are more divided.",
  },
  {
    id: "southern_africa",
    country: "Zimbabwe",
    region: "Southern Africa",
    coordinates: [29.15, -19.0],
    dish: "Mopane Worms",
    insect: "Mopane caterpillar",
    emoji: "🐛",
    illustration: "/illustrations/map/mopane-worm.png",
    sceneIllustration: "/illustrations/scenes/mopane-stew.png",
    description:
      "Mopane worms are the caterpillars of the Emperor moth, harvested from mopane trees. They're dried or smoked and cooked with tomatoes, onions, and spices into a rich stew.",
    culturalContext:
      "Mopane worms are a critical protein source and a cultural staple across Zimbabwe, Botswana, and South Africa. Harvesting them is a seasonal tradition and a significant part of the local economy.",
  },
  {
    id: "japan",
    country: "Japan",
    region: "Nagano, Japan",
    coordinates: [138.2, 36.6],
    dish: "Inago no Tsukudani",
    insect: "Grasshopper",
    emoji: "🦗",
    illustration: "/illustrations/map/inago.png",
    sceneIllustration: "/illustrations/scenes/nagano-rice-bowl.png",
    description:
      "Inago are rice field grasshoppers simmered in soy sauce, sugar, and mirin until glazed and sticky. Sweet, savory, and chewy — typically eaten over rice or as a side dish.",
    culturalContext:
      "Traditional in the Nagano and Gunma prefectures, inago no tsukudani developed as a way to supplement protein in mountainous regions where fish and meat were scarce.",
  },
  {
    id: "colombia",
    country: "Colombia",
    region: "Santander, Colombia",
    coordinates: [-73.1, 6.6],
    dish: "Hormiga Culona",
    insect: "Leafcutter ant",
    emoji: "🐜",
    illustration: "/illustrations/map/hormiga-culona.png",
    sceneIllustration: "/illustrations/scenes/santander-ant-stall.png",
    description:
      "Hormiga culona — literally 'big-butt ant' — are leafcutter ant queens, toasted in salt. Nutty and crunchy, they've been compared to popcorn or salted peanuts.",
    culturalContext:
      "Considered a delicacy in Santander for centuries, hormiga culona has pre-colonial indigenous roots. Today they're sold in upscale restaurants and gourmet chocolate shops.",
  },
  {
    id: "cambodia",
    country: "Cambodia",
    region: "Skuon, Cambodia",
    coordinates: [105.1, 12.5],
    dish: "A-ping",
    insect: "Tarantula",
    emoji: "🕷️",
    illustration: "/illustrations/map/a-ping.png",
    sceneIllustration: "/illustrations/scenes/cambodia-tarantula-tray.png",
    description:
      "A-ping are fried tarantulas, crispy on the outside and soft inside. Seasoned with salt, sugar, and garlic — they taste a bit like soft-shell crab with a mild, earthy flavor.",
    culturalContext:
      "Tarantula eating originated in Skuon during the Khmer Rouge era as a survival food. Today it's a tourist attraction and local specialty — Skuon is nicknamed 'Spiderville.'",
  },
  {
    id: "australia",
    country: "Australia",
    region: "Central Australia",
    coordinates: [134.5, -25.3],
    dish: "Witchetty Grub",
    insect: "Witchetty moth larva",
    emoji: "🐛",
    illustration: "/illustrations/map/witchetty-grub.png",
    sceneIllustration: "/illustrations/scenes/australia-grub-ground.png",
    description:
      "Witchetty grubs are large white larvae eaten raw or lightly cooked in coals. Raw, they taste like almonds; cooked, the skin crisps up and the inside becomes rich and egg-like.",
    culturalContext:
      "A traditional food of Aboriginal Australians for tens of thousands of years, witchetty grubs are an important energy source in the desert environment — and a cultural touchstone.",
  },
  {
    id: "ghana",
    country: "Ghana",
    region: "Ghana",
    coordinates: [-1.0, 8.0],
    dish: "Shea Caterpillars",
    insect: "Shea caterpillar",
    emoji: "🐛",
    illustration: "/illustrations/map/shea-caterpillar.png",
    sceneIllustration: "/illustrations/scenes/ghana-caterpillar-market.png",
    description:
      "Shea caterpillars are harvested from shea trees, dried, and fried or added to soups and stews. They have a rich, smoky flavor and a satisfying chewy texture.",
    culturalContext:
      "Common across West Africa, shea caterpillars are harvested seasonally and sold in local markets. They're a key protein source, especially for rural communities.",
  },
  {
    id: "netherlands",
    country: "Netherlands",
    region: "Netherlands",
    coordinates: [5.3, 52.1],
    dish: "Insect Burgers",
    insect: "Mealworm / Buffalo worm",
    emoji: "🍔",
    illustration: "/illustrations/map/insect-burger.png",
    sceneIllustration: "/illustrations/scenes/dutch-insect-burger-lab.png",
    description:
      "The Netherlands is a global leader in insect food innovation. Mealworm and buffalo worm burgers, sold in supermarkets, taste like regular veggie burgers — just with better protein.",
    culturalContext:
      "The Dutch government and Wageningen University have invested heavily in insect farming research. The Netherlands is one of the first EU countries to approve insects for human consumption at scale.",
  },
];
