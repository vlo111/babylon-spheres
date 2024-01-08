import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export const useArcRotateCamera = () => {
    const target = new Vector3(0, 1, 0);
    const alpha = -Math.PI / 2;
    const beta = 0.2 + Math.PI / 4;
    const wheelPrecision = 50;
    const radius = 14;
    const minZ = 0.001;
    const lowerRadiusLimit = 8;
    const upperRadiusLimit = 20;
    const upperBetaLimit = Math.PI / 2;

    return { target, alpha, beta, wheelPrecision, radius, minZ, lowerRadiusLimit, upperRadiusLimit, upperBetaLimit };
};
