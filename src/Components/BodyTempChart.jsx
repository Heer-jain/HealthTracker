import  {  useEffect, useState } from 'react';
import Chart from './Chart';
import axios from 'axios';

const BodyTempChart = () => {
  const [dataValue, setDataValue] = useState([]);
  const [dataLabel, setDataLabel] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      if (!response) {
        throw new Error(`Error ->  ${response.status}`);
      }
      const temperatures = response.data.result.map(record => record.bodyTemperature);
      const dates = response.data.result.map(record => record.date);

      setDataValue(temperatures);
      setDataLabel(dates);      

    } catch (error) {
     alert(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className='h-80'>
      <Chart data={dataValue} labels={dataLabel} title="Body Temperature" width={400}/>
    </div>
  );
};

export default BodyTempChart;
