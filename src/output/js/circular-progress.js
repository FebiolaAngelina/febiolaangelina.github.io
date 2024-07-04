function initCircleProgress(element) {
  let options = {
    startAngle: -1.55,
    size: 150,
    value: 0.85,
    fill: { gradient: ['#07C8F9', '#0C63E7'] }


  };

  $(element).find(".bar").circleProgress(options).on('circle-animation-progress', function (event, progress, stepValue) {
    $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
  });

  if ($(element).hasClass('js')) {
    $(element).find(".bar").circleProgress({
      value: 0.90
    });
  } else if ($(element).hasClass('node')) {
    $(element).find(".bar").circleProgress({
      value: 0.70
    });
  } else if ($(element).hasClass('react')) {
    $(element).find(".bar").circleProgress({
      value: 0.85
    });
  }
}

$(document).ready(function () {
  AOS.init({
    once: false, // Ensures AOS animation can repeat
  });

  // Observe AOS elements to initialize circle progress once on first visibility
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('progress-initialized')) {
        initCircleProgress(entry.target);
        entry.target.classList.add('progress-initialized'); // Mark as initialized
      }
    });
  });

  document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
  });
});