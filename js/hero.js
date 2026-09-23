(function () {
  'use strict';
  const SET_WIDTH = 1760;

  function animateRow(selector, speed, direction) {
    const track = document.querySelector(selector);
    if (!track) return;

    let pos = direction === 1 ? -SET_WIDTH : 0;
    let lastTime = performance.now();

    function step(currentTime) {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1); 
      lastTime = currentTime;

      pos += direction * speed * dt;

      if (direction === -1 && pos <= -SET_WIDTH) {
        pos += SET_WIDTH;
      } else if (direction === 1 && pos >= 0) {
        pos -= SET_WIDTH;
      }

      track.style.transform = `translate3d(${pos.toFixed(2)}px, 0, 0)`;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  async function initPostersIfEmpty() {
    const trackA = document.querySelector('.poster-track.track-a');
    const trackB = document.querySelector('.poster-track.track-b');
    if (!trackA || !trackB) return;

    if (!trackA.children.length || !trackB.children.length) {
      try {
        const res = await fetch('data/posters.json');
        if (!res.ok) return;
        const posters = await res.json();
        if (!Array.isArray(posters) || posters.length === 0) return;

        const sliceA = posters.slice(0, 10);
        const sliceB = posters.slice(10, 20);

        function buildTrack(track, list, altText) {
          track.innerHTML = '';
          for (let r = 0; r < 4; r++) {
            const set = document.createElement('div');
            set.className = 'poster-set';
            list.forEach(p => {
              const item = document.createElement('div');
              item.className = 'poster';
              const img = document.createElement('img');
              img.src = p.image;
              img.alt = altText;
              img.width = 160;
              img.height = 224;
              img.decoding = 'async';
              item.appendChild(img);
              set.appendChild(item);
            });
            track.appendChild(set);
          }
        }

        if (!trackA.children.length) buildTrack(trackA, sliceA, 'مانهوا ومانغا مترجمة - Hikari Manga');
        if (!trackB.children.length) buildTrack(trackB, sliceB, 'تحميل مانغا مترجمة للعربية - Hikari Manga');
      } catch (err) {
        console.warn('Could not load posters from data/posters.json:', err);
      }
    }
  }

  window.addEventListener('load', async () => {
    await initPostersIfEmpty();
    animateRow('.poster-track.track-a', 45, -1);
    animateRow('.poster-track.track-b', 35, 1);
  });
})();