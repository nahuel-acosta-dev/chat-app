import {Routes, Route} from 'react-router-dom';
import AuthRouter from './AuthRouter';
import Home from '../pages/Home';
import RequireAuth from '../hocs/auth/RequireAuth';
import PersistLogin from '../hocs/auth/PersistLogin';
import PublicRoutes from './PublicRoutes';
import ApplicationRouter from './ApplicationRouter';
import Error404 from '../pages/error/Error404'


const HelperRouters = () =>{

    return (
      <Routes>
      <Route path="*" element={<Error404/>}></Route>
      <Route index element={<Home/>} />
      <Route path="/" element={<PersistLogin />}>
          {/* public routes */}
          <Route path="auth/*" 
          element={
            <PublicRoutes>
              <AuthRouter/>
            </PublicRoutes>
            } 
            />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="app/*" element={<ApplicationRouter/>} />
        </Route>
      </Route>
    </Routes>

    )
}

export default HelperRouters;