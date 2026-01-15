/* eslint-disable react-refresh/only-export-components */
import {type ReactNode, StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Home from './routes/Home.tsx'
import {BrowserRouter, Navigate, NavLink, Outlet, Route, Routes} from 'react-router'
import {LucideBookmark, LucideHistory, LucideHome, LucideUser} from 'lucide-react'
import Profile from './routes/Profile.tsx'
import PageHistory from './routes/PageHistory.tsx'
import Bookmarks from './routes/Bookmarks.tsx'

function Layout() {
  return (
    <div className={'flex gap-5'}>
      <NavigationBar/>
      <div className={'card w-[550px] h-[620px] p-0'}>
        <Outlet/>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to="/home" replace/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/history" element={<PageHistory/>}/>
          <Route path="/bookmarks" element={<Bookmarks/>}/>
          <Route path="/profile" element={<Profile/>}/>

          <Route path="*" element={<Navigate to="/home" replace/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

function NavigationBar(): ReactNode {
  const linkClass = ({isActive}: {isActive: boolean}) =>
    isActive
      ? 'text-accent'
      : 'text-ctp-text/70 hover:text-ctp-text'

  return <div className="flex flex-col gap-10 justify-start items-center py-2.5">
    <NavLink to="/home" className={linkClass}>
      <LucideHome size={40}/>
    </NavLink>
    <NavLink to="/history" className={linkClass}>
      <LucideHistory size={40}/>
    </NavLink>
    <NavLink to="/bookmarks" className={linkClass}>
      <LucideBookmark size={40}/>
    </NavLink>
    <NavLink to="/profile" className={linkClass}>
      <LucideUser size={40}/>
    </NavLink>
  </div>
}