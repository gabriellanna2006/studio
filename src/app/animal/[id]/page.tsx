import { notFound } from 'next/navigation';
import { getAnimalById, getOwnerById, getPlaceholderImage } from '@/lib/data';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, User, Mail, Calendar, PawPrint, Share2 } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { ShareButton } from './share-button';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const animal = getAnimalById(params.id);

  if (!animal) {
    return {
      title: 'Animal não encontrado',
    };
  }
  
  const title = animal.status === 'Perdido' ? `Perdido: ${animal.name || animal.breed}` : `Encontrado: ${animal.name || animal.breed}`

  return {
    title: `${title} | RaulFind`,
    description: `Detalhes sobre ${animal.name || animal.breed}, um animal ${animal.status.toLowerCase()} em Raul Soares, MG.`,
  };
}


export default function AnimalProfilePage({ params }: Props) {
  const animal = getAnimalById(params.id);

  if (!animal) {
    notFound();
  }

  const owner = animal.ownerId ? getOwnerById(animal.ownerId) : null;
  const image = getPlaceholderImage(animal.image);

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
           <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
            {image && (
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            <Badge
              className="absolute top-4 right-4 text-sm px-3 py-1"
              variant={animal.status === 'Perdido' ? 'destructive' : 'default'}
            >
              {animal.status}
            </Badge>
          </div>
          <ShareButton />
        </div>
       
        <div className="space-y-6">
          <div className="space-y-2">
             <h1 className="text-4xl font-bold font-headline">{animal.name || animal.breed}</h1>
             <p className="text-muted-foreground text-lg">{animal.species} • {animal.color} • Porte {animal.size}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><PawPrint className="text-primary"/> Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p><strong className="text-foreground">Raça:</strong> {animal.breed}</p>
              <p><strong className="text-foreground">Cor:</strong> {animal.color}</p>
              <p><strong className="text-foreground">Porte:</strong> {animal.size}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="text-primary"/> Última Localização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">{animal.locationFound}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4"/>
                <span>Data: {new Date(animal.dateFound).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
              </div>
            </CardContent>
          </Card>

          {owner && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="text-primary"/> Contato do Dono</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4"/> {owner.name}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4"/> {owner.phone}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4"/> {owner.email}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4"/> {owner.address}</p>
              </CardContent>
            </Card>
          )}

           {animal.status === 'Encontrado' && !owner && (
              <Card className="bg-accent/50 border-accent">
                 <CardHeader>
                  <CardTitle>Você encontrou este animal?</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-accent-foreground">
                      Se você é o dono ou conhece o dono, por favor entre em contato com quem o encontrou. Informações de contato do znalazca serão adicionadas em breve.
                    </p>
                 </CardContent>
              </Card>
           )}
        </div>
      </div>
    </div>
  );
}
