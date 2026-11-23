'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent, SyntheticEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  X,
} from 'lucide-react'
import {
  inspirations,
  mapsUrl,
  phoneLink,
  products,
  showroomAddress,
  whatsappUrl,
} from '../lib/siteData'
import type { Inspiration as InspirationItem, Product } from '../lib/siteData'
import SafeImage from './SafeImage'
import SectionHeading from './SectionHeading'

const heroVideos = [
  '/videos/hero-kitchen.mp4',
  '/videos/hero-tile-flatlay.mp4',
  '/videos/hero-bedroom.mp4',
  '/videos/hero-marble-surface.mp4',
  '/videos/hero-wall-tiles.mp4',
]

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const firstVideoRef = useRef<HTMLVideoElement | null>(null)
  const secondVideoRef = useRef<HTMLVideoElement | null>(null)
  const activeIndexRef = useRef(0)
  const activeLayerRef = useRef(0)
  const pendingTransitionRef = useRef<{
    nextIndex: number
    nextLayer: number
    started: boolean
  } | null>(null)
  const sceneReadyHandlerRef = useRef<((layer: number) => void) | null>(null)
  const [activeLayer, setActiveLayer] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [posterError, setPosterError] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches)
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    const firstVideo = firstVideoRef.current
    if (!firstVideo || prefersReducedMotion) return
    firstVideo.src = heroVideos[0]
    firstVideo.preload = 'metadata'
    firstVideo.load()
  }, [prefersReducedMotion])

  const preloadNextScene = (completedIndex: number) => {
    const nextIndex = (completedIndex + 1) % heroVideos.length
    const nextLayer = activeLayerRef.current === 0 ? 1 : 0
    const nextVideo = nextLayer === 0 ? firstVideoRef.current : secondVideoRef.current
    if (!nextVideo || nextVideo.src === new URL(heroVideos[nextIndex], window.location.href).href) return
    nextVideo.src = heroVideos[nextIndex]
    nextVideo.preload = 'metadata'
    nextVideo.load()
  }

  const switchToScene = (nextIndex: number) => {
    if (pendingTransitionRef.current) return
    const nextLayer = activeLayerRef.current === 0 ? 1 : 0
    const nextVideo = nextLayer === 0 ? firstVideoRef.current : secondVideoRef.current
    if (!nextVideo) return

    const transition = { nextIndex, nextLayer, started: false }
    pendingTransitionRef.current = transition
    if (nextVideo.src !== new URL(heroVideos[nextIndex], window.location.href).href) {
      nextVideo.src = heroVideos[nextIndex]
      nextVideo.preload = 'auto'
      nextVideo.load()
    } else if (nextVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      handleSceneReady(nextLayer)
    }
  }

  const handleSceneReady = (layer: number) => {
    const pending = pendingTransitionRef.current
    const nextVideo = layer === 0 ? firstVideoRef.current : secondVideoRef.current
    if (!nextVideo) return

    if (!pending) {
      if (layer === activeLayerRef.current && activeIndexRef.current === 0 && !prefersReducedMotion) {
        nextVideo.play().catch((error) => {
          if (error.name !== 'AbortError') console.error('Hero video playback failed.', error)
        })
      }
      return
    }

    if (pending.nextLayer !== layer || pending.started) return
    const transition = { ...pending, started: true }
    pendingTransitionRef.current = transition
    nextVideo.play().then(() => {
      if (pendingTransitionRef.current !== transition) return
      const previousLayer = activeLayerRef.current
      activeIndexRef.current = transition.nextIndex
      activeLayerRef.current = transition.nextLayer
      pendingTransitionRef.current = null
      setActiveLayer(transition.nextLayer)
      window.setTimeout(() => {
        const previousVideo = previousLayer === 0 ? firstVideoRef.current : secondVideoRef.current
        previousVideo?.pause()
      }, 1200)
    }).catch((error) => {
      if (pendingTransitionRef.current === transition) {
        pendingTransitionRef.current = { ...transition, started: false }
      }
      if (error.name !== 'AbortError') console.error('Hero scene transition failed.', error)
    })
  }

  useEffect(() => {
    sceneReadyHandlerRef.current = handleSceneReady
  })

  const handleSceneEnded = (layer: number) => {
    if (layer !== activeLayerRef.current) return
    const nextIndex = (activeIndexRef.current + 1) % heroVideos.length
    switchToScene(nextIndex)
  }

  const handleSceneError = (layer: number) => {
    const pending = pendingTransitionRef.current
    if (pending?.nextLayer === layer) pendingTransitionRef.current = null
    if (layer === activeLayerRef.current || pending?.nextLayer === layer) {
      console.error(`Hero video failed to load: ${heroVideos[pending?.nextLayer === layer ? pending.nextIndex : activeIndexRef.current]}`)
    }
  }

  const handleTimeUpdate = (layer: number, event: SyntheticEvent<HTMLVideoElement>) => {
    if (layer !== activeLayerRef.current) return
    const video = event.currentTarget
    if (video.duration && video.currentTime / video.duration > 0.68) {
      preloadNextScene(activeIndexRef.current)
    }
  }

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || prefersReducedMotion) {
        firstVideoRef.current?.pause()
        secondVideoRef.current?.pause()
        return
      }

      const activeVideo = activeLayerRef.current === 0
        ? firstVideoRef.current
        : secondVideoRef.current
      if (activeVideo?.paused && !activeVideo.ended) {
        activeVideo.play().catch((error) => {
          if (error.name !== 'AbortError') console.error('Hero video playback failed.', error)
        })
      }

      const pending = pendingTransitionRef.current
      const incomingVideo = pending?.nextLayer === 0
        ? firstVideoRef.current
        : secondVideoRef.current
      if (pending && incomingVideo && incomingVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        sceneReadyHandlerRef.current?.(pending.nextLayer)
      }
    }, { threshold: 0.1 })

    observer.observe(hero)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <Image
        className="hero-image"
        fill
        sizes="100vw"
        priority
        src={posterError ? '/image-fallback.svg' : '/images/living-marble-floor.jpg'}
        alt=""
        onError={() => setPosterError(true)}
      />
      <video
        ref={firstVideoRef}
        className={`hero-video hero-video-layer${activeLayer === 0 ? ' is-active' : ''}`}
        autoPlay={!prefersReducedMotion}
        muted
        loop={false}
        playsInline
        preload="none"
        poster="/images/living-marble-floor.jpg"
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={() => handleSceneReady(0)}
        onEnded={() => handleSceneEnded(0)}
        onError={() => handleSceneError(0)}
        onTimeUpdate={(event) => handleTimeUpdate(0, event)}
      />
      <video
        ref={secondVideoRef}
        className={`hero-video hero-video-layer${activeLayer === 1 ? ' is-active' : ''}`}
        muted
        loop={false}
        playsInline
        preload="none"
        poster="/images/living-marble-floor.jpg"
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={() => handleSceneReady(1)}
        onEnded={() => handleSceneEnded(1)}
        onError={() => handleSceneError(1)}
        onTimeUpdate={(event) => handleTimeUpdate(1, event)}
      />
      <div className="hero-shade" />
      <div className="hero-content is-visible">
        <h1>Elevate Every<br /><em>Reticuloendothelial Fine Tiles</em></h1>
        <p>Discover premium tiles crafted for elegance, durability and modern living.</p>
        <div className="hero-actions">
          <Link className="button button-coral" href="/product">Explore Collection <ArrowRight size={16} /></Link>
          <Link className="button button-ghost" href="/contact">Contact Us <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </section>
  )
}

