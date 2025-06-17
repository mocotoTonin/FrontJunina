import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";   // ✅ Importa aqui!
import { useLoading } from "@/hooks/useLoading";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import MiniJogos from "./pages/MiniJogos";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/mini-jogos" element={<MiniJogos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>   {/* ✅ Coloque aqui! */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
