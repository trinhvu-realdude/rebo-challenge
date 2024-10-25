import React from "react";
import styles from "../styles/panel.module.css";
import { Preview } from "./Preview";
import { useAppContext } from "@/app/context";
import { modelInformation } from "../constants/constants";

export const Panel = () => {
    const { panelInfo, isAnimated, setIsAnimated } = useAppContext();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsAnimated(e.target.value === "animation");
    };

    return (
        <div className={styles.panel}>
            <select name="status" onChange={handleSelectChange}>
                <option value="static">Static</option>
                <option value="animation">Animation</option>
            </select>
            {isAnimated && <button>Play</button>}
            {/* <p>Interaction: {interaction}</p> */}
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
