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

let i = 1;
let size = 40;
let clicks = 0;

function setYesButtonSize(px) {
  const clamped = Math.min(px, 360);
  yes_button.style.height = `${clamped}px`;
  yes_button.style.width = `${clamped}px`;

  const fontPx = Math.max(18, Math.min(64, Math.round(clamped * 0.28)));
  yes_button.style.fontSize = `${fontPx}px`;
}

function refreshBanner() {
  const banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

no_button.addEventListener("click", () => {
  const banner = document.getElementById("banner");

  if (clicks === 0) {
    banner.src = "./public/images/no.gif";
    refreshBanner();
  }
  clicks++;

  const increments = [18, 22, 26, 30, 36];
  const inc = increments[Math.floor(Math.random() * increments.length)];
  size += inc;
  setYesButtonSize(size);

  if (i < answers_no.length) {
    no_button.textContent = answers_no[i];
    i++;
  } else {
    alert(answers_no[answers_no.length - 1]);

    i = 1;
    clicks = 0;
    no_button.textContent = answers_no[0];
    yes_button.textContent = "Yes";
    size = 40;
    setYesButtonSize(size);

    banner.src = "./public/images/mid.gif";
    refreshBanner();
  }
});

yes_button.addEventListener("click", () => {
  const banner = document.getElementById("banner");
  banner.src = "./public/images/yes.gif";
  refreshBanner();

  document.getElementsByClassName("buttons")[0].style.display = "none";
  document.getElementsByClassName("message")[0].style.display = "block";
});

setYesButtonSize(size);
