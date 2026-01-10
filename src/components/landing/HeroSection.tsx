import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeTerminal from './CodeTerminal';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-white/[0.03] to-transparent blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-white/[0.02] to-transparent blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-white/[0.02] to-transparent blur-3xl animate-blob animation-delay-4000" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-foreground/70" />
              <span className="text-sm text-foreground/70">v2.0 Released — Now with Transformers</span>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Build Machine Learning.{' '}
                <span className="gradient-text">
                  From the Metal Up.
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Master the math and algorithms behind AI. No black boxes, just pure Python and NumPy. 
                Learn by building real implementations from scratch.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link to="/curriculum">
                <Button variant="hero" size="lg" className="group h-14 px-8 text-base">
                  Start Learning
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="glass" size="lg" className="h-14 px-8 text-base">
                View on GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-6">
              {[
                { value: '50+', label: 'Modules' },
                { value: '10K+', label: 'Learners' },
                { value: '100%', label: 'From Scratch' },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <div className="text-3xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Code Terminal */}
          <div className="lg:pl-8 relative">
            {/* Glow behind terminal */}
            <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-transparent to-white/5 blur-3xl opacity-50" />
            <CodeTerminal />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
