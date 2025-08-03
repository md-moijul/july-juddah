import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';

export default function FinalCtaSection() {
  return (
        <section
      id="final-cta"
      aria-label="Final CTA Section"
      className="container mx-auto text-center py-[var(--section-padding-y)]">
      <h2
        className="font-serif text-4xl font-bold mb-4"
      >
        {content.final_cta_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto text-lg mb-8 text-muted-foreground"
      >
        {content.final_cta_section.subheadline}
      </p>
      <Button
        className="bg-primary text-primary-foreground hover:scale-105"
        asChild
      >
        <a href={content.final_cta_section.cta_button.href}>
          {content.final_cta_section.cta_button.text}
        </a>
      </Button>
    </section>
  );
}
