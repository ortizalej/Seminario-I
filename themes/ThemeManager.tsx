import * as React from "react";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import ManageThemeProvider from "./ManageThemeProvider";

const ThemeManager = ({ children }) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
);

export default ThemeManager;
