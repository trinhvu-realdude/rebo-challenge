"use client";
import styles from "../styles/page.module.css";
import React, { useState } from "react";
import { Panel } from "@/components/Panel";
import { Frame } from "@/components/Frame";

export default function Home() {
    const [panelInfo, setPanelInfo] = useState<{
        uuid: string;
        name: string;
    } | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);

    return (
        <div className={styles.page}>
            <Frame setPanelInfo={setPanelInfo} isAnimated={isAnimated} />
            <Panel panelInfo={panelInfo} setIsAnimated={setIsAnimated} />
        </div>
    );
}
