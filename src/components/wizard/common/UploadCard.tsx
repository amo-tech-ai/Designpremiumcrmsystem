import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '../../ui/utils';

interface UploadCardProps {
  label: string;
  sublabel?: string;
  accept?: string;
  onUpload?: (file: File) => void;
  previewUrl?: string;
}

export const UploadCard: React.FC<UploadCardProps> = ({ 
  label, 
  sublabel = "SVG, PNG, JPG or GIF (max. 800x400px)",
  accept = "image/*",
  onUpload,
  previewUrl: initialPreview
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(initialPreview);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
       handleFile(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    if (onUpload) onUpload(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
  };

  return (
    <div 
      className={cn(
        "relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer group hover:bg-slate-50",
        isDragOver ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input 
        id="file-upload" 
        type="file" 
        className="hidden" 
        accept={accept}
        onChange={handleFileChange}
      />
      
      {preview ? (
        <div className="relative w-full h-40 bg-slate-100 rounded-lg overflow-hidden">
           <img src={preview} alt="Preview" className="w-full h-full object-cover" />
           <button 
             onClick={clearImage}
             className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white text-slate-500 hover:text-red-500 transition-colors"
           >
             <X className="w-4 h-4" />
           </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-4">
           <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
           </div>
           <h4 className="text-sm font-semibold text-slate-900">{label}</h4>
           <p className="text-xs text-slate-500 mt-1">{sublabel}</p>
        </div>
      )}
    </div>
  );
};
