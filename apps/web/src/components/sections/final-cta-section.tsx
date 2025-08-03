import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';

export default function FinalCtaSection() {
  return (
        <section
      id="final-cta"
      aria-label="Final CTA Section"
      className="container mx-auto text-center py-[var(--section-padding-y)]">
      <h2
        className="font-serif text-[var(--h2-font-size)] font-[var(--h2-font-weight)] mb-[var(--spacing-md)] text-[var(--foreground)]"
      >
        {content.final_cta_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto text-[var(--body-font-size)] font-[var(--body-font-weight)] mb-[var(--spacing-lg)] text-[var(--muted-foreground)]"
      >
        {content.final_cta_section.subheadline}
      </p>
      <Button
        className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:scale-105"
        asChild
      >
        <a href={content.final_cta_section.cta_button.href}>
          {content.final_cta_section.cta_button.text}
        </a>
      </Button>
    </section>
  );
}
