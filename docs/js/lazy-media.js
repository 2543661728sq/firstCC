(function () {
  const videos = document.querySelectorAll('video[data-video-src]');
  if (!videos.length) return;

  const load = (video) => {
    if (video.dataset.videoLoaded) return;
    video.dataset.videoLoaded = 'true';
    video.src = video.dataset.videoSrc;
    video.load();
    if (video.autoplay) video.play().catch(() => {});
  };

  if (!('IntersectionObserver' in window)) {
    videos.forEach(load);
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      instance.unobserve(entry.target);
    });
  }, { rootMargin: '320px 0px' });

  videos.forEach(video => observer.observe(video));
})();
