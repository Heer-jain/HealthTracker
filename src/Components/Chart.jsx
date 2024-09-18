import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, labels, title , height, width}) => {
  // Configuration for the line chart
  const chartData = {
    labels: labels, // X-axis labels (e.g., dates)
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#007bff',
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true, // Disable to use custom height and width
    plugins: {
      title: {
        display: true,
        text: title, // Title text
        color: '#007bff', // Change text color (e.g., 'tomato' color)
        font: {
          size: 24,  // Change title font size (height)
          weight: 'bold',
        },
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
  };

  return (
  <div  className="w-[50vw]" style={{ width: `${width}px` }}>
  <Line data={chartData} options={options} />
  </div>
  )
};

export default Chart;
