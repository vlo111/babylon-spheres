import React, { FC } from 'react';
import * as CANNON from 'cannon';

import '@babylonjs/core/Physics/physicsEngineComponent';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import { CannonJSPlugin } from '@babylonjs/core/Physics';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';

import { Scene, Engine } from 'react-babylonjs';
import { useArcRotateCamera } from '../hooks/use-arc-rotate-camera';
import { useShadowLight } from '../hooks/use-shadow-light';
import { useShadowGenerator } from '../hooks/use-shadow-generator';
import { useGround } from '../hooks/use-ground';

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

export const SceneComponent: FC<{ children: React.ReactNode }> = ({ children }) => {
  const cameraProps = useArcRotateCamera();
  const shadowLightProps = useShadowLight();
  const shadowGeneratorProps = useShadowGenerator();
  const groundProps = useGround();

  return (
    <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
      <Scene enablePhysics={[gravityVector, new CannonJSPlugin()]}>
        <arcRotateCamera name="arc" {...cameraProps} />
        <directionalLight name="shadow-light" {...shadowLightProps}>
          <shadowGenerator {...shadowGeneratorProps}>{children}</shadowGenerator>
        </directionalLight>

        <ground name="ground1" {...groundProps}>
          <physicsImpostor type={PhysicsImpostor.BoxImpostor} _options={{ mass: 0, restitution: 0.9 }} />
        </ground>
        <vrExperienceHelper webVROptions={{ createDeviceOrientationCamera: false }} enableInteractions={true} />
      </Scene>
    </Engine>
  );
};
export default SceneComponent;
