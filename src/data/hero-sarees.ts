export interface HeroSaree {
  id: string;
  productId: string;
  name: string;
  fabricImage: string;
  modelImage: string;
  modelAlt: string;
  drapeDescription: string;
  price: string;
  collectionLabel: string;
}

export const heroSarees: HeroSaree[] = [
  {
    id: "katan-brocade",
    productId: "rani-pink-brocade",
    name: "Katan Brocade",
    fabricImage: "/images/katan-brocade-fabric.svg",
    modelImage: "/images/hero-katan-model.jpg",
    modelAlt: "Model wearing a rani-pink silk sari with antique-gold zari",
    drapeDescription: "Katan Brocade",
    price: "₹1,280",
    collectionLabel: "Bridal Heirlooms",
  },
  {
    id: "banarasi-silk",
    productId: "emerald-kadhwa",
    name: "Banarasi Silk",
    fabricImage: "/images/banarasi-silk-fabric.svg",
    modelImage: "/images/hero-banarasi-model.jpg",
    modelAlt: "Model wearing an emerald-green Banarasi silk sari",
    drapeDescription: "Banarasi Silk",
    price: "₹920",
    collectionLabel: "Varanasi Heritage",
  },
  {
    id: "kanchipuram-silk",
    productId: "midnight-neelambari",
    name: "Kanchipuram Silk",
    fabricImage: "/images/kanchipuram-silk-fabric.svg",
    modelImage: "/images/hero-kanchipuram-model.jpg",
    modelAlt: "Midnight-blue silk sari on a mannequin with a traditional gold Kanchipuram border",
    drapeDescription: "Kanchipuram Silk",
    price: "₹1,150",
    collectionLabel: "Southern Looms",
  },
  {
    id: "tussar-zari",
    productId: "rosewood-tussar-zari",
    name: "Tussar Zari",
    fabricImage: "/images/tussar-zari-fabric.svg",
    modelImage: "/images/hero-tussar-model.jpg",
    modelAlt: "Model wearing an ivory silk sari with delicate gold detailing",
    drapeDescription: "Tussar Zari",
    price: "₹740",
    collectionLabel: "Atelier Silks",
  },
];
