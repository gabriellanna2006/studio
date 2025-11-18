export type Owner = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type Animal = {
  id:string;
  name?: string;
  species: 'Cachorro' | 'Gato' | 'Outro';
  breed: string;
  color: string;
  size: 'Pequeno' | 'Médio' | 'Grande';
  locationFound: string;
  dateFound: string; // This should be a date string in ISO format e.g. YYYY-MM-DD
  image: string; // Corresponds to id in placeholder-images.json
  ownerId: string | null;
  status: 'Perdido' | 'Encontrado' | 'Com Dono';
};
