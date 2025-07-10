import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Navbar = () => {
  const {user, logOut} = useAuth()

   const links = <>
   <li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/'>Home</NavLink></li>
			<li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/policies'>All Policies</NavLink></li>
			<li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/agent'>Agents</NavLink></li>
            <li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/faq'>FAQs</NavLink></li>
            <li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/dashboard'>Dashboard</NavLink></li>
   </>
   const link = <>
   <li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/'>Home</NavLink></li>
			<li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/policies'>All Policies</NavLink></li>
			<li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/agent'>Agents</NavLink></li>
            <li><NavLink className={({isActive}) =>(isActive? 'bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg':'text-lg')} to='/faq'>FAQs</NavLink></li>
   </>

 const handleLogOut = () => {
    
       logOut()
       .then(()=>{
           Swal.fire({
  title: "Logout successful!",
  icon: "success",
  draggable: true
});
       })
       .catch(error =>{
         toast(error)
       })
  }


  return (
    <div className='bg-base-200 z-50 sticky top-0 shadow-sm'>
      <div className="navbar w-11/12 mx-auto">
  <div className="navbar-start ">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="mr-3 -ml-3 lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
          user ? links : link
        }
      </ul>
    </div>
    <Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className=" flex space-x-4 px-1">
     {
      user ? links : link
     }
    </ul>
  </div>
  <div className="navbar-end space-x-2.5">
    <div className=' ml-4'>
      <input  type="checkbox" value="dark" className="toggle theme-controller w-10" />
    </div>

    {
      user ? (
        <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt=""
            src={user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 space-y-3 shadow">
        <li>
         {user.displayName}
        </li>
        <li>
          {user.email}
        </li>
        <li><a onClick={handleLogOut} className='font-bold text-red-700 text-lg'>Logout</a></li>
      </ul>
    </div>
  </div>
      ) : ( <Link to='/login'>
    <button className="btn border-none bg-gradient-to-b from-sky-400 to-blue-600
 text-white">
      Login
    </button>
    </Link>)
    }
   
   
  </div>
</div>
    </div>
  );
};

export default Navbar;