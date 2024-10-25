import styles from "../styles/frame.module.css";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { Model } from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { useAppContext } from "@/app/context";
import { Loader } from "./Loader";

export const Frame = () => {
    const { isGrabbing, setIsGrabbing } = useAppContext();

    return (
        <Canvas
            className={styles.frame}
            style={{
                cursor: isGrabbing ? "grabbing" : "grab",
            }}
        >
            <ambientLight />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <React.Suspense fallback={<Loader />}>
                <Model />
                <Environment preset="sunset" />
                <OrbitControls
                    // onPointerEnter={() => setIsGrabbing(true)}
                    // onEnd={() => setIsGrabbing(false)}
                    // onChange={handleDetectInteraction}
                />
            </React.Suspense>
        </Canvas>
    );
};
