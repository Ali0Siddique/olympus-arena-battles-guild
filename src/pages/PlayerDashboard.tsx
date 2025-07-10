
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Clock, Star } from "lucide-react";

const PlayerDashboard = () => {
  const { user } = useAuth();

  const mockStats = {
    totalMatches: 12,
    wins: 3,
    totalEarnings: 85,
    pendingPayouts: 25,
    winRate: 25,
    favorPoints: 150
  };

  const mockMatchHistory = [
    { id: 1, game: "BGMI", position: 1, earnings: 25, date: "2024-01-15", status: "paid" },
    { id: 2, game: "Free Fire", position: 3, earnings: 15, date: "2024-01-14", status: "paid" },
    { id: 3, game: "BGMI", position: 7, earnings: 5, date: "2024-01-13", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Player Dashboard</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            <Star className="w-4 h-4 mr-1" />
            {mockStats.favorPoints} Favor Points
          </Badge>
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
              <CardTitle className="text-sm text-muted-foreground">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{mockStats.winRate}%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">₹{mockStats.totalEarnings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">₹{mockStats.pendingPayouts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Match History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
            <CardDescription>Your latest match results and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMatchHistory.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{match.game} Match</p>
                      <p className="text-sm text-muted-foreground">Position #{match.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{match.earnings}</p>
                    <Badge variant={match.status === "paid" ? "default" : "secondary"}>
                      {match.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayerDashboard;
