'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import {
  Link2,
  Upload,
  Video,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UniversalVideoPlayer } from '@/components/video/UniversalVideoPlayer';

interface VideoInputPickerProps {
  label?: string;
  helperText?: string;
  value: string;
  onChange: (url: string) => void;
}

export function VideoInputPicker({
  label = 'Video (Optional)',
  helperText = 'Add a video via YouTube/web link or upload directly from your device.',
  value,
  onChange,
}: VideoInputPickerProps) {
  const [activeTab, setActiveTab] = useState<'link' | 'upload'>('link');
  const [linkInput, setLinkInput] = useState(value || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setLinkInput(value || '');
  }, [value]);

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLinkInput(val);
    setUploadError(null);
    onChange(val.trim());
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo =
      file.type.startsWith('video/') ||
      /\.(mp4|webm|ogg|ogv|mov|m4v|mkv)$/i.test(file.name);

    if (!isVideo) {
      setUploadError('Please select a valid video file (.mp4, .webm, .mov)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setUploadError('Video file exceeds 100MB limit. Please compress before uploading.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload video');
      }

      onChange(data.url);
      setLinkInput(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error uploading video file';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setLinkInput('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDirectFile = value?.startsWith('/uploads/') || value?.startsWith('/api/uploads/') || /\.(mp4|webm|ogg|mov|m4v)$/i.test(value || '');

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-stone-50 to-white dark:from-stone-850 dark:to-stone-900 border border-stone-200/90 dark:border-stone-700/80 shadow-xs space-y-4">
      {/* Header with Title & Badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <label className="text-xs font-bold text-stone-800 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center">
              <Video className="w-3.5 h-3.5" />
            </span>
            <span>{label}</span>
          </label>
          {helperText && (
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              {helperText}
            </p>
          )}
        </div>
        {value ? (
          <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Video Ready</span>
          </span>
        ) : null}
      </div>

      {/* Segmented Control (Full Width 2 Tabs) */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
        <button
          type="button"
          onClick={() => setActiveTab('link')}
          className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'link'
              ? 'bg-white dark:bg-stone-900 text-[#E85D04] shadow-sm font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Paste Video Link</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'upload'
              ? 'bg-white dark:bg-stone-900 text-[#E85D04] shadow-sm font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload From Device</span>
        </button>
      </div>

      {/* Tab 1: Paste Link Input */}
      {activeTab === 'link' && (
        <div className="space-y-2">
          <div className="relative">
            <Link2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="url"
              value={linkInput}
              onChange={handleLinkChange}
              placeholder="e.g. https://www.youtube.com/watch?v=... or https://.../video.mp4"
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 font-medium transition-all"
            />
            {linkInput && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-rose-500 transition-colors"
                title="Clear input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-stone-400 dark:text-stone-500 font-medium">
            <span className="text-stone-500 dark:text-stone-400 font-medium">Supported:</span>
            <span className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold border border-stone-200/50 dark:border-stone-700/50">
              YouTube
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold border border-stone-200/50 dark:border-stone-700/50">
              Vimeo
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold border border-stone-200/50 dark:border-stone-700/50">
              Direct MP4 / WebM / MOV
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Upload File Dropzone */}
      {activeTab === 'upload' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-m4v"
            onChange={handleFileSelect}
            className="hidden"
            id={`video-upload-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />

          <label
            htmlFor={`video-upload-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className={`w-full border-2 border-dashed rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
              isUploading
                ? 'border-[#E85D04] bg-[#E85D04]/5 cursor-wait'
                : 'border-stone-300 dark:border-stone-700 hover:border-[#E85D04] hover:bg-[#E85D04]/5 bg-white dark:bg-stone-900/60'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center gap-2 py-3 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#E85D04]" />
                <span className="text-xs font-bold text-[#E85D04]">Uploading video to server...</span>
                <span className="text-[10px] text-stone-400">Saving securely with streaming support</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center shadow-xs">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Click to select video from computer or phone
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    MP4, WebM, MOV supported • Max size 100MB
                  </p>
                </div>
              </>
            )}
          </label>
        </div>
      )}

      {/* Error notification */}
      {uploadError && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Attached Video Preview Card */}
      {value && !isUploading && (
        <div className="p-3 sm:p-4 rounded-xl bg-stone-100/80 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active Video</span>
              </span>
              <span className="text-[10px] text-stone-400 truncate max-w-[180px] sm:max-w-xs font-mono">
                {isDirectFile ? 'Uploaded File' : 'External Link'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-[11px] font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <div className="w-full aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-black shadow-inner">
            <UniversalVideoPlayer url={value} autoPlay={false} muted={true} />
          </div>
        </div>
      )}
    </div>
  );
}
