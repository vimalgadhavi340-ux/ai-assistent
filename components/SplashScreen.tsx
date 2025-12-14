import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit sequence after animation
    const exitTimer = setTimeout(() => {
        setExiting(true);
    }, 2200);

    // Unmount/Finish after fade out
    const finishTimer = setTimeout(() => {
        onFinish();
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] transition-opacity duration-700 ease-in-out ${exiting ? 'opacity-0' : 'opacity-100'}`}
    >
        {/* Background Ambience */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative flex flex-col items-center z-10">
            {/* Logo Container with Pop Animation */}
            <div className="animate-[pop-in_1s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                <div className="relative">
                     <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full" />
                     <Logo size={120} animated />
                </div>
            </div>
            
            {/* Text Reveal */}
            <h1 className="mt-8 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-white to-purple-200 brand-font tracking-[0.2em] opacity-0 animate-[fade-in-up_0.8s_ease-out_0.4s_forwards]">
                KRATI
            </h1>

            {/* Loading Indicator */}
            <div className="mt-12 flex gap-2 opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-[bounce_1s_infinite_0ms]" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-[bounce_1s_infinite_150ms]" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-[bounce_1s_infinite_300ms]" />
            </div>
        </div>
    </div>
  );
};