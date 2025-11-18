import type { Animal } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type AnimalCardProps = {
  animal: Animal;
};

export default function AnimalCard({ animal }: AnimalCardProps) {
  const image = getPlaceholderImage(animal.image);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[3/2] w-full">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <p>Sem foto</p>
            </div>
          )}
          <Badge
            className="absolute top-3 right-3"
            variant={animal.status === 'Perdido' ? 'destructive' : 'default'}
          >
            {animal.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-2xl mb-2">
          {animal.name || animal.breed}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {animal.species} • {animal.color} • Porte {animal.size}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/animal/${animal.id}`} className="w-full">
          <Button className="w-full" variant="outline">
            Ver Detalhes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
