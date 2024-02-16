import axios from "axios";

const A3ProductDataReq = (val) =>{
    return {
        type : 'A3ProductDataReq',
        payload : val
    }
};

const A3ProductDataSuccess = (val) =>{
    return {
        type : 'A3ProductDataSuccess',
        payload : val 
    }
};

const A3ProductDataErr = (val) =>{
    return {
        type : 'A3ProductDataErr',
        payload : val
    }
};

export const FetchA3ProductDataData = (id,token) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(A3ProductDataReq());
        axios.get(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/fetchScheme?areaName=${id}`,{headers})
        .then((res)=>{
            dispatch(A3ProductDataSuccess(res.data))
        })
        .catch((err)=>{
            dispatch(A3ProductDataErr(err))
        })
    }
}


