import {LucideRocket, LucideX} from 'lucide-react'
import {type Job, jobRepo} from '../JobRepo.ts'
import {useEffect, useState} from 'react'
import {type JobMatch, useAppCtx} from '../main.tsx'

function Home() {

  const {user, seenJobs, setSeenJobs, matchedJobs, setMatchedJobs} = useAppCtx()

  const [currentJob, setCurrentJob] = useState<Job | null>(null)
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [likedJobs, setLikedJobs] = useState<Job[]>([])
  const [areJobsAvailable, setAreJobsAvailable] = useState(true)

  function setRandomJob(jobsList: Job[], addToLikedJobs: boolean = false) {
    if (jobsList.length === 0) return
    const randomJob = jobsList[Math.floor(Math.random() * jobsList.length)]
    setCurrentJob(randomJob)
  }

  function setNextJob(addToLikedJobs: boolean) {
    if (currentJob) {
      setSeenJobs(prev => [...prev, currentJob])
      if (addToLikedJobs) {
        setLikedJobs(prev => [...prev, currentJob])
        console.log(`added to liked jobs: ${currentJob.job_title}`)
      }
    }
    setRandomJob(allJobs.filter(job => !seenJobs.includes(job)), addToLikedJobs)
    setAreJobsAvailable(allJobs.length > seenJobs.length)
  }

  useEffect(() => {
    jobRepo.getAll().then(jobs => {
        setAllJobs(jobs)
        setRandomJob(jobs)
      },
    )
  }, [])

  type JobDisplayParams = {
    job: Job | null,
    onLike: () => void,
    onDislike: () => void,
  }

  function JobDisplay({job, onLike, onDislike}: JobDisplayParams) {
    return <>
      <img src={job?.job_img_url} alt={'Job Image'} className={'max-h-[387px] h-full w-auto object-cover'}/>

      <div className="flex flex-col justify-between items-start p-5 gap-2">
        <div className={'flex flex-col gap-1 items-start'}>
          <h3>{job?.job_title}</h3>
          <p>{job?.job_description}</p>
        </div>
        <div className={'flex gap-20 w-full justify-center items-center'}>
          <button className={'btn round red p-5'} disabled={!areJobsAvailable} title={'Reject'}
                  onClick={() => onDislike()}>
            <LucideX size="40"/>
          </button>
          <button className={'btn round green p-5'} disabled={!areJobsAvailable} title={'Bookmark'}
                  onClick={() => onLike()}>
            <LucideRocket size="40"/>
          </button>
        </div>
      </div>
    </>
  }



  type JobResultsProps = {
    jobMatches: JobMatch[]
  }

  function JobResults({jobMatches}: JobResultsProps) {
    return <div className={'w-full flex flex-col justify-center items-center gap-3 size-full'}>
      <h3 className={'text-ctp-green'}>Du hast alle Jobs gesehen!</h3>
      <span className={''}>Sieh dir jetzt an, welche Jobs wirklich zu dir passen!</span>

      <div className={'flex flex-col gap-5'}>
        {
          jobMatches.sort((a, b) => b.job.job_tag_interests.length - a.job.job_tag_interests.length).map(jobMatch =>
            <div className={'flex flex-col'}>
              <span className={'text-start'}>{jobMatch.job.job_title}</span>
              <div className={'flex flex-wrap gap-1'}>
                {
                  jobMatch.job.job_tag_interests.map(tag =>
                    <span className={'chip w-min whitespace-nowrap'} key={`${jobMatch.job.id}-${tag}`}>{tag}</span>,
                  )
                }
              </div>
            </div>,
          )
        }
      </div>

    </div>
  }


  function evaluateMatches() {



    return likedJobs.map(job => ({
      job, matching_user_tags: {
        interests: job.job_tag_interests,
        style: job.job_tag_style,
        social: job.job_tag_social,
      },
    }))
  }

  return <div className={'flex flex-col h-screen w-full'}>

    {areJobsAvailable ?
      <JobDisplay
        job={currentJob}
        onLike={() => setNextJob(true)}
        onDislike={() => setNextJob(false)}
      />
      :
      <JobResults jobMatches={evaluateMatches()}/>
    }
  </div>

}

export default Home
