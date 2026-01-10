import { Link, useLocation } from 'react-router-dom';
import { Brain, Search, Github, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/curriculum', label: 'Curriculum' },
    { path: '#', label: 'Projects' },
    { path: '#', label: 'Community' },
  ];

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/15 transition-colors">
                <Brain className="w-5 h-5 text-foreground" />
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-foreground">MLEdu</span>
              <span className="text-muted-foreground font-normal">Docs</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover-underline ${
                  location.pathname === link.path
                    ? 'text-foreground bg-foreground/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-colors cursor-pointer group">
              <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground">Search docs...</span>
              <kbd className="ml-6 px-2 py-0.5 text-xs rounded-md bg-background text-muted-foreground border border-border">
                ⌘K
              </kbd>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>

            <Button variant="hero" size="sm" className="hidden sm:flex">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm rounded-lg transition-all ${
                    location.pathname === link.path
                      ? 'text-foreground bg-foreground/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
