import data from './data.json'

export interface Job {
  id: number,
  job_title: string,
  job_description: string,
  job_img_url: string,
  job_tag_style: string[],
  job_tag_interests: string[],
  job_tag_social: string[]
}

const jobs: Job[] = data

export const jobRepo = {
  getAll: async () => jobs,
  getById: async (id: number) =>
    jobs.find(job => job.id === id),
}