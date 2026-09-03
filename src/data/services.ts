export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
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
    title: 'Hardwood Flooring Installation',
    tagline: 'Timeless Natural Beauty for Canadian Homes',
    shortDesc: 'Bring natural warmth, character, and long-term value to your space with professionally installed hardwood flooring.',
    fullDesc: 'Hardwood flooring brings unmatched elegance and warmth to residential and commercial interiors. At HD Flooring, we provide expert hardwood installation with precise subfloor prep, expansion spacing, and meticulous finishing.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Authentic natural wood grain and warmth',
      'Adds significant long-term real estate value',
      'Can be refinished multiple times over decades',
      'Hypoallergenic surface, easy to clean',
    ],
    options: ['Solid Hardwood', 'Oak, Maple, Walnut Species', 'Wide Board Widths', 'Pre-finished & Custom Stained'],
    idealFor: ['Living Rooms', 'Bedrooms', 'Dining Areas', 'Hallways', 'Executive Offices'],
    process: ['Site Assessment', 'Subfloor Prep', 'Precision Layout', 'Nail/Glue Installation', 'Finishing & Inspection'],
    faqs: [
      {
        question: 'Is hardwood suitable for every room?',
        answer: 'Hardwood is ideal for dry living areas. Rooms exposed to excessive moisture like basements or full bathrooms are better suited for engineered wood or luxury vinyl.',
      },
      {
        question: 'How long does hardwood installation take?',
        answer: 'Most standard home installations take 2 to 4 days depending on square footage, prep requirements, and board width.',
      },
    ],
  },
  {
    id: 'engineered-hardwood-flooring',
    slug: 'engineered-hardwood-flooring',
    title: 'Engineered Hardwood Flooring',
    tagline: 'Real Wood Appearance with Modern Stability',
    shortDesc: 'Enjoy real wood beauty with multi-layer cross-ply construction designed for Canadian seasonal climate changes.',
    fullDesc: 'Engineered hardwood offers the authentic look of solid timber while providing superior dimensional stability against humidity fluctuations. Perfect for condos, basements, and radiant heating systems.',
    heroImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      'Real hardwood top veneer layer',
      'Enhanced moisture & humidity resistance',
      'Suitable for below-grade & condo installation',
      'Compatible with radiant floor heating',
    ],
    idealFor: ['Condominiums', 'Basements', 'Open-Concept Homes', 'Modern Commercial Spaces'],
    process: ['Moisture Testing', 'Subfloor Leveling', 'Floating or Click/Glue Install', 'Trim & Baseboard Finishing'],
    faqs: [
      {
        question: 'Can engineered hardwood be refinished?',
        answer: 'Yes, depending on the thickness of the top veneer layer (usually 2mm to 6mm), it can be sanded and refinished 1 to 3 times.',
      },
    ],
  },
  {
    id: 'luxury-vinyl-flooring',
    slug: 'luxury-vinyl-flooring',
    title: 'Luxury Vinyl Flooring (LVP / LVT)',
    tagline: 'Waterproof Durability Meets Modern Style',
    shortDesc: '100% waterproof, scratch-resistant luxury vinyl planks ideal for active households and high-traffic commercial spaces.',
    fullDesc: 'Luxury Vinyl Tile (LVT) and Luxury Vinyl Plank (LVP) provide hyper-realistic wood and stone textures with total moisture immunity. Extremely durable, comfortable underfoot, and low maintenance.',
    heroImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
    benefits: [
      '100% Waterproof construction',
      'Pet & child scratch resistance',
      'Quiet sound absorption underlayment',
      'Realistic wood plank & stone finishes',
    ],
    idealFor: ['Kitchens', 'Bathrooms', 'Basements', 'Retail Stores', 'High-Traffic Entrances'],
    process: ['Subfloor Inspection', 'Underlayment Setup', 'Click-Lock Assembly', 'Final Perimeter Sealing'],
    faqs: [
      {
        question: 'Is Luxury Vinyl fully waterproof?',
        answer: 'Yes! High-quality LVP/LVT is completely impervious to surface water and spills, making it ideal for kitchens, mudrooms, and basements.',
      },
    ],
  },
  {
    id: 'laminate-flooring',
    slug: 'laminate-flooring',
    title: 'Laminate Flooring Installation',
    tagline: 'Practical Everyday Style & High Wear Resistance',
    shortDesc: 'Budget-friendly, highly durable flooring with impressive wood-grain imagery and AC-rated scratch protection.',
    fullDesc: 'Laminate flooring provides an economical yet stunning wood look. Modern AC4 and AC5 wear layers protect against scuffs, high heels, and busy family pets.',
    heroImage: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Budget-friendly investment', 'High impact & wear rating', 'Easy click installation', 'Vibrant photo-realistic grain'],
    idealFor: ['Bedrooms', 'Living Rooms', 'Rental Units', 'Home Offices'],
    process: ['Subfloor Prep', 'Acoustic Underlayment', 'Interlocking Plank Install', 'Baseboard Re-installation'],
    faqs: [
      {
        question: 'How durable is modern laminate?',
        answer: 'High AC-rated laminate is remarkably tough against scratches and furniture wear, making it a great practical choice for rental properties and busy homes.',
      },
    ],
  },
  {
    id: 'carpet-flooring',
    slug: 'carpet-flooring',
    title: 'Carpet Flooring Installation',
    tagline: 'Unmatched Comfort, Warmth & Sound Absorption',
    shortDesc: 'Plush, comfortable, and noise-reducing carpet installation for plush bedrooms, basements, and quiet office environments.',
    fullDesc: 'Carpet creates cozy, insulated spaces underfoot. HD Flooring offers professional stretch-in carpet installation with high-density padding for ultimate comfort.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Soft and warm thermal comfort', 'Superior sound dampening', 'Stain-resistant fiber options', 'Safe anti-slip surface'],
    idealFor: ['Bedrooms', 'Home Theaters', 'Stairs', 'Corporate Boardrooms'],
    process: ['Tack Strip Prep', 'High-Density Pad Laying', 'Power Stretching', 'Seam Sealing & Trimming'],
    faqs: [
      {
        question: 'Do you supply carpet padding?',
        answer: 'Yes, we recommend and supply premium high-density under-padding to maximize carpet lifespan and foot comfort.',
      },
    ],
  },
  {
    id: 'tile-flooring',
    slug: 'tile-flooring',
    title: 'Tile Flooring Installation',
    tagline: 'High-Strength Porcelain & Ceramic Solutions',
    shortDesc: 'Durable porcelain and ceramic tile installations for moisture-prone areas, foyers, and sleek commercial floors.',
    fullDesc: 'Tile offers unmatched durability, fire resistance, and easy hygienic cleanup. Our master tile setters handle floor leveling, waterproofing membranes, layout alignment, and epoxy or cement grout application.',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Impervious to water and steam', 'Ultra-durable porcelain strength', 'Wide range of large formats', 'Easy to clean and sanitize'],
    idealFor: ['Bathrooms', 'Kitchens', 'Mudrooms', 'Commercial Showrooms'],
    process: ['Subfloor Boarding', 'Waterproofing Membrane', 'Laser Layout', 'Thinset Setting & Grouting'],
    faqs: [
      {
        question: 'Are large format tiles harder to install?',
        answer: 'Large format tiles require exceptionally flat subfloor preparation. Our team specializes in subfloor leveling to ensure zero lippage.',
      },
    ],
  },
  {
    id: 'stair-flooring',
    slug: 'stair-flooring',
    title: 'Stair Flooring & Capping',
    tagline: 'Transformative Staircase Craftsmanship',
    shortDesc: 'Custom hardwood stair capping, nosing, and runner installations that connect your floors seamlessly.',
    fullDesc: 'Stairs are often the focal point of a home entrance. HD Flooring installs solid wood stair treads, custom risers, and matching nosing profiles for flawless stair transformations.',
    heroImage: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Seamless visual flow between levels', 'Durable solid wood treads', 'Custom stain matching available', 'Enhanced safety & grip'],
    idealFor: ['Main Entryway Stairs', 'Curved Staircases', 'Basement Stairs'],
    process: ['Old Carpet Removal', 'Tread Scribing & Cutting', 'Adhesive & Fastener Setting', 'Nosing Alignment'],
    faqs: [
      {
        question: 'Can you match stairs to my existing floor color?',
        answer: 'Yes! We offer custom stained treads to match hardwood or vinyl flooring.',
      },
    ],
  },
  {
    id: 'flooring-replacement',
    slug: 'flooring-replacement',
    title: 'Flooring Replacement Services',
    tagline: 'Complete Tear-out & Fresh Installation',
    shortDesc: 'Hassle-free old floor removal, disposal, and replacement for home updates and whole-house renovations.',
    fullDesc: 'Upgrading your floor starts with clean removal. We safely tear out old carpet, tile, or hardwood, dispose of materials responsibly, and prep your substrate for new flooring.',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Dust-controlled tear-out', 'Responsible waste disposal', 'Underlayment restoration', 'One-stop replacement service'],
    idealFor: ['Older Home Renovations', 'Post-Flood Restoration', 'Fixer-Upper Upgrades'],
    process: ['Demolition & Removal', 'Debris Haul-away', 'Subfloor Repair', 'New Floor Installation'],
    faqs: [
      {
        question: 'Do you handle old flooring disposal?',
        answer: 'Yes! We manage complete waste removal and haul-away as part of our replacement package.',
      },
    ],
  },
  {
    id: 'floor-preparation',
    slug: 'floor-preparation',
    title: 'Professional Floor Preparation',
    tagline: 'The Foundation of a Lasting Installation',
    shortDesc: 'Self-leveling compound, subfloor plywood boarding, and moisture mitigation to guarantee floor longevity.',
    fullDesc: 'No floor looks great without a flat, solid subfloor. We diagnose uneven joists, repair squeaks, apply self-leveling cement, and install cement board or underlayment plywood.',
    heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Prevents floor squeaks & gaps', 'Ensures manufacturer warranty validity', 'Moisture barrier protection', 'Ultra-smooth surface flatness'],
    idealFor: ['Uneven Concrete Slabs', 'Old Plywood Subfloors', 'Condo Subfloor Prep'],
    process: ['Subfloor Inspection', 'Grinding & Patching', 'Self-Leveling Pour', 'Moisture Barrier Seal'],
    faqs: [
      {
        question: 'Why is floor preparation so important?',
        answer: 'Subfloor unevenness causes vinyl click joints to break and hardwood planks to squeak. Proper prep protects your floor investment long-term.',
      },
    ],
  },
];
