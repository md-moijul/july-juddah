import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import styleData from "./src/data/style.json";

const colors = styleData.designSystemProfile.tokens.colors;
const typography = styleData.designSystemProfile.tokens.typography;

const extendedColors = {
    'primary-background': colors.primary.background.value,
    'primary-text': colors.primary.text.value,
    'accent-dark-olive': colors.accent['dark-olive'].value,
    'accent-light-olive': colors.accent['light-olive'].value,
    'accent-subtle-green-text': colors.accent['subtle-green-text'].value,
    'neutral-light-gray-border': colors.neutral['light-gray-border'].value,
    'neutral-medium-gray-text': colors.neutral['medium-gray-text'].value,
    'feedback-success-icon': colors.feedback['success-icon'].value,
    'feedback-error-icon': colors.feedback['error-icon'].value,
};

const extendedFontFamily = {
    serif: [typography.family.serif.value.replace(/['"]/g, ''), 'serif'],
    sans: [typography.family['sans-serif'].value.replace(/['"]/g, ''), 'sans-serif'],
};


const config = {
    darkMode: "class",
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                ...extendedColors,
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: extendedFontFamily,
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [tailwindcssAnimate],
} satisfies Config

export default config