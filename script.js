/* ================================================
   MARCO DOO - Premium Corporate Website v2
   With Scroll-Driven Pipeline Animation
   ================================================ */

(function() {
  'use strict';

  // ---- Preloader ----
  var preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('loaded');
      }, 800);
    });
  }

  // ---- Dynamic Copyright Year ----
  document.querySelectorAll('.current-year').forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Header Scroll ----
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      var scrollY = window.pageYOffset;
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---- Mobile Menu ----
  var navBurger = document.getElementById('navBurger');
  var navMenu = document.getElementById('navMenu');
  var mobileOverlay = document.getElementById('mobileOverlay');

  function toggleMenu() {
    if (navBurger) navBurger.classList.toggle('active');
    if (navMenu) navMenu.classList.toggle('active');
    if (mobileOverlay) mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu && navMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    if (navBurger) navBurger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navBurger) navBurger.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav__link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // ---- Scroll Animations (IntersectionObserver) ----
  if ('IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      animObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // Safety fallback for animations
  setTimeout(function() {
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      el.classList.add('visible');
    });
  }, 2000);

  // ---- Counter Animation ----
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (target - start) * ease);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function(el) {
      counterObserver.observe(el);
    });
  }

  // ---- Back to Top ----
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Contact Form Validation ----
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var valid = true;

      [name, email, message].forEach(function(field) {
        if (field) field.style.borderColor = '';
      });

      if (name && !name.value.trim()) {
        name.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (email && (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))) {
        email.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (message && !message.value.trim()) {
        message.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (valid) {
        var btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          var originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Poruka je poslata!';
          btn.style.background = '#27ae60';
          btn.disabled = true;
          setTimeout(function() {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
          }, 3000);
        }
      }
    });
  }

  // ---- 3D Tilt Cards ----
  (function() {
    if (window.innerWidth < 768) return;
    document.querySelectorAll('.tilt-card').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -8;
        var rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02,1.02,1.02)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      });
    });
  })();

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== SCROLL-DRIVEN PIPELINE ANIMATION =====
  (function() {
    var svg = document.getElementById('pipelineSvg');
    var pipeBg = document.getElementById('pipeBg');
    var pipeDrawn = document.getElementById('pipeDrawn');
    var energyDot = document.getElementById('energyDot');
    var energyGlow = document.getElementById('energyGlow');
    var container = document.getElementById('pipelineContainer');

    if (!svg || !pipeBg || !pipeDrawn || !energyDot || !container) return;

    var isMobile = window.innerWidth < 768;
    var totalLength = 0;

    // Remove expensive glow filter on mobile for smooth performance
    if (isMobile) {
      pipeDrawn.removeAttribute('filter');
      energyDot.removeAttribute('filter');
    }

    // Generate a serpentine path that weaves through the page
    function generatePath() {
      var pageHeight = document.documentElement.scrollHeight;
      var viewWidth = window.innerWidth;
      var segments = 14;
      var segHeight = pageHeight / segments;

      var d = '';
      var startX = viewWidth * 0.5;
      d = 'M ' + startX + ' 0 ';

      for (var i = 0; i < segments; i++) {
        var y1 = i * segHeight + segHeight * 0.5;
        var y2 = (i + 1) * segHeight;
        var cpX, endX;

        if (isMobile) {
          cpX = i % 2 === 0 ? viewWidth * 0.15 : viewWidth * 0.85;
          endX = i % 2 === 0 ? viewWidth * 0.7 : viewWidth * 0.3;
        } else {
          cpX = i % 2 === 0 ? viewWidth * 0.08 : viewWidth * 0.92;
          endX = i % 2 === 0 ? viewWidth * 0.78 : viewWidth * 0.22;
        }

        d += 'Q ' + cpX + ' ' + y1 + ' ' + endX + ' ' + y2 + ' ';
      }

      return d;
    }

    function setupPipeline() {
      container.style.display = 'none';
      var pageHeight = document.documentElement.scrollHeight;
      var viewWidth = window.innerWidth;
      container.style.display = '';

      container.style.height = pageHeight + 'px';
      svg.setAttribute('viewBox', '0 0 ' + viewWidth + ' ' + pageHeight);

      var pathData = generatePath();
      pipeBg.setAttribute('d', pathData);
      pipeDrawn.setAttribute('d', pathData);

      var pathLength = pipeDrawn.getTotalLength();
      pipeDrawn.style.strokeDasharray = pathLength;
      pipeDrawn.style.strokeDashoffset = pathLength;

      return pathLength;
    }

    var mainEl = document.querySelector('main');
    if (mainEl && container.parentElement !== mainEl) {
      mainEl.insertBefore(container, mainEl.firstChild);
    }
    if (mainEl) {
      mainEl.style.position = 'relative';
    }

    totalLength = setupPipeline();

    // Pre-cache path points
    var cachedPoints = [];
    var CACHE_STEPS = 200;

    function cachePoints() {
      cachedPoints = [];
      for (var i = 0; i <= CACHE_STEPS; i++) {
        var len = (i / CACHE_STEPS) * totalLength;
        try {
          var pt = pipeDrawn.getPointAtLength(len);
          cachedPoints.push({ x: pt.x, y: pt.y });
        } catch(e) {
          cachedPoints.push({ x: 0, y: 0 });
        }
      }
    }
    cachePoints();

    // Smooth lerp animation - interpolates toward target for buttery scroll
    var targetProgress = 0;
    var currentProgress = 0;
    var animating = false;
    var LERP_SPEED = isMobile ? 0.08 : 0.12;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function updatePipeline(progress) {
      pipeDrawn.style.strokeDashoffset = totalLength * (1 - progress);

      var idx = Math.round(progress * CACHE_STEPS);
      var point = cachedPoints[idx];
      if (point) {
        // Use transform instead of cx/cy for GPU-composited movement
        energyDot.setAttribute('cx', point.x);
        energyDot.setAttribute('cy', point.y);
        if (energyGlow) {
          energyGlow.setAttribute('cx', point.x);
          energyGlow.setAttribute('cy', point.y);
        }
      }
    }

    function animateLoop() {
      // Lerp toward target for smooth, non-janky animation
      currentProgress = lerp(currentProgress, targetProgress, LERP_SPEED);

      // Stop animating when close enough
      if (Math.abs(currentProgress - targetProgress) < 0.0005) {
        currentProgress = targetProgress;
        updatePipeline(currentProgress);
        animating = false;
        return;
      }

      updatePipeline(currentProgress);
      requestAnimationFrame(animateLoop);
    }

    function onScroll() {
      var scrollTop = window.pageYOffset;
      var pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (pageHeight <= 0) return;

      targetProgress = Math.min(Math.max(scrollTop / pageHeight, 0), 1);

      if (!animating) {
        animating = true;
        requestAnimationFrame(animateLoop);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call
    onScroll();

    // Resize handler
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        isMobile = window.innerWidth < 768;
        LERP_SPEED = isMobile ? 0.08 : 0.12;
        if (isMobile) {
          pipeDrawn.removeAttribute('filter');
          energyDot.removeAttribute('filter');
        }
        totalLength = setupPipeline();
        cachePoints();
        currentProgress = targetProgress;
        updatePipeline(currentProgress);
      }, 250);
    });

    window.addEventListener('load', function() {
      setTimeout(function() {
        totalLength = setupPipeline();
        cachePoints();
        currentProgress = targetProgress;
        updatePipeline(currentProgress);
      }, 1000);
    });
  })();

  // ===== ANIMATED TIMELINE =====
  (function() {
    var track = document.getElementById('timelineTrack');
    var drawn = document.getElementById('timelineDrawn');
    if (!track || !drawn) return;

    var items = track.querySelectorAll('.timeline__item');
    var tlTarget = 0;
    var tlCurrent = 0;
    var tlAnimating = false;

    function tlAnimate() {
      tlCurrent += (tlTarget - tlCurrent) * 0.1;
      if (Math.abs(tlCurrent - tlTarget) < 0.1) {
        tlCurrent = tlTarget;
      }
      drawn.style.height = tlCurrent + '%';

      if (Math.abs(tlCurrent - tlTarget) > 0.1) {
        requestAnimationFrame(tlAnimate);
      } else {
        tlAnimating = false;
      }
    }

    function onTimelineScroll() {
      var trackRect = track.getBoundingClientRect();
      var trackTop = trackRect.top;
      var trackHeight = trackRect.height;
      var windowH = window.innerHeight;

      var scrollStart = trackTop + window.pageYOffset - windowH * 0.7;
      var scrollEnd = trackTop + window.pageYOffset + trackHeight - windowH * 0.3;
      var scrollRange = scrollEnd - scrollStart;
      var progress = (window.pageYOffset - scrollStart) / scrollRange;
      progress = Math.min(Math.max(progress, 0), 1);

      tlTarget = progress * 100;

      if (!tlAnimating) {
        tlAnimating = true;
        requestAnimationFrame(tlAnimate);
      }

      items.forEach(function(item) {
        var itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowH * 0.75) {
          item.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', onTimelineScroll, { passive: true });
    onTimelineScroll();
  })();

  // ===== SVG SELF-DRAWING ICONS =====
  (function() {
    var drawIcons = document.querySelectorAll('.icon-draw');
    if (!drawIcons.length) return;

    // Initialize: measure each path and set dasharray/dashoffset
    drawIcons.forEach(function(svg) {
      var paths = svg.querySelectorAll('path, circle, rect, polyline, line');
      paths.forEach(function(p) {
        var len = p.getTotalLength ? p.getTotalLength() : 100;
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.setProperty('--dash-len', len);
        p.style.transition = 'none';
      });
    });

    if ('IntersectionObserver' in window) {
      var drawObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var paths = entry.target.querySelectorAll('path, circle, rect, polyline, line');
            requestAnimationFrame(function() {
              paths.forEach(function(p) {
                p.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)';
                p.style.strokeDashoffset = '0';
              });
            });
            entry.target.classList.add('drawn');
          } else {
            var paths = entry.target.querySelectorAll('path, circle, rect, polyline, line');
            paths.forEach(function(p) {
              p.style.transition = 'none';
              var len = p.getTotalLength ? p.getTotalLength() : 100;
              p.style.strokeDashoffset = len;
            });
            entry.target.classList.remove('drawn');
          }
        });
      }, { threshold: 0.3 });

      drawIcons.forEach(function(svg) {
        drawObserver.observe(svg);
      });
    } else {
      drawIcons.forEach(function(svg) { svg.classList.add('drawn'); });
    }
  })();

  // ===== PREMIUM FEATURE 1: Word-by-Word Hero Reveal =====
  (function() {
    var heroTitle = document.querySelector('.hero__title');
    if (!heroTitle || heroTitle.dataset.wordified) return;
    heroTitle.dataset.wordified = 'true';

    var html = heroTitle.innerHTML;
    var parts = html.split(/<span class="hero__title-accent">(.*?)<\/span>/);

    var wordsHtml = '';
    function wrapWords(text, extraClass) {
      var words = text.replace(/<br\s*\/?>/g, ' ||BR|| ').split(/\s+/).filter(function(w) { return w; });
      words.forEach(function(word) {
        if (word === '||BR||') {
          wordsHtml += '<br>';
        } else {
          var cls = 'word' + (extraClass ? ' ' + extraClass : '');
          wordsHtml += '<span class="' + cls + '">' + word + '</span> ';
        }
      });
    }

    if (parts.length === 3) {
      wrapWords(parts[0], '');
      wrapWords(parts[1], 'word-accent');
      wrapWords(parts[2], '');
    } else {
      wrapWords(html, '');
    }

    heroTitle.innerHTML = wordsHtml;

    setTimeout(function() {
      var words = heroTitle.querySelectorAll('.word');
      words.forEach(function(word, i) {
        setTimeout(function() {
          word.classList.add('revealed');
        }, 100 + i * 120);
      });
    }, 500);
  })();

  // ===== PREMIUM FEATURE 3: Scroll Progress Bar =====
  (function() {
    var progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
    }, { passive: true });
  })();

  // ===== PREMIUM FEATURE 4: Image Reveal (clip-path) =====
  (function() {
    var revealImages = document.querySelectorAll('.reveal-image');
    if (!revealImages.length) return;

    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

      revealImages.forEach(function(img) {
        revealObserver.observe(img);
      });
    } else {
      revealImages.forEach(function(img) {
        img.classList.add('revealed');
      });
    }

    // Safety fallback
    setTimeout(function() {
      revealImages.forEach(function(img) {
        img.classList.add('revealed');
      });
    }, 3000);
  })();

})();
