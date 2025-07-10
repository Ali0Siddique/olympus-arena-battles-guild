
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, User, LogOut, Trophy, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AppHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/lobby')}
        >
          <Crown className="w-8 h-8 text-yellow-400 mr-2" />
          <h1 className="text-xl font-bold text-white">Age of Olympus</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-yellow-400"
            onClick={() => navigate('/lobby')}
          >
            Arena
          </Button>
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-yellow-400"
            onClick={() => navigate('/player-dashboard')}
          >
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-yellow-400"
            onClick={() => navigate('/host-dashboard')}
          >
            Host
          </Button>
        </nav>

        {/* User Menu */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                      ★ {user.trustScore}
                    </Badge>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem 
                onClick={() => navigate('/player-dashboard')}
                className="text-white hover:bg-slate-700"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Player Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate('/host-dashboard')}
                className="text-white hover:bg-slate-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Host Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-400 hover:bg-slate-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
