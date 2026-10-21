(function () {
  var links = document.querySelectorAll("a.zoomable");
  if (!links.length) return;

  var MIN_SCALE = 0.2;
  var MAX_SCALE = 8;

  var overlay = document.createElement("div");
  overlay.className = "img-zoom";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "原图查看");
  overlay.innerHTML =
    '<div class="img-zoom-stage"><img alt=""></div>' +
    '<div class="img-zoom-bar">' +
    '<button type="button" data-act="out">缩小</button>' +
    '<button type="button" data-act="fit">适应屏幕</button>' +
    '<button type="button" data-act="orig">原图</button>' +
    '<button type="button" data-act="in">放大</button>' +
    '<span class="img-zoom-scale">100%</span>' +
    '<button type="button" data-act="close">关闭</button>' +
    "</div>";
  document.body.appendChild(overlay);

  var stage = overlay.querySelector(".img-zoom-stage");
  var img = stage.querySelector("img");
  var scaleLabel = overlay.querySelector(".img-zoom-scale");

  var scale = 1;
  var x = 0;
  var y = 0;
  var naturalW = 0;
  var naturalH = 0;
  var dragging = false;
  var dragMoved = false;
  var lastX = 0;
  var lastY = 0;
  var pointers = new Map();
  var pinchDist = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function fitScale() {
    var pad = 24;
    if (!naturalW || !naturalH) return 1;
    return Math.min(
      (stage.clientWidth - pad) / naturalW,
      (stage.clientHeight - pad) / naturalH
    );
  }

  function apply() {
    img.style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")";
    img.classList.toggle("is-pixelated", scale >= 2);
    scaleLabel.textContent = Math.round(scale * 100) + "%";
  }

  function centerAt(nextScale) {
    scale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    x = (stage.clientWidth - naturalW * scale) / 2;
    y = (stage.clientHeight - naturalH * scale) / 2;
    apply();
  }

  function zoomAt(clientX, clientY, nextScale) {
    nextScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    var rect = stage.getBoundingClientRect();
    var px = clientX - rect.left;
    var py = clientY - rect.top;
    var imageX = (px - x) / scale;
    var imageY = (py - y) / scale;
    scale = nextScale;
    x = px - imageX * scale;
    y = py - imageY * scale;
    apply();
  }

  function show() {
    naturalW = img.naturalWidth;
    naturalH = img.naturalHeight;
    centerAt(Math.min(1, fitScale()));
  }

  function open(src, alt) {
    overlay.classList.add("is-open");
    document.body.classList.add("img-zoom-open");
    img.alt = alt || "";
    if (img.getAttribute("src") === src && img.complete && img.naturalWidth) {
      show();
      return;
    }
    img.onload = show;
    img.src = src;
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("img-zoom-open");
    dragging = false;
    pinchDist = 0;
    pointers.clear();
    stage.classList.remove("is-dragging");
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var image = link.querySelector("img");
      open(link.getAttribute("href"), image ? image.alt : "");
    });
  });

  overlay.querySelector(".img-zoom-bar").addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;
    var action = button.getAttribute("data-act");
    var rect = stage.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    if (action === "close") close();
    else if (action === "in") zoomAt(cx, cy, scale * 1.5);
    else if (action === "out") zoomAt(cx, cy, scale / 1.5);
    else if (action === "orig") centerAt(1);
    else if (action === "fit") centerAt(fitScale());
  });

  stage.addEventListener(
    "wheel",
    function (event) {
      event.preventDefault();
      var factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoomAt(event.clientX, event.clientY, scale * factor);
    },
    { passive: false }
  );

  stage.addEventListener("pointerdown", function (event) {
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 1) {
      dragging = true;
      dragMoved = false;
      lastX = event.clientX;
      lastY = event.clientY;
      stage.classList.add("is-dragging");
      stage.setPointerCapture(event.pointerId);
    } else if (pointers.size === 2) {
      pinchDist = pointerDistance();
    }
  });

  stage.addEventListener("pointermove", function (event) {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size >= 2) {
      var dist = pointerDistance();
      if (pinchDist > 0) {
        var pts = Array.from(pointers.values());
        zoomAt(
          (pts[0].x + pts[1].x) / 2,
          (pts[0].y + pts[1].y) / 2,
          scale * (dist / pinchDist)
        );
      }
      pinchDist = dist;
      return;
    }

    if (!dragging) return;
    var dx = event.clientX - lastX;
    var dy = event.clientY - lastY;
    if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
    lastX = event.clientX;
    lastY = event.clientY;
    x += dx;
    y += dy;
    apply();
  });

  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinchDist = 0;
    if (pointers.size === 0) {
      dragging = false;
      stage.classList.remove("is-dragging");
    }
  }

  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);

  stage.addEventListener("click", function (event) {
    if (event.target === stage && !dragMoved) close();
  });

  document.addEventListener("keydown", function (event) {
    if (!overlay.classList.contains("is-open")) return;
    var rect = stage.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    if (event.key === "Escape") close();
    else if (event.key === "+" || event.key === "=") zoomAt(cx, cy, scale * 1.5);
    else if (event.key === "-" || event.key === "_") zoomAt(cx, cy, scale / 1.5);
  });

  function pointerDistance() {
    var pts = Array.from(pointers.values());
    if (pts.length < 2) return 0;
    return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  }
})();
