const grid = document.getElementById("grid");
const spinBtn = document.getElementById("spinBtn");
const winnerDiv = document.getElementById("winner");
const drumRollSound = document.getElementById("drumRoll");
const tingSound = document.getElementById("ting");

let numbers = Array.from({length: 1400}, (_, i) => i + 1);

// load sounds
drumRollSound.src = "sounds/drum-roll.mp3";
tingSound.src = "sounds/ting.mp3";

// generate grid with 50 boxes (all '?')
for (let i = 0; i < 50; i++) {
  const div = document.createElement("div");
  div.className = "box";
  div.textContent = "?";
  grid.appendChild(div);
}

const boxes = document.querySelectorAll(".box");

function spinOnce() {
  if (numbers.length === 0) {
    alert("Semua nomor sudah keluar!");
    return;
  }

  spinBtn.disabled = true;
  winnerDiv.textContent = "";

  drumRollSound.play();

  let highlightInterval = setInterval(() => {
    boxes.forEach(b => b.classList.remove("highlight"));
    const randBox = boxes[Math.floor(Math.random() * boxes.length)];
    randBox.classList.add("highlight");
  }, 100);

  setTimeout(() => {
    clearInterval(highlightInterval);
    boxes.forEach(b => b.classList.remove("highlight"));

    // ambil nomor random
    const idx = Math.floor(Math.random() * numbers.length);
    const winner = numbers.splice(idx, 1)[0];

    winnerDiv.textContent = `Nomor Pemenang: ${winner}`;
    tingSound.play();

    setTimeout(() => {
      winnerDiv.textContent = "";
      spinBtn.disabled = false;
    }, 2500);
  }, 3000);
}

spinBtn.addEventListener("click", spinOnce);

// ❄️ Snowflake generator
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄";
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.animationDuration = (2 + Math.random() * 3) + "s";
  snowflake.style.fontSize = (12 + Math.random() * 24) + "px";
  document.getElementById("snowflakes").appendChild(snowflake);

  setTimeout(() => { snowflake.remove(); }, 5000);
}

setInterval(createSnowflake, 200);
