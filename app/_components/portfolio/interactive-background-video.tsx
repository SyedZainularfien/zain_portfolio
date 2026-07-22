"use client";

import { useEffect, useRef } from "react";

const VIDEO_SOURCE = "/about-scrub.mp4";
const SCRUB_SENSITIVITY = 6;

export function InteractiveBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const desktopQuery = window.matchMedia("(min-width: 1025px)");
    let removeModeListeners = () => {};

    const configurePlayback = () => {
      removeModeListeners();

      if (desktopQuery.matches) {
        let previousMouseX: number | null = null;
        let targetTime = video.currentTime || 0;
        let scheduledFrame: number | null = null;

        video.autoplay = false;
        video.pause();

        const scheduleSeek = () => {
          if (scheduledFrame !== null) return;

          scheduledFrame = window.requestAnimationFrame(() => {
            scheduledFrame = null;
            if (!Number.isFinite(video.duration) || video.duration <= 0) return;

            const clampedTime = Math.min(video.duration, Math.max(0, targetTime));
            if (Math.abs(video.currentTime - clampedTime) < 0.004) return;

            video.currentTime = clampedTime;
          });
        };

        const handleMouseMove = (event: MouseEvent) => {
          if (previousMouseX === null) {
            previousMouseX = event.clientX;
            return;
          }

          if (!Number.isFinite(video.duration) || video.duration <= 0) {
            previousMouseX = event.clientX;
            return;
          }

          const deltaX = event.clientX - previousMouseX;
          previousMouseX = event.clientX;
          targetTime +=
            (deltaX / window.innerWidth) * SCRUB_SENSITIVITY * video.duration;
          targetTime = Math.min(video.duration, Math.max(0, targetTime));

          scheduleSeek();
        };

        const handleSeeked = () => {
          if (Math.abs(video.currentTime - targetTime) > 0.004) scheduleSeek();
        };

        const handleMetadata = () => {
          targetTime = Math.min(video.duration || 0, video.currentTime || 0);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        video.addEventListener("seeked", handleSeeked);
        video.addEventListener("loadedmetadata", handleMetadata);

        removeModeListeners = () => {
          window.removeEventListener("mousemove", handleMouseMove);
          video.removeEventListener("seeked", handleSeeked);
          video.removeEventListener("loadedmetadata", handleMetadata);
          if (scheduledFrame !== null) window.cancelAnimationFrame(scheduledFrame);
        };
        return;
      }

      video.autoplay = false;
      video.pause();
    };

    configurePlayback();
    desktopQuery.addEventListener("change", configurePlayback);

    return () => {
      removeModeListeners();
      desktopQuery.removeEventListener("change", configurePlayback);
    };
  }, []);

  return (
    <div className="about-background-video pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <video
        ref={videoRef}
        src={VIDEO_SOURCE}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="h-full w-full object-cover object-right-bottom"
      />
    </div>
  );
}
