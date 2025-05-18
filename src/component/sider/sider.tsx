import { NavLink, useNavigate } from 'react-router-dom'

const Sider = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col'>
            <Nav name='Blog' to='/blog' />
            <Nav name='Category' to='/category' />
            <Nav name='Author' to='/author' />
            <button className='m-3' onClick={() => {
                navigate("/login", { replace: true });
                localStorage.clear();
            }} >Logout</button>
        </div>
    )
}

const Nav = ({ name, to }: { name: string, to: string }) => {
    return (<NavLink className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "bg-amber-400" : ""
    } to={to}>{name}</NavLink>)
}

export default Sider
