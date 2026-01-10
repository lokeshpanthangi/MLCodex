import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card/80 to-secondary/50 border border-border/50 p-12 lg:p-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-white/[0.03] to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-white/[0.02] to-transparent rounded-full blur-3xl" />
            
            {/* Decorative grid */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
              <Zap className="w-4 h-4 text-foreground/70" />
              <span className="text-sm text-foreground/70">Free & Open Source</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Ready to Build AI{' '}
              <span className="gradient-text">from Scratch?</span>
            </h2>
            
            <p className="text-muted-foreground text-lg lg:text-xl mb-10 leading-relaxed max-w-2xl">
              Join thousands of developers who have mastered machine learning by understanding it deeply. 
              Start your journey today — it's completely free.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/curriculum">
                <Button variant="hero" size="lg" className="group h-14 px-8 text-base">
                  Explore Curriculum
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 hover:text-foreground">
                Read the Docs
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-4">Trusted by developers from</p>
              <div className="flex flex-wrap gap-8 items-center opacity-50">
                {['Google', 'Meta', 'OpenAI', 'Microsoft', 'Amazon'].map((company) => (
                  <span key={company} className="text-sm font-medium text-foreground/70">{company}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
