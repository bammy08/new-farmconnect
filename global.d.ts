// types/global.d.ts
import { PrismaClient } from '@prisma/client';

// global.d.ts

export declare global {
  declare namespace globalThis {
    var prisma: PrismaClient;
  }
}

declare module 'nuka-carousel' {
  import React from 'react';

  export interface CarouselProps {
    autoplay?: boolean;
    autoplayInterval?: number;
    wrapAround?: boolean;
    pauseOnHover?: boolean;
    slidesToShow?: number;
    cellSpacing?: number;
    // Add more props if needed
  }

  const Carousel: React.FC<CarouselProps>;

  export default Carousel;
}
