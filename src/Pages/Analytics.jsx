import Navbar from '../Components/Navbar'
import HeartRateChart from '../Components/HeartRateChart'
import BodyTempChart from '../Components/BodyTempChart'
import BPChart from '../Components/BPChart'

const Analytics = () => {
  return (
    <div className='bg-slate-100 h-[90%]'>
        <Navbar/>
        <h1 className='text-4xl m-8 font-semibold text-center text-[#007bff]'>Analtics of Your Health - Metrics</h1>
        <div className='flex flex-wrap gap-10 justify-center'>
          <HeartRateChart/>
          <BodyTempChart/>
          <BPChart/>
        </div>
    </div>
  )
}

export default Analytics
