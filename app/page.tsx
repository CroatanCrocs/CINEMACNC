'use client';
import { RoletaHeader } from '../components/roleta';
import { CategoryProvider } from '../components/roleta/context';

export default function Home() {

  return (
    <div>
      <CategoryProvider>
        <div>
          <RoletaHeader />
        </div>
      </CategoryProvider>
    </div>
  );
}