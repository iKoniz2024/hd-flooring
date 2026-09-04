export interface BlogSection {
  heading: string;
  body: string;
  image?: string;
  quote?: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  summary: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs?: BlogFAQ[];
  content?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-choose-the-right-flooring',
    title: 'How to Choose the Right Flooring for Your Home',
    category: 'Flooring Tips',
    readTime: '6 min read',
    publishDate: 'September 2026',
    summary: 'Understand the key factors to consider when selecting flooring for different rooms in Canadian homes.',
    coverImage: '/assets/images/laminate-flooring/laminate-flooring-17.jpg',
    author: {
      name: 'Habibur Rahman (Habib)',
      role: 'Lead Installation Specialist & Founder',
      avatar: '/assets/images/personal-photos/personal-photo-01.jpg',
    },
    keyTakeaways: [
      'Evaluate moisture exposure: Basements and bathrooms require 100% waterproof LVP or tile.',
      'Match foot traffic levels: High-use hallways benefit from AC4/AC5 rated laminate or heavy wear layer vinyl.',
      'Test subfloor moisture & flatnesses: Proper floor leveling prevents plank squeaks and seam failures.',
      'Consider long-term property equity: Solid hardwood increases home resale value significantly.',
    ],
    sections: [
      {
        heading: '1. Understanding Room Traffic & Everyday Functionality',
        body: 'Every room in your home serves a unique purpose and experiences different levels of foot traffic. High-traffic areas like foyers, kitchens, and hallways require flooring materials with superior wear resistance. For these zones, heavy-duty Luxury Vinyl Plank (LVP), Porcelain Tile, or High-AC rated Laminate flooring offer maximum durability against shoes, pet claws, and dropped objects. In bedrooms and cozy den areas, comfort, warmth, and sound absorption are often prioritized, making plush carpet or warm hardwood ideal choices.',
        quote: 'Selecting floor materials based on room utility prevents premature wear and saves thousands in premature replacement costs.',
      },
      {
        heading: '2. Moisture & Seasonal Humidity Shifts in Canadian Homes',
        body: 'Canadian seasonal climate changes create significant indoor relative humidity fluctuations — from dry sub-zero winters to humid summers. Moisture exposure is the single biggest threat to organic flooring materials. Solid hardwood expands and contracts with humidity changes, making it unsuitable for basements or bathrooms. In contrast, Engineered Hardwood features cross-ply backing that resists humidity warping, while 100% Waterproof Luxury Vinyl Plank (LVP) and Sheet Vinyl remain completely impervious to standing water and basement dampness.',
        image: '/assets/images/engineered-hardwood/engineered-hardwood-01.jpg',
      },
      {
        heading: '3. Subfloor Preparation & Sound Isolation Requirements',
        body: 'The secret to a squeak-free, long-lasting floor lies beneath the surface. Before installing any finish floor material, subfloors must be thoroughly inspected for moisture, structural integrity, and levelness. High spots must be sanded down and low dips filled with premium self-leveling compound. Additionally, for condominiums or multi-story homes, installing high-density acoustic underlayments (such as IXPE acoustic foam or cork) is essential for passing building code acoustic dampening regulations.',
      },
      {
        heading: '4. Balancing Upfront Budget vs. Lifetime Equity Value',
        body: 'While luxury vinyl and laminate offer budget-friendly upfront material and installation costs, solid hardwood flooring represents a permanent real estate investment that can be sanded and refinished multiple times over decades. Weighing initial costs against expected home tenure helps determine whether solid timber, engineered wood, or vinyl plank is the smartest financial investment for your property.',
      },
    ],
    faqs: [
      {
        question: 'Which flooring is best for Canadian basements?',
        answer: 'Luxury Vinyl Plank (LVP) or Sheet Vinyl with flash coving is the gold standard for basements because both are 100% waterproof and resist concrete slab moisture transmission.',
      },
      {
        question: 'How do I choose between carpet and hardwood for bedrooms?',
        answer: 'Hardwood provides hypoallergenic cleanliness and long-term resale value, whereas carpet offers cozy underfoot warmth and superior acoustic absorption.',
      },
    ],
  },
  {
    id: '2',
    slug: 'hardwood-vs-luxury-vinyl-flooring',
    title: 'Hardwood vs. Luxury Vinyl: Which Flooring Is Right for You?',
    category: 'Comparison',
    readTime: '7 min read',
    publishDate: 'August 2026',
    summary: 'Compare the characteristics, applications, maintenance, and practical considerations of two popular flooring options.',
    coverImage: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-46.jpg',
    author: {
      name: 'Habibur Rahman (Habib)',
      role: 'Lead Installation Specialist & Founder',
      avatar: '/assets/images/personal-photos/personal-photo-01.jpg',
    },
    keyTakeaways: [
      'Hardwood offers authentic natural wood grain and refinishability for 50+ years of equity.',
      'Luxury Vinyl Plank (LVP) provides 100% waterproof protection and scratch immunity for active homes.',
      'LVP installs quickly over concrete and subfloors with minimal expansion gap requirements.',
      'Hardwood excels in living rooms & main floors; LVP dominates basements, kitchens & pet zones.',
    ],
    sections: [
      {
        heading: '1. Authenticity & Real Estate Valuation (Solid Hardwood)',
        body: 'Solid hardwood flooring brings unmatched prestige, warmth, and natural architectural beauty to any interior. Crafted from real oak, maple, walnut, or hickory timber, every plank features unique grain patterns. Beyond visual appeal, solid hardwood adds tangible long-term value to Canadian real estate. It can be sanded down, re-stained, and refinished up to 5 times, allowing homeowners to change stain colors over the decades.',
        quote: 'Hardwood is an architectural feature that matures with age, providing authentic value that synthetic flooring cannot duplicate.',
      },
      {
        heading: '2. Waterproof Performance & Active Family Durability (LVP)',
        body: 'Luxury Vinyl Plank (LVP) has revolutionized the flooring industry by combining realistic 3D HD wood textures with 100% moisture immunity. Constructed with rigid stone polymer core (SPC) or cellular vinyl core (WPC), LVP will never swell, buckle, or cup when exposed to water spills, pet accidents, or flooded basements. Commercial wear layers (12mil to 28mil) provide extreme scratch resistance against dog claws, heavy furniture, and high foot traffic.',
        image: '/assets/images/luxury-vinyl-flooring/luxury-vinyl-flooring-52.jpg',
      },
      {
        heading: '3. Installation Methods & Subfloor Tolerances',
        body: 'Hardwood requires precise blind-nailing or full-spread adhesive over clean plywood subfloors, along with strict 48-72 hour wood acclimation prior to installation. LVP features engineered click-lock joint systems that float over subfloors and concrete slabs with minimal prep work, making installation faster and less invasive.',
      },
      {
        heading: '4. Cost Analysis & Maintenance Considerations',
        body: 'Luxury Vinyl Plank generally ranges from $2.50 to $6.00 per sq ft for materials, making it highly cost-effective. Solid Hardwood ranges from $6.00 to $14.00+ per sq ft. Maintenance for LVP requires simple damp mopping, while Hardwood requires pH-neutral wood cleaners and humidity regulation.',
      },
    ],
    faqs: [
      {
        question: 'Is Luxury Vinyl Plank suitable for high-humidity bathrooms?',
        answer: 'Yes! LVP is 100% waterproof and will not swell or degrade when exposed to steam or bathroom water splashes.',
      },
      {
        question: 'Can you install solid hardwood over radiant floor heating?',
        answer: 'Engineered Hardwood is strongly recommended over solid hardwood for radiant heat floors, as its multi-ply construction handles heat expansion safely.',
      },
    ],
  },
  {
    id: '3',
    slug: 'best-flooring-for-canadian-homes',
    title: 'Best Flooring Options for Busy Canadian Homes',
    category: 'Canadian Homes',
    readTime: '6 min read',
    publishDate: 'August 2026',
    summary: 'Explore practical flooring considerations for households dealing with everyday traffic, pets, children, and changing seasonal conditions.',
    coverImage: '/assets/images/carpet-flooring/carpet-flooring-15.jpg',
    author: {
      name: 'Habibur Rahman (Habib)',
      role: 'Lead Installation Specialist & Founder',
      avatar: '/assets/images/personal-photos/personal-photo-01.jpg',
    },
    keyTakeaways: [
      'Canadian winters track snow, slush, and corrosive de-icing salt into entryways.',
      'Water-durable LVP, Sheet Vinyl with flash coving, and Porcelain Tile protect mudrooms best.',
      'IXPE acoustic underlayments provide thermal insulation over cold basement concrete.',
      'Scratch-resistant wear layers safeguard floors against pets and active kids.',
    ],
    sections: [
      {
        heading: '1. Protecting Entryways Against Canadian Slush & De-icing Salt',
        body: 'Canadian homeowners face unique flooring challenges every winter. Snow, slush, and harsh calcium chloride de-icing salts are constantly tracked into foyers and mudrooms. Traditional carpet and unsealed hardwood absorb salt water, causing staining, finish damage, and wood rot. To combat winter weather, installing waterproof Luxury Vinyl, heat-welded Sheet Vinyl with baseboard flash coving, or Porcelain Tile in entryways provides an impervious protective barrier that wipes clean effortlessly.',
        quote: 'Choosing water-impervious entryway flooring prevents costly subfloor rot caused by melting winter slush.',
      },
      {
        heading: '2. Pet & Child Friendly Flooring Solutions',
        body: 'Busy Canadian families with pets and children need floors that withstand heavy activity. Scratch-resistant LVP planks with ceramic-bead topcoats resist claw marks, while click-lock acoustic underlayments cushion footsteps and reduce noise transmission between floors. For living rooms, stain-shielded carpets or scratch-durable engineered hardwood provide warmth without delicate maintenance worries.',
        image: '/assets/images/hardwood-flooring/hardwood-flooring-03.jpg',
      },
      {
        heading: '3. Thermal Insulation & Radiant Floor Compatibility',
        body: 'Cold winter temperatures mean floor warmth is a major priority. Floor materials like LVP and engineered wood accept in-floor radiant heating systems smoothly. Combining underfloor heat with dense acoustic underlayments keeps basement living areas warm, comfortable, and energy-efficient during sub-zero months.',
      },
    ],
    faqs: [
      {
        question: 'How do I clean winter salt stains off my entryway floor?',
        answer: 'Mix 1 cup of warm water with 1 tbsp of white vinegar. Wipe gently with a soft microfiber cloth to dissolve salt crystals without damaging the wear layer.',
      },
      {
        question: 'What is the most scratch-resistant flooring for large dogs?',
        answer: 'High-density SPC Luxury Vinyl Plank with a 20mil or 28mil ceramic-bead wear layer provides maximum scratch protection against dog claws.',
      },
    ],
  },
  {
    id: '4',
    slug: 'how-long-does-flooring-installation-take',
    title: 'How Long Does Flooring Installation Take?',
    category: 'Installation Guide',
    readTime: '5 min read',
    publishDate: 'July 2026',
    summary: 'Learn what factors can influence the timeline of a flooring installation project.',
    coverImage: '/assets/images/floor-preparation/floor-preparation-01.jpg',
    author: {
      name: 'Habibur Rahman (Habib)',
      role: 'Lead Installation Specialist & Founder',
      avatar: '/assets/images/personal-photos/personal-photo-01.jpg',
    },
    keyTakeaways: [
      'Standard 1,000 sq ft residential LVP installation takes 2 to 3 full working days.',
      'Wood material acclimation requires 48-72 hours inside the home before installation.',
      'Subfloor leveling compound requires 12 to 24 hours of drying cure time.',
      'Baseboard replacement, stair scribing, and nosing transitions add detail installation time.',
    ],
    sections: [
      {
        heading: '1. Phase 1: Material Acclimation & Site Preparation (Day 1)',
        body: 'Before installation begins, hardwood and wood-composite materials must acclimate inside the climate-controlled job site for 48 to 72 hours. This step equalizes moisture content between the flooring and the room air. On Day 1 of active installation, technicians clear existing carpet/tack strips, perform subfloor moisture tests, and inspect subfloor flatnesses.',
      },
      {
        heading: '2. Phase 2: Subfloor Leveling & Underlayment Setup (Day 1-2)',
        body: 'If subfloor dips exceed 3/16" over a 10-foot radius, self-leveling cement compound is mixed and poured. This layer requires 12 to 24 hours to cure fully before plank laying can commence. Installing high-density acoustic underlayment or vapor barriers follows immediately after compound curing.',
        image: '/assets/images/floor-preparation/floor-preparation-01.jpg',
        quote: 'Skipping subfloor leveling creates hollow footstep sounds and eventually breaks plank click-lock joints.',
      },
      {
        heading: '3. Phase 3: Plank Laying & Precision Custom Scribing (Day 2-3)',
        body: 'Plank installation proceeds rapidly — professional crews lay between 400 to 800 sq ft of click-lock LVP or laminate per day. Complex room layouts, door casing undercuts, hearth scribing, and stair nosing coving require careful hand-crafting, adding specialized time.',
      },
      {
        heading: '4. Phase 4: Baseboard Trimming, Transitions & Final Site Cleanup (Day 3-4)',
        body: 'The final phase involves re-installing baseboards or installing quarter-round shoe moldings, T-molding transition strips between doorways, vacuuming all installation dust, and conducting a final quality inspection with the homeowner.',
      },
    ],
    faqs: [
      {
        question: 'Do I need to move furniture out of rooms before installation?',
        answer: 'Yes, rooms must be cleared of furniture and personal items before crew arrival. Most installation teams offer furniture moving services upon request.',
      },
      {
        question: 'Can flooring be installed in a single day?',
        answer: 'Single rooms under 300 sq ft without subfloor repairs can easily be completed in one day.',
      },
    ],
  },
  {
    id: '5',
    slug: 'how-to-maintain-hardwood-flooring',
    title: 'How to Maintain Hardwood Flooring for Decades',
    category: 'Maintenance',
    readTime: '6 min read',
    publishDate: 'June 2026',
    summary: 'Simple maintenance routines to protect your hardwood investment against scratches, spills, and seasonal humidity shifts.',
    coverImage: '/assets/images/hardwood-flooring/hardwood-flooring-03.jpg',
    author: {
      name: 'Habibur Rahman (Habib)',
      role: 'Lead Installation Specialist & Founder',
      avatar: '/assets/images/personal-photos/personal-photo-01.jpg',
    },
    keyTakeaways: [
      'Maintain indoor relative humidity between 35% and 55% using humidifiers in winter.',
      'Clean daily with dry microfiber dust mops; never use steam mops or harsh ammonia.',
      'Attach heavy-duty felt pads under all furniture legs and chair feet.',
      'Apply screen-coat re-finishing every 5 to 7 years to protect wood polyurethane sealers.',
    ],
    sections: [
      {
        heading: '1. Maintaining Optimal Indoor Humidity Levels (The Golden Rule)',
        body: 'Natural hardwood is hydro-scopic, meaning it constantly absorbs and releases airborne moisture. In Canadian winters, indoor heating dries home air below 20% humidity, causing hardwood planks to shrink and develop unsightly gaps. In humid summers, excess moisture causes planks to cup or crown. Running a central home humidifier during winter keeps relative humidity at a healthy 35%-55%, preventing wood shrinkage.',
        quote: 'Maintaining consistent indoor humidity is the single most important habit for preventing hardwood plank gapping.',
      },
      {
        heading: '2. Proper Daily & Weekly Cleaning Protocols',
        body: 'Dust and fine grit act like sandpaper under foot traffic, dulling your hardwood finish over time. Sweep daily using a soft-bristle broom or vacuum with a hard-floor brush attachment (avoid vacuums with spinning beater bars). Mop weekly using a damp microfiber pad sprayed with a specialized pH-neutral hardwood floor cleaner. Never use steam mops or wet buckets.',
        image: '/assets/images/hardwood-flooring/hardwood-flooring-01.jpg',
      },
      {
        heading: '3. Protecting Against Scratches, Pets & Heavy Furniture',
        body: 'Apply thick felt protector pads beneath all sofa, table, and chair legs, replacing them twice a year. Place heavy rubber-backed mats at exterior entrance doors to catch gravel and slush. Keep dog nails neatly trimmed to prevent finish scratches.',
      },
      {
        heading: '4. Screen-Coating vs. Full Sand & Refinish Timelines',
        body: 'Before your polyurethane topcoat wears down to raw wood, schedule a professional "screen and recoat" every 5 to 7 years. This process lightly abrades the top finish and applies a fresh protective coat without sanding down the timber grain, extending full refinishing intervals by decades.',
      },
    ],
    faqs: [
      {
        question: 'Why are steam mops dangerous for hardwood floors?',
        answer: 'Steam mops force high-temperature moisture deep into wood plank seams and under sealers, causing wood cupping, finish peeling, and dark water stains.',
      },
      {
        question: 'How often can solid hardwood be sanded and refinished?',
        answer: 'Full 3/4" solid hardwood can be sanded and refinished 4 to 6 times over its lifetime, lasting over 80+ years when properly maintained.',
      },
    ],
  },
];
