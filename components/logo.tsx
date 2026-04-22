'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

const sizes = {
  sm: { icon: 28, text: 'text-lg' },
  md: { icon: 36, text: 'text-xl' },
  lg: { icon: 48, text: 'text-2xl' },
};

export function Logo({ size = 'md', showText = true, href = '/' }: LogoProps) {
  const { icon, text } = sizes[size];

  const content = (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Image
          src="/logo.png"
          alt="TUUZA Logo"
          width={icon}
          height={icon}
          className="rounded-lg"
          priority
        />
      </div>
      {showText && (
        <span className={`${text} font-bold text-foreground`}>TUUZA</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
