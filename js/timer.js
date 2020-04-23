(function() {
  // Based on an SVG animation modeled by https://codepen.io/jeremenichelli/pen/vegymB
  // NodeList forEach polyfill.
  if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  function setProgress(circle, prop) {
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
    var offset = circumference - prop * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  }

  function updateRing(svg, count, total) {
    svg.querySelector('.value').textContent = count;
    setProgress(svg.querySelector('.progress-ring__progress'), count / total);
  }

  function updateTimer(el) {
    // Assume this is the local time.
    // (We're counting down to this timestamp locally regardless of timezone
    // so the timer will be different for each timezone.)
    var endtime = el.getAttribute('data-end-time');
    
    // Date.now() returns UTC, need to convert to local time.
    var now = Date.now() / 1000;
    var tzoffset = new Date().getTimezoneOffset()*60;
    now = now - tzoffset;

    var delta = endtime - now;
    delta = (delta < 0) ? 0 : delta;

    var days = Math.floor(delta / (60 * 60 * 24));
    delta = delta - (days * 60 * 60 *24);
    var hours = Math.floor(delta / (60 * 60));
    delta = delta - (hours * 60 * 60);
    var minutes = Math.floor(delta / (60));
    var seconds = Math.round(delta - (minutes * 60));

    // console.log(days + ' ' + hours + ' ' + minutes + ' ' + seconds);

    updateRing(el.querySelector('.progress-ring--days'), days, 365);
    updateRing(el.querySelector('.progress-ring--hours'), hours, 24);
    updateRing(el.querySelector('.progress-ring--minutes'), minutes, 60);
    updateRing(el.querySelector('.progress-ring--seconds'), seconds, 60);
  }

  document.querySelectorAll('.ring-countdown').forEach(function(el) {
    updateTimer(el);
    window.setInterval(function() { 
      updateTimer(el);
    }, 1000);
  });
})();