export function FeaturedCollections() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section className="featured section-pad" id="featured">
      <SectionHeading eyebrow="A few favourites" title={<>Made to be <em>lived in.</em></>} copy="A glimpse of the looks waiting to be discovered at our showroom." />
      <div className="product-grid">
        {products.map((product, index) => (
          <article className="product-card reveal" key={product.name}>
            <button className="product-image" type="button" onClick={() => setSelectedProduct(product)} aria-label={`View details for ${product.name}`}>
              <SafeImage image={product.image} alt={`Close-up of ${product.name} tile finish`} width={850} />
              <span className="product-number">0{index + 1}</span>
              <span className="product-view">Discover <ArrowUpRight size={14} /></span>
            </button>
            <div className="product-info">
              <div><span>{product.category}</span><h3>{product.name}</h3></div>
              <button type="button" onClick={() => setSelectedProduct(product)} aria-label={`View details for ${product.name}`}><ArrowUpRight size={18} /></button>
            </div>
          </article>
        ))}
      </div>
      <div className="center-link"><Link className="text-link" href="/showroom">See the collection in person <ArrowRight size={16} /></Link></div>
      {selectedProduct && (
        <motion.div className="dialog-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedProduct(null)}>
          <motion.section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22 }} onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X size={20} /></button>
            <SafeImage image={selectedProduct.image} alt={`Close-up of ${selectedProduct.name} tile finish`} width={1000} />
            <div className="dialog-copy">
              <span className="eyebrow">{selectedProduct.category}</span>
              <h2 id="product-dialog-title">{selectedProduct.name}</h2>
              <p>{selectedProduct.note}</p>
              <p className="product-size">Sample format <strong>{selectedProduct.size}</strong></p>
              <Link className="button button-dark" href="/contact" onClick={() => setSelectedProduct(null)}>Ask us about this look <ArrowRight size={15} /></Link>
              <small>Illustrative collection preview. Visit our showroom to view available options.</small>
            </div>
          </motion.section>
        </motion.div>
      )}
    </section>
  )
}

