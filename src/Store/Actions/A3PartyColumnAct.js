import axios from "axios";

const A3PartyColumnReq = (val) =>{
    return {
        type : 'A3PartyColumnReq',
        payload : val
    }
};

const A3PartyColumnSuccess = (val) =>{
    return {
        type : 'A3PartyColumnSuccess',
        payload : val 
    }
};

const A3PartyColumnErr = (val) =>{
    return {
        type : 'A3PartyColumnErr',
        payload : val
    }
};

export const FetchA3PartyColumnData = (formId,isPageType,token) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(A3PartyColumnReq());
        axios.get(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/getVfA3ConfColumnHeader?formId=${formId}&isPageType=${isPageType}`,{headers})
        .then((res)=>{
            dispatch(A3PartyColumnSuccess(res.data))
        })
        .catch((err)=>{
            dispatch(A3PartyColumnErr(err))
        })
    }
}


