export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'Hardwood' | 'Engineered Hardwood' | 'Vinyl' | 'Laminate' | 'Carpet' | 'Tile';
  propertyType: 'Residential' | 'Commercial';
  location: string;
  coverImage: string;
  galleryImages: string[];
  challenge: string;
  solution: string;
  result: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: '1',
    slug: 'modern-oak-residence-toronto',
    title: 'Modern White Oak Transformation',
    category: 'Hardwood',
    propertyType: 'Residential',
    location: 'Toronto, ON',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    ],
    challenge: 'Uneven 1970s subfloor with squeaking plywood across 2,400 sq ft main floor.',
    solution: 'Complete subfloor leveling, screw reinforcement, and precision glue-assisted nail down of 7-inch wide plank White Oak.',
    result: 'Stunning luxury open-concept living area with seamless room transitions and zero floor noise.',
  },
  {
    id: '2',
    slug: 'waterproof-lvp-condo-mississauga',
    title: 'Waterproof Luxury Vinyl Condo',
    category: 'Vinyl',
    propertyType: 'Residential',
    location: 'Mississauga, ON',
    coverImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80',
    ],
    challenge: 'Condo acoustic regulations required high-STC soundproofing underlayment.',
    solution: 'Installed 8mm rigid core LVP over acoustic rubber underlayment meeting strict HOA standards.',
    result: '100% waterproof flooring perfect for pets and high humidity, fully sound-certified.',
  },
  {
    id: '3',
    slug: 'executive-office-tile-vaughan',
    title: 'Executive Corporate Showroom',
    category: 'Tile',
    propertyType: 'Commercial',
    location: 'Vaughan, ON',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    challenge: 'High foot traffic showroom requiring heavy load porcelain tile installation without lippage.',
    solution: 'Self-leveling poured base, laser alignment, 24x48 porcelain tile setting with epoxy stain-resistant grout.',
    result: 'Ultra-sleek commercial floor designed to withstand heavy foot traffic for decades.',
  },
  {
    id: '4',
    slug: 'heritage-home-engineered-oak',
    title: 'Heritage Home Engineered Wood',
    category: 'Engineered Hardwood',
    propertyType: 'Residential',
    location: 'Oakville, ON',
    coverImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    ],
    challenge: 'Preserving historical architectural trim while installing modern radiant heating floor compatibility.',
    solution: 'Floating engineered European Oak with high thermal conductivity acoustic underlayment.',
    result: 'Warm, elegant atmosphere matching the classic architecture of the home.',
  },
];
