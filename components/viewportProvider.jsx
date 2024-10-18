'use client';
import { createContext, useContext, useState } from 'react';

const viewportContext = createContext();

export const useViewport = () => useContext(viewportContext);

export const ViewportProvider = ({ children }) => {
    const [currentView, setCurrentView] = useState(null);

    return <viewportContext.Provider value={{ currentView, setCurrentView }}>{children}</viewportContext.Provider>;
};
