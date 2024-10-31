import {
  GET_CLIENTES,
  HANDLE_MODAL_CLOSE,
  HANDLE_MODAL_SHOW,
  CHANGE_THEME,
  GET_LOCALIDADES,
  HANDLE_ACTIVE_MODAL
} from "../types";
export const GlobalReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CLIENTES:
      return {
        ...state,
        clientes: payload,
      };
    case HANDLE_MODAL_CLOSE:
      return {
        ...state,
        modalShow: payload,
      };
    case HANDLE_MODAL_SHOW:
      return {
        ...state,
        modalShow: payload,
      };
    case CHANGE_THEME:
      return {
        ...state,
        darkTheme: payload,
      };
    case GET_LOCALIDADES:
      return {
        ...state,
        localidades: payload,
      };
    case HANDLE_ACTIVE_MODAL:
      return {
        ...state,
        activeModal: payload,
      };
    default:
      return state;
  }
};
