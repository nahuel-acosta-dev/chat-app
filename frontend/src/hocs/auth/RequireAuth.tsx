import { useLocation, Navigate, Outlet } from 'react-router-dom';;

const RequireAuth = () => {
    const local = localStorage.getItem("authTokens")
    const location = useLocation();

    return (
        local ? 
        <Outlet />
        :
        <Navigate to="/auth/login" state={{from: location}} replace />
        )
}

export default RequireAuth;