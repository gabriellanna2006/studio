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
import { MapPin, Phone, User, Mail, Calendar, PawPrint, Share2, ShieldCheck, Home } from 'lucide-react';
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
  
  let title = `Perfil de: ${animal.name || animal.breed}`;
  if(animal.status === 'Perdido') title = `Perdido: ${animal.name || animal.breed}`;
  if(animal.status === 'Encontrado') title = `Encontrado: ${animal.name || animal.breed}`;


  return {
    title: `${title} | RaulFind`,
    description: `Detalhes sobre ${animal.name || animal.breed}, um animal em Raul Soares, MG.`,
  };
}


export default function AnimalProfilePage({ params }: Props) {
  const animal = getAnimalById(params.id);

  if (!animal) {
    notFound();
  }

  const owner = animal.ownerId ? getOwnerById(animal.ownerId) : null;
  const image = getPlaceholderImage(animal.image);
  
  const getBadgeVariant = () => {
    switch (animal.status) {
      case 'Perdido':
        return 'destructive';
      case 'Encontrado':
        return 'default';
      case 'Com Dono':
        return 'secondary';
      default:
        return 'outline';
    }
  };

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
              variant={getBadgeVariant()}
            >
              {animal.status === 'Com Dono' ? 'Seguro em Casa' : animal.status}
            </Badge>
          </div>
          <ShareButton />
        </div>
       
        <div className="space-y-6">
          <div className="space-y-2">
             <h1 className="text-4xl font-bold font-headline">{animal.name || 'Animal sem nome'}</h1>
             <p className="text-muted-foreground text-lg">{animal.species} • {animal.breed} • {animal.color} • Porte {animal.size}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><PawPrint className="text-primary"/> Informações do Animal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p><strong className="text-foreground">Raça:</strong> {animal.breed}</p>
              <p><strong className="text-foreground">Cor:</strong> {animal.color}</p>
              <p><strong className="text-foreground">Porte:</strong> {animal.size}</p>
              <div className="flex items-center gap-2 pt-2">
                  <MapPin className="h-4 w-4 text-primary"/>
                  <span>Vive em/Visto por último em: {animal.locationFound}</span>
              </div>
               <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary"/>
                <span>Data do Registro/Evento: {new Date(animal.dateFound).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
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

           {animal.status === 'Encontrado' && (
              <Card className="bg-accent/50 border-accent">
                 <CardHeader>
                  <CardTitle>Você encontrou este animal?</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-accent-foreground">
                      Este animal foi encontrado. Se você é o dono ou conhece o dono, por favor entre em contato usando as informações acima.
                    </p>
                 </CardContent>
              </Card>
           )}
           
            {animal.status === 'Perdido' && (
              <Card className="bg-destructive/10 border-destructive">
                 <CardHeader>
                  <CardTitle>Ajude a encontrar este animal!</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-destructive-foreground/80">
                      Este animal está perdido. Se você o viu, por favor entre em contato com o dono usando as informações de contato acima.
                    </p>
                 </CardContent>
              </Card>
           )}

            {animal.status === 'Com Dono' && (
              <Card className="bg-green-100 dark:bg-green-900/50 border-green-500">
                 <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300"><ShieldCheck /> Animal Identificado</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-green-700 dark:text-green-400">
                      Este animal tem um lar! Se você o encontrou, por favor use os contatos do dono para avisá-lo.
                    </p>
                 </CardContent>
              </Card>
           )}
        </div>
      </div>
    </div>
  );
}
