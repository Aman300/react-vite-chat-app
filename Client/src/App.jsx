
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import Login from "./views/auth/Login";
import Home from "./views/home/Home";
import Sidebar from "./components/Sidebar";
import Wallet from './views/home/Wallet';
import ReferEarn from './views/home/ReferEarn';
import Profile from './views/home/Profile';
import Support from './views/home/Support';
import TermLegal from './views/home/TermLegal';
import Transaction from './views/home/Transaction';
import PrivateRoutes from './utils/PrivateRoutes';
import Chat from './views/home/Chat';

export default function App() {
  return (
    <>
    
    <BrowserRouter>
        <Routes>

        <Route>
          <Route
            path="/login"
            element={
              <div className='xl:w-1/3 xl:border-r-4 border-gray-300'>
           
              <div>
                <Outlet /> 
              </div>
            </div>
            }
            >

              <Route path='/login' element={<Login />} />
              {/* <Route path='/signup' element={<Signup />} /> */}
            </Route>
            </Route>
          
          
        

          <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              <div className='xl:w-1/3 xl:border-r-4 border-gray-300'>
                <Sidebar />
                <div>
                  <Outlet /> 
                </div>
              </div>
            }
          >
            <Route path="/" element={<Home />} />            
            <Route path="/chat/:id" element={<Chat />} />            
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/refer&earn" element={<ReferEarn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/term&legal" element={<TermLegal />} />
            
          </Route>
        </Route>

        </Routes>
        
      </BrowserRouter>
    </>
  )
}