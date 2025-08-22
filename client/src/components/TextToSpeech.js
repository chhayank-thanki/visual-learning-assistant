import React from 'react';

function TextToSpeech({ text }) {
  const speak = () => {
    if ('speechSynthesis' in window && text.trim() !== '') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={speak}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
    >
      🔊 Read Aloud
    </button>
  );
}

export default TextToSpeech;
