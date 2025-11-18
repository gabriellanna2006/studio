import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PawPrint } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <PawPrint className="w-24 h-24 text-primary/50 mb-4" />
      <h1 className="text-4xl font-bold font-headline mb-2">404 - Animal não encontrado</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Ops! Não conseguimos encontrar a página deste pet.
      </p>
      <Link href="/">
        <Button size="lg">Voltar para a Página Inicial</Button>
      </Link>
    </div>
  )
}
