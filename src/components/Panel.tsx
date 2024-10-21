import React from "react";

export const Panel: React.FC<{
    panelInfo: { uuid: string; name: string } | null;
}> = ({ panelInfo }) => {
    if (!panelInfo) return null;

    return (
        <div className="panel">
            <h2>{panelInfo.uuid}</h2>
            <p>{panelInfo.name}</p>
        </div>
    );
};
