import axios from "axios";
import swal from "sweetalert";
import { FormIdAct } from "./GeneralStates";

const A3GetPartySheetDataReq = (val) =>{
    return {
        type : 'A3GetPartySheetDataReq',
        payload : val
    }
};

const A3GetPartySheetDataSuccess = (val) =>{
    return {
        type : 'A3GetPartySheetDataSuccess',
        payload : val
    }
};

const A3GetPartySheetDataErr = (val) =>{
    return {
        type : 'A3GetPartySheetDataErr',
        payload : val
    }
};

export const A3GetPartySheetData = (data,token,navigate,daysFlag) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(A3GetPartySheetDataReq());
        axios.post(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/setAssessTpreData`,data,{headers})
        .then((res)=>{
            dispatch(A3GetPartySheetDataSuccess(res))
            return swal({
                title:'Data Saved Successfully',
                icon:'success'
            }).then(()=>{
                // dispatch(FormIdAct('FORM-1144'))
                // navigate('/pendencyDashboard')
                navigate('/editTable', {state : {formId : 'FORM-1144', daysFlag : daysFlag}})
            })
        })
        .catch((err)=>{
            dispatch(A3GetPartySheetDataErr(err))
        })
    }

}


