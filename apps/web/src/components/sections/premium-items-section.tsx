import { content } from '@/lib/content';


export default function PremiumItemsSection() {
  const { premium_items_section } = content;

  return (
    <section
      id={premium_items_section.id}
      aria-labelledby={`${premium_items_section.id}-headline`}
      className="container mx-auto text-center py-16 px-8">
      <h2
        id={`${premium_items_section.id}-headline`}
        className="text-4xl font-bold font-serif leading-tight text-primary-text mb-4">
        {premium_items_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto text-lg font-normal font-sans leading-normal text-medium-gray-text mb-8">
        {premium_items_section.subheadline}
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {premium_items_section.items.map((item, index) => (
          <div key={index} className="text-left">
            <h3
              className="text-2xl font-bold font-sans leading-tight text-primary-text mb-2">
              {item.title}
            </h3>
            <p
              className="text-lg font-normal font-sans leading-normal text-medium-gray-text">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
