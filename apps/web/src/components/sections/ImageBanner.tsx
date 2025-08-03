import Image from 'next/image';

import content from '@/data/content.json';


interface ImageBannerProps {
  className?: string;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ className }) => {
  const { image_banner_section } = content;
  const { src, alt } = image_banner_section.image;
  return (
    <div data-testid="image-banner-container" className={`w-full relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={1920} // Example width, adjust based on design
        height={1080} // Example height, adjust based on design
        
        className="w-full h-full"
      />
    </div>
  );
};

export default ImageBanner;
