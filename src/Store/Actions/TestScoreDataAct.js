import axios from "axios"
import swal from "sweetalert"
import { PreOnboardignScoreAct } from "./GeneralStates"



export const TestScoreDataReq = (getTestScoreDataData)=>{
    return{
        type:'TestScoreDataReq',
        payload : getTestScoreDataData
    }
}

export const TestScoreDataSuccess = (getTestScoreDataData)=>{
    return{
        type:'TestScoreDataSuccess',
        payload : getTestScoreDataData
    }
}

export const TestScoreDataError = (getTestScoreDataData)=>{
    return{
        type:'TestScoreDataError',
        payload : getTestScoreDataData
    }
}


export const FormTestScoreData = (scoreData,token)=>{  
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return function(dispatch){
        dispatch(TestScoreDataReq())
        axios.post(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/VF/setVRMRatingData`,scoreData,{headers})
        .then((res)=>{
            dispatch(TestScoreDataSuccess(res.data))
            dispatch(PreOnboardignScoreAct({TPRE: NaN, MA: NaN, DDQ: NaN}))
        })
        .catch((err)=>{
            dispatch(TestScoreDataError(err))
            let ErrorLog = JSON.stringify(`Error Occurred: ${err}`)
        })
    }

}