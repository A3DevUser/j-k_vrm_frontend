const initialState ={
    loading : true,
    val : [],
    err : ''
}

export const ImportGridRed =(state = initialState, action) =>{
    switch(action.type){
        case 'ImportGridReq' : return{...state,loading:true}

        case 'ImportGridSuccess' : return{
            loading:false,
            val : action.payload,
            err : ''
        }
        case 'ImportGridError' : return{
            loading:true,
            val: [],
            err : action.payload
        }
        case 'ResetAct' : return {
            ...initialState
        }
        default : return{...state}
    }
}