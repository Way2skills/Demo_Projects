import Image from 'next/image'
import {
  Clock3,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from 'lucide-react'

const deliveryBenefits = [
  {
    icon: PackageCheck,
    title: 'FREE DELIVERY',
    copy: 'No additional delivery charges for eligible locations.',
  },
  {
    icon: ShieldCheck,
    title: 'SAFE & SECURE',
    copy: 'Your tiles are carefully handled and transported with care.',
  },
  {
    icon: Clock3,
    title: 'ON-TIME DELIVERY',
    copy: 'We value your time and aim to deliver your tiles as scheduled.',
  },
  {
    icon: MapPin,
    title: 'TO YOUR DOORSTEP',
    copy: 'We bring your selected tiles directly to your location.',
  },
]

export default function DeliverySection() {
  return (
    <section className="home-delivery" aria-labelledby="delivery-title">
      <div className="home-delivery-inner">
        <div className="delivery-copy reveal">
          <span className="eyebrow">A little more convenience, on us</span>
          <h2 id="delivery-title">YOU CHOOSE.<br />WE DELIVER.</h2>
          <div className="delivery-highlight">
            <Truck size={24} strokeWidth={1.6} aria-hidden="true" />
            <strong>100% FREE DOORSTEP DELIVERY</strong>
          </div>
          <p>
            Love our tiles? Purchase your favourite tiles at our showroom and
            enjoy FREE delivery straight to your doorstep. Wherever your
            location is, we bring your chosen tiles to you with care, safety
            and convenience.
          </p>
        </div>

        <div className="delivery-visual reveal">
          <div className="delivery-box-image">
            <Image
              src="/images/tile-samples-detail.jpg"
              alt="A selection of marble and ceramic tile finishes"
              fill
              sizes="(max-width: 720px) 100vw, 55vw"
            />
            <span className="delivery-image-caption">
              Chosen for your space. Delivered with care.
            </span>
          </div>
          <div className="delivery-truck-image">
            <Image
              src="/images/tile-installation.jpg"
              alt="Carefully aligned floor tiles during installation"
              fill
              sizes="(max-width: 720px) 45vw, 25vw"
            />
          </div>
          <span className="delivery-visual-stamp" aria-hidden="true">
            THEMO<br />DELIVERS
          </span>
        </div>
      </div>

      <div className="delivery-benefits">
        {deliveryBenefits.map(({ icon: Icon, title, copy }, index) => (
          <article className="delivery-benefit reveal" key={title}>
            <span className="delivery-benefit-number">0{index + 1}</span>
            <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
