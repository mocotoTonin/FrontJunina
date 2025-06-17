
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-junina-blue-900 via-junina-blue-800 to-junina-blue-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <img 
            src="/imagens-uploads/loadingMilho.png" 
            alt="Festa Junina" 
            className="w-16 h-16"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <h2 className="text-2xl font-bold text-junina-yellow-400 mb-2 font-poetsen">
          Festa Junina
        </h2>
        <div className="flex space-x-1 justify-center">
          <div className="w-3 h-3 bg-junina-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-junina-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-junina-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
