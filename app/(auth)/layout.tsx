'use client';

import { type ReactNode } from 'react';

export default function AuthLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {children}
    </div>
  );
}