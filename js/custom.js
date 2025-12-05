document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("fixed-header");
    } else {
      header.classList.remove("fixed-header");
    }
  });
});

$(".partner-slider").owlCarousel({
  loop:true,
  margin:60,
  nav:false,
  dots:false,
  autoplay:true,
  autoplayTimeout:2000,
  autoplaySpeed:1400,
  autoplayHoverPause:false,
  responsive:{
    0:{ items:3, margin:20 },
    480:{ items:4, margin:30 },
    768:{ items:5 },
    1024:{ items:7 },
    1400:{ items:8 }
  }
});

const wrap = document.querySelector(".cards-wrap");
const prev = document.querySelector(".testi-prev");
const next = document.querySelector(".testi-next");

next.addEventListener("click", () => {
  wrap.scrollBy({ left: 360, behavior: "smooth" });
});

prev.addEventListener("click", () => {
  wrap.scrollBy({ left: -360, behavior: "smooth" });
});

$(function () {
    var $section = $("#accreditation-affiliation");
    var $owl = $section.find(".acc-owl");

    // Safety: check existence
    if (!$owl.length) {
      console.warn("Owl container not found");
      return;
    }

    // Destroy previous instance if exists (helps during live reloads)
    if ($owl.data("owl.carousel")) {
      $owl.trigger("destroy.owl.carousel");
      $owl.removeClass("owl-loaded owl-hidden");
      $owl.find(".owl-stage-outer").children().unwrap();
    }

    // inside your existing init block - replace the responsive section with this
$owl.owlCarousel({
  items: 4,
  loop: true,
  margin: 16,         // slightly smaller margin overall
  nav: false,
  dots: true,
  lazyLoad: true,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  smartSpeed: 600,
  slideBy: 1,
  responsive: {
    0:   { items: 2, slideBy: 1 }, // <-- show 2 on smallest mobiles
    420: { items: 2, slideBy: 1 }, // optional: small phones
    576: { items: 2, slideBy: 1 }, // xs-sm
    768: { items: 3, slideBy: 1 },
    992: { items: 4, slideBy: 1 }
  }
});


    // custom controls
    $section.find(".acc-prev").on("click", function (e) {
      e.preventDefault();
      $owl.trigger("prev.owl.carousel");
      // ensure autoplay continues after manual navigation
      $owl.trigger("play.owl.autoplay", [
        $owl.data("owl.carousel")
          ? $owl.data("owl.carousel").settings.autoplayTimeout
          : 4000,
      ]);
    });
    $section.find(".acc-next").on("click", function (e) {
      e.preventDefault();
      $owl.trigger("next.owl.carousel");
      $owl.trigger("play.owl.autoplay", [
        $owl.data("owl.carousel")
          ? $owl.data("owl.carousel").settings.autoplayTimeout
          : 4000,
      ]);
    });

    // keyboard support when section focused
    $section.on("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        $owl.trigger("prev.owl.carousel");
        $owl.trigger("play.owl.autoplay", [
          $owl.data("owl.carousel")
            ? $owl.data("owl.carousel").settings.autoplayTimeout
            : 4000,
        ]);
      } else if (e.key === "ArrowRight") {
        $owl.trigger("next.owl.carousel");
        $owl.trigger("play.owl.autoplay", [
          $owl.data("owl.carousel")
            ? $owl.data("owl.carousel").settings.autoplayTimeout
            : 4000,
        ]);
      }
    });

    $owl.find(".card-item").attr("tabindex", "0");

    if ($section.find(".sr-live").length === 0) {
      $section.append(
        '<div class="sr-live" aria-live="polite" style="position:absolute;left:-9999px;top:auto;height:1px;width:1px;overflow:hidden;"></div>'
      );
    }
    var $live = $section.find(".sr-live");
    $owl.on("changed.owl.carousel", function (event) {
 
      var count = event.item.count;
      var index = event.item.index - event.relatedTarget._clones.length / 2;
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
      var timeout =
        $owl.data("owl.carousel") && $owl.data("owl.carousel").settings
          ? $owl.data("owl.carousel").settings.autoplayTimeout
          : 4000;
      $owl.trigger("play.owl.autoplay", [timeout]);
    });

    $section
      .find(".acc-prev, .acc-next")
      .on("mouseenter", function () {
        $owl.trigger("stop.owl.autoplay");
      })
      .on("mouseleave", function () {
        var timeout =
          $owl.data("owl.carousel") && $owl.data("owl.carousel").settings
            ? $owl.data("owl.carousel").settings.autoplayTimeout
            : 4000;
        $owl.trigger("play.owl.autoplay", [timeout]);
      });
  });

   const steps = document.querySelectorAll('.collapse-box');
        const stepButtons = document.querySelectorAll('.each-circle');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentStep = 1;

        // Function to update step visibility
        function updateSteps() {
            steps.forEach(step => {
                const stepNum = parseInt(step.getAttribute('data-step'));
                step.classList.toggle('show', stepNum === currentStep);
            });

            stepButtons.forEach(button => {
                const stepNum = parseInt(button.getAttribute('data-step'));
                button.classList.toggle('active', stepNum === currentStep);
            });

            if(currentStep===1) {
                prevBtn.style.visibility ='hidden';
            } else {
                prevBtn.style.visibility ='visible';
            }
            if(currentStep===5) {
                nextBtn.style.visibility ='hidden';
            } else {
                nextBtn.style.visibility ='visible';
            }
        }

        // Event Listeners for Step Buttons
        stepButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentStep = parseInt(button.getAttribute('data-step'));
                updateSteps();
            });
        });

        // Event Listeners for Navigation Buttons
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateSteps();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length) {
                currentStep++;
                updateSteps();
            }
        });

        // Initialize
        updateSteps();