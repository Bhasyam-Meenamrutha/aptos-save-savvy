import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float">
              <span className="gradient-hero bg-clip-text text-transparent">
                Trustless Group Savings
              </span>
              <br />
              <span className="text-foreground">on Aptos</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Eliminating fraud in chit funds with on-chain transparency, 
              automated payouts, and decentralized auctions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/create-group" className="defi-button-primary inline-flex items-center justify-center gap-2">
                Create Group
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/join-group" className="defi-button-secondary inline-flex items-center justify-center gap-2">
                Join Group
                <Users className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose DeFi Chit Fund?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of group savings with blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="defi-card text-center group hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-glow">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fraud-Proof</h3>
              <p className="text-muted-foreground">
                Smart contracts ensure transparent operations with no possibility of fund mismanagement or fraud.
              </p>
            </div>

            <div className="defi-card text-center group hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-glow">
                <Zap className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Automated Payouts</h3>
              <p className="text-muted-foreground">
                Winners receive instant payouts through smart contracts, eliminating delays and disputes.
              </p>
            </div>

            <div className="defi-card text-center group hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-glow">
                <Users className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fair Auctions</h3>
              <p className="text-muted-foreground">
                Transparent bidding process where the lowest bidder wins and discounts are shared fairly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust DeFi Chit Fund for their group savings needs.
          </p>
          <Link to="/dashboard" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;