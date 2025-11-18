"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, Check } from "lucide-react";

export function ShareButton() {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "Você pode compartilhar o link do perfil deste animal.",
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    });
  };

  return (
    <Button onClick={handleShare} className="w-full" variant="secondary">
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Copiado
        </>
      ) : (
        <>
          <Share2 className="mr-2 h-4 w-4" /> Compartilhar Link
        </>
      )}
    </Button>
  );
}
