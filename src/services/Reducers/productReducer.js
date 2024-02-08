import { ADDDATAREJ, ADDDATAREQ, ADDDATARES, ADDTOCARTREJ, ADDTOCARTREQ, ADDTOCARTRES, DELETEDATAREJ, DELETEDATAREQ, EDITDATAREJ, EDITDATAREQ, SINGLEDATAREJ, SINGLEDATAREQ, SINGLEDATARES } from "./const";

const initialState = {
  isLoading: false,
  err: false,
  datas: [],
  data: null,
  userData: null,
  cartData: []
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDDATAREQ:
      return {
        ...state,
        isLoading: true
      };

    case ADDDATARES:
      return {
        ...state,
        isLoading: false,
        datas: action.payload
      };

    case ADDDATAREJ:
      return {
        ...state,
        err: true,
        isLoading: false
      };


    case SINGLEDATAREQ:
      return {
        ...state,
        isLoading: true,
      }

    case SINGLEDATARES:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      }

    case SINGLEDATAREJ:
      return {
        ...state,
        isLoading: false,
        error: "Error..."
      }


    case EDITDATAREQ:
      return {
        ...state,
        isLoading: true,
      }


    case EDITDATAREJ:
      return {
        ...state,
        isLoading: false,
        error: "Error..."
      }

    case DELETEDATAREQ:
      return {
        ...state,
        isLoading: true,
      }


    case DELETEDATAREJ:
      return {
        ...state,
        isLoading: false,
        error: "Error..."
      }

    case ADDTOCARTREQ:
      return {
        ...state,
        isLoading: true,
      }

    case ADDTOCARTRES:
      return {
        ...state,
        isLoading: false,
        cartData: action.payload
      }

    case ADDTOCARTREJ:
      return {
        ...state,
        isLoading: false,
        error: "Error..."
      }

    default:
      return state;
  }
}