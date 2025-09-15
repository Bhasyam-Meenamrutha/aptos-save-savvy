import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, Calendar, TrendingUp } from "lucide-react";
import { ChitGroup } from "../types";

const Dashboard = () => {
  const [groups, setGroups] = useState<ChitGroup[]>([]);

  useEffect(() => {
    // Load dummy data
    const dummyGroups: ChitGroup[] = [
      {
        id: "1",
        name: "Tech Professionals Savings",
        contributionAmount: 10000,
        totalMembers: 10,
        currentMembers: 8,
        duration: 12,
        currentCycle: 3,
        status: "active",
        createdBy: "0x123...abc",
        members: ["0x123...abc", "0x456...def"],
        nextPayoutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: "2",
        name: "Family Savings Circle",
        contributionAmount: 5000,
        totalMembers: 6,
        currentMembers: 6,
        duration: 6,
        currentCycle: 5,
        status: "active",
        createdBy: "0x789...ghi",
        members: ["0x123...abc", "0x789...ghi"],
        nextPayoutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: "3",
        name: "Startup Founders Fund",
        contributionAmount: 25000,
        totalMembers: 8,
        currentMembers: 5,
        duration: 8,
        currentCycle: 1,
        status: "pending",
        createdBy: "0x123...abc",
        members: ["0x123...abc"],
        nextPayoutDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    ];
    setGroups(dummyGroups);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success bg-success/10";
      case "pending":
        return "text-accent bg-accent/10";
      case "completed":
        return "text-muted-foreground bg-muted/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your chit fund groups</p>
        </div>
        <Link to="/create-group" className="defi-button-primary inline-flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Group
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="defi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Groups</p>
              <p className="text-2xl font-bold">{groups.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="defi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Groups</p>
              <p className="text-2xl font-bold">{groups.filter(g => g.status === 'active').length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-success" />
          </div>
        </div>
        
        <div className="defi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Contributions</p>
              <p className="text-2xl font-bold">
                {formatCurrency(groups.reduce((sum, group) => sum + (group.contributionAmount * group.currentCycle), 0))}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-accent" />
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="defi-card hover:shadow-elevated transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                {group.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members</span>
                <span className="font-medium">{group.currentMembers}/{group.totalMembers}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contribution</span>
                <span className="font-medium">{formatCurrency(group.contributionAmount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Cycle</span>
                <span className="font-medium">{group.currentCycle}/{group.duration}</span>
              </div>
              
              {group.nextPayoutDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Payout</span>
                  <span className="font-medium text-sm">
                    {group.nextPayoutDate.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(group.currentCycle / group.duration) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Link 
                to="/auction" 
                className="flex-1 text-center py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                View Details
              </Link>
              {group.status === 'active' && (
                <Link 
                  to="/auction" 
                  className="flex-1 text-center py-2 px-4 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
                >
                  Join Auction
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {groups.length === 0 && (
        <div className="text-center py-16">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No groups yet</h3>
          <p className="text-muted-foreground mb-6">Create your first chit fund group to get started</p>
          <Link to="/create-group" className="defi-button-primary inline-flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Your First Group
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;