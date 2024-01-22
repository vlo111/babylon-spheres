import {
    Engine, MeshBuilder,
    Scene,
    Vector3,
} from '@babylonjs/core';
import * as CANNON from 'cannon';
import { CannonJSPlugin } from '@babylonjs/core/Physics';
import { Inspector } from '@babylonjs/inspector';
import {createCamera, createGround, createLightAndShadow} from "./init-settings";
import createBouncySphere from "./sphere";
import {Color3} from "@babylonjs/core/Maths/math.color";

const gravityVector = new Vector3(0, -9.81, 0);

window.CANNON = CANNON;

const RADIUS = 5;
const NUMBER_OF_BOXES = 10;

export function createBabylonScene(canvas: HTMLCanvasElement, fontsReady: boolean): Scene {
    const engine = new Engine(canvas, true, {
        adaptToDeviceRatio: true,
    });

    const scene = new Scene(engine);

    scene.enablePhysics(gravityVector, new CannonJSPlugin());

    Inspector.Show(scene, {});

    const camera = createCamera(scene);

    const ground = createGround(scene);

    const { light, shadowGenerator } = createLightAndShadow(scene);

    ground.receiveShadows = true;

    {Array.from(new Array(NUMBER_OF_BOXES), (_, index) => index).map((x) => (
        createBouncySphere(scene, {
            name: x.toFixed(),
            fontsReady,
            position: new Vector3(
                Math.cos(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS,
                3,
                Math.sin(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS
            ),
            color: new Color3(
                Math.abs(x - NUMBER_OF_BOXES / 40) / 15,
                Math.abs(x - NUMBER_OF_BOXES / 50) / 15,
                Math.abs(x - NUMBER_OF_BOXES / 30) / 15
            ),
        })
    ))}

    return scene;
}
