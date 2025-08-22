import React from 'react';

function TextInput({ text, setText }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <label htmlFor="text-input" className="block text-lg font-medium mb-2">
        Enter Text to Simplify and Visualize
      </label>
      <textarea
        id="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={8}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black dark:bg-gray-800 dark:text-white resize-y"
      />
    </div>
  );
}

export default TextInput;
