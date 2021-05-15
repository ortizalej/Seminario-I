import React, {
  useState,
  useEffect,
  createContext,
  ReactChildren,
  ReactChild,
} from "react";
import { StatusBar } from "react-native";

import { Appearance, AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "styled-components/native";
import lightTheme from "./light";
import darkTheme from "./dark";

const defaultMode = Appearance.getColorScheme() || "light";
const ThemeContext = createContext({
  mode: defaultMode,
  setMode: (mode: any) => console.log(mode),
});

export const useTheme = () => React.useContext(ThemeContext);

const ManageThemeProvider = ({ children }: any) => {
  const [themeState, setThemeState] = useState(defaultMode);
  const setMode = (mode: any) => {
    setThemeState(mode);
  };
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  return (
    <ThemeContext.Provider value={{ mode: themeState, setMode }}>
      <ThemeProvider
        theme={themeState === "dark" ? darkTheme.theme : lightTheme.theme}
      >
        <>
          {/* <StatusBar
            barStyle={themeState === "dark" ? "dark-content" : "light-content"}
          /> */}
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ManageThemeProvider;
