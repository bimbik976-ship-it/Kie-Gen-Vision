import React from 'react';
import { Key, Sparkles, Flower2, Coins, ShieldCheck } from 'lucide-react';
import { KieKeyStatus, KieCreditInfo } from '../types';

interface NavbarProps {
  activeTab: 'prompts' | 'spa';
  setActiveTab: (tab: 'prompts' | 'spa') => void;
  keyStatus: KieKeyStatus;
  creditInfo?: KieCreditInfo;
  onOpenKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, keyStatus, creditInfo, onOpenKeyModal }) => {
  const tabs = [
    { id: 'prompts' as const, label: 'Prompt Generator', short: 'Prompts', Icon: Sparkles },
    { id: 'spa' as const, label: 'Spa Decor Analyzer', short: 'Spa Decor', Icon: Flower2 },
  ];

  return (
    <header className="kg-navbar sticky top-0 z-40 w-full backdrop-blur-xl">
      <div className="kg-navbar-inner mx-auto max-w-7xl px-3 py-3 sm:px-6">
        <div className="kg-brand-row flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="kg-brand-mark flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="kg-brand-name font-bold tracking-tight">KieGen Creative Studio</span>
                <span className="kg-version rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">AI Studio</span>
              </div>
              <p className="kg-brand-subtitle text-[11px] sm:text-xs">AI-Powered Creative Workflow · Kie.ai</p>
            </div>
          </div>
          <div className="kg-key-compact flex shrink-0 items-center gap-2">
            {keyStatus.connected ? (
              <>
                <span className="kg-connected hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> API Connected</span>
                <button type="button" onClick={onOpenKeyModal} className="kg-key-button inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold"><Key className="h-3.5 w-3.5"/><span>API Key</span></button>
                <button type="button" onClick={onOpenKeyModal} className="kg-balance inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 text-[11px] font-semibold" title={creditInfo?.lastChecked ? `Last checked: ${creditInfo.lastChecked}` : 'Check Kie.ai balance'}><Coins className="h-3.5 w-3.5"/><span>{creditInfo?.balance ?? 'Balance'}</span></button>
              </>
            ) : (
              <button type="button" onClick={onOpenKeyModal} className="kg-key-button inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold"><Key className="h-3.5 w-3.5"/><span>Connect API</span></button>
            )}
          </div>
        </div>

        <nav aria-label="Main navigation" className="kg-tabs mt-3 grid grid-cols-2 gap-1 rounded-xl p-1">
          {tabs.map(({ id, label, short, Icon }) => (
            <button key={id} id={`nav-${id}`} type="button" aria-current={activeTab === id ? 'page' : undefined} onClick={() => setActiveTab(id)} className={`kg-tab flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-lg px-2 py-2 text-[11px] font-semibold transition sm:text-xs ${activeTab === id ? 'is-active' : ''}`}>
              <Icon className="h-4 w-4 shrink-0"/><span className="hidden sm:inline">{label}</span><span className="sm:hidden">{short}</span>
            </button>
          ))}
        </nav>
        {keyStatus.connected && <div className="kg-mobile-keyline mt-2 flex items-center justify-between gap-2 text-[10px] sm:hidden"><span className="inline-flex min-w-0 items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 shrink-0"/> <span className="truncate">{keyStatus.maskedKey || 'Kie.ai key connected'}</span></span><span className="kg-connected-label">Connected</span></div>}
      </div>
    </header>
  );
};
