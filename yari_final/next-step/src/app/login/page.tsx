'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                await router.replace('/flag');
                router.refresh();
                return;
            }

            setError(data.message || 'Giriş başarısız');
        } catch (error) {
            setError('Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="absolute inset-0 opacity-10 animate-pulse"></div>

            <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-xl shadow-[0_0_15px_rgba(0,255,0,0.3)] border border-green-500/30 relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-mono text-green-500 glitch">
                        &gt; Sistem Girişi_
                    </h2>
                    <div className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent mb-4"></div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Kullanıcı Adı
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                disabled={isLoading}
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-green-500/30 bg-black placeholder-green-500/50 text-green-500 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm font-mono"
                                placeholder="&gt; Kullanıcı Adı_"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Şifre
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={isLoading}
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-green-500/30 bg-black placeholder-green-500/50 text-green-500 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm font-mono"
                                placeholder="&gt; Şifre_"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-mono animate-pulse">
                            [HATA] {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-green-500 text-sm font-mono rounded-md text-green-500 bg-transparent hover:bg-green-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? '> İşlem Yapılıyor...' : '> Sisteme Giriş Yap_'}
                        </button>
                    </div>
                </form>
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