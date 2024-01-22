import { FresnelParameters } from '@babylonjs/core/Materials/fresnelParameters';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { Button } from '@babylonjs/gui/2D/controls/button';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import {CreatePlane} from "@babylonjs/core";

type BouncySphereProps = {
    position: Vector3;
    name: string;
    color: Color3;
    fontsReady: boolean;
};

const createBouncySphere = (scene: Scene, props: BouncySphereProps): Mesh => {
    const { name, position, color, fontsReady } = props;

    const sphere = CreateSphere(`${name}-sphere`, { diameter: 2, segments: 16 }, scene);
    sphere.position = position;

    sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

    const material = new StandardMaterial(`${name}-material`, scene);
    material.specularPower = 16;
    material.diffuseColor = Color3.Black();
    material.emissiveColor = color;
    material.reflectionFresnelParameters = FresnelParameters.Parse({
        isEnabled: true,
        leftColor: [1, 1, 1],
        rightColor: [0, 0, 0],
        bias: 0.1,
        power: 1,
    });

    sphere.material = material;

    const plane = CreatePlane(`${name}-dialog`, {size: 2, sideOrientation: Mesh.BACKSIDE}, scene);
    plane.position = new Vector3(0, 1.5, 0);
    plane.rotation.y = Math.PI;
    plane.parent = sphere;

    const adt = AdvancedDynamicTexture.CreateForMesh(
        plane,
        1024,
        1024
    );

    adt.name = 'dialogTexture';

    const rect = new Rectangle(`${name}-rect`);
    rect.height = '3.5';
    rect.width = '10';
    rect.thickness = 12;
    rect.cornerRadius = 12;
    adt.addControl(rect);

    const button = Button.CreateSimpleButton(`${name}-close-icon`, `${fontsReady ? '\uf00d' : 'X'} name ${name}`);
    button.background = 'darkred';
    button.onPointerDownObservable.add(() => {
        if (sphere.physicsImpostor) {
            sphere.physicsImpostor.applyImpulse(Vector3.Up().scale(10), sphere.getAbsolutePosition());
        }
    });

    const textBlock = new TextBlock(`${name}-text`);
    textBlock.text = `${fontsReady ? '\uf00d' : 'X'} name ${name}`;
    textBlock.fontFamily = 'FontAwesome';
    textBlock.fontStyle = 'bold';
    textBlock.fontSize = 200;
    textBlock.color = 'white';

    button.addControl(textBlock);
    rect.addControl(button);

    return sphere;
};

export default createBouncySphere;
