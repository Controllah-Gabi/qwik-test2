import { $ } from '@builder.io/qwik';

import { useImageProvider } from 'qwik-image';

type ImageTransformerProps = {
    src?: string;
    width?: number;
    height?: number;
    };

const imageTransformer$ = $(({ src , width, height }: ImageTransformerProps) => {
    return `${src}?w=${width}&h=${height}&format=webp`;
  });
  
  // Provide your default options
  useImageProvider({
    // you can set this property to overwrite default values [640, 960, 1280, 1920, 3840]
    resolutions: [640],
    // you we can define the source from which to load our image
    imageTransformer$,
  });

  export default  imageTransformer$