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
        width={500}
        height={300}
        className="w-full h-full"
      />
    </div>
  );
};

export default ImageBanner;
