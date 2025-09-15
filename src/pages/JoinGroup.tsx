import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users, DollarSign, Calendar, MapPin } from "lucide-react";
import { ChitGroup } from "../types";

const JoinGroup = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [foundGroup, setFoundGroup] = useState<ChitGroup | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  // Mock available groups
  const mockGroups: Record<string, ChitGroup> = {
    "TECH001": {
      id: "TECH001",
      name: "Tech Professionals Savings",
      contributionAmount: 10000,
      totalMembers: 10,
      currentMembers: 8,
      duration: 12,
      currentCycle: 0,
      status: "pending",
      createdBy: "0x456...def",
      members: ["0x456...def", "0x789...ghi"]
    },
    "FAM001": {
      id: "FAM001",
      name: "Family Savings Circle",
      contributionAmount: 5000,
      totalMembers: 6,
      currentMembers: 6,
      duration: 6,
      currentCycle: 2,
      status: "active",
      createdBy: "0x789...ghi",
      members: ["0x789...ghi", "0x456...def"]
    },
    "START001": {
      id: "START001",
      name: "Startup Founders Fund",
      contributionAmount: 25000,
      totalMembers: 8,
      currentMembers: 3,
      duration: 8,
      currentCycle: 0,
      status: "pending",
      createdBy: "0xabc...123",
      members: ["0xabc...123"]
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setError("Please enter a group ID");
      return;
    }

    setIsSearching(true);
    setError("");
    setFoundGroup(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const group = mockGroups[searchId.toUpperCase()];
    if (group) {
      setFoundGroup(group);
    } else {
      setError("Group not found. Please check the ID and try again.");
    }

    setIsSearching(false);
  };

  const handleJoinGroup = async () => {
    if (!foundGroup) return;

    if (foundGroup.currentMembers >= foundGroup.totalMembers) {
      setError("This group is already full");
      return;
    }

    if (foundGroup.members.includes("0x123...abc")) {
      setError("You are already a member of this group");
      return;
    }

    setIsJoining(true);

    // Simulate joining process
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would update the group membership
    console.log("Joined group:", foundGroup.id);

    setIsJoining(false);
    navigate("/dashboard");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Join Chit Fund Group</h1>
          <p className="text-muted-foreground">Enter a group ID to join an existing chit fund</p>
        </div>

        {/* Search Section */}
        <div className="defi-card mb-8">
          <h2 className="text-xl font-semibold mb-4">Search for Group</h2>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Group ID (e.g., TECH001)"
                className="defi-input w-full"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className={`defi-button-primary inline-flex items-center gap-2 ${
                isSearching ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Search className="h-4 w-4" />
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Group Details */}
        {foundGroup && (
          <div className="defi-card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">{foundGroup.name}</h2>
                <p className="text-muted-foreground">Group ID: {foundGroup.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(foundGroup.status)}`}>
                {foundGroup.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Members</p>
                    <p className="text-sm text-muted-foreground">
                      {foundGroup.currentMembers} of {foundGroup.totalMembers} joined
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Monthly Contribution</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(foundGroup.contributionAmount)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {foundGroup.duration} months
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Current Cycle</p>
                    <p className="text-sm text-muted-foreground">
                      {foundGroup.currentCycle} of {foundGroup.duration}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Group Fill Progress</span>
                <span>{foundGroup.currentMembers}/{foundGroup.totalMembers}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(foundGroup.currentMembers / foundGroup.totalMembers) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Group Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3 text-primary">Group Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Fund Size:</span>
                  <span className="font-medium">
                    {formatCurrency(foundGroup.contributionAmount * foundGroup.totalMembers)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Your Monthly Commitment:</span>
                  <span className="font-medium">{formatCurrency(foundGroup.contributionAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spots Remaining:</span>
                  <span className="font-medium">
                    {foundGroup.totalMembers - foundGroup.currentMembers}
                  </span>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <button
              onClick={handleJoinGroup}
              disabled={isJoining || foundGroup.currentMembers >= foundGroup.totalMembers}
              className={`defi-button-primary w-full ${
                isJoining || foundGroup.currentMembers >= foundGroup.totalMembers 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {isJoining 
                ? "Joining Group..." 
                : foundGroup.currentMembers >= foundGroup.totalMembers 
                  ? "Group is Full" 
                  : "Join Group"
              }
            </button>
          </div>
        )}

        {/* Sample Group IDs */}
        <div className="mt-8 defi-card">
          <h3 className="font-semibold mb-4">Sample Group IDs to Try</h3>
          <div className="grid gap-3">
            {Object.entries(mockGroups).map(([id, group]) => (
              <div 
                key={id}
                className="flex justify-between items-center p-3 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setSearchId(id)}
              >
                <div>
                  <p className="font-medium">{group.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(group.contributionAmount)}/month</p>
                  <p className="text-xs text-muted-foreground">
                    {group.currentMembers}/{group.totalMembers} members
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup;