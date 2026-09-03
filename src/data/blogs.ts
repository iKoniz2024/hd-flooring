export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  summary: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-choose-the-right-flooring',
    title: 'How to Choose the Right Flooring for Your Home',
    category: 'Flooring Tips',
    readTime: '5 min read',
    publishDate: 'September 2026',
    summary: 'Understand the key factors to consider when selecting flooring for different rooms in Canadian homes.',
    content: [
      'Choosing the right floor involves balancing aesthetics, subfloor conditions, foot traffic, and moisture exposure.',
      'For Canadian basements and moisture-prone areas, Luxury Vinyl or Engineered Wood is often superior to solid timber due to seasonal humidity shifts.',
      'Always test subfloor moisture levels before committing to a hardwood material.',
    ],
  },
  {
    id: '2',
    slug: 'hardwood-vs-luxury-vinyl-flooring',
    title: 'Hardwood vs. Luxury Vinyl: Which Flooring Is Right for You?',
    category: 'Comparison',
    readTime: '6 min read',
    publishDate: 'August 2026',
    summary: 'Compare the characteristics, applications, maintenance, and practical considerations of two popular flooring options.',
    content: [
      'Hardwood offers unmatched authentic real estate value and timeless prestige, while Luxury Vinyl offers 100% waterproof performance and scratch immunity.',
      'If you have active pets or young children, LVP provides peace of mind against spills and claws.',
      'If long-term equity and sanding refinishability are your priority, solid or engineered hardwood remains king.',
    ],
  },
  {
    id: '3',
    slug: 'best-flooring-for-canadian-homes',
    title: 'Best Flooring Options for Busy Canadian Homes',
    category: 'Canadian Homes',
    readTime: '5 min read',
    publishDate: 'August 2026',
    summary: 'Explore practical flooring considerations for households dealing with everyday traffic, pets, children, and changing seasonal conditions.',
    content: [
      'Canadian winters bring snow, salt, and slush into entryways, requiring water-resistant and scratch-durable materials near doors.',
      'Luxury Vinyl Plank (LVP) and Porcelain Tile are top recommendations for Canadian mudrooms and foyers.',
    ],
  },
  {
    id: '4',
    slug: 'how-long-does-flooring-installation-take',
    title: 'How Long Does Flooring Installation Take?',
    category: 'Installation Guide',
    readTime: '4 min read',
    publishDate: 'July 2026',
    summary: 'Learn what factors can influence the timeline of a flooring installation project.',
    content: [
      'A typical 1,000 sq ft residential installation takes between 2 to 4 days.',
      'Key timeline factors include tear-out of existing materials, subfloor leveling compound drying time, and stair nosing scribing.',
    ],
  },
  {
    id: '5',
    slug: 'how-to-maintain-hardwood-flooring',
    title: 'How to Maintain Hardwood Flooring for Decades',
    category: 'Maintenance',
    readTime: '5 min read',
    publishDate: 'June 2026',
    summary: 'Simple maintenance routines to protect your hardwood investment against scratches, spills, and seasonal humidity shifts.',
    content: [
      'Maintain indoor humidity between 35% and 55% to prevent wood plank expansion and gapping during winter.',
      'Use microfiber mops and pH-neutral wood cleaners instead of harsh chemical detergents or excess water.',
    ],
  },
];
