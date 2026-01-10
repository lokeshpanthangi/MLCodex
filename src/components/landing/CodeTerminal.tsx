import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CodeTerminal = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-window shadow-2xl animate-float relative group">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-muted-foreground/60 font-mono">neural_network.py</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-foreground/10 transition-colors text-muted-foreground/60 hover:text-foreground"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Line Numbers + Code */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="py-6 pl-4 pr-2 text-right select-none border-r border-border/20">
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className="text-xs text-muted-foreground/30 font-mono leading-relaxed h-[1.625rem]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto flex-1">
          <div className="space-y-0">
            <div className="h-[1.625rem] flex items-center">
              <span className="syntax-keyword">import</span>
              <span className="text-foreground"> numpy </span>
              <span className="syntax-keyword">as</span>
              <span className="text-foreground"> np</span>
            </div>
            <div className="h-[1.625rem]" />
            <div className="h-[1.625rem] flex items-center">
              <span className="syntax-keyword">class</span>
              <span className="syntax-class"> NeuralNetwork</span>
              <span className="text-foreground">:</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-4">
              <span className="syntax-keyword">def</span>
              <span className="syntax-function"> __init__</span>
              <span className="text-foreground">(</span>
              <span className="syntax-variable">self</span>
              <span className="text-foreground">, layers):</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-8">
              <span className="syntax-variable">self</span>
              <span className="text-foreground">.weights = []</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-8">
              <span className="syntax-keyword">for</span>
              <span className="text-foreground"> i </span>
              <span className="syntax-keyword">in</span>
              <span className="syntax-function"> range</span>
              <span className="text-foreground">(</span>
              <span className="syntax-function">len</span>
              <span className="text-foreground">(layers) - </span>
              <span className="syntax-number">1</span>
              <span className="text-foreground">):</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-12">
              <span className="text-foreground">w = np.random.</span>
              <span className="syntax-function">randn</span>
              <span className="text-foreground">(layers[i], layers[i+</span>
              <span className="syntax-number">1</span>
              <span className="text-foreground">])</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-12">
              <span className="syntax-variable">self</span>
              <span className="text-foreground">.weights.</span>
              <span className="syntax-function">append</span>
              <span className="text-foreground">(w * </span>
              <span className="syntax-number">0.01</span>
              <span className="text-foreground">)</span>
            </div>
            <div className="h-[1.625rem]" />
            <div className="h-[1.625rem] flex items-center pl-4">
              <span className="syntax-keyword">def</span>
              <span className="syntax-function"> forward</span>
              <span className="text-foreground">(</span>
              <span className="syntax-variable">self</span>
              <span className="text-foreground">, X):</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-8">
              <span className="syntax-comment"># Propagate through layers</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-8">
              <span className="text-foreground">activation = X</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-8">
              <span className="syntax-keyword">for</span>
              <span className="text-foreground"> w </span>
              <span className="syntax-keyword">in</span>
              <span className="syntax-variable"> self</span>
              <span className="text-foreground">.weights:</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-12">
              <span className="text-foreground">z = np.</span>
              <span className="syntax-function">dot</span>
              <span className="text-foreground">(activation, w)</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-12">
              <span className="text-foreground">activation = </span>
              <span className="syntax-variable">self</span>
              <span className="text-foreground">.</span>
              <span className="syntax-function">relu</span>
              <span className="text-foreground">(z)</span>
            </div>
            <div className="h-[1.625rem] flex items-center pl-8">
              <span className="syntax-keyword">return</span>
              <span className="text-foreground"> activation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl" />
    </div>
  );
};

export default CodeTerminal;
