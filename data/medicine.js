const products = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    category: "herbal",
    concerns: ["stress", "immunity"],
    originalPrice: 299,
    discountPercent: 15,
    image:
      "https://himalayawellness.in/cdn/shop/products/Ashvagandha-2.jpg?v=1676957290",
    rating: 4.7,
    description:
      "Ashwagandha (Withania somnifera) is a powerful adaptogenic herb that has been used for over 3,000 years in Ayurvedic medicine. These premium-quality capsules contain 100% pure Ashwagandha root extract, carefully processed to preserve all its natural benefits. Our Ashwagandha capsules help reduce stress and anxiety, boost immunity, improve cognitive function, and enhance energy levels naturally. Each capsule contains 500mg of Ashwagandha extract standardized to contain 5% withanolides.",
    keyFeatures: [
      "100% Natural and Organic",
      "No artificial additives or preservatives",
      "Vegan-friendly capsules",
      "Lab-tested for purity and potency",
      "60 capsules per bottle (30-day supply)",
    ],
    benefits: [
      {
        title: "Reduces Stress and Anxiety",
        description:
          "Ashwagandha is proven to help lower cortisol levels, which helps reduce stress and anxiety symptoms.",
      },
      {
        title: "Boosts Immunity",
        description:
          "Enhances the body's defense against illness by increasing immunoglobulin production.",
      },
      {
        title: "Improves Cognitive Function",
        description: "Helps enhance memory, focus, and overall brain function.",
      },
      {
        title: "Increases Energy and Vitality",
        description:
          "Reduces fatigue and improves physical performance and endurance.",
      },
    ],
    usage: {
      general:
        "Take 2 capsules daily with water, preferably after meals or as directed by your healthcare professional. For best results, use consistently for at least 4-6 weeks.",
      specific: [
        "For stress relief: Take 1 capsule in the morning and 1 in the evening",
        "For sleep improvement: Take 2 capsules 1 hour before bedtime",
        "For general wellness: Take 2 capsules any time during the day",
      ],
      storage: "Store in a cool, dry place away from direct sunlight.",
    },
  },
  {
    id: 2,
    name: "Triphala Powder",
    category: "ayurvedic",
    concerns: ["digestion"],
    originalPrice: 199,
    discountPercent: 10,
    image:
      "https://king-online.co.za/files/001120/gallery/00/02/25/00022512_00010661.png",
    rating: 4.3,
    description:
      "Triphala is a traditional Ayurvedic herbal formulation consisting of three fruits: Amalaki, Bibhitaki, and Haritaki. This potent combination has been used for centuries to support digestive health and gentle detoxification. Our Triphala powder is finely ground from premium quality fruits and contains no additives or fillers, ensuring you receive the full spectrum of benefits.",
    keyFeatures: [
      "100% Pure and Natural",
      "Triple-fruit formula for comprehensive digestive support",
      "No additives, fillers, or preservatives",
      "Sustainably sourced ingredients",
      "100g powder per package",
    ],
    benefits: [
      {
        title: "Supports Digestive Health",
        description:
          "Helps maintain proper digestive function and regularity naturally.",
      },
      {
        title: "Gentle Detoxification",
        description:
          "Assists the body in eliminating toxins and waste materials.",
      },
      {
        title: "Rich in Antioxidants",
        description:
          "Contains natural compounds that help fight oxidative stress.",
      },
      {
        title: "Promotes Gut Health",
        description:
          "Supports the growth of beneficial gut bacteria for overall digestive wellness.",
      },
    ],
    usage: {
      general:
        "Take ½ to 1 teaspoon (2-4g) of Triphala powder mixed with warm water once or twice daily, preferably on an empty stomach before meals or at bedtime.",
      specific: [
        "For digestive support: Take 1 teaspoon with warm water 30 minutes before dinner",
        "For detoxification: Take ½ teaspoon with warm water first thing in the morning",
        "For general wellness: Take ½ teaspoon with warm water before bedtime",
      ],
      storage:
        "Store in an airtight container in a cool, dry place away from direct sunlight.",
    },
  },
  {
    id: 3,
    name: "Multivitamin Supplement",
    category: "supplements",
    concerns: ["immunity"],
    originalPrice: 499,
    discountPercent: 0,
    image: "https://smytten-image.gumlet.io/shop_item/THO0140AB61.jpg",
    rating: 4.5,
    description:
      "Our comprehensive Multivitamin Supplement is specially formulated to provide essential nutrients that may be missing from your daily diet. Each tablet contains a balanced blend of vitamins, minerals, and antioxidants that support overall health and vitality. This all-in-one formula helps boost immunity, increase energy levels, and promote optimal cellular function.",
    keyFeatures: [
      "Contains 23 essential vitamins and minerals",
      "Immune system support formula",
      "Once-daily dosage for convenience",
      "Vegetarian-friendly formula",
      "90 tablets per bottle (3-month supply)",
    ],
    benefits: [
      {
        title: "Supports Immune Function",
        description:
          "Contains key nutrients like Vitamin C, D, and Zinc that are essential for immune health.",
      },
      {
        title: "Boosts Energy Levels",
        description:
          "B-vitamins help convert food into energy and reduce fatigue.",
      },
      {
        title: "Promotes Heart Health",
        description:
          "Includes antioxidants and nutrients that support cardiovascular function.",
      },
      {
        title: "Supports Bone Health",
        description:
          "Contains calcium, magnesium, and vitamin D for optimal bone strength.",
      },
    ],
    usage: {
      general:
        "Take 1 tablet daily with food. Best taken with your largest meal of the day to maximize absorption.",
      specific: [
        "For immune support: Take consistently during cold and flu season",
        "For energy: Take in the morning with breakfast",
        "For general wellness: Take any time of day with food",
      ],
      storage:
        "Keep tightly closed in the original container, stored at room temperature.",
    },
  },
  {
    id: 4,
    name: "Chamomile Tea",
    category: "herbal",
    concerns: ["stress", "sleep"],
    originalPrice: 249,
    discountPercent: 12,
    image: "https://m.media-amazon.com/images/I/618-BI6hasL.jpg",
    rating: 4.6,
    description:
      "Our premium Chamomile Tea is crafted from handpicked, whole chamomile flowers to deliver a soothing, calming experience with every cup. Chamomile has been used for centuries to promote relaxation, reduce stress, and support healthy sleep patterns. Each tea bag contains pure chamomile flowers with no artificial flavors or additives, providing a naturally sweet, apple-like aroma and taste.",
    keyFeatures: [
      "100% Pure Chamomile Flowers",
      "No artificial flavors or preservatives",
      "Individually wrapped tea bags for freshness",
      "Biodegradable tea bags",
      "25 tea bags per package",
    ],
    benefits: [
      {
        title: "Promotes Relaxation",
        description: "Helps calm the mind and reduce stress after a long day.",
      },
      {
        title: "Supports Healthy Sleep",
        description:
          "Natural compounds help improve sleep quality and reduce insomnia.",
      },
      {
        title: "Aids Digestion",
        description:
          "Soothes the digestive system and helps reduce occasional discomfort.",
      },
      {
        title: "Anti-inflammatory Properties",
        description:
          "Contains compounds that help reduce inflammation throughout the body.",
      },
    ],
    usage: {
      general:
        "Pour freshly boiled water over one tea bag and steep for 3-5 minutes. Enjoy 1-3 cups daily as needed.",
      specific: [
        "For relaxation: Enjoy a cup in the evening after dinner",
        "For sleep support: Drink one cup 30-45 minutes before bedtime",
        "For digestive comfort: Drink after meals as needed",
      ],
      storage:
        "Store in a cool, dry place away from strong odors and direct sunlight.",
    },
  },
  {
    id: 5,
    name: "Turmeric Curcumin Capsules",
    category: "supplements",
    concerns: ["inflammation", "joints"],
    originalPrice: 349,
    discountPercent: 0,
    image: "https://m.media-amazon.com/images/I/71jdiK6jGbL.jpg",
    rating: 4.8,
    description:
      "Our Turmeric Curcumin Capsules combine premium organic turmeric extract with black pepper extract for maximum absorption and bioavailability. Turmeric has been used for centuries in traditional Ayurvedic medicine for its powerful anti-inflammatory and antioxidant properties. Each capsule delivers 500mg of turmeric extract standardized to contain 95% curcuminoids, the active compounds responsible for turmeric's health benefits.",
    keyFeatures: [
      "500mg of organic turmeric extract per capsule",
      "Enhanced with BioPerine® (black pepper extract) for improved absorption",
      "95% curcuminoids for maximum potency",
      "Non-GMO and gluten-free formula",
      "60 vegetarian capsules per bottle",
    ],
    benefits: [
      {
        title: "Reduces Inflammation",
        description:
          "Potent curcuminoids help reduce inflammatory markers throughout the body.",
      },
      {
        title: "Supports Joint Health",
        description:
          "Helps maintain joint flexibility and comfort, especially with aging.",
      },
      {
        title: "Powerful Antioxidant",
        description: "Neutralizes free radicals and reduces oxidative stress.",
      },
      {
        title: "Supports Cardiovascular Health",
        description:
          "Helps maintain healthy cholesterol levels and supports heart function.",
      },
    ],
    usage: {
      general:
        "Take 1-2 capsules daily with meals, or as directed by your healthcare professional.",
      specific: [
        "For daily maintenance: Take 1 capsule twice daily with meals",
        "For joint support: Take 2 capsules daily with a meal containing healthy fats",
        "For optimal absorption: Take with a source of fat (e.g., coconut oil)",
      ],
      storage: "Store in a cool, dry place away from direct sunlight.",
    },
  },
  {
    id: 6,
    name: "Probiotics Complex",
    category: "supplements",
    concerns: ["digestion", "immunity"],
    originalPrice: 449,
    discountPercent: 15,
    image: "https://i.ebayimg.com/images/g/IgAAAOSwp9Fl32n1/s-l1200.png",
    rating: 4.4,
    description:
      "Our Probiotics Complex contains 15 scientifically-researched probiotic strains to support digestive health, immune function, and overall gut wellness. Each capsule delivers 50 billion CFUs (Colony Forming Units) of beneficial bacteria that help maintain a healthy balance of gut flora. The formula includes prebiotic fiber to nourish the probiotics and help them thrive in your digestive system.",
    keyFeatures: [
      "15 diverse probiotic strains for comprehensive gut health",
      "50 billion CFUs per capsule",
      "Includes prebiotic fiber for enhanced effectiveness",
      "Delayed-release capsules for targeted delivery",
      "30 vegetarian capsules per bottle",
    ],
    benefits: [
      {
        title: "Supports Digestive Health",
        description:
          "Helps maintain a healthy balance of gut bacteria for optimal digestion.",
      },
      {
        title: "Boosts Immune Function",
        description:
          "Approximately 70% of the immune system resides in the gut - healthy gut flora supports immune health.",
      },
      {
        title: "Improves Nutrient Absorption",
        description:
          "Beneficial bacteria help your body absorb nutrients more efficiently.",
      },
      {
        title: "Reduces Digestive Discomfort",
        description:
          "Helps alleviate occasional bloating, gas, and digestive discomfort.",
      },
    ],
    usage: {
      general:
        "Take 1 capsule daily on an empty stomach, preferably in the morning or at bedtime, with a glass of water.",
      specific: [
        "After antibiotics: Take 1 capsule twice daily for 2 weeks to replenish gut flora",
        "For digestive support: Take 1 capsule 30 minutes before breakfast",
        "For travel: Take 1 capsule daily starting 3 days before your trip",
      ],
      storage: "Store in the refrigerator for maximum potency and shelf life.",
    },
  },
  {
    id: 7,
    name: "Valerian Root Extract",
    category: "herbal",
    concerns: ["sleep", "anxiety"],
    originalPrice: 349,
    discountPercent: 10,
    image:
      "https://himalayawellness.co.za/cdn/shop/products/Valerian.png?v=1606283240&width=1080",
    rating: 4.2,
    description:
      "Our Valerian Root Extract is derived from premium-quality valerian root (Valeriana officinalis), a herb traditionally used to promote relaxation and support healthy sleep patterns. The liquid extract form allows for fast absorption and flexibility in dosing. Each serving contains a concentrated extract equivalent to 500mg of whole valerian root, providing natural compounds that help calm the nervous system without causing morning grogginess.",
    keyFeatures: [
      "Alcohol-free liquid extract for fast absorption",
      "Made from organically grown valerian root",
      "500mg equivalent per serving",
      "Natural sleep support without morning grogginess",
      "60ml bottle with dropper for precise dosing",
    ],
    benefits: [
      {
        title: "Promotes Natural Sleep",
        description:
          "Helps you fall asleep faster and improves sleep quality without dependency.",
      },
      {
        title: "Reduces Anxiety",
        description:
          "Natural compounds help calm the nervous system and reduce feelings of anxiety.",
      },
      {
        title: "Muscle Relaxation",
        description:
          "Supports relaxation of both the mind and body for overall comfort.",
      },
      {
        title: "Non-Habit Forming",
        description:
          "Natural alternative to conventional sleep aids with no risk of dependency.",
      },
    ],
    usage: {
      general:
        "Take 1-2 droppers (1-2ml) in a small amount of water, 30-60 minutes before bedtime. Start with a lower dose and increase gradually as needed.",
      specific: [
        "For sleep support: Take 2ml 30 minutes before bedtime",
        "For occasional anxiety: Take 1ml as needed, up to 3 times daily",
        "For relaxation: Take 1ml in the evening to unwind",
      ],
      storage: "Store in a cool, dark place. No refrigeration necessary.",
    },
  },
  {
    id: 8,
    name: "Ginseng Root Powder",
    category: "ayurvedic",
    concerns: ["energy", "focus"],
    originalPrice: 599,
    discountPercent: 0,
    image: "https://m.media-amazon.com/images/I/71D2jFiC1UL.jpg",
    rating: 4.5,
    description:
      "Our premium Ginseng Root Powder is made from pure Panax ginseng (Asian ginseng), traditionally used to boost energy, enhance mental clarity, and support the body's natural resistance to stress. Each serving provides a potent dose of ginsenosides, the active compounds responsible for ginseng's energizing and adaptogenic properties. The fine powder form allows for versatile use in beverages, smoothies, or capsules.",
    keyFeatures: [
      "100% Pure Panax ginseng root",
      "Standardized to contain 5% ginsenosides",
      "No fillers, additives, or preservatives",
      "Tested for purity and potency",
      "100g powder per container",
    ],
    benefits: [
      {
        title: "Boosts Energy and Stamina",
        description:
          "Helps combat fatigue and increase physical endurance without the crash of caffeine.",
      },
      {
        title: "Enhances Mental Performance",
        description: "Supports improved focus, memory, and cognitive function.",
      },
      {
        title: "Adaptogenic Properties",
        description:
          "Helps the body adapt to physical and mental stress for better resilience.",
      },
      {
        title: "Supports Immune Function",
        description:
          "Contains compounds that help strengthen the body's natural defenses.",
      },
    ],
    usage: {
      general:
        "Take ¼ to ½ teaspoon (1-2g) daily, mixed into water, juice, or smoothies. Best taken in the morning or early afternoon.",
      specific: [
        "For energy: Take ¼ teaspoon in the morning with breakfast",
        "For mental performance: Take ¼ teaspoon 30 minutes before mental tasks",
        "For athletic performance: Take ½ teaspoon 60 minutes before workout",
      ],
      storage:
        "Store in an airtight container in a cool, dry place away from direct sunlight.",
    },
  },
  {
    id: 9,
    name: "Omega-3 Fish Oil",
    category: "supplements",
    concerns: ["heart", "brain"],
    originalPrice: 699,
    discountPercent: 10,
    image:
      "https://www.getsupp.com/static/media/__resized/images/products/KU8K8F3CCX3006ORJ-6db76ac5-ef20-4f17-bed7-f147acaa175f-thumbnail_webp-512x512-70.webp",
    rating: 4.6,
    description:
      "Our premium Omega-3 Fish Oil softgels provide a concentrated dose of EPA and DHA, essential fatty acids that support heart health, brain function, and overall wellness. Sourced from wild-caught small fish and molecularly distilled for purity, our fish oil is free from heavy metals and contaminants. Each softgel delivers 1000mg of fish oil, containing 400mg EPA and 200mg DHA for optimal health benefits.",
    keyFeatures: [
      "1000mg fish oil per softgel (400mg EPA, 200mg DHA)",
      "Sourced from wild-caught small fish (anchovy, sardine, mackerel)",
      "Molecularly distilled for purity and freshness",
      "Enteric-coated softgels for no fishy aftertaste",
      "90 softgels per bottle",
    ],
    benefits: [
      {
        title: "Supports Heart Health",
        description:
          "Helps maintain healthy cholesterol and triglyceride levels for cardiovascular health.",
      },
      {
        title: "Enhances Brain Function",
        description:
          "DHA is a major structural component of brain tissue, supporting cognitive function.",
      },
      {
        title: "Reduces Inflammation",
        description:
          "Omega-3 fatty acids help modulate inflammatory responses throughout the body.",
      },
      {
        title: "Supports Joint Health",
        description:
          "Helps maintain joint comfort and mobility through anti-inflammatory action.",
      },
    ],
    usage: {
      general:
        "Take 1-2 softgels daily with meals, or as directed by your healthcare professional.",
      specific: [
        "For heart health: Take 2 softgels daily with meals",
        "For brain health: Take 1 softgel twice daily with meals",
        "For general wellness: Take 1 softgel daily with a meal",
      ],
      storage:
        "Store in a cool, dry place away from direct sunlight. Refrigeration not required but may extend freshness.",
    },
  },
  {
    id: 10,
    name: "Spirulina Tablets",
    category: "supplements",
    concerns: ["detox", "immunity"],
    originalPrice: 449,
    discountPercent: 0,
    image:
      "https://meds.myupchar.com/153431/health-veda-organics-spirulina-capsules-veg-capsules-for-good-health-120-0.webp",
    rating: 4.3,
    description:
      "Our Spirulina Tablets are made from 100% pure, organic spirulina algae, one of nature's most nutrient-dense superfoods. Rich in protein, vitamins, minerals, and antioxidants, spirulina supports detoxification, immune function, and overall vitality. Each tablet provides 500mg of spirulina powder, cold-pressed to preserve all its nutritional benefits without any fillers or additives.",
    keyFeatures: [
      "100% Pure Organic Spirulina",
      "500mg per tablet",
      "Over 60 nutrients and 18 amino acids",
      "Rich in chlorophyll and phycocyanin",
      "120 tablets per bottle",
    ],
    benefits: [
      {
        title: "Supports Detoxification",
        description:
          "Chlorophyll and other compounds help bind and remove toxins from the body.",
      },
      {
        title: "Boosts Immune Function",
        description:
          "Rich in antioxidants that strengthen the immune system and cellular health.",
      },
      {
        title: "Provides Complete Protein",
        description:
          "Contains all essential amino acids, making it an excellent protein source.",
      },
      {
        title: "Increases Energy and Vitality",
        description:
          "Nutrient density helps combat fatigue and support optimal energy levels.",
      },
    ],
    usage: {
      general:
        "Take 2-4 tablets daily with water, preferably with meals. Start with a lower dose and increase gradually.",
      specific: [
        "For detoxification: Take 2 tablets twice daily with meals",
        "For immune support: Take 3 tablets daily with breakfast",
        "For sports nutrition: Take 4 tablets 60 minutes before exercise",
      ],
      storage: "Store in a cool, dry place away from direct sunlight.",
    },
  },
  {
    id: 11,
    name: "Brahmi Herbal Extract",
    category: "ayurvedic",
    concerns: ["memory", "focus"],
    originalPrice: 399,
    discountPercent: 10,
    image:
      "https://himalayawellness.my/cdn/shop/products/brahmi.jpg?v=1652784134",
    rating: 4.4,
    description:
      "Our Brahmi Herbal Extract is derived from fresh Bacopa monnieri leaves, a renowned herb in Ayurvedic medicine traditionally used to enhance memory, focus, and cognitive function. Each serving delivers a concentrated extract standardized to contain 20% bacosides, the active compounds responsible for Brahmi's cognitive benefits. This premium formula supports mental clarity, learning capacity, and stress management.",
    keyFeatures: [
      "Standardized to 20% bacosides for maximum effectiveness",
      "Made from organically grown Brahmi leaves",
      "Alcohol-free liquid extract for fast absorption",
      "No artificial preservatives or additives",
      "60ml bottle with measured dropper",
    ],
    benefits: [
      {
        title: "Enhances Memory",
        description:
          "Supports both short-term and long-term memory formation and recall.",
      },
      {
        title: "Improves Focus and Concentration",
        description:
          "Helps maintain mental clarity and sustained attention during demanding tasks.",
      },
      {
        title: "Reduces Mental Fatigue",
        description:
          "Supports mental endurance and resilience during periods of mental exertion.",
      },
      {
        title: "Adaptogenic Properties",
        description:
          "Helps the body and mind adapt to stress and promotes a sense of calm.",
      },
    ],
    usage: {
      general:
        "Take 30 drops (approximately 1ml) twice daily, mixed in water or juice. Can be taken with or without food.",
      specific: [
        "For cognitive support: Take 30 drops in the morning and afternoon",
        "For students: Take 30 drops 30 minutes before studying",
        "For stress management: Take 30 drops when feeling mentally overwhelmed",
      ],
      storage: "Store in a cool, dark place. Shake well before use.",
    },
  },
  {
    id: 12,
    name: "Lavender Essential Oil",
    category: "herbal",
    concerns: ["relaxation", "sleep"],
    originalPrice: 299,
    discountPercent: 10,
    image:
      "https://img.tatacliq.com/images/i8/437Wx649H/MP000000008742207_437Wx649H_202206300458233.jpeg",
    rating: 4.9,
    description:
      "Our 100% Pure Lavender Essential Oil is steam-distilled from premium Lavandula angustifolia flowers grown in the highlands of France. Renowned for its calming and soothing properties, lavender oil helps promote relaxation, support healthy sleep patterns, and ease occasional stress. Each bottle contains undiluted, therapeutic-grade lavender oil with its full spectrum of beneficial compounds.",
    keyFeatures: [
      "100% Pure & Natural - No fillers or additives",
      "Steam-distilled from French lavender flowers",
      "Therapeutic grade with optimal concentration of active compounds",
      "Tested for purity and potency",
      "15ml amber glass bottle with dropper",
    ],
    benefits: [
      {
        title: "Promotes Relaxation",
        description:
          "The gentle aroma helps calm the mind and reduce feelings of tension.",
      },
      {
        title: "Supports Healthy Sleep",
        description:
          "Creates a soothing environment conducive to quality rest.",
      },
      {
        title: "Soothes Skin Irritation",
        description:
          "When properly diluted, can help calm minor skin discomfort.",
      },
      {
        title: "Enhances Mood",
        description:
          "Refreshing scent can help lift spirits and promote emotional balance.",
      },
    ],
    usage: {
      general:
        "For aromatherapy, add 3-5 drops to a diffuser. For topical use, dilute with a carrier oil (3-5 drops per teaspoon of carrier oil).",
      specific: [
        "For relaxation: Diffuse 3 drops in bedroom 30 minutes before sleep",
        "For skin care: Mix 2 drops with 1 teaspoon of jojoba oil",
        "For stress relief: Apply 1 drop diluted oil to pulse points",
      ],
      storage:
        "Store in a cool, dark place away from direct sunlight. Keep tightly closed when not in use.",
    },
  },
  {
    id: 13,
    name: "Vitamin D3 Drops",
    category: "supplements",
    concerns: ["bones", "immunity"],
    originalPrice: 349,
    discountPercent: 10,
    image:
      "https://cdn01.pharmeasy.in/dam/products_otc/Q06828/vlados-himalayan-organics-vitamin-d3-with-k2-as-mk7-supplement-120-veg-tablets-2-1741330796.jpg?dim=400x0&dpr=1&q=100",
    rating: 4.7,
    description:
      "Our Vitamin D3 Drops provide a highly bioavailable form of vitamin D (cholecalciferol) in a convenient liquid format. Vitamin D plays a crucial role in calcium absorption, bone health, immune function, and overall wellbeing. Each drop delivers 1000 IU (25mcg) of vitamin D3 suspended in organic MCT oil for optimal absorption. This unflavored formula is ideal for those who prefer a tasteless supplement or have difficulty swallowing pills.",
    keyFeatures: [
      "1000 IU (25mcg) of vitamin D3 per drop",
      "Suspended in organic MCT oil for enhanced absorption",
      "Unflavored for versatile use",
      "No artificial preservatives or additives",
      "600 drops per bottle (20-month supply at maintenance dose)",
    ],
    benefits: [
      {
        title: "Supports Bone Health",
        description:
          "Enhances calcium absorption for stronger bones and teeth.",
      },
      {
        title: "Boosts Immune Function",
        description: "Helps maintain a healthy immune system year-round.",
      },
      {
        title: "Improves Mood",
        description:
          "Adequate vitamin D levels are associated with positive mood and mental wellbeing.",
      },
      {
        title: "Supports Muscle Function",
        description:
          "Plays a role in maintaining proper muscle function and strength.",
      },
    ],
    usage: {
      general:
        "Take 1 drop daily with a meal containing fat, or as directed by your healthcare professional. Can be taken directly by mouth or mixed into food or beverages.",
      specific: [
        "For maintenance: Take 1 drop daily with a meal",
        "During winter months: Take 2 drops daily",
        "For those with limited sun exposure: Take 2 drops daily",
      ],
      storage:
        "Store at room temperature away from direct sunlight. No refrigeration required.",
    },
  },
  {
    id: 14,
    name: "Moringa Leaf Powder",
    category: "herbal",
    concerns: ["nutrition", "energy"],
    originalPrice: 399,
    discountPercent: 0,
    image:
      "https://dr9wvh6oz7mzp.cloudfront.net/i/c50f7b6fa87890d4c039fc7c75d20058_ra,w806,h806_pa,w806,h806.jpg",
    rating: 4.5,
    description:
      "Our Moringa Leaf Powder is made from 100% pure, organic moringa leaves (Moringa oleifera), often called the miracle tree due to its exceptional nutrient profile. Rich in vitamins, minerals, antioxidants, and plant proteins, moringa provides comprehensive nutritional support and natural energy. The leaves are carefully dried at low temperatures and finely ground to preserve all their nutritional benefits.",
    keyFeatures: [
      "100% Pure Organic Moringa Leaf",
      "Contains over 90 nutrients and 46 antioxidants",
      "Complete plant protein with all 9 essential amino acids",
      "Low-temperature processing to preserve nutrients",
      "200g powder per package",
    ],
    benefits: [
      {
        title: "Complete Nutrition",
        description:
          "Provides a wide spectrum of vitamins, minerals, and phytonutrients.",
      },
      {
        title: "Natural Energy Support",
        description:
          "Nutrient density helps combat fatigue without stimulants.",
      },
      {
        title: "Antioxidant Protection",
        description:
          "Rich in compounds that help neutralize free radicals and reduce oxidative stress.",
      },
      {
        title: "Supports Healthy Inflammation Response",
        description:
          "Contains natural compounds that help maintain balanced inflammatory processes.",
      },
    ],
    usage: {
      general:
        "Take 1-2 teaspoons (5-10g) daily mixed into water, juice, smoothies, or sprinkled over food.",
      specific: [
        "For daily nutrition: Add 1 teaspoon to morning smoothie",
        "For energy: Mix 1 teaspoon with juice 30 minutes before physical activity",
        "For culinary use: Sprinkle ½ teaspoon over soups, salads, or rice dishes",
      ],
      storage:
        "Store in an airtight container in a cool, dry place away from direct sunlight.",
    },
  },
];

export default products;
