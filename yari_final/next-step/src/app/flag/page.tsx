'use client';

import { useRouter } from 'next/navigation';

export default function FlagPage() {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });

        if (response.ok) {
            router.push('/login');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="absolute inset-0 opacity-10 animate-pulse"></div>

            <div className="max-w-xl w-full space-y-12 p-8 bg-gray-900 rounded-xl shadow-[0_0_15px_rgba(0,255,0,0.3)] border border-green-500/30 relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-xl font-mono text-green-500 break-all glitch">
                        {"BayrakBende{0p3rasy0nun_s0nrak1_as4mas1_ne?}"}
                    </h2>
                    <div className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent my-4"></div>
                </div>
                <div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex justify-center py-2 px-4 border border-red-500 text-sm font-mono rounded-md text-red-500 bg-transparent hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                    >
                        &gt; Sistemden Çıkış_
                    </button>
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