
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppHeader } from '@/components/AppHeader';
import { ArrowLeft, Crown, Trophy, Users, Clock, Calculator } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const CreateMatch = () => {
  const { user } = useAuth();
  const { createMatch } = useGame();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    type: '',
    entryFee: 10,
    maxPlayers: 50,
    startTime: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const generatePayoutStructure = (entryFee: number, maxPlayers: number) => {
    const totalPool = entryFee * maxPlayers;
    const payoutPool = Math.floor(totalPool * 0.3); // 30% of total pool for winners
    
    return [
      { position: 1, amount: Math.floor(payoutPool * 0.30) },
      { position: 2, amount: Math.floor(payoutPool * 0.20) },
      { position: 3, amount: Math.floor(payoutPool * 0.15) },
      { position: 4, amount: Math.floor(payoutPool * 0.10) },
      { position: 5, amount: Math.floor(payoutPool * 0.08) },
      { position: 6, amount: Math.floor(payoutPool * 0.06) },
      { position: 7, amount: Math.floor(payoutPool * 0.04) },
      { position: 8, amount: Math.floor(payoutPool * 0.03) },
      { position: 9, amount: Math.floor(payoutPool * 0.02) },
      { position: 10, amount: Math.floor(payoutPool * 0.02) }
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.game || !formData.type || !formData.startTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.entryFee < 5 || formData.entryFee > 20) {
      toast.error('Entry fee must be between ₹5 and ₹20');
      return;
    }

    const payoutStructure = generatePayoutStructure(formData.entryFee, formData.maxPlayers);
    
    createMatch({
      title: formData.title,
      game: formData.game as 'BGMI' | 'FreeFire' | 'PUBG',
      type: formData.type as 'Solo' | 'Duo' | 'Squad',
      entryFee: formData.entryFee,
      maxPlayers: formData.maxPlayers,
      hostId: user.id,
      hostName: user.name,
      hostTrustScore: user.trustScore,
      startTime: formData.startTime,
      payoutStructure
    });

    toast.success('Match created successfully!');
    navigate('/lobby');
  };

  const payoutStructure = generatePayoutStructure(formData.entryFee, formData.maxPlayers);
  const totalPayout = payoutStructure.reduce((sum, p) => sum + p.amount, 0);
  const hostProfit = (formData.entryFee * formData.maxPlayers) - totalPayout;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AppHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/lobby')}
              className="text-gray-300 hover:text-yellow-400 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Arena
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Host a Match</h1>
              <p className="text-gray-300">Create your own competitive battleground</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                  Match Details
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Configure your tournament settings
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Match Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Olympus Thunder Squad"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Game</Label>
                      <Select value={formData.game} onValueChange={(value) => setFormData({ ...formData, game: value })}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select game" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BGMI">BGMI</SelectItem>
                          <SelectItem value="FreeFire">FreeFire</SelectItem>
                          <SelectItem value="PUBG">PUBG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Type</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solo">Solo</SelectItem>
                          <SelectItem value="Duo">Duo</SelectItem>
                          <SelectItem value="Squad">Squad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entryFee" className="text-white">Entry Fee (₹)</Label>
                      <Input
                        id="entryFee"
                        type="number"
                        min="5"
                        max="20"
                        value={formData.entryFee}
                        onChange={(e) => setFormData({ ...formData, entryFee: parseInt(e.target.value) || 10 })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxPlayers" className="text-white">Max Players</Label>
                      <Select value={formData.maxPlayers.toString()} onValueChange={(value) => setFormData({ ...formData, maxPlayers: parseInt(value) })}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20 Players</SelectItem>
                          <SelectItem value="50">50 Players</SelectItem>
                          <SelectItem value="100">100 Players</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-white">Start Time</Label>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Create Match
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Preview */}
            <div className="space-y-6">
              {/* Match Preview */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                    Match Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Game:</span>
                    <Badge className="bg-orange-500 text-white">
                      {formData.game || 'Select Game'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Type:</span>
                    <span className="text-white">{formData.type || 'Select Type'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Entry Fee:</span>
                    <span className="text-yellow-400 font-bold">₹{formData.entryFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Max Players:</span>
                    <span className="text-white">{formData.maxPlayers}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payout Structure */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-green-400" />
                    Payout Structure
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Automatic calculation based on entry fee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {payoutStructure.slice(0, 3).map((payout) => (
                      <div key={payout.position} className="flex justify-between items-center">
                        <span className="text-gray-300">
                          {payout.position === 1 ? '🥇' : payout.position === 2 ? '🥈' : '🥉'} 
                          {' '}Position {payout.position}:
                        </span>
                        <span className="text-green-400 font-bold">₹{payout.amount}</span>
                      </div>
                    ))}
                    <div className="text-sm text-gray-400 text-center py-2">
                      + 7 more positions (₹{payoutStructure.slice(3).reduce((sum, p) => sum + p.amount, 0)} total)
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-700 pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Prize Pool:</span>
                      <span className="text-green-400 font-bold">₹{totalPayout}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Your Profit:</span>
                      <span className="text-yellow-400 font-bold">₹{hostProfit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;
