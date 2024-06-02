const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const probEl = document.querySelector('.prob span')
const assumpEl = document.querySelector('.assump span')
let score = 0
let n = 0
let assump = 0


const sound = new Audio("assets/smash.mp3")
// Timer set
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };
  
  const TIME_LIMIT = 30;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  let remainingPathColor = COLOR_CODES.info.color;
  
  document.getElementById("app").innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
  </div>`;
  
 
  
  function onTimesUp() {
    clearInterval(timerInterval);
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
  
      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
  
  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
  
  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }
  
  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
   
var timer1;

function stop(){
  alert("Timer stopped");
  (clearInterval(timer1),refresh);
}
function win(){
  // process.exit(0);
  alert("You completed Finally congratulations.");
  // if(i==win)
  // {
  //   console.log("Terminate");
  // }
  // ProcessingInstruction.
  // var windowID;
  // return;
  // process.exit(0);
// function close_window() {

//   if ( windowID ) {

//        windowID.close();

//        windowID = null;

//   }

// };

  // onTimesUp()
  // return
  
  // clearInterval(timer1)
  // timer1.stop();
  // clearTimeout(onTimesUp)

  // clearInterval(timerInterval);
  
  // (clearInterval(timer1),refresh);
}

// User input
function myProb() {
  assump = prompt("How many times will you smash?");
  assump.textContent = assump
  if (assump != null) {
    document.getElementById("assump").innerHTML =
    "You think you can smash " + assump + "   times!";
    run();
  }
}

// Game start
function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole') 
    img.src = 'assets/one.png'

    img.addEventListener('click', () => {
        score += 1
        var probability = score/assump
        
        var n = probability.toFixed(3)
        sound.play()
        scoreEl.textContent = score
        probEl.textContent = n
        if(probability==1)
        {

          win();
          // process.exit(0);
          
        }

        document.getElementById("res").innerHTML = 
        "You've smashed " + score + "   times!";

        img.src = 'assets/mysquu.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 100)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500)

    timer1 = setInterval(function() {
      alert("TIME OVER");
      clearInterval(timer1)
      if(assump<=score)
      {
        document.getElementById("wl").innerHTML = "You Tried your Best!";
      }
      else
      {
        document.getElementById("wl").innerHTML = "YOU LOST!";
      }
    }, 30000);
}

// Run function with limited clicks/chances


window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})

let btn = document.querySelector('button');
btn.addEventListener("click", function() {
    //Disable start button after clicking once
    btn.disabled = true;

}, {once : true});

// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}