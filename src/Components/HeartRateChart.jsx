import  { useEffect, useState } from 'react';
import Chart from './Chart';
import axios from 'axios';

const HeartRateChart = () => {
  const [dataValue, setDataValue] = useState([]);
  const [dataLabel, setDataLabel] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://health-tracker-nu.vercel.app/');
      if (!response) {
        throw new Error(`Error ->  ${response.status}`);
      }
      const heartRate = response.data.result.map(record => record.heartRate);
      const dates = response.data.result.map(record => record.date);

      setDataValue(heartRate);
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
      <Chart data={dataValue} labels={dataLabel} title="Heart Rate" width={400} />
    </div>
  );
};

export default HeartRateChart;
