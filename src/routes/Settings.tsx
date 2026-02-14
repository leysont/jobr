import {LucideArrowLeft, LucideCheck, LucideSquare, LucideSquareCheck, LucideTag} from 'lucide-react'
import {NavLink} from 'react-router'
import {useEffect, useRef, useState} from 'react'
import {useAppCtx} from '../main.tsx'

type PopupShown = 'interests' | 'style'

function Settings() {

  const {userTags} = useAppCtx()

  const [popupShown, setPopupShown] = useState<PopupShown | null>(null)

  function showPopupInterests() {
    setPopupShown('interests')
  }

  function showPopupStyle() {
    setPopupShown('style')
  }

  function closePopup() {
    setPopupShown(null)
  }

  return <div className={'flex flex-col py-5 text-start gap-0'}>
    <div className={'flex items-center gap-2 mb-4 mx-5'}>
      <NavLink to={'/home'}>
        <LucideArrowLeft size={28}/>
      </NavLink>
      <h3>Profil</h3>
    </div>
    <h4 className={'flex items-center gap-2 mx-5 py-1'}>
      <LucideTag/> Meine Tags
    </h4>

    <div className={'settings-item-full'} onClick={() => popupShown ? closePopup() : showPopupInterests()}>
      <div>Interessen</div>
      <div className={'flex flex-wrap gap-1'}>
        {userTags?.interests.map((tag, index) => <span className={'chip blue'} key={index}>{tag}</span>)}
      </div>
    </div>

    <div className={'settings-item-full'} onClick={() => popupShown ? closePopup() : showPopupStyle()}>
      <div>Arbeitsstil</div>
      <div className={'flex flex-wrap gap-1'}>
        {userTags?.style.map((tag, index) => <span className={'chip green'} key={index}>{tag}</span>)}
      </div>
    </div>

    {popupShown ? <ListSelectPopup type={popupShown} onPopupClose={closePopup}/> : null}

  </div>
}

type ListSelectPopupProps = {
  type: PopupShown,
  onPopupClose: () => void
}

function ListSelectPopup({type, onPopupClose}: ListSelectPopupProps) {
  const {userTags, setUserTags, allJobs} = useAppCtx()
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onPopupClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onPopupClose])

  const list: string[] = [...new Set(allJobs.map(job => type === 'interests' ? job.job_tag_interests : job.job_tag_style).flat())]

  console.log(list)

  return <div className={'PopUp card'} ref={popupRef}>
    <div className={'flex justify-between items-center'}>
      <h4 className="capitalize mb-2">
        {type === 'interests' ? 'Interessen' : 'Arbeitsstil'}
      </h4>
      <button className={'btn blue py-1'} onClick={() => onPopupClose()}>
        <LucideCheck size="20" />
        Fertig
      </button>
    </div>

    {list.map((tag, index) => <div key={index}>
      <CheckBox
        text={tag}
        checked={type === 'interests' ? (userTags?.interests.includes(tag) ?? false) : (userTags?.style.includes(tag) ?? false)}
        onToggle={checked => {
          if (userTags) {
            if (checked) {
              setUserTags({
                ...userTags,
                [type]: [...userTags[type], tag],
              })
            } else {
              setUserTags({
                ...userTags,
                [type]: userTags[type].filter(item => item !== tag),
              })
            }
          }
        }}
      />
    </div>)}
  </div>
}

type CheckBoxProps = {
  text: string,
  checked: boolean,
  onToggle: (checked: boolean) => void,
}

function CheckBox({text, checked, onToggle}: CheckBoxProps) {

  return <button onClick={() => onToggle(!checked)} role="checkbox" aria-checked={checked}
                 className={`flex items-center gap-2 w-full text-start hover:bg-ctp-surface0 p-1 rounded transition-colors ${checked ? 'bg-ctp-blue/10 text-ctp-blue' : ''}`}>
    {checked ? <LucideSquareCheck/> : <LucideSquare/>}
    {text}
  </button>
}

export default Settings