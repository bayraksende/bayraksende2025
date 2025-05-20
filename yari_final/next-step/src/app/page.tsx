'use client';

import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="absolute inset-0 opacity-10 animate-pulse"></div>

            <div className="max-w-lg w-full space-y-8 p-10 bg-gray-900 rounded-xl shadow-[0_0_15px_rgba(0,255,0,0.3)] border border-green-500/30 relative z-10">
                <div className="text-center">
                    <h1 className="text-4xl font-mono text-green-500 mb-2 glitch">
                        Next Panel
                    </h1>
                    <div className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent mb-4"></div>
                    <p className="font-mono text-green-400 text-lg mb-8 animate-pulse">
                        &gt; Çok havalı hacker paneli
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-green-500 text-base font-mono rounded text-green-500 bg-transparent hover:bg-green-500/10 md:py-4 md:text-lg md:px-10 transition-all duration-300 group relative overflow-hidden"
                    >
                        <span className="relative z-10">&gt; Giriş Yap_</span>
                    </Link>

                    <Link
                        href="/flag"
                        className="w-full flex items-center justify-center px-8 py-3 border border-green-400/50 text-base font-mono rounded text-green-400/70 bg-transparent hover:bg-green-400/5 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                        &gt; Flag Sayfasına Git_
                    </Link>
                </div>


            </div>

            <style jsx global>{`
                @keyframes glitch {
                    0% {
                        text-shadow: 2px 0 0 red, -2px 0 0 blue;
                        transform: translate(0);
                    }
                    25% {
                        text-shadow: -2px 0 0 red, 2px 0 0 blue;
                        transform: translate(-2px, 2px);
                    }
                    50% {
                        text-shadow: 2px 0 0 red, -2px 0 0 blue;
                        transform: translate(2px, -2px);
                    }
                    75% {
                        text-shadow: -2px 0 0 red, 2px 0 0 blue;
                        transform: translate(0);
                    }
                    100% {
                        text-shadow: 2px 0 0 red, -2px 0 0 blue;
                        transform: translate(0);
                    }
                }
                .glitch {
                    animation: glitch 5s infinite;
                }
            `}</style>
        </div>
    );
} 