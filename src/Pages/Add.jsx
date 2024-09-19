import {useContext} from 'react'
import Navbar from '../Components/Navbar'
import { AuthContext} from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {

    const {recordInfo, setRecordInfo, setRecords, records} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
            setRecordInfo((prevState)=>({
                ...prevState, 
                [name]: value
            }))
        
    }

    const handleAdd = async() => {
        const {date, heartRate, bodyTemperature, bloodPressure} = recordInfo
        if(!date || !heartRate || !bodyTemperature || !bloodPressure){
            alert("Incomplete Info")
            return
        }
        const newRecord = {...recordInfo}
        setRecords([...records, newRecord])
        setRecordInfo({
            date: "",
            heartRate: "",
            bodyTemperature: "",
            bloodPressure: "",
        })
        try {
            const response = await axios.post('https://health-tracker-nu.vercel.app/', newRecord)
            const {success,message} = response.data
            if(success === true){
                alert("Saved Successfully")
            }
            else{
                alert(message)
            }
        } catch (error) {
            alert(error)
        }
    }

  return (
  <>
    <Navbar/>
    <div className='flex p-10 justify-center align-middle bg-slate-100'>
        <div className='lg:w-[40%] md:w-[75%] sm:[90%] p-10 shadow-md shadow-blue-400 rounded-2xl bg-white  text-blue-500 space-y-4'>
        <h1 className='text-4xl m-4 font-semibold text-center'>Add Record</h1>
        <div>
            <label htmlFor="date" className="block font-medium text-text">Date</label>
            <input onChange={handleChange} value={recordInfo.date} type="date" id="date" name="date" placeholder='dd-mm-yyyy' className="w-full px-3 py-2 border rounded-md text-gray-400 focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <div>
            <label htmlFor="heartRate" className="block font-medium text-text">Heart Rate</label>
            <input onChange={handleChange} value={recordInfo.heartRate} type="text" id="heartRate" name="heartRate" placeholder='Heart Rate' className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <div>
            <label htmlFor="bodyTemperature" className="block font-medium text-text">Body Temperature</label>
            <input onChange={handleChange} value={recordInfo.bodyTemperature} type="text" id="bodyTemperature" name="bodyTemperature" placeholder='Body Temperature (in ℃)' className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <div>
            <label htmlFor="bloodPressure" className="block font-medium text-text">Blood Pressure</label>
            <input onChange={handleChange} value={recordInfo.bloodPressure}  type="text" id="bloodPressure" name="bloodPressure" placeholder='Blood Pressure (systolic/diatolic)' className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"/>
        </div>
        <div className='flex justify-evenly'>
            <button onClick={()=>{setRecordInfo({date: "",heartRate: "",bodyTemperature: "", bloodPressure: "",})}} className='bg-blue-500 text-white px-6 py-1 rounded-full'>Cancel</button>
            <button onClick={handleAdd} className='bg-blue-500 text-white px-6 py-1 rounded-full'>Add</button>
            <button onClick={()=>{navigate('/')}} className='bg-blue-500 text-white px-6 py-1 rounded-full'>Back</button>
        </div>
        </div>
    </div>
  </>
  )

}

export default Add
