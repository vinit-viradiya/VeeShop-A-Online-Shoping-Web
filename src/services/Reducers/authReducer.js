import { USERPOPUPSIGNINREJ, USERPOPUPSIGNINREQ, USERPOPUPSIGNINRES, USERSIGNINREJ, USERSIGNINREQ, USERSIGNINRES, USERSIGNOUTREJ, USERSIGNOUTREQ, USERSIGNOUTRES, USERSIGNUPREJ, USERSIGNUPREQ, USERSIGNUPRES } from "./const"

const initialState = {
  isSignUp: false,
  isSignIn: false,
  isLoading: false,
  user: null,
  error: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERSIGNUPREQ:
      return {
        ...state
      }

    case USERSIGNUPRES:
      return {
        ...state,
        isLoading: false,
        isSignUp: true,
        user: action.payload
      }

    case USERSIGNUPREJ:
      return {
        ...state,
        error: "Error",
        isSignUp: false
      }

    case USERSIGNINREQ:
      return {
        ...state
      }

    case USERSIGNINRES:
      return {
        ...state,
        isLoading: false,
        isSignIn: true,
        user: action.payload
      }

    case USERSIGNINREJ:
      return {
        ...state,
        error: "Error"
      }

    case USERSIGNOUTREQ:
      return {
        ...state,
        isLoading: true
      }

    case USERSIGNOUTRES:
      return {
        ...state,
        isLoading: false,
        user: null,
        isSignIn: false,
        userEmail: null
      }

    case USERSIGNOUTREJ:
      return {
        ...state,
        error: "Something went wrong..."
      }

    case USERPOPUPSIGNINREQ:
      return {
        ...state,
        isLoading: true
      }

    case USERPOPUPSIGNINRES:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isSignIn: true
      }

    case USERPOPUPSIGNINREJ:
      return {
        ...state,
        error: "Something went wrong..."

      }

    default:
      return state
  }
}