import axios from "axios";

const A3OverviewColumnReq = (val) =>{
    return {
        type : 'A3OverviewColumnReq',
        payload : val
    }
};

const A3OverviewColumnSuccess = (val) =>{
    return {
        type : 'A3OverviewColumnSuccess',
        payload : val 
    }
};

const A3OverviewColumnErr = (val) =>{
    return {
        type : 'A3OverviewColumnErr',
        payload : val
    }
};

export const FetchA3OverviewColumnData = (id,isPageType,token) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(A3OverviewColumnReq());
        axios.get(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/getVfA3ConfColumnHeader?formId=${id}&isPageType=${isPageType}`,{headers})
        .then((res)=>{
            dispatch(A3OverviewColumnSuccess(res.data))
        })
        .catch((err)=>{
            dispatch(A3OverviewColumnErr(err))
        })
    }
}


