import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Ticket } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { gerarVoucher } from '@/services/ticketService'; // Certifique-se que o caminho está correto

interface AcquireTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcquireTicketModal = ({ isOpen, onClose }: AcquireTicketModalProps) => {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await gerarVoucher({ cpf, email });

      toast({
        title: "✅ Ticket enviado com êxito!",
        description: "Seu código de desconto foi enviado por email.",
        className: "bg-junina-blue-900 border-junina-yellow-400/30 text-white",
      });

      onClose();
      setCpf('');
      setEmail('');
    } catch (error: any) {
      toast({
        title: "❌ Erro ao gerar ticket",
        description: error?.response?.data || "Verifique seus dados e tente novamente.",
        className: "bg-red-800 border-red-400/30 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-junina-blue-900 border-junina-yellow-400/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-junina-yellow-400 font-poetsen text-xl justify-center">
            <ShoppingBag className="w-6 h-6 mr-2" />
            Adquira seu Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <img 
              src="/imagens-uploads/ticket.png" 
              alt="Ticket de desconto" 
              className="w-64 h-auto rounded-lg"
            />
          </div>

          <p className="text-center text-white font-poppins text-lg">
            Preencha suas informações:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cpf" className="text-junina-yellow-100 font-poppins text-sm">
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                required
                className="bg-junina-blue-800 border-junina-yellow-400/30 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-junina-yellow-100 font-poppins text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="bg-junina-blue-800 border-junina-yellow-400/30 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold"
              >
                <Ticket className="w-4 h-4 mr-2" />
                {loading ? "Enviando..." : "Adquirir Ticket"}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-junina-yellow-400/30 text-junina-yellow-400 hover:bg-junina-yellow-400/10"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcquireTicketModal;
