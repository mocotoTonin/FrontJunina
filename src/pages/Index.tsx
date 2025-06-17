import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import JogosSection from '@/components/JogosSection';
import { useAuth } from '@/hooks/useAuth';
import Madeira from '@/components/madeira'; // ✅ importa o componente de imagem no rodapé
import { useEffect } from 'react';

const Index = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  useEffect(() => {
    console.log('isLoggedIn mudou:', isLoggedIn); 

  }, [isLoggedIn]); // useEffect será chamado sempre que isLoggedIn mudar

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        {/* Mostrar Navigation apenas quando logado */}
        {isLoggedIn && <Navigation />}
        <Hero />
        {/* Mostrar JogosSection apenas quando logado */}
        {isLoggedIn && <JogosSection />}
      </div>

      {/* ✅ Componente de imagem fixa no rodapé */}
      <Madeira />
    </div>
  );
};

export default Index;