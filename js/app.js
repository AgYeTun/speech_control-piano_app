// variables

const fonts = [
  "Arial",
  "Baskerville",
  "Bradley Hand",
  "Chalkboard",
  "Georgia",
  "Impact",
  "Monaco",
  "SignPainter",
  "Verdana",
];

// selectors

const output = document.querySelector("#output");
const text = document.querySelector("#text");
const count = document.querySelector("#count");
const color = document.querySelector("#color");
const fontSize = document.querySelector("#fontSize");
const fontSizeLabel = document.querySelector("#fontSizeLabel");
const fontFamily = document.querySelector("#fontFamily");
const controlPanal = document.querySelector("#controlPanal");
const toggleControlPanal = document.querySelector("#toggleControlPanal");
// speech webapi
const synth = window.speechSynthesis;
const textToSpeech = document.querySelector("#textToSpeech");
const speechToText = document.querySelector("#speechToText");

const listen = () => {
  const recognition = new webkitSpeechRecognition();

  // Set the language and start recognition
  recognition.lang = "en-US";
  recognition.start();

  recognition.addEventListener("start", () => {
    speechToText.classList.add("active");
    speechToText.innerHTML = `
      <div class="spinner-border spinner-border-sm text-white mb-0" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
  });
  recognition.addEventListener("end", () => {
    speechToText.classList.remove("active");
    speechToText.innerHTML = `
      <i class="bi bi-mic"></i>
    `;
  });

  // When a speech result is returned
  recognition.onresult = (event) => {
    // Get the transcript of the spoken words
    // console.log(event.results);
    const transcript = event.results[0][0].transcript;

    text.value += " " + transcript;

    // update output
    output.innerText = text.value;
    count.innerText = text.value.length;
  };
};

const speak = (text) => {
  const utterThis = new SpeechSynthesisUtterance();
  utterThis.text = text;
  utterThis.volume = 1;
  utterThis.rate = 1;
  utterThis.pitch = 1;
  utterThis.voice = synth.getVoices()[0];

  utterThis.addEventListener("start", () => {
    textToSpeech.classList.add("active");
  });
  utterThis.addEventListener("end", () => {
    textToSpeech.classList.remove("active");
  });

  synth.speak(utterThis);
};

// --- //
fonts.forEach((font) => {
  fontFamily.append(new Option(font, font));
});

// actions

text.addEventListener("keyup", (e) => {
  output.innerText = e.target.value;
  count.innerText = e.target.value.length;
});

color.addEventListener("change", (e) => {
  output.style.color = e.target.value;
});

fontSize.addEventListener("change", (e) => {
  output.style.fontSize = e.target.value + "px";
  fontSizeLabel.innerText = e.target.value + "px";
});

fontFamily.addEventListener("change", (e) => {
  output.style.fontFamily = e.target.value;
});

toggleControlPanal.addEventListener("click", (e) => {
  controlPanal.classList.toggle("visually-hidden");
  controlPanal.classList.contains("visually-hidden")
    ? (toggleControlPanal.innerText = "<")
    : (toggleControlPanal.innerText = ">");
});

textToSpeech.addEventListener("click", () => {
  speak(text.value);
});

speechToText.addEventListener("click", () => {
  listen();
});
