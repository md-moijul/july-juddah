import content from '@/data/content.json';
import style from '@/data/style.json';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { footer } = content;
  const { typography, colors, spacing } = style.designSystemProfile.tokens;

  const copyrightTextStyle = typography.scale['sub-text'];
  const linkStyle = typography.scale['nav-link'];

  return (
    <footer
      className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8"
      style={{
        paddingLeft: spacing.layout.containerPaddingX,
        paddingRight: spacing.layout.containerPaddingX,
        borderTop: `1px solid ${colors.neutral['light-gray-border'].value}`,
      }}
    >
      <div className="flex items-center mb-4 md:mb-0">
        {footer.logo_icon && (
          <Image
            src={`/` + footer.logo_icon}
            alt="Logo Icon"
            width={24}
            height={24}
            className="mr-2"
          />
        )}
        <p
          style={{
            fontSize: copyrightTextStyle.fontSize,
            fontWeight: copyrightTextStyle.fontWeight,
            fontFamily: typography.family['sans-serif'].value,
            color: colors.neutral['medium-gray-text'].value,
          }}
        >
          {footer.copyright_text}
        </p>
      </div>
      <nav>
        <ul className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2">
          {footer.links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                style={{
                  fontSize: linkStyle.fontSize,
                  fontWeight: linkStyle.fontWeight,
                  fontFamily: typography.family['sans-serif'].value,
                  color: colors.neutral['medium-gray-text'].value,
                }}
                className="hover:text-primary-text transition-colors"
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
