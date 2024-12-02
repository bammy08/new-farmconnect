import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  // Define the type for the platforms
  type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'github';

  const icons: Record<SocialPlatform, JSX.Element> = {
    twitter: <FaTwitter />,
    facebook: <FaFacebookF />,
    instagram: <FaInstagram />,
    github: <FaGithub />,
  };

  return (
    <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-2 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          {/* Logo and Social Links */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={150}
                height={150}
                alt="logo"
              />
            </Link>
            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <ul className="flex items-center space-x-3 mt-9">
              {/* Social Media Icons */}
              {(
                [
                  'twitter',
                  'facebook',
                  'instagram',
                  'github',
                ] as SocialPlatform[]
              ).map((platform) => (
                <li key={platform}>
                  <a
                    href="#"
                    title={platform}
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                  >
                    <span className="sr-only">{platform}</span>
                    <span className="text-lg">{icons[platform]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other sections */}
          {/* Company Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>
            <ul className="mt-6 space-y-4">
              {['About', 'Features', 'Works', 'Career'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    title={link}
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>
            <ul className="mt-6 space-y-4">
              {[
                'Customer Support',
                'Delivery Details',
                'Terms & Conditions',
                'Privacy Policy',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    title={link}
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe
            </p>
            <form className="mt-6">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
