import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Mesh } from "three";
import styles from "../styles/preview.module.css";

export const Preview: React.FC<{
    object3D: Mesh | undefined;
}> = ({ object3D }) => {
    return (
        <div className={styles.preview}>
            {object3D && (
                <Canvas>
                    <ambientLight />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <primitive object={object3D.clone()} />
                    <Environment preset="sunset" />
                    <OrbitControls />
                </Canvas>
            )}
        </div>
    );
};
