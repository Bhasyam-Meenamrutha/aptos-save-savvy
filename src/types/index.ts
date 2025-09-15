export interface ChitGroup {
  id: string;
  name: string;
  contributionAmount: number;
  totalMembers: number;
  currentMembers: number;
  duration: number; // in months
  currentCycle: number;
  status: 'active' | 'completed' | 'pending';
  createdBy: string;
  members: string[];
  nextPayoutDate?: Date;
}

export interface AuctionBid {
  member: string;
  bidAmount: number;
  timestamp: Date;
}

export interface Auction {
  groupId: string;
  cycle: number;
  bids: AuctionBid[];
  isActive: boolean;
  winner?: string;
  winningBid?: number;
  endTime: Date;
}

export interface UserProfile {
  address: string;
  totalGroups: number;
  totalContributions: number;
  totalEarnings: number;
  participationHistory: {
    groupId: string;
    groupName: string;
    status: string;
    joinedDate: Date;
  }[];
}