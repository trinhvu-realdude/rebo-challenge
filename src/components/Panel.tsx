import React from "react";
import styles from "../styles/panel.module.css";
import { Preview } from "./Preview";
import { Mesh, Object3D, Object3DEventMap } from "three";

export const Panel: React.FC<{
    panelInfo: Mesh | null;
    setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ panelInfo, setIsAnimated }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsAnimated(e.target.value === "animation");
    };

    return (
        <div className={styles.panel}>
            <select name="status" onChange={handleSelectChange}>
                <option value="static">Static</option>
                <option value="animation">Animation</option>
            </select>
            {panelInfo ? (
                <>
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
