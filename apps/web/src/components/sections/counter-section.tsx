
import React from 'react';
import content from '@/data/content.json';
import style from '@/data/style.json';

const CounterSection: React.FC = () => {
  const { counter_section } = content;
  const { colors, typography, spacing } = style.designSystemProfile.tokens;

  const sectionPaddingY = spacing.layout.sectionPaddingY;

  return (
    <section
      className="text-center"
      style={{
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
        backgroundColor: colors.primary.background.value,
        color: colors.primary.text.value,
      }}
    >
      <div className="container mx-auto px-4">
        <p
          className="uppercase tracking-wider mb-2"
          style={{
            fontSize: typography.scale["sub-text"].fontSize,
            fontWeight: typography.scale["sub-text"].fontWeight,
            fontFamily: typography.scale["sub-text"].fontFamily,
            color: colors.accent["subtle-green-text"].value,
          }}
        >
          {counter_section.label}
        </p>
        <h2
          className="font-normal mb-6"
          style={{
            fontSize: typography.scale.h2.fontSize,
            fontWeight: typography.scale.h2.fontWeight,
            fontFamily: typography.scale.h2.fontFamily,
            lineHeight: typography.scale.h2.lineHeight,
          }}
        >
          {counter_section.headline}
        </h2>
        <div
          className="font-normal mb-4"
          style={{
            fontSize: typography.scale.h1.fontSize,
            fontWeight: typography.scale.h1.fontWeight,
            fontFamily: typography.scale.h1.fontFamily,
            lineHeight: typography.scale.h1.lineHeight,
            color: colors.accent["dark-olive"].value,
          }}
        >
          {counter_section.counter_value.toLocaleString()}
        </div>
        <p
          className="max-w-2xl mx-auto"
          style={{
            fontSize: typography.scale.body.fontSize,
            fontWeight: typography.scale.body.fontWeight,
            fontFamily: typography.scale.body.fontFamily,
            lineHeight: typography.scale.body.lineHeight,
            color: colors.neutral["medium-gray-text"].value,
          }}
        >
          {counter_section.counter_text}
        </p>
      </div>
    </section>
  );
};

export default CounterSection;
