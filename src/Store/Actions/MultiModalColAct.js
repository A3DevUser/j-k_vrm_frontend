import axios from "axios";

const MultiModalColReq = (val) =>{
    return {
        type : 'MultiModalColReq',
        payload : val
    }
};

const MultiModalColSuccess = (val) =>{
    return {
        type : 'MultiModalColSuccess',
        payload : val 
    }
};

const MultiModalColErr = (val) =>{
    return {
        type : 'MultiModalColErr',
        payload : val
    }
};

export const FetchMultiModalColData = (gridId,token) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(MultiModalColReq());
        axios.get(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/getMultiColumnData?gridId=${gridId}`, {headers})
        .then((res)=>{
            dispatch(MultiModalColSuccess(res.data))
        })
        .catch((err)=>{
            dispatch(MultiModalColErr(err))
        })
    }
}


