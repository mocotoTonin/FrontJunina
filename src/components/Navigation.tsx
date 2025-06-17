
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Ticket, Gamepad2, Calendar, User, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTickets } from '@/hooks/useTickets';
import { useAuth } from '@/hooks/useAuth';
import AcquireTicketModal from '@/components/AcquireTicketModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAcquireModalOpen, setIsAcquireModalOpen] = useState(false);
  const [showTicketHover, setShowTicketHover] = useState(false);
  const location = useLocation();
  const { tickets } = useTickets();
  const { isLoggedIn, logout } = useAuth();

  const navItems = [
    { name: 'Festa Junina', href: '#festa', icon: Calendar },
    { name: 'Mini Jogos', href: '/mini-jogos', icon: Gamepad2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-junina-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/imagens-uploads/logoMilho.png" 
              alt="Festa Junina" 
              className="w-16 h-16"
            />
            <span className="text-xl font-bold gradient-text font-poetsen">Festa Junina</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-junina-yellow-100 hover:text-junina-yellow-400 transition-colors duration-200 font-poppins"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-junina-yellow-100 hover:text-junina-yellow-400 transition-colors duration-200 font-poppins"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            ))}
            
            {/* Tickets indicator - show only when logged in */}
            {isLoggedIn && tickets > 0 && (
              <div 
                className="relative flex items-center space-x-1 text-junina-yellow-400 bg-junina-yellow-400/10 px-2 py-1 rounded-full text-sm cursor-pointer"
                onMouseEnter={() => setShowTicketHover(true)}
                onMouseLeave={() => {
                  setTimeout(() => setShowTicketHover(false), 200);
                }}
              >
                <Ticket className="w-3 h-3" />
                <span className="font-medium">{tickets}</span>
                
                {showTicketHover && (
                  <div 
                    className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 z-50 pb-2"
                    onMouseEnter={() => setShowTicketHover(true)}
                    onMouseLeave={() => setShowTicketHover(false)}
                  >
                    <Button
                      onClick={() => {
                        setIsAcquireModalOpen(true);
                        setShowTicketHover(false);
                      }}
                      size="sm"
                      className="bg-junina-green-400 hover:bg-junina-green-500 text-white font-semibold text-xs whitespace-nowrap"
                    >
                      Adquirir
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {isLoggedIn && (
              <Button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="bg-junina-red-400 hover:bg-junina-red-500 text-white font-semibold font-poppins"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            )}
            
            {!isLoggedIn && (
              <Link to="/login">
                <Button className="bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold font-poppins">
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-junina-yellow-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-junina-yellow-400/20">
            <div className="flex flex-col space-y-4">
              {/* Tickets indicator for mobile - show only when logged in */}
              {isLoggedIn && tickets > 0 && (
                <div className="flex items-center justify-center space-x-1 text-junina-yellow-400 bg-junina-yellow-400/10 px-3 py-2 rounded-full text-sm w-fit mx-auto">
                  <Ticket className="w-3 h-3" />
                  <span className="font-medium">{tickets} tickets</span>
                </div>
              )}
              
              {isLoggedIn && tickets > 0 && (
                <Button
                  onClick={() => setIsAcquireModalOpen(true)}
                  size="sm"
                  className="bg-junina-green-400 hover:bg-junina-green-500 text-white font-semibold w-fit font-poppins"
                >
                  Adquirir Ticket
                </Button>
              )}
              
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-junina-yellow-100 hover:text-junina-yellow-400 transition-colors duration-200 font-poppins"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 text-junina-yellow-100 hover:text-junina-yellow-400 transition-colors duration-200 font-poppins"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              
              {isLoggedIn ? (
                <Button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="bg-junina-red-400 hover:bg-junina-red-500 text-white font-semibold w-fit font-poppins"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold w-fit font-poppins">
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AcquireTicketModal
        isOpen={isAcquireModalOpen}
        onClose={() => setIsAcquireModalOpen(false)}
      />
    </nav>
  );
};

export default Navigation;