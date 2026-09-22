'use client';

import { useEditor } from '@/features/editor/hooks/useEditor';
import { EditorCanvas } from '@/features/editor/components/EditorCanvas';
import { EditorToolbar } from '@/features/editor/components/EditorToolbar';
import { EditorSidebar } from '@/features/editor/components/EditorSidebar';
import { StudioGuide } from '@/features/editor/components/StudioGuide';
import { ExportPanel } from '@/features/editor/components/ExportPanel';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function EditorPage() {
  const { editorRef, exportPostcard, saveDraft, loadDraft, executeAction } = useEditor();
  const { selectedLocation } = useAppStore();
  const router = useRouter();

  // Redirect if no location is selected (e.g. direct nav)
  useEffect(() => {
    if (!selectedLocation) {
      router.push('/explore');
    }
  }, [selectedLocation, router]);

  if (!selectedLocation) return null;

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-10 flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Header & Toolbar Row */}
      <div className="px-4 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/postcard')}
            className="p-3 bg-slate-900 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
            Vice Studio
          </h1>
        </div>
        
        <EditorToolbar onAction={executeAction} />
      </div>

      {/* Main Studio Area */}
      <div className="flex-grow flex flex-col lg:flex-row gap-6 px-4 lg:px-8 z-10 lg:h-[calc(100vh-140px)] min-h-[800px]">
        
        {/* Left Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-72 flex-shrink-0 flex flex-col"
        >
          <EditorSidebar />
        </motion.div>

        {/* Center Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-grow flex flex-col min-h-[500px]"
        >
          <EditorCanvas editorRef={editorRef} onLoadDraft={loadDraft} />
        </motion.div>

        {/* Right Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6"
        >
          <div className="flex-grow">
            <StudioGuide />
          </div>
          <div>
            <ExportPanel onExport={exportPostcard} onSaveDraft={saveDraft} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
