import React, {memo, useMemo} from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import useWindowSize from '../../hooks/useWindowSize'
import useConversation from '../../zustand/useConversation'
const Sidebar = () => {
  const {sideNum} = useConversation();
  const {width} = useWindowSize();
  const searchInputComponent = useMemo(() => <>
    <SearchInput/> 
    <div className='divider px-3'></div>
  </>
  , []);
  const conversationComponent = useMemo(() => <Conversations/>, []);
  const lorOutComponent = useMemo(() => <LogoutButton/>, []);

  return (
    <div className={`border-r border-slate-500 p-4 flex flex-col`} 
          style={{display:width<600&&sideNum?'none':''}}
    >
      {searchInputComponent}
      {/* <div className='divider px-3'></div> */}
      {conversationComponent}
      {lorOutComponent}
        {/* <SearchInput/>
        <Conversations/>
        <LogoutButton/> */}
    </div>
  )
}

export default memo(Sidebar)