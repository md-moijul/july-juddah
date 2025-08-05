
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';

const Navigation = () => {
  const { navigation } = content;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between flex-wrap p-6 bg-opacity-50 backdrop-blur-lg"
      style={{
        backgroundColor: 'var(--background)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span
          className="font-semibold text-xl tracking-tight"
          style={{ color: 'var(--primary-text)' }}
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
                fontSize: 'var(--body-font-size)',
                fontWeight: 'var(--body-font-weight)',
                color: 'var(--primary-text)',
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
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                borderRadius: 'var(--radius)',
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
