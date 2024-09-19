import { useState} from 'react';

function Search() {
  const [searchRecords, setSearchRecords] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  
  const searchRecord = async (value) => {
    try {
      const response = await fetch('http://localhost:3000/', { method: 'GET' });
      const data = await response.json();
  
      if (Array.isArray(data.result)) {
        const searchValue = value.toLowerCase();
        const results = data.result.filter((record) => {
          const heartRateMatch = record.heartRate && record.heartRate.toString().includes(searchValue);
          const bodyTemperatureMatch = record.bodyTemperature && record.bodyTemperature.toString().includes(searchValue);
          const BPMatch = record.bloodPressure && record.bloodPressure.toString().includes(searchValue);
          const dateMatch = record.date && record.date.toLowerCase().includes(searchValue);
  
          return heartRateMatch || bodyTemperatureMatch || BPMatch || dateMatch;
        });
  
        setFilteredResults(results);
        console.log(results)
      } else {
        console.error('Data does not contain an array:', data);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };
  
  
  
  

    const handleChange = (value) => {
        setSearchRecords(value)
        searchRecord(value)
    }

  return (
    <div><input type="text" onChange={(e) => {handleChange(e.target.value)}} placeholder='search' /></div>
  );
}

export default Search;
