import type { Owner, Animal } from './types';
import { PlaceHolderImages } from './placeholder-images';

const owners: Owner[] = [
  {
    id: 'owner1',
    name: 'João Silva',
    address: 'Rua das Flores, 123, Centro, Raul Soares, MG',
    phone: '(31) 99876-5432',
    email: 'joao.silva@example.com',
  },
  {
    id: 'owner2',
    name: 'Maria Oliveira',
    address: 'Avenida Brasil, 456, Bairro Novo, Raul Soares, MG',
    phone: '(31) 98765-4321',
    email: 'maria.oliveira@example.com',
  },
];

let animals: Animal[] = [
  {
    id: 'animal1',
    name: 'Max',
    species: 'Cachorro',
    breed: 'Golden Retriever',
    color: 'Dourado',
    size: 'Grande',
    locationFound: 'Perto da praça central',
    dateFound: '2024-07-20',
    image: 'dog1',
    ownerId: 'owner1',
    status: 'Perdido',
  },
  {
    id: 'animal2',
    name: 'Mia',
    species: 'Gato',
    breed: 'Siamês',
    color: 'Branco e marrom',
    size: 'Pequeno',
    locationFound: 'Bairro Santana, próximo à escola',
    dateFound: '2024-07-21',
    image: 'cat3',
    ownerId: 'owner2',
    status: 'Perdido',
  },
  {
    id: 'animal3',
    species: 'Cachorro',
    breed: 'Vira-lata',
    color: 'Caramelo',
    size: 'Médio',
    locationFound: 'Encontrado na Rua Direita',
    dateFound: '2024-07-22',
    image: 'dog2',
    ownerId: null,
    status: 'Encontrado',
  },
  {
    id: 'animal4',
    name: 'Thor',
    species: 'Cachorro',
    breed: 'Pastor Alemão',
    color: 'Preto e marrom',
    size: 'Grande',
    locationFound: 'Visto pela última vez perto do rio',
    dateFound: '2024-07-19',
    image: 'dog3',
    ownerId: 'owner1',
    status: 'Perdido',
  },
  {
    id: 'animal5',
    species: 'Gato',
    breed: 'Vira-lata',
    color: 'Tigrado',
    size: 'Médio',
    locationFound: 'Encontrado no bairro Tarza',
    dateFound: '2024-07-23',
    image: 'cat4',
    ownerId: null,
    status: 'Encontrado',
  },
  {
    id: 'animal6',
    name: 'Luna',
    species: 'Gato',
    breed: 'Angorá',
    color: 'Branco',
    size: 'Pequeno',
    locationFound: 'Desapareceu do quintal de casa no Centro',
    dateFound: '2024-07-18',
    image: 'cat1',
    ownerId: 'owner2',
    status: 'Perdido',
  },
];

export function getAnimals(): Animal[] {
  return animals;
}

export function getAnimalById(id: string): Animal | undefined {
  return animals.find((animal) => animal.id === id);
}

export function getOwnerById(id: string): Owner | undefined {
  return owners.find((owner) => owner.id === id);
}

export function getPlaceholderImage(id: string) {
  return PlaceHolderImages.find((img) => img.id === id);
}


type NewAnimalData = Omit<Animal, 'id' | 'ownerId' | 'dateFound'> & {
  owner: Omit<Owner, 'id'>
}

export function addAnimal(data: NewAnimalData): Animal {
  const newOwnerId = `owner${owners.length + 1}`;
  const newOwner: Owner = {
    id: newOwnerId,
    ...data.owner
  };
  owners.push(newOwner);

  const newAnimalId = `animal${animals.length + 1}`;
  const newAnimal: Animal = {
    id: newAnimalId,
    name: data.name,
    species: data.species,
    breed: data.breed,
    color: data.color,
    size: data.size,
    locationFound: data.locationFound,
    dateFound: new Date().toISOString().split('T')[0],
    image: data.image,
    ownerId: newOwnerId,
    status: data.status,
  };
  animals.push(newAnimal);
  
  return newAnimal;
}
