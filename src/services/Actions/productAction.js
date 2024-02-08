
import { ADDDATAREJ, ADDDATAREQ, ADDDATARES, ADDTOCARTREJ, ADDTOCARTREQ, ADDTOCARTRES, DELETEDATAREJ, DELETEDATAREQ, EDITDATAREJ, EDITDATAREQ, SINGLEDATAREJ, SINGLEDATAREQ, SINGLEDATARES } from "../Reducers/const";
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config/firebase.config";


export const addDataReq = () => {
    return {
        type: ADDDATAREQ
    }
}

export const addDataRes = (data) => {
    return {
        type: ADDDATARES,
        payload: data
    }
}

export const addDataRej = () => {
    return {
        type: ADDDATAREJ
    }
}


export const singleDataReq = () => {
    return {
        type: SINGLEDATAREQ
    }
};

export const singleDataRes = (data) => {
    return {
        type: SINGLEDATARES,
        payload: data
    }

};

export const singleDataRej = () => {
    return {
        type: SINGLEDATAREJ
    }
};

export const editDataReq = () => {
    return {
        type: EDITDATAREQ
    }
}

export const editDataRej = () => {
    return {
        type: EDITDATAREJ
    }
}

export const deleteDataReq = () => {
    return {
        type: DELETEDATAREQ
    }
}

export const deleteDataRej = () => {
    return {
        type: DELETEDATAREJ
    }
}

export const addToCartReq = () => {
    return {
        type: ADDTOCARTREQ
    }
}

export const addToCartRes = (data) => {
    return {
        type: ADDTOCARTRES,
        payload: data
    }
}

export const addToCartRej = () => {
    return {
        type: ADDTOCARTREJ
    }
}

let cartData = [];

export const addToCartAction = (data, user) => {

    return async (dispatch) => {

        dispatch(addToCartReq());

        await getDoc(doc(db, 'users', `${user.id}`)).then((res) => {
            if (res.exists()) {

                console.log(res.data());

                cartData = res.data().cartData;

                console.log(cartData);

                if (cartData[0] == null) {
                    cartData = [data]
                    console.log("null");
                } else {
                    let dataExist = cartData.map((item) => {
                        return item.id == data.id
                    })
                    if (dataExist[0] == true) {
                        console.log("same data");
                    }else{
                        cartData = [...cartData, data]
                        console.log("not same data");
                    }
                }

            } else {
                console.log("no Data");
            }
        }).catch((err) => {
            console.log(err);
        })

        setDoc(doc(db, 'users', `${user.id}`), {
            ...user,
            uid: user.id,
            cartData: cartData
        }).then((res) => {
            console.log(res, "Success");
            dispatch(addToCartRes(cartData))
        }).catch((err) => {
            console.log(err, "Failed");
        })
    }
}

export const getDataAction = () => {
    return (dispatch) => {
        dispatch(addDataReq());

        getDocs(collection(db, "products"))
            .then((res) => {
                let alldata = [];
                res.forEach((doc) => {
                    let obj = { id: doc.id, ...doc.data() }
                    alldata = [...alldata, obj];
                });
                dispatch(addDataRes(alldata));
            })
            .catch((err) => {
                dispatch(addDataRej(err));
            });
    };
};

export const getSingleDataAction = (id) => {

    return async (dispatch) => {

        dispatch(singleDataReq());

        await getDoc(doc(db, 'products', `${id}`)).then((res) => {

            if (res.exists()) {
                const obj = { id: id, ...res.data() };
                dispatch(singleDataRes(obj));
            } else {
                dispatch(singleDataRej());
            }
        }).catch((err) => {
            dispatch(singleDataRej(err));
        })

    }

}

export const editDataAction = (data) => {

    return async (dispatch) => {
        dispatch(editDataReq());

        await setDoc(doc(db, 'products', `${data.id}`), data).then((res) => {
            dispatch(getDataAction())
            console.log(res);
        }).catch((err) => {
            dispatch(editDataRej(err))
        })

    }
}

export const deleteDataAction = (id) => {
    return dispatch => {

        dispatch(deleteDataReq())

        deleteDoc(doc(db, "products", `${id}`)).then((res) => {
            dispatch(getDataAction())
            console.log(res);
        }).catch((err) => {
            dispatch(editDataRej())
            console.log(err);
        })

    }
}


// export const addToCartAction = (data) => {

//     return async (dispatch) => {
//         dispatch(addToCartReq());

//         await setDoc(doc(db, 'products', `${data.id}`), data).then((res) => {
//             dispatch(getDataAction())
//             console.log(res);
//         }).catch((err) => {
//             dispatch(addToCartRej(err))
//         })

//     }
// }