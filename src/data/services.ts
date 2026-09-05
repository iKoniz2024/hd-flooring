export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  categoryTag?: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  heroImage: string;
  benefits: string[];
  options?: string[];
  idealFor: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'hardwood-flooring',
    slug: 'hardwood-flooring',
    title: 'Solid Hardwood Flooring',
    categoryTag: 'Hardwood',
    tagline: 'Timeless Natural Beauty & Exceptional Prestige',
    shortDesc: 'Bring natural warmth, character, and long-term real estate value to your space with solid hardwood flooring.',
    fullDesc: 'Solid hardwood brings unmatched elegance to interiors. At HD Flooring, we provide expert solid hardwood installation with precise expansion spacing, subfloor nailing, and custom finishing.',
    heroImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=960&q=55&fm=webp',
    benefits: [
      'Authentic natural wood grain and warmth',
      'Adds significant long-term real estate value',
      'Can be refinished multiple times over decades',
      'Hypoallergenic surface, easy to clean',
    ],
    options: ['Red/White Oak', 'Hard Maple', 'Black Walnut', 'Pre-finished & Site-Finished'],
    idealFor: ['Living Rooms', 'Bedrooms', 'Dining Areas', 'Executive Offices'],
    process: ['Moisture Acclimation', 'Subfloor Prep', 'Precision Layout', 'Nail/Glue Installation', 'Finishing'],
    faqs: [
      {
        question: 'How long does hardwood installation take?',
        answer: 'Most standard home installations take 2 to 4 days depending on square footage and room prep requirements.',
      },
    ],
  },
  {
    id: 'engineered-hardwood-flooring',
    slug: 'engineered-hardwood-flooring',
    title: 'Engineered Hardwood',
    categoryTag: 'Hardwood',
    tagline: 'Real Wood Appearance with Multi-Layer Climate Stability',
    shortDesc: 'Real wood top veneer with multi-layer cross-ply construction designed for Canadian seasonal humidity shifts.',
    fullDesc: 'Engineered hardwood offers the authentic look of solid timber while providing superior dimensional stability against humidity fluctuations. Ideal for condos, basements, and radiant heat floors.',
    heroImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=960&q=55&fm=webp',
    benefits: [
      'Real hardwood veneer top layer',
      'Enhanced moisture & humidity resistance',
      'Suitable for below-grade & condo installation',
      'Radiant floor heating compatible',
    ],
    idealFor: ['Condominiums', 'Basements', 'Open-Concept Homes', 'Showrooms'],
    process: ['Moisture Testing', 'Subfloor Leveling', 'Floating or Glue-Down Install', 'Trim Finishing'],
    faqs: [
      {
        question: 'Can engineered hardwood be refinished?',
        answer: 'Yes! Depending on the wear layer thickness (2mm to 6mm), engineered wood can be sanded and refinished 1 to 3 times.',
      },
    ],
  },
  {
    id: 'luxury-vinyl-flooring',
    slug: 'luxury-vinyl-flooring',
    title: 'Luxury Vinyl & Sheet Vinyl',
    categoryTag: 'Vinyl Flooring',
    tagline: 'Waterproof Luxury Vinyl Planks, Tiles, Sheet Vinyl & Commercial VCT',
    shortDesc: '100% waterproof LVP, realistic stone LVT, sheet vinyl with flash coving, and heavy-duty commercial VCT.',
    fullDesc: 'Luxury Vinyl Plank (LVP), Luxury Vinyl Tile (LVT), Sheet Vinyl Coving, and Vinyl Composition Tile (VCT) provide hyper-realistic textures with total moisture immunity.',
    heroImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=960&q=55&fm=webp',
    benefits: [
      '100% Waterproof construction',
      'Pet & child scratch resistance',
      'Hygienic sheet vinyl & wall flash coving',
      'Commercial grade wear layer (12mil - 28mil)',
    ],
    options: ['Click-Lock LVP Planks', 'Glue-Down LVT Tiles', 'Sheet Vinyl Coving', 'Commercial VCT Tiles'],
    idealFor: ['Kitchens & Basements', 'Healthcare & Kitchens', 'Retail Stores', 'Corporate Offices'],
    process: ['Subfloor Prep', 'Underlayment Setup', 'Plank/Tile/Sheet Setting', 'Perimeter Trimming & Heat Welding'],
    faqs: [
      {
        question: 'What is the difference between LVP, LVT, and Sheet Vinyl?',
        answer: 'LVP mimics wood planks, LVT mimics ceramic or stone tiles, and Sheet Vinyl creates seamless watertight floors with flash coving.',
      },
    ],
  },
  {
    id: 'laminate-flooring',
    slug: 'laminate-flooring',
    title: 'Laminate Flooring',
    categoryTag: 'Laminate',
    tagline: 'Practical Everyday Style & High Wear Resistance',
    shortDesc: 'Budget-friendly, highly durable flooring with photo-realistic wood grain and AC-rated scratch protection.',
    fullDesc: 'Laminate flooring provides an economical yet stunning wood appearance. High AC4 and AC5 wear layers protect against scuffs, furniture, and busy family pets.',
    heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Budget-friendly investment', 'High impact & wear rating', 'Easy click-lock installation', 'Photo-realistic wood grain'],
    idealFor: ['Bedrooms', 'Living Areas', 'Rental Properties', 'Home Offices'],
    process: ['Subfloor Inspection', 'Acoustic Underlayment', 'Interlocking Plank Install', 'Baseboard Trimming'],
    faqs: [
      {
        question: 'Is modern laminate scratch resistant?',
        answer: 'Yes, AC4 and AC5 rated laminates are engineered with aluminum oxide coatings specifically to withstand heavy residential and commercial wear.',
      },
    ],
  },
  {
    id: 'carpet-flooring',
    slug: 'carpet-flooring',
    title: 'Carpet Flooring',
    categoryTag: 'Carpet',
    tagline: 'Unmatched Comfort, Thermal Warmth & Sound Absorption',
    shortDesc: 'Plush residential and durable commercial carpet installation for cozy bedrooms, stairs, and quiet offices.',
    fullDesc: 'Carpet creates cozy, insulated spaces underfoot. HD Flooring offers professional stretch-in carpet installation with high-density padding for superior foot comfort.',
    heroImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Soft thermal comfort underfoot', 'Superior noise dampening', 'Stain-resistant fiber options', 'Non-slip surface safety'],
    idealFor: ['Bedrooms', 'Home Theaters', 'Stairs', 'Corporate Boardrooms'],
    process: ['Tack Strip Prep', 'High-Density Cushioning', 'Power Stretching', 'Seam Sealing'],
    faqs: [
      {
        question: 'Do you supply carpet under-padding?',
        answer: 'Yes, we supply premium high-density underlayment cushion to maximize carpet lifespan and foot comfort.',
      },
    ],
  },
  {
    id: 'tile-flooring',
    slug: 'tile-flooring',
    title: 'Tile & Porcelain Installation',
    categoryTag: 'Tile',
    tagline: 'High-Strength Porcelain, Ceramic & Stone Tiling',
    shortDesc: 'Durable porcelain and ceramic tile installations for moisture-prone areas, foyers, and sleek commercial floors.',
    fullDesc: 'Tile offers unmatched durability, fire resistance, and easy hygienic cleanup. Our master tile setters handle floor leveling, waterproofing membranes, laser layout, and epoxy grout application.',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Impervious to steam & water', 'Ultra-durable porcelain strength', 'Wide range of large formats', 'Easy to sanitize'],
    idealFor: ['Bathrooms', 'Kitchens', 'Mudrooms', 'Commercial Entrances'],
    process: ['Subfloor Boarding', 'Waterproofing Membrane', 'Laser Layout', 'Thinset Setting & Grouting'],
    faqs: [
      {
        question: 'Are large format porcelain tiles suitable for floor heating?',
        answer: 'Yes! Porcelain tiles are excellent thermal conductors and pair perfectly with electric or hydronic in-floor heat.',
      },
    ],
  },
  {
    id: 'stair-flooring',
    slug: 'stair-flooring',
    title: 'Stair Flooring & Capping',
    categoryTag: 'Stairwork',
    tagline: 'Custom Wood Stair Treads, Risers & Nosing Profiles',
    shortDesc: 'Custom hardwood stair capping, nosing, and runner installations that connect your floors seamlessly.',
    fullDesc: 'Stairs are often the focal point of a home entrance. HD Flooring installs solid wood stair treads, custom risers, and matching nosing profiles for flawless stair transformations.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Seamless visual flow between floors', 'Durable solid wood treads', 'Custom stain matching', 'Enhanced stair safety'],
    idealFor: ['Main Entryway Staircases', 'Curved Stairs', 'Basement Steps'],
    process: ['Old Carpet Removal', 'Tread Scribing & Cutting', 'Adhesive & Fastener Setting', 'Nosing Alignment'],
    faqs: [
      {
        question: 'Can you match my stairs to my floor color?',
        answer: 'Yes! We custom stain hardwood stair treads to perfectly match your new or existing flooring.',
      },
    ],
  },
  {
    id: 'flooring-replacement',
    slug: 'flooring-replacement',
    title: 'Flooring Repairs & Replacement',
    categoryTag: 'Repairs & Restorations',
    tagline: 'Professional Board Repairs, Tear-out & Upgrades',
    shortDesc: 'Damaged board repairs, water damage restoration, old carpet tear-out, and complete floor replacement.',
    fullDesc: 'From repairing water-damaged vinyl boards to complete whole-house tear-outs, HD Flooring provides comprehensive repair and replacement services with dust-controlled removal and waste haul-away.',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Dust-controlled tear-out', 'Individual board replacement', 'Responsible waste haul-away', 'Subfloor restoration'],
    idealFor: ['Water Damage Repairs', 'Older Home Renovations', 'Post-Tenant Updates'],
    process: ['Site Assessment', 'Demolition & Removal', 'Subfloor Repair', 'New Floor Setting'],
    faqs: [
      {
        question: 'Can you repair damaged planks without replacing the whole floor?',
        answer: 'Yes! Our technicians can surgically remove and replace individual damaged LVP or hardwood planks without disturbing adjacent floor areas.',
      },
    ],
  },
  {
    id: 'floor-preparation',
    slug: 'floor-preparation',
    title: 'Self Leveling & Floor Prep',
    categoryTag: 'Floor Prep',
    tagline: 'The Solid Foundation for Every Lasting Installation',
    shortDesc: 'Self-leveling compound poured bases, plywood subfloor boarding, moisture barriers, and squeak repairs.',
    fullDesc: 'No floor looks great without a flat, solid subfloor. We diagnose uneven joists, repair squeaks, apply self-leveling cement compound, and install cement board or underlayment plywood.',
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Prevents floor squeaks & gaps', 'Ensures manufacturer warranty validity', 'Moisture barrier sealing', 'Ultra-smooth surface flatness'],
    idealFor: ['Uneven Concrete Slabs', 'Old Plywood Subfloors', 'Condo Slab Prep'],
    process: ['Subfloor Inspection', 'Grinding & Patching', 'Self-Leveling Compound Pour', 'Moisture Barrier Seal'],
    faqs: [
      {
        question: 'Why is self-leveling so important?',
        answer: 'Subfloor unevenness causes vinyl click joints to snap and hardwood to squeak. Proper self-leveling guarantees floor longevity.',
      },
    ],
  },
];
