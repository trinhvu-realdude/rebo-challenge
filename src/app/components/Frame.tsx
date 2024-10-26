import styles from "../styles/frame.module.css";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Model } from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { Loader } from "./Loader";

export const Frame = () => {
    return (
        <Canvas className={styles.frame}>
            <ambientLight />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <React.Suspense fallback={<Loader />}>
                <Model />
                <Environment preset="sunset" />
                <OrbitControls />
            </React.Suspense>
        </Canvas>
    );
};
