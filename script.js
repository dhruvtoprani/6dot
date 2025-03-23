const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = Array(256).fill().map(() => 0);
const characters = ['0', '1'];

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(224, 224, 224, 0.25)';
  ctx.font = '14px monospace';

  for (let i = 0; i < letters.length; i++) {
    const char = characters[Math.floor(Math.random() * characters.length)];
    const x = i * 14;
    const y = letters[i] * 14;

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      letters[i] = 0;
    }

    letters[i]++;
  }
}



setInterval(draw, 40);

const logo = document.getElementById("logo");

logo.addEventListener("click", () => {
  logo.classList.add("exit-animation");

  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000); // Match the animation duration
});


// Braille flipping animation
const brailleMap = {
  '6': '⠼', 'd': '⠙', 'o': '⠕', 't': '⠞'
};

let showingBraille = false;

function swapLogo() {
  logo.classList.add('fade-out');

  setTimeout(() => {
    if (showingBraille) {
      logo.textContent = '6Dot';
    } else {
      logo.textContent = `${brailleMap['6']}${brailleMap['d']}${brailleMap['o']}${brailleMap['t']}`;
    }

    logo.classList.remove('fade-out');
    logo.classList.add('fade-in');

    setTimeout(() => {
      logo.classList.remove('fade-in');
    }, 600);
    
    showingBraille = !showingBraille;
  }, 500);
}

setInterval(swapLogo, 4000);
