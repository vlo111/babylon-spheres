import React, { FC } from 'react';

import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import BouncySphere from './BouncySphere';

import { Color3 } from '@babylonjs/core';
import { useFonts } from './hooks/use-fonts';
import SceneComponent from './components/scene';

const RADIUS = 5;
const NUMBER_OF_BOXES = 8;

export const BabylonComponent: FC = () => {
  const { fontsReady } = useFonts();

  return (
    <SceneComponent>
      {Array.from(new Array(NUMBER_OF_BOXES), (_, index) => index).map((x) => (
        <BouncySphere
          key={x}
          name={x.toFixed()}
          fontsReady={fontsReady}
          position={
            new Vector3(
              Math.cos(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS,
              3,
              Math.sin(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS
            )
          }
          color={
            new Color3(
              Math.abs(x - NUMBER_OF_BOXES / 40) / 10,
              Math.abs(x - NUMBER_OF_BOXES / 50) / 10,
              Math.abs(x - NUMBER_OF_BOXES / 30) / 10
            )
          }
        />
      ))}
    </SceneComponent>
  );
};

export default BabylonComponent;
