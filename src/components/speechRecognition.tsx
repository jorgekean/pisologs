import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function SpeechRecognitionExample() {
    const [transcript, setTranscript] = useState('');

    const {
        listening,
        transcript: currentTranscript,
        resetTranscript
    } = useSpeechRecognition();

    const startListening = () => {
        if (SpeechRecognition.browserSupportsSpeechRecognition()) {
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setTranscript(currentTranscript);
        resetTranscript();
    };

    return (
        <div>
            <h1>Speech Recognition Example</h1>
            <p>{transcript}</p>
            <button disabled={listening} onClick={startListening}>
                Start Listening
            </button>
            <button disabled={!listening} onClick={stopListening}>
                Stop Listening
            </button>
        </div>
    );
}

export default SpeechRecognitionExample;
