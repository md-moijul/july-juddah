import content from '@/data/content.json';
import style from '@/data/style.json';
import { Button } from '@/components/ui/button';

export default function FinalCtaSection() {
  const { final_cta_section } = content;
  const { typography, colors, spacing } = style.designSystemProfile.tokens;
  const { components } = style.designSystemProfile;

  const headlineStyle = typography.scale.h2;
  const subheadlineStyle = typography.scale.body;
  const buttonBaseStyle = components.button.baseStyle;

  return (
    <section
      id="final-cta"
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
        {final_cta_section.headline}
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
        {final_cta_section.subheadline}
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
        <a href={final_cta_section.cta_button.href}>
          {final_cta_section.cta_button.text}
        </a>
      </Button>
    </section>
  );
}
