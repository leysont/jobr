import {LucideRocket, LucideX} from 'lucide-react'
import {type Job, jobRepo} from '../JobRepo.ts'
import {useEffect, useState} from 'react'
import {type JobMatch, useAppCtx} from '../main.tsx'

function Home() {

  const {userTags, seenJobs, setSeenJobs, matchedJobs, setMatchedJobs, allJobs, setAllJobs} = useAppCtx()

  const [currentJob, setCurrentJob] = useState<Job | null>(null)
  const [likedJobs, setLikedJobs] = useState<Job[]>([])
  const [areJobsAvailable, setAreJobsAvailable] = useState(true)

  function setRandomJob(jobsList: Job[], addToLikedJobs: boolean = false) {
    if (jobsList.length === 0) return
    const randomJob = jobsList[Math.floor(Math.random() * jobsList.length)]
    setCurrentJob(randomJob)
  }

  function setNextJob(addToLikedJobs: boolean) {
    const seenJobsTemp = seenJobs
    if (currentJob) {
      seenJobsTemp.push(currentJob)
      // setSeenJobs(prev => [...prev, currentJob])
      if (addToLikedJobs) {
        setLikedJobs(prev => [...prev, currentJob])
        console.log(`added to liked jobs: ${currentJob.job_title}`)
      }
    }
    setRandomJob(allJobs.filter(job => !seenJobsTemp.includes(job)), addToLikedJobs)
    setAreJobsAvailable(allJobs.length > seenJobsTemp.length)
    setSeenJobs(seenJobsTemp)
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
      <h3 className={'text-ctp-green'}>Du hast {jobMatches.length} Jobs geliket!</h3>
      <span className={''}>Sieh dir jetzt an, welche Jobs wirklich zu dir passen!</span>

      <div className={'flex flex-col gap-5 max-h-96 overflow-y-auto mt-5 max-w-96'}>
        {
          jobMatches.sort((a, b) => b.matching_tags.length - a.matching_tags.length).map(jobMatch =>
            <div className={'flex flex-col'} key={jobMatch.job.id}>
              <span className={'text-start ps-2'}>{jobMatch.job.job_title}</span>
              <div className={'flex flex-wrap gap-1'}>
                {[
                  jobMatch.job.job_tag_interests.map(tag => {
                    const isMatch = userTags?.interests.includes(tag)
                    return <span className={`chip w-min whitespace-nowrap border blue ${(isMatch ? 'border-ctp-blue' : ' border-transparent')}`} key={`${jobMatch.job.id}-${tag}`}>
                      {tag}
                    </span>
                  }),
                  jobMatch.job.job_tag_style.map(tag => {
                    const isMatch = userTags?.style.includes(tag)
                    return <span className={`chip w-min whitespace-nowrap border green ${(isMatch ? 'border-ctp-green' : 'border-transparent')}`} key={`${jobMatch.job.id}-${tag}`}>
                      {tag}
                    </span>
                  }),
                ].flat()}
              </div>
            </div>,
          )
        }
      </div>

    </div>
  }


  function evaluateMatches(): JobMatch[] {

    const unfilteredJobMatches: JobMatch[] = likedJobs.map(job => {
      return {job, matching_tags: [job.job_tag_interests, job.job_tag_style].flat()}
    })
    const userTags2 = [userTags?.interests, userTags?.style].flat()

    return unfilteredJobMatches.map(jobMatch => {
      return {...jobMatch, matching_tags: jobMatch.matching_tags.filter(tag => userTags2.includes(tag))}
    })
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
