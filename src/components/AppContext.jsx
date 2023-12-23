import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [companyID, setCompanyID] = useState(null);
  const [cvrNum, setCvrNum] = useState(null);
  const [urlID, setUrlID] = useState(null);

  return (
    <AppContext.Provider
      value={{ companyID, setCompanyID, cvrNum, setCvrNum, urlID, setUrlID }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
