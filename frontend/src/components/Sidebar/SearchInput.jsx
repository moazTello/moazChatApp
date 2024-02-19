import React ,{useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {
  const [search, setSearch] = useState('');
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations()
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      return toast.error('must be more than 3 characters')
    }
    console.log(conversations)
    const conversation = conversations.find((con) => con.fullname.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation);
      setSearch('');
    }
    else{
      toast.error('no such user found !')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input className='input input-bordered rounded-full' type='text' placeholder='Search_'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' title='Search For a Conversation' className='btn btn-circle bg-orange-300 text-white'>
            <FaSearch size={20} className='outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput