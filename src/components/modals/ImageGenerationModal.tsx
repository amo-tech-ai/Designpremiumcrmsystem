import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Sparkles, Loader2, CloudUpload, RefreshCw, Check, Image as ImageIcon } from "lucide-react";
import { cn } from "../ui/utils";
import { generateSlideImage } from "../../services/edgeFunctions";
import { uploadSlideImage } from "../../services/deckService";

interface ImageGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  initialPrompt?: string;
  slideType: string;
  slideId?: string;
}

export const ImageGenerationModal: React.FC<ImageGenerationModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  initialPrompt,
  slideType,
  slideId
}) => {
  const [activeTab, setActiveTab] = useState<"generate" | "upload">("generate");
  
  // Generation State
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<"photo" | "illustration" | "abstract" | "chart">("photo");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPrompt(initialPrompt || `A professional visual representing ${slideType.toLowerCase()} context`);
      setGeneratedImage(null);
      setUploadedImage(null);
      setActiveTab("generate");
    }
  }, [isOpen, initialPrompt, slideType]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateSlideImage({
        slideId: slideId || "temp",
        prompt,
        style
      });

      if (result && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else {
        throw new Error("Failed to generate image");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!slideId) {
       return;
    }

    setUploading(true);
    setUploadedImage(null);

    try {
      const result = await uploadSlideImage(slideId, file);
      
      if (result.error) throw result.error;
      if (result.url) {
        setUploadedImage(result.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleUseImage = () => {
    const img = activeTab === 'generate' ? generatedImage : uploadedImage;
    if (img) {
      onSelectImage(img);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Image Studio
          </DialogTitle>
          <DialogDescription>
            Create AI visuals or upload your own assets.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="generate">AI Generation</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            {/* Controls */}
            <div className="grid gap-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea 
                    id="prompt" 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="Describe the image you want..."
                    className="h-[80px] resize-none"
                  />
                </div>
                <div className="col-span-1 space-y-2">
                   <Label>Style</Label>
                   <Select value={style} onValueChange={(v: any) => setStyle(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photo">Photo</SelectItem>
                        <SelectItem value="illustration">Vector</SelectItem>
                        <SelectItem value="abstract">Abstract</SelectItem>
                        <SelectItem value="chart">Chart</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
              </div>
              
              <Button 
                 onClick={handleGenerate} 
                 disabled={loading || !prompt.trim()}
                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                 {loading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Creating your image...
                   </>
                 ) : (
                   <>
                     <Sparkles className="mr-2 h-4 w-4" />
                     Generate Image
                   </>
                 )}
              </Button>
            </div>

            {/* Preview Area */}
            <div className="aspect-video w-full rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative group">
               {loading ? (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                     <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                     <p className="text-sm animate-pulse">Designing pixel by pixel...</p>
                  </div>
               ) : generatedImage ? (
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
               ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-300">
                     <ImageIcon className="w-10 h-10" />
                     <p className="text-sm">Preview will appear here</p>
                  </div>
               )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
             <div 
                className={cn(
                  "aspect-video w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all cursor-pointer relative overflow-hidden",
                  uploadedImage ? "border-indigo-200 bg-indigo-50/10" : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"
                )}
                onClick={() => !uploading && fileInputRef.current?.click()}
             >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileUpload}
                />
                
                {uploading ? (
                   <div className="flex flex-col items-center gap-3 text-indigo-600">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <p className="text-sm font-medium">Uploading to secure storage...</p>
                   </div>
                ) : uploadedImage ? (
                   <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                   <div className="flex flex-col items-center gap-2 text-slate-400">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-500 mb-2">
                         <CloudUpload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">Click to upload image</p>
                      <p className="text-xs text-slate-400">PNG, JPG or WebP (max 5MB)</p>
                   </div>
                )}

                {uploadedImage && !uploading && (
                   <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-medium flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Click to replace
                      </p>
                   </div>
                )}
             </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          {(activeTab === 'generate' ? generatedImage : uploadedImage) && (
             <Button onClick={handleUseImage} className="gap-2">
               <Check className="w-4 h-4" />
               Use Image
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};