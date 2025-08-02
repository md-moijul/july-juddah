
import React from 'react';

const HeroSection: React.FC = () => {
  const content = {
    headline: "A Testament to Your Participation.",
    subheadline: "Receive a personalized digital certificate commemorating your role in the July Student Revelation. A timeless memento, crafted instantly.",
    cta_button: {
      text: "Generate My Certificate",
      href: "/generate"
    },
    image: {
      src: "example_certificate_image.png",
      alt: "An elegant, personalized certificate for the July Student Revelation event."
    }
  };

  const style = {
    colors: {
      primary: {
        background: "#FFFFFF",
        text: "#000000"
      },
      accent: {
        darkOlive: "#4A5328",
        lightOlive: "#D5DCC1",
        subtleGreenText: "#A1B076"
      },
      neutral: {
        lightGrayBorder: "#EAEAEA",
        mediumGrayText: "#666666"
      }
    },
    typography: {
      family: {
        serif: "'Lora', serif",
        sansSerif: "'Inter', sans-serif"
      },
      scale: {
        h1: {
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: "400",
          fontFamily: "serif",
          lineHeight: "1.1"
        },
        body: {
          fontSize: "1rem",
          fontWeight: "400",
          fontFamily: "sans-serif",
          lineHeight: "1.6"
        }
      }
    },
    spacing: {
      layout: {
        sectionPaddingY: "clamp(64px, 10vw, 128px)"
      }
    },
    borderRadius: {
      full: "9999px"
    },
    button: {
      baseStyle: {
        fontFamily: "sans-serif",
        fontWeight: "600",
        borderRadius: "full",
        padding: "12px 24px",
        transition: "transform 0.2s ease"
      },
      variants: {
        primary: {
          backgroundColor: "#4A5328",
          color: "#FFFFFF",
          hover: {
            transform: "scale(1.05)"
          }
        }
      }
    }
  };

  return (
    <section
      data-testid="hero-section"
      className="relative w-full flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(/${content.image.src})`,
        minHeight: '100vh',
        paddingTop: style.spacing.layout.sectionPaddingY,
        paddingBottom: style.spacing.layout.sectionPaddingY,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h1
          className="mb-4 text-white"
          style={{
            fontSize: style.typography.scale.h1.fontSize,
            fontWeight: style.typography.scale.h1.fontWeight,
            fontFamily: style.typography.family.serif,
            lineHeight: style.typography.scale.h1.lineHeight,
          }}
        >
          {content.headline}
        </h1>
        <p
          className="mb-8 text-white"
          style={{
            fontSize: style.typography.scale.body.fontSize,
            fontWeight: style.typography.scale.body.fontWeight,
            fontFamily: style.typography.family.sansSerif,
            lineHeight: style.typography.scale.body.lineHeight,
          }}
        >
          {content.subheadline}
        </p>
        <button
          className="text-white"
          style={{
            backgroundColor: style.button.variants.primary.backgroundColor,
            color: style.button.variants.primary.color,
            fontFamily: style.button.baseStyle.fontFamily,
            fontWeight: style.button.baseStyle.fontWeight,
            borderRadius: style.button.baseStyle.borderRadius,
            padding: style.button.baseStyle.padding,
            transition: style.button.baseStyle.transition,
          }}
        >
          {content.cta_button.text}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
