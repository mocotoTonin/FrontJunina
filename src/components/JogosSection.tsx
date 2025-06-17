
import { Button } from '@/components/ui/button';
import { Gamepad2, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JogosSection = () => {
  return (
    <section id="jogos" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-junina-yellow-400 mb-6 font-poetsen">
            Mini Jogos
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto font-poppins">
            Divirta-se com nossos jogos temáticos e acumule tickets especiais!
          </p>
        </div>

        <div className="glass-effect p-8 rounded-2xl text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-junina-red-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gamepad2 className="w-8 h-8 text-junina-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-junina-yellow-400 mb-6 flex items-center justify-center font-poppins">
            <Trophy className="w-6 h-6 mr-2 text-junina-yellow-400" />
            Como Funciona
          </h3>
          <p className="text-white mb-6 text-lg font-poppins">
            Jogue nossos mini games temáticos e acumule tickets! Uma forma divertida de se divertir!
          </p>
          
          <Link to="/mini-jogos">
            <Button 
              className="bg-junina-red-400 hover:bg-junina-red-500 text-white font-semibold font-poppins"
              size="lg"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Explorar Mini Jogos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JogosSection;
