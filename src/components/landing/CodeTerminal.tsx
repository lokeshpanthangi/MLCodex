import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const CodeTerminal = () => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeText = `import numpy as np

class NeuralNetwork:
    def __init__(self, layers):
        self.weights = []
        for i in range(len(layers) - 1):
            w = np.random.randn(layers[i], layers[i+1])
            self.weights.append(w * 0.01)

    def forward(self, X):
        # Propagate through layers
        activation = X
        for w in self.weights:
            z = np.dot(activation, w)
            activation = self.relu(z)
        return activation`;

  // VS Code theme colors
  const c = theme === 'dark' ? {
    keyword: '#C586C0',
    class: '#4EC9B0',
    function: '#DCDCAA',
    variable: '#9CDCFE',
    number: '#B5CEA8',
    comment: '#6A9955',
    text: '#D4D4D4',
  } : {
    keyword: '#AF00DB',
    class: '#267F99',
    function: '#795E26',
    variable: '#001080',
    number: '#098658',
    comment: '#008000',
    text: '#000000',
  };

  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-muted-foreground font-mono">neural_network.py</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Area */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="py-4 pl-4 pr-3 text-right select-none border-r border-border/30">
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className="text-xs text-muted-foreground/40 font-mono h-6 flex items-center justify-end">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto flex-1">
          <pre className="font-mono text-sm leading-6">
            <code>
              <span style={{ color: c.keyword }}>import</span> <span style={{ color: c.variable }}>numpy</span> <span style={{ color: c.keyword }}>as</span> <span style={{ color: c.variable }}>np</span>{'\n'}
              {'\n'}
              <span style={{ color: c.keyword }}>class</span> <span style={{ color: c.class }}>NeuralNetwork</span><span style={{ color: c.text }}>:</span>{'\n'}
              {'    '}<span style={{ color: c.keyword }}>def</span> <span style={{ color: c.function }}>__init__</span><span style={{ color: c.text }}>(</span><span style={{ color: c.variable }}>self</span><span style={{ color: c.text }}>, layers):</span>{'\n'}
              {'        '}<span style={{ color: c.variable }}>self</span><span style={{ color: c.text }}>.weights = []</span>{'\n'}
              {'        '}<span style={{ color: c.keyword }}>for</span> <span style={{ color: c.variable }}>i</span> <span style={{ color: c.keyword }}>in</span> <span style={{ color: c.function }}>range</span><span style={{ color: c.text }}>(</span><span style={{ color: c.function }}>len</span><span style={{ color: c.text }}>(layers) - </span><span style={{ color: c.number }}>1</span><span style={{ color: c.text }}>):</span>{'\n'}
              {'            '}<span style={{ color: c.variable }}>w</span> <span style={{ color: c.text }}>= np.random.</span><span style={{ color: c.function }}>randn</span><span style={{ color: c.text }}>(layers[i], layers[i+</span><span style={{ color: c.number }}>1</span><span style={{ color: c.text }}>])</span>{'\n'}
              {'            '}<span style={{ color: c.variable }}>self</span><span style={{ color: c.text }}>.weights.</span><span style={{ color: c.function }}>append</span><span style={{ color: c.text }}>(w * </span><span style={{ color: c.number }}>0.01</span><span style={{ color: c.text }}>)</span>{'\n'}
              {'\n'}
              {'    '}<span style={{ color: c.keyword }}>def</span> <span style={{ color: c.function }}>forward</span><span style={{ color: c.text }}>(</span><span style={{ color: c.variable }}>self</span><span style={{ color: c.text }}>, X):</span>{'\n'}
              {'        '}<span style={{ color: c.comment }}># Propagate through layers</span>{'\n'}
              {'        '}<span style={{ color: c.variable }}>activation</span> <span style={{ color: c.text }}>= X</span>{'\n'}
              {'        '}<span style={{ color: c.keyword }}>for</span> <span style={{ color: c.variable }}>w</span> <span style={{ color: c.keyword }}>in</span> <span style={{ color: c.variable }}>self</span><span style={{ color: c.text }}>.weights:</span>{'\n'}
              {'            '}<span style={{ color: c.variable }}>z</span> <span style={{ color: c.text }}>= np.</span><span style={{ color: c.function }}>dot</span><span style={{ color: c.text }}>(activation, w)</span>{'\n'}
              {'            '}<span style={{ color: c.variable }}>activation</span> <span style={{ color: c.text }}>= </span><span style={{ color: c.variable }}>self</span><span style={{ color: c.text }}>.</span><span style={{ color: c.function }}>relu</span><span style={{ color: c.text }}>(z)</span>{'\n'}
              {'        '}<span style={{ color: c.keyword }}>return</span> <span style={{ color: c.variable }}>activation</span>{'\n'}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
