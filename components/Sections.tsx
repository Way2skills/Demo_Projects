import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  HeartHandshake,
  Layers3,
  MapPin,
  Sparkles,
} from 'lucide-react'
import {
  categories,
  mapsUrl,
  phoneLink,
  showroomAddress,
} from '../lib/siteData'
import SafeImage from './SafeImage'
import SectionHeading from './SectionHeading'

export function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-visual reveal">
        <div className="about-image-frame">
          <SafeImage image="/images/about-green-marble-v1.jpeg" alt="Bedroom with a deep green, gold-veined marble feature wall" width={1100} />
        </div>
        <div className="about-note"><span>THE ART OF</span><strong>considered<br />surfaces</strong><i>—</i></div>
        <span className="about-image-caption">A room to make your own</span>
      </div>
      <div className="about-copy reveal">
        <span className="eyebrow">A little about us</span>
        <h2>Every beautiful space<br />starts <em>underfoot.</em></h2>
        <p className="about-lead">At Themo Tile, we believe the surfaces around us shape the way a space feels.</p>
        <p>That is why our showroom brings together a thoughtful selection of tiles for real homes and everyday living. From understated stone-inspired finishes to warm wood looks, we are here to help you explore, compare and find the right fit for your space.</p>
        <p>We are a local showroom in Namakkal, ready to welcome you in and help make choosing a little easier.</p>
        <Link className="text-link" href="/showroom">Get to know our showroom <ArrowRight size={16} /></Link>
        <div className="about-values">
          <div><span>Our vision</span><p>Beautiful surfaces, made more approachable.</p></div>
          <div><span>Our promise</span><p>A considered choice for every kind of home.</p></div>
        </div>
      </div>
    </section>
  )
}

const benefits = [
  { icon: BadgeCheck, title: 'Quality you can feel', copy: 'Explore carefully selected finishes made for the rhythm of everyday life.' },
  { icon: Sparkles, title: 'Design with character', copy: 'Find timeless textures and contemporary looks to make a space your own.' },
  { icon: Layers3, title: 'Options for every plan', copy: 'A thoughtful range of materials, looks and sizes to suit your project.' },
  { icon: HeartHandshake, title: 'Here to help', copy: 'Our team is happy to help you compare options and choose with confidence.' },
]

export function WhyChooseUs() {
  return (
    <section className="why section-pad">
      <SectionHeading eyebrow="The Themo difference" title={<>Good design. <em>Made personal.</em></>} copy="A little guidance and the right surface can bring a whole room together." />
      <div className="benefit-grid">
        {benefits.map(({ icon: Icon, title, copy }, index) => (
          <article className="benefit reveal" key={title}>
            <span className="benefit-number">0{index + 1}</span>
            <Icon className="benefit-icon" size={25} strokeWidth={1.4} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ProductCategories() {
  return (
    <section className="categories section-pad" id="products">
      <SectionHeading eyebrow="Find your finish" title={<>A surface for <em>every story.</em></>} copy="Explore the looks and materials that can make a room feel unmistakably yours." />
      <div className="category-grid" id="categories">
        {categories.map((category, index) => (
          <a className={`category-card category-${index + 1} reveal`} href="#featured" key={category.title}>
            <SafeImage image={category.image} alt={`${category.title} tile inspiration`} width={850} />
            <div className="category-overlay">
              <span>{category.description}</span>
              <h3>{category.title}</h3>
              <span className="category-arrow" aria-hidden="true"><span>Explore Collection</span><ArrowUpRight size={18} /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export function Showroom() {
  return (
    <section className="showroom" id="showroom">
      <div className="showroom-image reveal">
        <SafeImage image="/images/showroom-green-marble-v2.jpeg" alt="Deep green marble feature wall behind a modern dining table" width={1600} />
        <span className="showroom-stamp"><span>THEMO</span><span>TILE · NAMAKKAL</span></span>
      </div>
      <div className="showroom-copy reveal">
        <span className="eyebrow">Come see for yourself</span>
        <h2>A good choice<br />starts with <em>a visit.</em></h2>
        <p>See the textures up close, compare finishes in person, and take your time finding the right one. We would love to welcome you to Themo Tile.</p>
        <a className="showroom-address" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={19} /><span><strong>Find our showroom</strong><small>{showroomAddress}</small></span></a>
        <div className="showroom-actions">
          <a className="button button-dark" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a>
          <a className="text-link" href={phoneLink}>Call 63812 43416 <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  )
}
