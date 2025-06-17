import { Button } from "@/components/ui/button";
import { Ticket, Gamepad2, Calendar, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const { isLoggedIn } = useAuth();

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <div className="absolute top-0 left-0 p-4"> 
            {isLoggedIn ? "" : (
              <img
              src="/imagens-uploads/logoMilho.png"
              alt="Festa Junina"
              className="w-28 h-28"
            />
            )}
          </div>
          <h1 className="text-4xl md:text-4xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text font-poetsen">Festa Junina</span>
            <br />
            <span className="text-junina-yellow-400 font-poetsen">
              🌽Trio da Pamonha🌽
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-poppins">
            {isLoggedIn
              ? "Bem-vindo de volta! Jogue nossos mini games e acumule tickets!"
              : "Divirta-se com nossos mini games temáticos e ganhe tickets!"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isLoggedIn ? (
              <>
                <Link to="/mini-jogos">
                  <Button
                    size="lg"
                    className="bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold text-lg px-8 py-4 font-poppins"
                  >
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Jogar Agora
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    size="lg"
                    className="bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold text-lg px-8 py-4 font-poppins"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Entrar Já
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-junina-yellow-400 text-junina-yellow-400 hover:bg-junina-yellow-400 hover:text-junina-blue-900 text-lg px-8 py-4 font-poppins"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Cadastrar Já
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
