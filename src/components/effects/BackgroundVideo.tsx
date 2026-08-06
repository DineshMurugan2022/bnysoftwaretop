"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface BackgroundVideoProps {
  src: string;
}

export function BackgroundVideo({ src }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = src;
    } else if (Hls.isSupported()) {
      // hls.js fallback
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      
      return () => {
        hls.destroy();
      };
    }
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-100"
      />
    </div>
  );
}
