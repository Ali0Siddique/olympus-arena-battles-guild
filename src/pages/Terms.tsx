
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Shield, AlertTriangle, Crown, Users, Scale } from 'lucide-react';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-gray-300 hover:text-yellow-400 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
              <p className="text-gray-300">Age of Olympus - Skill-Based Competitive Platform</p>
            </div>
          </div>

          {/* Important Notice */}
          <Alert className="border-yellow-600 bg-yellow-900/20 mb-8">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              <strong>Important:</strong> Age of Olympus is a skill-based competitive gaming platform, NOT a gambling service. 
              Success depends entirely on player skill, strategy, and gaming expertise.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Requirements */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  Age Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>• Users must be 13 years or older to participate</p>
                <p>• Age verification may be required</p>
                <p>• Parental consent required for users under 18</p>
                <p>• False age declaration results in immediate ban</p>
              </CardContent>
            </Card>

            {/* Skill-Based Competition */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                  Skill-Based Nature
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>• Outcomes based purely on gaming skill</p>
                <p>• No random elements or luck-based mechanics</p>
                <p>• Fair play and anti-cheat measures enforced</p>
                <p>• Transparent rules and payout structures</p>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Payment & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>• Entry fees processed via UPI only</p>
                <p>• All transactions require verification</p>
                <p>• Payouts made within 24 hours of match completion</p>
                <p>• Zero tolerance for payment fraud</p>
              </CardContent>
            </Card>

            {/* Fair Play */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Scale className="w-5 h-5 mr-2 text-purple-400" />
                  Fair Play Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>• Cheating, hacking, or exploiting prohibited</p>
                <p>• Account sharing strictly forbidden</p>
                <p>• Disputes resolved through evidence review</p>
                <p>• Trust rating system ensures quality hosts</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Terms */}
          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white">Detailed Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">1. Platform Purpose</h3>
                <p>
                  Age of Olympus provides a platform for skill-based competitive gaming tournaments. 
                  Players compete using their gaming skills in popular battle royale games with entry fees 
                  and skill-based rewards.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">2. Daily Limits & Responsible Gaming</h3>
                <p>
                  To promote responsible gaming, users are limited to a maximum of 2 matches per day. 
                  This limit helps prevent excessive participation and ensures the platform remains 
                  focused on skill development rather than repetitive play.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3. Host Responsibilities</h3>
                <p>
                  Match hosts are responsible for verifying player payments, providing room codes, 
                  and distributing payouts fairly. Hosts who fail to pay winners will have their 
                  trust scores reduced and may be banned from hosting.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">4. Dispute Resolution</h3>
                <p>
                  All disputes must be reported within 24 hours of match completion with supporting 
                  evidence (screenshots, recordings). Our team reviews disputes fairly and makes 
                  final decisions based on evidence provided.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">5. Anti-Fraud Measures</h3>
                <p>
                  We employ various measures to prevent fraud including payment verification, 
                  screenshot requirements, trust rating systems, and community reporting. 
                  Users found engaging in fraudulent activities face immediate account suspension.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">6. Legal Compliance</h3>
                <p>
                  This platform operates as a skill-based competitive gaming service. We comply with 
                  applicable laws and regulations. Users are responsible for ensuring their participation 
                  is legal in their jurisdiction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Support */}
          <Card className="bg-slate-800/50 border-slate-700 mt-6">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                For support, disputes, or questions about our terms, contact our team:
              </p>
              <div className="space-y-2 text-yellow-400">
                <p>Email: support@ageofollympus.com</p>
                <p>Response Time: Within 24 hours</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              Last updated: July 10, 2024 | Version 1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
