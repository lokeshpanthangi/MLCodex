import { Code2, Brain, Layers, Database, Cpu, GitBranch, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Pure Python & NumPy',
    description: 'No high-level frameworks hiding the magic. Build everything using fundamental building blocks.',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Brain,
    title: 'Mathematical Foundations',
    description: 'Deep dive into the linear algebra, calculus, and probability that power modern AI.',
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    icon: Layers,
    title: 'Layer by Layer',
    description: 'Understand each component: activation functions, loss landscapes, gradient descent.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Database,
    title: 'Real Datasets',
    description: 'Practice with actual data. From MNIST to custom datasets for hands-on experience.',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    icon: Cpu,
    title: 'GPU Optimization',
    description: 'Learn to optimize your implementations for modern hardware acceleration.',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: GitBranch,
    title: 'Production Ready',
    description: 'Best practices for deploying ML models in real-world applications.',
    gradient: 'from-teal-500/20 to-cyan-500/20',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Why Choose Us</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Learn ML the <span className="gradient-text">Right Way</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our curriculum is designed by ML engineers who believe understanding trumps abstraction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm card-hover-glow cursor-pointer"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-flex">
                  <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground transition-colors">
                      {feature.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
