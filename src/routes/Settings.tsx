import {LucideAlertCircle, LucideArrowLeft, LucideCircleQuestionMark, LucideTag, LucideUser} from 'lucide-react'
import {NavLink} from 'react-router'

function Settings() {

  const data = {
    tags_workingstyle: ["Analytisch", "Produktiv", "Teamorientiert", "Innovativ", "Fokussiert"],
    tags_interests: ["Webentwicklung", "Softwareentwicklung", "Datenbanken", "Webdesign", "UX/UI Design"],
    tags_social: ["Freunde", "Kollegen", "Freunde der Arbeit", "Freunde der Freunde"],
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
        {data.tags_workingstyle.map((tag, index) => <span className={'chip'} key={index}>{tag}</span>)}
      </div>
    </div>

    <div className={'settings-item-full'}>
      <div>Interessen</div>
      <div className={'flex flex-wrap gap-1'}>
        {data.tags_interests.map((tag, index) => <span className={'chip'} key={index}>{tag}</span>)}
      </div>
    </div>

    <div className={'settings-item-full'}>
      <div>Soziales</div>
      <div className={'flex flex-wrap gap-1'}>
        {data.tags_social.map((tag, index) => <span className={'chip'} key={index}>{tag}</span>)}
      </div>
    </div>

    <div className={'div-hor'}></div>

    <div className={'settings-item-full flex items-center gap-2'}>
      <LucideUser/> Konto
    </div>
    <div className={'settings-item-full flex items-center gap-2'}>
      <LucideCircleQuestionMark/> Hilfe
    </div>

  </div>
}

export default Settings