import Image from 'next/image';

interface ImageBannerProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ src, alt, className }) => {
  return (
    <div data-testid="image-banner-container" className={`w-full relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-full"
      />
    </div>
  );
};

export default ImageBanner;
