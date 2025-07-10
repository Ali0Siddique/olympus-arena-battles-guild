
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Clock, DollarSign, Trophy, Star } from "lucide-react";

const MatchDetails = () => {
  const { id } = useParams();

  // Mock match data
  const matchData = {
    id: 1,
    title: "BGMI Squad Championship",
    game: "BGMI",
    type: "Squad",
    entryFee: 20,
    maxPlayers: 25,
    currentPlayers: 18,
    startTime: "Today 8:00 PM",
    status: "open",
    host: {
      name: "GameMaster_Pro",
      trustRating: 4.8,
      totalMatches: 45
    },
    payouts: [
      { position: "1st", amount: 25 },
      { position: "2nd", amount: 15 },
      { position: "3rd", amount: 10 },
      { position: "4th-5th", amount: 8 },
      { position: "6th-10th", amount: 5 }
    ],
    participants: [
      { name: "Player_Alpha", joined: "2 mins ago" },
      { name: "Squad_Leader", joined: "5 mins ago" },
      { name: "Battle_King", joined: "8 mins ago" },
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Match Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{matchData.title}</CardTitle>
                <CardDescription className="flex items-center space-x-4 mt-2">
                  <span>{matchData.game} • {matchData.type}</span>
                  <Badge variant="secondary">₹{matchData.entryFee} Entry</Badge>
                  <Badge variant={matchData.status === "open" ? "default" : "secondary"}>
                    {matchData.status}
                  </Badge>
                </CardDescription>
              </div>
              <Button size="lg" className="bg-primary">
                Join Match
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Players</p>
                  <p className="text-lg font-bold">{matchData.currentPlayers}/{matchData.maxPlayers}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <p className="text-lg font-bold">{matchData.startTime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <p className="text-lg font-bold">₹{matchData.entryFee * matchData.currentPlayers * 0.3}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Host Information */}
          <Card>
            <CardHeader>
              <CardTitle>Host Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{matchData.host.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{matchData.host.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{matchData.host.trustRating} Trust Rating</span>
                    <span>•</span>
                    <span>{matchData.host.totalMatches} matches hosted</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payout Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Structure</CardTitle>
              <CardDescription>Rewards for top 10 finishers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {matchData.payouts.map((payout, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span>{payout.position}</span>
                    </div>
                    <span className="font-bold text-green-500">₹{payout.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants */}
        <Card>
          <CardHeader>
            <CardTitle>Participants ({matchData.currentPlayers})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchData.participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>{participant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{participant.name}</p>
                    <p className="text-sm text-muted-foreground">Joined {participant.joined}</p>
                  </div>
                </div>
              ))}
              {/* Show remaining slots */}
              {Array.from({ length: matchData.maxPlayers - matchData.currentPlayers }).map((_, index) => (
                <div key={`empty-${index}`} className="flex items-center space-x-3 p-3 border-2 border-dashed border-muted rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div>
                    <p className="text-muted-foreground">Open Slot</p>
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

export default MatchDetails;
