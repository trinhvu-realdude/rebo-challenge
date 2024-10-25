import React, { createContext, useState, useContext, ReactNode } from "react";
import { Mesh } from "three";

type AppState = {
    panelInfo: Mesh | null;
    setPanelInfo: React.Dispatch<React.SetStateAction<Mesh | null>>;
    isAnimated: boolean;
    setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
    interaction: string | null;
    setInteraction: React.Dispatch<React.SetStateAction<string | null>>;
    isGrabbing: boolean;
    setIsGrabbing: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [panelInfo, setPanelInfo] = useState<Mesh | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const [interaction, setInteraction] = useState<string | null>(null);
    const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{
                panelInfo,
                setPanelInfo,
                isAnimated,
                setIsAnimated,
                interaction,
                setInteraction,
                isGrabbing,
                setIsGrabbing,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppState => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
