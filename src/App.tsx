import React, { useEffect, useRef } from 'react';
import { createBabylonScene } from './babylonScene';
import {useFonts} from "./babylonScene/use-fonts";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { fontsReady } = useFonts();

  useEffect(() => {
    if (canvasRef.current) {
      const babylonScene = createBabylonScene(canvasRef.current, fontsReady);

      const renderLoop = () => {
        babylonScene.render();
      };

      const engine = babylonScene.getEngine();
      engine.runRenderLoop(renderLoop);

      window.addEventListener('resize', () => {
        engine.resize();
      });

      return () => {
        babylonScene.dispose();
      };
    }
  }, [fontsReady]);

  return (
      <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
      />
  );
};

export default App;
