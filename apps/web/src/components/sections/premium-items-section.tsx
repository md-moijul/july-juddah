import { content } from '@/lib/content';


export default function PremiumItemsSection() {
  const { premium_items_section } = content;

  return (
    <section
      id={premium_items_section.id}
      aria-labelledby={`${premium_items_section.id}-headline`}
      className="container mx-auto text-center py-[var(--section-padding-y)] px-[var(--container-padding-x)]">
      <h2
        id={`${premium_items_section.id}-headline`}
        className="text-[var(--h2-font-size)] font-[var(--h2-font-weight)] font-serif leading-[var(--h2-line-height)] text-[var(--primary-text)] mb-[var(--spacing-md)]">
        {premium_items_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto text-[var(--body-font-size)] font-[var(--body-font-weight)] font-sans leading-[var(--body-line-height)] text-[var(--medium-gray-text)] mb-[var(--spacing-lg)]">
        {premium_items_section.subheadline}
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--grid-gap)]">
        {premium_items_section.items.map((item, index) => (
          <div key={index} className="text-left">
            <h3
              className="text-[var(--h3-font-size)] font-[var(--h3-font-weight)] font-sans leading-[var(--h3-line-height)] text-[var(--primary-text)] mb-[var(--spacing-sm)]">
              {item.title}
            </h3>
            <p
              className="text-[var(--body-font-size)] font-[var(--body-font-weight)] font-sans leading-[var(--body-line-height)] text-[var(--medium-gray-text)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
