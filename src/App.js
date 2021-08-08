import React, { useState, useRef, useEffect } from "react";
import { detectColor, detectCssColor } from 'detect-color';

const App = () => {
  const [color, setColor] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef();

  useEffect(() => {
    updateCanvas();
  }, []);

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src =
      "https://images.pexels.com/photos/68525/soap-colorful-color-fruit-68525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    img.crossOrigin = "Anonymous";

    canvas.width = img.width;
    canvas.height = img.height;

    img.onload = function () {
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const img_data = ctx.getImageData(0, 0, img.width, img.height);
      canvas.onmousemove = function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const pix = img_data.data;
        const i = (y * img.width + x) * 4;
        const R = pix[i];
        const G = pix[i + 1];
        const B = pix[i + 2];
        const rgb = `rgb(${R},${G},${B})`;
        setColor(detectCssColor(rgb).detectedColor);
        setMousePosition({ x, y });
      };
    };
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>

      <div
        style={{
          backgroundColor: color,
          width: 30,
          height: 30,
          position: "absolute",
          left: mousePosition.x+20,
          top: mousePosition.y+20,
          border: "2px dotted black",
          borderRadius: "30px",
        }}
      ></div>
      <span style={{position: "absolute",
      color:'white',
          left: mousePosition.x + 20,
          top: mousePosition.y + 55}}>{color}</span>
    </div>
  );
};

export default App;
