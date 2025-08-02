
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import content from '@/data/content.json';
import style from '@/data/style.json';

const Navigation = () => {
  const { navigation } = content;
  const { colors, typography } = style.designSystemProfile.tokens;
  const { navigation: navStyle } = style.designSystemProfile.components;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="flex items-center justify-between flex-wrap p-6"
      style={{
        backgroundColor: colors.primary.background.value,
        height: navStyle.height,
        borderBottom: navStyle.borderBottom,
      }}
    >
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span
          className="font-semibold text-xl tracking-tight"
          style={{ color: colors.primary.text.value }}
        >
          {navigation.logo_text}
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-gray-600 hover:border-gray-600"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-6z" />
          </svg>
        </button>
      </div>
      <div
        data-testid="nav-links-and-button-container"
        className={`${
          isOpen ? 'block' : 'hidden'
        } w-full flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          {navigation.links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-600 mr-4"
              style={{
                fontSize: typography.scale['nav-link'].fontSize,
                fontWeight: typography.scale['nav-link'].fontWeight,
                fontFamily: typography.scale['nav-link'].fontFamily,
                color: colors.primary.text.value,
              }}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div>
          <Link href={navigation.cta_button.href} passHref>
            <Button
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-600 hover:bg-white mt-4 lg:mt-0"
              style={{
                backgroundColor: colors.accent['dark-olive'].value,
                color: colors.primary.background.value,
                borderRadius: style.designSystemProfile.tokens.borderRadius.full,
                padding: style.designSystemProfile.components.button.baseStyle.padding,
                transition: style.designSystemProfile.components.button.baseStyle.transition,
                fontWeight: style.designSystemProfile.components.button.baseStyle.fontWeight,
                fontFamily: style.designSystemProfile.components.button.baseStyle.fontFamily,
              }}
            >
              {navigation.cta_button.text}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
