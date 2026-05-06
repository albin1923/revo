export function initHero() {
  const isMobile = window.innerWidth <= 768;
  const videoSrc = isMobile ? '/video/hero-mobile.mp4' : '/video/hero.mp4';
  const heroSection = document.getElementById('hero');

  const video = document.createElement('video');
  video.src = videoSrc;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.loop = false;
  video.className = 'hero-video-bg';
  
  heroSection.prepend(video);
  video.load();

  let videoReady = false;
  video.addEventListener('loadeddata', () => { videoReady = true; });
  video.addEventListener('canplaythrough', () => { videoReady = true; });

  return {
    video,
    videoReady: () => videoReady,
    updateScroll(progress) {
      if (videoReady && video.duration) {
        // Map scroll progress to (video duration - 1 second) to ignore the last 1 second of the video
        const effectiveDuration = Math.max(0, video.duration - 1);
        const time = progress * effectiveDuration;
        if (Math.abs(video.currentTime - time) > 0.05) {
          video.currentTime = time;
        }
      }
    },
    destroy() {
      video.remove();
    },
  };
}

