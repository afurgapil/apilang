import { useSelector } from "react-redux";

export const useTheme = () => {
  const theme = useSelector((state) => state.theme.theme);
  return theme;
};
