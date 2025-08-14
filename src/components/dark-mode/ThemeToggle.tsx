import { useDarkMode } from "@/components/dark-mode";
import styles from "./ThemeToggle.module.css";
import { DARK_THEME, LIGHT_THEME } from "./utils";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useDarkMode();
  const isDark = theme === DARK_THEME;

  return (
    <div
      className={styles.themeToggle}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
    >
      <span
        className={`${styles.label} ${!isDark ? styles.active : ""} sr-only`}
      >
        Light
      </span>
      <div
        className={`${styles.toggleTrack} ${
          isDark ? styles.dark : styles.light
        }`}
      >
        <div className={styles.toggleKnob}>
          {theme === LIGHT_THEME ? (
            <FaSun className={styles.lightToggleIcon} />
          ) : (
            <FaMoon className={styles.darkToggleIcon} />
          )}
        </div>
      </div>
      <span
        className={`${styles.label} ${isDark ? styles.active : ""} sr-only`}
      >
        Dark
      </span>
    </div>
  );
};

export default ThemeToggle;
