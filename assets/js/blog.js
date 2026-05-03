/* Blog — Shared JS
   Injects common chrome (progress bar, nav, scroll-to-top)
   so blog pages only carry their own content. */
(function () {
  'use strict';

  /* --- Theme: read portfolio toggle from localStorage --- */
  var theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);

  /* --- Inject shared markup --- */
  var progress = document.createElement('div');
  progress.className = 'reading-progress';
  document.body.prepend(progress);

  var nav = document.createElement('nav');
  nav.className = 'blog-nav';
  nav.innerHTML = '<a href="../index.html#blog">\u2190 Back to Portfolio</a><span class="read-time"></span>';
  document.body.prepend(nav);

  var btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.textContent = '\u2191';
  document.body.appendChild(btn);

  /* --- Reading progress bar --- */
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
  }, { passive: true });

  /* --- Scroll-to-top --- */
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --- Estimated read time --- */
  var rt = nav.querySelector('.read-time');
  var text = (document.querySelector('.page') || document.body).textContent || '';
  var words = text.trim().split(/\s+/).length;
  rt.textContent = Math.max(1, Math.round(words / 230)) + ' min read';
})();
