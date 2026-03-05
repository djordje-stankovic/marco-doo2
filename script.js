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
    });
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
    });

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

    // Null checks
    if (!svg || !pipeBg || !pipeDrawn || !energyDot || !container) return;

    var isMobile = window.innerWidth < 768;
    var totalLength = 0;
    var ticking = false;

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
      // Privremeno sakrij pipeline da ne utiče na merenje visine
      container.style.display = 'none';
      var pageHeight = document.documentElement.scrollHeight;
      var viewWidth = window.innerWidth;
      container.style.display = '';

      // Set SVG viewBox to match the full page dimensions
      container.style.height = pageHeight + 'px';
      svg.setAttribute('viewBox', '0 0 ' + viewWidth + ' ' + pageHeight);

      var pathData = generatePath();
      pipeBg.setAttribute('d', pathData);
      pipeDrawn.setAttribute('d', pathData);

      // Setup stroke-dasharray for draw animation
      var pathLength = pipeDrawn.getTotalLength();
      pipeDrawn.style.strokeDasharray = pathLength;
      pipeDrawn.style.strokeDashoffset = pathLength;

      return pathLength;
    }

    // Move the pipeline container inside <main> if not already there
    var mainEl = document.querySelector('main');
    if (mainEl && container.parentElement !== mainEl) {
      mainEl.insertBefore(container, mainEl.firstChild);
    }
    if (mainEl) {
      mainEl.style.position = 'relative';
    }

    totalLength = setupPipeline();

    function onScroll() {
      var scrollTop = window.pageYOffset;
      var pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (pageHeight <= 0) return;

      var progress = Math.min(Math.max(scrollTop / pageHeight, 0), 1);

      // Draw the pipe progressively
      var drawLength = totalLength * (1 - progress);
      pipeDrawn.style.strokeDashoffset = drawLength;

      // Position the energy dot along the path
      var pointLength = totalLength * progress;
      try {
        var point = pipeDrawn.getPointAtLength(pointLength);
        energyDot.setAttribute('cx', point.x);
        energyDot.setAttribute('cy', point.y);
        if (energyGlow) {
          energyGlow.setAttribute('cx', point.x);
          energyGlow.setAttribute('cy', point.y);
        }
      } catch(e) {
        // Silently handle any SVG errors
      }

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    });

    // Initial call
    onScroll();

    // Resize handler - recalculate everything
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        isMobile = window.innerWidth < 768;
        totalLength = setupPipeline();
        onScroll();
      }, 250);
    });

    // Also recalculate after page fully loads (images, fonts, etc.)
    window.addEventListener('load', function() {
      setTimeout(function() {
        totalLength = setupPipeline();
        onScroll();
      }, 1000);
    });
  })();

  // ===== ANIMATED TIMELINE =====
  (function() {
    var track = document.getElementById('timelineTrack');
    var drawn = document.getElementById('timelineDrawn');
    if (!track || !drawn) return;

    var items = track.querySelectorAll('.timeline__item');

    function onTimelineScroll() {
      var trackRect = track.getBoundingClientRect();
      var trackTop = trackRect.top;
      var trackHeight = trackRect.height;
      var windowH = window.innerHeight;

      // Calculate how far through the timeline we've scrolled
      var scrollStart = trackTop + window.pageYOffset - windowH * 0.7;
      var scrollEnd = trackTop + window.pageYOffset + trackHeight - windowH * 0.3;
      var scrollRange = scrollEnd - scrollStart;
      var progress = (window.pageYOffset - scrollStart) / scrollRange;
      progress = Math.min(Math.max(progress, 0), 1);

      drawn.style.height = (progress * 100) + '%';

      // Activate items based on their position relative to drawn line
      items.forEach(function(item) {
        var itemRect = item.getBoundingClientRect();
        var itemTop = itemRect.top;
        if (itemTop < windowH * 0.75) {
          item.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', onTimelineScroll);
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
      var progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
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
