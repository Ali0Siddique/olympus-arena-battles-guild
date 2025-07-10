
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, Phone, User, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ageConfirmed) {
      toast.error('Please confirm you are 13+ years old');
      return;
    }

    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    if (name.length < 2) {
      toast.error('Please enter your full name');
      return;
    }

    try {
      await login(phone, name);
      toast.success('Welcome to Age of Olympus!');
      navigate('/lobby');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-2" />
            <CardTitle className="text-2xl text-white">Age of Olympus</CardTitle>
          </div>
          <CardDescription className="text-gray-300">
            Enter your details to join the arena
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <Alert className="border-yellow-600 bg-yellow-900/20">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200">
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="ageConfirm"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="rounded border-yellow-400"
                  />
                  <label htmlFor="ageConfirm" className="text-sm">
                    I confirm that I am 13+ years old and understand this is a skill-based competitive platform
                  </label>
                </div>
              </AlertDescription>
            </Alert>

            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              disabled={isLoading || !ageConfirmed}
            >
              {isLoading ? 'Entering Arena...' : 'Enter Arena'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/terms" 
              className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Terms of Service & Privacy Policy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
