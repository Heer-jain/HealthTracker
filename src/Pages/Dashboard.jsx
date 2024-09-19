import { useState, useEffect, useContext } from 'react'
import Navbar from '../Components/Navbar'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import Delete from '../assets/Delete.svg'
import Edit from '../assets/Edit.svg'
import {NavLink, useNavigate} from 'react-router-dom'

const Dashboard = () => {

  const [recentRecords, setRecentRecords] = useState([])
  const navigate = useNavigate()
  const {handleDelete} = useContext(AuthContext)

  const fetchRecent = async() => {
    try {
        const fetchedRecords = await axios.get('https://health-tracker-nu.vercel.app/recent')
        if(!fetchedRecords){
          throw new Error(`Error ->  ${recentRecords.status}`)
        }
        setRecentRecords(fetchedRecords.data.result)
    } catch (error) {
        alert(error)
    }
  }

  useEffect(() => {
    fetchRecent()
  }, [])
  

  return (
    <div className='bg-slate-100 h-[100vh]'>
      <Navbar/>
      <h1 className="text-4xl m-8 font-semibold text-center text-[#007bff]">Recent Health Records</h1>
      <div className='mt-10 lg:mx-[25%] md:mx-[5%] m-5'>
        <table className='w-[100vw] lg:w-[50vw] md:w-[75vw] shadow-md shadow-blue-300 table-auto border border-blue-200 bg-white text-[#007bff]'>
          <thead className='bg-[#007bff] text-white'>
            <tr>
              <th className='px-4 py-2 border border-blue-200'>Date</th>
              <th className='px-4 py-2 border border-blue-200'>Heart Rate</th>
              <th className='px-4 py-2 border border-blue-200'>Body Temperature</th>
              <th className='px-4 py-2 border border-blue-200'>Blood Pressure</th>
              <th className='px-4 py-2 border border-blue-200'></th>
            </tr>
          </thead>
      {Array.isArray(recentRecords) && recentRecords.length > 0 ? (
        recentRecords.map((item)=>(
          
          <tbody key={item._id}>
            <tr className='text-center'>
              <td className='px-4 py-2 border border-blue-200'>{item.date}</td>
              <td className='px-4 py-2 border border-blue-200'>{item.heartRate} BPM</td>
              <td className='px-4 py-2 border border-blue-200'>{item.bodyTemperature} ℃</td>
              <td className='px-4 py-2 border border-blue-200'>{item.bloodPressure} mmHg</td>
              <td className='px-4 py-2 border border-blue-200'>
                <div className="flex gap-4">
                  <button onClick={()=>{navigate(`/update/${item._id}`)}}><img src={Edit} alt="" className="h-4"/></button>
                  <button onClick={() => {handleDelete(item._id)}}><img src={Delete} alt="" className="h-4"/></button>
                </div>
              </td>
            </tr>
         </tbody>
        ))
      ):(
        <tbody>
          <tr><td>No record found!!</td></tr>
        </tbody>
      )} 
        </table>
      </div>
      <div className="flex justify-center">
        <NavLink to='/records' className="bg-blue-500 text-white px-6 py-1 rounded-full m-4 hidden md:block">Show All</NavLink>
        <NavLink to='/add' className="bg-blue-500 text-white px-6 py-1 rounded-full m-4 hidden md:block">Add new</NavLink>
        <NavLink to='/analytics' className="bg-blue-500 text-white px-6 py-1 rounded-full m-4 hidden md:block">Show Analytics</NavLink>
      </div>
    </div>
  )
}

export default Dashboard
