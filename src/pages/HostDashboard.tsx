
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, DollarSign, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const mockStats = {
    totalMatches: 8,
    totalProfit: 2792,
    totalCollected: 4000,
    totalPaid: 1208,
    trustRating: 4.7,
    activeMatches: 2
  };

  const mockMatches = [
    { 
      id: 1, 
      title: "BGMI Squad Championship", 
      game: "BGMI", 
      entryFee: 20, 
      participants: 25, 
      status: "completed",
      profit: 349,
      collected: 500,
      paid: 151
    },
    { 
      id: 2, 
      title: "Free Fire Solo Battle", 
      game: "Free Fire", 
      entryFee: 10, 
      participants: 18, 
      status: "active",
      profit: 0,
      collected: 180,
      paid: 0
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Host Dashboard</h1>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-500 mr-1" />
              <span className="text-lg font-medium">{mockStats.trustRating} Trust Rating</span>
            </div>
          </div>
          <Button onClick={() => navigate("/create-match")} className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Match
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalMatches}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">₹{mockStats.totalProfit}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">₹{mockStats.totalCollected}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Paid Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">₹{mockStats.totalPaid}</div>
            </CardContent>
          </Card>
        </div>

        {/* Match Management */}
        <Card>
          <CardHeader>
            <CardTitle>Your Matches</CardTitle>
            <CardDescription>Manage your hosted matches and track profits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMatches.map((match) => (
                <div key={match.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{match.title}</h3>
                      <p className="text-muted-foreground">{match.game} • ₹{match.entryFee} entry</p>
                    </div>
                    <Badge variant={match.status === "completed" ? "default" : "secondary"}>
                      {match.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-medium">{match.participants}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Collected</p>
                      <p className="font-medium text-blue-500">₹{match.collected}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Profit</p>
                      <p className="font-medium text-green-500">₹{match.profit}</p>
                    </div>
                  </div>
                  
                  {match.status === "active" && (
                    <Button variant="outline" className="mt-3" size="sm">
                      Manage Match
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostDashboard;
