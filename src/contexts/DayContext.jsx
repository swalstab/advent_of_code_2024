import { createContext, useContext, useReducer } from "react";

const DayContext = createContext();

const initialState = {
  inputContent: "",
  outputs: {
    1: "",
    2: "",
  },
  loading: {
    1: false,
    2: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "setInputContent":
      return {
        ...state,
        inputContent: action.payload,
        outputs: {
          1: "",
          2: "",
        },
      };
    case "setOutput":
      return {
        ...state,
        outputs: {
          ...state.outputs,
          [action.part]: action.payload,
        },
      };
    case "setLoading":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.part]: action.payload,
        },
      };
    case "resetOutput":
      return {
        ...state,
        outputs: {
          1: "",
          2: "",
        },
      };
    default:
      throw new Error("Unknown action");
  }
}

function DayProvider({ children }) {
  const [{ inputContent, outputs, loading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <DayContext.Provider value={{ inputContent, outputs, loading, dispatch }}>
      {children}
    </DayContext.Provider>
  );
}

function useDay() {
  const context = useContext(DayContext);
  if (context === undefined)
    throw new Error("DayContext was used outside of the DayProvider");

  return context;
}

export { DayProvider, useDay };
