import Link from 'next/link';
import { PawPrint, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">RaulFind</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm ml-auto">
          <Link href="/register-animal">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Cadastrar Animal
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
