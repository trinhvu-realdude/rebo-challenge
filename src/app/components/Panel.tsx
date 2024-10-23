import React from "react";
import styles from "../styles/panel.module.css";
import { Preview } from "./Preview";
import { useAppContext } from "@/app/context";
import { modelInformation } from "../constants/constants";

export const Panel = () => {
    const { panelInfo, setIsAnimated } = useAppContext();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsAnimated(e.target.value === "animation");
    };

    return (
        <div className={styles.panel}>
            <select name="status" onChange={handleSelectChange}>
                <option value="static">Static</option>
                <option value="animation">Animation</option>
            </select>
            {/* <p>Interaction: {interaction}</p> */}
            {panelInfo ? (
                <>
                    {modelInformation && (
                        <div>
                            <p>Model: {modelInformation.title}</p>
                            <p>
                                Author:{" "}
                                <a href={modelInformation.author.url}>
                                    {modelInformation.author.name}
                                </a>
                            </p>
                            <p>
                                Source:{" "}
                                <a
                                    href={modelInformation.source}
                                    target="_blank"
                                >
                                    URL
                                </a>
                            </p>
                            <p>
                                License:{" "}
                                <a
                                    href={modelInformation.license.url}
                                    target="_blank"
                                >
                                    {modelInformation.license.type}
                                </a>
                            </p>
                            <p>Requirements: {modelInformation.requirements}</p>
                        </div>
                    )}
                    <p>
                        You just clicked to <strong>{panelInfo.name}</strong>
                    </p>
                    <Preview object3D={panelInfo} />
                </>
            ) : (
                <p>Click on the model to view details</p>
            )}
        </div>
    );
};
