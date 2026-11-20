export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  secondaryImage: string;
  deliverables: string[];
  keyHighlights: string[];
  designPhilosophy: string;
  idealFor: string;
}

export const services: Service[] = [
  {
    id: "serv-1",
    slug: "residential-interiors",
    number: "01",
    title: "Residential Interiors",
    shortDescription: "End-to-end bespoke interior architecture for private luxury villas, penthouses, and heritage residences.",
    fullDescription: "Our residential interior practice reimagines how modern families live, connect, and retreat. We integrate spatial planning, custom millwork, curated lighting, and high-performance materials into a cohesive living tapestry tailored uniquely to your lifestyle rhythm.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Comprehensive Architectural Spatial Layouts",
      "3D Photorealistic Visualizations & Material Boards",
      "Custom Millwork & Architectural Detailing",
      "Lighting Design, Automation & Smart Home Integration",
      "Turnkey Site Execution & Project Management",
    ],
    keyHighlights: [
      "Tailored lifestyle programming for every family member",
      "Harmonious flow between indoor and landscaped outdoor zones",
      "Direct sourcing of premier Italian stones and European veneers",
      "Strict schedule adherence and transparent milestones",
    ],
    designPhilosophy: "A luxury home should never feel like a showroom; it should be an intimate sanctum that nurtures the spirit through timeless tactility and calm order.",
    idealFor: "Luxury villas, sprawling apartments, independent bungalows, and multi-generational estates in Covai and across South India.",
  },
  {
    id: "serv-2",
    slug: "luxury-living-spaces",
    number: "02",
    title: "Luxury Living Spaces",
    shortDescription: "Statement formal salons, media lounges, and double-height entertaining atriums crafted for unforgettable hospitality.",
    fullDescription: "The living room is the grand stage of the modern residence. We choreograph spatial proportion, tactile seating, bespoke chandeliers, and monolithic stone features to craft living spaces that leave guests breathless while remaining deeply comfortable for casual everyday enjoyment.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Double-Height Ceiling Architectural Feature Plans",
      "Curated Sculptural Seating & Bespoke Sofas",
      "Floating Fireplace & TV Media Wall Engineering",
      "Art Procurement, Framing & Museum-Grade Spotlighting",
      "Acoustic Calibration for Audiophile Experience",
    ],
    keyHighlights: [
      "Layered illumination with daylight, ambient, and mood scenes",
      "Bookmatched marble and quartzite accent statements",
      "Concealed wiring and hidden audio-video engineering",
      "Custom imported carpets hand-knotted to exact room scale",
    ],
    designPhilosophy: "True luxury is effortless; every guest instinctively feels welcomed into a realm of refined elegance without feeling constrained.",
    idealFor: "Grand formal halls, double-height penthouses, reception lounges, and lifestyle party spaces.",
  },
  {
    id: "serv-3",
    slug: "modular-kitchen-design",
    number: "03",
    title: "Modular Kitchen Design",
    shortDescription: "Ergonomic German-engineered culinary architecture marrying seamless flush cabinetry with indestructible natural stones.",
    fullDescription: "We view the kitchen as the heart and culinary laboratory of the home. By combining precision German and Austrian hardware with tactile finishes like fluted oak, smoked glass, and sintered stone, our kitchens deliver commercial-grade performance wrapped in residential artistry.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "3D Ergonomic Workflow & Appliance Integration Plan",
      "Custom Island Architecture with Built-in Dining Ledges",
      "Concealed Butler Scullery & Wet Kitchen Separation",
      "Anti-fingerprint Nanotech Laminates & Acrylic Doors",
      "Blum & Hettich Certified Lifetime Hardware Warranty",
    ],
    keyHighlights: [
      "Full motorized touch-to-open and soft-close mechanisms",
      "Deep pantry pullouts, spice carousels, and concealed trash systems",
      "Heat-proof, scratch-resistant quartzite and porcelain countertops",
      "Integrated under-cabinet task illumination and socket channels",
    ],
    designPhilosophy: "Cooking is a sensory ritual. When ergonomics and aesthetics align in harmony, the everyday culinary act becomes pure joy.",
    idealFor: "Modern homeowners, passionate cooks, and families seeking effortless cleanliness and prestige styling.",
  },
  {
    id: "serv-4",
    slug: "bedroom-interiors",
    number: "04",
    title: "Bedroom Interiors",
    shortDescription: "Private sleep sanctuaries featuring tailored acoustic paneling, circadian lighting, and walk-through dressing corridors.",
    fullDescription: "Rest is paramount. Our bedroom designs are sensory retreats tuned for restorative sleep. We utilize acoustic wall fabrics, concealed air conditioning ducts, motorized blackout drapery, and warm circadian lighting to create an environment free of distraction.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Bespoke Upholstered Headboard Wall Structures",
      "Walk-in Closet & Wardrobe Systems with Interior Illumination",
      "Concealed Vanity Dressing Stations & Jewelry Safes",
      "Acoustic Decoupling & Soundproofing Treatments",
      "Automated Nighttime Path & Bedside Reading Controls",
    ],
    keyHighlights: [
      "Custom textured fabrics: Belgian linen, bouclé, and soft velvets",
      "Smoked glass wardrobe doors with motion-sensor LED lighting",
      "Zero-glare indirect lighting to support healthy sleep cycles",
      "Integrated study or morning coffee seating nooks",
    ],
    designPhilosophy: "Your bedroom should be the quietest room in your universe — an intentional cocoon where the pressures of the day dissolve into pure serenity.",
    idealFor: "Master bedroom suites, guest quarters, children's bedrooms, and luxury attic retreats.",
  },
  {
    id: "serv-5",
    slug: "commercial-interiors",
    number: "05",
    title: "Commercial Interiors",
    shortDescription: "High-impact corporate headquarters, boutique executive offices, and luxury retail destinations designed to elevate brand authority.",
    fullDescription: "Shinewood creates commercially intelligent architecture that inspires employees and captivates discerning clients. By marrying corporate ergonomics with luxury hospitality finishes, we redefine what a modern workspace feels like.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Corporate Brand Identity Translation into Space",
      "Executive Boardroom & Conference Suite Design",
      "Acoustic Privacy Phone Booths & Collaboration Pods",
      "Boutique Reception & Client Welcome Lounges",
      "LEED & Green Building Compliant Material Specifications",
    ],
    keyHighlights: [
      "Biophilic integration with indoor vertical greenery",
      "Smart switchable glass and acoustic micro-perforated paneling",
      "High-durability commercial grade finishes with luxury appearance",
      "Optimized flow balancing focus, collaboration, and executive privacy",
    ],
    designPhilosophy: "A company's physical space is its most tangible brand manifesto. It signals vision, ambition, and cultural excellence.",
    idealFor: "Executive offices, corporate headquarters, law firms, private medical clinics, and flagship retail showrooms.",
  },
  {
    id: "serv-6",
    slug: "custom-furniture-woodwork",
    number: "06",
    title: "Custom Furniture & Woodwork",
    shortDescription: "Artisanal joinery, bespoke dining tables, fluted wall paneling, and architectural doors handcrafted by master artisans.",
    fullDescription: "Where standard retail furniture ends, Shinewood's bespoke atelier begins. Our master craftsmen cut, cure, veneer, and finish one-of-a-kind timber architectural elements that become heirloom treasures inside your space.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Bespoke Monolithic Dining Tables & Conference Surfaces",
      "Architectural Fluted Wall Paneling & Room Dividers",
      "Handcrafted Entry Pivot Doors with Custom Bronze Handles",
      "Integrated Bookshelves, Credenzas & Bar Cabinets",
      "Timber Selection, Moisture-Control Curing & Premium Polish",
    ],
    keyHighlights: [
      "Direct choice of seasoned Burma Teak, American Walnut, and White Oak",
      "Traditional mortise-and-tenon joinery reinforced with modern precision",
      "Zero-VOC organic oil, polyurethane, and matte lacquer finishes",
      "Lifetime structural integrity against climate warping",
    ],
    designPhilosophy: "Wood carries a living memory. When touched by the hands of a master artisan, it breathes warmth and permanence into the architecture.",
    idealFor: "Discerning homeowners seeking completely unique, unrepeatable furniture and custom architectural millwork.",
  },
];
