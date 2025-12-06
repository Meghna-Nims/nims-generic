//header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  if (header) {
    let lastKnownScroll = 0;
    let ticking = false;
    window.addEventListener("scroll", function () {
      lastKnownScroll = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (lastKnownScroll > 100) header.classList.add("fixed-header");
          else header.classList.remove("fixed-header");
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  //placements slider
  $(".placements-slider").owlCarousel({
  loop: true,
  margin: 20,
  center: true,
  stagePadding: 60,
  nav: false,
  dots: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: false,
  smartSpeed: 2000,
  items: 1,
  responsive: {
    0:   { items: 1, stagePadding: 40 },
    576: { items: 1.2, stagePadding: 50 },
    768: { items: 2, stagePadding: 60 },
    992: { items: 3, stagePadding: 60 }
  }
});

//logo slider
  if (window.jQuery) {
    (function ($) {
      $(".partner-slider").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplaySpeed: 1400,
        autoplayHoverPause: false,
        responsive: {
          0: { items: 4, margin: 20 },
          480: { items: 5, margin: 30 },
          768: { items: 7 },
          1024: { items: 7 },
          1400: { items: 7 }
        }
      });
//testimonials
      const wrap = document.querySelector(".cards-wrap");
      const prev = document.querySelector(".testi-prev");
      const next = document.querySelector(".testi-next");
      if (wrap && next) {
        next.addEventListener("click", () => {
          wrap.scrollBy({ left: 360, behavior: "smooth" });
        });
      }
      if (wrap && prev) {
        prev.addEventListener("click", () => {
          wrap.scrollBy({ left: -360, behavior: "smooth" });
        });
      }
//approvals
      $(function () {
        var $section = $("#accreditation-affiliation");
        if (!$section.length) return;
        var $owl = $section.find(".acc-owl");
        if (!$owl.length) return;

        if ($owl.data("owl.carousel")) {
          $owl.trigger("destroy.owl.carousel");
          $owl.removeClass("owl-loaded owl-hidden");
          var $stage = $owl.find(".owl-stage-outer").children().detach();
          $owl.append($stage);
        }

        $owl.owlCarousel({
          items: 4,
          loop: true,
          margin: 16,
          nav: false,
          dots: true,
          lazyLoad: true,
          autoplay: true,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          smartSpeed: 600,
          slideBy: 1,
          responsive: {
            0:   { items: 2, slideBy: 1 },
            420: { items: 2, slideBy: 1 },
            576: { items: 2, slideBy: 1 },
            768: { items: 3, slideBy: 1 },
            992: { items: 4, slideBy: 1 }
          }
        });

        $section.find(".acc-prev").on("click", function (e) {
          e.preventDefault();
          $owl.trigger("prev.owl.carousel");
          $owl.trigger("play.owl.autoplay", [$owl.data("owl.carousel") ? $owl.data("owl.carousel").settings.autoplayTimeout : 4000]);
        });
        $section.find(".acc-next").on("click", function (e) {
          e.preventDefault();
          $owl.trigger("next.owl.carousel");
          $owl.trigger("play.owl.autoplay", [$owl.data("owl.carousel") ? $owl.data("owl.carousel").settings.autoplayTimeout : 4000]);
        });

        $section.on("keydown", function (e) {
          if (e.key === "ArrowLeft") {
            $owl.trigger("prev.owl.carousel");
            $owl.trigger("play.owl.autoplay", [$owl.data("owl.carousel") ? $owl.data("owl.carousel").settings.autoplayTimeout : 4000]);
          } else if (e.key === "ArrowRight") {
            $owl.trigger("next.owl.carousel");
            $owl.trigger("play.owl.autoplay", [$owl.data("owl.carousel") ? $owl.data("owl.carousel").settings.autoplayTimeout : 4000]);
          }
        });

        $owl.find(".card-item").attr("tabindex", "0");

        if ($section.find(".sr-live").length === 0) {
          $section.append('<div class="sr-live" aria-live="polite" style="position:absolute;left:-9999px;top:auto;height:1px;width:1px;overflow:hidden;"></div>');
        }
        var $live = $section.find(".sr-live");
        $owl.on("changed.owl.carousel", function (event) {
          var count = event.item.count || 0;
          var index = event.item.index - (event.relatedTarget && event.relatedTarget._clones ? event.relatedTarget._clones.length / 2 : 0);
          var realIndex = ((index % count) + count) % count;
          $live.text("Slide " + (realIndex + 1) + " of " + count);
        });

        $owl.find("img.owl-lazy").each(function () {
          $(this).on("load", function () {
            $owl.trigger("refresh.owl.carousel");
          });
        });

        $owl.on("focusin", ".card-item", function () {
          $owl.trigger("stop.owl.autoplay");
        });
        $owl.on("focusout", ".card-item", function () {
          var timeout = $owl.data("owl.carousel") && $owl.data("owl.carousel").settings ? $owl.data("owl.carousel").settings.autoplayTimeout : 4000;
          $owl.trigger("play.owl.autoplay", [timeout]);
        });

        $section.find(".acc-prev, .acc-next").on("mouseenter", function () {
          $owl.trigger("stop.owl.autoplay");
        }).on("mouseleave", function () {
          var timeout = $owl.data("owl.carousel") && $owl.data("owl.carousel").settings ? $owl.data("owl.carousel").settings.autoplayTimeout : 4000;
          $owl.trigger("play.owl.autoplay", [timeout]);
        });
      });
    })(jQuery);
  } else {
    console.warn("jQuery not found - carousel initialisation skipped");
  }

  const steps = Array.from(document.querySelectorAll('.collapse-box'));
  const stepButtons = Array.from(document.querySelectorAll('.each-circle'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentStep = 1;

  function updateSteps() {
    steps.forEach(step => {
      const stepNum = parseInt(step.getAttribute('data-step'), 10);
      step.classList.toggle('show', stepNum === currentStep);
    });
    stepButtons.forEach(button => {
      const stepNum = parseInt(button.getAttribute('data-step'), 10);
      button.classList.toggle('active', stepNum === currentStep);
    });
    if (prevBtn) prevBtn.style.visibility = (currentStep === 1) ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = (currentStep === steps.length) ? 'hidden' : 'visible';
  }

  stepButtons.forEach(button => {
    if (!button) return;
    button.addEventListener('click', () => {
      currentStep = parseInt(button.getAttribute('data-step'), 10) || currentStep;
      updateSteps();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateSteps();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length) {
        currentStep++;
        updateSteps();
      }
    });
  }

  updateSteps();
});
