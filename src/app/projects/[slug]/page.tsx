'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectDetailPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/projects');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-inter">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-[#E85D04] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-manrope font-semibold">Redirecting to Photo Gallery...</p>
      </div>
    </div>
  );
}
