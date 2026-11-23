export type Category = {
  title: string
  description: string
  image: string
  position: string
}

export type Product = {
  name: string
  category: string
  note: string
  size: string
  image: string
}

export type Inspiration = {
  title: string
  image: string
  alt: string
}

export const categories: Category[] = [
  {
    title: 'Floor Tiles',
    description: 'A considered foundation for every room.',
    image: '/images/living-marble-floor.jpg',
    position: 'center',
  },
  {
    title: 'Wall Tiles',
    description: 'Give your walls a little more character.',
    image: '/images/wall-texture.jpg',
    position: 'center',
  },
  {
    title: 'Bathroom Tiles',
    description: 'Quietly beautiful, made for everyday rituals.',
    image: '/images/bathroom-tiles.jpg',
    position: 'center',
  },
  {
    title: 'Kitchen Tiles',
    description: 'Practical surfaces with a refined finish.',
    image: '/images/kitchen-backsplash.jpg',
    position: 'center',
  },
  {
    title: 'Vitrified Tiles',
    description: 'Enduring strength with a polished point of view.',
    image: '/images/tile-samples.jpg',
    position: 'center',
  },
  {
    title: 'Wooden Finish',
    description: 'The warmth of timber, with a contemporary edge.',
    image: '/images/wood-effect-tiles.jpg',
    position: 'center',
  },
  {
    title: 'Outdoor Tiles',
    description: 'Thoughtful finishes that continue outdoors.',
    image: '/images/outdoor-pattern.jpg',
    position: 'center',
  },
]

export const products: Product[] = [
  {
    name: 'Calacatta Veil',
    category: 'Porcelain · Polished',
    note: 'A luminous marble-inspired surface with delicate, flowing veining.',
    size: '600 × 1200 mm',
    image: '/images/marble-tile.jpg',
  },
  {
    name: 'Siena Limestone',
    category: 'Vitrified · Matte',
    note: 'Soft, natural tones bring an easy warmth to contemporary rooms.',
    size: '600 × 600 mm',
    image: '/images/floor-pattern.jpg',
  },
  {
    name: 'Smoked Oak',
    category: 'Wood Finish · Matte',
    note: 'A grounded timber look, thoughtfully suited to modern living.',
    size: '200 × 1200 mm',
    image: '/images/wood-effect-tiles.jpg',
  },
  {
    name: 'Ivory Travertine',
    category: 'Porcelain · Natural',
    note: 'Understated texture and a quiet palette for lasting interiors.',
    size: '600 × 1200 mm',
    image: '/images/tile-variety.jpg',
  },
]

export const inspirations: Inspiration[] = [
  {
    title: 'Living Room',
    image: '/images/living-marble-floor.jpg',
    alt: 'Luxury modern living room with elegant stone-look flooring',
  },
  {
    title: 'Bedroom',
    image: '/images/sunlit-tile-floor.jpg',
    alt: 'Decorative floor tiles with a warm sunlit finish',
  },
  {
    title: 'Kitchen',
    image: '/images/kitchen-counter-tiles.jpg',
    alt: 'Geometric ceramic backsplash tiles in a modern kitchen',
  },
  {
    title: 'Bathroom',
    image: '/images/bathroom-tiles.jpg',
    alt: 'Marble-look tiles across a bright bathroom',
  },
  {
    title: 'Outdoor',
    image: '/images/outdoor-pattern.jpg',
    alt: 'Blue mosaic outdoor floor tiles with a detailed pattern',
  },
]

export const imageUrl = (imageId: string, width = 1000) =>
  imageId.startsWith('/')
    ? imageId
    : `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=${width}&q=85`

export const showroomAddress = 'Salem Road, Namakkal – 637001, Tamil Nadu, India'
export const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=THEMO+TILE%2C+Salem+Road%2C+Namakkal+637001%2C+Tamil+Nadu'
export const phoneLink = 'tel:+916381243416'
export const whatsappUrl = 'https://wa.me/916381243416'
