export const useShadowGenerator = () => {
  const mapSize = 1024;
  const useBlurExponentialShadowMap = true;
  const blurKernel = 32;
  const darkness = 0.8;
  const forceBackFacesOnly = true;
  const depthScale = 100;
  const shadowCastChildren = true;

  return {
    mapSize,
    useBlurExponentialShadowMap,
    blurKernel,
    darkness,
    forceBackFacesOnly,
    depthScale,
    shadowCastChildren,
  };
};
