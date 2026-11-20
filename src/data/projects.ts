export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  year: string;
  location: string;
  area: string;
  duration: string;
  featured: boolean;
  coverImage: string;
  heroImage: string;
  gallery: {
    url: string;
    caption: string;
    aspectRatio?: "landscape" | "portrait" | "wide";
  }[];
  brief: string;
  description: string;
  challenge: string;
  solution: string;
  materials: string[];
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "contemporary-luxury-residence",
    title: "Contemporary Luxury Residence",
    subtitle: "A seamless synthesis of Italian travertine, fluted walnut joinery, and expansive panoramic glazing.",
    category: "Residential Architecture",
    categorySlug: "residential",
    year: "2025",
    location: "Race Course, Covai",
    area: "6,800 sq.ft",
    duration: "10 Months",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
        caption: "Grand double-height living lounge featuring custom bronze architectural screens.",
        aspectRatio: "wide",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
        caption: "Bespoke formal dining salon with custom monolithic quartzite table.",
        aspectRatio: "landscape",
      },
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
        caption: "Master contemplation lounge with floor-to-ceiling smoked walnut millwork.",
        aspectRatio: "portrait",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        caption: "Outdoor transition loggia framing natural verdant courtyard views.",
        aspectRatio: "landscape",
      },
    ],
    brief: "To reimagine an expansive multi-generational urban villa into a private sanctuary that balances grand architectural hospitality with intimate warmth.",
    description: "Conceived as an architectural retreat within the heart of the city, this private residence showcases a refined balance between raw tactile honesty and polished sophistication. Every transition is framed by bespoke walnut portals, guiding natural daylight across hand-finished micro-cement floors and warm limestone surfaces.",
    challenge: "The primary challenge lay in modulating the vast 6,800 square foot floor plan so that grand entertaining zones felt intimately welcoming rather than cavernous.",
    solution: "We introduced acoustic slat walnut ceilings, architectural pocket dividers in brushed antique bronze, and calibrated multi-layer lighting that shifts dynamically between daylight and evening modes.",
    materials: ["Italian Navona Travertine", "American Smoked Walnut", "Brushed Champagne Bronze", "Acoustic Slatted Paneling", "Statuary Marble"],
    features: ["Double-Height Atrium Living", "Custom Temperature-Controlled Cellar", "Motorized Concealed Architectural Glazing", "Sculptural Floating Staircase"],
    metrics: [
      { label: "Built-up Area", value: "6,800 SQ.FT" },
      { label: "Timeline", value: "10 MONTHS" },
      { label: "Custom Joinery", value: "100% BESPOKE" },
    ],
  },
  {
    id: "proj-2",
    slug: "modern-minimalist-home",
    title: "Modern Minimalist Home",
    subtitle: "Understated tranquility shaped by serene tonal ivory, concealed details, and pure architectural geometry.",
    category: "Minimalist Living",
    categorySlug: "residential",
    year: "2024",
    location: "Avinashi Road, Covai",
    area: "4,200 sq.ft",
    duration: "8 Months",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
        caption: "Light-drenched living atrium with flush baseboards and concealed track lighting.",
        aspectRatio: "wide",
      },
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
        caption: "Sculptural seating composition in textured bouclé and raw travertine stone.",
        aspectRatio: "landscape",
      },
      {
        url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85",
        caption: "Minimalist culinary laboratory featuring seamless flush cabinetry and hidden pantry.",
        aspectRatio: "portrait",
      },
    ],
    brief: "Create an oasis of mental clarity and visual calm for a tech entrepreneur family, free from visual clutter while preserving sensory warmth.",
    description: "Modern minimalism at Shinewood is never cold or sterile. In this residence, warmth is discovered through tactile depth: lime-washed plaster walls, subtle shadow-gap details, and custom low-profile seating that emphasizes the purity of volume and shadow.",
    challenge: "Integrating comprehensive smart home automation, high-capacity HVAC, and extensive storage without exposing a single visible switch plate or duct return.",
    solution: "All systems were embedded behind continuous architectural acoustic cladding, with hidden touch points and magnetic flush service access panels.",
    materials: ["Venetian Plaster", "European White Oak", "Natural Honed Sandstone", "Linen Drapery", "Matte Black Titanium Accents"],
    features: ["Zero-Threshold Transitions", "Hidden Pivot Entry Portal", "Concealed Smart Lighting Ecosystem", "Bespoke Low-Slung Modular Furniture"],
    metrics: [
      { label: "Built-up Area", value: "4,200 SQ.FT" },
      { label: "Timeline", value: "8 MONTHS" },
      { label: "Storage Invisible", value: "95% FLUSH" },
    ],
  },
  {
    id: "proj-3",
    slug: "premium-modular-kitchen",
    title: "Premium Modular Kitchen",
    subtitle: "Precision German engineering married with bookmatched Calacatta quartzite and warm reeded oak.",
    category: "Culinary Spaces",
    categorySlug: "kitchen",
    year: "2025",
    location: "Peelamedu, Covai",
    area: "950 sq.ft",
    duration: "6 Weeks",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85",
        caption: "Monolithic 14-foot waterfall kitchen island in honed Calacatta gold quartzite.",
        aspectRatio: "wide",
      },
      {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85",
        caption: "Concealed appliance garage with motorized pocketing tambour doors.",
        aspectRatio: "landscape",
      },
      {
        url: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=85",
        caption: "Integrated breakfast bar with brushed bronze induction cooking surfaces.",
        aspectRatio: "portrait",
      },
    ],
    brief: "To craft a high-performance culinary workspace that transforms effortlessly into an intimate evening cocktail and dining destination.",
    description: "Every drawer pull, hinge resistance, and internal cutlery partition was custom-machined to millimeter tolerances. Warm under-island shadow illumination floats the monolithic stone block, while anti-fingerprint matte nanotech laminate ensures effortless maintenance.",
    challenge: "Handling heavy commercial-grade culinary equipment while preserving a sleek residential salon character.",
    solution: "Designed a secondary butler's prep scullery behind hidden paneled doors, leaving the main open kitchen pristine for hosting and family gatherings.",
    materials: ["Calacatta Gold Quartzite", "Reeded Natural Oak", "Matte Fenix NTM Surfaces", "Smoked Bronze Glass", "Blum Servo-Drive Hardware"],
    features: ["Motorized Touch-to-Open Drawers", "Integrated Downdraft Extraction", "Temperature Controlled Wine Station", "Architectural Task Lighting"],
    metrics: [
      { label: "Kitchen Area", value: "950 SQ.FT" },
      { label: "Island Length", value: "14 FEET" },
      { label: "Hardware Warranty", value: "LIFETIME" },
    ],
  },
  {
    id: "proj-4",
    slug: "elegant-bedroom-design",
    title: "Elegant Bedroom Design",
    subtitle: "An intimate sanctuary of sensory serenity, acoustic isolation, and bespoke handcrafted headboards.",
    category: "Private Suites",
    categorySlug: "bedroom",
    year: "2024",
    location: "R.S. Puram, Covai",
    area: "1,200 sq.ft Suite",
    duration: "7 Weeks",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=85",
        caption: "Custom wrap-around upholstered bouclé headboard wall with integrated brass reading sconces.",
        aspectRatio: "wide",
      },
      {
        url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
        caption: "Walk-in wardrobe corridor with smoked glass fronts and internal leather lined accessories trays.",
        aspectRatio: "landscape",
      },
      {
        url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=85",
        caption: "En-suite bathroom sanctuary clad in continuous floor-to-ceiling Italian Ceppo di Gré stone.",
        aspectRatio: "portrait",
      },
    ],
    brief: "Design a private master suite that acts as an acoustic retreat, nurturing deep rest and tranquil morning routines.",
    description: "The primary suite incorporates acoustic wall upholstery wrapped in Belgian linen, complemented by warm walnut accents and indirect warm cove lighting. The walk-in wardrobe features sensor-activated warm interior lighting and micro-suede accessory drawers.",
    challenge: "Minimizing urban street noise while maximizing natural morning light from east-facing windows.",
    solution: "Installed double-glazed acoustic laminated glazing panels paired with motorized motorized blackout and sheer drapery tracks recessed into the ceiling coffer.",
    materials: ["Belgian Linen Fabric", "American Black Walnut", "Brushed Brass Finishes", "Smoked Fluted Glass", "Hand-tufted Wool Silk Rug"],
    features: ["Acoustic Wall Paneling", "Automated Circadian Lighting", "Walk-in Walk-through Dressing Suite", "En-suite Stone Wet Room"],
    metrics: [
      { label: "Suite Footprint", value: "1,200 SQ.FT" },
      { label: "Acoustic Rating", value: "STC 52" },
      { label: "Wardrobe Linear", value: "32 FEET" },
    ],
  },
  {
    id: "proj-5",
    slug: "luxury-living-room",
    title: "Luxury Living Room",
    subtitle: "A grand architectural reception salon boasting bespoke furniture, sculptural lighting, and curated art.",
    category: "Living Spaces",
    categorySlug: "living",
    year: "2024",
    location: "Kovaipudur, Covai",
    area: "1,850 sq.ft",
    duration: "2 Months",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        caption: "Volumetric living room anchored by a custom low-profile seating island and sculptural chandelier.",
        aspectRatio: "wide",
      },
      {
        url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85",
        caption: "Bespoke media console wall featuring floating Nero Marquina marble hearth.",
        aspectRatio: "landscape",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
        caption: "Architectural reading nook framing private courtyard greenery.",
        aspectRatio: "portrait",
      },
    ],
    brief: "To create an inviting, culturally rich yet effortlessly modern formal living environment for prestigious gatherings.",
    description: "Centering on rich espresso and walnut wood tones paired with tactile bouclé and nubuck leather, this formal living space commands presence. Large floor-to-ceiling glass expanses open toward water features, uniting the indoors with living nature.",
    challenge: "Integrating high-end audiovisual components without disrupting the architectural symmetry of the room.",
    solution: "Engineered a custom acoustic fabric paneling system with motorized art screen mechanisms that hide the 85-inch display when not in use.",
    materials: ["Nero Marquina Marble", "Natural Walnut Veneer", "Italian Nubuck Leather", "Textured Bouclé", "Cast Bronze Lighting"],
    features: ["Concealed Hi-Fi Sound Architecture", "Bespoke 6-Piece Modular Seating", "Custom Fireplace Element", "Art Curation Lighting"],
    metrics: [
      { label: "Living Footprint", value: "1,850 SQ.FT" },
      { label: "Ceiling Height", value: "14 FEET" },
      { label: "Custom Seating", value: "16 GUESTS" },
    ],
  },
  {
    id: "proj-6",
    slug: "contemporary-commercial-space",
    title: "Contemporary Commercial Space",
    subtitle: "A forward-thinking executive headquarters fusing hospitality elegance with focused modern workflow.",
    category: "Commercial Architecture",
    categorySlug: "commercial",
    year: "2025",
    location: "Gandhipuram, Covai",
    area: "8,500 sq.ft",
    duration: "4 Months",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=90",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
        caption: "Executive boardroom with integrated acoustic wood ceiling baffling and panoramic city glass.",
        aspectRatio: "wide",
      },
      {
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85",
        caption: "Boutique reception lounge featuring monolithic cast terrazzo reception desk and warm wood slats.",
        aspectRatio: "landscape",
      },
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
        caption: "Collaborative breakout pods surrounded by biophilic planting and ergonomic seating.",
        aspectRatio: "portrait",
      },
    ],
    brief: "Transform a high-growth industrial enterprise's corporate headquarters into a client-impressing flagship workspace.",
    description: "Departing from corporate grey cubicles, Shinewood infused hospitality DNA into every square foot. Warm walnut, tactile wool upholstery, sound-absorbing felt surfaces, and circadian lighting create an environment where high-stakes decisions occur in serene comfort.",
    challenge: "Managing varied acoustic requirements between lively collaborative team zones and confidential boardroom sessions.",
    solution: "Designed custom acoustic architectural baffles with micro-perforated wood and double-glazed switchable smart glass partitions.",
    materials: ["Micro-perforated Oak", "Terrazzo Cast Surfaces", "Acoustic PET Felt", "Anodized Black Aluminum", "Smart Switchable Glass"],
    features: ["Acoustic Sound Masking", "Bespoke 24-Seat Executive Table", "Curated Biophilic Green Walls", "Hospitality Beverage Bar"],
    metrics: [
      { label: "Floor Area", value: "8,500 SQ.FT" },
      { label: "Workstations", value: "80 DESKS" },
      { label: "Energy Efficiency", value: "LEED GOLD" },
    ],
  },
];
