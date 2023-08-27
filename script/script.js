document.getElementById("cards").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

const wand = document.getElementById("wand"),
  tiles = document.querySelectorAll(".tile");

const xy = (x, y) => ({ x, y }),
  px = (value) => `${value}px`,
  deg = (value) => `${value}deg`,
  clamp = (value, min, max) => Math.max(Math.min(value, max), min);

const updateMouse = (mouseX, mouseY) => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

  const mouse = {
    position: xy(mouseX, mouseY),
    decimal: xy(mouseX / windowWidth, mouseY / windowHeight),
    multiplier: xy(1.3, 0.4),
    offset: xy(windowWidth * -0.15, windowHeight * 0.1),
    modifiedPosition: xy(0, 0),
  };

  mouse.modifiedPosition.x =
    mouse.position.x * mouse.multiplier.x + mouse.offset.x;
  mouse.modifiedPosition.y =
    mouse.position.y * mouse.multiplier.y + mouse.offset.y;

  return mouse;
};

const revealImages = (mouseX) => {
  for (const tile of tiles) {
    const dimensions = tile.getBoundingClientRect(),
      relativeMouseX = mouseX - dimensions.left,
      mouseXAsDecimal = clamp(relativeMouseX / dimensions.width, 0, 1);

    const opacity = mouseXAsDecimal,
      blur = 1 - mouseXAsDecimal;

    tile.style.setProperty("--opacity", opacity);
    tile.style.setProperty("--blur", blur);
  }
};

const getWandStyles = (mouse) => ({
  left: px(mouse.modifiedPosition.x),
  top: px(mouse.modifiedPosition.y),
  rotate: deg(mouse.decimal.x * 20 - 10),
});

window.onmousemove = (e) => {
  const mouse = updateMouse(e.clientX, e.clientY),
    wandStyles = getWandStyles(mouse);

  wand.animate(wandStyles, { duration: 400, fill: "forwards" });

  revealImages(mouse.modifiedPosition.x);
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const enhance = (id) => {
  const element = document.getElementById(id),
    text = element.innerText.split("");

  element.innerText = "";

  text.forEach((value, index) => {
    const outer = document.createElement("span");

    outer.className = "outer";

    const inner = document.createElement("span");

    inner.className = "inner";

    inner.style.animationDelay = `${rand(-5000, 0)}ms`;

    const letter = document.createElement("span");

    letter.className = "letter";

    letter.innerText = value;

    letter.style.animationDelay = `${index * 1000}ms`;

    inner.appendChild(letter);

    outer.appendChild(inner);

    element.appendChild(outer);
  });
};

enhance("channel-link");

var script;
$(document).ready(function () {
  $("#contact").addClass("target");
  $("#flip2back, #close").click(function (e) {
    $(".target").removeClass("target");
    e.preventDefault();
  });
  $("#open, #flip").click(function (e) {
    var $anchor = $(this);
    $($anchor.attr("href")).addClass("target");
    e.preventDefault();
  });
});

const wrapper = document.getElementById("bubble-wrapper");

const animateBubble = (x) => {
  const bubble = document.createElement("div");

  bubble.className = "bubble";
  bubble.style.left = `${x}px`;

  wrapper.appendChild(bubble);

  setTimeout(() => wrapper.removeChild(bubble), 2000);
};

window.onmousemove = (e) => animateBubble(e.clientX);
