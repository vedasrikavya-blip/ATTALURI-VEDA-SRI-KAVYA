import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Terminal, Shield, Zap, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const executiveItems = [
    { id: 'boardroom-gpt', label: 'BoardroomGPT', icon: MessageSquare },
  ];

  const operationalItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'boardroom', label: 'Agent Nodes', icon: Users },
    { id: 'reports', label: 'Financials', icon: FileText },
    { id: 'settings', label: 'System Config', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl relative">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 group cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Shield className="text-white" size={18} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase italic">
              Operate<span className="text-indigo-400">AI</span>
            </h2>
            <p className="text-[10px] text-white/40 font-mono">v.0.98.ALPHA</p>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-320px)] pr-2">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase font-black text-white/20 tracking-[0.2em] mb-3 px-4">Executive Suite</p>
              <nav className="space-y-1">
                {executiveItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
                      activePage === item.id 
                        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon size={18} className={cn(activePage === item.id ? "text-indigo-400" : "group-hover:text-white")} />
                    <span className="text-sm font-bold tracking-wide">{item.label}</span>
                    {activePage === item.id && (
                      <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_#6366f1]" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-[10px] uppercase font-black text-white/20 tracking-[0.2em] mb-3 px-4">Operations</p>
              <nav className="space-y-1">
                {operationalItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
                      activePage === item.id 
                        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon size={18} className={cn(activePage === item.id ? "text-indigo-400" : "group-hover:text-white")} />
                    <span className="text-sm font-medium tracking-wide">{item.label}</span>
                    {activePage === item.id && (
                      <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_#6366f1]" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="mt-auto p-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">System Health</span>
          </div>
          <div className="text-[11px] font-mono text-white/70 space-y-1">
            <div className="flex justify-between">
              <span>UPLINK</span>
              <span className="text-indigo-400">ENCRYPTED</span>
            </div>
            <div className="flex justify-between">
              <span>BUFFER</span>
              <span className="text-white/40">4 ms</span>
            </div>
          </div>
        </div>

        {/* ATTRIBUTION - REQUIRED FOR JUDGES */}
        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">
            Project Created By
          </p>
          <p className="text-xs font-bold text-indigo-300 mt-1">Veda Sri Kavya</p>
          <p className="text-[9px] text-white/40 mb-4">CMR Institute of Technology</p>
          <Button variant="ghost" size="sm" className="w-full text-white/40 hover:text-white text-[10px] border border-white/5">
            <LogOut size={12} className="mr-2" /> DISCONNECT
          </Button>
        </div>
      </div>
    </div>
  );
};
