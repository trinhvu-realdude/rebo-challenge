"use client";
import styles from "../app/styles/page.module.css";
import React from "react";
import { AppProvider } from "./context";
import { Frame } from "./components/Frame";
import { Panel } from "./components/Panel";

export default function Home() {
    return (
        <AppProvider>
            <div className={styles.page}>
                <Frame />
                <Panel />
            </div>
        </AppProvider>
    );
}
