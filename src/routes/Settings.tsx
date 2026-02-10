import {LucideArrowLeft, LucideCircleQuestionMark, LucideTag, LucideUser} from 'lucide-react'
import {NavLink} from 'react-router'

function Settings() {

  const user_data = {
    tags_style: ["Analytisch", "Kreativ", "Teamarbeit", "Strukturiert", "Flexibel"],
    tags_interests: ["IT", "Technik", "Gaming", "Reisen", "Musik"],
    tags_social: ["Teamplayer", "Kommunikativ", "Organisierend", "Unterstützend"],
  }

  return <div className={'flex flex-col py-5 text-start gap-0'}>
    <div className={'flex items-center gap-2 mb-4 mx-5'}>
      <NavLink to={'/home'}>
        <LucideArrowLeft size={28}/>
      </NavLink>
      <h3>Einstellungen</h3>
    </div>
    <h4 className={'flex items-center gap-2 mx-5 py-1'}>
      <LucideTag/> Meine Tags
    </h4>

    <div className={'settings-item-full'}>
      <div>Arbeitsstil</div>
      <div className={'flex flex-wrap gap-1'}>
        {user_data.tags_style.map((tag, index) => <span className={'chip'} key={index}>{tag}</span>)}
      </div>
    </div>

    <div className={'settings-item-full'}>
      <div>Interessen</div>
      <div className={'flex flex-wrap gap-1'}>
        {user_data.tags_interests.map((tag, index) => <span className={'chip'} key={index}>{tag}</span>)}
      </div>
    </div>

    <div className={'settings-item-full'}>
      <div>Soziales</div>
      <div className={'flex flex-wrap gap-1'}>
        {user_data.tags_social.map((tag, index) => <span className={'chip'} key={index}>{tag}</span>)}
      </div>
    </div>

  </div>
}

export default Settings