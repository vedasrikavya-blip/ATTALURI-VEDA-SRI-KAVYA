import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Activity, 
  DollarSign, 
  Box, 
  Briefcase, 
  Users,
  Zap,
  ShieldCheck,
  BrainCircuit,
  MessageSquare,
  ChevronRight,
  Loader2,
  Gavel,
  Sliders,
  Target,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
  Terminal,
  Rocket
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Background } from './components/Background';
import { Sidebar } from './components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

// Story-Driven Mock Data (INR)
const chartData = [
  { name: 'Apr', revenue: 1550000 },
  { name: 'May', revenue: 1820000 },
  { name: 'Jun', revenue: 1450000 },
  { name: 'Jul', revenue: 2100000 },
  { name: 'Aug', revenue: 1950000 },
  { name: 'Sep', revenue: 2500000 },
];

const agents = [
  { 
    id: 'finance', 
    name: 'Finance Voyager', 
    role: 'Capital Management', 
    status: 'Analyzing', 
    confidence: 98.2, 
    finding: 'Cash flow leak detected in vendor payments.', 
    prediction: 'Saving candidate: ₹12,40,000 via optimization.',
    action: 'Consolidate Vendor Accounts'
  },
  { 
    id: 'inventory', 
    name: 'Inventory Sentinel', 
    role: 'Supply Chain', 
    status: 'Critical Alert', 
    confidence: 99.5, 
    finding: 'Stockout predicted for SKU-882 in 14 days.', 
    prediction: 'Potential Revenue Loss: ₹50,00,000.',
    action: 'Execute Auto-PO #992'
  },
  { 
    id: 'sales', 
    name: 'Sales Oracle', 
    role: 'Revenue Growth', 
    status: 'Active', 
    confidence: 87.8, 
    finding: 'High churn risk in Tier-2 accounts.', 
    prediction: 'Proactive offer could retain ₹35,00,000 ARR.',
    action: 'Launch Retention Campaign'
  },
];

const financialData = [
  { month: 'Apr', income: 4500000, expenses: 3200000 },
  { month: 'May', income: 5200000, expenses: 3400000 },
  { month: 'Jun', income: 4800000, expenses: 3100000 },
  { month: 'Jul', income: 6100000, expenses: 4200000 },
  { month: 'Aug', income: 5900000, expenses: 3800000 },
  { month: 'Sep', income: 7500000, expenses: 4500000 },
];

const transactions = [
  { id: 'TX-9921', vendor: 'Amazon Web Services', date: 'Oct 12', amount: 145000, status: 'Completed', type: 'Technology' },
  { id: 'TX-9922', vendor: 'Reliance Energy', date: 'Oct 11', amount: 82000, status: 'Pending', type: 'Utilities' },
  { id: 'TX-9923', vendor: 'Tata Consultancy', date: 'Oct 10', amount: 450000, status: 'Flagged', type: 'Consulting' },
  { id: 'TX-9924', vendor: 'Blue Dart Logistics', date: 'Oct 09', amount: 12000, status: 'Completed', type: 'Logistics' },
];

const executiveAgents = [
  { role: 'CEO', persona: 'Visionary', focus: 'Brand', strategy: 'Prioritize dominance in the Deccan plateau. Hyderabad is the next logical nexus.', confidence: 95, icon: Rocket },
  { role: 'CFO', persona: 'Pragmatic', focus: 'Capital', strategy: 'Warning: Hyderabad setup requires ₹25,00,000 CAPEX. Liquidity remains stable but tight.', confidence: 82, icon: Shield },
  { role: 'COO', persona: 'Systemic', focus: 'Logistics', strategy: 'Last-mile infrastructure in Telangana is 22% more efficient than current Mumbai lanes.', confidence: 98, icon: Activity },
  { role: 'CHRO', persona: 'Human-Centric', focus: 'Talent', strategy: 'Local tech talent pool in HITEC City is saturated; lateral hiring costs are rising.', confidence: 85, icon: Users },
  { role: 'CMO', persona: 'Data-Driven', focus: 'Acquisition', strategy: 'Market fit confidence is 92%. Search volume for "Autonomous ERP" in Hyderabad is spiking.', confidence: 92, icon: Target },
];

const auditTrail = [
  { event: "Market Entry Mumbai", status: "Approved", confidence: 94, date: "2026-04-10" },
  { event: "Vendor Swap (SaaS)", status: "Denied", confidence: 72, date: "2026-03-22" },
  { event: "AI Core Expansion", status: "Approved", confidence: 98, date: "2026-03-01" },
];

