// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');


//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;


// Init voices array

let voices = [];

const  getVoices = () => 
{
    voices = synth.getVoices();
    
    
    //Loop through voices and create and option for each one
    voices.forEach(voice => 
    {
        //Create an option element
        const option = document.createElement('option');
        //Fill the option with voice and Language
        option.textContent = voice.name + '('+voice.lang+')';

        //set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if (synth.onvoiceschanged !== undefined) 
{
    synth.onvoiceschanged = getVoices;
}

//Speech 

const speak = () => 
{
    //Check if speaking 
    if(synth.speaking)
    {
        console.error('I am speaking...');
        return;
    }
    if(textInput.value !== '') 
    {
    //Get skeap text 
    const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak end
    speakText.onend = e => 
    {
        console.log('Done speaking...');
    }
    //Speak error 
    speakText.onerror = e => 
    {
        console.error('Something went wrong');
    }
    //Selected voice 
    const selectedVoice = voiceSelect.selectedOption[0].getAttribute('data-name');

    //Loop through voices 
    voices.forEach(voice =>
        {
            if(voice.name == selectedVoice) 
            {
                speakText.voice = voice;
            }
        });
    // Set pitch and rate 
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak 
    synth.speak(speakText);

    }
};

//EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => 
{
    e.preventDefault();
    speak();
    textInput.blur();
});
  
  // Rate value change
  rate.addEventListener('change', e => (rateValue.textContent = rate.value));
  
  // Pitch value change
  pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
  
  // Voice select change
  voiceSelect.addEventListener('change', e => speak());