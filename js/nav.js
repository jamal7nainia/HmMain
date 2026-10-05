(function () {
  'use strict';

  var toggle = document.querySelector('#nav-toggle');
  var panel = document.querySelector('.nav-links');

  function setMenu(open) {
    if (!panel) return;
    panel.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!panel.classList.contains('open'));
    });
  }

  document.addEventListener('click', function (e) {
    if (panel && toggle && !panel.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  var links = document.querySelectorAll('.nav-links a');
  if (!links.length) return;
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      links.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
      setMenu(false);
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) setMenu(false);
  });
})();

// Footer Email Button: Expand in-place & copy to clipboard
(function () {
  'use strict';

  function initFooterEmail() {
    var emailBtn = document.querySelector('.footer-email-btn');
    if (!emailBtn) return;

    var emailText = emailBtn.getAttribute('data-email') || 'jamalnainia2007@gmail.com';
    var copyBadge = emailBtn.querySelector('.email-copy-badge');
    var copiedTimeout;

    function copyToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return new Promise(function (resolve, reject) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '0';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
          var ok = document.execCommand('copy');
          document.body.removeChild(ta);
          if (ok) resolve(); else reject();
        } catch (err) {
          document.body.removeChild(ta);
          reject(err);
        }
      });
    }

    function triggerCopied() {
      copyToClipboard(emailText).then(function () {
        emailBtn.classList.add('copied');
        if (copyBadge) copyBadge.setAttribute('title', 'تم النسخ!');
        clearTimeout(copiedTimeout);
        copiedTimeout = setTimeout(function () {
          emailBtn.classList.remove('copied');
          if (copyBadge) copyBadge.setAttribute('title', 'نسخ البريد');
        }, 2000);
      });
    }

    emailBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!emailBtn.classList.contains('is-expanded')) {
        emailBtn.classList.add('is-expanded');
      } else {
        triggerCopied();
      }
    });

    emailBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!emailBtn.classList.contains('is-expanded')) {
          emailBtn.classList.add('is-expanded');
        } else {
          triggerCopied();
        }
      }
    });

    document.addEventListener('click', function (e) {
      if (!emailBtn.contains(e.target)) {
        emailBtn.classList.remove('is-expanded');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        emailBtn.classList.remove('is-expanded');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterEmail);
  } else {
    initFooterEmail();
  }
})();
