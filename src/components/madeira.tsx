import React from 'react';

const Madeira = () => {
  return (
    <div className="relative w-full">
      {/* Imagem de fundo do chão */}
      <img 
        src="/imagens-uploads/madeira.png" 
        alt="Chão de madeira" 
        className="absolute bottom-0 left-0 w-full h-96"
      />
    </div>  
  );
};

export default Madeira;

