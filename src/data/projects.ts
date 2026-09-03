export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
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
    slug: 'sheet-vinyl-coving-hospital-saskatoon',
    title: 'Hygienic Sheet Vinyl & Flash Coving',
    category: 'Sheet Vinyl',
    propertyType: 'Commercial',
    location: 'Saskatoon, SK',
    coverImage: '/assets/images/sheet-vinyl-coving/sheet-vinyl-coving-01.jpg',
    galleryImages: [
      '/assets/images/sheet-vinyl-coving/sheet-vinyl-coving-01.jpg',
      '/assets/images/sheet-vinyl-coving/sheet-vinyl-coving-02.jpg',
    ],
    challenge: 'High-hygiene commercial facility required 100% watertight flooring with curved baseboard flash coving to comply with Saskatchewan health regulations.',
    solution: 'HD Flooring installed heat-welded PVC sheet vinyl with seamless wall flash coving and sealed corner trim.',
    result: 'Flawless anti-bacterial floor, easy to sanitize, and 100% watertight protection.',
  },
  {
    id: '2',
    slug: 'luxury-vinyl-plank-condo-renovation',
    title: 'Luxury Vinyl Plank (LVP) Installation',
    category: 'Vinyl',
    propertyType: 'Residential',
    location: 'Saskatoon, SK',
    coverImage: '/assets/images/lvp-lvt-vct-vinyl/luxury-vinyl-plank-01.jpg',
    galleryImages: [
      '/assets/images/lvp-lvt-vct-vinyl/luxury-vinyl-plank-01.jpg',
      '/assets/images/lvp-lvt-vct-vinyl/luxury-vinyl-plank-02.jpg',
    ],
    challenge: 'Homeowner needed durable, waterproof flooring for an active family basement resistant to moisture and scratches.',
    solution: 'Installed 20mil click-lock LVP planks over acoustic IXPE sound-dampening underlayment.',
    result: 'Stunning natural wood texture with complete waterproofing and zero foot noise.',
  },
  {
    id: '3',
    slug: 'solid-hardwood-living-room',
    title: 'Solid Hardwood Flooring Transformation',
    category: 'Hardwood',
    propertyType: 'Residential',
    location: 'Regina, SK',
    coverImage: '/assets/images/hardwood-flooring/solid-hardwood-01.jpg',
    galleryImages: [
      '/assets/images/hardwood-flooring/solid-hardwood-01.jpg',
      '/assets/images/hardwood-flooring/solid-hardwood-02.jpg',
    ],
    challenge: 'Uneven subfloors and squeaky boards in an older home requiring full solid timber installation.',
    solution: 'Re-fastened subfloor joists, installed moisture barrier paper, and nail-down pre-finished white oak hardwood planks.',
    result: 'Quiet, luxurious real wood floor that elevated total property value.',
  },
  {
    id: '4',
    slug: 'engineered-wood-condo-tower',
    title: 'Engineered Hardwood Suite Upgrade',
    category: 'Engineered Hardwood',
    propertyType: 'Residential',
    location: 'Saskatoon, SK',
    coverImage: '/assets/images/engineered-hardwood/engineered-wood-01.jpg',
    galleryImages: [
      '/assets/images/engineered-hardwood/engineered-wood-01.jpg',
      '/assets/images/engineered-hardwood/engineered-wood-02.jpg',
    ],
    challenge: 'Condominium board required strict acoustic IIC sound insulation and climate stability against Canadian winter heat.',
    solution: 'HD Flooring installed floating 7.5-inch wide engineered hardwood planks over high-density rubber acoustic membrane.',
    result: 'Quiet, elegant wide-plank wood floor exceeding condo soundproofing requirements.',
  },
  {
    id: '5',
    slug: 'porcelain-tile-commercial-showroom',
    title: 'Large-Format Porcelain Tile Setting',
    category: 'Tile',
    propertyType: 'Commercial',
    location: 'Saskatoon, SK',
    coverImage: '/assets/images/tile-porcelain/porcelain-tile-01.jpg',
    galleryImages: [
      '/assets/images/tile-porcelain/porcelain-tile-01.jpg',
      '/assets/images/tile-porcelain/porcelain-tile-02.jpg',
    ],
    challenge: 'High foot traffic retail entrance required heavy-duty porcelain tiles laid with zero lip height variation.',
    solution: 'Used laser leveling grid system, polymer thinset mortar, and stain-resistant epoxy grout.',
    result: 'Seamless, high-durability porcelain floor built to withstand thousands of daily visitors.',
  },
  {
    id: '6',
    slug: 'custom-hardwood-stair-capping',
    title: 'Custom Hardwood Stair Capping',
    category: 'Stairs',
    propertyType: 'Residential',
    location: 'Prince Albert, SK',
    coverImage: '/assets/images/stair-flooring/stair-capping-01.jpg',
    galleryImages: [
      '/assets/images/stair-flooring/stair-capping-01.jpg',
      '/assets/images/stair-flooring/stair-capping-02.jpg',
    ],
    challenge: 'Old worn stair carpet needed replacement with solid oak stair treads matching upper hallway wood floors.',
    solution: 'Scribed each tread individually, installed solid oak stair capping with bullnose profiles, and stained to match.',
    result: 'Architectural staircase transformation that seamlessly connects upper and main levels.',
  },
];
