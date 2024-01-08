import { useEffect, useRef } from 'react';
import * as CANNON from 'cannon';

import {
  ArcRotateCamera,
  Engine,
  MeshBuilder,
  Scene,
  ShadowGenerator,
  Vector3,
  DirectionalLight,
  HemisphericLight,
} from '@babylonjs/core';

import { CannonJSPlugin, PhysicsImpostor } from '@babylonjs/core/Physics';
import { Inspector } from '@babylonjs/inspector';

const gravityVector = new Vector3(0, -9.81, 0);

window.CANNON = CANNON;

function BabylonScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const engine = new Engine(ref.current, true, {
      adaptToDeviceRatio: true,
    });

    if (ref) {
      const scene = new Scene(engine);

      Inspector.Show(scene, {});

      scene.enablePhysics(gravityVector, new CannonJSPlugin());

      const camera = new ArcRotateCamera('camera', -Math.PI / 2, 0.2 + Math.PI / 4, 14, new Vector3(0, 1, 0), scene);
      camera.attachControl(ref.current, true);
      camera.wheelPrecision = 50;
      camera.lowerRadiusLimit = 8;
      camera.upperRadiusLimit = 20;
      camera.upperBetaLimit = Math.PI / 2;
      camera.minZ = 0.001;

      // Create a directional light
      const light = new DirectionalLight('dirLight', new Vector3(0, -1, 0), scene);
      light.direction = Vector3.Zero();
      light.position = new Vector3(-40, 30, -40);
      light.setDirectionToTarget = (target: Vector3) => Vector3.Zero();
      light.intensity = 0.4;
      light.shadowMinZ = 1;
      light.shadowMaxZ = 2500;

      const shadowGenerator = new ShadowGenerator(1024, light);

      shadowGenerator.mapSize = 1024;
      shadowGenerator.useBlurExponentialShadowMap = true;
      shadowGenerator.blurKernel = 32;
      shadowGenerator.darkness = 0.8;
      shadowGenerator.forceBackFacesOnly = true;
      shadowGenerator.depthScale = 100;

      const sphere = MeshBuilder.CreateSphere('sphere' + 1, { diameter: 2, segments: 32 }, scene);

      sphere.position = new Vector3(0, 0, 0);

      const ground = MeshBuilder.CreateGround(
        'ground123',
        {
          width: 24,
          height: 24,
          subdivisions: 2,
        },
        scene
      );

      // Add physics impostor to the ground
      ground.physicsImpostor = new PhysicsImpostor(
        ground,
        PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.9 },
        scene
      );

      // Attach the shadow generator to the ground mesh
      shadowGenerator.addShadowCaster(ground);

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });
    }
    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={ref} style={{ width: '100%', height: window.innerHeight - 160 }} />;
}

export const Graph3D = () => <BabylonScene />;
