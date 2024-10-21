import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { AnimationMixer, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Model: React.FC<{
    setPanelInfo: React.Dispatch<
        React.SetStateAction<{ uuid: string; name: string } | null>
    >;
    isAnimated: boolean;
}> = ({ setPanelInfo, isAnimated }) => {
    const { scene, animations } = useLoader(
        GLTFLoader,
        "/models/diels_alder_regiochemistry/scene.gltf"
    );

    const mixer = new AnimationMixer(scene);

    useEffect(() => {
        let action: any;
        if (animations && animations.length) {
            action = mixer.clipAction(animations[0]);
            if (isAnimated) {
                action.play();
                action.setEffectiveTimeScale(2);
            } else {
                action.stop();
            }
        }

        return () => {
            if (action) {
                action.stop(); // Clean up on unmount
            }
        };
    }, [animations, isAnimated]);

    // Update the mixer in your render loop
    useFrame((state, delta) => {
        if (isAnimated) {
            mixer.update(delta);
        }
    });

    const handleClick = (e: any) => {
        // Extract information about the clicked part of the model
        const object = e.object;
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