const SCENARIO_DATABASE = {
  MARKET_EXPANSION: {
    id: 'MARKET_EXPANSION',
    title: 'Market Expansion',
    question: 'Should we launch operations in Mumbai/Delhi?',
    consensus: 'PROCEED WITH CAUTION',
    priority: 88,
    summary: 'Strategic vital for national scale, but requires significant capital mobilization of ₹45,00,000 for CAPEX.',
    directives: [
      'Allocate ₹45L for operational setup.',
      'Initiate city-lead recruitment.',
      'Secure regional logistics hubs.',
      'Deploy regional marketing blitz.'
    ],
    responses: {
      CEO: { strategy: 'National dominance in Mumbai is the next tactical milestone.', confidence: 95 },
      CFO: { strategy: 'Warning: Mumbai overhead requires ₹45 Lakh CAPEX. Risk tier-2 detected.', confidence: 60 },
      COO: { strategy: 'Delhi routes 15% more ready for immediate integration.', confidence: 70 },
      CHRO: { strategy: 'Lateral hiring for Delhi leads will take 45 days. Talent pool is competitive.', confidence: 85 },
      CMO: { strategy: 'Market fit confidence is 98%. Search volume in NCR is at an all-time high.', confidence: 98 }
    }
  },
  PRICING_STRATEGY: {
    id: 'PRICING_STRATEGY',
    title: 'Pricing Strategy',
    question: 'Should we increase service fees by 15% to improve margins?',
    consensus: 'HOLD FOR VALIDATION',
    priority: 64,
    summary: 'Revenue potential is high, but 18% margin increase must be balanced against customer churn.',
    directives: [
      'A/B test pricing on 10% of users.',
      'Develop loyalty-rebate programs.',
      'Prepare churn-prevention support.',
      'Review competitor price points.'
    ],
    responses: {
      CEO: { strategy: 'Focus on premium brand value supports a premium price point.', confidence: 80 },
      CFO: { strategy: '18% margin increase projected. Highly recommended for profit focus.', confidence: 100 },
      COO: { strategy: 'No impact on operational workflows. Neutral stance.', confidence: 90 },
      CHRO: { strategy: 'Internal staffing needs no change. Neutral stance.', confidence: 95 },
      CMO: { strategy: 'Warning: 12% churn risk detected in price-sensitive segments.', confidence: 45 }
    }
  },
  TECH_INVESTMENT: {
    id: 'TECH_INVESTMENT',
    title: 'Tech Investment',
    question: 'Should we allocate ₹50 Lakhs for AI infrastructure automation?',
    consensus: 'STRONG BUY (EXECUTE)',
    priority: 96,
    summary: 'Long-term operational efficiency will increase by 40%. Requires ₹60 Lakh initial cost.',
    directives: [
      'Provision H100 GPU cluster.',
      'Audit existing manual pipelines.',
      'Retrain staff for AI co-piloting.',
      'Measure end-to-end latency drop.'
    ],
    responses: {
      CEO: { strategy: 'AI infrastructure is the future of autonomous systems.', confidence: 100 },
      CFO: { strategy: '₹60 Lakh investment needed. ROI justified by efficiency gains.', confidence: 75 },
      COO: { strategy: 'Integration lag of 4 months expected during core migration.', confidence: 40 },
      CHRO: { strategy: 'Engineering team requires upskilling for the new stack.', confidence: 90 },
      CMO: { strategy: 'Enhanced platform speed will drop bounce rates by 18%.', confidence: 80 }
    }
  },
  CUSTOM: {
    id: 'CUSTOM',
    title: 'Custom AI Analysis',
    question: 'Processing Custom Strategic Request...',
    consensus: 'EVOLVING STRATEGY',
    priority: 75,
    summary: 'The AI board has synthesized an adaptive response to your specific query.',
    directives: [
      'Monitor market volatility indicators.',
      'Optimize liquidity for custom deployment.',
      'Review compliance frameworks.',
      'Execute pilot phase in isolated segment.'
    ],
    responses: {
      CEO: { strategy: 'This custom initiative aligns with our agile pivot strategy.', confidence: 88 },
      CFO: { strategy: 'Strategic reserve funds can accommodate this custom route.', confidence: 82 },
      COO: { strategy: 'Workflow capacity is currently hovering at 75%. Integration possible.', confidence: 78 },
      CHRO: { strategy: 'Personnel reallocation may be required for special projects.', confidence: 72 },
      CMO: { strategy: 'Sentiment analysis on this query route shows moderate promise.', confidence: 85 }
    }
  }
};

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [strategicQuestion, setStrategicQuestion] = useState('');
  const [demandShift, setDemandShift] = useState(15);
  const [capexSpend, setCapexSpend] = useState(4500000);
  const [hiringVelocity, setHiringVelocity] = useState(5);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [resolvedAgents, setResolvedAgents] = useState<string[]>([]);

  const simulateData = Array.from({ length: 6 }, (_, i) => ({
    name: `M${i+1}`,
    profit: (hiringVelocity * 200000) + (demandShift * 150000) - (capexSpend / 6) + (i * 200000)
  }));

  const handleApproveAction = (agentId: string, actionName: string) => {
    setLoadingAction(agentId);
    setTimeout(() => {
      setLoadingAction(null);
      setShowSuccess(actionName);
      setTimeout(() => setShowSuccess(null), 3000);
    }, 1500);
  };

  const initiateDebate = (scenarioId?: string) => {
    let id: string = 'CUSTOM';
    
    if (scenarioId) {
      id = scenarioId;
    } else {
      const q = strategicQuestion.toLowerCase();
      if (q.includes('mumbai') || q.includes('expansion') || q.includes('delhi')) id = 'MARKET_EXPANSION';
      else if (q.includes('pricing') || q.includes('fee') || q.includes('margin')) id = 'PRICING_STRATEGY';
      else if (q.includes('tech') || q.includes('ai') || q.includes('infra')) id = 'TECH_INVESTMENT';
    }
    
    setSelectedScenario(null);
    setIsAnalyzing(true);
    setResolvedAgents([]);
    if (scenarioId) setStrategicQuestion(SCENARIO_DATABASE[scenarioId as keyof typeof SCENARIO_DATABASE].question);

    // Simulate Agent-by-Agent Resolution (Staggered)
    const agents = ['CEO', 'CFO', 'COO', 'CHRO', 'CMO'];
    agents.forEach((agent, index) => {
      setTimeout(() => {
        setResolvedAgents(prev => [...prev, agent]);
      }, 500 + index * 400);
    });

    setTimeout(() => {
      setSelectedScenario(id);
      setIsAnalyzing(false);
      handleApproveAction('boardroom-gpt', 'Strategic Analysis Complete.');
    }, 2500);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const LandingPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
          <Zap size={14} className="animate-pulse" /> The Future of Operations is Here
        </div>
        <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter uppercase italic leading-[0.8]">
          Your AI Chief <br />
          <span className="text-indigo-400">Operating</span> Officer
        </h1>
        <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl font-medium leading-relaxed mt-10">
          OperateAI identifies leaks, predicts stockouts, and executes complex operational strategies with 99.5% autonomous accuracy. From Insight to Action.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-16">
          <Button 
            onClick={() => setActivePage('dashboard')}
            className="px-12 py-8 bg-indigo-600 hover:bg-indigo-500 text-lg font-black tracking-widest uppercase transition-all hover:scale-105 shadow-[0_0_50px_rgba(79,70,229,0.4)] border-none"
          >
            Start Interactive Demo <ArrowRight className="ml-3" />
          </Button>
          <Button 
            variant="outline"
            className="px-12 py-8 border-white/10 hover:bg-white/5 bg-transparent text-lg font-black tracking-widest uppercase"
          >
            Watch Video
          </Button>
        </div>
      </motion.div>

      {/* Hero Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 max-w-6xl mx-auto">
        {[
          { title: "Multi-Agent AI", desc: "Specialized agents for Finance, Inventory, and HR collaborating in real-time.", icon: Users },
          { title: "Health Score", desc: "Single metric visibility into your company's operational fitness and scalability.", icon: Activity },
          { title: "Auto-Execution", desc: "AI doesn't just suggest; it executes approved strategies automatically.", icon: ShieldCheck },
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-left group hover:border-indigo-500/30 transition-all"
          >
            <feature.icon className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold mb-2 uppercase italic">{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer Attribution for Landing */}
      <footer className="mt-40 opacity-30 text-[10px] tracking-[0.4em] uppercase flex flex-col items-center gap-3 pb-20">
        <p>OperateAI © 2026 / All Rights Reserved</p>
        <p className="font-bold text-indigo-400">Project Created By Veda Sri Kavya, CMR Institute of Technology</p>
      </footer>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-transparent text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
      <Background />
      {activePage !== 'landing' && <Sidebar activePage={activePage} onNavigate={setActivePage} />}

      <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activePage === 'landing' && <LandingPage key="landing" />}
          
          {activePage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 max-w-7xl mx-auto pt-10 px-4"
            >
              <div className="flex justify-between items-end bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase italic text-white/90">
                    Mission Control <span className="text-indigo-400">/ Dashboard</span>
                  </h2>
                  <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">Real-time Autonomous Operational Health</p>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Business Health Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-3xl font-black text-emerald-400 font-mono">85<span className="text-lg text-white/30">/100</span></span>
                      <Activity className="text-emerald-500 animate-pulse" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Annual Revenue', value: 25000000, sub: '+12.5% vs LY', icon: TrendingUp, color: 'emerald' },
                  { label: 'Net Profit', value: 4500000, sub: '₹8,20,000 saved by AI', icon: DollarSign, color: 'indigo' },
                  { label: 'Operating Costs', value: 12500000, sub: 'Optimized by 8%', icon: Zap, color: 'amber' },
                  { label: 'Pending Approvals', value: 14, sub: '3 High Priority', icon: AlertTriangle, color: 'red' },
                ].map((kpi, i) => (
                  <Card key={i} className="bg-black/40 border-white/10 backdrop-blur-md hover:border-white/20 transition-all group overflow-hidden relative">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-white/40">{kpi.label}</CardDescription>
                        <kpi.icon className={cn("opacity-50 group-hover:opacity-100 transition-opacity", 
                          kpi.color === 'emerald' ? "text-emerald-400" : 
                          kpi.color === 'indigo' ? "text-indigo-400" : 
                          kpi.color === 'amber' ? "text-amber-400" : "text-red-400"
                        )} size={16} />
                      </div>
                      <CardTitle className="text-xl font-bold font-mono">
                        {typeof kpi.value === 'number' ? formatCurrency(kpi.value).replace('₹', '₹ ') : kpi.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={cn("text-[10px] font-bold uppercase", 
                        kpi.color === 'emerald' ? "text-emerald-400/80" : 
                        kpi.color === 'indigo' ? "text-indigo-400/80" : 
                        kpi.color === 'amber' ? "text-amber-400/80" : "text-red-400/80"
                      )}>{kpi.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-black/40 border-white/10 backdrop-blur-md overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-widest text-white/60">Revenue Performance (INR)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/100000}L`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
                          formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-indigo-900/10 border-indigo-500/30 backdrop-blur-md relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-[shimmer_2s_infinite]" />
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="text-indigo-400" size={18} />
                      <CardTitle className="text-sm uppercase tracking-widest text-indigo-400 font-bold tracking-tighter">AI Chief Operating Officer</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1">
                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                       <div className="flex items-center gap-2 text-indigo-300">
                         <Zap size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-widest underline">Critical Insight</span>
                       </div>
                       <p className="text-sm font-medium leading-tight">
                         Stock levels for <span className="text-amber-400 font-bold">SKU-882</span> are depleting. 
                         AI expects a stockout in 14 days. 
                       </p>
                       <p className="text-[10px] text-white/40 italic font-mono pt-1">
                         Potential Revenue Loss: ₹50,00,000.
                       </p>
                       <Button size="sm" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black tracking-widest uppercase py-4 border-none">
                         Review Strategy <ArrowRight size={12} className="ml-2" />
                       </Button>
                    </div>

                    <ScrollArea className="h-40 pr-4">
                      <div className="space-y-4">
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Global Status Feed</p>
                        {[
                          "Logistics delay in Mumbai Port detected (Low risk)",
                          "Q3 Revenue trend exceeding projections by 6%",
                          "HR Node: High retention score (94%) detected.",
                          "Cloud Infrastructure: 99.99% Uptime sustained.",
                        ].map((text, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-white/60 italic border-l-2 border-white/5 pl-3">
                             <ChevronRight size={10} className="mt-1 flex-shrink-0 text-white/20" />
                             <span>{text}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activePage === 'boardroom' && (
            <motion.div
              key="boardroom"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 max-w-7xl mx-auto pt-10 px-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase italic text-white/90">
                    AI Boardroom <span className="text-indigo-400">/ Autonomous Nodes</span>
                  </h2>
                  <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">Cross-Agent Strategy Synchronizer</p>
                </div>
                <Badge variant="outline" className="text-indigo-400 border-indigo-400/30 px-3 py-1 font-mono tracking-widest text-[10px]">
                  ALL NODES CONNECTED
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="bg-black/60 border-white/10 backdrop-blur-xl group hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden">
                    <div className={cn(
                      "absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity",
                      agent.status === 'Critical Alert' ? "text-red-500" : "text-indigo-400"
                    )}>
                      {agent.status === 'Critical Alert' ? <AlertTriangle size={24} className="animate-pulse" /> : <MessageSquare size={24} />}
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center border",
                          agent.status === 'Critical Alert' ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-indigo-500/10 border-indigo-500/20 text-indigo-500"
                        )}>
                          <Users size={20} />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-black tracking-tight">{agent.name}</CardTitle>
                          <CardDescription className="text-[10px] uppercase font-bold text-white/30 tracking-widest">{agent.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Confidence Index</span>
                        <span className="text-sm font-black font-mono text-white/90">{agent.confidence}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 w-full rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${agent.confidence}%` }}
                          className={cn(
                            "h-full rounded-full",
                            agent.status === 'Critical Alert' ? "bg-red-500" : "bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                          )}
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 italic">
                          <p className="text-[9px] text-white/40 mb-1 font-mono uppercase tracking-widest">Context Finding</p>
                          <p className="text-xs font-medium leading-relaxed">{agent.finding}</p>
                        </div>
                        <div className="bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10 italic">
                          <p className="text-[9px] text-indigo-400/60 mb-1 font-mono uppercase tracking-widest">Strategic Prediction</p>
                          <p className="text-xs font-bold text-indigo-200 leading-relaxed">{agent.prediction}</p>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleApproveAction(agent.id, agent.action)}
                        disabled={loadingAction === agent.id}
                        className={cn(
                          "w-full mt-4 font-black tracking-[0.2em] uppercase text-[10px] py-6 shadow-lg border-none",
                          agent.status === 'Critical Alert' 
                            ? "bg-red-600 hover:bg-red-500 shadow-red-500/20" 
                            : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
                        )}
                      >
                        {loadingAction === agent.id ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={16} />
                            <span>PROCESSING BY AI...</span>
                          </div>
                        ) : (
                          <span>APPROVE & EXECUTE</span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === 'boardroom-gpt' && (
            <motion.div
              key="boardroom-gpt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 max-w-7xl mx-auto pt-10 px-4 pb-20"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
                    <Gavel className="text-indigo-500" size={32} /> BoardroomGPT<span className="text-indigo-400">Strategy Command</span>
                  </h2>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em] mt-1">Created by Veda Sri Kavya, CMRIT</p>
                </div>
                <div className="flex gap-3">
                   <div className="px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                     <div className={cn("w-2 h-2 rounded-full", isAnalyzing ? "bg-amber-400 animate-spin" : "bg-indigo-500 animate-pulse")} />
                     {isAnalyzing ? "ANALYTICAL DEBATE IN PROGRESS" : "Session: Executive Consensus"}
                   </div>
                </div>
              </div>
                          {/* Strategic Options / Quick Start */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[SCENARIO_DATABASE.MARKET_EXPANSION, SCENARIO_DATABASE.PRICING_STRATEGY, SCENARIO_DATABASE.TECH_INVESTMENT].map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    onClick={() => initiateDebate(scenario.id)}
                    className={cn(
                      "bg-white/5 border-white/10 backdrop-blur-xl cursor-pointer hover:border-indigo-500/50 transition-all group relative overflow-hidden",
                      selectedScenario === scenario.id && "border-indigo-500 ring-1 ring-indigo-500/50"
                    )}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                       <ArrowRight size={16} className="text-indigo-400" />
                    </div>
                    <CardHeader className="p-4">
                      <p className="text-[8px] uppercase font-black text-indigo-400 tracking-[0.2em] mb-1">Scenario Template</p>
                      <CardTitle className="text-sm font-black italic uppercase tracking-tight">{scenario.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-[10px] text-white/40 line-clamp-2 italic">"{scenario.question}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Strategic Input */}
              <Card className="bg-black/60 border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                <CardContent className="p-8 relative">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black text-indigo-400/60 tracking-[0.3em] flex items-center gap-2">
                      <Terminal size={14} /> Custom Strategic Query
                    </label>
                    <div className="relative">
                      <textarea 
                        value={strategicQuestion}
                        onChange={(e) => setStrategicQuestion(e.target.value)}
                        placeholder="Ask your Virtual Executive Team a strategic question... e.g., 'Should we expand to Mumbai?'"
                        className="w-full bg-black/40 border-2 border-white/10 rounded-2xl p-6 text-xl font-bold placeholder:text-white/10 focus:border-indigo-500/50 outline-none transition-all min-h-[120px] resize-none"
                      />
                      <div className="absolute bottom-4 right-4">
                         <Button 
                           onClick={() => initiateDebate()}
                           disabled={isAnalyzing}
                           className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs px-8 py-6 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:opacity-50"
                         >
                           {isAnalyzing ? <Loader2 className="animate-spin" /> : "Initiate Strategy Debate"}
                         </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isAnalyzing && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-indigo-500/20 rounded-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                      </div>
                      <div className="absolute inset-0 w-24 h-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-2xl font-black italic uppercase tracking-tighter animate-pulse text-indigo-400">Neural Consensus in Progress...</p>
                      <p className="text-[10px] uppercase font-bold text-white/40 tracking-[0.4em]">Synthesizing Executive Directives</p>
                    </div>
                  </motion.div>
                </div>
              )}

              {!isAnalyzing && selectedScenario && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-4 gap-8"
                >
                  {/* Decision Grid */}
                  <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {executiveAgents.map((agent, i) => {
                        const scenarioData = SCENARIO_DATABASE[selectedScenario as keyof typeof SCENARIO_DATABASE];
                        const agentData = scenarioData.responses[agent.role as keyof typeof scenarioData.responses];
                        const isResolved = resolvedAgents.includes(agent.role);
                        const currentStrategy = agentData.strategy;
                        const currentConfidence = agentData.confidence;

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Card className={cn(
                              "bg-black/40 border-white/10 backdrop-blur-md group hover:border-indigo-500/30 transition-all overflow-hidden relative h-full",
                            )}>
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <agent.icon size={48} className="text-white" />
                              </div>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-center mb-2">
                                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[8px] tracking-[0.2em]">{agent.role}</Badge>
                                  <div className="flex items-center gap-1">
                                    <CheckCircle size={10} className="text-emerald-400" />
                                    <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">RESOLVED</span>
                                  </div>
                                </div>
                                <CardTitle className="text-lg font-black italic uppercase tracking-tight">{agent.persona}</CardTitle>
                                <CardDescription className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-none">Focus: {agent.focus}</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <p className="text-sm font-medium leading-relaxed italic text-white/80 border-l-2 border-indigo-500/40 pl-3 min-h-[60px]">
                                  "{currentStrategy}"
                                </p>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center pt-2">
                                    <span className="text-[9px] uppercase font-bold text-white/30 tracking-widest">Confidence Score</span>
                                    <span className={cn("text-sm font-black font-mono", currentConfidence > 90 ? "text-emerald-400" : currentConfidence > 70 ? "text-indigo-400" : "text-amber-400")}>{currentConfidence}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${currentConfidence}%` }}
                                      className={cn("h-full shadow-[0_0_10px_rgba(99,102,241,0.5)]", currentConfidence > 90 ? "bg-emerald-500" : currentConfidence > 70 ? "bg-indigo-500" : "bg-amber-500")}
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Consensus Recommendation */}
                    <Card className="bg-indigo-600/10 border-indigo-500/30 backdrop-blur-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                      <CardHeader>
                        <CardTitle className="text-2xl font-black italic uppercase flex items-center gap-3">
                          <Target className="text-indigo-400" /> Final Recommendation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 text-indigo-400">
                         <div className="flex flex-col items-center justify-center p-6 border-r border-white/10">
                            <div className="relative w-40 h-40 flex items-center justify-center">
                              <svg className="w-full h-full -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * (SCENARIO_DATABASE[selectedScenario as keyof typeof SCENARIO_DATABASE].priority / 100))} className="text-indigo-500 shadow-[0_0_20px_#6366f1]" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <span className="text-5xl font-black font-mono italic">{SCENARIO_DATABASE[selectedScenario as keyof typeof SCENARIO_DATABASE].priority}</span>
                                 <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Priority Score</span>
                              </div>
                            </div>
                         </div>
                         <div className="md:col-span-2 space-y-6">
                           <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                              <h4 className="text-xl font-black italic uppercase text-emerald-400 mb-2">
                                {SCENARIO_DATABASE[selectedScenario as keyof typeof SCENARIO_DATABASE].consensus}
                              </h4>
                              <p className="text-sm text-white/60 leading-relaxed font-medium">
                                {SCENARIO_DATABASE[selectedScenario as keyof typeof SCENARIO_DATABASE].summary}
                              </p>
                           </div>
                           <div className="space-y-4">
                              <h3 className="text-xs uppercase font-black tracking-widest text-indigo-400">Actionable Directives (₹):</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white">
                                {SCENARIO_DATABASE[selectedScenario as keyof typeof SCENARIO_DATABASE].directives.map((action, i) => (
                                   <div key={i} className="flex gap-3 items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                     <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                                       {i+1}
                                     </div>
                                     <p className="text-xs font-bold">{action}</p>
                                   </div>
                                 ))}
                              </div>
                           </div>
                           <Button 
                             onClick={() => handleApproveAction('boardroom-gpt', `Strategic Directive Dispatched: ${SCENARIO_DATABASE[selectedScenario as keyof typeof SCENARIO_DATABASE].title}`)}
                             className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] py-8 text-sm shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] border-none"
                           >
                             Finalize Strategic Execution
                           </Button>
                         </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                      <CardHeader>
                        <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 italic">Strategy Context</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-xs text-white/60">
                        <p>Total Revenue Impact: <span className="text-indigo-400 font-bold">₹1.2Cr+</span></p>
                        <p>Capital Deployment: <span className="text-amber-400 font-bold">₹45L - ₹60L</span></p>
                        <p>Market Confidence: <span className="text-emerald-400 font-bold">High</span></p>
                      </CardContent>
                    </Card>
                    <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                      <p className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest text-center leading-relaxed font-bold">
                        "Strategy verified by Veda Sri Kavya, <br /> CMRIT Excellence Hub"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activePage === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 max-w-7xl mx-auto pt-10 px-4"
            >
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase italic text-white/90">
                  Financials <span className="text-indigo-400">/ Capital Flow</span>
                </h2>
                <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">Real-time Balance & Forecast</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-black/40 border-white/10 backdrop-blur-md">
                   <CardHeader>
                     <CardTitle className="text-sm uppercase tracking-widest text-white/50">Income vs Expenses (INR)</CardTitle>
                   </CardHeader>
                   <CardContent className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={financialData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="month" stroke="#ffffff30" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#ffffff30" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/100000}L`} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
                            formatter={(value: number) => [formatCurrency(value), 'Value']}
                          />
                          <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="expenses" fill="rgba(255, 255, 255, 0.1)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                   </CardContent>
                </Card>

                <Card className="bg-indigo-900/10 border-indigo-500/20 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-widest text-indigo-400">Cash Flow Forecast</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                      <p className="text-[10px] uppercase font-bold text-indigo-300/60 tracking-widest mb-1">Expected Q4 Balance</p>
                      <h4 className="text-2xl font-black font-mono">₹8,45,20,000</h4>
                      <p className="text-[11px] text-emerald-400 mt-2 font-bold uppercase tracking-tighter italic">↑ 18.2% Increase predicted</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Risk Analysis</p>
                      <div className="space-y-3">
                        {[
                          { label: 'Vendor Inflation', risk: 'Medium', color: 'text-amber-400' },
                          { label: 'Market Volatility', risk: 'Low', color: 'text-emerald-400' },
                          { label: 'Operational Leak', risk: 'Resolved', color: 'text-indigo-400' },
                        ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center text-xs">
                             <span className="text-white/60">{item.label}</span>
                             <span className={cn("font-bold uppercase tracking-widest text-[9px]", item.color)}>{item.risk}</span>
                           </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black/20 border-white/5 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-widest text-white/50">Recent Intelligence-Captured Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-white/30 uppercase font-bold tracking-widest">
                          <th className="py-4 px-2">ID</th>
                          <th className="py-4 px-2">Vendor/Entity</th>
                          <th className="py-4 px-2">Tag</th>
                          <th className="py-4 px-2">Date</th>
                          <th className="py-4 px-2">Amount</th>
                          <th className="py-4 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                            <td className="py-4 px-2 font-mono text-indigo-400">{tx.id}</td>
                            <td className="py-4 px-2 font-bold">{tx.vendor}</td>
                            <td className="py-4 px-2">
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest">{tx.type}</span>
                            </td>
                            <td className="py-4 px-2 text-white/50">{tx.date}</td>
                            <td className="py-4 px-2 font-mono font-bold">{formatCurrency(tx.amount)}</td>
                            <td className="py-4 px-2">
                               <Badge variant="outline" className={cn(
                                 "text-[9px] font-bold tracking-widest border-none",
                                 tx.status === 'Completed' ? "text-emerald-400 bg-emerald-500/10" :
                                 tx.status === 'Pending' ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10"
                               )}>
                                 {tx.status}
                               </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activePage === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-4xl mx-auto pt-10 px-4"
            >
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase italic text-white/90">
                  System Config <span className="text-indigo-400">/ Core Setup</span>
                </h2>
                <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">Autonomous ERP Configuration</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 italic">
                      <Briefcase className="text-indigo-400" size={18} /> Company Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-1">
                       <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">Legal Name</label>
                       <p className="text-sm font-bold bg-white/5 p-3 rounded-lg border border-white/5">OperateAI Global Systems Ltd.</p>
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">Primary Hub</label>
                       <p className="text-sm font-bold bg-white/5 p-3 rounded-lg border border-white/5">Bangalore, India</p>
                     </div>
                     <Button variant="outline" className="w-full mt-4 border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest font-bold text-[10px] py-6">
                       Update Entity Details
                     </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 italic">
                      <Users className="text-indigo-400" size={18} /> User Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {[
                       { name: 'Veda Sri Kavya', role: 'Super Admin', email: 'v.kavya@cmrit.edu' },
                       { name: 'AI Core', role: 'System Agent', email: 'autonomous@operate.ai' },
                       { name: 'Demo Judge', role: 'Viewer', email: 'judge@hackathon.com' },
                     ].map((user, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                          <div>
                            <p className="text-sm font-bold">{user.name}</p>
                            <p className="text-[10px] text-white/40">{user.email}</p>
                          </div>
                          <Badge variant="outline" className="text-[9px] border-indigo-500/30 text-indigo-400 uppercase tracking-widest">{user.role}</Badge>
                       </div>
                     ))}
                     <Button variant="ghost" className="w-full mt-2 text-indigo-400 hover:text-indigo-300 uppercase tracking-widest font-bold text-[10px]">
                       + Provision New Node
                     </Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 bg-indigo-900/10 border-indigo-500/20 backdrop-blur-md overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] -mr-10 -mt-10" />
                   <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 italic text-indigo-400">
                      <ShieldCheck size={18} /> API Key Management
                    </CardTitle>
                    <CardDescription className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Connected Neural Links</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
                       <span className="text-white/40">GEMINI_PRO_VISION_V1</span>
                       <div className="flex items-center gap-3">
                         <span className="text-emerald-400 font-bold italic">CONNECTED</span>
                         <span className="text-white/20">•••••••••••••••••</span>
                         <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 opacity-40 hover:opacity-100 border-white/10 uppercase">Rotate</Button>
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
                       <span className="text-white/40">STRIPE_LIVE_UPLINK</span>
                       <div className="flex items-center gap-3">
                         <span className="text-indigo-400 font-bold italic">ACTIVE</span>
                         <span className="text-white/20">•••••••••••••••••</span>
                         <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 opacity-40 hover:opacity-100 border-white/10 uppercase">Rotate</Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
              <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center gap-4 border-2 border-emerald-400/50 backdrop-blur-xl">
                 <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
                   <ShieldCheck size={24} />
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-80">Autonomous Action Executed</p>
                   <p className="text-sm font-bold tracking-tight">{showSuccess}</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent Branding (JUDGEWOW) */}
        <div className="mt-20 border-t border-white/5 pt-10 text-center pb-20 opacity-20 hover:opacity-100 transition-opacity">
           <p className="text-[10px] text-white/40 uppercase tracking-[0.6em] mb-3 font-black">
             Engineered by Machine-Mind Symmetry
           </p>
           <h3 className="text-5xl font-black text-white/10 italic pointer-events-none select-none tracking-tighter">
             OPERATE AI
           </h3>
           <p className="text-[8px] text-white/30 uppercase mt-4 tracking-widest font-mono">
             Proprietary Asset of CMRIT Hackathon Division / Veda Sri Kavya
           </p>
        </div>
      </main>
    </div>
  );
}
