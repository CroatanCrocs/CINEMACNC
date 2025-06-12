'use client';

import { useEffect, useState } from 'react';
import Roleta from '../../components/roleta';

export default function isQuinta() {
  const [isQuinta, setIsQuinta] = useState(false);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 4 é quinta-feira (domingo = 0)
    const hour = now.getHours();

    if (true || (day === 4 && hour >= 18)) {
      setIsQuinta(true);
    } else {
      setIsQuinta(false);
    }
  }, []);

  if (!isQuinta) {
    return (
      <div className="h-screen flex items-center justify-center">
        <main>
          <h1>Não é Quinta a noite, volte mais tarde...</h1>
        </main>
      </div>
    );
  }

  return (
    <Roleta />
  );
}
