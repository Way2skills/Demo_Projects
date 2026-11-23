import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const initialSettings = {
  institution_name: "Decode Institution",
  address: "4th Cross, Near New Bus Stand,\nNamakkal 637001,\nTamil Nadu,\nIndia",
  phone: "+91 63812 43416",
  email: null,
  website: null,
  logo_url: null,
  about_content: null,
  social_links: null,
};

const SettingsContext = createContext({ settings: initialSettings, error: "" });

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/settings")
      .then(({ data }) => setSettings({ ...initialSettings, ...data }))
      .catch((reason) => setError(reason.response?.data?.detail || "Institution settings could not be loaded."));
  }, []);

  const value = useMemo(() => ({ settings, error }), [settings, error]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useInstitutionSettings() {
  return useContext(SettingsContext);
}
