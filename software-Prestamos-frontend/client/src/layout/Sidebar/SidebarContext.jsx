import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};
