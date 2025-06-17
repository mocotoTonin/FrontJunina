
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, ArrowLeft, Trophy, Ticket, ShoppingBag, Crown, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import EditProfileModal from '@/components/EditProfileModal';
import AcquireTicketModal from '@/components/AcquireTicketModal';
import { useAuth } from '@/hooks/useAuth';
import { useTickets } from '@/hooks/useTickets';

const Perfil = () => {
  const { user, logout } = useAuth();
  const { tickets } = useTickets();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAcquireModalOpen, setIsAcquireModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: user?.username || 'Marco Antônio',
    email: user?.email || 'marco.silva.dev2024@gmail.com',
    discount: tickets >= 20 ? 10 : Math.floor(tickets / 2),
    gamesPlayed: parseInt(localStorage.getItem('totalGamesPlayed') || '0'),
    purchasedTickets: parseInt(localStorage.getItem('purchasedTickets') || '0')
  });

  const handleSaveProfile = (data: { name: string; email: string; profileImage?: string }) => {
    setUserData(prev => ({
      ...prev,
      name: data.name,
      email: data.email
    }));
    console.log('Profile updated:', data);
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-junina-yellow-400/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/imagens-uploads/logoMilho.png" 
                  alt="Festa Junina" 
                  className="w-16 h-16"
                />
                <span className="text-xl font-bold gradient-text font-poetsen">Festa Junina</span>
              </Link>
              
              <Link 
                to="/"
                className="flex items-center text-white hover:text-junina-yellow-400 transition-colors font-poppins"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-junina-yellow-400 mb-4 font-poetsen">
                Meu Perfil
              </h1>
            </div>

            {/* Informações do usuário */}
            <div className="glass-effect p-6 rounded-2xl mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-junina-yellow-400/20 rounded-full flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-junina-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-junina-yellow-400 font-poetsen">
                      {userData.name}
                    </h2>
                    <p className="text-white font-poppins">{userData.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  size="sm"
                  className="bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold text-xs px-2"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Editar</span>
                </Button>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
              <div className="glass-effect p-4 rounded-2xl text-center">
                <div className="w-16 h-16 bg-junina-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Ticket className="w-12 h-12 text-junina-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white font-poppins">{tickets}</div>
                <div className="text-white text-lg font-poppins mb-4">Tickets</div>
                <Button
                  onClick={() => setIsAcquireModalOpen(true)}
                  size="lg"
                  className="bg-junina-green-400 hover:bg-junina-green-500 text-white font-semibold text-lg"
                >
                  Adquirir
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button 
                onClick={logout}
                className="bg-junina-red-400 hover:bg-junina-red-500 text-white font-semibold font-poppins text-lg"
                size="lg"
              >
                Sair da Conta
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      <AcquireTicketModal
        isOpen={isAcquireModalOpen}
        onClose={() => setIsAcquireModalOpen(false)}
      />
    </div>
  );
};

export default Perfil;
