import {LucideBookmark, LucideRocket, LucideX} from 'lucide-react'

function Home() {

  const data = {
    job_title: 'Software Engineer',
    job_description: 'Creates software for various purposes',
    job_img_url: 'https://rest.arbeitsagentur.de/infosysbub/berufepool-rest/ct/v1/bilder/dkz_13659_33.jpg',
  }

  return <div className={'flex flex-col'}>

      <img src={data.job_img_url} alt={'Job Image'} className={''}/>

      <div className="flex flex-col justify-between items-start p-5 gap-5">
        <div className={'flex flex-col gap-1 items-start'}>
          <h3>{data.job_title}</h3>
          <p>{data.job_description}</p>
        </div>
        <div className={'flex gap-10 w-full justify-center items-center'}>
          <button className={'btn round red p-5'} title={'Reject'} onClick={() => {
          }}>
            <LucideX size="40"/>
          </button>
          <button className={'btn round blue p-5 scale-80'} title={'Match'} onClick={() => {
          }}>
            <LucideBookmark size="40"/>
          </button>
          <button className={'btn round green p-5'} title={'Bookmark'} onClick={() => {
          }}>
            <LucideRocket size="40"/>
          </button>
        </div>
      </div>

    </div>
}

export default Home
