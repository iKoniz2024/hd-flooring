'use client';

import React, { useState, useMemo } from 'react';
import { Play, AlertCircle, Loader2, Video as VideoIcon } from 'lucide-react';

interface UniversalVideoPlayerProps {
  url: string;
  title?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

type VideoSourceType = 'youtube' | 'vimeo' | 'direct' | 'unknown';

interface ParsedSource {
  type: VideoSourceType;
  src: string;
}

function parseVideoUrl(url: string, autoPlay = false, muted = false): ParsedSource {
  if (!url || typeof url !== 'string') {
    return { type: 'unknown', src: '' };
  }

  const cleanUrl = url.trim();

  // 1. YouTube check
  const ytMatch = cleanUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      autoplay: autoPlay ? '1' : '0',
      mute: muted ? '1' : '0',
    });
    return {
      type: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`,
    };
  }

  // 2. Vimeo check
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      type: 'vimeo',
      src: `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}&muted=${muted ? 1 : 0}`,
    };
  }

  // 3. Direct HTML5 video file or GridFS uploads endpoint
  return {
    type: 'direct',
    src: cleanUrl,
  };
}

export function UniversalVideoPlayer({
  url,
  title,
  poster,
  autoPlay = false,
  muted = false,
  className = '',
}: UniversalVideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const parsed = useMemo(() => parseVideoUrl(url, autoPlay, muted), [url, autoPlay, muted]);

  if (!url || !parsed.src || hasError) {
    return (
      <div
        className={`w-full aspect-video rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-2">
          {hasError ? <AlertCircle className="w-6 h-6 text-red-500" /> : <VideoIcon className="w-6 h-6" />}
        </div>
        <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">
          {hasError ? 'Video could not be loaded.' : 'No video provided.'}
        </p>
        {hasError && (
          <button
            onClick={() => setHasError(false)}
            className="mt-3 text-[11px] font-bold text-[#E85D04] hover:underline"
          >
            Retry playback
          </button>
        )}
      </div>
    );
  }

  // YouTube / Vimeo Embed
  if (parsed.type === 'youtube' || parsed.type === 'vimeo') {
    return (
      <div
        className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-stone-200 dark:border-stone-800 ${className}`}
      >
        <iframe
          src={parsed.src}
          title={title || 'Video Player'}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // Native HTML5 Direct Video (Local uploads or direct MP4/WebM)
  return (
    <div
      className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-950 shadow-lg border border-stone-200 dark:border-stone-800 group ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-950/40 backdrop-blur-[2px]">
          <Loader2 className="w-8 h-8 text-[#E85D04] animate-spin" />
        </div>
      )}

      <video
        src={parsed.src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        muted={muted}
        onLoadedData={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className="w-full h-full object-contain bg-black"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
