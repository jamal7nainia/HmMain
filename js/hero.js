(function () {
  'use strict';

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

  // إيقاف الأنيميشن عند خروج المستخدم من التاب لتوفير الموارد والبطارية،
  // واستئنافه فوراً عند العودة — بدون أي تأثير على المظهر.
  function setupVisibilityPause() {
    var tracks = document.querySelectorAll('.poster-track');
    if (!tracks.length) return;

    document.addEventListener('visibilitychange', function () {
      var state = document.hidden ? 'paused' : 'running';
      tracks.forEach(function (t) {
        t.style.animationPlayState = state;
      });
    });
  }

  window.addEventListener('load', async () => {
    await initPostersIfEmpty();
    setupVisibilityPause();
  });
})();