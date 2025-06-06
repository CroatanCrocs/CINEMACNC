import Link from 'next/link';

export function Header() {
    return (
        <header className="flex px-10 py-4 bg-zinc-900 text-white">
            <div className="flex items-center justify-between w-full">
                <div>
                    <Link href="/">
                        <img src="/logo-cnc-transparente.png" className="w-40 h-20" alt="Logo do Projeto" />
                    </Link>
                </div>

                < nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            Home
                        </li>
                        <li>
                            Posts
                        </li>
                    </ul>    
                </nav>
            </div>
        </header>
    );
}