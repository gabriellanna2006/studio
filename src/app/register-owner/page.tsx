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
import { Textarea } from "@/components/ui/textarea";

export default function RegisterOwnerPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Cadastro de Dono(a)</CardTitle>
          <CardDescription>
            Deixe suas informações de contato para que possamos te avisar caso seu pet seja encontrado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="Seu nome" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone para Contato</Label>
                <Input id="phone" type="tel" placeholder="(31) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
              </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea id="address" placeholder="Rua, número, bairro, cidade..."/>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" size="lg">Finalizar Cadastro</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
