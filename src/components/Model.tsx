import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Model: React.FC<{
    setPanelInfo: React.Dispatch<
        React.SetStateAction<{ uuid: string; name: string } | null>
    >;
}> = ({ setPanelInfo }) => {
    const { scene, animations, nodes } = useLoader(
        GLTFLoader,
        "/models/diels_alder_regiochemistry/scene.gltf"
    );

    const mixer = new AnimationMixer(scene);

    useEffect(() => {
        if (animations && animations.length) {
            const action = mixer.clipAction(animations[0]);
            action.play();
        }

        return () => {
            mixer.stopAllAction; // Clean up on unmount
        };
    }, [animations]);

    // Update the mixer in your render loop
    useFrame((state, delta) => mixer.update(delta));

    const handleClick = (e: any) => {
        // Extract information about the clicked part of the model
        const object = e.object;
        console.log("Object: ", object);

        setPanelInfo({
            uuid: object.uuid,
            name: object.name,
        });
    };
    return (
        <primitive
            object={scene}
            onClick={handleClick}
            castShadow
            receiveShadow
        />
    );
};
