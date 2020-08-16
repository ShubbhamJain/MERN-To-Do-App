import { GET_ITEMS, ADD_ITEM, DEL_ITEM } from "../actions/types";

const initialState = {
  list: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case DEL_ITEM:
      return {
        ...state,
        list: state.list.filter((iN) => iN !== action.payload),
      };
    default:
      return state;
  }
}
