import { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Search from '../assets/Search.svg';

const Detail = () => {
  const { setRecords, records, handleDelete } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      if (!response) {
        throw new Error(`Error ->  ${response.status}`);
      }
      setRecords(response.data.result);
      return response.data.result
    } catch (error) {
      alert(error);
    }
  };


  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    const results = records.filter((record) => {
      const searchValue = searchTerm.toLowerCase();
      return (
        (record.date && record.date.toLowerCase().includes(searchValue)) ||
        (record.heartRate && record.heartRate.toString().includes(searchValue)) ||
        (record.bodyTemperature && record.bodyTemperature.toString().includes(searchValue)) ||
        (record.bloodPressure && record.bloodPressure.toString().includes(searchValue))
      );
    });
    setFilteredRecords(results);
  }, [searchTerm, records]);

  return (
    <div className='bg-slate-100 min-h-[100vh]'>
      <Navbar />
      <h1 className="text-4xl m-4 font-semibold text-center text-[#007bff]">All Health Records</h1>
      <div className='flex justify-center align-middle mb-4 bg-white w-64 mx-auto rounded-xl shadow-md shadow-blue-100'>
        <img src={Search} alt="" className='m-2 h-6'/>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search records"
          className="p-2 rounded focus:outline-none foucs:ring-0"
        />
      </div>
      <div className='flex flex-wrap justify-center'>
        {Array.isArray(filteredRecords) && filteredRecords.length > 0 ? (
          filteredRecords.map((item) => (
            <div key={item._id} className="bg-white text-[#6c757d] m-12 p-4 rounded-3xl max-w-[20vw] min-w-80  md:w-[40%] sm:w-[80%] text-xl overflow-auto space-y-3 h-60 shadow-md shadow-blue-300">
              <div>Date: <span className="text-[#007bff]">{item.date}</span></div>
              <div>Heart Rate: <span className="text-[#007bff]">{item.heartRate} BPM</span></div>
              <div>Body Temperature: <span className="text-[#007bff]">{item.bodyTemperature} ℃</span></div>
              <div>Blood Pressure: <span className="text-[#007bff]">{item.bloodPressure} mmHg</span></div>
              <button onClick={() => { navigate(`/update/${item._id}`); }} className="bg-blue-500 text-white px-6 py-1 rounded-full m-4">Edit</button>
              <button onClick={() => { handleDelete(item._id); }} className="bg-blue-500 text-white px-6 py-1 rounded-full m-4">Delete</button>
            </div>
          ))
        ) : (
          <p className='text-red-500 text-center mx-auto text-xl my-10'>No records found !!!</p>
        )}
      </div>
    </div>
  );
}

export default Detail;
