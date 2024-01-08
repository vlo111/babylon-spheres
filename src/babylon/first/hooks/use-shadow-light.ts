import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export const useShadowLight = () => {
    const direction = Vector3.Zero();
    const position = new Vector3(-40, 30, -40);
    const setDirectionToTarget = [Vector3.Zero()];
    const intensity = 0.4;
    const shadowMinZ = 1;
    const shadowMaxZ = 2500;

    return { direction, intensity, position, shadowMinZ, shadowMaxZ, setDirectionToTarget };
};
