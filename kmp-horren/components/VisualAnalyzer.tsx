import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Info, ScanLine } from 'lucide-react';
import { Button } from './Button';
import { analyzeWindowImage } from '../services/geminiService';

export const VisualAnalyzer: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      processImage(base64String.split(',')[1]); // remove data:image/jpeg;base64,
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (base64Data: string) => {
    setAnalyzing(true);
    setResult(null);
    try {
      const analysis = await analyzeWindowImage(base64Data);
      setResult(analysis);
    } catch (err) {
      setResult("Er ging iets mis bij het analyseren.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white border-l-4 border-kmp-orange shadow-xl p-8 max-w-4xl mx-auto transform translate-y-0 rounded-xl">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-slate-50 border border-slate-100 text-kmp-orange shrink-0 rounded-xl">
          <ScanLine size={40} strokeWidth={1.5} />
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-kmp-blue uppercase tracking-tight mb-2">Twijfelt u over het type raam?</h3>
            <p className="text-slate-600 font-light">
                Upload een foto van uw kozijn. Onze AI-assistent analyseert de situatie en adviseert direct de perfecte hor.
            </p>
          </div>
          
          {!preview ? (
            <div className="flex flex-wrap gap-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="border-kmp-orange text-kmp-orange hover:bg-kmp-orange hover:text-white">
                <Upload size={18} className="mr-2" /> Foto Uploaden
              </Button>
               <Button onClick={() => fileInputRef.current?.click()} variant="ghost" className="text-slate-500">
                <Camera size={18} className="mr-2" /> Maak Foto
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                  <div className="relative h-32 w-32 shrink-0 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                    <img src={preview} alt="Window preview" className="object-cover w-full h-full" />
                    {analyzing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-kmp-blue/80 text-white backdrop-blur-sm">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}
                  </div>
                  
                  {result && (
                      <div className="flex-1 bg-slate-50 p-5 border border-slate-100 animate-in fade-in rounded-xl">
                          <div className="flex items-center gap-2 font-bold text-kmp-orange uppercase text-sm mb-3">
                              <Info size={16} /> Analyse Resultaat
                          </div>
                          <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                            {result.split('\n').map((line, i) => (
                                <p key={i} className="mb-1">{line}</p>
                            ))}
                          </div>
                          <button onClick={() => { setPreview(null); setResult(null); }} className="mt-4 text-xs font-bold text-slate-400 hover:text-kmp-blue uppercase underline decoration-2 underline-offset-4">
                              Nieuwe Foto
                          </button>
                      </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};