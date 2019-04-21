//Getting the API
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateVaue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

let voices = [];

//Gets the voices from the API
const getVoices = () => {
    voices = synth.getVoices();

    //Go through Voices and create an option
    voices.forEach(voice => {
        //Creates a new <option> element in the DOM
        const option = document.createElement('option');
        // Fill the option element
        option.textContent = voice.name + '('+ voice.lang +')';
        //Set attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        //Append the created option to the <select>
        voiceSelect.appendChild(option);

    });
}

getVoices();
// Waits for the voices to be taken from the API and then proceeds
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


const speak = () => {
    if(synth.speaking){
        console.log('Already speaking...')
    }
    if(textInput.value !== ''){
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Once it is done speaking 
        speakText.onend = e => {
            console.group();
        }

        speakText.onerror = e => {
            console.error('ERROR')
        }

        //Get selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');


        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
}

// Event listeners

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate changed
rate.addEventListener('change', e => rateVaue.textContent = rate.value)
// Pitch
pitch.addEventListener('change', e => pitchVaue.textContent = pitch.value)


//Voice select change

voiceSelect.addEventListener('change', e => speak());

