import { createStore } from "redux";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ("SET_PRODUCTS"):
      return {
        ...state,
        products: [...action.payload],
      };
    case ("DELETE_PRODUCTS"):
      console.log(state, action);
      return {
        ...state,
        products: [...action.payload],
      };

    case ("ADD_PRODUCT"):
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
