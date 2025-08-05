
import React from 'react';
import { content } from '@/lib/content';

const CounterSection: React.FC = () => {
  return (
    <section
      className="text-center py-16 md:py-32 bg-background text-foreground"
    >
      <div className="container mx-auto px-4">
        <p
          className="uppercase tracking-wider mb-2 text-accent-foreground"
        >
          {content.counter_section.label}
        </p>
        <h2
          className="font-serif text-4xl md:text-6xl font-normal mb-6"
        >
          {content.counter_section.headline}
        </h2>
        <div
          className="font-serif text-6xl md:text-8xl font-normal mb-4 text-primary"
        >
          {content.counter_section.counter_value.toLocaleString()}
        </div>
        <p
          className="max-w-2xl mx-auto text-muted-foreground"
        >
          {content.counter_section.counter_text}
        </p>
      </div>
    </section>
  );
};

export default CounterSection;