export function Inspiration() {
  const [selectedRoom, setSelectedRoom] = useState<InspirationItem | null>(null)

  return (
    <section className="inspiration section-pad" id="inspiration">
      <SectionHeading eyebrow="Room to imagine" title={<>See the space <em>differently.</em></>} copy="A little inspiration for the rooms where life happens." />
      <div className="inspiration-grid">
        {inspirations.map((room, index) => (
          <button
            className={`inspiration-card inspiration-${index + 1} reveal`}
            type="button"
            aria-label={`View ${room.title} inspiration`}
            onClick={() => setSelectedRoom(room)}
            key={room.title}
          >
            <SafeImage image={room.image} alt={room.alt} width={1100} />
            <span className="inspiration-label"><span className="inspiration-number">0{index + 1}</span><span className="inspiration-title">{room.title}</span><ArrowUpRight size={17} /></span>
          </button>
        ))}
      </div>
      {selectedRoom && (
        <motion.div className="dialog-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedRoom(null)}>
          <motion.section className="inspiration-dialog" role="dialog" aria-modal="true" aria-labelledby="inspiration-dialog-title" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22 }} onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" onClick={() => setSelectedRoom(null)} aria-label="Close inspiration view"><X size={20} /></button>
            <SafeImage image={selectedRoom.image} alt={selectedRoom.alt} width={1400} />
            <div className="inspiration-dialog-copy">
              <span className="eyebrow">Room to imagine</span>
              <h2 id="inspiration-dialog-title">{selectedRoom.title}</h2>
              <p>{selectedRoom.alt}. Explore considered tile finishes for this space at Themo Tile.</p>
              <a className="button button-dark" href="#products" onClick={() => setSelectedRoom(null)}>Explore tile collections <ArrowRight size={15} /></a>
            </div>
          </motion.section>
        </motion.div>
      )}
    </section>
  )
}

