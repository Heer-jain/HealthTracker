import  {  useEffect, useState } from 'react';
import Chart from './Chart';
import axios from 'axios';

const BPSystolicChart = () => {
  const [dataValue, setDataValue] = useState([]);
  const [dataLabel, setDataLabel] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      if (!response) {
        throw new Error(`Error ->  ${response.status}`);
      }
      const BPSystolic = response.data.result.map(record => record.bloodPressure.systolic);
      const dates = response.data.result.map(record => record.date);

      setDataValue(BPSystolic);
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
      <Chart data={dataValue} labels={dataLabel} title="Blood Pressure Systolic" width={400} />
    </div>
  );
};

export default BPSystolicChart;
