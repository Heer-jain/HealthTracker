import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Update = () => {
  const {recordInfo, setRecordInfo} = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/record/${id}`);
        const data = response.data.result;
        console.log(data)
        setRecordInfo({
          date: data.date,
          bodyTemperature: data.bodyTemperature,
          bloodPressure: data.bloodPressure,
          heartRate: data.heartRate
        });
      } catch (error) {
        alert('Error fetching health data:', error);
      }
    };
    fetchRecord();
  }, [id]);


  const handleChange = (e) => {
    const {name, value} = e.target
    setRecordInfo((prevState)=>({
            ...prevState, 
            [name]: value
        }))    
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/${id}`, recordInfo);
      navigate('/records');
      setRecordInfo({
        date: "",
        heartRate: "",
        bodyTemperature: "",
        bloodPressure: "",
      })
    } catch (error) {
      console.error('Error updating health data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex p-10 justify-center align-middle bg-slate-100'>
        <div className='w-[100%] md:[50%] p-10 shadow-md shadow-blue-400 rounded-2xl bg-white  text-blue-500 space-y-4'>
        <h1 className='text-4xl m-4 font-semibold text-center'>Update Record</h1>
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
            <input onChange={handleChange} value={recordInfo.bloodPressure}  type="text" id="bloodPressure" name="bloodPressure" placeholder='Blood Pressure (systolic/diatolic)' className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" />
        </div>
        <div className='flex justify-evenly'>
            <button type="submit" className="bg-blue-500 text-white px-6 py-1 rounded-full">Update</button>
            <button onClick={()=>{navigate('/records')}} className='bg-blue-500 text-white px-6 py-1     rounded-full'>Back</button>
        </div>
        </div>
        
    </div>

      
    </form>
  );
};

export default Update;
