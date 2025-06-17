
import { Calendar, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-junina-blue-900/50 border-t border-junina-yellow-400/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-junina-yellow-400 to-junina-red-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Festa Junina</span>
            </div>
            <p className="text-junina-yellow-200 text-sm">
              Celebrando a tradição junina com tecnologia e diversão. Uma festa inesquecível para toda a família.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-junina-yellow-100 mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-junina-yellow-200">
              <li><a href="#festa" className="hover:text-junina-yellow-400 transition-colors">Sobre a Festa</a></li>
              <li><a href="#jogos" className="hover:text-junina-yellow-400 transition-colors">Mini Jogos</a></li>
              <li><a href="#perfil" className="hover:text-junina-yellow-400 transition-colors">Meu Perfil</a></li>
            </ul>
          </div>

          {/* Informações do Evento */}
          <div>
            <h3 className="text-lg font-semibold text-junina-yellow-100 mb-4">Informações</h3>
            <ul className="space-y-3 text-sm text-junina-yellow-200">
              <li className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-junina-yellow-400" />
                <span>24-25 de Junho</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-junina-yellow-400" />
                <span>Centro de Eventos SENAI</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-junina-yellow-400" />
                <span>(11) 9999-9999</span>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold text-junina-yellow-100 mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-junina-yellow-200">
                <Mail className="w-4 h-4 text-junina-yellow-400" />
                <span>festa@senai.edu.br</span>
              </div>
              <p className="text-xs text-junina-yellow-300">
                Dúvidas ou sugestões? Entre em contato conosco!
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-junina-yellow-400/20 mt-8 pt-8 text-center">
          <p className="text-sm text-junina-yellow-300">
            © 2024 Festa Junina Digital - Projeto SENAI Back-end. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
