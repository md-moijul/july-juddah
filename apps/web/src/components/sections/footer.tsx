import { content } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="container mx-auto flex flex-col items-center justify-between border-t border-border py-8 md:flex-row">
      <div className="mb-4 flex items-center md:mb-0">
        {content.footer.logo_icon && (
          <Image
            src={`/` + content.footer.logo_icon}
            alt="Logo Icon"
            width={24}
            height={24}
            className="mr-2"
          />
        )}
        <p className="font-sans text-sm text-muted-foreground">
          {content.footer.copyright_text}
        </p>
      </div>
      <nav>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end">
          {content.footer.links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
