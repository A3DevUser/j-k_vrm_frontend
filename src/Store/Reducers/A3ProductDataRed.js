const initialState = {
    loading : true,
    val : [],
    err : ''
}

export const A3ProductDataRed = (state = initialState, action) =>{
    switch(action.type){
        case 'A3ProductDataReq' : return {...state,loading :true}

        case 'A3ProductDataSuccess' : return {
            loading : false,
            val : action.payload,
            err : ''
        } 

        case 'A3ProductDataErr' : return {
            loading : true,
            val : [],
            err : action.payload
        }
        
        case 'ResetAct' : return {
            ...initialState
        }

        default : return {...state}
    }
}