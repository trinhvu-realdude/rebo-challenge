import { useAppContext } from "@/app/context";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { AnimationMixer } from "three";
import { GLTFLoader, OutlineEffect } from "three/examples/jsm/Addons.js";

extend({ OutlineEffect });
export const Model = () => {
    const { setPanelInfo, isAnimated } = useAppContext();
    const { scene, animations } = useLoader(
        GLTFLoader,
        "/models/diels_alder_regiochemistry/scene.gltf"
    );

    const mixer = new AnimationMixer(scene);

    const actions = animations.map((clip) => mixer.clipAction(clip));

    // Start the animations
    actions.forEach((action) => {
        action.play();
        action.setEffectiveTimeScale(2);
    });

    useFrame((_, delta) => {
        if (isAnimated) mixer.update(delta);
    });

    const handleClick = (e: any) => {
        const object = e.object;
        setPanelInfo(object);
    };
    return (
        <primitive
            object={scene}
            onClick={handleClick}
            // position={[0, 0, 0]}
            castShadow
            receiveShadow
        />
    );
};
