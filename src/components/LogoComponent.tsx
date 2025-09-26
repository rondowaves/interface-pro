'use client';

import Link from "next/link";

export default function LogoComponent({ className = "", isFooter = false }: { className?: string, isFooter?: boolean }) {
  return (
    <Link href="/" className="flex items-center">
      <div className={`flex items-center ${className}`}>
        {/* Fallback avec texte stylisé Interface Pro */}
        <div 
          className={`text-2xl font-bold ${isFooter ? 'text-white' : ''}`}
          style={{ 
            background: isFooter ? '#ffffff' : 'linear-gradient(45deg, #2563eb, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: isFooter ? '#ffffff' : 'transparent',
            backgroundClip: 'text',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '1px'
          }}
        >
          Interface Pro
        </div>
        <div className={`ml-2 text-sm ${isFooter ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="font-medium">Matériel Informatique</div>
          <div className="text-xs">Yaoundé • Cameroun</div>
        </div>
      </div>
    </Link>
  );
}
