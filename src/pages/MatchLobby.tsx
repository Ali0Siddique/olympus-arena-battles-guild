
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Plus, Search, Users, Clock, Star, Trophy, Filter } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';

const MatchLobby = () => {
  const { user } = useAuth();
  const { matches } = useGame();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [gameFilter, setGameFilter] = useState<string>('all');
  const [feeFilter, setFeeFilter] = useState<string>('all');

  if (!user) {
    navigate('/login');
    return null;
  }

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.hostName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = gameFilter === 'all' || match.game === gameFilter;
    const matchesFee = feeFilter === 'all' || 
                      (feeFilter === 'low' && match.entryFee <= 10) ||
                      (feeFilter === 'medium' && match.entryFee > 10 && match.entryFee <= 15) ||
                      (feeFilter === 'high' && match.entryFee > 15);
    
    return matchesSearch && matchesGame && matchesFee;
  });

  const getGameColor = (game: string) => {
    switch (game) {
      case 'BGMI': return 'bg-orange-500';
      case 'FreeFire': return 'bg-red-500';
      case 'PUBG': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AppHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Battle Arena</h1>
            <p className="text-gray-300">Choose your battlefield and prove your skills</p>
          </div>
          <Button 
            onClick={() => navigate('/create-match')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Host Match
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800/50 border-slate-700 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search matches or hosts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <Select value={gameFilter} onValueChange={setGameFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Game Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  <SelectItem value="BGMI">BGMI</SelectItem>
                  <SelectItem value="FreeFire">FreeFire</SelectItem>
                  <SelectItem value="PUBG">PUBG</SelectItem>
                </SelectContent>
              </Select>

              <Select value={feeFilter} onValueChange={setFeeFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Entry Fee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fees</SelectItem>
                  <SelectItem value="low">₹5-10</SelectItem>
                  <SelectItem value="medium">₹11-15</SelectItem>
                  <SelectItem value="high">₹16-20</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center text-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                {filteredMatches.length} matches found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-400 transition-colors cursor-pointer"
                  onClick={() => navigate(`/match/${match.id}`)}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`${getGameColor(match.game)} text-white`}>
                    {match.game}
                  </Badge>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    {match.type}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">{match.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  Hosted by {match.hostName}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm font-medium">{match.hostTrustScore}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{formatTime(match.startTime)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{match.currentPlayers}/{match.maxPlayers}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">₹{match.entryFee}</div>
                    <div className="text-xs text-gray-400">Entry Fee</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700">
                  <div className="flex items-center text-green-400">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">
                      Win up to ₹{match.payoutStructure[0]?.amount || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
            <CardContent>
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Matches Found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or create a new match</p>
              <Button 
                onClick={() => navigate('/create-match')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Host Your First Match
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchLobby;
