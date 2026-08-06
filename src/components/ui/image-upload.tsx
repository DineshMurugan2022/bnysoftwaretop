"use client";

import React, { useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/media/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  if (value) {
    return (
      <div className="relative w-full h-48 rounded-md overflow-hidden border border-white/10 group">
        <img src={value} alt="Upload" className="object-cover w-full h-full" />
        {!disabled && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${disabled ? 'opacity-50 cursor-not-allowed border-white/5 bg-white/5' : 'border-white/20 bg-surface/50 hover:bg-white/5 hover:border-brand-accent/50'}`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <Loader2 className="w-10 h-10 text-brand-accent animate-spin mb-3" />
          ) : (
            <UploadCloud className="w-10 h-10 text-white/50 mb-3 group-hover:text-brand-accent transition-colors" />
          )}
          <p className="mb-2 text-sm text-white/70">
            <span className="font-semibold">{isUploading ? 'Uploading...' : 'Click to upload'}</span>
          </p>
          <p className="text-xs text-white/50">PNG, JPG or WEBP (MAX. 10MB)</p>
          {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload} 
          disabled={disabled || isUploading} 
        />
      </label>
    </div>
  );
}
