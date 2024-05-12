import { baseUrl } from "@/app/api/apiSlice";
import CookieHelper from "@/helpers/CookieHelper";
import { profileEnd } from "console";
import React, { createContext, useEffect, useState } from "react";

// Create a context
const GlobalContext = createContext<any>({});

// Create a context provider component
const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Define state or any data you want to share
  const [profileData, setProfileData] = useState<any>("");

  console.log("profileData", profileData);
  //   // Define any functions or logic you need
  //   const updateData = (newData) => {
  //     setData(newData);
  //   };

  // Provide the context value to the children components
  return (
    <GlobalContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
