import React from "react";
import { useTheme } from "../theme/ThemeProvider";
export default function usePassTheme(fun: (theme: object) => any) {
  const theme = useTheme();
  return React.useMemo(() => fun(theme), [fun, theme]);
}
