import { useState, useEffect } from "react";
import { Wallet, TrendingUp, Users, Award, Calendar, DollarSign } from "lucide-react";
import { UserProfile } from "../types";

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Mock user profile data
    const mockProfile: UserProfile = {
      address: "0x123abc...def456",
      totalGroups: 3,
      totalContributions: 45000,
      totalEarnings: 3250,
      participationHistory: [
        {
          groupId: "1",
          groupName: "Tech Professionals Savings",
          status: "Active - Cycle 3/12",
          joinedDate: new Date(2024, 0, 15)
        },
        {
          groupId: "2",
          groupName: "Family Savings Circle",
          status: "Active - Cycle 5/6",
          joinedDate: new Date(2023, 11, 10)
        },
        {
          groupId: "3",
          groupName: "Startup Founders Fund",
          status: "Won Cycle 2 - Completed",
          joinedDate: new Date(2023, 8, 5)
        }
      ]
    };
    setProfile(mockProfile);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Your DeFi Chit Fund activity and statistics</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="defi-card">
              <div className="text-center mb-6">
                <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Connected Wallet</h2>
                <p className="text-muted-foreground text-sm font-mono bg-muted/20 px-3 py-2 rounded-lg">
                  {profile.address}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Total Groups</span>
                  </div>
                  <span className="font-semibold">{profile.totalGroups}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-accent" />
                    <span className="text-sm">Total Contributed</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(profile.totalContributions)}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm">Total Earnings</span>
                  </div>
                  <span className="font-semibold text-success">{formatCurrency(profile.totalEarnings)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Achievements</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>First Group Joined</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Won First Auction</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Active Participant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity and History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="defi-card text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <p className="text-2xl font-bold">{profile.totalGroups}</p>
                <p className="text-sm text-muted-foreground">Active Groups</p>
              </div>

              <div className="defi-card text-center">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <p className="text-2xl font-bold">12.5%</p>
                <p className="text-sm text-muted-foreground">Avg. Return</p>
              </div>

              <div className="defi-card text-center">
                <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6" />
                </div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foregreen">Auctions Won</p>
              </div>
            </div>

            {/* Participation History */}
            <div className="defi-card">
              <h2 className="text-xl font-semibold mb-6">Participation History</h2>
              
              <div className="space-y-4">
                {profile.participationHistory.map((participation, index) => (
                  <div key={participation.groupId} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{participation.groupName}</h3>
                        <p className="text-sm text-muted-foreground">Group ID: {participation.groupId}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        participation.status.includes('Won') 
                          ? 'text-success bg-success/10'
                          : participation.status.includes('Active')
                          ? 'text-accent bg-accent/10'
                          : 'text-muted-foreground bg-muted/10'
                      }`}>
                        {participation.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined: {participation.joinedDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="defi-card">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                  <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Monthly contribution made</p>
                    <p className="text-sm text-muted-foreground">Tech Professionals Savings - 3 days ago</p>
                  </div>
                  <span className="text-success font-medium">+$10,000</span>
                </div>

                <div className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                  <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Received discount bonus</p>
                    <p className="text-sm text-muted-foreground">Family Savings Circle - 1 week ago</p>
                  </div>
                  <span className="text-accent font-medium">+$250</span>
                </div>

                <div className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Joined new group</p>
                    <p className="text-sm text-muted-foreground">Startup Founders Fund - 2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;