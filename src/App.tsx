import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  FlaskConical, 
  Gamepad2, 
  Swords, 
  Lightbulb, 
  Puzzle as PuzzleIcon, 
  PlayCircle, 
  Search, 
  Bot, 
  Box,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Star,
  Trophy,
  Zap,
  Send,
  Loader2,
  Sparkles,
  Atom,
  GraduationCap,
  ArrowRight,
  Target,
  Award,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  Scale,
  FileText,
  Download,
  ShieldCheck,
  RotateCcw,
  Maximize,
  Share2,
  Video,
  Music,
  Type,
  Cpu,
  Image as ImageIcon,
  Mic,
  Volume2,
  Layers,
  Infinity as InfinityIcon,
  Upload,
  Database,
  Presentation,
  UserCheck,
  HelpCircle,
  Play,
  Pause,
  SkipForward,
  Maximize2,
  Minimize2,
  MessageSquare,
  Mic2,
  History,
  StickyNote,
  MonitorPlay,
  BrainCircuit,
  Cloud,
  Flame,
} from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import confetti from 'canvas-confetti';
import { GoogleGenAI, Modality } from "@google/genai";
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';
import html2canvas from 'html2canvas';
import HTMLFlipBook from 'react-pageflip';
import { chemistryData, ai } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Transformer Component ---

type TransformerMode = 'pdf' | 'ppt' | 'canva' | 'flipbook' | 'comic' | 'infographic' | 'mindmap' | 'ebook' | 'whiteboard' | 'flashcard' | 'questions';