const testimonials = [
  { quote: '“Demo testimonial — replace with a verified customer review when available.”', name: 'Sample customer', detail: 'Illustrative feedback · Not a verified review' },
  { quote: '“Demo testimonial — replace with a verified customer review when available.”', name: 'Sample customer', detail: 'Illustrative feedback · Not a verified review' },
  { quote: '“Demo testimonial — replace with a verified customer review when available.”', name: 'Sample customer', detail: 'Illustrative feedback · Not a verified review' },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const change = (step: number) => setActive((current) => (current + step + testimonials.length) % testimonials.length)
  return (
    <section className="testimonials section-pad">
      <div className="testimonial-heading">
        <SectionHeading eyebrow="Kind words, soon" title={<>Our community <em>in their words.</em></>} copy="These are clearly marked examples, not actual customer reviews. Verified reviews will be added when supplied." />
        <div className="testimonial-controls">
          <button type="button" onClick={() => change(-1)} aria-label="Previous testimonial"><ChevronLeft size={18} /></button>
          <span>0{active + 1} <i>/</i> 0{testimonials.length}</span>
          <button type="button" onClick={() => change(1)} aria-label="Next testimonial"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <article className={`testimonial-card${active === index ? ' testimonial-active' : ''}`} key={index}>
            <div className="stars" aria-label="Demo rating, not a customer review">
              {[...Array(5)].map((_, star) => <Star key={star} size={14} fill="currentColor" strokeWidth={1} />)}
            </div>
            <p>{item.quote}</p>
            <div className="testimonial-person"><span className="avatar">{String.fromCharCode(65 + index)}</span><span><strong>{item.name}</strong><small>{item.detail}</small></span></div>
          </article>
        ))}
      </div>
      <div className="testimonial-pagination" role="group" aria-label="Select a testimonial">
        {testimonials.map((testimonial, index) => (
          <button
            className={`testimonial-indicator${active === index ? ' is-active' : ''}`}
            key={`indicator-${testimonial.name}-${index}`}
            type="button"
            aria-label={`Show testimonial ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error'
    title: string
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submissionInProgress = useRef(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submissionInProgress.current) return

    submissionInProgress.current = true
    setIsSubmitting(true)
    setFeedback(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })
      const result: unknown = await response.json().catch(() => null)
      const isRecord = typeof result === 'object' && result !== null
      const succeeded = isRecord && 'success' in result && result.success === true

      if (!response.ok || !succeeded) {
        const errorMessage =
          isRecord && 'error' in result && typeof result.error === 'string'
            ? result.error
            : 'We could not send your enquiry right now. Please try again or call us at 63812 43416.'
        setFeedback({
          type: 'error',
          title: 'Unable to send your enquiry',
          message: errorMessage,
        })
        return
      }

      form.reset()
      setFeedback({
        type: 'success',
        title: 'Your message has been recorded successfully!',
        message:
          'Our team will contact you through a phone call within 2–3 working days. A confirmation email has also been sent to your email address.',
      })
    } catch {
      setFeedback({
        type: 'error',
        title: 'Unable to send your enquiry',
        message:
          'We could not send your enquiry right now. Please try again or call us at 63812 43416.',
      })
    } finally {
      submissionInProgress.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-intro reveal">
        <span className="eyebrow">THEMO TILE · CONTACT</span>
        <h2>Let’s find your<br /><em>kind of beautiful.</em></h2>
        <p>Planning a refresh or choosing finishes for a new home? We are happy to help you get started.</p>
        <div className="contact-details" aria-label="Contact details">
          <a className="contact-line" href={phoneLink}><span className="contact-icon"><Phone size={19} /></span><span><small>Give us a call</small><strong>63812 43416</strong></span><ArrowUpRight size={17} /></a>
          <a className="contact-line" href={whatsappUrl} target="_blank" rel="noreferrer"><span className="contact-icon"><MessageCircle size={19} /></span><span><small>Chat on WhatsApp</small><strong>We’re just a message away</strong></span><ArrowUpRight size={17} /></a>
          <a className="contact-line" href={mapsUrl} target="_blank" rel="noreferrer"><span className="contact-icon"><MapPin size={19} /></span><span><small>Visit our showroom</small><strong>{showroomAddress}</strong></span><ArrowUpRight size={17} /></a>
        </div>
      </div>
      <form className="contact-form reveal" onSubmit={handleSubmit}>
        <span className="eyebrow">A NOTE TO OUR TEAM</span>
        <h3>How can we help?</h3>
        <p className="contact-form-intro">Share a little about what you are looking for.</p>
        <label htmlFor="contact-name">Client Name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" required />
        <label htmlFor="contact-phone">Phone Number</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Enter your phone number" pattern="(?=(?:[^0-9]*[0-9]){7,})[0-9+\x2D ]{7,20}" maxLength={20} title="Enter a valid phone number with at least 7 digits." required />
        <label htmlFor="contact-email">Email Address</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="name@example.com" required />
        <label htmlFor="contact-message">Your Message</label>
        <textarea id="contact-message" name="message" rows={4} placeholder="Tell us a little about your project…" required />
        <button className="button button-dark form-submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? <>Sending your enquiry… <LoaderCircle className="form-spinner" size={17} /></> : <>Send an enquiry <ArrowRight size={17} /></>}
        </button>
        {feedback && (
          <div
            className={`form-feedback form-${feedback.type}`}
            role={feedback.type === 'error' ? 'alert' : 'status'}
            aria-live={feedback.type === 'error' ? 'assertive' : 'polite'}
          >
            {feedback.type === 'success' ? <CheckCircle2 size={20} /> : <CircleAlert size={20} />}
            <div>
              <strong>{feedback.title}</strong>
              <p>{feedback.message}</p>
            </div>
          </div>
        )}
      </form>
    </section>
  )
}
