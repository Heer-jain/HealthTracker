import logo from '../assets/logo.svg'
import Home from '../assets/Home.svg'
import Add from '../assets/Add.svg'
import Records from '../assets/Records.svg'
import Analytics from '../assets/Analytics.svg'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  return (
    <>
    <div className='justify-between items-center py-2 px-4 text-xl bg-white shadow-sm shadow-blue-300 text-[#007bff] sticky top-0  md:flex hidden'>
      <div className='flex gap-2'>
      <img src={logo} alt="" className='h-9'/>
      <div className='text-4xl'>Health Tracker</div>
      </div>
      <ul className="flex gap-8">
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'> <NavLink to="/" className={({isActive}) => isActive ? "text-[#6c757d]" : "text-[#007bff]"}>Dashboard</NavLink></li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]' ><NavLink to="/add" className={({isActive}) => isActive ? "text-[#6c757d]" : "text-[#007bff]"}>Add</NavLink></li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]' ><NavLink to="/records" className={({isActive}) => isActive ? "text-[#6c757d]" : "text-[#007bff]"}>Records</NavLink></li>
        <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]' ><NavLink to="/analytics" className={({isActive}) => isActive ? "text-[#6c757d]" : "text-[#007bff]"}>Analytics</NavLink></li>
      </ul>
    </div>
    <div className='justify-between items-center py-2 px-4 text-xl bg-white shadow-sm shadow-blue-300 text-[#007bff] sticky bottom-0   md:hidden flex'>
    <div className='flex gap-2'>
    <img src={logo} alt="" className='h-9'/>
    </div>
    <ul className="flex gap-8">
      <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]'> <NavLink to="/"> <img src={Home} className='h-6'/> </NavLink></li>
      <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]' ><NavLink to="/add"><img src={Add} className='h-6'/></NavLink></li>
      <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]' ><NavLink to="/records"><img src={Records} className='h-6'/></NavLink></li>
      <li className='hover:underline hover:cursor-pointer hover:text-[#6c757d]' ><NavLink to="/analytics"><img src={Analytics} className='h-6'/></NavLink></li>
    </ul>
  </div>
  </>
  )
}

export default Navbar
