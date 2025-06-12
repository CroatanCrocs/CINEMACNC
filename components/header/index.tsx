import Link from 'next/link';

export function Header() {
    return (
        <header className="flex px-10 py-4 bg-[#5b1317] text-white mb-2">
            <div className="flex items-center justify-between w-full">
                <div>
                    <Link href="/">
                        <img src="/logo-cnc-transparente.png" className="w-40 h-20" alt="Logo do Projeto" />
                    </Link>
                </div>

                < nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            <Link href="/roleta">
                                Roleta
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}