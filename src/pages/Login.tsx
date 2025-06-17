import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useLogin } from "@/hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (user) => {
          login(user);
          toast({
            title: "✅ Login realizado com sucesso!",
            description: "Bem-vindo de volta ao Trio da Pamonha!",
          });
          navigate("/");
        },
        onError: () => {
          toast({
            title: "❌ Erro no login",
            description: "Email ou senha incorretos.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('/imagens-uploads/login.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="w-full max-w-[500px] relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-green-600 font-poetsen hover:text-yellow-300 mb-6 transition-colors drop-shadow-lg text-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Link>

        <div className="flex justify-start px-8">
          <Card className="w-full bg-transparent shadow-none border-none mr-8">
            <CardHeader className="text-center p-0 border-none" />
            <CardContent className="bg-transparent p-0 border-none">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 font-poppins font-medium text-lg"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-poppins font-medium text-lg"
                  >
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 font-poppins shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 font-poppins text-base">
                  Não tem uma conta?{" "}
                  <Link
                    to="/cadastro"
                    className="text-green-600 hover:text-green-700 font-semibold underline text-base"
                  >
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
