import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';

export default function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      className="container mx-auto text-center py-16 md:py-32"
    >
      <h2
        className="font-serif text-4xl md:text-6xl font-normal mb-6 text-foreground"
      >
        {content.final_cta_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto text-base font-normal mb-8 text-muted-foreground"
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
