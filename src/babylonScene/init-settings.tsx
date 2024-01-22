import {
    ArcRotateCamera,
    DirectionalLight,
    Mesh,
    MeshBuilder,
    PhysicsImpostor,
    Scene,
    ShadowGenerator,
    Vector3
} from "@babylonjs/core";

export const createChildCircleNode = (name: string, parent: Mesh, position: Vector3, scene: Scene): Mesh => {
    const childNode = MeshBuilder.CreateBox(name, { size: 1 }, scene);
    childNode.position = position;
    childNode.parent = parent;

    return childNode;
}

export const createCamera = (scene: Scene): ArcRotateCamera => {
    const camera = new ArcRotateCamera('arc', -Math.PI / 2, 0.2 + Math.PI / 4, 14, new Vector3(0, 1, 0), scene);
    camera.attachControl(scene, true);
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 20;
    camera.upperBetaLimit = Math.PI / 2;
    camera.minZ = 0.001;
    return camera;
};

export const createGround = (scene: Scene): Mesh => {
    const ground = MeshBuilder.CreateGround('ground1', { width: 24, height: 24, subdivisions: 2 }, scene);
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    return ground;
};

export const createLightAndShadow = (scene: Scene): { light: DirectionalLight; shadowGenerator: ShadowGenerator } => {
    const light = new DirectionalLight('shadow-light', new Vector3(-1, -2, -1), scene);
    light.direction = Vector3.Zero();
    light.position = new Vector3(-40, 30, -40);
    light.intensity = 0.4;
    light.shadowMinZ = 1;
    light.shadowMaxZ = 2500;
    light.setDirectionToTarget(Vector3.Zero());

    const shadowGenerator = new ShadowGenerator(1024, light);

    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;
    shadowGenerator.darkness = 0.8
    shadowGenerator.forceBackFacesOnly = true;
    shadowGenerator.depthScale = 100;

    return { light, shadowGenerator };
};
