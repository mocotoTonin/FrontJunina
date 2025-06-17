
import { Calendar } from 'lucide-react';

const FestaSection = () => {
  return (
    <section id="festa" className="py-20 relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-junina-yellow-400 mb-6 font-poetsen">
            Sobre a Festa Junina
          </h2>
          <p className="text-xl text-white max-w-xl mx-auto font-poppins">
            Uma celebração tradicional que une família, amigos e comunidade em torno da alegria, música e tradições populares brasileiras.
          </p>
        </div>

        <div className="glass-effect p-8 rounded-2xl text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-junina-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-junina-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-junina-yellow-400 mb-6 font-poppins">Nossa Festa</h3>
          <div className="space-y-4 text-white text-lg font-poppins">
            <p>
              🎪 <strong>Barracas Tradicionais:</strong> Comidas típicas como pamonha, canjica, 
              quentão e muito mais preparadas com carinho.
            </p>
            <p>
              🎵 <strong>Apresentações:</strong> Quadrilhas, sanfona ao vivo e apresentações 
              culturais durante toda a festa.
            </p>
            <p>
              🎯 <strong>Brincadeiras:</strong> Pescaria, argola, correio elegante e nossos 
              novos mini jogos digitais com prêmios!
            </p>
            <p>
              🏆 <strong>Concursos:</strong> Melhor fantasia caipira, rei e rainha da festa, 
              e competições de dança.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestaSection;
