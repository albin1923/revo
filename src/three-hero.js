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
        // Map scroll progress to video duration.
        // We add a tiny buffer so it doesn't hit exactly the end too early
        const time = progress * video.duration;
        if (Math.abs(video.currentTime - time) > 0.05) {
          video.currentTime = Math.min(time, video.duration - 0.05);
        }
      }
    },
    destroy() {
      video.remove();
    },
  };
}

