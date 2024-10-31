import { createContext, useReducer, useContext } from "react";
import { GlobalReducer } from "./GlobalReducer";
import { GoogleSheet } from "../../API/AuthGoogle";

const ss = {
  clientes: import.meta.env.VITE_SS_CLIENTES,
};
const nameSheet = {
  clientes: "Datos Generales",
  localidades: "Localidades",
};

const clientesGoogleSheet = new GoogleSheet({
  sheetId: ss.clientes,
  nameSheet: nameSheet.clientes,
  range: `${nameSheet.clientes}!A1:ZZZ`,
  rowHead: 1
});
const localidadesGoogleSheet = new GoogleSheet({
  sheetId: ss.clientes,
  nameSheet: nameSheet.localidades,
  range: `${nameSheet.localidades}!A1:ZZZ`,
});

const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    darkTheme: false,
    modalShow: false,
    clientes: [],
    localidades: [],
    activeModal: null,
  };
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const handleModalClose = () => {
    dispatch({
      type: "HANDLE_ACTIVE_MODAL",
      payload: null,
    });
  };
  const handleModalShow = (modalId) => {
    dispatch({
      type: "HANDLE_ACTIVE_MODAL",
      payload: modalId,
    });
  };
  const handleThemeChange = () => {
    dispatch({
      type: "CHANGE_THEME",
      payload: !state.darkTheme,
    });
    const root = document.documentElement;
    root.setAttribute("data-bs-theme", !state.darkTheme ? "dark" : "light");
  };

  const getClientes = async () => {
    const data = await clientesGoogleSheet.getData();
    dispatch({
      type: "GET_CLIENTES",
      payload: data,
    });
  };
  const createCliente = async (data) => {
    try {
      const rsp = await clientesGoogleSheet.postData(data);
      getClientes();
      return rsp;
    }
    catch(err) {
      console.log(err);
    } 
  }
  const updateCliente = async (data) => {
    try {
      const rsp = await clientesGoogleSheet.updateData({colName: "id", id: data.id, values: data});
      getClientes();
      return rsp;
    }
    catch(err) {
      console.log(err);
    } 
  }
  const getLocalidades = async () => {
    const data = await localidadesGoogleSheet.getData();
    dispatch({
      type: "GET_LOCALIDADES",
      payload: data,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        clientes: state.clientes,
        getClientes,
        modalShow: state.modalShow,
        activeModal: state.activeModal,
        handleModalShow,
        handleModalClose,
        darkTheme: state.darkTheme,
        handleThemeChange,
        localidades: state.localidades,
        getLocalidades,
        createCliente,
        updateCliente
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
