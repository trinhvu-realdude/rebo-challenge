import React from "react";
import styles from "../styles/panel.module.css";

export const Panel: React.FC<{
    panelInfo: { uuid: string; name: string } | null;
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
            {panelInfo && (
                <div>
                    <h2>{panelInfo.uuid}</h2>
                    <p>{panelInfo.name}</p>
                </div>
            )}
        </div>
    );
};
