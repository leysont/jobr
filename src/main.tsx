/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import {type ReactNode, StrictMode, useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Home from './routes/Home.tsx'
import {BrowserRouter, Navigate, NavLink, Outlet, Route, Routes, useOutletContext} from 'react-router'
import {LucideHome, LucideSettings} from 'lucide-react'
import Settings from './routes/Settings.tsx'
import {type Job, jobRepo} from './JobRepo.ts'

export type JobMatch = {
  job: Job,
  matching_tags: string[]
}

type UserTags = {
  interests: string[],
  style: string[],
}

type AppCtx = {
  userTags: UserTags | null,
  setUserTags: React.Dispatch<React.SetStateAction<UserTags | null>>,
  seenJobs: Job[],
  setSeenJobs: React.Dispatch<React.SetStateAction<Job[]>>,
  matchedJobs: JobMatch[],
  setMatchedJobs: React.Dispatch<React.SetStateAction<JobMatch[]>>,
  allJobs: Job[],
  setAllJobs: React.Dispatch<React.SetStateAction<Job[]>>,
  currentJob: Job | null,
  setCurrentJob: React.Dispatch<React.SetStateAction<Job | null>>,
  setRandomJob: (jobs: Job[]) => void,
}

export function useAppCtx() {
  return useOutletContext<AppCtx>()
}



function Layout() {

  const [userTags, setUserTags] = useState<UserTags | null>(null)
  const [seenJobs, setSeenJobs] = useState<Job[]>([])
  const [matchedJobs, setMatchedJobs] = useState<JobMatch[]>([])
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [currentJob, setCurrentJob] = useState<Job | null>(null)

  function setRandomJob(jobsList: Job[]) {
    console.log('setRandomJob: received jobsList:')
    console.log(jobsList)
    if (jobsList.length === 0) {
      console.log('setRandomJob: received empty array, returning')
      return
    }
    const randomJob = jobsList[Math.floor(Math.random() * jobsList.length)]
    setCurrentJob(randomJob)
  }

  const appCtx: AppCtx = {
    userTags,
    setUserTags,
    seenJobs,
    setSeenJobs,
    matchedJobs,
    setMatchedJobs,
    allJobs,
    setAllJobs,
    currentJob,
    setCurrentJob,
    setRandomJob
  }

  useEffect(() => {
    setUserTags({
      interests: ["IT", "Technik", "Gaming", "Reisen", "Musik"],
      style: ["Analytisch", "Kreativ", "Teamarbeit", "Strukturiert", "Flexibel",
        "Teamplayer", "Kommunikativ", "Organisierend", "Unterstützend"],
    })
    jobRepo.getAll().then(jobs => {
        setAllJobs(jobs)
        setRandomJob(jobs)
      },
    )
  }, []);

  return (
    <div className={'flex gap-5'}>
      <NavigationBar/>
      <div className={'card w-[550px] h-[620px] p-0'}>
        <Outlet context={appCtx}/>
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
  </StrictMode>,
)

function NavigationBar(): ReactNode {
  const linkClass = ({isActive}: { isActive: boolean }) =>
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