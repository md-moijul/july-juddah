import content from '@/data/content.json';
import style from '@/data/style.json';
import { Button } from '@/components/ui/button';

export default function DisclaimerSection() {
  const { disclaimer_section } = content;
  const { typography, colors, spacing } = style.designSystemProfile.tokens;
  const { components } = style.designSystemProfile;

  const headlineStyle = typography.scale.h2;
  const descriptionStyle = typography.scale.body;
  const labelStyle = typography.scale['sub-text'];
  const buttonBaseStyle = components.button.baseStyle;
  const buttonPrimaryVariant = components.button.variants.primary;

  return (
    <section
      id="disclaimer"
      className="container mx-auto text-center"
      style={{
        paddingTop: spacing.layout.sectionPaddingY,
        paddingBottom: spacing.layout.sectionPaddingY,
        paddingLeft: spacing.layout.containerPaddingX,
        paddingRight: spacing.layout.containerPaddingX,
      }}
    >
      <p
        className="uppercase"
        style={{
          fontSize: labelStyle.fontSize,
          fontWeight: labelStyle.fontWeight,
          fontFamily: typography.family['sans-serif'].value,
          color: colors.accent['subtle-green-text'].value,
          marginBottom: spacing.scale.sm,
        }}
      >
        {disclaimer_section.label}
      </p>
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
        {disclaimer_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto"
        style={{
          fontSize: descriptionStyle.fontSize,
          fontWeight: descriptionStyle.fontWeight,
          fontFamily: typography.family['sans-serif'].value,
          lineHeight: descriptionStyle.lineHeight,
          color: colors.neutral['medium-gray-text'].value,
          marginBottom: spacing.scale.lg,
        }}
      >
        {disclaimer_section.description}
      </p>
      <Button
        style={{
          fontFamily: buttonBaseStyle.fontFamily,
          fontWeight: buttonBaseStyle.fontWeight,
          borderRadius: buttonBaseStyle.borderRadius,
          padding: buttonBaseStyle.padding,
          transition: buttonBaseStyle.transition,
          backgroundColor: colors.accent['dark-olive'].value,
          color: colors.primary.background.value,
        }}
        className="hover:scale-105"
        asChild
      >
        <a href={disclaimer_section.cta_button.href}>
          {disclaimer_section.cta_button.text}
        </a>
      </Button>
    </section>
  );
}
