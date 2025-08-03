import content from '@/data/content.json';
import style from '@/data/style.json';

export default function PremiumItemsSection() {
  const { premium_items_section } = content;
  const { typography, colors, spacing } = style.designSystemProfile.tokens;

  const headlineStyle = typography.scale.h2;
  const subheadlineStyle = typography.scale.body;
  const itemTitleStyle = typography.scale.h3;
  const itemDescriptionStyle = typography.scale.body;

  return (
    <section
      id={premium_items_section.id}
      className="container mx-auto text-center"
      style={{
        paddingTop: spacing.layout.sectionPaddingY,
        paddingBottom: spacing.layout.sectionPaddingY,
        paddingLeft: spacing.layout.containerPaddingX,
        paddingRight: spacing.layout.containerPaddingX,
      }}
    >
      <h2
        style={{
          fontSize: headlineStyle.fontSize,
          fontWeight: headlineStyle.fontWeight,
          fontFamily: typography.family.serif.value,
          lineHeight: headlineStyle.lineHeight,
          color: colors.primary.text.value,
          marginBottom: spacing.scale.md,
        }}
      >
        {premium_items_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto"
        style={{
          fontSize: subheadlineStyle.fontSize,
          fontWeight: subheadlineStyle.fontWeight,
          fontFamily: typography.family['sans-serif'].value,
          lineHeight: subheadlineStyle.lineHeight,
          color: colors.neutral['medium-gray-text'].value,
          marginBottom: spacing.scale.lg,
        }}
      >
        {premium_items_section.subheadline}
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        style={{
          gap: spacing.layout.gridGap,
        }}
      >
        {premium_items_section.items.map((item, index) => (
          <div key={index} className="text-left">
            <h3
              style={{
                fontSize: itemTitleStyle.fontSize,
                fontWeight: itemTitleStyle.fontWeight,
                fontFamily: typography.family['sans-serif'].value,
                lineHeight: itemTitleStyle.lineHeight,
                color: colors.primary.text.value,
                marginBottom: spacing.scale.sm,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: itemDescriptionStyle.fontSize,
                fontWeight: itemDescriptionStyle.fontWeight,
                fontFamily: typography.family['sans-serif'].value,
                lineHeight: itemDescriptionStyle.lineHeight,
                color: colors.neutral['medium-gray-text'].value,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
