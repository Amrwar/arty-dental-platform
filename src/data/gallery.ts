/**
 * The gallery, and the filters above it.
 *
 * Every item is filed under one of the categories; a test checks that none
 * of them points at a filter that is not offered, which is otherwise an
 * image nobody can reach.
 */

export interface GalleryCategory {
  id: string
  label: string
}

export interface GalleryItem {
  id: number
  /** One of the category ids, or the item cannot be filtered to. */
  category: string
  title: string
  description: string
  image: string
}

export const categories: GalleryCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'smiles', label: 'Smile Transformations' },
  { id: 'clinic', label: 'Our Clinic' },
  { id: 'team', label: 'Team & Events' },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'smiles',
    title: 'Teeth Whitening Transformation',
    description: 'Professional whitening treatment revealing a brighter, more confident smile.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    category: 'clinic',
    title: 'Modern Treatment Room',
    description: 'State-of-the-art equipment in a comfortable, welcoming environment.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    category: 'smiles',
    title: 'Veneer Makeover',
    description: 'Complete smile transformation with custom porcelain veneers.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    category: 'clinic',
    title: 'Welcoming Reception',
    description: 'Our bright, modern reception area designed for your comfort.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    category: 'team',
    title: 'Our Dental Team',
    description: 'The dedicated professionals behind every beautiful smile.',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    category: 'smiles',
    title: 'Invisalign Journey',
    description: 'Subtle, effective teeth straightening for a perfect alignment.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=600&fit=crop',
  },
  {
    id: 7,
    category: 'clinic',
    title: 'Digital X-Ray Suite',
    description: 'Advanced imaging technology for precise diagnostics.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop',
  },
  {
    id: 8,
    category: 'team',
    title: 'Community Outreach',
    description: 'Giving back through free dental care events.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop',
  },
  {
    id: 9,
    category: 'smiles',
    title: 'Dental Implant Result',
    description: 'Natural-looking implant restoration for a complete smile.',
    image: 'https://images.unsplash.com/photo-1445527815219-ecbfec67492e?w=800&h=600&fit=crop',
  },
]

/** The filters a visitor can pick, `all` included. */
export function categoryIds(): string[] {
  return categories.map((category) => category.id)
}

/** The items a filter shows; `all` shows everything. */
export function itemsInCategory(categoryId: string): GalleryItem[] {
  if (categoryId === 'all') return galleryItems
  return galleryItems.filter((item) => item.category === categoryId)
}
