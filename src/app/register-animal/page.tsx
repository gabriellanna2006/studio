"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { addAnimal } from "@/lib/data";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  status: z.enum(["Perdido", "Encontrado", "Com Dono"], {
    required_error: "Você precisa selecionar o status.",
  }),
  species: z.string({ required_error: "Selecione a espécie." }),
  size: z.string({ required_error: "Selecione o porte." }),
  breed: z.string().min(2, "A raça precisa ter no mínimo 2 caracteres."),
  color: z.string().min(2, "A cor precisa ter no mínimo 2 caracteres."),
  name: z.string().optional(),
  location: z.string().min(5, "A localização é muito curta."),
  picture: z.any(),
  ownerName: z.string().min(2, "O nome do dono é obrigatório."),
  ownerPhone: z.string().min(10, "O telefone do dono é obrigatório."),
  ownerEmail: z.string().email("Email do dono inválido."),
  ownerAddress: z.string().min(10, "O endereço do dono é obrigatório."),
});

export default function RegisterAnimalPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      breed: "",
      color: "",
      name: "",
      location: "",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      ownerAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would handle file upload here.
    // We'll just use a placeholder image for now.
    const imageId = values.species === 'Cachorro' ? 'dog4' : 'cat2';
    
    const newAnimal = addAnimal({
      status: values.status as "Perdido" | "Encontrado" | "Com Dono",
      species: values.species as "Cachorro" | "Gato" | "Outro",
      size: values.size as "Pequeno" | "Médio" | "Grande",
      breed: values.breed,
      color: values.color,
      name: values.name,
      locationFound: values.location,
      image: imageId,
      owner: {
        name: values.ownerName,
        phone: values.ownerPhone,
        email: values.ownerEmail,
        address: values.ownerAddress,
      }
    });

    toast({
      title: "Animal cadastrado com sucesso!",
      description: "Gerando o link e QR Code para você.",
    });

    router.push(`/register-animal/success?id=${newAnimal.id}`);
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">
            Cadastrar Animal
          </CardTitle>
          <CardDescription>
            Preencha as informações para gerar um perfil para o seu animal. Se ele
            se perder, outras pessoas poderão usar a página para te contatar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Animal Info */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-xl font-semibold font-headline">Informações do Animal</h3>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Qual a situação do animal?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Com Dono" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Com Dono (Quero gerar uma coleira de identificação)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Perdido" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Perdido (Meu animal desapareceu)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Encontrado" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Encontrado (Encontrei um animal na rua)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Animal</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Bob, Luna" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Espécie</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a espécie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Cachorro">Cachorro</SelectItem>
                            <SelectItem value="Gato">Gato</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porte</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o porte" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Pequeno">Pequeno</SelectItem>
                            <SelectItem value="Médio">Médio</SelectItem>
                            <SelectItem value="Grande">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Raça</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Vira-lata, Poodle"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Caramelo, Preto e branco"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização (Bairro / Rua onde vive ou foi visto)</FormLabel>
                       <FormControl>
                         <Textarea
                           placeholder="Descreva o bairro ou um ponto de referência."
                           {...field}
                         />
                       </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="picture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foto do Animal</FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                       <FormDescription>
                        Anexe uma foto clara do animal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Owner Info */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-xl font-semibold font-headline">Informações do Dono (para contato)</h3>
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo do Dono(a)</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ownerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone para Contato</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(31) 99999-9999"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ownerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="ownerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                       <FormControl>
                         <Textarea
                           placeholder="Seu endereço completo"
                           {...field}
                         />
                       </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Cadastrar Animal e Gerar Link
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
