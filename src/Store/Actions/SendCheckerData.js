import axios from "axios";
import swal from "sweetalert";

const SendCheckerDataReq = (val) =>{
    return {
        type : 'SendCheckerDataReq',
        payload : val
    }
};

const SendCheckerDataSuccess = (val) =>{
    return {
        type : 'SendCheckerDataSuccess',
        payload : val
    }
};

const SendCheckerDataErr = (val) =>{
    return {
        type : 'SendCheckerDataErr',
        payload : val
    }
};

export const SendCheckerData = (data,token,navigate) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(SendCheckerDataReq());
        axios.post(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/updateStatusToAccept`,data,{headers})
        .then((res)=>{
            dispatch(SendCheckerDataSuccess(res.data))
            
            return swal({
                title:'Data Saved Successfully !!',
                icon:'success'
            }).then(()=>{
                navigate('/pendencyDashboard')
            })
        })
        .catch((err)=>{
            dispatch(SendCheckerDataErr(err))
        })
    }

}


