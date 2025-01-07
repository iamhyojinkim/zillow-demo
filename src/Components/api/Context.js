import { createContext, useContext, useState, useEffect } from "react";
import getProperties from "./getProperties";
import { onAuthStateChange } from "./firebase";

export const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [pro, setPro] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChange((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchProp = async () => {
      const properties = await getProperties();
      setPro(properties);
    };
    fetchProp();
  }, []);

  return (
    <PropertyContext.Provider value={{ pro, setPro, user, setUser }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  return useContext(PropertyContext);
}
