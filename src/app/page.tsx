"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styles from "./page.module.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const Model = () => {
    const model = useGLTF("/models/diels_alder_regiochemistry/scene.gltf");
    return <primitive object={model.scene} />;
};

export default function Home() {
    return (
        <div className={styles.page}>
            <Canvas>
                <Suspense>
                    <Model />
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </div>
    );
}
