import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "neutral",
});
const Mermaid = ({ chart }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.innerHTML = chart;
            try {
                mermaid.contentLoaded();
            } catch (err) {
                console.error("Mermaid render error:", err.message);
            }
        }
    }, [chart]);

    return <div ref={chartRef} className="mermaid" />;
};

export default Mermaid;
