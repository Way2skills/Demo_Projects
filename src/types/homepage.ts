export interface Testimonial {
  quote: string;
  initials: string;
  name: string;
  details: string;
}

export interface Occasion {
  name: string;
  image: string;
  imageAlt: string;
}

export interface CraftDetail {
  title: string;
  description: string;
  icon: "accessibility" | "gem" | "waves";
}

export interface HeroCredential {
  label: string;
  icon: "award" | "check" | "users";
}
