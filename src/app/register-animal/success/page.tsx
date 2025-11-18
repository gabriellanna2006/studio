'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, Copy, QrCode, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function QRCodeGenerator({ url }: { url: string }) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="p-4 bg-white rounded-md shadow-inner">
      <img src={qrCodeUrl} alt="QR Code" width="256" height="256" />
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [animalUrl, setAnimalUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const animalId = searchParams.get('id');

  useEffect(() => {
    if (!animalId) {
      router.push('/');
      return;
    }
    const url = `${window.location.origin}/animal/${animalId}`;
    setAnimalUrl(url);
  }, [animalId, router]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(animalUrl)
      .then(() => {
        setCopied(true);
        toast({
          title: 'Link copiado!',
          description: 'O link para o perfil do animal foi copiado.',
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao copiar',
          description: 'Não foi possível copiar o link.',
        });
      });
  };
  
  const handleDownloadQR = () => {
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(
        animalUrl
      )}`;
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qrcode-animal-${animalId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  if (!animalId) {
    return (
      <div className="text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">
            Tudo Pronto!
          </CardTitle>
          <CardDescription>
            O perfil do seu animal foi criado. Use o link ou QR Code abaixo para
            identificá-lo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <div className="w-full space-y-2">
            <label htmlFor="animal-url" className="font-medium">
              Link do Perfil
            </label>
            <div className="flex gap-2">
              <Input id="animal-url" readOnly value={animalUrl} className="bg-muted" />
              <Button onClick={handleCopy} variant="outline" size="icon">
                {copied ? <Check /> : <Copy />}
              </Button>
            </div>
          </div>

          <div className="w-full space-y-4 text-center">
            <label className="font-medium flex items-center justify-center gap-2">
              <QrCode /> QR Code para a Coleira
            </label>
            <div className="flex justify-center">
              <QRCodeGenerator url={animalUrl} />
            </div>
            <Button onClick={handleDownloadQR}>
              <Download className="mr-2"/>
              Baixar QR Code
            </Button>
            <p className="text-xs text-muted-foreground">
                Você pode imprimir este QR Code e colocá-lo na coleira do seu animal.
            </p>
          </div>
        </CardContent>
         <CardFooter className="flex-col gap-4">
          <Link href={`/animal/${animalId}`} className="w-full">
            <Button className="w-full">Ver Perfil do Animal</Button>
          </Link>
           <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2"/>
              Voltar para a Página Inicial
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
