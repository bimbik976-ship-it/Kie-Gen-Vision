import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ApiKeyModal } from './components/ApiKeyModal';
import { PromptGenerator } from './components/PromptGenerator';
import { SpaDecorationGenerator } from './components/SpaDecorationGenerator';
import { SeamlessLoopModal } from './components/SeamlessLoopModal';
import { KieKeyStatus, SeamlessLoopPromptResult, KieCreditInfo } from './types';
import { fetchKieStatus, saveKieKey, getStoredKieApiKey, requestSeamlessLoopPrompt } from './services/api';
import { Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'prompts' | 'spa'>('prompts');
  const [keyStatus, setKeyStatus] = useState<KieKeyStatus>({ connected: false });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const [creditInfo, setCreditInfo] = useState<KieCreditInfo>({
    balance: null,
    lastChecked: null,
  });


  // Seamless loop prompt modal state
  const [isLoopModalOpen, setIsLoopModalOpen] = useState<boolean>(false);
  const [loopImageUrl, setLoopImageUrl] = useState<string>('');
  const [loopPromptData, setLoopPromptData] = useState<SeamlessLoopPromptResult | null>(null);
  const [isLoopLoading, setIsLoopLoading] = useState<boolean>(false);

  // Initialize Kie.ai key status
  useEffect(() => {
    let cancelled = false;

    async function restoreKey() {
      const status = await fetchKieStatus();
      if (cancelled) return;

      // If the current server runtime already has the key, keep it.
      if (status.connected) {
        setKeyStatus(status);
        return;
      }

      // The server key is intentionally kept server-side during runtime, but
      // the browser also keeps a browser-local copy so
      // the app can restore the session after Chrome/app reloads or tab changes.
      const storedKey = getStoredKieApiKey();
      if (!storedKey) {
        setKeyStatus(status);
        return;
      }

      const restored = await saveKieKey(storedKey);
      if (cancelled) return;

      if (restored.success) {
        setKeyStatus({
          connected: true,
          maskedKey: restored.maskedKey || status.maskedKey,
          source: 'user',
        });
      } else {
        setKeyStatus({ connected: false });
      }
    }

    restoreKey();
    return () => {
      cancelled = true;
    };
  }, []);


  // Handler for Module 2 -> Seamless Loop Prompt
  const handleOpenSeamlessLoop = async (imageUrl: string, basePrompt: string) => {
    setLoopImageUrl(imageUrl);
    setIsLoopModalOpen(true);
    setIsLoopLoading(true);
    setLoopPromptData(null);

    try {
      const data = await requestSeamlessLoopPrompt(imageUrl, basePrompt);
      setLoopPromptData(data);
    } catch (err) {
      console.error('Seamless loop analysis error:', err);
    } finally {
      setIsLoopLoading(false);
    }
  };

  return (
    <div className="kg-app-shell min-h-screen font-sans antialiased">
      {/* Top Navigation & Global Kie.ai Key Management */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        keyStatus={keyStatus}
        creditInfo={creditInfo}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <main className="kg-main mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8">
        {activeTab === 'prompts' && (
          <PromptGenerator />
        )}


        {activeTab === 'spa' && (
          <SpaDecorationGenerator keyStatus={keyStatus} onOpenKeyModal={() => setIsKeyModalOpen(true)} />
        )}
      </main>

      {/* Footer architectural note */}
      <footer className="kg-footer mt-10 border-t py-5 sm:mt-16 sm:py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-stone-500 sm:flex-row sm:px-6">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-stone-800">Kie Studio</span>
            <span>•</span>
            <span>Modular Visual Generation Pipeline</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Shield className="h-3.5 w-3.5 text-stone-400" />
              <span>Kie.ai API Gateway Secured</span>
            </span>
            <span>•</span>
            <span>Zero Client-Side Secret Exposure</span>
          </div>
        </div>
      </footer>

      {/* Global Kie.ai API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        keyStatus={keyStatus}
        onKeyUpdated={(newStatus) => setKeyStatus(newStatus)}
        creditInfo={creditInfo}
        onCreditUpdated={(newCredit) => setCreditInfo(newCredit)}
      />

      {/* Seamless Loop Video Prompt Modal */}
      <SeamlessLoopModal
        isOpen={isLoopModalOpen}
        onClose={() => setIsLoopModalOpen(false)}
        imageUrl={loopImageUrl}
        loopData={loopPromptData}
        isLoading={isLoopLoading}
      />
    </div>
  );
}
