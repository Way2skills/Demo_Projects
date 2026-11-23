import { Accessibility, Gem, Waves } from "lucide-react";
import { craftDetails } from "@/data/homepage";
import styles from "./craftsmanship-section.module.css";

const craftIcons = {
  accessibility: Accessibility,
  gem: Gem,
  waves: Waves,
};

export default function CraftsmanshipSection() {
  return (
    <section
      className={`craft-section section-shell ${styles.craftSection}`}
      id="craft"
    >
      <div className="craft-copy">
        <span className="dark-kicker">
          <span /> The Guild Legacy
        </span>
        <h2>
          The Craft of
          <br />
          <span>Nool</span> &amp; <span>Zari</span>
        </h2>
        <p className="craft-intro">
          In classical Tamil, <em>nool</em> means the sacred thread of cotton
          or raw silk. <em>Zari</em> represents the ancient Persian art of
          flattening pure silver and molten gold wire to weave with the
          celestial.
        </p>
        <p className="craft-description">
          For over four decades, our private atelier has preserved these
          600-year-old pit loom legacies across South India and the holy banks
          of Varanasi, resisting synthetic shortcuts in favor of generational
          patience.
        </p>
        <div className="craft-details">
          {craftDetails.map(({ title, description, icon }) => {
            const Icon = craftIcons[icon];
            return (
              <article className="craft-detail" key={title}>
                <Icon size={25} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            );
          })}
        </div>
      </div>
      <div className={`craft-visual ${styles.visual}`}>
        <span className="visually-hidden">
          A master weaver at work on a traditional wooden pit loom
        </span>
        <div className={`artisan-caption ${styles.artisanCard}`}>
          <div>
            <span>Master Craftsman</span>
            <h3>Somasundaram Pillai</h3>
            <p>4th Generation Kanchipuram Weaver • 38 Years at Loom</p>
          </div>
          <Gem size={23} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
