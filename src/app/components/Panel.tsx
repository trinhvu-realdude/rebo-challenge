import React from "react";
import styles from "../styles/panel.module.css";
import { Preview } from "./Preview";
import { useAppContext } from "@/app/context";
import { modelInformation } from "../constants/constants";

export const Panel = () => {
    const { panelInfo, isAnimated, setIsAnimated, setIsPlaying, isPlaying } =
        useAppContext();

    return (
        <div className={styles.panel}>
            <div className={styles.selectGroup}>
                <select
                    name="status"
                    onChange={(e) =>
                        setIsAnimated(e.target.value === "animation")
                    }
                >
                    <option value="static">Static</option>
                    <option value="animation">Animation</option>
                </select>
            </div>

            {isAnimated && (
                <div className={styles.btnGroup}>
                    <button
                        style={{
                            backgroundColor: isPlaying ? "green" : "",
                            color: isPlaying ? "white" : "",
                        }}
                        onClick={() => setIsPlaying(true)}
                    >
                        Play
                    </button>
                    <button
                        style={{
                            backgroundColor: !isPlaying ? "red" : "",
                            color: !isPlaying ? "white" : "",
                        }}
                        onClick={() => setIsPlaying(false)}
                    >
                        Stop
                    </button>
                </div>
            )}

            {panelInfo ? (
                <>
                    {modelInformation && (
                        <div className={styles.panelInfo}>
                            <p>
                                <strong>Model: </strong>
                                {modelInformation.title}
                            </p>
                            <p>
                                <strong>Author: </strong>
                                <a href={modelInformation.author.url}>
                                    {modelInformation.author.name}
                                </a>
                            </p>
                            <p>
                                <strong>Source: </strong>
                                <a
                                    href={modelInformation.source}
                                    target="_blank"
                                >
                                    URL
                                </a>
                            </p>
                            <p>
                                <strong>License: </strong>
                                <a
                                    href={modelInformation.license.url}
                                    target="_blank"
                                >
                                    {modelInformation.license.type}
                                </a>
                            </p>
                            <p>
                                <strong>Requirements: </strong>
                                {modelInformation.requirements}
                            </p>
                        </div>
                    )}
                    <p>
                        <i>
                            You just clicked to{" "}
                            <strong>{panelInfo.name}</strong>
                        </i>
                    </p>
                    <Preview object3D={panelInfo} />
                </>
            ) : (
                <p>Click on the model to view details</p>
            )}
        </div>
    );
};
