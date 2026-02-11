const answers_no = [
  "No",
  "Are you sure?",
  "What if I asked nicely??",
  "Pretty please?",
  "so u hate me...",
  "what if i offer u tpumps...",
  "PLEASE POOKIE :(",
  "alright ill throw in hot cheetos",
  "im going to die",
  "alright last offer, bubs",
  "POOKI PLEASEEEE",
  "monki ur testing my patience",
  "omg im losing it",
  "i thought yearners were earners",
  "PLEASEEE IM BEGGING",
  "alright fine i dont have rights.",
  ":((((("
];

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const banner = document.getElementById("banner");

let i = 1;
let clicks = 0;

let yesSize = 40;
let noSize = 90; // start wider so long text is readable early

function refreshBanner() {
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function setYesButtonSize(px) {
  const clamped = Math.min(360, Math.max(40, px));
  yes_button.style.height = `${clamped}px`;
  yes_button.style.width = `${clamped}px`;

  const fontPx = Math.max(18, Math.min(64, Math.round(clamped * 0.28)));
  yes_button.style.fontSize = `${fontPx}px`;
}

function makeNoButtonRun() {
  const parent = document.querySelector(".buttons");
  if (!parent) return;

  const parentRect = parent.getBoundingClientRect();
  const maxX = Math.max(0, parentRect.width - no_button.offsetWidth);
  const maxY = Math.max(0, parentRect.height - no_button.offsetHeight);

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  no_button.style.position = "absolute";
  no_button.style.left = `${randomX}px`;
  no_button.style.top = `${randomY}px`;
}

function setNoButtonSize(px) {
  const clamped = Math.max(28, px);

  no_button.style.height = `${clamped}px`;
  no_button.style.width = `${clamped}px`;

  // ✅ Font shrinks based on BOTH button size + current text length
  const textLength = (no_button.textContent || "").length;

  // base font from size
  let fontPx = clamped * 0.34;

  // extra penalty for long messages (this is what makes it really shrink)
  fontPx -= Math.max(0, textLength - 8) * 0.75;

  // clamp
  fontPx = Math.max(7, Math.min(24, Math.round(fontPx)));
  no_button.style.fontSize = `${fontPx}px`;

  // 🏃 run away when small
  if (clamped <= 30) makeNoButtonRun();
}

// init
setYesButtonSize(yesSize);
setNoButtonSize(noSize);

no_button.addEventListener("click", () => {
  if (clicks === 0) {
    banner.src = "./public/images/no.gif";
    refreshBanner();
  }
  clicks++;

  // YES grows
  const increments = [18, 22, 26, 30, 36];
  const inc = increments[Math.floor(Math.random() * increments.length)];
  yesSize += inc;
  setYesButtonSize(yesSize);

  // NO shrinks
  noSize -= 6;
  setNoButtonSize(noSize);

  // update No text + IMPORTANT: re-run sizing AFTER text changes
  if (i < answers_no.length) {
    no_button.textContent = answers_no[i];
    i++;

    // ✅ this is the missing piece that makes font react to longer phrases
    setNoButtonSize(noSize);
  } else {
    alert(answers_no[answers_no.length - 1]);

    i = 1;
    clicks = 0;
    no_button.textContent = answers_no[0];
    yes_button.textContent = "Yes";

    yesSize = 40;
    noSize = 90;

    no_button.style.position = "static";
    no_button.style.left = "0px";
    no_button.style.top = "0px";

    setYesButtonSize(yesSize);
    setNoButtonSize(noSize);

    banner.src = "./public/images/mid.gif";
    refreshBanner();
  }
});

yes_button.addEventListener("click", () => {
  banner.src = "./public/images/yes.gif";
  refreshBanner();

  document.getElementsByClassName("buttons")[0].style.display = "none";
  document.getElementsByClassName("message")[0].style.display = "block";
});
