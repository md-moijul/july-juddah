import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';

export default function DisclaimerSection() {
  return (
    <section
      id="disclaimer"
      className="container mx-auto text-center py-16 md:py-32"
    >
      <p
        className="uppercase text-sm font-normal mb-2 text-accent-foreground"
      >
        {content.disclaimer_section.label}
      </p>
      <h2
        className="font-serif text-4xl md:text-6xl font-normal mb-6 text-foreground"
      >
        {content.disclaimer_section.headline}
      </h2>
      <p
        className="max-w-3xl mx-auto text-base font-normal mb-8 text-muted-foreground"
      >
        {content.disclaimer_section.description}
      </p>
      <Button
        className="bg-primary text-primary-foreground hover:scale-105"
        asChild
      >
        <a href={content.disclaimer_section.cta_button.href}>
          {content.disclaimer_section.cta_button.text}
        </a>
      </Button>
    </section>
  );
}
