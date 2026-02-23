import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CodeBlock, Callout, OutputBlock, InlineCode } from '@/components/project/CodeBlock';
import {
  ChevronRight,
  Clock,
  Users,
  Star,
  GitFork,
  ArrowLeft,
  Github,
  BookOpen,
  List,
  ExternalLink,
  CheckCircle2,
  Circle,
  Download,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'chatbot-first', title: 'Start With Chatbot' },
  { id: 'what-is-agent', title: 'What Is an Agent?' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'setup', title: 'Setup & Installation' },
  { id: 'env-setup', title: 'Environment Variables', parent: 'setup' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'tools', title: 'Define Tools', parent: 'implementation' },
  { id: 'agent', title: 'Build Agent', parent: 'implementation' },
  { id: 'run', title: 'Run the Agent', parent: 'implementation' },
  { id: 'complete-project', title: 'Complete Script' },
  { id: 'next-steps', title: 'Next Steps' },
];

const SmallAgent = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    const content = `
BUILD A SMALL AGENT WITH LANGCHAIN
==================================

A step-by-step guide to tool calling with LangChain + OpenAI.
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'small-agent-langchain.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => ({ id: section.id, element: document.getElementById(section.id) }))
        .filter((section) => section.element);

      for (const section of sectionElements.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const toggleProgress = (sectionId: string) => {
    setProgress((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <Navbar variant="simple" />

      <main className="pt-24 pb-20" ref={contentRef}>
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Build a Small Agent</span>
          </div>

          <div className="flex gap-8 lg:gap-12">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Gen AI Modules</span>
                </div>

                <nav className="space-y-1">
                  {[
                    { slug: 'basic-chatbot', title: 'Build a Basic Chatbot' },
                    { slug: 'basic-rag', title: 'Implement Basic RAG' },
                    { slug: 'small-agent', title: 'Build a Small Agent', active: true },
                    { slug: 'prompt-engineering', title: 'Prompt Engineering Patterns' },
                  ].map((doc) => (
                    <Link
                      key={doc.slug}
                      to={`/docs/${doc.slug}`}
                      className={`block py-1.5 text-sm transition-colors ${
                        doc.active
                          ? 'text-teal-500 font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {doc.title}
                    </Link>
                  ))}
                </nav>

                <Link
                  to="/docs"
                  className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all modules
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Your Progress</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {progress.length} / {sections.filter((s) => !s.parent).length} sections completed
                  </div>
                  <div className="w-full h-2 rounded-full bg-foreground/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                      style={{ width: `${(progress.length / sections.filter((s) => !s.parent).length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Quick Actions</div>
                  <div className="space-y-2">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1 disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      {isDownloading ? 'Downloading...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <article className="flex-1 min-w-0 max-w-4xl">
              <header className="mb-12">
                <div className="mb-6">
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Build a Small Agent</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Create a small tool-using AI agent with <InlineCode>LangChain</InlineCode> and
                    <InlineCode> langchain-openai</InlineCode>. You will define tools, wire an agent, and run
                    a simple task loop.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>3 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4" />
                    <span>1,140 stars</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4" />
                    <span>390 forks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>82 contributors</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-medium">
                    Intermediate
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-foreground/20 hover:bg-foreground/5"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isDownloading ? 'Downloading...' : 'Download PDF'}
                  </Button>
                </div>
              </header>

              <section id="overview" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('overview')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('overview') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Overview
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  An agent is an LLM that can decide when to call tools. This page shows a minimal, real agent
                  with two tools (math + web summary). You will keep code modular and readable.
                </p>
              </section>

              <section id="chatbot-first" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('chatbot-first')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('chatbot-first') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Start With Chatbot
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  If you have not built the chatbot yet, start with
                  <Link to="/docs/basic-chatbot" className="text-teal-400 hover:text-teal-300"> Build a Basic Chatbot</Link>.
                  It teaches prompts, memory, and streaming, which are foundational for agents.
                </p>
              </section>

              <section id="what-is-agent" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('what-is-agent')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('what-is-agent') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  What Is an Agent?
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  A basic agent loop is: read goal, decide an action, call a tool, observe the result, then decide
                  the next action. The LLM drives the decisions, and tools do the real work.
                </p>
              </section>

              <section id="prerequisites" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('prerequisites')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('prerequisites') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Prerequisites
                </h2>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Python 3.9+</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">OpenAI API key</strong></span>
                  </li>
                </ul>
              </section>

              <section id="setup" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('setup')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('setup') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Setup & Installation
                </h2>

                <CodeBlock
                  language="bash"
                  filename="terminal"
                  code={`mkdir small-agent && cd small-agent
python -m venv venv
source venv/bin/activate   # Windows: venv\\Scripts\\activate

pip install langchain langchain-openai python-dotenv`}
                  showLineNumbers={false}
                />

                <CodeBlock
                  filename="project_structure"
                  code={`small-agent/
├── .env
├── .gitignore
├── config.py
├── tools.py
├── agent.py
└── app.py`}
                  showLineNumbers={false}
                />

                <div id="env-setup" className="mt-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Environment Variables</h3>
                  <CodeBlock
                    filename=".env"
                    code={`OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
                    showLineNumbers={false}
                  />

                  <CodeBlock
                    filename="config.py"
                    code={`import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not set in .env")

MODEL_NAME = "gpt-4o-mini"`}
                  />
                </div>
              </section>

              <section id="implementation" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('implementation')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('implementation') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Implementation (Step by Step)
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  Each step is a real, runnable file. We combine them at the end into a single script.
                </p>

                <div id="tools" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 1 — Define Tools</h3>
                  <CodeBlock
                    filename="tools.py"
                    code={`from langchain_core.tools import tool

@tool
          def add_numbers(a: float, b: float) -> float:
            """Add two numbers."""
            return a + b

          @tool
          def summarize_text(text: str) -> str:
            """Return a short summary of the input text."""
            if not text.strip():
              return "No text provided."
            return text[:200] + ("..." if len(text) > 200 else "")`}
                  />

                  <Callout type="note">
                    Keep tools small and deterministic. Agents are best when tools do real, reliable work.
                  </Callout>
                </div>

                <div id="agent" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 2 — Build the Agent</h3>
                  <CodeBlock
                    filename="agent.py"
                    code={`from langchain_openai import ChatOpenAI
          from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
          from langchain.agents import create_tool_calling_agent, AgentExecutor
          from tools import add_numbers, summarize_text
          from config import MODEL_NAME

          def build_agent():
            llm = ChatOpenAI(model=MODEL_NAME, temperature=0)
            tools = [add_numbers, summarize_text]

            prompt = ChatPromptTemplate.from_messages([
              ("system", "You are a helpful agent. Use tools when needed."),
              ("human", "{input}"),
              MessagesPlaceholder(variable_name="agent_scratchpad"),
            ])

            agent = create_tool_calling_agent(llm, tools, prompt)
            return AgentExecutor(agent=agent, tools=tools, verbose=True)`}
                  />
                </div>

                <div id="run" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 3 — Run the Agent</h3>
                  <CodeBlock
                    filename="app.py"
                    code={`from agent import build_agent

executor = build_agent()

result = executor.invoke({
    "input": "Add 12.5 and 7.3, then summarize this: 'Agents call tools to do work.'"
})

print("\nFinal Answer:\n", result["output"])`}
                  />

                  <OutputBlock
                    title="Sample Output"
                    output={`Final Answer:
The sum is 19.8. Summary: Agents call tools to do work.`}
                  />
                </div>
              </section>

              <section id="complete-project" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('complete-project')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('complete-project') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Complete Script
                </h2>

                <CodeBlock
                  filename="small_agent.py"
                  code={`"""Small Agent with LangChain + OpenAI"""

        import os
        from dotenv import load_dotenv
        from langchain_core.tools import tool
        from langchain_openai import ChatOpenAI
        from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
        from langchain.agents import create_tool_calling_agent, AgentExecutor

        load_dotenv()
        if not os.getenv("OPENAI_API_KEY"):
          raise ValueError("OPENAI_API_KEY not set in .env")

        @tool
        def add_numbers(a: float, b: float) -> float:
          return a + b

        @tool
        def summarize_text(text: str) -> str:
          return text[:200] + ("..." if len(text) > 200 else "")

        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
        tools = [add_numbers, summarize_text]

        prompt = ChatPromptTemplate.from_messages([
          ("system", "You are a helpful agent. Use tools when needed."),
          ("human", "{input}"),
          MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])

        agent = create_tool_calling_agent(llm, tools, prompt)
        executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

        result = executor.invoke({
          "input": "Add 12.5 and 7.3, then summarize: 'Agents call tools to do work.'"
        })

        print("\nFinal Answer:\n", result["output"])`}
                />
              </section>

              <section id="next-steps" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('next-steps')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('next-steps') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Next Steps
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to="/docs/basic-rag"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Implement Basic RAG
                    </h3>
                    <p className="text-sm text-muted-foreground">Add retrieval to your tool-using agent</p>
                  </Link>

                  <Link
                    to="/docs/prompt-engineering"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Prompt Engineering Patterns
                    </h3>
                    <p className="text-sm text-muted-foreground">Improve reliability and structure outputs</p>
                  </Link>
                </div>
              </section>

              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Link to="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Docs
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Edit on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>

            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">On this page</span>
                </div>
                <nav className="space-y-1 mb-6">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left text-sm py-1.5 transition-colors ${
                        section.parent ? 'pl-4' : ''
                      } ${
                        activeSection === section.id
                          ? 'text-teal-500 font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SmallAgent;
