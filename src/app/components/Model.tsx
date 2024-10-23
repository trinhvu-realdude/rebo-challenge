import { useAppContext } from "@/app/context";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { AnimationMixer, Mesh, Object3D, Object3DEventMap } from "three";
import { GLTFLoader, OutlineEffect } from "three/examples/jsm/Addons.js";

extend({ OutlineEffect });
export const Model = () => {
    const { setPanelInfo, isAnimated } = useAppContext();
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
            mixer.stopAllAction();
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

        console.log(object);

        // console.log(object.name, object.uuid);
        // console.log(object.material.color);

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
