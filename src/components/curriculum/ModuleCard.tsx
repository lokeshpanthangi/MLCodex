import { ArrowRight, Clock, LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  codePreview: string[];
  estimatedTime?: string;
}

const ModuleCard = ({ icon: Icon, title, description, difficulty, codePreview, estimatedTime }: ModuleCardProps) => {
  const badgeStyles = {
    beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    advanced: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  }[difficulty];

  const badgeLabel = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }[difficulty];

  const gradientOverlay = {
    beginner: 'from-emerald-500/10 to-transparent',
    intermediate: 'from-amber-500/10 to-transparent',
    advanced: 'from-purple-500/10 to-transparent',
  }[difficulty];

  return (
    <div className="group relative rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden card-hover-glow flex flex-col cursor-pointer">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300">
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          </div>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${badgeStyles}`}>
            {badgeLabel}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Code Preview */}
        <div className="rounded-xl bg-[#0a0a0a] border border-foreground/5 p-4 mb-5 font-mono text-xs overflow-hidden">
          <div className="flex gap-3">
            {/* Line numbers */}
            <div className="text-muted-foreground/30 select-none text-right">
              {codePreview.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Code */}
            <div className="flex-1 overflow-hidden">
              {codePreview.map((line, i) => (
                <div key={i} className="truncate">
                  {line.includes('class') && (
                    <>
                      <span className="syntax-keyword">class</span>
                      <span className="syntax-class">{line.replace('class', '').replace(':', '')}</span>
                      <span className="text-foreground/80">:</span>
                    </>
                  )}
                  {line.includes('def') && (
                    <>
                      <span className="syntax-keyword">def</span>
                      <span className="syntax-function">{line.replace('def', '').replace(':', '')}</span>
                      <span className="text-foreground/80">:</span>
                    </>
                  )}
                  {line.includes('#') && (
                    <span className="syntax-comment">{line}</span>
                  )}
                  {!line.includes('class') && !line.includes('def') && !line.includes('#') && (
                    <span className="text-muted-foreground">{line}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          {estimatedTime && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{estimatedTime}</span>
            </div>
          )}
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors ml-auto font-medium">
            Start Module
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
};

export default ModuleCard;
