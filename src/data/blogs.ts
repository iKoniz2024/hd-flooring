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
    title: 'How to Choose the Right Flooring for Your Canadian Home',
    category: 'Flooring Guide',
    readTime: '5 min read',
    publishDate: 'September 2026',
    summary: 'Understand the key factors to consider when selecting flooring for different rooms and Canadian weather conditions.',
    content: [
      'Choosing the right floor involves balancing aesthetics, budget, subfloor conditions, and moisture exposure.',
      'For Canadian basements and moisture-prone areas, Luxury Vinyl or Engineered Wood is often superior to solid timber due to seasonal humidity shifts.',
      'Always test subfloor moisture levels before committing to a hardwood material.',
    ],
  },
  {
    id: '2',
    slug: 'hardwood-vs-luxury-vinyl-flooring',
    title: 'Hardwood vs. Luxury Vinyl: Which Is Right for You?',
    category: 'Comparison',
    readTime: '6 min read',
    publishDate: 'August 2026',
    summary: 'Compare the characteristics, maintenance, life expectancy, and costs of solid hardwood versus luxury vinyl planks.',
    content: [
      'Hardwood offers unmatched authentic real estate value and timeless prestige, while Luxury Vinyl offers 100% waterproof performance and scratch immunity.',
      'If you have active pets or young children, LVP provides peace of mind against spills and claws.',
      'If long-term equity and sanding refinishability are your priority, solid or engineered hardwood remains king.',
    ],
  },
  {
    id: '3',
    slug: 'how-long-does-flooring-installation-take',
    title: 'How Long Does Flooring Installation Take?',
    category: 'Installation Tips',
    readTime: '4 min read',
    publishDate: 'July 2026',
    summary: 'Learn what factors influence your flooring project timeline, from subfloor prep to furniture resetting.',
    content: [
      'A typical 1,000 sq ft residential installation takes between 2 to 4 days.',
      'Key timeline factors include tear-out of existing materials, subfloor leveling compound drying time, and stair nosing scribing.',
    ],
  },
];
