import { db, provider, userAuth } from "../../firebase-config/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { USERPOPUPSIGNINREJ, USERPOPUPSIGNINREQ, USERPOPUPSIGNINRES, USERSIGNINREJ, USERSIGNINREQ, USERSIGNINRES, USERSIGNOUTREJ, USERSIGNOUTREQ, USERSIGNOUTRES, USERSIGNUPREJ, USERSIGNUPREQ, USERSIGNUPRES } from "../Reducers/const";
import { addDoc, collection, getDocs } from "firebase/firestore";

const userSignUpReq = () => {
  return {
    type: USERSIGNUPREQ
  }
}

const userSignUpRes = (data) => {
  return {
    type: USERSIGNUPRES,
    payload: data
  }
}

export const userSignUpRej = () => {
  return {
    type: USERSIGNUPREJ
  }
}

const userSignInReq = () => {
  return {
    type: USERSIGNINREQ
  }
}

const userSignInRes = (data) => {
  return {
    type: USERSIGNINRES,
    payload: data
  }
}

const userSignInRej = () => {
  return {
    type: USERSIGNINREJ
  }
}

const userSignOutReq = () => {
  return {
    type: USERSIGNOUTREQ
  }
}

const userSignOutRes = () => {
  return {
    type: USERSIGNOUTRES
  }
}

const userSignOutRej = () => {
  return {
    type: USERSIGNOUTREJ
  }
}

const userPopUpSignInReq = () => {
  return {
    type: USERPOPUPSIGNINREQ
  }
}
const userPopUpSignInRes = (data) => {
  return {
    type: USERPOPUPSIGNINRES,
    payload: data
  }
}
const userPopUpSignInRej = () => {
  return {
    type: USERPOPUPSIGNINREJ
  }
}

export const userSignUp = (user) => {
  return (dispatch) => {

    dispatch(userSignUpReq());

    createUserWithEmailAndPassword(userAuth, user.email, user.password)
      .then(() => {

        user = {
          email: user.email,
          name: user.name,
          cartData: []
        }

        dispatch(userSignUpRes(user));

        addDoc(collection(db, "users"), user)
          .then(() => {
            console.log(user);
          })
          .catch((err) => {
            console.log(err);
          });

      })
      .catch((error) => {

        const errorCode = error.code

        console.log(error);

        if (errorCode == "auth/email-already-in-use") {
          document.getElementById('error').innerHTML = "Entered email is allready in use..!"
        }
        else if (errorCode == "auth/network-request-failed") {
          document.getElementById('error').innerHTML = "Network Connection Failed..!"
        }
        else if (errorCode == "auth/weak-password") {
          document.getElementById('error').innerHTML = "Password should be at least 6 characters..!"
        }
        else {
          document.getElementById('error').innerHTML = "Something Went Wrong..!"
        }

        dispatch(userSignUpRej());
      });
  }
}

export const userSignIn = (user) => {
  return dispatch => {

    dispatch(userSignInReq());

    signInWithEmailAndPassword(userAuth, user.email, user.password)
      .then(() => {

        console.log("User Signed In", user);

        getDocs(collection(db, "users"))
          .then((res) => {
            let alldata = [];
            res.forEach((doc) => {
              let obj = { id: doc.id, ...doc.data() }
              alldata = [...alldata, obj];
            });
            console.log(alldata, "All Users");
            console.log(user, "User");

            let filterdData = alldata.filter((data) => {
              console.log(data);
              return data.email == user.email
            })

            console.log(filterdData[0], "Filter");

            dispatch(userSignInRes(filterdData[0]));

          })
          .catch((err) => {
            console.log(err);
          });

      })
      .catch((error) => {

        const errorCode = error.code

        console.log(error);

        if (errorCode == "auth/network-request-failed") {
          document.getElementById('error').innerHTML = "Network Connection Failed..!!"
        }
        else if (errorCode == "auth/invalid-credential") {
          document.getElementById('error').innerHTML = "Wrong password or email..!!"
        }
        else {
          document.getElementById('error').innerHTML = "Something Went Wrong..!!"
        }

        dispatch(userSignInRej());
      });
  }
}

export const userSignOut = () => {
  return (dispatch) => {

    dispatch(userSignOutReq());

    signOut(userAuth)
      .then(() => {

        console.log("User Signed Out");

        dispatch(userSignOutRes());

        location.reload();

      })
      .catch((error) => {

        console.log("Somthing went wrong...", error);

        dispatch(userSignOutRej());

      });
  }
}

export const userPopUpSignIn = () => {

  return async dispatch => {

    dispatch(userPopUpSignInReq());

    await signInWithPopup(userAuth, provider)
      .then((res) => {
        console.log("res", res.user);

        let userData = {
          "name": res.user.displayName,
          "picture": res.user.photoURL,
          "email": res.user.email
        }

        dispatch(userPopUpSignInRes(userData))

        addDoc(collection(db, "users"), userData)
          .then(() => {
            console.log(userData);
          })
          .catch((err) => {
            console.log(err);
          });

      })
      .catch((err) => {
        console.log("error", err);
        dispatch(userPopUpSignInRej())
      })

  }

}