import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRegister } from "@/hooks/useRegister";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    cpf: "",
    password: "",
  });
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.mutate(formData, {
      onSuccess: (username) => {
        login(username);
        toast({
          title: "✅ Cadastro realizado com sucesso!",
          description: "Agora efetue seu login!",
          duration: 5000,
        });
        navigate("/login");
      },
      onError: () => {
        toast({
          title: "❌ Erro no cadastro",
          description: "Não foi possível realizar o cadastro.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(/imagens-uploads/cadastro.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay para melhorar a legibilidade */}
      <div className="absolute inset-0"></div>

      <div className="w-full max-w-[500px] relative z-10 pt-24">
        <Card className="bg-transparent shadow-none border-none">
            <Link
              to="/"
              className="inline-flex items-center text-green-600 font-poetsen hover:text-yellow-300 mb-6 transition-colors px-3 py-2 rounded-lg text-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 mr-12">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-poppins font-medium text-lg">
                  Nome Completo
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 text-base"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-poppins font-medium text-lg">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 text-base"
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-gray-700 font-poppins font-medium text-lg">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 text-base"
                  placeholder="000.000.000-00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-poppins font-medium text-lg">
                  Senha
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 text-base"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 shadow-lg"
                size="lg"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Criar Conta
              </Button>
            </form>

            <div className="mt-6 text-center mr-12">
              <p className="text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Entre aqui
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
