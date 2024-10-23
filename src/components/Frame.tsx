import styles from "../styles/frame.module.css";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { Model } from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { Loader } from "./Loader";
import { Mesh, Object3D, Object3DEventMap } from "three";

export const Frame: React.FC<{
    setPanelInfo: React.Dispatch<React.SetStateAction<Mesh | null>>;
    isAnimated: boolean;
}> = ({ setPanelInfo, isAnimated }) => {
    const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

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
                <Model setPanelInfo={setPanelInfo} isAnimated={isAnimated} />
                <Environment preset="sunset" />
                <OrbitControls
                    enableRotate={true}
                    onStart={() => setIsGrabbing(true)}
                    onEnd={() => setIsGrabbing(false)}
                />
            </React.Suspense>
        </Canvas>
    );
};
