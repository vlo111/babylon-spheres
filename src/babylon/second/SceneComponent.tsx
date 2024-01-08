import React, { useEffect, useRef, FC, HTMLAttributes } from "react";
import { Engine, Scene, EngineOptions, SceneOptions } from "@babylonjs/core";

type BabylonSceneProps = {
    antialias?: boolean;
    engineOptions?: EngineOptions;
    adaptToDeviceRatio?: boolean;
    sceneOptions?: SceneOptions;
    onRender?: (scene: Scene) => void;
    onSceneReady: (scene: Scene) => void;
} & HTMLAttributes<HTMLCanvasElement>;

const BabylonScene: FC<BabylonSceneProps> = ({
                                                 antialias,
                                                 engineOptions,
                                                 adaptToDeviceRatio,
                                                 sceneOptions,
                                                 onRender,
                                                 onSceneReady,
                                                 ...rest
                                             }) => {
    const reactCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
        const scene = new Scene(engine, sceneOptions);

        if (scene.isReady()) {
            onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof onRender === "function") onRender(scene);
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener("resize", resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };
    }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

    return <canvas ref={reactCanvas} {...rest} />;
};

export default BabylonScene;
