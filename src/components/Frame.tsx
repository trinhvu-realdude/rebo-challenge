import styles from "../styles/frame.module.css";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { Model } from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { Loader } from "./Loader";

export const Frame: React.FC<{
    setPanelInfo: React.Dispatch<
        React.SetStateAction<{
            uuid: string;
            name: string;
        } | null>
    >;
}> = ({ setPanelInfo }) => {
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
                <Model setPanelInfo={setPanelInfo} />
                <Environment preset="sunset" />
                <OrbitControls
                    onStart={() => setIsGrabbing(true)}
                    onEnd={() => setIsGrabbing(false)}
                />
            </React.Suspense>
        </Canvas>
    );
};
