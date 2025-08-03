
import Image from 'next/image';
import { content } from '@/lib/content';

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="w-full flex justify-center py-16 md:py-32 bg-background"
    >
      <div
        className="w-full flex flex-col items-center text-center px-4 max-w-screen-xl"
      >
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-4 text-foreground">
          {content.features_section.headline}
        </h2>
        <p className="font-sans text-base font-normal mb-12 max-w-2xl text-muted-foreground">
          {content.features_section.subheadline}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.features_section.features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              {feature.icon && (
                <div className="mb-4">
                  <Image
                    src={`/images/${feature.icon}`}
                    alt={feature.title}
                    width={24}
                    height={24}
                  />
                </div>
              )}
              <h3 className="font-sans text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="font-sans text-base text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
