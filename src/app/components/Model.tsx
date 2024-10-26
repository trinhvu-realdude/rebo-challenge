import { useAppContext } from "@/app/context";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Model = () => {
    const { setPanelInfo, isAnimated } = useAppContext();
    const { scene, animations } = useLoader(
        GLTFLoader,
        "/models/diels_alder_regiochemistry/scene.gltf"
    );

    const animationMixerRef = useRef<AnimationMixer | null>(null);

    useEffect(() => {
        // Initialize the AnimationMixer once
        animationMixerRef.current = new AnimationMixer(scene);

        const actions = animations.map((clip) => {
            const action = animationMixerRef.current!.clipAction(clip);
            action.play();
            action.setEffectiveTimeScale(2);
            return action;
        });

        return () => {
            actions.forEach((action) => action.stop());
        };
    }, [animations, scene]);

    // Update mixer in the render loop
    useFrame((_, delta) => {
        if (isAnimated && animationMixerRef.current)
            animationMixerRef.current.update(delta);
    });

    const handleClick = (e: any) => {
        const object = e.object;
        setPanelInfo(object);
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
