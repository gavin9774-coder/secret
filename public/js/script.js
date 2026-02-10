const answers_no = [
  "No",
  "Are you sure?",
  "Are you really sure??",
  "Are you really really sure???",
  "Think again?",
  "Don't believe in second chances?",
  "Why are you being so cold?",
  "Maybe we can talk about it?",
  "I am not going to ask again!",
  "Ok now this is hurting my feelings!",
  "You are now just being mean!",
  "Why are you doing this to me?",
  "Please give me a chance!",
  "I am begging you to stop!",
  "Ok, Let's just start over.."
];

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");

let i = 1;
let size = 40;      // start size for YES button (square-ish growth)
let clicks = 0;

// helper: set YES button size + auto-scale its font
function setYesButtonSize(px) {
  const clamped = Math.min(px, 360); // cap so it doesn't become ridiculous
  yes_button.style.height = `${clamped}px`;
  yes_button.style.width = `${clamped}px`;

  // text auto scales with button size:
  //  - min 18px
  //  - grows with button size
  //  - max 64px
  const fontPx = Math.max(18, Math.min(64, Math.round(clamped * 0.28)));
  yes_button.style.fontSize = `${fontPx}px`;
}

no_button.addEventListener("click", () => {
  // Change banner to no.gif on first NO click
  const banner = document.getElementById("banner");
  if (clicks === 0) {
    banner.src = "public/images/no.gif";
    refreshBanner();
  }
  clicks++;

  // Grow YES button every click (always increasing)
  const increments = [18, 22, 26, 30, 36];
  const inc = increments[Math.floor(Math.random() * increments.length)];
  size += inc;
  setYesButtonSize(size);

  // Cycle "No" messages
  if (i < answers_no.length) {
    no_button.textContent = answers_no[i];
    i++;
  } else {
    alert(answers_no[answers_no.length - 1]);

    // Reset everything
    i = 1;
    clicks = 0;
    no_button.textContent = answers_no[0];
    yes_button.textContent = "Yes";
    size = 40;
    setYesButtonSize(size);

    // Reset banner back to mid.gif
    banner.src = "public/images/mid.gif";
    refreshBanner();
  }
});

yes_button.addEventListener("click", () => {
  // change banner gif path
  const banner = document.getElementById("banner");
  banner.src = "public/images/yes.gif";
  refreshBanner();

  // hide buttons
  document.getElementsByClassName("buttons")[0].style.display = "none";

  // show message
  document.getElementsByClassName("message")[0].style.display = "block";
});

function refreshBanner() {
  const banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

// initialize YES button sizing on load
setYesButtonSize(size);
