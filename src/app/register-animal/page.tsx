import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterAnimalPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Cadastrar Animal</CardTitle>
          <CardDescription>
            Preencha as informações sobre o animal perdido ou encontrado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <Select>
                  <SelectTrigger id="species">
                    <SelectValue placeholder="Selecione a espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Cachorro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Porte</Label>
                <Select>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Selecione o porte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="breed">Raça</Label>
                <Input id="breed" placeholder="Ex: Vira-lata, Poodle" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Cor</Label>
                <Input id="color" placeholder="Ex: Caramelo, Preto e branco" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome do Animal (opcional)</Label>
              <Input id="name" placeholder="Ex: Bob, Luna" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Localização (Onde foi visto/perdido)</Label>
                <Textarea id="location" placeholder="Descreva o endereço ou ponto de referência o mais detalhado possível."/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="picture">Foto do Animal</Label>
              <Input id="picture" type="file" />
              <p className="text-xs text-muted-foreground">Anexe uma foto clara do animal.</p>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" size="lg">Cadastrar Animal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
