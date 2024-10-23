"use client";
import styles from "../styles/page.module.css";
import React, { useState } from "react";
import { Panel } from "@/components/Panel";
import { Frame } from "@/components/Frame";
import { Mesh, Object3D } from "three";

export default function Home() {
    const [panelInfo, setPanelInfo] = useState<Mesh | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);

    return (
        <div className={styles.page}>
            <Frame setPanelInfo={setPanelInfo} isAnimated={isAnimated} />
            <Panel panelInfo={panelInfo} setIsAnimated={setIsAnimated} />
        </div>
    );
}
