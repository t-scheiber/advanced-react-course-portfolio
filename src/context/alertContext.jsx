import {createContext, useContext, useState} from "react";

/** @typedef {{isOpen: boolean, type: string, message: string, onOpen: (type: string, message: string) => void, onClose: () => void}} AlertState */
const AlertContext = createContext(/** @type {AlertState | undefined} */ (undefined));

/** @param {{children: import("react").ReactNode}} props */
export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    // Type can be either "success" or "error"
    type: 'success',
    // Message to be displayed, can be any string
    message: '',
  });

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onOpen: (type, message) => setState({ isOpen: true, type, message }),
        onClose: () => setState({ isOpen: false, type: '', message: '' }),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const value = useContext(AlertContext);
  if (!value) throw new Error("AlertProvider is required");
  return value;
};
