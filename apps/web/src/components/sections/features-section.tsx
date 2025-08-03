
import Image from 'next/image';
import content from '../../data/content.json';
import style from '../../data/style.json';

const FeaturesSection = () => {
  const { features_section } = content;
  const { tokens, components } = style.designSystemProfile;

  const headlineStyle = {
    fontFamily: tokens.typography.family.serif.value,
    fontSize: tokens.typography.scale.h2.fontSize,
    fontWeight: tokens.typography.scale.h2.fontWeight,
    lineHeight: tokens.typography.scale.h2.lineHeight,
    color: tokens.colors.primary.text.value,
  };

  const subheadlineStyle = {
    fontFamily: tokens.typography.family["sans-serif"].value,
    fontSize: tokens.typography.scale.body.fontSize,
    fontWeight: tokens.typography.scale.body.fontWeight,
    lineHeight: tokens.typography.scale.body.lineHeight,
    color: tokens.colors.neutral["medium-gray-text"].value,
  };

  const featureHeadingStyle = {
    fontFamily: components.featureCard.heading.fontFamily,
    fontSize: components.featureCard.heading.fontSize,
    fontWeight: components.featureCard.heading.fontWeight,
  };

  const featureDescriptionStyle = {
    fontFamily: components.featureCard.description.fontFamily,
    fontSize: components.featureCard.description.fontSize,
    color: components.featureCard.description.color,
  };

  const sectionPaddingY = tokens.spacing.layout.sectionPaddingY;
  const containerPaddingX = tokens.spacing.layout.containerPaddingX;
  const gridGap = tokens.spacing.layout.gridGap;

  return (
    <section
      id="features"
      style={{
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
        backgroundColor: tokens.colors.primary.background.value,
      }}
      className="w-full flex justify-center"
    >
      <div
        style={{
          paddingLeft: containerPaddingX,
          paddingRight: containerPaddingX,
          maxWidth: '1280px', // Example max-width from structure.layout
        }}
        className="w-full flex flex-col items-center text-center"
      >
        <h2 style={headlineStyle} className="mb-4">
          {features_section.headline}
        </h2>
        <p style={subheadlineStyle} className="mb-12 max-w-2xl">
          {features_section.subheadline}
        </p>

        <div
          style={{ gap: gridGap }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features_section.features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              {feature.icon && (
                <div className="mb-4">
                  <Image
                    src={`/images/${feature.icon}`} // Assuming icons are in public/images
                    alt={feature.title}
                    width={parseInt(components.featureCard.iconSize)}
                    height={parseInt(components.featureCard.iconSize)}
                  />
                </div>
              )}
              <h3 style={featureHeadingStyle} className="mb-2">
                {feature.title}
              </h3>
              <p style={featureDescriptionStyle}>
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
