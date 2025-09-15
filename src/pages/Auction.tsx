import { useState, useEffect } from "react";
import { Clock, Gavel, Trophy, TrendingDown } from "lucide-react";
import { AuctionBid, ChitGroup } from "../types";

const Auction = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("1");
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60); // 24 hours in seconds
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [userAddress] = useState("0x123...abc");

  // Mock groups data
  const groups: Record<string, ChitGroup> = {
    "1": {
      id: "1",
      name: "Tech Professionals Savings",
      contributionAmount: 10000,
      totalMembers: 10,
      currentMembers: 8,
      duration: 12,
      currentCycle: 3,
      status: "active",
      createdBy: "0x123...abc",
      members: ["0x123...abc", "0x456...def", "0x789...ghi", "0xabc...123", "0xdef...456"]
    }
  };

  useEffect(() => {
    // Initialize mock bids
    const mockBids: AuctionBid[] = [
      {
        member: "0x456...def",
        bidAmount: 9500,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        member: "0x789...ghi",
        bidAmount: 9200,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        member: "0xabc...123",
        bidAmount: 9800,
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      }
    ];
    setBids(mockBids);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePlaceBid = async () => {
    const amount = Number(bidAmount);
    const group = groups[selectedGroup];
    
    if (!amount || amount <= 0) {
      alert("Please enter a valid bid amount");
      return;
    }

    if (amount >= group.contributionAmount) {
      alert(`Bid must be less than ${formatCurrency(group.contributionAmount)}`);
      return;
    }

    const existingBid = bids.find(bid => bid.member === userAddress);
    if (existingBid) {
      alert("You have already placed a bid in this auction");
      return;
    }

    setIsPlacingBid(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newBid: AuctionBid = {
      member: userAddress,
      bidAmount: amount,
      timestamp: new Date()
    };

    setBids(prev => [...prev, newBid].sort((a, b) => a.bidAmount - b.bidAmount));
    setBidAmount("");
    setIsPlacingBid(false);
  };

  const lowestBid = bids.length > 0 ? Math.min(...bids.map(b => b.bidAmount)) : null;
  const winner = bids.find(bid => bid.bidAmount === lowestBid);
  const group = groups[selectedGroup];
  const discount = lowestBid ? group.contributionAmount - lowestBid : 0;
  const discountPerMember = discount / (group.currentMembers - 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Current Auction</h1>
          <p className="text-muted-foreground">Place your bid to win this cycle's payout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Auction Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Group Selection */}
            <div className="defi-card">
              <h2 className="text-xl font-semibold mb-4">Active Group</h2>
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Cycle {group.currentCycle} of {group.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{formatCurrency(group.contributionAmount)}</p>
                  <p className="text-sm text-muted-foreground">Total Pool</p>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="defi-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-accent" />
                  <div>
                    <h3 className="font-semibold">Time Remaining</h3>
                    <p className="text-sm text-muted-foreground">Auction ends automatically</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-accent">
                    {formatTime(timeRemaining)}
                  </div>
                  <p className="text-sm text-muted-foreground">HH:MM:SS</p>
                </div>
              </div>
            </div>

            {/* Current Bids */}
            <div className="defi-card">
              <h2 className="text-xl font-semibold mb-4">Current Bids</h2>
              
              {bids.length === 0 ? (
                <div className="text-center py-8">
                  <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bids placed yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to bid!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bids.map((bid, index) => (
                    <div
                      key={`${bid.member}-${bid.timestamp.getTime()}`}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        bid.bidAmount === lowestBid
                          ? 'bg-success/10 border border-success/20'
                          : 'bg-muted/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {bid.bidAmount === lowestBid && (
                          <Trophy className="h-5 w-5 text-success" />
                        )}
                        <div>
                          <p className="font-medium">
                            {bid.member === userAddress ? "You" : bid.member}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {bid.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{formatCurrency(bid.bidAmount)}</p>
                        {bid.bidAmount === lowestBid && (
                          <p className="text-sm text-success">Current Winner</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bid Placement */}
          <div className="space-y-6">
            {/* Place Bid */}
            <div className="defi-card">
              <h2 className="text-xl font-semibold mb-4">Place Your Bid</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bid Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter amount"
                    max={group.contributionAmount - 1}
                    className="defi-input w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be less than {formatCurrency(group.contributionAmount)}
                  </p>
                </div>

                <button
                  onClick={handlePlaceBid}
                  disabled={isPlacingBid || !bidAmount || Number(bidAmount) >= group.contributionAmount}
                  className={`defi-button-primary w-full ${
                    isPlacingBid || !bidAmount || Number(bidAmount) >= group.contributionAmount
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {isPlacingBid ? "Placing Bid..." : "Place Bid"}
                </button>
              </div>
            </div>

            {/* Current Stats */}
            <div className="defi-card">
              <h3 className="font-semibold mb-4">Auction Stats</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bids</span>
                  <span className="font-medium">{bids.length}</span>
                </div>
                
                {lowestBid && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lowest Bid</span>
                      <span className="font-medium text-success">{formatCurrency(lowestBid)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Discount</span>
                      <span className="font-medium text-accent">{formatCurrency(discount)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount per Member</span>
                      <span className="font-medium text-accent">{formatCurrency(discountPerMember)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* How It Works */}
            <div className="defi-card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                How Bidding Works
              </h3>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">1</span>
                  <p>Lowest bidder wins the full pool amount</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">2</span>
                  <p>Winner pays their bid amount to the contract</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">3</span>
                  <p>Discount is shared equally among other members</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">4</span>
                  <p>Process repeats each cycle until everyone wins once</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;