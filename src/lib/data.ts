import type { Owner, Animal } from './types';
import { PlaceHolderImages } from './placeholder-images';
import animalData from './animal-data.json';

// Data is now managed in animal-data.json
let { owners, animals } = animalData;

export function getAnimals(): Animal[] {
  // Return a copy to avoid in-memory modification
  return [...animals];
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

// This function now simulates adding data.
// In a real application, this would write to a database.
export function addAnimal(data: NewAnimalData): Animal {
  const newOwnerId = `owner${owners.length + 1}`;
  const newOwner: Owner = {
    id: newOwnerId,
    ...data.owner
  };
  
  // In a real database, you wouldn't do this. This is for simulation.
  const tempOwners = [...owners, newOwner];

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
  
  // In a real database, you wouldn't do this. This is for simulation.
  const tempAnimals = [...animals, newAnimal];

  // NOTE: This is a temporary solution for demonstration.
  // The data is not actually saved back to the JSON file.
  // To make it persistent, we would need to write to the file system,
  // which is not ideal in a serverless environment. A database is the proper solution.
  animals = tempAnimals;
  owners = tempOwners;
  
  return newAnimal;
}
