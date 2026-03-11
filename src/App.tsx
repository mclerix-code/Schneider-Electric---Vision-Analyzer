import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  FileImage, 
  FileText, 
  Cpu, 
  Search, 
  Zap, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  X,
  Terminal,
  Info,
  RotateCcw,
  History,
  Box,
  Copy,
  Check,
  Download
} from 'lucide-react';
import { analyzeImage } from './services/geminiService';
import { cn } from './lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SAMPLE_DIAGRAM_SVG, SAMPLE_DOCUMENT_SVG, SAMPLE_CIRCUIT_BOARD_SVG, SAMPLE_PANEL_SVG } from './constants';

type AnalysisMode = 'diagram' | 'text' | 'custom';

interface FileData {
  file: File;
  preview: string;
  base64: string;
}

interface AnalysisHistoryItem {
  id: string;
  timestamp: number;
  fileData: FileData;
  mode: AnalysisMode;
  customPrompt: string;
  selectedModel: string;
  useAgenticVision: boolean;
  useCodeExecution: boolean;
  result: string;
}

export default function App() {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [mode, setMode] = useState<AnalysisMode>('diagram');
  const [customPrompt, setCustomPrompt] = useState('');
  const [useAgenticVision, setUseAgenticVision] = useState(true);
  const [useCodeExecution, setUseCodeExecution] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3-flash-preview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        setFileData({
          file,
          preview: URL.createObjectURL(file),
          base64: base64String,
        });
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const loadExample = async (type: 'diagram' | 'document' | 'circuit' | 'panel') => {
    try {
      let svgString = '';
      let filename = '';
      
      if (type === 'diagram') {
        svgString = SAMPLE_DIAGRAM_SVG;
        filename = 'motor-control-circuit.png';
      } else if (type === 'document') {
        svgString = SAMPLE_DOCUMENT_SVG;
        filename = 'altivar-spec.png';
      } else if (type === 'circuit') {
        svgString = SAMPLE_CIRCUIT_BOARD_SVG;
        filename = 'circuit-board.png';
      } else if (type === 'panel') {
        svgString = SAMPLE_PANEL_SVG;
        filename = 'electrical-panel.png';
      }
      
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          const base64 = dataUrl.split(',')[1];
          
          const byteString = atob(base64);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: 'image/png' });
          const file = new File([blob], filename, { type: 'image/png' });

          setFileData({
            file,
            preview: dataUrl,
            base64,
          });
          setMode(type === 'document' ? 'text' : 'diagram');
          setResult(null);
          setError(null);
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (err) {
      console.error("Failed to load example", err);
    }
  };

  const handleAnalyze = async () => {
    if (!fileData) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    let prompt = '';
    switch (mode) {
      case 'diagram':
        prompt = 'Analyze this technical diagram or schematic. Identify the main components, their connections, and the overall function of the system. Provide a structured breakdown suitable for a Schneider Electric engineer.';
        break;
      case 'text':
        prompt = 'Extract all text from this document or image. Preserve the formatting and layout as much as possible. If there are tables, format them as markdown tables.';
        break;
      case 'custom':
        prompt = customPrompt;
        break;
    }

    try {
      const responseText = await analyzeImage(
        fileData.base64, 
        fileData.file.type, 
        prompt, 
        selectedModel, 
        useAgenticVision,
        useCodeExecution
      );
      setResult(responseText || 'No analysis result returned.');
      
      if (responseText) {
        const newHistoryItem: AnalysisHistoryItem = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          fileData,
          mode,
          customPrompt,
          selectedModel,
          useAgenticVision,
          useCodeExecution,
          result: responseText
        };
        setHistory(prev => [newHistoryItem, ...prev]);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearFile = () => {
    setFileData(null);
    setResult(null);
    setError(null);
  };

  const loadHistoryItem = (item: AnalysisHistoryItem) => {
    setFileData(item.fileData);
    setMode(item.mode);
    setCustomPrompt(item.customPrompt);
    setSelectedModel(item.selectedModel);
    setUseAgenticVision(item.useAgenticVision);
    setUseCodeExecution(item.useCodeExecution);
    setResult(item.result);
    setError(null);
    setIsHistoryOpen(false);
  };

  const handleClearAll = () => {
    setFileData(null);
    setMode('diagram');
    setCustomPrompt('');
    setUseAgenticVision(true);
    setUseCodeExecution(false);
    setSelectedModel('gemini-3-flash-preview');
    setResult(null);
    setError(null);
    setIsFullscreen(false);
    setIsCopied(false);
  };

  const handleCopyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleSavePdf = async () => {
    if (!reportRef.current) return;
    
    setIsGeneratingPdf(true);
    try {
      const element = reportRef.current;
      
      // Temporarily move the element on-screen but hidden behind the main content
      // This ensures html2canvas can properly render it without clipping
      const originalCssText = element.style.cssText;
      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';
      element.style.zIndex = '-50';
      
      // Use html2canvas to capture the report container
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
        windowHeight: element.scrollHeight,
      });
      
      // Restore the original styles immediately after capture
      element.style.cssText = originalCssText;
      
      const dataUrl = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Add subsequent pages if the content is longer than one page
      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('analysis-report.pdf');
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-slate-900 flex flex-col print:bg-white print:text-black">
      {/* Header */}
      <header className="bg-[#000000] text-white py-4 px-6 shadow-md flex items-center justify-between sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3DCD58] rounded-sm flex items-center justify-center">
            <Zap className="text-black w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Schneider Electric <span className="text-[#3DCD58] font-light">Vision Analyzer</span></h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10"
            title="View analysis history"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </button>
          <button 
            onClick={handleClearAll}
            className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10"
            title="Reset all settings and clear file"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
          <div className="text-sm text-slate-400 hidden sm:block border-l border-slate-700 pl-4">
            Powered by {selectedModel === 'gemini-3.1-pro-preview' ? 'Gemini 3.1 Pro' : 'Gemini 3 Flash'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:p-0 print:max-w-none">
        
        {/* Left Column: Upload & Preview */}
        <div className="lg:col-span-5 flex flex-col gap-6 print:block print:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px] lg:h-[600px] print:border-none print:shadow-none print:min-h-0 print:h-auto print:block">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center print:hidden">
              <h2 className="font-medium text-slate-800 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#3DCD58]" />
                Source Document
              </h2>
              {fileData && (
                <button 
                  onClick={clearFile}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                  title="Clear file"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex-1 p-6 flex flex-col relative print:p-0 print:block">
              {!fileData ? (
                <div 
                  {...getRootProps()} 
                  className={cn(
                    "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-200",
                    isDragActive ? "border-[#3DCD58] bg-[#3DCD58]/5" : "border-slate-300 hover:border-[#3DCD58]/50 hover:bg-slate-50"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-medium text-slate-700 mb-2">
                    Drag & drop your file here
                  </p>
                  <p className="text-sm text-slate-500 mb-6 max-w-[250px]">
                    Supports images (JPG, PNG, WEBP) and PDF documents
                  </p>
                  <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                    Browse Files
                  </button>

                  <div className="mt-8 pt-6 border-t border-slate-200 w-full max-w-md">
                    <p className="text-sm font-medium text-slate-500 mb-4">Or try an example:</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                      <button 
                        onClick={(e) => { e.stopPropagation(); loadExample('diagram'); }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-white hover:border-[#3DCD58] hover:text-[#005F30] transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        Sample Diagram
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); loadExample('circuit'); }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-white hover:border-[#3DCD58] hover:text-[#005F30] transition-colors"
                      >
                        <Cpu className="w-4 h-4" />
                        Circuit Board
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); loadExample('panel'); }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-white hover:border-[#3DCD58] hover:text-[#005F30] transition-colors"
                      >
                        <Box className="w-4 h-4" />
                        Elec. Panel
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); loadExample('document'); }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-white hover:border-[#3DCD58] hover:text-[#005F30] transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Sample Document
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col h-full print:block print:h-auto">
                  <div className="hidden print:block mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Analysis Report</h1>
                    <p className="text-slate-500">Generated on {new Date().toLocaleString()}</p>
                    <div className="h-px w-full bg-slate-200 mt-4 mb-6"></div>
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-lg overflow-hidden relative flex items-center justify-center border border-slate-200 print:bg-transparent print:border-none print:block print:h-auto print:overflow-visible print:break-inside-avoid">
                    {fileData.file.type === 'application/pdf' ? (
                      <div className="flex flex-col items-center text-slate-500 print:hidden">
                        <FileText className="w-16 h-16 mb-4 text-red-400" />
                        <p className="font-medium">{fileData.file.name}</p>
                        <p className="text-xs mt-1">PDF Document</p>
                      </div>
                    ) : (
                      <div 
                        className="relative w-full h-full flex items-center justify-center cursor-zoom-in group print:block print:h-auto"
                        onClick={() => setIsFullscreen(true)}
                      >
                        <img 
                          src={fileData.preview} 
                          alt="Preview" 
                          className="max-w-full max-h-full object-contain transition-opacity group-hover:opacity-90 print:max-h-[400px] print:object-left-top"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 print:hidden">
                          <div className="bg-white/90 text-slate-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Click to zoom
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 print:hidden">
                    <span className="truncate max-w-[200px] font-medium text-slate-700">{fileData.file.name}</span>
                    <span>{(fileData.file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Results */}
        <div className="lg:col-span-7 flex flex-col gap-6 print:block">
          
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 print:hidden">
            <h2 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#3DCD58]" />
              Analysis Configuration
            </h2>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { id: 'diagram', icon: Zap, label: 'Diagrams' },
                { id: 'text', icon: FileText, label: 'Extract Text' },
                { id: 'custom', icon: FileImage, label: 'Custom' },
              ].map((m) => {
                const Icon = m.icon;
                const isActive = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id as AnalysisMode)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200",
                      isActive 
                        ? "border-[#3DCD58] bg-[#3DCD58]/5 text-[#005F30]" 
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <Icon className={cn("w-6 h-6 mb-2", isActive ? "text-[#3DCD58]" : "text-slate-400")} />
                    <span className="text-xs font-medium">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {mode === 'custom' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Custom Prompt
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="E.g., Identify any safety hazards in this installation..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#3DCD58] focus:border-transparent outline-none resize-none h-24 text-sm"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => {
                  const newModel = e.target.value;
                  setSelectedModel(newModel);
                  if (newModel === 'gemini-3.1-pro-preview') {
                    setUseCodeExecution(false);
                  }
                }}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#3DCD58] focus:border-transparent outline-none text-sm bg-white"
              >
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Advanced Reasoning)</option>
                <option value="gemini-3-flash-preview">Gemini 3 Flash (Fast & Code Execution)</option>
              </select>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-800">Agentic Vision (Deep Reasoning)</span>
                  <span className="text-xs text-slate-500">Enable advanced reasoning for complex diagrams</span>
                </div>
                <button
                  onClick={() => setUseAgenticVision(!useAgenticVision)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#3DCD58] focus:ring-offset-2",
                    useAgenticVision ? "bg-[#3DCD58]" : "bg-slate-300"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      useAgenticVision ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {selectedModel !== 'gemini-3.1-pro-preview' && (
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800 flex items-center gap-1">
                      <Terminal className="w-3 h-3"/> 
                      Code Execution
                      <div className="group relative flex items-center">
                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help ml-0.5" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-20 text-center font-normal">
                          Enables Python code execution for advanced analysis and calculations.
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                        </div>
                      </div>
                    </span>
                    <span className="text-xs text-slate-500">Allow AI to run Python code for calculations</span>
                  </div>
                  <button
                    onClick={() => setUseCodeExecution(!useCodeExecution)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#3DCD58] focus:ring-offset-2",
                      useCodeExecution ? "bg-[#3DCD58]" : "bg-slate-300"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        useCodeExecution ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!fileData || isAnalyzing || (mode === 'custom' && !customPrompt.trim())}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200",
                !fileData || isAnalyzing || (mode === 'custom' && !customPrompt.trim())
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-[#3DCD58] hover:bg-[#34b54c] text-white shadow-sm hover:shadow"
              )}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing with Gemini...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Run Analysis
                </>
              )}
            </button>
          </div>

          {/* Results Area */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col min-h-[400px] print:border-none print:shadow-none print:block print:min-h-0">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between print:hidden">
              <h2 className="font-medium text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3DCD58]" />
                Analysis Results
              </h2>
              {result && <span className="text-xs font-medium text-[#3DCD58] bg-[#3DCD58]/10 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Complete</span>}
            </div>
            
            <div className="p-6 flex-1 overflow-auto relative print:p-0 print:overflow-visible">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 border border-red-100"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Analysis Failed</h3>
                      <p className="text-sm opacity-90">{error}</p>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative print:block"
                  >
                    <div className="absolute top-0 right-0 z-10 flex items-center gap-2 print:hidden">
                      <button
                        onClick={handleSavePdf}
                        disabled={isGeneratingPdf}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-md transition-colors shadow-sm",
                          isGeneratingPdf ? "opacity-70 cursor-not-allowed" : "hover:bg-slate-50 hover:text-slate-900"
                        )}
                        title="Save as PDF"
                      >
                        {isGeneratingPdf ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">
                          {isGeneratingPdf ? 'Saving...' : 'Save PDF'}
                        </span>
                      </button>
                      <button
                        onClick={handleCopyResult}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                        title="Copy result to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#3DCD58]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-[#3DCD58] prose-p:leading-relaxed prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-pre:text-slate-800 prose-table:border-collapse prose-th:bg-slate-100 prose-th:border prose-th:border-slate-300 prose-th:p-2 prose-td:border prose-td:border-slate-200 prose-td:p-2 mt-2">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        urlTransform={(url) => url}
                      >
                        {result}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ) : isAnalyzing ? (
                  <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 min-h-[250px]"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
                      <div className="w-16 h-16 border-4 border-[#3DCD58] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    </div>
                    <p className="text-sm font-medium animate-pulse">Processing document...</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 min-h-[250px]"
                  >
                    <Search className="w-12 h-12 opacity-20" />
                    <p className="text-sm">Upload a document and run analysis to see results here.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-4 h-4 bg-[#3DCD58] rounded-sm"></div>
            <span>Life Is On | Schneider Electric</span>
          </div>
          <div className="text-xs text-slate-400">
            For internal demonstration purposes only.
          </div>
        </div>
      </footer>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && fileData && fileData.file.type !== 'application/pdf' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors p-2 bg-black/50 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={fileData.preview}
              alt="Fullscreen Preview"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Sidebar */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsHistoryOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  <History className="w-5 h-5 text-[#3DCD58]" /> 
                  Analysis History
                </h2>
                <button 
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                    <History className="w-12 h-12 opacity-20" />
                    <p className="text-sm">No history yet.</p>
                  </div>
                ) : (
                  history.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => loadHistoryItem(item)} 
                      className="p-3 border border-slate-200 rounded-xl cursor-pointer hover:border-[#3DCD58] hover:shadow-sm transition-all bg-white group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                          {item.fileData.file.type === 'application/pdf' ? (
                            <FileText className="w-6 h-6 text-red-400" />
                          ) : (
                            <img src={item.fileData.preview} className="w-full h-full object-cover" alt="History preview" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate group-hover:text-[#3DCD58] transition-colors">
                            {item.fileData.file.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-medium uppercase tracking-wider">
                          {item.mode}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-medium uppercase tracking-wider">
                          {item.selectedModel === 'gemini-3.1-pro-preview' ? 'Pro' : 'Flash'}
                        </span>
                        {item.useCodeExecution && (
                          <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded-md font-medium uppercase tracking-wider">
                            Code
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Hidden Report Container for PDF Generation */}
      <div className="absolute top-[-9999px] left-[-9999px] w-[800px] p-8 pdf-container" ref={reportRef}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Analysis Report</h1>
          <p className="text-[#64748b]">Generated on {new Date().toLocaleString()}</p>
          <div className="h-px w-full bg-[#e2e8f0] mt-4 mb-6"></div>
        </div>
        
        {fileData && (
          <div className="mb-8 flex justify-center">
            {fileData.file.type === 'application/pdf' ? (
              <div className="flex flex-col items-center text-[#64748b]">
                <FileText className="w-16 h-16 mb-4 text-[#f87171]" />
                <p className="font-medium">{fileData.file.name}</p>
              </div>
            ) : (
              <img 
                src={fileData.preview} 
                alt="Preview" 
                className="max-w-full max-h-[400px] object-contain"
              />
            )}
          </div>
        )}
        
        <div className="pdf-markdown">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            urlTransform={(url) => url}
          >
            {result || ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
