/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import {type ReactNode, StrictMode, useState} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Home from './routes/Home.tsx'
import {BrowserRouter, Navigate, NavLink, Outlet, Route, Routes, useOutletContext} from 'react-router'
import {LucideHome, LucideSettings} from 'lucide-react'
import Settings from './routes/Settings.tsx'
import type {Job} from './JobRepo.ts'

export type JobMatch = {
  job: Job,
  matching_user_tags: {
    interests: string[],
    style: string[],
    social: string[],
  }
}

type User = {
  tags: {
    interests: string[],
    style: string[],
    social: string[],
  }
}

type AppCtx = {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  seenJobs: Job[],
  setSeenJobs: React.Dispatch<React.SetStateAction<Job[]>>,
  matchedJobs: JobMatch[],
  setMatchedJobs: React.Dispatch<React.SetStateAction<JobMatch[]>>,
}

export function useAppCtx() {
  return useOutletContext<AppCtx>()
}

function Layout() {

  const [user, setUser] = useState<User | null>(null)
  const [seenJobs, setSeenJobs] = useState<Job[]>([])
  const [matchedJobs, setMatchedJobs] = useState<JobMatch[]>([])

  const appCtx: AppCtx = {user, setUser, seenJobs, setSeenJobs, matchedJobs, setMatchedJobs}


  return (
    <div className={'flex gap-5'}>
      <NavigationBar/>
      <div className={'card w-[550px] h-[620px] p-0'}>
        <Outlet context={appCtx} />
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
          <Route path="/settings" element={<Settings/>}/>

          <Route path="*" element={<Navigate to="/home" replace/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

function NavigationBar(): ReactNode {
  const linkClass = ({isActive}: {isActive: boolean}) =>
    isActive
      ? 'text-accent/75 hover:text-accent'
      : 'text-ctp-text/75 hover:text-ctp-text'

  return <div className="flex flex-col gap-10 justify-start items-center py-2.5">
    <NavLink to="/home" className={linkClass}>
      <LucideHome size={40}/>
    </NavLink>
    <NavLink to="/settings" className={linkClass}>
      <LucideSettings size={40}/>
    </NavLink>
  </div>
}