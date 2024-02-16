import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainObject } from '../Elements/commonFun';
// import FormTable from './FormTableDir/FormTable';
import { FetchConfColumnData } from '../../Store/Actions/ConfColumn'
import { FetchConfGridData } from '../../Store/Actions/ConfGridAct'
import { FetchConfSectionData } from '../../Store/Actions/ConfSection'
import { FormConfData } from '../../Store/Actions/SendConfData';
import { useLocation, useNavigate } from 'react-router';
import '../CSS/FormConf.css'
import { Alert } from 'react-bootstrap';
import swal from 'sweetalert';
import { FetchFormEditData } from '../../Store/Actions/FormEditAct';
import { FetchWorkFlowEditData } from '../../Store/Actions/WorkFlowEditAct';

let AlertVal = {}
export const AlertData = {
  AlertData : (Msg,Data,Popup) =>{
    // console.log('AterDataNew',Msg)
    // console.log('AterDataNew',Data)
    // console.log('AterDataNew',Popup)
    // let AlertVal = {msg: Msg, data: Data, popup: Popup}
    // return <Alert severity={Msg} dismissible onClose={Popup}>{Data}</Alert>
    return AlertVal = {msg: Msg, data: Data, popup: Popup}
  }
}


const EditWorkFlowConf = () => {
  // console.log('AterDataNew',AlertVal)
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const SectionRed = useSelector((state)=>state.ConfSectionRed)
    const ColumnRed = useSelector((state)=>state.ConfColumnRed)
    const GridRed = useSelector((state)=>state.ConfGridRed)
    const FormIdRed = useSelector((state)=>state.FormIdRed)
    const FormDatRed = useSelector((state) => state.FormDatRed)
    const SendConfDataRed = useSelector((state) => state.SendConfDataRed)    
    const AuthRed = useSelector((state)=>state.AuthRed)
    // const FormEditRed = useSelector((state)=>state.FormEditRed)
    const WorkFlowEditRed = useSelector((state)=>state.WorkFlowEditRed)



    const [defaultVal,setdefaultVal] =useState([])
    const [obj, setObj] = useState({});

    function funSave() {
      // console.log('finalObj',Object.values(obj))
    }

    // console.log('WorkFlowEditRed',SectionRed,GridRed,ColumnRed,FormIdRed,FormDatRed);
    // console.log('WorkFlowEditRed SectionRed ',SectionRed);
    // console.log('WorkFlowEditRed GridRed ',GridRed);
    // console.log('WorkFlowEditRed ColumnRed ',ColumnRed);
    // console.log('WorkFlowEditRed FormIdRed ',FormIdRed);
    // console.log('WorkFlowEditRed FormDatRed ',FormDatRed);
    // console.log('WorkFlowEditRed WorkFlowEditRed ',WorkFlowEditRed);
    // console.log('WorkFlowEditRed FormEditRed ',FormEditRed);

    // useEffect(()=>{
    //   if(location.state !== null ){
    //     console.log('WorkFlowEditRed location', location.state.formId)
    //   }
    //   // console.log('WorkFlowEditRed',WorkFlowEditRed.val);
    // },[FormEditRed])

    useEffect(()=>{
        dispatch(FetchConfSectionData(FormIdRed,AuthRed.val))
        dispatch(FetchConfGridData(FormIdRed,AuthRed.val))
        dispatch(FetchConfColumnData(FormIdRed,AuthRed.val))
        dispatch(FetchWorkFlowEditData(location.state !== null ? location.state.formId : sessionStorage.getItem('formId1') ,AuthRed.val))
        // dispatch(FetchWorkFlowEditData('',AuthRed.val))
    },[FormIdRed])

    // console.log('FormIdRed',SectionRed);
    // console.log('FormIdRed',ColumnRed);
    // console.log('FormIdRed',GridRed);

    // useEffect(()=>{
    //   console.log('location',FormEditRed)
    // },[FormEditRed])

    // useEffect(()=>{
    //   console.log('FormDatRed',Object.values(FormDatRed).filter((fil)=>{return fil.length > 0}))
    //   },[FormDatRed])

      //console.log('finalObj',Object.values(obj))

    // useEffect(()=>{
    //   console.log(SectionRed)
    //   console.log('GridRed',GridRed)
    //   console.log('ColumnHead',ColumnRed.val.sort((a,b) => parseInt(a.number) - parseInt(b.number)))
    // },[GridRed])

    // useEffect(()=>{
    //   console.log('saveGrid',SendConfDataRed)
    // },[SendConfDataRed])

    const width = '75vw'

    const handleSave = (val) =>{
      console.log('WFedittest',FormDatRed)
    //   let isMan = []

    //   let GridCol = ColumnRed.val.filter((fil)=>{
    //     return fil.gridId == val.gridId
    //   }).map((res)=>{
    //     return res.accessor
    //   })

    //  FormDatRed[val.gridId].forEach((fFe)=>{
    //     GridCol.forEach((gFe)=>{
    //         if(fFe[gFe].length < 1){
    //           isMan.push(gFe)
    //         }
    //     })
    //   })

    //   if(isMan.length > 0){
    //     swal({
    //       title :'Alert',
    //       text : 'Kindly Fill the Mandatory Fields',
    //       icon: "warning",
    //       dangerMode: true
    //   })
    //   }else{
    //     if(Object.keys(FormDatRed).includes(val.gridId)){
    //       // console.log('mainGrid Val',val.gridId)
    //       const FormData = FormDatRed[val.gridId].map((res) => {return {...res, ...SendConfDataRed.val, targetId: val.gridId}})
    //       dispatch(FormConfData(val.api,FormData,AuthRed.val))
    //     }
    //   }


      // if(Object.keys(FormDatRed).includes(val.gridId)){
      //   // console.log('Submit Report Conf',FormDatRed)
      //   // console.log('mainGrid Val',val.gridId)
      //   const FormData = FormDatRed[val.gridId].map((res) => {return {...res, ...SendConfDataRed.val, targetId: val.gridId}})
      //   // console.log('FormDataNewVal',JSON.stringify(FormData))
      //   dispatch(FormConfData(val.api,FormData,AuthRed.val))
      // }
      if (Object.keys(FormDatRed).includes(val.gridId)) {

      const FormData = FormDatRed[val.gridId].map((res) => {
        
        // if(location.state !== null && val.gridId == 'GID-005'){
          //   const colGridId = GridRed.val.filter((fil) => { return fil.secId == 'S-002' })[0].gridId;
          //   console.log('mainGrid Val',FormDatRed)
          //   const formGridIdmain = FormDatRed[colGridId][0].gridId;
          //   console.log('mainGrid Val if');
          //   return { ...res, formId: location.state.formId, targetId: val.gridId, gridId: formGridIdmain }
          // }
         if (location.state !== null) {
          console.log('WFedittest','inside if');
          // console.log('mainGrid Val else',location.state)
          // console.log('mainGrid Val else',val.gridId)
          return { ...res, formId: location.state.formId, targetId: val.gridId }
        } else {
          console.log('WFedittest','inside else');
          // alert('inside EditForm')
          return { ...res, ...SendConfDataRed.val, targetId: val.gridId }
        }
      })
      // console.log('mainGrid Val else',FormData)
      // console.log('FormDataNewVal',JSON.stringify(FormData))
      // dispatch(FormConfData(val.api, FormData, AuthRed.val))
    }
    


      // const gridId=GridRed.val.filter((fil)=>{return fil.secId==val})[0].gridId
      // console.log('handleSave',JSON.stringify(FormDatRed[gridId]))
      // const gridData = GridRed.val.map((res)=>{return {gridId : res.gridId, api : res.api}})
      // gridData.forEach((res)=>{
      //   dispatch(FormConfData(res.api,FormDatRed[res.gridId]))
      // })
      // console.log('Save Grid',FormDatRed)
        // const gridIdVal = GridRed.val.filter((grifil)=>{return grifil.secId == val})[0].gridId
        // const secApi = SectionRed.val.filter((secfil)=>{return secfil.secId == val})[0].api
        // if(Object.keys(FormDatRed).includes(gridIdVal)){
        //   const FormData = FormDatRed[gridIdVal].map((res) => {return {...res, ...SendConfDataRed.val}})
        //   dispatch(FormConfData(secApi,FormData))
        //   // console.log('Save Grid',FormData)
        //   // console.log('Save Grid',secApi)
        // }
    }

    // console.log('EditWorkFlow', FormEditRed.val)


  return (
    <div>
      <div style={{float:'right'}}>  </div>
    <div style={{display: 'flex', flexDirection: 'row', maxHeight:'100vh' }} className='main-div'>
  <div style={{flex: '15%',height:'89vh',maxHeight:'89vh',overflow:'scroll'}} className='bg-light secNavDiv'>
{
  SectionRed.loading ? MainObject.loader() : GridRed.loading ? MainObject.loader() :  MainObject.SectionNav(SectionRed.val,GridRed.val,setdefaultVal)
  }
  </div>
  <div style={{flex: '95%',height:'89vh'}} data-spy="scroll" data-target='sectionNavbar' className='bg-light'>

  {
        SectionRed.loading ? MainObject.loader() : GridRed.loading ? MainObject.loader() : 
         ColumnRed.loading ? MainObject.loader() :
         WorkFlowEditRed.loading ? MainObject.loader() :
      // defaultVal&&MainObject.tabs(SectionRed.val,GridRed.val,ColumnRed.val.sort((a,b) => parseInt(a.number) - parseInt(b.number)),[],defaultVal,setdefaultVal,handleSave)
      defaultVal&&MainObject.conftabs(SectionRed.val,GridRed.val,ColumnRed.val.sort((a,b) => parseInt(a.number) - parseInt(b.number)),WorkFlowEditRed.val,defaultVal,setdefaultVal,handleSave)
        //  MainObject.accordion(SectionRed.val,SubSectionRed.val,ColumnRed.val,[],width,defaultVal,setdefaultVal) 
  }
  {/* <span className='mx-5 my-2' style={{float:'right'}}>
  {
    MainObject.button({classNameVal:'btn btn-primary', widthVal:'', heightVal:'',btnName:'Save'},(e)=>handleSave(e.target))
  }
  </span> */}
  </div>
    </div>
    </div>
  )
}

export default EditWorkFlowConf;