import { useAppContext } from "@/app/context";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { AnimationAction, AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Model = () => {
    const { setPanelInfo, isAnimated, isPlaying } = useAppContext();
    const { scene, animations } = useLoader(
        GLTFLoader,
        "/models/diels_alder_regiochemistry/scene.gltf"
    );

    const animationMixerRef = useRef<AnimationMixer | null>(null);
    const actionsRef = useRef<AnimationAction[]>([]);

    useEffect(() => {
        // Initialize the AnimationMixer once with the scene
        animationMixerRef.current = new AnimationMixer(scene);

        const actions = animations.map((clip) => {
            const action = animationMixerRef.current!.clipAction(clip);
            action.setEffectiveTimeScale(3);
            action.play();
            return action;
        });

        return () => {
            actions.forEach((action) => action.stop());
        };
    }, [animations, scene, isAnimated]);

    useEffect(() => {
        if (animationMixerRef.current) {
            animationMixerRef.current.timeScale = isPlaying ? 1 : 0;
        }
    }, [isPlaying]);

    useFrame((_, delta) => {
        if (isAnimated && animationMixerRef.current) {
            animationMixerRef.current.update(delta);
        }
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
