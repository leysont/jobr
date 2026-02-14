import {LucideArrowLeft, LucideTag} from 'lucide-react'
import {NavLink} from 'react-router'
import {useState} from 'react'
import {useAppCtx} from '../main.tsx'

type PopupShown = 'interests' | 'style'

function Settings() {

  const {userTags, setUserTags} = useAppCtx()

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
      <h3>Einstellungen</h3>
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

    {/*{popupShown ? <ListSelectPopup type={popupShown}/> : null}*/}

  </div>
}

// type ListSelectPopupProps = {
//   type: PopupShown
// }

// function ListSelectPopup({type}: ListSelectPopupProps) {
//   const {userTags, setUserTags, seenJobs, setSeenJobs, matchedJobs, setMatchedJobs, allJobs, setAllJobs} = useAppCtx()
//
//   const list: string[] = [...new Set(allJobs.map(job => type === 'interests' ? job.job_tag_interests : job.job_tag_style).flat())]
//
//   console.log(list)
//
//   return <div className={'PopUp card h-10'}>
//     {type}
//
//     {list.map((tag, index) => <div key={index}>
//       {type === 'interests' ?
//         <CheckBox text={tag}
//           checked={userTags?.interests.includes(tag) ?? false}
//           onToggle={checked => {
//             if(checked) {
//               setUserTags(prev => prev?.interests.push(tag))
//             } else {
//               setUserTags({...userTags, interests: userTags.interests.filter(interest => interest !== tag)})
//             }
//           }}
//         /> : type === 'style' ?
//           <CheckBox text={tag}
//             checked={userTags?.style.includes(tag) ?? false}/> : null
//       }
//     </div>)}
//   </div>
// }

// type CheckBoxProps = {
//   text: string,
//   checked: boolean,
//   onToggle: (checked: boolean) => void,
// }
//
// function CheckBox({text, checked, onToggle}: CheckBoxProps) {
//
//   return <button onClick={() => onToggle(!checked)} role="checkbox" aria-checked={checked}>
//     {checked ? <LucideSquareCheck/> : <LucideSquare/>}
//     Accept terms
//   </button>
// }

export default Settings