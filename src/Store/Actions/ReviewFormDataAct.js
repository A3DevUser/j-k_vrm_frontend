import axios from "axios";

const ReviewDataReq = (val) =>{
    return {
        type : 'ReviewDataReq',
        payload : val
    }
};

const ReviewDataSuccess = (val) =>{
    return {
        type : 'ReviewDataSuccess',
        payload : val
    }
};

const ReviewDataErr = (val) =>{
    return {
        type : 'ReviewDataErr',
        payload : val
    }
};


export const FetchReviewDataData = (reviewFreq,reviewSubFreq,token) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(ReviewDataReq());
        axios.get(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/getA3ReviewOBData?reviewFreq=${reviewFreq}&reviewSubFreq=${reviewSubFreq}`,{headers})
        .then((res)=>{
            dispatch(ReviewDataSuccess(res.data))
        })
        .catch((err)=>{
            dispatch(ReviewDataErr(err))
        })
    }

}


