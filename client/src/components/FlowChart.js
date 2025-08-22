import React, { useEffect } from 'react';
import mermaid from 'mermaid';

function FlowChart({ data }) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: "base", themeVariables: {
      primaryColor: '#fbbf24',
      fontFamily: 'OpenDyslexic, sans-serif',
      textColor: '#000',
    }});
    mermaid.init(undefined, '.mermaid');
  }, [data]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white text-black rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-2">Flowchart</h3>
      <div className="mermaid text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
        {data}
      </div>
    </div>
  );
}

export default FlowChart;
