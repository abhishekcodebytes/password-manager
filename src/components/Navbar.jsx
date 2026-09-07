import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-amber-500 
        flex justify-between items-center h-20 px-5 py-3'>
            <div className='logo font-bold'>trial</div>
            <ul>
                <li className=' flex gap-4'>
                    <a className='hover:font-bold' href="">Home</a>
                    <a className='hover:font-bold' href="">About</a>
                    <a className='hover:font-bold' href="">Contact</a>

                </li>
            </ul>
           <button className='text-black bg-green-500  my-5 rounded-md flex gap-2
           justify-center items-center '>
                <img  className = 'invert py-1 w-10'  src="public/github.png" alt="" />
                <span className='font-bold p-1 '>github</span>
            </button>
        </nav>
    )
}

export default Navbar

