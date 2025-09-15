import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, DollarSign, Calendar, FileText } from "lucide-react";
import { ChitGroup } from "../types";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contributionAmount: "",
    totalMembers: "",
    duration: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Group name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Group name must be at least 3 characters";
    }
    
    if (!formData.contributionAmount) {
      newErrors.contributionAmount = "Contribution amount is required";
    } else if (Number(formData.contributionAmount) <= 0) {
      newErrors.contributionAmount = "Contribution amount must be greater than 0";
    }
    
    if (!formData.totalMembers) {
      newErrors.totalMembers = "Number of members is required";
    } else if (Number(formData.totalMembers) < 3) {
      newErrors.totalMembers = "Minimum 3 members required";
    } else if (Number(formData.totalMembers) > 50) {
      newErrors.totalMembers = "Maximum 50 members allowed";
    }
    
    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    } else if (Number(formData.duration) < 3) {
      newErrors.duration = "Minimum duration is 3 months";
    } else if (Number(formData.duration) > 60) {
      newErrors.duration = "Maximum duration is 60 months";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newGroup: ChitGroup = {
      id: Date.now().toString(),
      name: formData.name,
      contributionAmount: Number(formData.contributionAmount),
      totalMembers: Number(formData.totalMembers),
      currentMembers: 1, // Creator is the first member
      duration: Number(formData.duration),
      currentCycle: 0,
      status: "pending",
      createdBy: "0x123...abc", // Mock wallet address
      members: ["0x123...abc"],
    };
    
    // In a real app, this would be saved to state management or API
    console.log("Created group:", newGroup);
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const formatCurrency = (amount: string) => {
    if (!amount) return "";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Number(amount));
  };

  const totalFundSize = formData.contributionAmount && formData.totalMembers 
    ? Number(formData.contributionAmount) * Number(formData.totalMembers)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Chit Fund Group</h1>
          <p className="text-muted-foreground">Set up a new trustless savings group on Aptos</p>
        </div>

        <div className="defi-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FileText className="h-4 w-4" />
                Group Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Tech Professionals Savings"
                className={`defi-input w-full ${errors.name ? 'border-destructive' : ''}`}
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Contribution Amount */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <DollarSign className="h-4 w-4" />
                Monthly Contribution Amount (USD)
              </label>
              <input
                type="number"
                name="contributionAmount"
                value={formData.contributionAmount}
                onChange={handleInputChange}
                placeholder="1000"
                min="1"
                className={`defi-input w-full ${errors.contributionAmount ? 'border-destructive' : ''}`}
              />
              {errors.contributionAmount && <p className="text-destructive text-sm mt-1">{errors.contributionAmount}</p>}
            </div>

            {/* Number of Members */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Users className="h-4 w-4" />
                Total Number of Members
              </label>
              <input
                type="number"
                name="totalMembers"
                value={formData.totalMembers}
                onChange={handleInputChange}
                placeholder="10"
                min="3"
                max="50"
                className={`defi-input w-full ${errors.totalMembers ? 'border-destructive' : ''}`}
              />
              {errors.totalMembers && <p className="text-destructive text-sm mt-1">{errors.totalMembers}</p>}
              <p className="text-xs text-muted-foreground mt-1">Between 3 and 50 members</p>
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="h-4 w-4" />
                Duration (Months)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="12"
                min="3"
                max="60"
                className={`defi-input w-full ${errors.duration ? 'border-destructive' : ''}`}
              />
              {errors.duration && <p className="text-destructive text-sm mt-1">{errors.duration}</p>}
              <p className="text-xs text-muted-foreground mt-1">Between 3 and 60 months</p>
            </div>

            {/* Summary */}
            {totalFundSize > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-primary">Group Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Contribution:</span>
                    <span className="font-medium">{formatCurrency(formData.contributionAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Fund Size:</span>
                    <span className="font-medium">{formatCurrency(totalFundSize.toString())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{formData.duration} months</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`defi-button-primary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? "Creating Group..." : "Create Group"}
            </button>
          </form>
        </div>

        {/* How it works */}
        <div className="mt-8 defi-card">
          <h3 className="font-semibold mb-4">How It Works</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</span>
              <p>Create your group with specified contribution amount and member limit</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">2</span>
              <p>Share the group ID for others to join</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">3</span>
              <p>Once full, monthly auctions begin automatically</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">4</span>
              <p>Lowest bidder wins the pot, discount shared among all members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;