const MaterialTransformer = ({ chapter, category, content, onClose }: { 
  chapter: any, 
  category: string, 
  content: string,
  onClose: () => void 
}) => {
  const [mode, setMode] = useState<TransformerMode>('pdf');
  const [isTransforming, setIsTransforming] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const modes: { id: TransformerMode, name: string, icon: any, color: string }[] = [
    { id: 'pdf', name: 'PDF Otomatis', icon: FileText, color: 'card-3d-red' },
    { id: 'ppt', name: 'PowerPoint (PPT)', icon: PlayCircle, color: 'card-3d-orange' },
    { id: 'canva', name: 'Canva Slide', icon: Box, color: 'card-3d-blue' },
    { id: 'flipbook', name: 'Flipbook Interaktif', icon: BookOpen, color: 'card-3d-green' },
    { id: 'comic', name: 'Mode Komik', icon: Sparkles, color: 'card-3d-pink' },
    { id: 'infographic', name: 'Mode Infografis', icon: LayoutDashboard, color: 'card-3d-yellow' },
    { id: 'mindmap', name: 'Mindmap Aktif', icon: Target, color: 'card-3d-purple' },
    { id: 'ebook', name: 'E-book Interaktif', icon: GraduationCap, color: 'card-3d-blue' },
    { id: 'whiteboard', name: 'Whiteboard Teacher', icon: Lightbulb, color: 'card-3d-white' },
    { id: 'flashcard', name: 'Card Flash', icon: Zap, color: 'card-3d-orange' },
    { id: 'questions', name: 'Contoh Soal (C1-C6)', icon: FileText, color: 'card-3d-orange' },
  ];

  const handleTransform = () => {
    setIsTransforming(true);
    setTimeout(() => {
      setIsTransforming(false);
      setShowPreview(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899']
      });
    }, 1500);
  };

  const exportPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ChemMaster_${chapter.id}_${mode}.pdf`);
  };

  const exportPPT = () => {
    const pres = new pptxgen();
    const slide = pres.addSlide();
    slide.addText(chapter.title, { x: 1, y: 1, fontSize: 24, color: '363636', bold: true });
    slide.addText(content.substring(0, 500) + '...', { x: 1, y: 2, fontSize: 14, color: '666666' });
    pres.writeFile({ fileName: `ChemMaster_${chapter.id}.pptx` });
  };

  const openCanva = () => {
    window.open('https://www.canva.com/create/presentations/', '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
    >
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[2.5rem] border-4 border-black shadow-[12px_12px_0_#000] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b-4 border-black flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#444]">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Material Transformer</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ubah Materi: {chapter.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-all border-2 border-transparent hover:border-black">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Sidebar Selection */}
          <div className="w-full lg:w-80 border-r-4 border-black overflow-y-auto p-6 space-y-4 bg-slate-50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pilih Tampilan Materi:</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setMode(m.id); setShowPreview(false); }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
                    mode === m.id 
                      ? "bg-black text-white border-black shadow-[4px_4px_0_#444]" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-black"
                  )}
                >
                  <m.icon size={18} className={cn(mode === m.id ? "text-white" : "text-slate-400")} />
                  <span className="text-xs font-black truncate">{m.name}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={handleTransform}
              disabled={isTransforming}
              className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-[6px_6px_0_#1e3a8a] hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center gap-3"
            >
              {isTransforming ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              UBAH SEKARANG
            </button>
          </div>

          {/* Preview Area */}
          <div className="flex-1 bg-slate-200 p-8 overflow-y-auto relative">
            {!showPreview ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-white border-4 border-black rounded-[2rem] flex items-center justify-center shadow-[8px_8px_0_#000] animate-bounce">
                  <Box size={48} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Siap Mentransformasi?</h3>
                <p className="text-sm font-black text-slate-500 max-w-xs uppercase tracking-widest">Pilih mode di samping dan klik tombol "Ubah Sekarang" untuk melihat keajaiban.</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <button onClick={exportPDF} className="px-4 py-2 bg-white border-2 border-black rounded-xl text-[10px] font-black shadow-[2px_2px_0_#000] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                      <Download size={14} /> DOWNLOAD PDF
                    </button>
                    <button onClick={exportPPT} className="px-4 py-2 bg-white border-2 border-black rounded-xl text-[10px] font-black shadow-[2px_2px_0_#000] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                      <PlayCircle size={14} /> DOWNLOAD PPT
                    </button>
                    {mode === 'canva' && (
                      <button onClick={openCanva} className="px-4 py-2 bg-[#00c4cc] text-white border-2 border-black rounded-xl text-[10px] font-black shadow-[2px_2px_0_#000] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                        <Box size={14} /> BUKA DI CANVA
                      </button>
                    )}
                    <button className="px-4 py-2 bg-white border-2 border-black rounded-xl text-[10px] font-black shadow-[2px_2px_0_#000] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                      <Maximize size={14} /> FULL SCREEN
                    </button>
                    <button className="px-4 py-2 bg-white border-2 border-black rounded-xl text-[10px] font-black shadow-[2px_2px_0_#000] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                      <Share2 size={14} /> BAGIKAN
                    </button>
                  </div>
                  <button className="p-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0_#000]"><InfinityIcon size={18} /></button>
                </div>

                <div ref={previewRef} className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0_rgba(0,0,0,0.1)] min-h-[1000px] p-12 overflow-hidden">
                  {mode === 'pdf' && (
                    <div className="space-y-8">
                      <div className="border-b-4 border-black pb-8 flex justify-between items-end">
                        <div>
                          <h1 className="text-4xl font-black text-slate-900 mb-2">{chapter.title}</h1>
                          <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Modul Pembelajaran ChemMaster • {category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-slate-400 uppercase">Watermark</p>
                          <p className="text-sm font-black text-blue-600">RIZKY PRATAMA</p>
                        </div>
                      </div>
                      <div className="prose max-w-none">
                        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{content}</Markdown>
                      </div>
                    </div>
                  )}

                  {mode === 'questions' && (
                    <div className="space-y-8">
                      <div className="border-b-4 border-black pb-8 flex justify-between items-end">
                        <div>
                          <h1 className="text-4xl font-black text-slate-900 mb-2">Contoh Soal & Latihan</h1>
                          <p className="text-sm font-black text-slate-500 uppercase tracking-widest">{chapter.title} • Bloom's Taxonomy C1-C6</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-blue-600">ChemMaster AI</p>
                        </div>
                      </div>
                      <div className="prose max-w-none">
                        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {`# Latihan Soal Komprehensif\n\nBerikut adalah kumpulan soal latihan yang dirancang untuk menguji pemahaman Anda dari tingkat dasar hingga tingkat tinggi.\n\n${content}`}
                        </Markdown>
                      </div>
                    </div>
                  )}

                  {mode === 'ppt' && (
                    <div className="flex flex-col h-[600px] justify-center items-center text-center space-y-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-20 border-8 border-black">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-6"
                      >
                        <h1 className="text-6xl font-black tracking-tighter uppercase">{chapter.title}</h1>
                        <div className="w-32 h-2 bg-blue-500 mx-auto rounded-full" />
                        <p className="text-xl font-medium text-slate-400">Presentasi Interaktif Kimia</p>
                      </motion.div>
                      <div className="absolute bottom-12 right-12 flex items-center gap-4">
                        <span className="text-xs font-black text-slate-500">SLIDE 1 / 12</span>
                        <div className="flex gap-2">
                          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"><ChevronRight className="rotate-180" /></button>
                          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"><ChevronRight /></button>
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'flipbook' && (
                    <div className="flex justify-center items-center h-[700px]">
                      <HTMLFlipBook width={400} height={600} className="shadow-2xl" style={{}} startPage={0} size="fixed" minWidth={300} maxWidth={1000} minHeight={400} maxHeight={1533} drawShadow={true} flippingTime={1000} usePortrait={true} startZIndex={0} autoSize={true} maxShadowOpacity={0.5} showCover={true} mobileScrollSupport={true} clickEventForward={true} useMouseEvents={true} swipeDistance={30} showPageCorners={true} disableFlipByClick={false}>
                        <div className="bg-white p-10 border-r border-slate-200 flex flex-col justify-center items-center text-center shadow-inner">
                          <h2 className="text-3xl font-black mb-4">{chapter.title}</h2>
                          <div className="w-20 h-1 bg-black mb-8" />
                          <p className="text-sm font-bold text-slate-500 italic">Buku Digital Interaktif</p>
                        </div>
                        <div className="bg-white p-10 shadow-inner overflow-y-auto">
                          <div className="prose prose-sm">
                            <Markdown>{content.substring(0, 1000)}</Markdown>
                          </div>
                        </div>
                        <div className="bg-white p-10 shadow-inner overflow-y-auto">
                          <div className="prose prose-sm">
                            <Markdown>{content.substring(1000, 2000)}</Markdown>
                          </div>
                        </div>
                      </HTMLFlipBook>
                    </div>
                  )}

                  {mode === 'comic' && (
                    <div className="space-y-12 max-w-2xl mx-auto">
                      <div className="relative p-8 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0_#000]">
                        <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-400 border-4 border-black rounded-2xl flex items-center justify-center rotate-[-12deg] shadow-[4px_4px_0_#000] z-10">
                          <span className="text-2xl font-black">BOOM!</span>
                        </div>
                        <div className="flex gap-6 items-start">
                          <div className="w-32 h-32 bg-slate-100 border-4 border-black rounded-2xl overflow-hidden shrink-0">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Einstein" alt="Character" className="w-full h-full" />
                          </div>
                          <div className="relative p-6 bg-blue-50 border-4 border-black rounded-2xl">
                            <div className="absolute top-4 -left-3 w-4 h-4 bg-blue-50 border-l-4 border-b-4 border-black rotate-45" />
                            <p className="text-sm font-black leading-relaxed">"Tahukah kamu? {chapter.title} adalah kunci untuk memahami alam semesta kita!"</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="aspect-square bg-slate-100 border-4 border-black rounded-3xl overflow-hidden relative group">
                          <img src={`https://picsum.photos/seed/${chapter.id}1/400/400`} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
                          <div className="absolute bottom-4 left-4 right-4 p-3 bg-white border-2 border-black rounded-xl font-black text-[10px] uppercase">Langkah 1: Observasi</div>
                        </div>
                        <div className="aspect-square bg-slate-100 border-4 border-black rounded-3xl overflow-hidden relative group">
                          <img src={`https://picsum.photos/seed/${chapter.id}2/400/400`} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
                          <div className="absolute bottom-4 left-4 right-4 p-3 bg-white border-2 border-black rounded-xl font-black text-[10px] uppercase">Langkah 2: Reaksi</div>
                        </div>
                      </div>

                      <div className="p-8 bg-yellow-50 border-4 border-black rounded-3xl text-center italic font-black text-xl">
                        "Bersambung ke panel berikutnya..."
                      </div>
                    </div>
                  )}

                  {mode === 'mindmap' && (
                    <div className="h-[800px] flex items-center justify-center overflow-hidden bg-slate-50 rounded-3xl border-4 border-dashed border-slate-300">
                      <div className="relative">
                        <motion.div 
                          drag
                          dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                          className="w-48 h-48 bg-black text-white rounded-full flex items-center justify-center text-center p-6 font-black text-lg border-8 border-blue-400 shadow-2xl cursor-grab active:cursor-grabbing z-20"
                        >
                          {chapter.title}
                        </motion.div>
                        
                        {chapter.topics?.map((t: string, i: number) => {
                          const angle = (i / (chapter.topics?.length || 1)) * Math.PI * 2;
                          const x = Math.cos(angle) * 250;
                          const y = Math.sin(angle) * 250;
                          
                          return (
                            <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <motion.div 
                                initial={{ x: 0, y: 0, opacity: 0 }}
                                animate={{ x, y, opacity: 1 }}
                                transition={{ delay: i * 0.1, type: 'spring' }}
                                className="w-40 p-4 bg-white border-4 border-black rounded-2xl text-center font-black text-xs shadow-[6px_6px_0_#000] cursor-pointer hover:bg-blue-50"
                              >
                                {t}
                              </motion.div>
                              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none -z-10">
                                <line x1="300" y1="300" x2={300 + x} y2={300 + y} stroke="black" strokeWidth="4" strokeDasharray="8 8" />
                              </svg>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {mode === 'flashcard' && (
                    <div className="flex flex-col items-center justify-center h-[600px] space-y-12">
                      <div className="perspective-1000 w-full max-w-md h-80 group cursor-pointer">
                        <motion.div 
                          className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180"
                        >
                          {/* Front */}
                          <div className="absolute inset-0 backface-hidden bg-white border-8 border-black rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center shadow-[12px_12px_0_#000]">
                            <Zap size={48} className="text-orange-500 mb-6" />
                            <h3 className="text-2xl font-black uppercase tracking-tighter">{chapter.title}</h3>
                            <p className="mt-4 text-xs font-black text-slate-400 uppercase tracking-widest">Sentuh untuk melihat jawaban</p>
                          </div>
                          {/* Back */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-600 border-8 border-black rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center text-white shadow-[12px_12px_0_#000]">
                            <p className="text-lg font-black leading-relaxed">
                              {content.substring(0, 200)}...
                            </p>
                          </div>
                        </motion.div>
                      </div>
                      <div className="flex gap-4">
                        <button className="w-16 h-16 bg-white border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#000] hover:translate-y-[-2px] active:translate-y-0 transition-all">
                          <RotateCcw size={24} />
                        </button>
                        <button className="px-8 py-4 bg-black text-white rounded-2xl font-black shadow-[4px_4px_0_#444] hover:translate-y-[-2px] active:translate-y-0 transition-all uppercase tracking-widest">
                          Kartu Berikutnya
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === 'infographic' && (
                    <div className="space-y-12">
                      <div className="text-center space-y-4">
                        <h1 className="text-5xl font-black uppercase tracking-tighter bg-black text-white py-4 px-8 inline-block rotate-[-1deg]">{chapter.title}</h1>
                        <p className="text-sm font-black text-slate-500 uppercase tracking-[0.3em]">Ringkasan Visual & Data Kimia</p>
                      </div>

                      <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 bg-slate-50 border-4 border-black rounded-3xl p-8 space-y-6">
                          <h3 className="text-xl font-black uppercase flex items-center gap-2">
                            <Target className="text-red-500" /> Alur Proses
                          </h3>
                          <div className="flex items-center justify-between gap-4">
                            {['Input', 'Reaksi', 'Output'].map((step, i) => (
                              <React.Fragment key={step}>
                                <div className="flex-1 bg-white border-4 border-black p-6 rounded-2xl text-center shadow-[6px_6px_0_#000]">
                                  <span className="block text-2xl font-black mb-1">{i + 1}</span>
                                  <span className="text-xs font-black uppercase text-slate-500">{step}</span>
                                </div>
                                {i < 2 && <ChevronRight size={32} className="text-slate-300" />}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-600 border-4 border-black rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-[10px_10px_0_#1e3a8a]">
                          <div className="text-6xl font-black mb-2">98%</div>
                          <div className="text-xs font-black uppercase tracking-widest opacity-80">Tingkat Akurasi</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-yellow-400 border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0_#000]">
                          <h3 className="text-xl font-black uppercase mb-6">Statistik Utama</h3>
                          <div className="space-y-4">
                            {[75, 45, 90].map((val, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                  <span>Parameter {i + 1}</span>
                                  <span>{val}%</span>
                                </div>
                                <div className="h-4 bg-black/10 rounded-full overflow-hidden border-2 border-black">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${val}%` }}
                                    className="h-full bg-black"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0_#000] flex flex-col justify-center">
                          <p className="text-lg font-black italic leading-relaxed">
                            "Visualisasi data membantu kita memahami pola yang tersembunyi dalam angka-angka kimia."
                          </p>
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-black" />
                            <span className="text-xs font-black uppercase">ChemMaster Expert</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'ebook' && (
                    <div className="flex h-[800px] border-4 border-black rounded-3xl overflow-hidden">
                      <div className="w-64 bg-slate-50 border-r-4 border-black p-6 space-y-6 overflow-y-auto">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Daftar Isi</h3>
                        <div className="space-y-2">
                          {['Pendahuluan', 'Konsep Dasar', 'Eksperimen', 'Kesimpulan', 'Latihan Soal'].map((item, i) => (
                            <button key={i} className={cn(
                              "w-full text-left p-3 rounded-xl text-xs font-black transition-all",
                              i === 0 ? "bg-black text-white" : "hover:bg-slate-200"
                            )}>
                              {i + 1}. {item}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 bg-white p-12 overflow-y-auto relative">
                        <div className="max-w-2xl mx-auto space-y-8">
                          <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-b-2 border-slate-100 pb-4">
                            <span>Bab 1: Pendahuluan</span>
                            <span>Halaman 1 dari 24</span>
                          </div>
                          <h2 className="text-4xl font-black tracking-tight">{chapter.title}</h2>
                          <div className="prose prose-slate max-w-none">
                            <Markdown>{content.substring(0, 1500)}</Markdown>
                          </div>
                          <div className="p-6 bg-blue-50 border-4 border-black rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-[4px_4px_0_#1e3a8a]">
                              <Lightbulb size={24} />
                            </div>
                            <p className="text-sm font-black">Tahukah kamu? Kamu bisa menandai (bookmark) bagian penting di e-book ini!</p>
                          </div>
                        </div>
                        <div className="sticky bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm border-t-2 border-slate-100 flex justify-between">
                          <button className="px-6 py-2 border-2 border-black rounded-xl font-black text-xs hover:bg-slate-100">SEBELUMNYA</button>
                          <button className="px-6 py-2 bg-black text-white rounded-xl font-black text-xs shadow-[4px_4px_0_#444]">SELANJUTNYA</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'whiteboard' && (
                    <div className="bg-[#1a1a1a] min-h-[700px] rounded-3xl border-8 border-[#333] p-12 relative overflow-hidden shadow-inner">
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                      
                      <div className="relative space-y-12">
                        <motion.h1 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, ease: "linear" }}
                          className="text-5xl font-black text-white border-b-4 border-white/20 pb-6 overflow-hidden whitespace-nowrap font-mono"
                        >
                          {chapter.title}
                        </motion.h1>

                        <div className="grid grid-cols-2 gap-12">
                          <div className="space-y-8">
                            {chapter.topics.slice(0, 3).map((topic: string, i: number) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2 + i * 1 }}
                                className="flex items-start gap-4"
                              >
                                <div className="w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center text-blue-400 font-black shrink-0 mt-1">{i + 1}</div>
                                <p className="text-xl text-white/90 font-medium leading-relaxed font-mono">{topic}</p>
                              </motion.div>
                            ))}
                          </div>
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 5 }}
                            className="aspect-square bg-white/5 border-4 border-dashed border-white/20 rounded-3xl flex items-center justify-center p-8"
                          >
                            <div className="text-center space-y-4">
                              <div className="w-32 h-32 bg-blue-500/20 border-4 border-blue-400 rounded-full mx-auto flex items-center justify-center">
                                <Target size={48} className="text-blue-400" />
                              </div>
                              <p className="text-white font-mono uppercase tracking-widest text-xs">Diagram Visual Sedang Digambar...</p>
                            </div>
                          </motion.div>
                        </div>

                        <div className="absolute bottom-0 right-0 p-8">
                          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <div className="w-10 h-10 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-white font-black uppercase tracking-widest text-xs">LIVE TEACHING MODE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fallback for other modes */}
                  {!['pdf', 'ppt', 'flipbook', 'comic', 'mindmap', 'flashcard', 'infographic', 'ebook', 'whiteboard'].includes(mode) && (
                    <div className="flex flex-col items-center justify-center h-[600px] text-center space-y-6">
                      <div className="w-20 h-20 bg-slate-100 border-4 border-black rounded-3xl flex items-center justify-center animate-pulse">
                        <Sparkles size={32} className="text-purple-500" />
                      </div>
                      <h3 className="text-xl font-black">Mode {mode.toUpperCase()} Aktif</h3>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto">Tampilan ini sedang dioptimalkan untuk materi {chapter.title}.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Components ---

const Sidebar = ({ isOpen, toggle, isPremium }: { isOpen: boolean, toggle: () => void, isPremium: boolean }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Materi Kelas X', path: '/curriculum/X', icon: BookOpen },
    { name: 'Materi Kelas XI', path: '/curriculum/XI', icon: BookOpen },
    { name: 'Materi Kelas XII', path: '/curriculum/XII', icon: BookOpen },
    { name: 'Lab Virtual', path: '/model/vlab', icon: FlaskConical },
    { name: 'Petualangan', path: '/model/vca', icon: Gamepad2 },
    { name: 'Chem Battle', path: '/model/battle', icon: Swords },
    { name: 'AI Tutor', path: '/model/ai', icon: Bot },
    { name: 'Glosarium', path: '/glossary', icon: BookOpen },
    { name: 'Premium', path: '/premium', icon: Award },
  ];

  return (
    <>
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-[#1e1e1e] text-white transition-all duration-300 z-50 shadow-xl flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4 flex items-center gap-3 border-b border-white/10 h-16">
          <div className="w-8 h-8 bg-[var(--wp-primary)] rounded flex items-center justify-center shrink-0 transition-colors duration-300">
            <Atom className="text-white" size={20} />
          </div>
          {isOpen && <span className="font-bold text-lg tracking-tight">CHEMMASTER</span>}
        </div>

        <nav className="mt-4 px-2 space-y-1 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 p-2.5 rounded transition-all wp-sidebar-item relative",
                location.pathname === item.path 
                  ? "active" 
                  : "text-slate-300"
              )}
            >
              <item.icon size={20} className="shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
              {item.name === 'Premium' && !isPremium && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </nav>

        {isOpen && (
          <div className="p-4 mx-2 mb-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-2">
              <Award className={cn("shrink-0", isPremium ? "text-yellow-400" : "text-slate-500")} size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">
                {isPremium ? "Premium Active" : "Free Member"}
              </span>
            </div>
            {!isPremium && (
              <Link 
                to="/premium" 
                className="block w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-[10px] font-bold text-center rounded uppercase transition-all"
              >
                Upgrade Sekarang
              </Link>
            )}
          </div>
        )}

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 p-2.5 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all">
            <LogOut size={20} />
            {isOpen && <span className="text-sm font-medium">Keluar</span>}
          </button>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={toggle}
        />
      )}
    </>
  );
};

const Header = ({ toggleSidebar, currentTheme, setTheme, isPremium }: { toggleSidebar: () => void, currentTheme: string, setTheme: (theme: string) => void, isPremium: boolean }) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const navigate = useNavigate();

  const handleHeaderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`File ${file.name} berhasil diunggah!`);
    }
  };
  
  const themes = [
    { name: 'Default Blue', class: '', color: '#2271b1' },
    { name: 'EduVerse', class: 'theme-eduverse', color: '#06b6d4' },
    { name: 'MindForge', class: 'theme-mindforge', color: '#6366f1' },
    { name: 'ChemPlay', class: 'theme-chemplay', color: '#10b981' },
    { name: 'ZenLife', class: 'theme-zenlife', color: '#84a59d' },
    { name: 'SkillBlast', class: 'theme-skillblast', color: '#f59e0b' },
    { name: 'FitAI', class: 'theme-fitai', color: '#ef4444' },
    { name: 'FinGuard', class: 'theme-finguard', color: '#1e3a8a' },
    { name: 'CineCraft', class: 'theme-cinecraft', color: '#e11d48' },
    { name: 'HomeSync', class: 'theme-homesync', color: '#3b82f6' },
    { name: 'CultureMap', class: 'theme-culturemap', color: '#c2410c' },
  ];

  return (
    <header 
      style={{ backgroundColor: 'var(--header-bg)', color: 'var(--text-main)' }}
      className="h-12 border-b border-[#ccd0d4] backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between transition-colors duration-300"
    >
      <div className="flex items-center gap-2">
        <button onClick={toggleSidebar} className="p-1.5 hover:bg-black/5 rounded transition-all">
          <Menu size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button 
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded border border-[#ccd0d4] text-[10px] font-bold text-slate-700 transition-all"
          >
            <Sparkles size={12} className="text-purple-500" />
            THEMES
          </button>
          
          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#ccd0d4] rounded shadow-lg py-1 z-50 animate-fade-in max-h-[60vh] overflow-y-auto">
              {themes.map((t) => (
                <button
                  key={t.class}
                  onClick={() => {
                    setTheme(t.class);
                    setShowThemeMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-left transition-all"
                >
                  <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: t.color }} />
                  <span className={cn("text-[10px] font-medium", currentTheme === t.class ? "text-slate-900 font-bold" : "text-slate-600")}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-xl border border-[#ccd0d4] shadow-sm">
          <div className="flex items-center gap-1.5">
            <Trophy size={11} className="text-blue-500" />
            <div className="flex flex-col leading-none">
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Level</span>
              <span className="text-[10px] font-black text-slate-700">12</span>
            </div>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Zap size={11} className="text-orange-500" />
            <div className="flex flex-col leading-none">
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Total XP</span>
              <span className="text-[10px] font-black text-slate-700">2,450</span>
            </div>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Target size={11} className="text-green-500" />
            <div className="flex flex-col leading-none">
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Misi</span>
              <span className="text-[10px] font-black text-slate-700">8/24</span>
            </div>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Award size={11} className="text-purple-500" />
            <div className="flex flex-col leading-none">
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Sertif</span>
              <span className="text-[10px] font-black text-slate-700">5</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 pl-2 border-l border-[#ccd0d4]">
          {isPremium && (
            <div className="hidden lg:flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200">
              <ShieldCheck size={12} className="text-yellow-600" />
              <span className="text-[9px] font-bold text-yellow-700 uppercase">Premium</span>
            </div>
          )}
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-slate-900 leading-tight">Rizky Pratama</p>
            <p className="text-[9px] text-slate-500 leading-tight">Siswa Kelas XII</p>
          </div>
          <div className="w-7 h-7 rounded bg-slate-200 border border-[#ccd0d4] overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rizky" alt="Avatar" className="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Model Views ---

const ChemBattle = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQ, setCurrentQ] = useState(0);

  const questions = [
    { q: "Lambang unsur Kalium adalah...", a: "K", options: ["Ka", "K", "Kl", "P"] },
    { q: "H2O adalah rumus kimia dari...", a: "Air", options: ["Oksigen", "Air", "Asam", "Garam"] },
    { q: "Nomor atom Hidrogen adalah...", a: "1", options: ["1", "2", "3", "4"] },
    { q: "Unsur yang paling melimpah di alam semesta adalah...", a: "Hidrogen", options: ["Oksigen", "Hidrogen", "Helium", "Nitrogen"] },
    { q: "pH larutan asam adalah...", a: "< 7", options: ["> 7", "7", "< 7", "14"] },
  ];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('end');
    }
  }, [gameState, timeLeft]);

  const handleAnswer = (ans: string) => {
    if (ans === questions[currentQ].a) {
      setScore(score + 100);
      confetti({ 
        particleCount: 50, 
        spread: 60,
        colors: ['#a855f7', '#d8b4fe']
      });
    }
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setGameState('end');
    }
  };

  if (gameState === 'start') {
    return (
      <div className="card-3d card-3d-purple p-12 text-center space-y-8 max-w-2xl mx-auto animate-fade-in">
        <div className="w-24 h-24 bg-white border-4 border-black rounded-3xl flex items-center justify-center mx-auto shadow-[6px_6px_0_#000]">
          <Swords size={48} className="text-purple-600" />
        </div>
        <h2 className="balloon-title text-3xl">Siap Bertarung?</h2>
        <p className="text-slate-700 font-black">Uji pengetahuan kimiamu dalam duel waktu terbatas!</p>
        <button 
          onClick={() => setGameState('playing')}
          className="px-12 py-4 bg-black text-white rounded-2xl font-black text-xl shadow-[8px_8px_0_#444] hover:translate-y-[-4px] active:translate-y-[0px] transition-all"
        >
          MULAI BATTLE
        </button>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="card-3d card-3d-green p-12 text-center space-y-8 max-w-2xl mx-auto animate-fade-in">
        <h2 className="balloon-title text-4xl">Battle Selesai!</h2>
        <div className="text-7xl font-black text-slate-900 drop-shadow-[4px_4px_0_#fff]">{score}</div>
        <p className="text-xl font-black text-slate-700 uppercase tracking-widest">Skor Akhir Kamu</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => { setGameState('start'); setScore(0); setTimeLeft(30); setCurrentQ(0); }}
            className="px-8 py-4 bg-black text-white rounded-2xl font-black text-lg shadow-[6px_6px_0_#444] hover:translate-y-[-4px] active:translate-y-[0px] transition-all"
          >
            COBA LAGI
          </button>
          <Link 
            to="/"
            className="px-8 py-4 bg-white text-black border-4 border-black rounded-2xl font-black text-lg shadow-[6px_6px_0_#000] hover:translate-y-[-4px] active:translate-y-[0px] transition-all"
          >
            KEMBALI KE DASHBOARD
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="card-3d card-3d-blue px-8 py-4 flex items-center gap-4">
          <Clock className="text-blue-600" size={24} />
          <span className="text-2xl font-black">{timeLeft}s</span>
        </div>
        <div className="card-3d card-3d-yellow px-8 py-4 flex items-center gap-4">
          <Zap className="text-yellow-600" size={24} />
          <span className="text-2xl font-black">{score} XP</span>
        </div>
      </div>

      <div className="card-3d card-3d-white p-12 space-y-10">
        <div className="text-center">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-4 py-1 rounded-full border-2 border-black">Pertanyaan {currentQ + 1} dari {questions.length}</span>
          <h2 className="text-3xl font-black text-slate-900 mt-6 leading-tight">{questions[currentQ].q}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {questions[currentQ].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="p-6 bg-white border-4 border-black rounded-2xl font-black text-xl text-slate-800 shadow-[8px_8px_0_#000] hover:translate-y-[-4px] hover:bg-slate-50 active:translate-y-[0px] transition-all text-left flex items-center gap-4"
            >
              <span className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-black flex items-center justify-center shrink-0">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const VirtualLab = ({ isPremium }: { isPremium: boolean }) => {
  const [ph, setPh] = useState(7);
  const [temp, setTemp] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{ x: number, y: number }[]>([]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setGraphData(prev => [...prev.slice(-20), { x: Date.now(), y: Math.random() * 10 + ph }]);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isRunning, ph]);

  const runReaction = () => {
    setIsRunning(true);
    setResult(null);
    setGraphData([]);
    setTimeout(() => {
      setIsRunning(false);
      if (ph < 7) setResult("Reaksi Asam Terdeteksi! Terjadi pelepasan gas H₂.");
      else if (ph > 7) setResult("Reaksi Basa Terdeteksi! Terbentuk endapan hidroksida.");
      else setResult("Larutan Netral. Tidak ada reaksi signifikan.");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#007cba', '#2271b1']
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {!isPremium && (
        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="text-yellow-600" size={20} />
            <span className="text-xs font-bold text-yellow-800 uppercase">Mode Gratis: Akses Terbatas ke Level Dasar</span>
          </div>
          <Link to="/premium" className="text-[10px] font-bold text-yellow-700 underline">Buka Semua Level</Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-3d card-3d-blue p-8 flex flex-col items-center justify-center min-h-[500px]">
          <div className="relative w-48 h-64 border-4 border-black rounded-b-3xl border-t-0 flex flex-col justify-end p-1 overflow-hidden bg-white shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
            <motion.div 
              animate={{ 
                height: `${ph * 7}%`,
                backgroundColor: ph < 7 ? '#ff4d4d' : ph > 7 ? '#4d94ff' : '#4dff88'
              }}
              className="w-full transition-colors duration-500 relative border-t-4 border-black/20"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-white/40 animate-pulse" />
            </motion.div>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Gelas Kimia A-101</h3>
            <p className="text-sm font-black text-slate-600 uppercase tracking-widest">Status: {isRunning ? 'Menganalisis...' : 'Siap Digunakan'}</p>
          </div>
 
          <div className="mt-8 w-full h-24 bg-white rounded-2xl border-4 border-black p-2 flex items-end gap-1 overflow-hidden shadow-[4px_4px_0_#000]">
            {graphData.map((d, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${d.y * 4}%` }}
                className="flex-1 bg-blue-400 border-2 border-black rounded-t-lg"
              />
            ))}
          </div>
 
          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 card-3d card-3d-green text-slate-900 text-sm font-black w-full text-center"
            >
              {result}
            </motion.div>
          )}
        </div>
 
        <div className="card-3d card-3d-purple p-8 space-y-8">
          <h3 className="balloon-title text-xl border-b-4 border-black/10 pb-4">Eksperimen</h3>
 
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-xs font-black text-slate-800 uppercase tracking-widest">Tingkat pH</label>
                <span className="text-xl font-black text-blue-600">{ph}</span>
              </div>
              <input 
                type="range" min="0" max="14" step="0.1" value={ph} 
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full h-4 bg-white border-4 border-black rounded-full appearance-none cursor-pointer accent-blue-600"
              />
            </div>
 
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-xs font-black text-slate-800 uppercase tracking-widest">Suhu (°C)</label>
                <span className="text-xl font-black text-orange-600">{temp}°C</span>
              </div>
              <input 
                type="range" min="0" max={isPremium ? 500 : 100} value={temp} 
                onChange={(e) => setTemp(parseInt(e.target.value))}
                className="w-full h-4 bg-white border-4 border-black rounded-full appearance-none cursor-pointer accent-orange-600"
              />
              {!isPremium && <p className="text-[10px] font-black text-slate-500 mt-2 italic">* Upgrade Premium untuk suhu hingga 500°C</p>}
            </div>
 
            <button 
              onClick={runReaction}
              disabled={isRunning}
              className="w-full py-4 bg-black text-white rounded-2xl font-black text-lg shadow-[6px_6px_0_#444] hover:translate-y-[-2px] active:translate-y-[0px] transition-all disabled:opacity-50"
            >
              {isRunning ? 'Memproses...' : 'Mulai Reaksi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdventureView = () => {
  const missions = [
    { id: 1, title: 'Menstabilkan Molekul Karbon', grade: 'X', status: 'available', xp: 500 },
    { id: 2, title: 'Menetralkan Limbah Pabrik', grade: 'XI', status: 'locked', xp: 750 },
    { id: 3, title: 'Menyelamatkan Kutub Utara', grade: 'X', status: 'locked', xp: 600 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {missions.map((m, i) => {
        const colors = ['card-3d-orange', 'card-3d-blue', 'card-3d-pink'];
        const cardColor = colors[i % colors.length];
        
        return (
          <div key={m.id} className={cn(
            "card-3d p-8 transition-all group relative",
            cardColor,
            m.status === 'locked' && "opacity-60 grayscale-[0.5]"
          )}>
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-white border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#000]">
                <Gamepad2 size={32} className={m.status === 'available' ? "text-slate-900" : "text-slate-400"} />
              </div>
              {m.status === 'locked' && (
                <div className="p-2 bg-slate-900 rounded-full border-2 border-white shadow-[2px_2px_0_#000]">
                  <X className="text-white" size={16} />
                </div>
              )}
            </div>

            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2 block">Misi {m.id} • Kelas {m.grade}</span>
            <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight">{m.title}</h3>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-4 bg-white border-4 border-black rounded-full overflow-hidden shadow-[2px_2px_0_#000]">
                <div className="h-full bg-yellow-400 border-r-4 border-black w-0 group-hover:w-1/3 transition-all duration-1000" />
              </div>
              <span className="text-xs font-black text-slate-900">0%</span>
            </div>

            <button 
              disabled={m.status === 'locked'}
              className={cn(
                "w-full py-4 rounded-xl text-lg font-black transition-all flex items-center justify-center gap-3 shadow-[6px_6px_0_#000] hover:translate-y-[-2px] active:translate-y-[0px]",
                m.status === 'available' ? "bg-black text-white" : "bg-slate-300 text-slate-600 shadow-none cursor-not-allowed"
              )}
            >
              {m.status === 'available' ? 'Mulai Misi' : 'Terkunci'}
              <ArrowRight size={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

const AITutor = ({ isPremium }: { isPremium: boolean }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Halo! Saya ChemAI, asisten belajar Kimia Anda. Ada materi yang ingin Anda diskusikan hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !ai) return;
    
    if (!isPremium && messageCount >= 5) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: '⚠️ Anda telah mencapai batas tanya jawab harian untuk versi gratis. **Upgrade ke Premium** untuk akses tanpa batas dan penjelasan materi tingkat lanjut!' 
      }]);
      return;
    }

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    setMessageCount(prev => prev + 1);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: `Anda adalah ChemAI, asisten belajar kimia profesional. Gunakan IUPAC dan LaTeX. Jelaskan dengan bahasa yang mudah dipahami siswa SMA. ${isPremium ? 'Berikan penjelasan mendalam dan tingkat lanjut.' : ''} Pertanyaan: ${userMsg}` }] }],
      });
      setMessages(prev => [...prev, { role: 'ai', content: response.text || "Maaf, saya tidak dapat menjawab saat ini." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Terjadi kesalahan koneksi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-3d card-3d-blue p-0 overflow-hidden flex flex-col h-[75vh]">
      <div className="p-6 border-b-4 border-black flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#444]">
            <Bot className="text-white" size={28} />
          </div>
          <div>
            <h3 className="font-black text-xl text-slate-900">ChemAI Tutor</h3>
            <p className="text-xs text-green-600 font-black flex items-center gap-2 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Sistem Aktif {isPremium && "• Unlimited"}
            </p>
          </div>
        </div>
        {!isPremium && (
          <div className="px-4 py-2 bg-yellow-400 border-2 border-black rounded-xl text-xs font-black text-black shadow-[2px_2px_0_#000]">
            {5 - messageCount} Sisa Tanya Jawab
          </div>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_#000]", 
              msg.role === 'user' ? "bg-slate-900 text-white" : "bg-blue-400 text-black"
            )}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={cn(
              "p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_#000]", 
              msg.role === 'user' ? "bg-white" : "bg-blue-50"
            )}>
              <div className="prose max-w-none">
                <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{msg.content}</Markdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-4 mr-auto">
            <div className="w-10 h-10 rounded-xl border-2 border-black bg-blue-400 text-black flex items-center justify-center animate-spin shadow-[2px_2px_0_#000]">
              <Loader2 size={20} />
            </div>
            <div className="p-4 rounded-2xl border-2 border-black bg-white italic text-slate-600 text-xs font-black shadow-[4px_4px_0_#000]">Menyusun penjelasan...</div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t-4 border-black">
        <div className="relative flex items-center gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pertanyaan Kimia Anda..."
            className="w-full bg-slate-50 border-4 border-black rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-4 focus:ring-blue-400/20 text-sm font-black placeholder:text-slate-400 shadow-[4px_4px_0_#000]"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 p-3 bg-black text-white rounded-xl hover:scale-110 transition-all disabled:opacity-30 shadow-[2px_2px_0_#444]"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
// --- Main Views ---

// --- AIVideoMaker Removed ---

// --- Chemistry Visual Component ---
// --- Basic Laws Simulations ---

const LavoisierSim = () => {
  const [massA, setMassA] = useState(24);
  const [massB, setMassB] = useState(16);
  const [isReacting, setIsReacting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="my-8 p-6 bg-slate-50 border-4 border-black rounded-[2rem] shadow-[8px_8px_0_#000] space-y-8">
      <div className="flex items-center gap-3 border-b-2 border-black pb-4">
        <Scale size={24} className="text-blue-600" />
        <h3 className="font-black text-lg uppercase tracking-tight">Simulasi Hukum Lavoisier</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase mb-2">Massa Zat A (Magnesium): {massA}g</label>
            <input 
              type="range" min="1" max="100" value={massA} 
              onChange={(e) => { setMassA(Number(e.target.value)); setShowResult(false); }}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase mb-2">Massa Zat B (Oksigen): {massB}g</label>
            <input 
              type="range" min="1" max="100" value={massB} 
              onChange={(e) => { setMassB(Number(e.target.value)); setShowResult(false); }}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>
          <button 
            onClick={() => {
              setIsReacting(true);
              setTimeout(() => { setIsReacting(false); setShowResult(true); }, 2000);
            }}
            className="w-full py-4 bg-black text-white rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
          >
            MULAILAH REAKSI
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-64 h-48 flex items-end justify-center">
            {/* Scale Base */}
            <div className="absolute bottom-0 w-48 h-4 bg-slate-800 rounded-full" />
            <div className="absolute bottom-4 w-2 h-32 bg-slate-400" />
            
            {/* Scale Arm */}
            <motion.div 
              animate={{ rotate: isReacting ? [0, -5, 5, 0] : 0 }}
              transition={{ duration: 0.5, repeat: isReacting ? Infinity : 0 }}
              className="absolute bottom-36 w-60 h-2 bg-slate-600 rounded-full flex justify-between px-2"
            >
              {/* Left Pan */}
              <div className="relative -mt-2">
                <div className="w-1 h-32 bg-slate-400 mx-auto" />
                <div className="w-20 h-4 bg-blue-200 border-2 border-black rounded-b-xl flex items-center justify-center">
                  <span className="text-[10px] font-bold">{isReacting ? '...' : (showResult ? '0g' : massA + 'g')}</span>
                </div>
              </div>
              {/* Right Pan */}
              <div className="relative -mt-2">
                <div className="w-1 h-32 bg-slate-400 mx-auto" />
                <div className="w-20 h-4 bg-red-200 border-2 border-black rounded-b-xl flex items-center justify-center">
                  <span className="text-[10px] font-bold">{isReacting ? '...' : (showResult ? '0g' : massB + 'g')}</span>
                </div>
              </div>
            </motion.div>

            {/* Central Product Pan */}
            {showResult && (
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-4 z-10 w-32 h-12 bg-purple-500 border-4 border-black rounded-xl flex flex-col items-center justify-center text-white"
              >
                <span className="text-[10px] font-black uppercase">Produk AB</span>
                <span className="text-lg font-black">{massA + massB}g</span>
              </motion.div>
            )}
          </div>
          <p className="text-center text-xs font-black text-slate-500 uppercase italic">
            {isReacting ? "Reaksi berlangsung, massa berpindah..." : (showResult ? "Massa Total Tetap Sama!" : "Timbang sebelum reaksi dimulai")}
          </p>
        </div>
      </div>
    </div>
  );
};

const GreenChemistryQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = [
    {
      id: 1,
      level: "C2 – Memahami",
      stimulus: "Dina Mustafa menjelaskan bahwa kimia hijau membantu mengurangi pencemaran bahan kimia yang dapat masuk ke tubuh manusia melalui tanah, air, dan udara.",
      q: "Pernyataan tersebut menunjukkan bahwa kimia hijau menekankan pada…",
      options: ["Pembakaran limbah kimia", "Pengendalian polusi sejak awal proses", "Pemanfaatan bahan kimia berbahaya", "Peningkatan produksi zat kimia sintetis"],
      correct: "Pengendalian polusi sejak awal proses",
      explanation: "Kimia hijau berfokus pada pencegahan polusi dari sumbernya, bukan sekadar mengolah limbah yang sudah terbentuk."
    },
    {
      id: 2,
      level: "C2 – Memahami",
      stimulus: "Pada proses pembersihan rumah tangga, banyak keluarga mulai mengganti pembersih kimia kuat dengan cuka dan baking soda.",
      q: "Perubahan tersebut merupakan penerapan prinsip kimia hijau karena…",
      options: ["Reaksinya menghasilkan lebih banyak gas", "Bahan yang digunakan murah", "Bahan tersebut mudah terurai dan aman", "Dapat menghasilkan aroma kuat"],
      correct: "Bahan tersebut mudah terurai dan aman",
      explanation: "Cuka dan baking soda adalah bahan alami yang biodegradabel (mudah terurai) dan tidak beracun bagi lingkungan."
    },
    {
      id: 3,
      level: "C3 – Mengaplikasikan",
      stimulus: "Seorang guru meminta siswa menilai apakah sampo organik lebih ramah lingkungan dibanding sampo sintetis berbahan SLS.",
      q: "Apa alasan paling tepat menurut prinsip kimia hijau?",
      options: ["Sampo sintetis lebih mudah diproduksi", "Sampo organik lebih mudah terbiodegradasi", "Sampo organik lebih mahal", "Sampo sintetis lebih wangi"],
      correct: "Sampo organik lebih mudah terbiodegradasi",
      explanation: "Produk organik cenderung menggunakan bahan alami yang tidak meninggalkan residu persisten di lingkungan air."
    },
    {
      id: 4,
      level: "C3 – Mengaplikasikan",
      stimulus: "Sebuah pabrik mengganti pelarut organik berbahaya dengan air dalam proses produksinya.",
      q: "Ini menunjukkan penerapan prinsip…",
      options: ["Efisiensi atom", "Penggunaan pelarut aman", "Derivatisasi berlebihan", "Penambahan katalis"],
      correct: "Penggunaan pelarut aman",
      explanation: "Salah satu prinsip kimia hijau adalah mengganti pelarut organik yang volatil dan beracun dengan pelarut yang lebih aman seperti air."
    },
    {
      id: 5,
      level: "C3 – Mengaplikasikan",
      stimulus: "Di sebuah laboratorium, reaksi dilakukan pada suhu ruang agar tidak membutuhkan energi pemanas tambahan.",
      q: "Hal ini merupakan aplikasi dari prinsip…",
      options: ["Energi yang efisien", "Analisis secara seketika", "Pencegahan polusi", "Mengurangi derivatisasi"],
      correct: "Energi yang efisien",
      explanation: "Mengurangi kebutuhan energi dengan menjalankan reaksi pada suhu dan tekanan lingkungan adalah bagian dari efisiensi energi."
    },
    {
      id: 6,
      level: "C4 – Menganalisis",
      stimulus: "Pabrik A menghasilkan limbah cair beracun dan melakukan pengolahan limbah setelah produksi. Pabrik B merancang proses sejak awal agar tidak menghasilkan limbah beracun.",
      q: "Mengapa pendekatan pabrik B lebih sesuai dengan kimia hijau?",
      options: ["Mengurangi biaya analisis", "Limbahnya dapat dijual", "Pencegahan lebih baik daripada penanggulangan", "Menghasilkan lebih banyak produk"],
      correct: "Pencegahan lebih baik daripada penanggulangan",
      explanation: "Prinsip utama kimia hijau adalah mencegah timbulnya limbah daripada harus membersihkan atau mengolahnya setelah terbentuk."
    },
    {
      id: 7,
      level: "C4 – Menganalisis",
      stimulus: "Sebuah petani kota ingin menanam sayuran tanpa pestisida kimia sintetis dan memilih metode pertanian organik.",
      q: "Keputusan tersebut paling sesuai dengan prinsip…",
      options: ["Penggunaan katalis", "Menghindari bahan baku berbahaya", "Mengurangi derivatisasi", "Analisis cepat reaksi"],
      correct: "Menghindari bahan baku berbahaya",
      explanation: "Menghindari pestisida sintetis yang beracun melindungi ekosistem dan kesehatan manusia dari paparan zat berbahaya."
    },
    {
      id: 8,
      level: "C4 – Menganalisis",
      stimulus: "Dalam sebuah reaksi, ilmuwan menambahkan katalis sehingga reaksi berjalan lebih cepat pada suhu rendah.",
      q: "Apa manfaat penggunaan katalis menurut kimia hijau?",
      options: ["Menghasilkan limbah tambahan", "Meningkatkan konsumsi pelarut", "Menghemat energi dan meningkatkan efisiensi", "Mengubah sifat produk menjadi lebih berbahaya"],
      correct: "Menghemat energi dan meningkatkan efisiensi",
      explanation: "Katalis memungkinkan reaksi terjadi lebih cepat dengan input energi yang lebih rendah dan sering kali lebih selektif sehingga limbah berkurang."
    },
    {
      id: 9,
      level: "C5 – Mengevaluasi",
      stimulus: "Sebuah industri memilih menggunakan plastik biodegradable, tetapi harganya lebih mahal daripada plastik biasa.",
      q: "Mengapa keputusan ini tetap sesuai dengan kimia hijau?",
      options: ["Karena bahan tersebut sulit terurai", "Karena mengutamakan keamanan lingkungan daripada biaya", "Karena plastik biasa tidak dapat diproduksi lagi", "Karena lebih menguntungkan secara ekonomi"],
      correct: "Karena mengutamakan keamanan lingkungan daripada biaya",
      explanation: "Kimia hijau sering kali membutuhkan investasi awal yang besar tetapi memberikan keuntungan jangka panjang bagi keberlanjutan ekosistem."
    },
    {
      id: 10,
      level: "C5 – Mengevaluasi",
      stimulus: "Sebuah daerah memilih menggunakan sepeda listrik untuk mengurangi polusi udara.",
      q: "Keputusan ini sejalan dengan prinsip kimia hijau karena…",
      options: ["Mengurangi penggunaan bahan bakar fosil", "Sepeda listrik lebih murah dari sepeda biasa", "Memproduksi lebih banyak limbah baterai", "Membutuhkan energi yang lebih besar"],
      correct: "Mengurangi penggunaan bahan bakar fosil",
      explanation: "Penggunaan energi listrik (terutama jika dari sumber terbarukan) mengurangi emisi gas rumah kaca dibanding bahan bakar fosil."
    },
    {
      id: 11,
      level: "C5 – Mengevaluasi",
      stimulus: "Sebuah perusahaan memutuskan mendaur ulang limbah kaca daripada membuat kaca baru dari pasir kuarsa.",
      q: "Pernyataan mana yang paling tepat untuk mendukung keputusan tersebut?",
      options: ["Daur ulang menghemat energi produksi", "Kaca daur ulang lebih buruk kualitasnya", "Proses daur ulang lebih berbahaya", "Pasir kuarsa lebih ramah lingkungan"],
      correct: "Daur ulang menghemat energi produksi",
      explanation: "Pelelehan kaca bekas membutuhkan suhu yang lebih rendah dibanding mengubah pasir kuarsa menjadi kaca baru, sehingga lebih hemat energi."
    },
    {
      id: 12,
      level: "C6 – Mencipta",
      stimulus: "Seorang siswa diminta membuat ide produk rumah tangga yang lebih ramah lingkungan.",
      q: "Manakah ide yang paling mencerminkan prinsip kimia hijau?",
      options: ["Deterjen dengan pewangi kuat meski sulit terurai", "Pembersih lantai dari ekstrak tanaman alami", "Lem kayu dari bahan sintetis berbahaya", "Plastik kemasan berbahan PVC"],
      correct: "Pembersih lantai dari ekstrak tanaman alami",
      explanation: "Menggunakan bahan baku alami dari biomassa (tumbuhan) adalah salah satu prinsip kimia hijau untuk keberlanjutan."
    },
    {
      id: 13,
      level: "C6 – Mencipta",
      stimulus: "Sebuah penelitian ingin mengembangkan metode baru untuk mengolah minyak goreng bekas.",
      q: "Inovasi manakah yang paling sesuai dengan prinsip kimia hijau?",
      options: ["Membuang minyak ke sungai", "Mengubah minyak bekas menjadi biodiesel", "Mencampurkan minyak dengan deterjen", "Memanaskan minyak hingga menguap"],
      correct: "Mengubah minyak bekas menjadi biodiesel",
      explanation: "Mengonversi limbah menjadi sumber energi bermanfaat (waste-to-energy) mendukung prinsip minimalisasi limbah."
    },
    {
      id: 14,
      level: "C6 – Mencipta",
      stimulus: "Sebuah sekolah ingin menerapkan program pengurangan plastik.",
      q: "Program berikut ini paling mencerminkan penerapan kimia hijau adalah…",
      options: ["Membakar plastik di halaman sekolah", "Mengganti kantong plastik dengan tote bag", "Mengumpulkan plastik lalu membuangnya ke TPA", "Menggunakan plastik sekali pakai lebih sering"],
      correct: "Mengganti kantong plastik dengan tote bag",
      explanation: "Mengurangi penggunaan material sekali pakai yang sulit terurai secara drastis mengurangi beban limbah pada bumi."
    },
    {
      id: 15,
      level: "C6 – Mencipta",
      stimulus: "Pada kegiatan pembelajaran, guru meminta siswa merancang poster kampanye tentang kimia hijau.",
      q: "Pesan kampanye yang paling tepat adalah…",
      options: ["“Buang limbah sembarangan agar cepat hilang”", "“Gunakan bahan berbahaya asal produk murah”", "“Kurangi limbah dengan merancang proses yang aman sejak awal”", "“Semua bahan kimia aman selama digunakan banyak”"],
      correct: "“Kurangi limbah dengan merancang proses yang aman sejak awal”",
      explanation: "Pesan ini merangkum filosofi kimia hijau yaitu pencegahan preventif melalui perancangan cerdas."
    }
  ];

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [currentStep]: val });
    
    // Show feedback immediately
    const q = questions[currentStep];
    if (val === q.correct) {
      setIsCorrect(true);
      if (currentStep === questions.length - 1) {
        confetti({ particleCount: 200, spread: 150, origin: { y: 0.6 } });
      }
    } else {
      setIsCorrect(false);
    }
    setShowFeedback(true);
  };

  const next = () => {
    setCurrentStep(prev => prev + 1);
    setShowFeedback(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowFeedback(false);
  };

  const q = questions[currentStep];

  return (
    <div className="p-8 bg-emerald-50 border-4 border-black rounded-[2.5rem] shadow-[8px_8px_0_#000] my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 bg-emerald-600 text-white font-black text-[10px] sm:text-xs rounded-bl-2xl z-20">
        SOAL {currentStep + 1} / {questions.length} • {q.level}
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-600 text-white rounded-lg">
          <BookOpen size={24} />
        </div>
        <h4 className="font-black text-xl uppercase tracking-tight">LATIHAN SOAL KIMIA HIJAU (C2–C6) – 15 NOMOR</h4>
      </div>

      <div className="space-y-8">
        <div className="p-6 bg-white border-4 border-black rounded-3xl shadow-[4px_4px_0_#000]">
          <p className="text-[10px] font-black uppercase text-emerald-600 mb-2">Stimulus:</p>
          <p className="font-bold text-slate-800 leading-relaxed italic">{q.stimulus}</p>
        </div>

        <p className="font-black text-slate-900 leading-relaxed text-lg">{q.q}</p>

        <div className="grid grid-cols-1 gap-3">
          {q.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={showFeedback}
              className={cn(
                "p-4 border-4 border-black rounded-2xl text-left font-bold transition-all",
                answers[currentStep] === opt 
                  ? (showFeedback 
                    ? (opt === q.correct ? "bg-green-500 text-white shadow-[4px_4px_0_#000]" : "bg-red-500 text-white shadow-[4px_4px_0_#000]") 
                    : "bg-emerald-600 text-white shadow-[4px_4px_0_#000]") 
                  : "bg-white hover:bg-emerald-100 shadow-[4px_4px_0_#000]"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-slate-100 text-black text-xs font-black">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          {showFeedback && (
            <div className="w-full space-y-6">
              <div className={cn(
                "p-6 border-4 border-black rounded-2xl",
                isCorrect ? "bg-green-100" : "bg-red-100"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <CheckCircle className="text-green-600" /> : <AlertTriangle className="text-red-600" />}
                  <span className="font-black uppercase">{isCorrect ? 'BENAR!' : 'KURANG TEPAT!'}</span>
                </div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  <span className="block font-black mb-1">Penjelasan:</span>
                  {q.explanation}
                </p>
              </div>
              
              {currentStep < questions.length - 1 ? (
                <button
                  onClick={next}
                  className="w-full py-4 bg-emerald-600 text-white border-4 border-black rounded-2xl font-black uppercase tracking-widest hover:translate-y-[-2px] shadow-[4px_4px_0_#000] transition-all"
                >
                  SOAL BERIKUTNYA
                </button>
              ) : (
                <div className="space-y-4">
                   <div className="p-6 bg-yellow-400 border-4 border-black rounded-2xl text-center shadow-[4px_4px_0_#000]">
                      <h3 className="text-xl font-black uppercase mb-1">🎉 Selamat!</h3>
                      <p className="text-xs font-bold uppercase">Kamu telah menyelesaikan seluruh latihan Kimia Hijau!</p>
                   </div>
                  <button
                    onClick={reset}
                    className="w-full py-4 bg-white text-black border-4 border-black rounded-2xl font-black uppercase tracking-widest hover:translate-y-[-2px] shadow-[4px_4px_0_#000] transition-all"
                  >
                    ULANGI DARI AWAL
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LavoisierExercise = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = [
    {
      id: 1,
      level: "C2 (Pemahaman)",
      type: "mcq",
      q: "Dalam sebuah eksperimen di sistem tertutup, 7 gram besi (Fe) direaksikan dengan 4 gram belerang (S). Berapakah massa total zat hasil reaksi (besi sulfida) yang terbentuk?",
      options: ["3 gram", "7 gram", "11 gram", "28 gram"],
      correct: "11 gram",
      explanation: "Hukum Lavoisier menyatakan massa sebelum = massa sesudah. Jadi 7g + 4g = 11g."
    },
    {
      id: 2,
      level: "C3 (Penerapan)",
      type: "numeric",
      q: "Sebanyak 12 gram magnesium (Mg) dibakar di udara menghasilkan 20 gram magnesium oksida (MgO). Hitunglah massa oksigen yang bereaksi dengan magnesium tersebut (dalam gram)!",
      correct: "8",
      explanation: "Massa Mg + Massa O = Massa MgO. Jadi, 12 + Massa O = 20. Massa O = 20 - 12 = 8 gram."
    },
    {
      id: 3,
      level: "C4 (Analisis)",
      type: "mcq",
      q: "Seorang siswa membakar 5 gram kertas dalam wadah terbuka. Setelah pembakaran, massa abu yang tertinggal hanya 0,2 gram. Apakah hasil ini menyalahi Hukum Kekekalan Massa?",
      options: [
        "Ya, karena massa berkurang dari 5g menjadi 0,2g.",
        "Tidak, karena Hukum Lavoisier hanya berlaku untuk logam.",
        "Tidak, karena sebagian massa berubah menjadi gas CO2 dan uap air yang lepas ke udara.",
        "Ya, karena seharusnya massa abu sama dengan massa kertas."
      ],
      correct: "Tidak, karena sebagian massa berubah menjadi gas CO2 dan uap air yang lepas ke udara.",
      explanation: "Hukum Lavoisier tetap berlaku. Massa yang hilang sebenarnya adalah gas yang dihasilkan dan lepas ke atmosfer karena wadah terbuka."
    },
    {
      id: 4,
      level: "C5 (Evaluasi)",
      type: "mcq",
      q: "Anda ingin membuktikan Hukum Lavoisier dengan mereaksikan cuka dan soda kue yang menghasilkan gas CO2. Manakah prosedur eksperimen yang paling tepat untuk membuktikannya?",
      options: [
        "Mereaksikan zat dalam gelas kimia terbuka dan menimbangnya.",
        "Mereaksikan zat dalam botol yang ditutup balon, lalu menimbang massa sistem sebelum dan sesudah reaksi.",
        "Membakar soda kue terlebih dahulu sebelum dicampur cuka.",
        "Mengukur volume gas yang terbentuk tanpa menimbang massanya."
      ],
      correct: "Mereaksikan zat dalam botol yang ditutup balon, lalu menimbang massa sistem sebelum dan sesudah reaksi.",
      explanation: "Untuk membuktikan Hukum Lavoisier pada reaksi yang menghasilkan gas, sistem harus tertutup (misal dengan balon) agar gas tidak keluar dan massa total tetap terukur sama."
    }
  ];

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [currentStep]: val });
    setShowFeedback(false);
  };

  const check = () => {
    const q = questions[currentStep];
    const ans = answers[currentStep];
    if (ans === q.correct) {
      setIsCorrect(true);
      if (currentStep === questions.length - 1) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    } else {
      setIsCorrect(false);
    }
    setShowFeedback(true);
  };

  const next = () => {
    setCurrentStep(prev => prev + 1);
    setShowFeedback(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowFeedback(false);
  };

  const q = questions[currentStep];

  return (
    <div className="p-8 bg-blue-50 border-4 border-black rounded-[2.5rem] shadow-[8px_8px_0_#000] my-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 bg-blue-600 text-white font-black text-[10px] sm:text-xs rounded-bl-2xl">
        SOAL {currentStep + 1} / {questions.length} • {q.level}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 text-white rounded-lg">
          <Target size={20} />
        </div>
        <h4 className="font-black text-lg uppercase tracking-tight">Latihan Soal Kekekalan Massa</h4>
      </div>

      <div className="space-y-6">
        <p className="font-bold text-slate-800 leading-relaxed text-lg">{q.q}</p>

        {q.type === 'mcq' ? (
          <div className="grid grid-cols-1 gap-3">
            {q.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={cn(
                  "p-4 border-4 border-black rounded-2xl text-left font-bold transition-all",
                  answers[currentStep] === opt ? "bg-blue-600 text-white shadow-[4px_4px_0_#000]" : "bg-white hover:bg-blue-100 shadow-[4px_4px_0_#000]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-4">
            <input 
              type="number"
              placeholder="Masukkan angka..."
              value={answers[currentStep] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="flex-1 p-4 border-4 border-black rounded-2xl font-black text-lg shadow-[4px_4px_0_#000]"
            />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          {!showFeedback ? (
            <button
              disabled={!answers[currentStep]}
              onClick={check}
              className="flex-1 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0_#444]"
            >
              PERIKSA JAWABAN
            </button>
          ) : (
            <div className="w-full space-y-4">
              <div className={cn(
                "p-6 border-4 border-black rounded-2xl",
                isCorrect ? "bg-green-100" : "bg-red-100"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <CheckCircle className="text-green-600" /> : <AlertTriangle className="text-red-600" />}
                  <span className="font-black uppercase">{isCorrect ? 'BENAR!' : 'KURANG TEPAT!'}</span>
                </div>
                <p className="text-sm font-bold text-slate-700">{q.explanation}</p>
              </div>
              
              {currentStep < questions.length - 1 ? (
                <button
                  onClick={next}
                  className="w-full py-4 bg-blue-600 text-white border-4 border-black rounded-2xl font-black uppercase tracking-widest hover:translate-y-[-2px] shadow-[4px_4px_0_#000] transition-all"
                >
                  SOAL BERIKUTNYA
                </button>
              ) : (
                <button
                  onClick={reset}
                  className="w-full py-4 bg-yellow-400 text-black border-4 border-black rounded-2xl font-black uppercase tracking-widest hover:translate-y-[-2px] shadow-[4px_4px_0_#000] transition-all"
                >
                  SELESAI & ULANGI
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProustSim = () => {
  const [ratio, setRatio] = useState(1);
  const hMass = ratio;
  const oMass = ratio * 8;
  const total = hMass + oMass;

  return (
    <div className="my-8 p-6 bg-slate-50 border-4 border-black rounded-[2rem] shadow-[8px_8px_0_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-2 border-black pb-4">
        <FlaskConical size={24} className="text-green-600" />
        <h3 className="font-black text-lg uppercase tracking-tight">Komposisi Air (H₂O)</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <p className="text-sm font-medium leading-relaxed">
            Geser slider untuk melihat bagaimana massa Hidrogen dan Oksigen selalu bertambah dalam perbandingan yang sama (1:8) untuk membentuk air.
          </p>
          <input 
            type="range" min="0.1" max="10" step="0.1" value={ratio} 
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black uppercase">
              <span>Hidrogen (H)</span>
              <span>{hMass.toFixed(1)}g</span>
            </div>
            <div className="w-full h-4 bg-white border-2 border-black rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${(hMass/total)*100}%` }}
                className="h-full bg-blue-400 border-r-2 border-black" 
              />
            </div>
            <div className="flex justify-between text-xs font-black uppercase">
              <span>Oksigen (O)</span>
              <span>{oMass.toFixed(1)}g</span>
            </div>
            <div className="w-full h-4 bg-white border-2 border-black rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${(oMass/total)*100}%` }}
                className="h-full bg-red-400 border-r-2 border-black" 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#eee" strokeWidth="20" />
              <motion.circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="20" 
                strokeDasharray={`${(hMass/total)*251} 251`}
                transition={{ type: 'spring', damping: 20 }}
              />
              <motion.circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#f87171" 
                strokeWidth="20" 
                strokeDasharray={`${(oMass/total)*251} 251`}
                strokeDashoffset={`-${(hMass/total)*251}`}
                transition={{ type: 'spring', damping: 20 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-black uppercase leading-none">Total Air</span>
              <span className="text-xl font-black">{total.toFixed(1)}g</span>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase mt-4 text-slate-500">Perbandingan Selalu 1 : 8</p>
        </div>
      </div>
    </div>
  );
};

const ProustExercise = () => {
  const [ans, setAns] = useState("");
  const [isDone, setIsDone] = useState(false);

  return (
    <div className="p-6 bg-green-50 border-4 border-black rounded-3xl shadow-[4px_4px_0_#000] my-4">
      <h4 className="font-black text-sm uppercase mb-4 flex items-center gap-2">
        <PuzzleIcon size={16} /> Tantangan Proust
      </h4>
      <p className="text-xs mb-4 font-bold">Mg : O = 3 : 2. Jika tersedia 6g Magnesium, berapa gram Oksigen yang tepat bereaksi?</p>
      <div className="flex gap-2">
        <input 
          type="number" 
          value={ans} 
          onChange={(e) => setAns(e.target.value)}
          className="w-full px-4 py-2 border-2 border-black rounded-xl font-black text-center"
        />
        <button 
          onClick={() => ans === "4" && setIsDone(true)}
          className="px-6 py-2 bg-black text-white font-black rounded-xl"
        >
          JAWAB
        </button>
      </div>
      {isDone && (
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-xs font-black text-green-600 bg-white p-2 rounded-lg border-2 border-black inline-block">
          BENAR! (6 ÷ 3) × 2 = 4 gram Oksigen. Membentuk 10g MgO.
        </motion.p>
      )}
    </div>
  );
};

const DaltonSim = () => {
  return (
    <div className="my-8 p-6 bg-slate-50 border-4 border-black rounded-[2rem] shadow-[8px_8px_0_#000] overflow-x-auto">
      <div className="flex items-center gap-3 border-b-2 border-black pb-4 mb-6">
        <Layers size={24} className="text-purple-600" />
        <h3 className="font-black text-lg uppercase tracking-tight">Hukum Dalton: Senyawa Nitrogen & Oksigen</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-200 uppercase text-[10px] font-black tracking-widest">
            <th className="p-3 border-2 border-black">Senyawa</th>
            <th className="p-3 border-2 border-black">Massa Nitrogen</th>
            <th className="p-3 border-2 border-black">Massa Oksigen</th>
            <th className="p-3 border-2 border-black">Perbandingan O</th>
          </tr>
        </thead>
        <tbody className="text-xs font-bold italic">
          <tr>
            <td className="p-3 border-2 border-black bg-white">Nitrogen Monoksida (NO)</td>
            <td className="p-3 border-2 border-black bg-white">14 g</td>
            <td className="p-3 border-2 border-black bg-white">16 g</td>
            <td className="p-3 border-2 border-black bg-blue-100 ring-2 ring-blue-500 z-10 text-center">1</td>
          </tr>
          <tr>
            <td className="p-3 border-2 border-black bg-white">Nitrogen Dioksida (NO₂)</td>
            <td className="p-3 border-2 border-black bg-white">14 g</td>
            <td className="p-3 border-2 border-black bg-white">32 g</td>
            <td className="p-3 border-2 border-black bg-blue-100 ring-2 ring-blue-500 z-10 text-center">2</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-6 p-4 bg-purple-100 border-2 border-black rounded-2xl italic text-xs">
        "Jika massa Nitrogen dibuat sama (14g), maka massa Oksigen dalam NO dan NO₂ berbanding <strong>1 : 2</strong> (bilangan bulat sederhana)."
      </div>
    </div>
  );
};

const GayLussacSim = () => {
  const [volume, setVolume] = useState(5);
  const ratio = 2.5; // C2H2 + O2 example simplified or just H2+O2
  // H2 + O2 -> H2O: 2 : 1 -> 2
  
  const vH2 = volume;
  const vO2 = volume / 2;
  const vH2O = volume;

  return (
    <div className="my-8 p-6 bg-slate-50 border-4 border-black rounded-[2rem] shadow-[8px_8px_0_#000] space-y-8">
      <div className="flex items-center gap-3 border-b-2 border-black pb-4">
        <Volume2 size={24} className="text-orange-600" />
        <h3 className="font-black text-lg uppercase tracking-tight">Simulasi Gas (2 H₂ + O₂ → 2 H₂O)</h3>
      </div>

      <div className="space-y-6">
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Geser Volume H₂: {volume} Liter</label>
        <input 
          type="range" min="2" max="20" step="2" value={volume} 
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-orange-600"
        />

        <div className="flex justify-between items-end gap-4 h-48 bg-white/50 rounded-2xl p-6 border-2 border-black/5">
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              animate={{ height: volume * 5, width: volume * 5 }}
              className="bg-blue-400/80 rounded-full border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.2)] flex items-center justify-center text-white font-black text-xs"
            >
              H₂
            </motion.div>
            <span className="text-[10px] font-black uppercase">{vH2} L</span>
          </div>
          <span className="text-4xl font-black pb-8">+</span>
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              animate={{ height: vO2 * 5, width: vO2 * 5 }}
              className="bg-red-400/80 rounded-full border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.2)] flex items-center justify-center text-white font-black text-xs"
            >
              O₂
            </motion.div>
            <span className="text-[10px] font-black uppercase">{vO2} L</span>
          </div>
          <ArrowRight className="pb-8" />
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              animate={{ height: vH2O * 5, width: vH2O * 5 }}
              className="bg-purple-400/80 rounded-full border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.2)] flex items-center justify-center text-white font-black text-xs"
            >
              H₂O
            </motion.div>
            <span className="text-[10px] font-black uppercase">{vH2O} L</span>
          </div>
        </div>

        <p className="text-center text-[10px] font-black uppercase text-orange-600 bg-orange-100 p-2 rounded-xl border-2 border-orange-200">
          Perbandingan Volume = {vH2} : {vO2} : {vH2O} = 2 : 1 : 2
        </p>
      </div>
    </div>
  );
};

const AvogadroSim = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="my-8 p-6 bg-slate-50 border-4 border-black rounded-[2rem] shadow-[8px_8px_0_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-2 border-black pb-4">
        <Atom size={24} className="text-blue-500" />
        <h3 className="font-black text-lg uppercase tracking-tight">Hipotesis Avogadro</h3>
      </div>
      
      <p className="text-sm font-medium italic">"Volume sama, jumlah molekul sama (pada T & P tetap)."</p>
      
      <div className="flex justify-around items-center h-48 relative">
        <div className="w-32 h-32 bg-yellow-400/20 border-4 border-black border-dashed rounded-full flex flex-wrap p-4 items-center justify-center gap-1 overflow-hidden">
          {[...Array(count * 6)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ x: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-blue-500 rounded-full" 
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 px-2 rounded-full border-2 border-black text-[8px] font-black">GAS A (1 L)</div>
        </div>

        <div className="w-32 h-32 bg-blue-400/20 border-4 border-black border-dashed rounded-full flex flex-wrap p-4 items-center justify-center gap-1 overflow-hidden">
          {[...Array(count * 6)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ x: [0, -5, 5, 0], y: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
              className="w-2 h-2 bg-red-500 rounded-lg" 
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 px-2 rounded-full border-2 border-black text-[8px] font-black">GAS B (1 L)</div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="text-[10px] font-black uppercase">Tingkatkan Jumlah Molekul</label>
        <div className="flex gap-2">
          {[1, 2, 3].map(n => (
            <button 
              key={n} 
              onClick={() => setCount(n)}
              className={cn("w-10 h-10 border-4 border-black rounded-xl font-black shadow-[4px_4px_0_#000]", count === n ? "bg-black text-white" : "bg-white")}
            >
              {n * 6}n
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuizBox = ({ q, options, answer, explanation }: { q: string, options: string[], answer: string, explanation: string }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const isCorrect = selected === answer;

  return (
    <div className="p-6 bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0_rgba(0,0,0,0.1)] space-y-4 mb-6">
      <p className="font-black text-sm">{q}</p>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => setSelected(opt)}
            className={cn(
              "p-3 rounded-xl border-2 border-black font-bold text-xs text-left transition-all",
              selected === opt 
                ? (opt === answer ? "bg-green-400" : "bg-red-400") 
                : "bg-slate-50 hover:translate-x-1"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 text-white rounded-xl text-[10px] italic">
          {isCorrect ? "✅ TEPAT! " : "❌ BELUM TEPAT. "} {explanation}
        </motion.div>
      )}
    </div>
  );
};

const BasicLawsQuiz = () => {
  return (
    <div className="my-10 space-y-8">
      <div className="balloon-title text-2xl text-center">Quiz Capaian Belajar</div>
      <QuizBox 
        q="Jika 10g besi bereaksi dengan 6g oksigen, berapa massa oksida besi yang terbentuk menurut Lavoisier?"
        options={["16 g", "4 g", "60 g", "Tidak bisa ditentukan"]}
        answer="16 g"
        explanation="Menurut Hukum Lavoisier, massa sebelum (10+6) = massa sesudah (16)."
      />
      <QuizBox 
        q="Senyawa air memiliki perbandingan H:O = 1:8. Jika terdapat 2g Hidrogen dan 20g Oksigen, berapa gram air yang terbentuk?"
        options={["22 g", "18 g", "9 g", "20 g"]}
        answer="18 g"
        explanation="2g H butuh 16g O (perbandingan 1:8). Maka terbentuk 2+16 = 18g air. Oksigen bersisa 4g."
      />
    </div>
  );
};

const renderGreenChemistryContent = (content: string) => {
  const parts = content.split(/(\[LATIHAN_KIMIA_HIJAU\])/);
  
  return parts.map((part, index) => {
    if (part === '[LATIHAN_KIMIA_HIJAU]') return <GreenChemistryQuiz key={index} />;
    
    return (
      <Markdown key={index} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {part}
      </Markdown>
    );
  });
};

const renderBasicLawsContent = (content: string, onShowExamples: () => void) => {
  const parts = content.split(/(\[SIMULASI_LAVOISIER\]|\[LATIHAN_LAVOISIER\]|\[SIMULASI_PROUST\]|\[LATIHAN_PROUST\]|\[SIMULASI_DALTON\]|\[SIMULASI_GAYLUSSAC\]|\[SIMULASI_AVOGADRO\]|\[QUIZ_HUKUM_DASAR\]|\[KLIK_CONTOH_SOAL\])/);
  
  return parts.map((part, index) => {
    if (part === '[SIMULASI_LAVOISIER]') return <LavoisierSim key={index} />;
    if (part === '[LATIHAN_LAVOISIER]') return <LavoisierExercise key={index} />;
    if (part === '[SIMULASI_PROUST]') return <ProustSim key={index} />;
    if (part === '[LATIHAN_PROUST]') return <ProustExercise key={index} />;
    if (part === '[SIMULASI_DALTON]') return <DaltonSim key={index} />;
    if (part === '[SIMULASI_GAYLUSSAC]') return <GayLussacSim key={index} />;
    if (part === '[SIMULASI_AVOGADRO]') return <AvogadroSim key={index} />;
    if (part === '[QUIZ_HUKUM_DASAR]') return <BasicLawsQuiz key={index} />;
    if (part === '[KLIK_CONTOH_SOAL]') {
      return (
        <div key={index} className="my-10 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowExamples}
            className="group relative px-10 py-5 bg-[#ffde59] text-black border-4 border-black rounded-[2rem] font-black text-sm shadow-[10px_10px_0_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all flex items-center gap-4 uppercase"
          >
            <div className="p-2 bg-white border-2 border-black rounded-xl">
              <HelpCircle size={24} className="text-blue-600" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-slate-600 leading-none mb-1">Siap Berlatih?</span>
              <span className="text-base tracking-tight">KLIK DISINI UNTUK MELIHAT CONTOH SOAL</span>
            </div>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>
      );
    }
    
    return (
      <Markdown key={index} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {part}
      </Markdown>
    );
  });
};

const ChemistryVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
      {/* Central Atom */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative z-20"
      >
        <Atom size={120} className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]" />
        {/* Orbitals */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 border-2 border-yellow-400/20 rounded-full"
            style={{ 
              transform: `rotate(${i * 60}deg) scale(${1.2 + i * 0.3})`,
            }}
          />
        ))}
      </motion.div>

      {/* Floating Flasks */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-10 z-30"
      >
        <div className="relative">
          <FlaskConical size={64} className="text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.5)]" />
          {/* Bubbles */}
          <div className="absolute -top-4 left-1/2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -40],
                  x: [0, (i % 2 === 0 ? 10 : -10)],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.5, 
                  repeat: Infinity 
                }}
                className="absolute w-3 h-3 bg-blue-300 rounded-full blur-[1px]"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Molecules / Hexagons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1,
            x: Math.sin(i) * 150,
            y: Math.cos(i) * 150,
            rotate: 360
          }}
          transition={{ 
            duration: 10 + i * 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute z-10"
        >
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-yellow-200/40" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
        </motion.div>
      ))}
    </div>
  );
};

const HomeHero = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] border-4 border-black shadow-[16px_16px_0_#000] bg-[#0a192f] min-h-[350px] sm:min-h-[450px] flex flex-col lg:flex-row items-center justify-between p-8 sm:p-16 gap-12 group">
      {/* Background Patterns - Circuit Board Style */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M10 10 H110 V110 H10 Z" fill="none" stroke="#ffd700" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="10" cy="10" r="3" fill="#ffd700" />
              <circle cx="110" cy="10" r="3" fill="#ffd700" />
              <circle cx="110" cy="110" r="3" fill="#ffd700" />
              <circle cx="10" cy="110" r="3" fill="#ffd700" />
              <path d="M60 10 V110 M10 60 H110" stroke="#ffd700" strokeWidth="0.5" />
              <path d="M30 30 L90 90 M90 30 L30 90" stroke="#ffd700" strokeWidth="0.3" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      {/* Gold Ribbons / Flowing Curves */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[600px] h-[200px] bg-gradient-to-r from-yellow-500/40 via-yellow-200/20 to-transparent blur-3xl rotate-[25deg]" 
        />
        <motion.div 
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[200px] bg-gradient-to-l from-yellow-500/40 via-yellow-200/20 to-transparent blur-3xl -rotate-[25deg]" 
        />
        {/* Sharp Gold Lines */}
        <div className="absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        <div className="absolute bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      </div>

      {/* Left Side: Animated Chemistry Visual */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center lg:items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ChemistryVisual />
        </motion.div>
      </div>

      {/* Right Side: Text & Badges */}
      <div className="relative z-10 flex-1 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 sm:space-y-10">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-2 sm:space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_rgba(0,0,0,0.6)] uppercase">
            MATERI<br />
            LENGKAP<br />
            <div className="flex items-center justify-center lg:justify-end gap-4 mt-2">
              <span className="text-white">KIMIA SMA</span>
            </div>
          </h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div 
            className="relative bg-gradient-to-b from-slate-100 to-white border-4 border-black px-12 py-3 shadow-[8px_8px_0_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="text-xl sm:text-3xl font-black text-black uppercase tracking-[0.1em]">SILAHKAN MASUK KLIK DISINI</span>
          </div>
        </motion.div>

        {/* Timestamp / Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-[-20px] right-[-20px] bg-black/80 backdrop-blur-md px-6 py-2 rounded-tl-[2rem] border-t-2 border-l-2 border-white/30 shadow-2xl"
        >
          <span className="text-white font-black text-3xl sm:text-4xl tracking-tighter">14.25</span>
        </motion.div>
      </div>
    </div>
  );
};


// --- End of Components ---


const GlobalWarmingAnimation = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="my-12 w-full max-w-5xl mx-auto aspect-video rounded-[3rem] bg-gradient-to-b from-[#1e40af] via-[#3b82f6] to-[#93c5fd] border-[8px] border-black shadow-[16px_16px_0_#000] overflow-hidden relative font-sans select-none ring-8 ring-white/10 group">
      {/* Background Atmosphere Layers */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#fff_1px,_transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Tepi Atmosfer (Atmosphere Edge) */}
      <motion.div 
        animate={{ 
          borderColor: isActive ? 'rgba(239, 68, 68, 0.7)' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: isActive ? 'rgba(127, 29, 29, 0.2)' : 'rgba(30, 64, 175, 0.1)',
          boxShadow: isActive ? '0 0 80px rgba(239, 68, 68, 0.4)' : '0 0 40px rgba(255, 255, 255, 0.1)'
        }}
        className="absolute w-[220%] h-[220%] top-[40%] left-[-60%] rounded-full border-[30px] border-white/30 transition-all duration-2000 ease-in-out z-10"
      >
        {/* Label: Radiasi diteruskan ke angkasa */}
        {!isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-[5%] left-[55%] -translate-x-1/2 bg-yellow-400 text-black text-[12px] font-black px-6 py-2 rounded-xl border-4 border-black shadow-[6px_6px_0_#000] z-50 transform rotate-2"
          >
           RADIASI DITERUSKAN KE ANGKASA
          </motion.div>
        )}
      </motion.div>

      {/* Sun - High Quality */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          filter: ["brightness(1) blur(0px)", "brightness(1.2) blur(1px)", "brightness(1) blur(0px)"]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-8 z-50 cursor-pointer"
      >
        <div className="relative">
          {/* Sun Body */}
          <div className="w-40 h-40 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-[0_0_100px_rgba(251,191,36,0.6)] relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.8)_0%,_transparent_60%)]" />
          </div>
          {/* Static Rays Decor */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 w-4 h-64 bg-gradient-to-t from-transparent via-yellow-400/20 to-transparent transform -translate-x-1/2 -translate-y-1/2 origin-center"
              style={{ rotate: `${i * 30}deg` }}
            />
          ))}
          {/* Sun Eyes/Face - Optional Cute Touch like Canva */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
             <div className="w-3 h-3 bg-black rounded-full animate-bounce" />
             <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </motion.div>

      {/* Dynamic Clouds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 40, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 text-white/40 drop-shadow-lg"
          style={{ 
            top: `${10 + i * 8}%`, 
            left: `${10 + i * 20}%`,
            scale: 1 + (i % 2) * 0.5
          }}
        >
          <Cloud size={60} fill="currentColor" />
        </motion.div>
      ))}

      {/* Earth Surface - Modern Perspective */}
      <div className="absolute bottom-0 w-full h-[35%] z-20">
        <div className="absolute inset-x-0 top-0 h-8 bg-black/10 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4ade80] to-[#166534] border-t-8 border-black">
          {/* Grass Texture & Hill details */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#fff_2px,_transparent_2px)] bg-[size:40px_40px]" />
          <div className="absolute top-12 left-[10%] w-[20%] h-1 bg-black/5 rounded-full" />
          <div className="absolute top-20 right-[15%] w-[15%] h-1 bg-black/5 rounded-full" />
        </div>
      </div>

      {/* Infographic Elements (Matching Prompt) */}
      <div className="absolute bottom-[20px] inset-x-0 h-56 z-40 flex items-end justify-between px-16">
        
        {/* Source 1: Deforestation */}
        <div className="flex flex-col items-center">
           <motion.div 
             animate={isActive ? { scale: [1, 1.2, 1] } : {}}
             className="relative mb-3 cursor-pointer group/item"
           >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-100 border-2 border-black px-3 py-1 text-[10px] font-black uppercase whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity rounded shadow-xl">
                 Efek Api Penggundulan
              </div>
              <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
                <div className="relative">
                  <Flame className="text-orange-500 animate-pulse scale-125" size={48} />
                  <Flame className="text-red-600 absolute inset-0 animate-bounce scale-110" size={48} />
                </div>
                <div className="w-3 h-20 bg-[#5d4037] rounded-full border-4 border-black -rotate-12 transform origin-bottom" />
              </div>
           </motion.div>
           <div className="bg-yellow-400 border-4 border-black px-6 py-2 text-[12px] font-black uppercase shadow-[6px_6px_0_#000] rotate-[-3deg]">
              PENGGUNDULAN HUTAN
           </div>
        </div>

        {/* Source 2: CFC Spray */}
        <div className="flex flex-col items-center pb-8">
           <div className="relative mb-4 group/cfc">
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [1, 2.5], x: [10, 30], y: [-10, -40] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-white/50 blur-xl rounded-full"
              />
              <div className="w-12 h-24 bg-gradient-to-r from-slate-200 to-slate-400 border-4 border-black rounded-2xl relative shadow-2xl">
                 <div className="absolute top-0 w-full h-6 bg-slate-500 rounded-t-lg border-b-4 border-black" />
                 <div className="absolute top-8 w-full h-1 bg-black/10" />
              </div>
           </div>
           <div className="bg-yellow-400 border-4 border-black px-8 py-2 text-[14px] font-black uppercase shadow-[8px_8px_0_#000]">
              CFC
           </div>
        </div>

        {/* Source 3: Yellow Car */}
        <div className="flex flex-col items-center pb-4">
           <div className="relative mb-4 group/car">
              <motion.div 
                animate={{ scale: [1, 1.02, 1], y: [0, -2, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-48 h-24 bg-yellow-400 border-4 border-black rounded-[2.5rem] relative shadow-2xl"
              >
                 <div className="absolute top-2 right-4 w-16 h-8 bg-blue-200/40 rounded-tr-[1.5rem] border-2 border-black/20" />
                 <div className="absolute bottom-[-15px] left-8 w-12 h-12 bg-black rounded-full border-[6px] border-slate-700 shadow-lg" />
                 <div className="absolute bottom-[-15px] right-8 w-12 h-12 bg-black rounded-full border-[6px] border-slate-700 shadow-lg" />
               </motion.div>
               {/* Exhaust Particles */}
               {[...Array(3)].map((_, i) => (
                 <motion.div 
                   key={i}
                   animate={{ 
                     x: [-10, -80], 
                     y: [-10, -40], 
                     opacity: [0, 0.7, 0], 
                     scale: [1, 3] 
                   }}
                   transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
                   className="absolute left-[-20px] bottom-4 w-6 h-6 bg-slate-600 rounded-full blur-[3px]" 
                 />
               ))}
           </div>
           <div className="bg-yellow-400 border-4 border-black p-3 text-[10px] font-black uppercase text-center w-48 shadow-[8px_8px_0_#000]">
              MESIN PENGGUNA<br/>BENSIN DAN MINYAK
           </div>
        </div>

        {/* Source 4: Double Factory Cerobong */}
        <div className="flex flex-col items-center">
           <div className="flex gap-4 items-end mb-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="w-12 h-40 bg-orange-100 border-4 border-black rounded-t-2xl relative shadow-xl">
                   {/* Thick Professional Smoke */}
                   {[...Array(3)].map((__, j) => (
                     <motion.div 
                       key={j}
                       animate={{ 
                         y: [-20, -180], 
                         opacity: [0, 0.8, 0], 
                         scale: [1, 6],
                         x: [0, 40 + (j * 20)],
                         rotate: [0, 45, 90]
                       }}
                       transition={{ duration: 5, delay: j * 1.5 + i, repeat: Infinity }}
                       className="absolute top-[-30px] left-0 w-12 h-12 bg-slate-700 rounded-full blur-[15px]"
                     />
                   ))}
                </div>
              ))}
              <div className="w-24 h-24 bg-red-600 border-4 border-black rounded-2xl relative shadow-xl">
                 <div className="absolute inset-2 grid grid-cols-2 gap-2">
                    <div className="bg-blue-100/30 rounded" />
                    <div className="bg-blue-100/30 rounded" />
                    <div className="bg-blue-100/30 rounded" />
                    <div className="bg-blue-100/30 rounded" />
                 </div>
              </div>
           </div>
           <div className="bg-yellow-400 border-4 border-black p-3 text-[10px] font-black uppercase text-center w-52 shadow-[8px_8px_0_#000]">
              BAHAN BAKAR FOSIL<br/>DAN GAS RUMAH KACA
           </div>
        </div>
      </div>

      {/* Radiation Rays - Optimized Infographic Style */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Sinar Sinar Matahari (Sunlight) */}
        {/* 1. Sinar Diserap Bumi */}
        <Ray start={{ x: 120, y: 120 }} end={{ x: 450, y: 550 }} label="Sinar Diserap Bumi" delay={0} color="#fbbf24" glow />
        
        {/* 2. Sinar Dipantulkan */}
        <Ray 
          start={{ x: 100, y: 100 }} 
          segments={[{ x: 350, y: 400 }, { x: -300, y: 100 }]} 
          label="Sinar Dipantulkan" 
          delay={2}
          color="#fef3c7" 
        />

        {/* 3. Sinar Diserap Atmosfer */}
        <Ray 
          start={{ x: 180, y: 80 }} 
          segments={[{ x: 500, y: 250 }]} 
          label="Sinar Diserap Atmosfer" 
          delay={4}
          color="#fbbf24" 
        />

        {/* 4. Interaction based on Mode */}
        <AnimatePresence>
          {isActive ? (
            <>
              {/* Sinar Terjebak (Trapped) */}
              <Ray 
                start={{ x: 200, y: 150 }} 
                segments={[
                  { x: 550, y: 550 }, 
                  { x: 850, y: 350 }, // Bounces at atmosphere
                  { x: 700, y: 550 }  // Back to earth
                ]} 
                label="Radiasi Diserap Oleh Gas Rumah Kaca" 
                color="#ff4d4d" 
                delay={1}
                glow 
              />
              
              {/* Trapped Label Popup */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                 animate={{ opacity: 1, scale: 1, rotate: 5 }}
                 exit={{ opacity: 0, scale: 0.5 }}
                 className="absolute top-[35%] right-[25%] bg-[#ef4444] text-white border-4 border-black p-5 text-[14px] font-black max-w-[200px] text-center shadow-[10px_10px_0_#000] z-50 rounded-2xl"
              >
                 RADIASI DISERAB OLEH GAS RUMAH KACA!
              </motion.div>

              {/* Heat Haze Effect */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-red-600/5 mix-blend-overlay"
              >
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -100], opacity: [0, 0.4, 0], scaleX: [1, 1.5, 1] }}
                    transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
                    className="absolute bottom-[35%] w-20 h-40 bg-orange-400/20 blur-[40px]"
                    style={{ left: `${i * 7}%` }}
                  />
                ))}
              </motion.div>
            </>
          ) : (
            /* Radiasi Terusan (Normal) */
            <Ray 
              start={{ x: 250, y: 100 }} 
              segments={[{ x: 500, y: 550 }, { x: 800, y: -200 }]} 
              label="Radiasi Diteruskan ke Angkasa" 
              delay={1.5}
              color="#fff" 
            />
          )}
        </AnimatePresence>
      </div>

      {/* Control Overlay - Pop-up Canva Style */}
      <AnimatePresence>
        {!isActive && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[60] w-full max-w-2xl px-8"
          >
            <div className="bg-white/95 backdrop-blur-3xl p-10 rounded-[4rem] border-[6px] border-black shadow-[20px_20px_0_rgba(0,0,0,0.4)] flex flex-col items-center text-center gap-8 relative">
               {/* Decorative Sparkle */}
               <div className="absolute top-[-20px] left-[10%] text-yellow-400 animate-spin-slow"><Star size={40} fill="currentColor" /></div>
               <div className="absolute top-10 right-[-20px] text-blue-400 animate-bounce"><Star size={30} fill="currentColor" /></div>

               <div className="space-y-2">
                 <h4 className="text-4xl font-black text-black italic tracking-tighter uppercase leading-none">
                   PROSES EFEK RUMAH KACA
                 </h4>
                 <p className="text-[12px] font-black text-blue-600 uppercase tracking-[0.4em] animate-pulse">
                   INTERACTIVE ANIMATION TUTORIAL
                 </p>
               </div>

               <button 
                 onClick={() => setIsActive(true)}
                 className="group relative px-16 py-6 rounded-[2.5rem] font-black text-2xl border-4 border-black transition-all duration-300 overflow-hidden transform hover:scale-105 active:scale-95 bg-[#fbbf24] text-black shadow-[10px_10px_0_#92400e]"
               >
                 <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 <div className="flex items-center gap-4">
                   <Play size={32} fill="currentColor" />
                   <span>AKTIFKAN GAS RUMAH KACA</span>
                 </div>
               </button>

               <p className="text-[13px] font-bold text-slate-500 max-w-md leading-relaxed">
                 Klik tombol di atas untuk menyalakan emisi dan melihat bagaimana radiasi panas terperangkap di atmosfer bumi.
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Stop Button when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-8 right-8 z-[70] flex flex-col items-end gap-4"
          >
            <button
              onClick={() => setIsActive(false)}
              className="bg-red-600 text-white px-8 py-4 rounded-3xl border-4 border-black shadow-[6px_6px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 transition-all font-black uppercase text-sm flex items-center gap-3"
            >
              <Pause size={20} fill="currentColor" />
              <span>HENTIKAN SIMULASI</span>
            </button>
            
            <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border-2 border-white/20 text-right shadow-2xl space-y-2">
               <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Earth Temperature Status</p>
               <p className="text-2xl font-black text-white animate-pulse">WARMING UP!</p>
               <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["0%", "100%"] }} 
                    transition={{ duration: 10, repeat: Infinity }}
                    className="h-full bg-red-500" 
                  />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Corner Detail */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 blur-3xl rounded-tr-full pointer-events-none" />
    </div>
  );
};

// Enhanced Ray component with realistic glow & path tracing
const Ray = ({ start, end, segments, label, delay, color = "#fff7ed", glow = false }: any) => {
  const path = segments 
    ? `M ${start.x} ${start.y} ${segments.map((s: any) => `L ${s.x} ${s.y}`).join(' ')}` 
    : `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <filter id={`ray-glow-${delay}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Animated Trail Trace */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: "linear" }}
        />

        {/* Core Animated Segment */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          filter={glow ? `url(#ray-glow-${delay})` : "none"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0.2, 0], pathOffset: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: "linear" }}
        />

        {/* Head Pulse */}
        <motion.circle
           r="8"
           fill={color}
           filter={glow ? `url(#ray-glow-${delay})` : "none"}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        >
          <animateMotion 
            path={path} 
            begin={`${delay}s`} 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </motion.circle>
      </svg>
      
      {/* Modern Floating Label */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: delay + 1.5 }}
        style={{ 
          position: 'absolute', 
          left: segments ? segments[segments.length-1].x : (end?.x ?? start.x), 
          top: segments ? segments[segments.length-1].y : (end?.y ?? start.y),
          transform: 'translate(-50%, 20px)'
        }}
        className="bg-black/80 backdrop-blur-md border-2 border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider whitespace-nowrap z-50 shadow-2xl"
      >
        {label}
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    { label: 'Level Belajar', value: '12', icon: Star, color: 'text-yellow-500', bg: 'card-3d-yellow' },
    { label: 'Total XP', value: '2,450', icon: Zap, color: 'text-blue-600', bg: 'card-3d-blue' },
    { label: 'Misi Selesai', value: '8/24', icon: Target, color: 'text-purple-600', bg: 'card-3d-purple' },
    { label: 'Sertifikat', value: '5', icon: Award, color: 'text-pink-600', bg: 'card-3d-pink' },
  ];

  return (
    <div className="space-y-16 animate-fade-in pb-12 pt-8">
      {/* Introduction Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="card-3d card-3d-white p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/5 blur-3xl rounded-full" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-4 border-b-4 border-black pb-4">
              <div className="p-3 bg-yellow-400 border-2 border-black rounded-2xl shadow-[4px_4px_0_#000]">
                <Sparkles size={32} className="text-black" />
              </div>
              <h2 className="balloon-title text-4xl">Pendahuluan</h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-slate-800 font-medium">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Selamat datang di Media Pembelajaran Kimia Interaktif. 
                Aplikasi ini dirancang untuk membantu siswa SMA memahami konsep-konsep kimia dengan cara yang lebih mudah, menarik, dan menyenangkan.
              </p>
              
              <p>
                Pembelajaran kimia sering kali dianggap sulit karena banyaknya rumus, konsep abstrak, dan proses mikroskopis yang tidak terlihat langsung. 
                Melalui media ini, Anda akan dibimbing untuk mempelajari kimia secara visual, interaktif, dan aplikatif sesuai kebutuhan pembelajaran di kelas X, XI, dan XII.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                <div className="bg-blue-50 p-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0_#000] rotate-[-1deg]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white border-2 border-black rounded-lg">
                      <Cpu size={20} className="text-blue-600" />
                    </div>
                    <h4 className="font-black text-sm uppercase">Kekuatan AI</h4>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Media ini menggabungkan kekuatan kecerdasan buatan, animasi, simulasi, dan latihan soal sehingga Anda dapat belajar secara mandiri maupun didampingi guru.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0_#000] rotate-[1deg]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white border-2 border-black rounded-lg">
                      <LayoutDashboard size={20} className="text-yellow-600" />
                    </div>
                    <h4 className="font-black text-sm uppercase">Tampilan Modern</h4>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Dengan tampilan yang modern dan interaktif, diharapkan pembelajaran kimia dapat menjadi lebih menyenangkan dan mudah dipahami.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grade Selection Section */}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b-4 border-black pb-4">
          <div className="p-3 bg-blue-500 border-2 border-black rounded-2xl shadow-[4px_4px_0_#000]">
            <BookOpen size={32} className="text-white" />
          </div>
          <h2 className="balloon-title text-4xl">Pilih Jenjang Materi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['X', 'XI', 'XII'].map((g, i) => (
            <Link 
              key={g}
              to={`/curriculum/${g}`} 
              className={cn(
                "card-3d p-8 flex flex-col items-center text-center gap-6 group hover:translate-y-[-8px] transition-all",
                i === 0 ? "card-3d-blue" : i === 1 ? "card-3d-green" : "card-3d-orange"
              )}
            >
              <div className="w-20 h-20 bg-white border-4 border-black rounded-[2rem] flex items-center justify-center shadow-[6px_6px_0_#000] group-hover:rotate-12 transition-transform">
                <span className="text-4xl font-black">{g}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Kelas {g}</h3>
                <p className="text-xs font-bold text-black/60 uppercase tracking-widest">Klik untuk lihat materi</p>
              </div>
              <div className="w-full h-2 bg-black/15 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  className="h-full bg-black/20" 
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const CurriculumView = ({ isPremium }: { isPremium: boolean }) => {
  const { gradeId } = useParams<{ gradeId: string }>();
  const [selectedGrade, setSelectedGrade] = useState<'X' | 'XI' | 'XII'>(
    (gradeId as 'X' | 'XI' | 'XII') || 'X'
  );

  useEffect(() => {
    if (gradeId) {
      setSelectedGrade(gradeId as 'X' | 'XI' | 'XII');
    }
  }, [gradeId]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null);
  const [showTransformer, setShowTransformer] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedData, setTransformedData] = useState<{ summary?: string, formulas?: string, story?: string, questions?: string }>({});
  const [activeVersion, setActiveVersion] = useState<'original' | 'summary' | 'formulas' | 'story' | 'questions'>('original');

  const categories = [
    { name: 'Materi Biasa', icon: BookOpen, color: 'card-3d-blue' },
    { name: 'Kumpulan Rumus', icon: Zap, color: 'card-3d-orange' },
  ];

  const handleAutoTransform = async () => {
    if (!selectedChapter || !ai) return;
    
    setIsTransforming(true);
    const originalContent = selectedChapter.content?.[selectedCategory || 'Materi Biasa'] || "";
    
    try {
      const prompt = `
        Tugas Anda:
        Olah teks materi kimia berikut menjadi 4 versi: Ringkasan, Kumpulan Rumus, Materi Cerita, dan Contoh Soal (C1-C6).
        
        Materi: ${originalContent}
        
        Aturan Output:
        Berikan output dalam format JSON dengan key: "summary", "formulas", "story", "questions".
        
        1. summary: Super Ringkas & Mudah Dipahami. Tulis ulang materi menjadi lebih singkat, padat, dan langsung ke inti konsep. Sertakan poin-poin penting dan contoh sederhana.
        2. formulas: Ambil semua rumus, persamaan reaksi, persamaan matematis. Tampilkan dalam format: Daftar Rumus, Keterangan variabel, Contoh penggunaan.
        3. story: Kreatif, Mengalir, Mudah Dipahami. Gunakan tokoh, analogi, dan dialog ringan. Visualisasikan konsep (misal atom sebagai planet). Struktur: Judul Cerita, Tokoh cerita, Alur cerita 5 paragraf, Kesimpulan konsep.
        4. questions: Buat 6 variasi soal latihan berdasarkan Bloom's Taxonomy (C1-C6):
           - C1 (Mengingat): Soal definisi/fakta.
           - C2 (Memahami): Soal penjelasan konsep.
           - C3 (Menerapkan): Soal hitungan dasar/aplikasi.
           - C4 (Menganalisis): Soal perbandingan/analisis data.
           - C5 (Mengevaluasi): Soal penilaian/argumen ilmiah.
           - C6 (Mencipta): Soal rancangan percobaan/hipotesis.
           Sertakan juga "Soal Cakaran" (soal hitungan kompleks yang membutuhkan langkah-langkah penyelesaian detail).
           Format: Gunakan Markdown dengan heading untuk setiap level C1-C6.
        
        PENTING: Gunakan format Markdown di dalam string JSON untuk setiap versi agar tampilan rapi dengan heading & bullet.
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(result.text);
      setTransformedData(data);
      setActiveVersion('summary');
      toast.success("✔️ Materi berhasil diubah!");
    } catch (error: any) {
      console.error("Transformation error:", error);
      if (error?.message?.includes('RESOURCE_EXHAUSTED') || error?.status === 429) {
        toast.error("⚠️ Kuota AI habis. Silakan coba lagi dalam beberapa menit atau hubungi admin.");
      } else {
        toast.error("Gagal mengubah materi.");
      }
    } finally {
      setIsTransforming(false);
    }
  };

  if (selectedChapter) {
    const originalContent = selectedChapter.content?.[selectedCategory || ''] || "Materi sedang dalam tahap penyusunan. Mohon tunggu pembaruan berikutnya!";
    
    let displayContent = originalContent;
    if (activeVersion === 'summary') displayContent = transformedData.summary || "Memproses ringkasan...";
    if (activeVersion === 'formulas') displayContent = transformedData.formulas || "Memproses rumus...";
    if (activeVersion === 'story') displayContent = transformedData.story || "Memproses cerita...";
    if (activeVersion === 'questions') displayContent = transformedData.questions || "Memproses contoh soal...";

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        {showTransformer && (
          <MaterialTransformer 
            chapter={selectedChapter} 
            category={selectedCategory || ''} 
            content={displayContent} 
            onClose={() => setShowTransformer(false)} 
          />
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b-4 border-black pb-6 gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setSelectedChapter(null);
                setTransformedData({});
                setActiveVersion('original');
              }}
              className="p-3 bg-white border-4 border-black rounded-2xl font-black text-xs shadow-[4px_4px_0_#000] hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center"
            >
              <ChevronRight className="rotate-180" size={20} />
            </button>
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{selectedCategory} • Kelas {selectedGrade}</span>
              <h2 className="balloon-title text-3xl">{selectedChapter.title}</h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleAutoTransform}
              disabled={isTransforming}
              className="flex items-center gap-3 px-6 py-3 bg-purple-600 text-white border-4 border-black rounded-2xl font-black text-sm shadow-[6px_6px_0_#4c1d95] hover:translate-y-[-2px] active:translate-y-[0px] transition-all disabled:opacity-50"
            >
              {isTransforming ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              UBAH MATERI OTOMATIS
            </button>
            <button 
              onClick={() => setShowTransformer(true)}
              className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-2xl font-black text-sm shadow-[6px_6px_0_#1e3a8a] hover:translate-y-[-2px] active:translate-y-[0px] transition-all"
            >
              <Zap size={18} />
              TRANSFORMASI VISUAL
            </button>
          </div>
        </div>

        {Object.keys(transformedData).length > 0 && (
          <div className="flex flex-wrap gap-3 bg-slate-100 p-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000]">
            <button 
              onClick={() => setActiveVersion('original')}
              className={cn(
                "px-4 py-2 rounded-xl font-black text-xs border-2 border-black transition-all",
                activeVersion === 'original' ? "bg-black text-white" : "bg-white text-black hover:bg-slate-50"
              )}
            >
              Materi Asli
            </button>
            <button 
              onClick={() => setActiveVersion('formulas')}
              className={cn(
                "px-4 py-2 rounded-xl font-black text-xs border-2 border-black transition-all",
                activeVersion === 'formulas' ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-slate-50"
              )}
            >
              Tampilkan Kumpulan Rumus
            </button>
            <button 
              onClick={() => setActiveVersion('questions')}
              className={cn(
                "px-4 py-2 rounded-xl font-black text-xs border-2 border-black transition-all",
                activeVersion === 'questions' ? "bg-orange-500 text-white" : "bg-white text-black hover:bg-slate-50"
              )}
            >
              Tampilkan Contoh Soal (C1-C6)
            </button>
          </div>
        )}

        <div className="card-3d card-3d-white p-8 md:p-12 min-h-[400px]">
          {isTransforming ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 className="animate-spin text-purple-600" size={48} />
              <p className="font-black text-slate-500 uppercase tracking-widest animate-pulse">AI sedang meracik materi...</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <div className="mb-6">
                {activeVersion !== 'original' && (
                  <div className="inline-block px-4 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    Versi AI: {activeVersion === 'summary' ? 'Ringkasan' : activeVersion === 'formulas' ? 'Rumus' : 'Cerita'}
                  </div>
                )}
              </div>
              {displayContent.includes('[ANIMASI_PROSES_PEMANASAN_GLOBAL]') ? (
                <>
                  <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {displayContent.split('[ANIMASI_PROSES_PEMANASAN_GLOBAL]')[0]}
                  </Markdown>
                  <GlobalWarmingAnimation />
                  <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {displayContent.split('[ANIMASI_PROSES_PEMANASAN_GLOBAL]')[1]}
                  </Markdown>
                </>
              ) : selectedChapter?.id === 'green-chemistry' ? (
                renderGreenChemistryContent(displayContent)
              ) : selectedChapter?.id === 'basic-laws' ? (
                renderBasicLawsContent(displayContent, () => {
                  if (Object.keys(transformedData).length === 0) {
                    handleAutoTransform();
                  } else {
                    setActiveVersion('questions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                })
              ) : (
                <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{displayContent}</Markdown>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <div className="space-y-12 animate-fade-in py-8">
        <h2 className="balloon-title text-4xl text-center mb-16">Pilih Jenis Materi</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedCategory(cat.name)}
              className={cn("card-3d cursor-pointer group hover:scale-105 transition-all text-center p-4 sm:p-6 flex flex-col items-center justify-center min-h-[160px] sm:min-h-[200px]", cat.color)}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 shadow-[4px_4px_0_#000] group-hover:rotate-12 transition-transform">
                <cat.icon size={24} className="text-slate-900 sm:size-32" />
              </div>
              <h3 className="text-sm sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-black pb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="p-3 bg-white border-4 border-black rounded-2xl font-black text-xs shadow-[4px_4px_0_#000] hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center"
            title="Kembali ke Pilihan Materi"
          >
            <ChevronRight className="rotate-180" size={20} />
          </button>
          <h2 className="balloon-title text-3xl">{selectedCategory}</h2>
        </div>
        <div className="flex justify-start gap-3">
          {['X', 'XI', 'XII'].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g as any)}
              className={cn(
                "px-6 py-3 text-sm font-black transition-all border-4 border-black rounded-xl shadow-[4px_4px_0_#000] hover:translate-y-[-2px] active:translate-y-[0px]",
                selectedGrade === g 
                  ? "bg-black text-white" 
                  : "bg-white text-slate-600 hover:text-slate-900"
              )}
            >
              Kelas {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chemistryData.grades[selectedGrade]?.chapters?.map((ch, i) => {
          const isLocked = !isPremium && i > 1;
          const colors = ['card-3d-blue', 'card-3d-green', 'card-3d-orange', 'card-3d-purple', 'card-3d-pink', 'card-3d-yellow'];
          const cardColor = colors[i % colors.length];
          
          return (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !isLocked && setSelectedChapter(ch)}
              className={cn(
                "card-3d p-0 overflow-hidden group relative cursor-pointer",
                cardColor,
                isLocked && "opacity-70 grayscale-[0.5] cursor-not-allowed"
              )}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="p-3 bg-yellow-400 rounded-full border-2 border-black shadow-[2px_2px_0_#000] mb-4">
                    <Award className="text-black" size={32} />
                  </div>
                  <p className="text-sm font-black text-white uppercase tracking-widest drop-shadow-[2px_2px_0_#000]">Materi Premium</p>
                  <Link to="/premium" className="mt-4 px-4 py-2 bg-white text-black text-xs font-black rounded-xl border-2 border-black shadow-[4px_4px_0_#000] hover:translate-y-[-2px] transition-all">Upgrade Akses</Link>
                </div>
              )}
              
              <div className="p-6">
                <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0_#000] text-slate-900">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight">{ch.title}</h3>
                <div className="space-y-2 mb-8">
                  {ch.topics?.map((t, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-slate-800 font-black">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t-2 border-black/10 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">12 Sub-Materi</span>
                  <div className="flex items-center gap-3">
                    {isPremium && (
                      <button className="p-2 bg-white border-2 border-black rounded-xl text-green-600 hover:bg-green-400 hover:text-black transition-all shadow-[2px_2px_0_#000]" title="Download PDF">
                        <Download size={18} />
                      </button>
                    )}
                    <button className="p-2 bg-white border-2 border-black rounded-xl text-slate-900 hover:bg-black hover:text-white transition-all shadow-[2px_2px_0_#000]">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ModelContainer = ({ isPremium }: { isPremium: boolean }) => {
  const { modelId } = useParams();
  const model = chemistryData.models.find(m => m.id === modelId);

  if (!model) return <div className="p-8 text-center text-slate-500">Modul tidak ditemukan</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="balloon-title text-2xl">{model.name}</h1>
          <p className="text-sm text-slate-500">{model.desc}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50"><Search size={18} /></button>
          <button className="p-2 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50"><Settings size={18} /></button>
        </div>
      </div>

      <div className="min-h-[60vh]">
        {modelId === 'vlab' && <VirtualLab isPremium={isPremium} />}
        {modelId === 'vca' && <AdventureView />}
        {modelId === 'ai' && <AITutor isPremium={isPremium} />}
        {modelId === 'battle' && <ChemBattle />}
        {!['vlab', 'vca', 'ai', 'battle'].includes(modelId!) && (
          <div className="card-3d card-3d-white p-20 text-center space-y-6">
            <div className="w-20 h-20 bg-white border-4 border-black rounded-3xl flex items-center justify-center mx-auto shadow-[6px_6px_0_#000]">
              <Loader2 size={40} className="text-blue-600 animate-spin" />
            </div>
            <h2 className="balloon-title text-2xl">Memuat Modul Interaktif</h2>
            <p className="text-sm font-black text-slate-600 max-w-xs mx-auto uppercase tracking-widest">Sistem sedang menyiapkan aset digital untuk {model.name}. Mohon tunggu sejenak.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

const PremiumView = ({ isPremium, setPremium, paymentStatus, setPaymentStatus, expiryDate }: { 
  isPremium: boolean, 
  setPremium: (v: boolean) => void,
  paymentStatus: 'none' | 'pending' | 'active',
  setPaymentStatus: (v: 'none' | 'pending' | 'active') => void,
  expiryDate: string | null
}) => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const benefits = [
    "Akses ke semua materi pembelajaran (X–XII)",
    "AI Assistant Unlimited (Tanya jawab tanpa batas)",
    "Penjelasan materi tingkat lanjut oleh AI",
    "Kuis & latihan premium",
    "Download modul, LKPD, dan PDF",
    "Virtual Lab terbuka semua level",
    "Mode bebas iklan",
    "Fitur ekspor tugas otomatis",
    "Update materi mingguan"
  ];

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setPaymentStatus('pending');
    }, 2000);
  };

  const simulateAdminVerify = () => {
    setPaymentStatus('active');
    setPremium(true);
  };

  if (isPremium) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="wp-card rounded-2xl p-10 text-center bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-200">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="balloon-title text-3xl mb-4">Premium Student Access Aktif</h1>
          <p className="text-slate-600 mb-8">Selamat! Anda memiliki akses penuh ke seluruh fitur ChemMaster.</p>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-yellow-200 shadow-sm">
            <Clock size={18} className="text-yellow-600" />
            <span className="text-sm font-bold text-slate-700">Aktif sampai: {expiryDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="wp-card rounded p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <InfinityIcon size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">AI Unlimited</h3>
            <p className="text-xs text-slate-500">Tanya jawab sepuasnya tanpa batas harian.</p>
          </div>
          <div className="wp-card rounded p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Download size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Download PDF</h3>
            <p className="text-xs text-slate-500">Unduh modul dan LKPD untuk belajar offline.</p>
          </div>
          <div className="wp-card rounded p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Advanced Mode</h3>
            <p className="text-xs text-slate-500">Penjelasan materi lebih mendalam dan detail.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="balloon-title text-4xl mb-8">Premium Student Access</h1>
        <p className="text-lg text-slate-600">Upgrade pengalaman belajarmu dengan fitur eksklusif</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="card-3d card-3d-yellow p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="balloon-title text-xl mb-6">Paket Langganan</h2>
            <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-black rounded-full border-2 border-black shadow-[2px_2px_0_#000]">POPULAR</span>
          </div>
          
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black text-slate-600">Rp</span>
            <span className="text-4xl font-black text-slate-900">25.000</span>
            <span className="text-slate-700 font-black">/ bulan</span>
          </div>

          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-800 font-black">
                <div className="p-1 bg-green-400 rounded-full border-2 border-black shadow-[1px_1px_0_#000]">
                  <CheckCircle size={14} className="text-black shrink-0" />
                </div>
                {b}
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setShowPaymentDetails(true)}
            className="w-full py-4 bg-black text-white rounded-xl font-black hover:translate-y-[-2px] transition-all shadow-[6px_6px_0_#444] active:translate-y-[0px]"
          >
            Upgrade Sekarang
          </button>
        </div>

        <AnimatePresence>
          {showPaymentDetails && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-3d card-3d-blue p-8 space-y-6 bg-blue-50/50"
            >
              <h2 className="balloon-title text-xl flex items-center gap-2 mb-6">
                <CreditCard className="text-blue-600" />
                Detail Pembayaran
              </h2>

              <div className="p-4 bg-white rounded-xl border border-blue-100 space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Bank</p>
                  <p className="text-sm font-bold text-slate-800">Bank Central Asia (BCA)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nomor Rekening</p>
                  <p className="text-lg font-bold text-blue-700 tracking-wider">7712-0988-12</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Atas Nama</p>
                  <p className="text-sm font-bold text-slate-800">PT Edukasi Kimia Indonesia</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  1. Kirim Rp25.000 ke rekening di atas.<br/>
                  2. Upload bukti transfer di bawah ini.<br/>
                  3. Admin akan memverifikasi dalam 3-10 menit.
                </p>

                {paymentStatus === 'pending' ? (
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-center space-y-2">
                    <Clock className="mx-auto text-orange-500 animate-pulse" />
                    <p className="text-sm font-bold text-orange-700">Menunggu Verifikasi Admin</p>
                    <p className="text-[10px] text-orange-600">Bukti transfer telah berhasil diunggah.</p>
                    <button 
                      onClick={simulateAdminVerify}
                      className="mt-2 text-[10px] font-bold text-orange-800 underline"
                    >
                      (Simulasi: Verifikasi Admin)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-all cursor-pointer bg-white">
                      <input type="file" className="hidden" id="proof-upload" onChange={handleUpload} />
                      <label htmlFor="proof-upload" className="cursor-pointer">
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="animate-spin text-blue-600" />
                            <span className="text-xs font-bold text-slate-500">Mengunggah...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <FileText className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-500">Klik untuk upload bukti transfer</span>
                            <span className="text-[10px] text-slate-400">JPG, PNG, atau PDF</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('');
  const [isPremium, setIsPremium] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'none' | 'pending' | 'active'>('active');
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);

  useEffect(() => {
    // Remove all theme classes
    const classes = document.body.className.split(' ').filter(c => c.startsWith('theme-'));
    classes.forEach(c => document.body.classList.remove(c));
    // Add current theme class
    if (theme) document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (isPremium) {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setExpiryDate(date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
      
      // Simulate 3 days left warning for demo purposes
      // In real app, this would check the actual date
      setTimeout(() => {
        setShowExpiryWarning(true);
      }, 5000);
    }
  }, [isPremium]);

  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-transparent flex">
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} isPremium={isPremium} />
        
        <main className={cn(
          "flex-1 transition-all duration-300 min-h-screen flex flex-col",
          isSidebarOpen ? "pl-64" : "pl-16"
        )}>
          <Header 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            currentTheme={theme}
            setTheme={setTheme}
            isPremium={isPremium}
          />
          
          <AnimatePresence>
            {showExpiryWarning && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-orange-500 text-white px-6 py-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Berlangganan Anda berakhir dalam 3 hari. Perpanjang sekarang?</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link to="/premium" className="text-xs font-bold underline">Perpanjang</Link>
                  <button onClick={() => setShowExpiryWarning(false)}><X size={16} /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-8 flex-1 max-w-6xl w-full mx-auto">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/curriculum" element={<CurriculumView isPremium={isPremium} />} />
                <Route path="/curriculum/:gradeId" element={<CurriculumView isPremium={isPremium} />} />
                <Route path="/model/:modelId" element={<ModelContainer isPremium={isPremium} />} />
                <Route path="/premium" element={
                  <PremiumView 
                    isPremium={isPremium} 
                    setPremium={setIsPremium} 
                    paymentStatus={paymentStatus}
                    setPaymentStatus={setPaymentStatus}
                    expiryDate={expiryDate}
                  />
                } />
                <Route path="/glossary" element={
                  <div className="space-y-8 animate-fade-in">
                    <h1 className="balloon-title text-3xl mb-12">Glosarium Kimia</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {chemistryData.glossary?.map((g, i) => {
                        const colors = ['card-3d-blue', 'card-3d-green', 'card-3d-orange', 'card-3d-purple', 'card-3d-pink', 'card-3d-yellow'];
                        const cardColor = colors[i % colors.length];
                        return (
                          <div key={i} className={cn("card-3d p-6 hover:translate-y-[-4px] transition-all", cardColor)}>
                            <h3 className="text-slate-900 font-black text-lg mb-4 border-b-2 border-black/10 pb-2">{g.term}</h3>
                            <p className="text-sm text-slate-800 font-black leading-relaxed">{g.definition}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                } />
              </Routes>
            </AnimatePresence>
          </div>

          <footer className="p-6 border-t border-[#ccd0d4] text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-white">
            <p>&copy; 2026 CHEMMASTER • Platform Pembelajaran Kimia Terpadu</p>
          </footer>
        </main>
      </div>
    </Router>
  );
}
