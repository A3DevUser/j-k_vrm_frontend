import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useBlockLayout,useRowSelect } from 'react-table'
import GlobalFilter from '../ReportTable/GlobalFilter'
import { ColumnFilter } from '../ReportTable/ColumnFilter'
import { Styles } from '../ReportTable/ReportStyles'
import '../FormTableDir/TableStyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '../FormTableDir/Checkbox'
import { useSticky } from 'react-table-sticky'
import { useLocation, useNavigate } from 'react-router'
import { A3GetPartySheetData } from '../../Store/Actions/A3GetPartySheetDataAct'
import { NewPartysheetColumns } from './NewPartySheetColumns'

const NewPartySheetTable = ({columnData,tableData,vendorList,daysFlag}) => {

  const location = useLocation()

  const [data,setdata] = useState([...tableData])
  const [maxScore,setmaxScore] = useState(0)
  const [columns,setcolumns] = useState([...NewPartysheetColumns(columnData,vendorList,updateMyData,setmaxScore)])
  const [score,setscore]= useState(0)
  const [finalData,setfinalData]=useState([])
  const [fileArr,setfileArr] =useState()
  const dispatch = useDispatch()
  // const [score,setScore] = useState()
// console.log('vendorListValues',vendorList);

  const AuthRed = useSelector((state)=>state.AuthRed)
  const navigate = useNavigate()

  const formData = new FormData()
  function updateMyData(rowIndex, columnId, value, fileData){

    if(fileData){
        formData.append('file',fileData)
        setfileArr(formData)
      }

    // const colName = columnId.slice(0,columnId.indexOf('#'));
    // const accNum = columnId.slice(columnId.indexOf('#')+1,columnId.length);
    // // need to spread account data while setting final data
    // setfinalData((old)=>( {...old,[accNum+rowIndex]:{id:accNum,...tableData[rowIndex],...old[accNum+rowIndex],[colName]:value,...accountData.filter((fil)=>{return fil.Associate_Vend==accNum})[0]}}))



      setdata(old =>
        old.map((row, index) => {
            if (index === Number(rowIndex)) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )   
  }
  let finData = []

  const handleSave = () =>{

    finData = data.map((res) => {
      return {...res, reviewId : location.state.reviewId, vendorId : '', reviewName : location.state.review_name}
    })

   // console.log('savedataFinal',columnData)
    dispatch(A3GetPartySheetData(finData,AuthRed.val,navigate, daysFlag ))
    // alert('Data Saved Successfully !!')
  }

  let isScorVal = 0

  if(columnData.filter((fil) => {
    return fil.isScoring == 'true'
  }).length > 0){
    isScorVal = columnData.filter((fil) => {
      return fil.isScoring == 'true'
    })[0].accessor
  }

  useEffect(()=>{
    console.log('isScore',data)



    setscore(()=>{
      let totalScore =  data.reduce((total,obj)=>{
         let scoreKey = Object.keys(obj).find(key => key.includes(isScorVal))
         let score = obj[scoreKey] || 0
        return Number(total) + Number(score)
      },0)
      if(totalScore < ((3*data.length)*0.3)){
        return 'Low'
      }else if(totalScore < ((3*data.length)*0.6)){
        return 'Medium'
      }else{
        return 'High'
      }
    })



  },[data])

useEffect(()=>{
  console.log('isScore',score)
},[score])

  const defaultColumn = useMemo(() => {
    return {
        Filter: ColumnFilter
    }
}, [])

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    //   footerGroups, 
    selectedFlatRows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter } = useTable({
        columns,
        data,
        defaultColumn
    }, useFilters, useBlockLayout, useGlobalFilter, useSortBy, usePagination,useSticky,useRowSelect,(hooks) => {
        hooks.visibleColumns.push((columns) => {
          return [{
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => {
              return <Checkbox {...getToggleAllRowsSelectedProps()} />
            },
            Cell: ({ row }) => {
              return <Checkbox {...row.getToggleRowSelectedProps()} />
            },
            width: '50',
            sticky: 'left'
          },
          ...columns]
        })
      })

const { globalFilter } = state
const { pageIndex } = state

  return (
    <>
              <div className='tableDiv'>
                <div style={{display:'flex',alignItems:'center' ,justifyContent:'space-between', marginTop:'5px', marginRight:'10px'}}>
                {/* <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}> */}
                <span style={{fontWeight:'bolder', fontSize:'25px', paddingLeft:'15px'}}>Third Party Risk Evaluation</span>
                
                {/* <div style={{display:'flex', justifyContent: 'right',  paddingLeft:'48rem'}}>
                <span className='mx-3' style={{fontWeight:'bolder', fontSize:'25px'}}>Score :</span>
              <input value={Number(score).toFixed(2)} className='form-control' style={{fontWeight:'bolder', fontSize:'15px', width:'10vw'}} disabled/></div> */}
              <div style={{display:'flex', alignItems:'center'}}>
              <label style={{fontWeight:'bold', fontSize:'large'}} htmlFor="overallRisk">Overall Risk Rating</label>
              <input style={{width:'20vw'}} id='overallRisk' className='form-control mx-2' disabled value={score} />
                <button onClick={handleSave} className='btn btn-success mx-5'>Save</button>
              </div>
                </div>
                <Styles>
                    <div {...getTableProps()} className="table sticky mx-3 my-1 tableCont " style={{ maxHeight: '75vh', maxWidth: '97.3vw', overflow: 'scroll', border: 'none' }} >
                        <div className='header'>
                            {
                                headerGroups.map((headerGroup) => (
                                    <>
                                        <div className='tr' {...headerGroup.getHeaderGroupProps()}>
                                            {
                                                headerGroup.headers.map((column) => (
                                                    <div className='th' {...column.getHeaderProps()}>{column.render('Header')}
                                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                        <div className='body' {...getTableBodyProps()}>
                            {
                                page.map((row) => {
                                    prepareRow(row)
                                    return <div className='tr' {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => (
                                                <div className='td' {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </div>
                                            ))
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </Styles>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', paddingLeft: '18px' }}>
                    <div>
                        <span>
                            page: {' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        {/* <button onClick={() => previousPage()} disabled={!canPreviousPage}><TbPlayerTrackNextFilled /> Previous</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>Next </button> */}
                        <button className='btn btn-outline-secondary btn-sm mx-2' title='Previous page' onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                        <button className='btn btn-outline-secondary btn-sm' title='Next page' onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        {/* <Pagination><Pagination.Next /></Pagination> */}
                    </div>
                </div>
                </div>
    </>
  )
}

export default NewPartySheetTable