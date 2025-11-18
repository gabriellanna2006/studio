import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { getAnimals } from '@/lib/data';
import AnimalCard from '@/components/animal-card';

export default function Home() {
  const recentAnimals = getAnimals().slice(0, 6);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl font-headline">
            Ajude a trazer um amigo de volta para casa
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            Procure por animais perdidos em Raul Soares, MG, ou cadastre um animal que você encontrou.
          </p>
          <div className="mt-8 max-w-lg mx-auto flex gap-2">
            <Input
              type="search"
              placeholder="Procurar por espécie, raça, cor..."
              className="flex-grow"
              aria-label="Search for lost pets"
            />
            <Button type="submit" size="lg" aria-label="Search">
              <Search className="h-5 w-5 mr-2" />
              Procurar
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline mb-10">
            Vistos Recentemente
          </h2>
          {recentAnimals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Nenhum animal perdido reportado recentemente.
            </p>
          )}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">Ver Todos</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
