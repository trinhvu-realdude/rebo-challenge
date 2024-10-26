import { useAppContext } from "@/app/context";
import { ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { AnimationMixer, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Model = () => {
    const { setPanelInfo, isAnimated, isPlaying } = useAppContext();
    const { scene, animations } = useLoader(
        GLTFLoader,
        "/models/diels_alder_regiochemistry/scene.gltf"
    );

    const animationMixerRef = useRef<AnimationMixer | null>(null);

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

    return (
        <primitive
            object={scene}
            onClick={(e: ThreeEvent<MouseEvent>) => {
                const object = e.object as Mesh;
                setPanelInfo(object);
            }}
            castShadow
            receiveShadow
        />
    );
};
