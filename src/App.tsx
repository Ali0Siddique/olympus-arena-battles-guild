
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import Index from "./pages/Index";
import MatchLobby from "./pages/MatchLobby";
import CreateMatch from "./pages/CreateMatch";
import PlayerDashboard from "./pages/PlayerDashboard";
import HostDashboard from "./pages/HostDashboard";
import MatchDetails from "./pages/MatchDetails";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <GameProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/lobby" element={<MatchLobby />} />
              <Route path="/create-match" element={<CreateMatch />} />
              <Route path="/player-dashboard" element={<PlayerDashboard />} />
              <Route path="/host-dashboard" element={<HostDashboard />} />
              <Route path="/match/:id" element={<MatchDetails />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GameProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
