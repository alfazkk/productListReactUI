import { createContext, useReducer, useContext } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = useContext(StateContext);

export const initialState = {
  categories: sessionStorage.getItem("categories")
    ? JSON.parse(sessionStorage.getItem("categories"))
    : [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };

    default:
      return state;
  }
};
