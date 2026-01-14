import {type ReactNode, useState} from 'react'
import {
  LucideBookmark,
  LucideChevronRight,
  LucideHistory,
  LucideHome,
  LucideRocket,
  LucideUser,
  LucideX,
} from 'lucide-react'

function App() {

  const data = {
    job_title: 'Software Engineer',
    job_description: 'Creates software for various purposes',
    job_img_url: 'https://rest.arbeitsagentur.de/infosysbub/berufepool-rest/ct/v1/bilder/dkz_13659_33.jpg',
  }


  return <div className={'flex gap-5'}>
    <NavigationBar/>
    <div className={'card w-[550px] p-0'}>
      <div className={'flex flex-col'}>

        <img src={data.job_img_url} alt={'Job Image'} className={''}/>

        <div className="flex flex-col justify-between items-start p-5 gap-5">
          <div className={'flex flex-col gap-1 items-start'}>
            <h3>{data.job_title}</h3>
            <p>{data.job_description}</p>
          </div>
          <div className={'flex gap-10 w-full justify-center items-center'}>
            <button className={'btn round red p-5'} title={'Reject'} onClick={() => {}}>
              <LucideX size="40"/>
            </button>
            <button className={'btn round blue p-5 scale-80'} title={'Match'} onClick={() => {}}>
              <LucideBookmark size="40"/>
            </button>
            <button className={'btn round green p-5'} title={'Bookmark'} onClick={() => {}}>
              <LucideRocket size="40"/>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
}

function NavigationBar(): ReactNode {
  return <div className="flex flex-col gap-10 justify-start items-center py-2.5">
    <a href="/" target="_blank" className={'text-accent/80 hover:text-accent'}>
      <LucideHome size={40} />
    </a>
    <a href="/history" target="_blank" className={'text-ctp-text/70 hover:text-ctp-text'}>
      <LucideHistory size={40} />
    </a>
    <a href="/bookmarks" target="_blank" className={'text-ctp-text/70 hover:text-ctp-text'}>
      <LucideBookmark size={40} />
    </a>
    <a href="/profile" target="_blank" className={'text-ctp-text/70 hover:text-ctp-text'}>
      <LucideUser size={40} />
    </a>
  </div>
}

function GettingStarted(): ReactNode {
  const [expanded, setExpanded] = useState(false)

  return <div className={'flex flex-col'}>
    <button onClick={() => setExpanded(prev => !prev)}>
      <LucideChevronRight
        size="20"
        className={`${expanded ? 'rotate-90' : 'rotate-0'} transition-transform`}/>
      <h4>Getting Started</h4>
    </button>

    <div
      className={`overflow=hidden transition-all ${expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
      <ul className={'ml-5 mt-3'}>
        <li>
          Edit <code>src/App.tsx</code> and save to test HMR
        </li>
        <li>
          Change <code>--color-accent</code> in <code>src/index.css</code> to change accent color
        </li>
        <li>
          Click on logos to learn more
        </li>
      </ul>
    </div>
  </div>
}

export default App
