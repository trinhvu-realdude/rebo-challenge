import styles from "../styles/frame.module.css";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Model } from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { useAppContext } from "@/app/context";
import { Loader } from "./Loader";

export const Frame = () => {
    const { setInteraction } = useAppContext();
    const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

    const handleDetectInteraction = (e: any) => {
        // console.log(e.target.object);
    };

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
                    onStart={() => setIsGrabbing(true)}
                    onEnd={() => setIsGrabbing(false)}
                    onChange={handleDetectInteraction}
                />
            </React.Suspense>
        </Canvas>
    );
};
