import { Html, useProgress } from "@react-three/drei";
import React from "react";

export const Loader = () => {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
};
