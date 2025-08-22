import { useEffect, useState } from 'react';
import axios from 'axios';
import TextInput from './components/TextInput';
import TextToSpeech from './components/TextToSpeech';
import FlowChart from './components/FlowChart';
import Mermaid from './components/Mermaid';

function App() {
  const [text, setText] = useState('');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [flowData, setFlowData] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [fontStyle, setFontStyle] = useState('opendyslexic');
  const [storedFlowcharts, setStoredFlowcharts] = useState([]);
  const [showStored, setShowStored] = useState(false);

  const handleSimplify = async () => {
    console.log("Simplify button clicked. Sending:", text);
    try {
      const res = await axios.post("http://localhost:8000/api/simplify/", { text });
      console.log("Simplified response:", res.data);
      const simplified = res.data.simplified;
      setSimplifiedText(simplified);
    } catch (err) {
      console.error("Simplify Error:", err.message);
    }
  };

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices(); // Preload voices
    };
  }, []);

  const speakSimplified = (text) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    const preferredVoice = voices.find(voice =>
      voice.name.includes('Google UK English Female')
    );

    const utterance = new SpeechSynthesisUtterance(text);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    synth.speak(utterance);
  };


  const handleVisualize = async () => {
    console.log("Visualize button clicked. Sending:", text);
    try {
      const res = await axios.post("http://localhost:8000/api/visualize/", { text });
      console.log("Flowchart response:", res.data);
      setFlowData(res.data.flowchart);
    } catch (err) {
      console.error("Visualize Error:", err.message);
    }
  };

  const fetchStoredFlowcharts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      const onlyFlowcharts = res.data.filter(entry => entry.flowchart);
      setStoredFlowcharts(onlyFlowcharts);
      setShowStored(true);
    } catch (err) {
      console.error("Fetch flowcharts failed:", err);
    }
  };

  const storeFlowchart = async () => {
    if (!text || !flowData) return;
    try {
      await axios.post("http://localhost:5000/api/users", {
        text,
        flowchart: flowData,
        preferences: {
          font: fontStyle,
          darkMode: darkMode,
        }
      });
      alert("Flowchart saved successfully!");
    } catch (err) {
      console.error("Failed to store flowchart:", err);
    }
  };


  const fontClasses = {
    opendyslexic: 'font-opendyslexic',
    lexend: 'font-lexend',
    atkinson: 'font-atkinson'
  };

  return (
    <div
      className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        } ${fontClasses[fontStyle]}`}
    >
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-wide mb-2">Visual Learning Assistant For Dyslexics</h1>
        <p className="text-sm text-gray-400">
          Designed to support dyslexic students with simplified and visual learning
        </p>
      </header>

      {/* Font and Theme Controls */}
      <div className="flex justify-center flex-wrap gap-6 mb-6">
        <select
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value)}
          className="appearance-none px-4 py-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-blue-500 hover:text-white transition"
        >
          <option value="opendyslexic">OpenDyslexic</option>
          <option value="lexend">Lexend Deca</option>
          <option value="atkinson">Atkinson Hyperlegible</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 border rounded-md hover:bg-blue-500 hover:text-white transition"
        >
          Toggle Theme
        </button>

        <button
          onClick={fetchStoredFlowcharts}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Stored Flowcharts
        </button>
      </div>

      {showStored && (
        <div className="my-6 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">📁 Stored Flowcharts</h2>
            <button onClick={() => setShowStored(false)} className="text-red-500 font-semibold">
              ✖ Close
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {storedFlowcharts.map((item, index) => (
              <li key={index} className="bg-white dark:bg-gray-700 p-3 rounded shadow">
                <p className="text-sm text-gray-500">📝 {item.text}</p>
                <div className="mt-2 p-2 bg-gray-200 dark:bg-gray-600 rounded">
                  <Mermaid chart={item.flowchart} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}


      <TextInput text={text} setText={setText} />

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        <TextToSpeech text={text} />
        <button
          onClick={handleSimplify}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Simplify Text
        </button>
        <button
          onClick={handleVisualize}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Visualize Text
        </button>
      </div>

      {simplifiedText && (
        <div className="my-4">
          <h2 className="ml-[160px] text-lg font-bold">Simplified Text:</h2>
          <p className='ml-[160px] mr-[160px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black dark:bg-gray-800 dark:text-white'>{simplifiedText}</p>
          <button
            onClick={() => speakSimplified(simplifiedText)}
            className="ml-[160px] mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            🔊 Read Aloud
          </button>
        </div>
      )}

      {flowData && (
        <div className="mt-8">
          <h2 className="ml-[160px] text-xl font-semibold mb-2">Visual Flowchart</h2>
          <FlowChart data={flowData} />

          <div className="flex justify-end mt-2">
            <button
              onClick={storeFlowchart}
              className="mr-[160px] px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              💾 Store Flowchart
            </button>
          </div>
        </div>
      )}




    </div>
  );
}

export default App;
