// content.ts

// --- TYPE DEFINITIONS ---

interface Link {
    text: string;
    href: string;
}

interface CtaButton {
    text: string;
    href: string;
}

interface ImageInfo {
    src: string;
    alt: string;
}

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface PremiumItem {
    title: string;
    description: string;
}

// --- CONTENT SECTIONS ---

export const navigationContent = {
    logoText: "July Smriti",
    links: [
        { text: "Features", href: "#features" },
        { text: "Premium", href: "#premium" },
        { text: "Disclaimer", href: "#disclaimer" },
    ],
    ctaButton: {
        text: "Get Certificate",
        href: "/generate",
    },
};

export const heroSectionContent = {
    headline: "A Testament to Your Participation.",
    subheadline: "Receive a personalized digital certificate commemorating your role in the July Student Revelation. A timeless memento, crafted instantly.",
    ctaButton: {
        text: "Generate My Certificate",
        href: "/generate",
    },
    image: {
        src: "example_certificate_image.png",
        alt: "An elegant, personalized certificate for the July Student Revelation event.",
    },
};

export const counterSectionContent = {
    label: "Join the Movement",
    headline: "A Community United.",
    counterValue: 12547,
    counterText: "Celebrating with over 12,500 participants who have already claimed their moment.",
};

export const featuresSectionContent = {
    headline: "Effortless & Elegant.",
    subheadline: "From generation to download, our process is designed for simplicity. Your memory, secured and delivered in moments.",
    features: [
        {
            icon: "icon_instant.svg",
            title: "Instant Personalization",
            description: "Enter your details and instantly preview your unique certificate, crafted in moments.",
        },
        {
            icon: "icon_secure.svg",
            title: "Secure & Verified",
            description: "Your free digital certificate is just an OTP verification away, ensuring secure and exclusive access.",
        },
        {
            icon: "icon_quality.svg",
            title: "Premium Digital Asset",
            description: "Receive a high-resolution PDF, perfect for sharing, printing, or adding to your digital portfolio.",
        },
        {
            icon: "icon_keepsake.svg",
            title: "Tangible Keepsakes",
            description: "Elevate your memory with optional high-quality framed prints and exclusive event merchandise.",
        },
    ],
};

export const imageBannerSectionContent = {
    image: {
        src: "/july_revolution_event_image.jpg",
        alt: "A powerful and inspiring image from the July Revolution event.",
    },
};

export const disclaimerSectionContent = {
    label: "A Note of Clarity",
    headline: "A Token of Remembrance.",
    description: "This is not a legal document or certificate to achieve any benefit; it's just memorabilia to showcase your participation.",
    ctaButton: {
        text: "Explore Premium Options",
        href: "#premium",
    },
};

export const premiumItemsSectionContent = {
    id: "premium",
    headline: "What You'll Receive on Order.",
    subheadline: "For those who want to hold the memory in their hands, our premium package offers a curated collection of commemorative items.",
    items: [
        {
            title: "Certificate with Frame",
            description: "A professionally printed certificate in an elegant, ready-to-display frame.",
        },
        {
            title: "Exclusive Sticker Pack",
            description: "High-quality, durable stickers featuring iconic event branding.",
        },
        {
            title: "Commemorative Fridge Magnet",
            description: "A stylish magnet to serve as a daily reminder of your participation.",
        },
        {
            title: "Collector's Cards",
            description: "A set of beautifully designed cards, perfect for your desk or collection.",
        },
    ],
};

export const finalCtaSectionContent = {
    headline: "Ready to Claim Your Certificate?",
    subheadline: "Begin the simple process to generate and download your personalized memento. Your July Smriti awaits.",
    ctaButton: {
        text: "Generate My Certificate Now",
        href: "/generate",
    },
};

export const footerContent = {
    logoIcon: "logo_icon_monochrome.svg",
    copyrightText: "© 2025 July Smriti. All Rights Reserved.",
    links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
        { text: "Contact Support", href: "mailto:support@julysmriti.com" },
    ],
};