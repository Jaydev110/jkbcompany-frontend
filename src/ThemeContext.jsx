import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();


// =========================================
// THEME PROVIDER
// =========================================

export function ThemeProvider({ children }) {

  // -----------------------------------------
  // FIND LOGGED-IN USER
  // -----------------------------------------

  const getUserRole = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      return user?.role || null;

    } catch {
      return null;
    }
  };


  const [role, setRole] = useState(
    getUserRole()
  );


  // -----------------------------------------
  // GET CORRECT STORAGE KEY
  // -----------------------------------------

  const getStorageKey = (currentRole) => {

    if (currentRole === "admin") {
      return "jkbAdminTheme";
    }

    if (currentRole === "employee") {
      return "jkbEmployeeTheme";
    }

    return null;
  };


  // -----------------------------------------
  // LOAD INITIAL THEME
  // -----------------------------------------

  const getInitialTheme = () => {

    const currentRole = getUserRole();

    if (currentRole === "admin") {

      return (
        localStorage.getItem(
          "jkbAdminTheme"
        ) || "light"
      );

    }

    if (currentRole === "employee") {

      return (
        localStorage.getItem(
          "jkbEmployeeTheme"
        ) || "light"
      );

    }

    return "light";
  };


  const [theme, setTheme] = useState(
    getInitialTheme
  );


  // =========================================
  // APPLY THEME
  // =========================================

  useEffect(() => {

    const currentRole = getUserRole();

    setRole(currentRole);

    const storageKey =
      getStorageKey(currentRole);


    let currentTheme = "light";


    if (storageKey) {

      currentTheme =
        localStorage.getItem(
          storageKey
        ) || "light";

    }


    setTheme(currentTheme);


    // ---------------------------------------
    // APPLY TO HTML + BODY
    // ---------------------------------------

    document.documentElement.setAttribute(
      "data-theme",
      currentTheme
    );

    document.body.setAttribute(
      "data-theme",
      currentTheme
    );

  }, []);


  // =========================================
  // CHANGE THEME
  // =========================================

  const changeTheme = (newTheme) => {

    if (
      newTheme !== "light" &&
      newTheme !== "dark"
    ) {
      return;
    }


    const currentRole =
      getUserRole();

    const storageKey =
      getStorageKey(currentRole);


    // ---------------------------------------
    // SAVE SEPARATELY
    // ---------------------------------------

    if (storageKey) {

      localStorage.setItem(
        storageKey,
        newTheme
      );

    }


    // ---------------------------------------
    // UPDATE REACT
    // ---------------------------------------

    setTheme(newTheme);


    // ---------------------------------------
    // APPLY GLOBALLY TO CURRENT PORTAL
    // ---------------------------------------

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    document.body.setAttribute(
      "data-theme",
      newTheme
    );

  };


  // =========================================
  // SET THEME
  // =========================================

  const setThemeForCurrentUser = (
    newTheme
  ) => {

    changeTheme(newTheme);

  };


  // =========================================
  // TOGGLE
  // =========================================

  const toggleTheme = () => {

    changeTheme(
      theme === "light"
        ? "dark"
        : "light"
    );

  };


  return (
    <ThemeContext.Provider
      value={{
        theme,
        role,
        setTheme:
          setThemeForCurrentUser,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}


// =========================================
// CUSTOM HOOK
// =========================================

export function useTheme() {
  return useContext(
    ThemeContext
  );
}