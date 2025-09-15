import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
              DeFi Chit Fund
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/create-group"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/create-group')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create Group
            </Link>
            <Link
              to="/join-group"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/join-group')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Join Group
            </Link>
            <Link
              to="/auction"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/auction')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Auction
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/profile')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Profile
            </Link>
          </div>

          <button className="defi-button-primary">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;