
import React, { useState } from 'react';
import { ImageSize, GeneratedImage } from '../types';
import { generateDoraemonImage } from '../services/geminiService';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('Doraemon shows a futuristic lightning gadget');
  const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);

  const handleApiKeyPrompt = async () => {
    if (window.aistudio?.openSelectKey) await window.aistudio.openSelectKey();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateDoraemonImage(prompt, size);
      setImages(prev => [{ url: imageUrl, prompt, timestamp: Date.now() }, ...prev]);
    } catch (err: any) {
      if (err.message === "API_KEY_RESET_REQUIRED") handleApiKeyPrompt();
      else setError(err.message || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-t-8 border-purple-500">
      <h2 className="text-4xl font-black text-purple-700 mb-8 flex items-center gap-4">
        <span className="p-3 bg-purple-100 rounded-3xl">
          <i className="fas fa-magic"></i>
        </span>
        Framtids-Kameran
      </h2>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 focus:border-purple-400 outline-none text-lg font-medium transition-all"
            placeholder="Beskriv vad du vill se..."
          />
          <select 
            value={size}
            onChange={(e) => setSize(e.target.value as ImageSize)}
            className="px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 font-bold text-slate-700"
          >
            <option value={ImageSize.SIZE_1K}>Standard</option>
            <option value={ImageSize.SIZE_2K}>High Definition</option>
            <option value={ImageSize.SIZE_4K}>Ultra Cinematic</option>
          </select>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full py-6 rounded-[2rem] font-black text-2xl text-white transition-all shadow-xl transform ${
            isGenerating ? 'bg-purple-300 scale-95' : 'bg-purple-600 hover:bg-purple-700 hover:-translate-y-1 active:scale-95'
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-4">
              <i className="fas fa-atom animate-spin"></i>
              FRAMKALLAR BILD...
            </span>
          ) : 'FOTOGRAFERA NU!'}
        </button>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 text-sm font-bold">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img) => (
            <div key={img.timestamp} className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
              <img src={img.url} className="w-full aspect-video object-cover" alt={img.prompt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="text-white font-bold text-lg mb-4">{img.prompt}</p>
                <div className="flex gap-4">
                   <a href={img.url} download className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-purple-600 transition-colors">Ladda ner</a>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && !isGenerating && (
            <div className="col-span-full py-20 bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
               <i className="fas fa-camera text-6xl mb-4 opacity-20"></i>
               <p className="font-bold text-xl uppercase tracking-widest opacity-30">Inga foton än</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
