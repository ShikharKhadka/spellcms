import React from 'react'
import { NavLink } from 'react-router-dom'

const Sider = () => {
    return (
        <div className='flex flex-col'>
            <NavLink to={"/blog"}>Blog</NavLink>
            <NavLink to={"/category"}>Category</NavLink>
            <NavLink to={"/author"}>Author</NavLink>
            <NavLink to={"/login"}>Logout</NavLink>
        </div>
    )
}

export default Sider
