'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer" />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-4">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Slider {...settings}>
      <div>
        <Image
          src="/images/1.jpg"
          width={1400}
          height={300}
          alt="Image 1"
          className="mx-auto"
        />
      </div>
      <div>
        <Image
          src="/images/2.jpg"
          width={1400}
          height={300}
          alt="Image 2"
          className="mx-auto"
        />
      </div>
      <div>
        <Image
          src="/images/3.jpg"
          width={1400}
          height={300}
          alt="Image 3"
          className="mx-auto"
        />
      </div>
    </Slider>
  );
};

// Custom Next Arrow
const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500 hover:text-green-700 cursor-pointer z-10"
    onClick={onClick}
  >
    <FaArrowRight size={32} />
  </div>
);

// Custom Prev Arrow
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-500 hover:text-green-700 cursor-pointer z-10"
    onClick={onClick}
  >
    <FaArrowLeft size={32} />
  </div>
);

export default HeroSection;
