import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ModuleCard from '@/components/curriculum/ModuleCard';
import { 
  Binary, 
  Calculator, 
  TrendingUp, 
  Network, 
  Layers, 
  Eye, 
  MessageSquare, 
  Zap,
  GitBranch,
  Box,
  Cpu,
  BarChart3,
  BookOpen,
  Search,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

const modules = [
  {
    id: 1,
    icon: Calculator,
    title: 'Linear Algebra Essentials',
    description: 'Master vectors, matrices, and transformations that form the backbone of ML computations.',
    difficulty: 'beginner' as const,
    codePreview: ['class Matrix:', 'def dot_product(self, other):', '    # Compute matrix multiplication'],
    estimatedTime: '3 hours',
    section: 'foundations',
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Linear Regression',
    description: 'Build your first ML model from scratch. Understand gradient descent and optimization.',
    difficulty: 'beginner' as const,
    codePreview: ['class LinearRegression:', 'def fit(self, X, y):', '    # Minimize loss function'],
    estimatedTime: '2 hours',
    section: 'foundations',
  },
  {
    id: 3,
    icon: Binary,
    title: 'Logistic Regression',
    description: 'Learn classification with the sigmoid function and cross-entropy loss.',
    difficulty: 'beginner' as const,
    codePreview: ['class LogisticRegression:', 'def sigmoid(self, z):', '    # Apply activation'],
    estimatedTime: '2.5 hours',
    section: 'foundations',
  },
  {
    id: 4,
    icon: Network,
    title: 'Neural Networks',
    description: 'Build a multi-layer perceptron from scratch using NumPy matrices.',
    difficulty: 'intermediate' as const,
    codePreview: ['class NeuralNetwork:', 'def forward(self, X):', '    # Propagate through layers'],
    estimatedTime: '4 hours',
    section: 'neural-networks',
  },
  {
    id: 5,
    icon: Layers,
    title: 'Backpropagation',
    description: 'Implement the chain rule to compute gradients through your network.',
    difficulty: 'intermediate' as const,
    codePreview: ['class BackProp:', 'def backward(self, loss):', '    # Chain rule magic'],
    estimatedTime: '3.5 hours',
    section: 'neural-networks',
  },
  {
    id: 6,
    icon: Zap,
    title: 'Activation Functions',
    description: 'ReLU, Sigmoid, Tanh, and more. Understand when and why to use each.',
    difficulty: 'intermediate' as const,
    codePreview: ['class Activations:', 'def relu(self, x):', '    # Max(0, x)'],
    estimatedTime: '1.5 hours',
    section: 'neural-networks',
  },
  {
    id: 7,
    icon: Eye,
    title: 'Convolutional Networks',
    description: 'Build CNNs for image recognition. Learn convolutions, pooling, and feature maps.',
    difficulty: 'advanced' as const,
    codePreview: ['class Conv2D:', 'def convolve(self, input, kernel):', '    # Slide kernel over input'],
    estimatedTime: '5 hours',
    section: 'deep-learning',
  },
  {
    id: 8,
    icon: MessageSquare,
    title: 'Recurrent Networks',
    description: 'Sequence modeling with RNNs and LSTMs. Capture temporal dependencies.',
    difficulty: 'advanced' as const,
    codePreview: ['class LSTM:', 'def step(self, x, h_prev, c_prev):', '    # Update cell state'],
    estimatedTime: '4 hours',
    section: 'deep-learning',
  },
  {
    id: 9,
    icon: GitBranch,
    title: 'Attention Mechanism',
    description: 'The foundation of transformers. Learn self-attention and multi-head attention.',
    difficulty: 'advanced' as const,
    codePreview: ['class Attention:', 'def scaled_dot_product(self, Q, K, V):', '    # Compute attention scores'],
    estimatedTime: '4 hours',
    section: 'advanced',
  },
  {
    id: 10,
    icon: Box,
    title: 'Transformers',
    description: 'Build the architecture that powers modern LLMs from the ground up.',
    difficulty: 'advanced' as const,
    codePreview: ['class Transformer:', 'def encode(self, src):', '    # Multi-head self-attention'],
    estimatedTime: '6 hours',
    section: 'advanced',
  },
  {
    id: 11,
    icon: Cpu,
    title: 'GPU Optimization',
    description: 'Learn to optimize your implementations for modern hardware acceleration.',
    difficulty: 'advanced' as const,
    codePreview: ['class CUDAKernel:', 'def parallel_matmul(self, A, B):', '    # Tiled matrix multiply'],
    estimatedTime: '4 hours',
    section: 'advanced',
  },
  {
    id: 12,
    icon: BarChart3,
    title: 'Model Deployment',
    description: 'Take your models to production with proper serving infrastructure.',
    difficulty: 'intermediate' as const,
    codePreview: ['class ModelServer:', 'def predict(self, request):', '    # Batch inference'],
    estimatedTime: '3 hours',
    section: 'projects',
  },
];

const Curriculum = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Read search query from URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Update URL when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredModules = useMemo(() => {
    let result = modules;
    
    // Filter by section
    if (activeSection !== 'all') {
      result = result.filter(m => m.section === activeSection);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeSection, searchQuery]);

  const sections = [
    { id: 'all', label: 'All' },
    { id: 'foundations', label: 'Foundations' },
    { id: 'neural-networks', label: 'Neural Networks' },
    { id: 'deep-learning', label: 'Deep Learning' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      <Navbar />
      
      {/* Main Content - Full Width */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12 relative">
            {/* Background glow */}
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-muted-foreground">{modules.length} modules available</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
                ML Curriculum
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Master machine learning by building every algorithm from scratch. 
                No frameworks, just pure understanding.
              </p>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search modules..."
                className="w-full pl-12 pr-4 py-3 text-base rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/20 transition-all"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-xl bg-foreground/5 border border-foreground/10 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-5 py-2.5 rounded-full text-sm whitespace-nowrap font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              {searchQuery ? (
                <>Found <span className="text-foreground font-medium">{filteredModules.length}</span> results for "{searchQuery}"</>
              ) : (
                <>Showing <span className="text-foreground font-medium">{filteredModules.length}</span> modules</>
              )}
            </p>
          </div>

          {/* Modules Grid */}
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                icon={module.icon}
                title={module.title}
                description={module.description}
                difficulty={module.difficulty}
                codePreview={module.codePreview}
                estimatedTime={module.estimatedTime}
                viewMode={viewMode}
              />
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium mb-2">No modules found</p>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? `No results for "${searchQuery}"` : 'No modules in this section.'}
              </p>
              <button 
                onClick={() => { setActiveSection('all'); setSearchQuery(''); }}
                className="text-sm text-foreground hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="mt-20">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Curriculum;
