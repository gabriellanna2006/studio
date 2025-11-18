export type Owner = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type Animal = {
  id: string;
  name?: string;
  species: 'Cachorro' | 'Gato' | 'Outro';
  breed: string;
  color: string;
  size: 'Pequeno' | 'Médio' | 'Grande';
  locationFound: string;
  dateFound: string;
  image: string; // Corresponds to id in placeholder-images.json
  ownerId: string | null;
  status: 'Perdido' | 'Encontrado';
};
