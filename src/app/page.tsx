'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/login'); // ไม่มี token → เด้งไป login
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">🏡 Home Page 123</h1>
      <p className="text-lg text-gray-600">
        You're successfully logged in.
      </p>
    </div>
  );
}
