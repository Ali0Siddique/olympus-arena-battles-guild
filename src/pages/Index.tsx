
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Shield, Trophy, Zap } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/lobby');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-16 h-16 text-yellow-400 mr-4" />
            <h1 className="text-6xl font-bold text-white">
              Age of <span className="text-yellow-400">Olympus</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the ultimate competitive battleground where skill meets glory. 
            Compete in BGMI, FreeFire, and PUBG tournaments with real rewards.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
              onClick={() => navigate('/login')}
            >
              Enter the Arena
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3"
              onClick={() => navigate('/terms')}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-white">Skill-Based</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center">
                Pure skill competition with transparent rules and fair gameplay
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-white">Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center">
                Safe UPI transactions with verified hosts and transparent payouts
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-white">Instant Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center">
                Win and get paid immediately. Top 10 finishers earn real money
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="text-center">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-white">Trust System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-center">
                Rate hosts and build your reputation in the community
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Legal Notice */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Age Verification Required</h3>
          <p className="text-gray-300 mb-4">
            This app is for players aged 13+ only. This is a skill-based competitive platform, not gambling.
          </p>
          <p className="text-sm text-gray-400">
            By using this app, you agree to our Terms of Service and confirm you meet the age requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
