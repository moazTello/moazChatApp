import { create } from "zustand";
const useConversation = create((set) => ({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages:(messages) => set({messages}),
    jhinImae:false,
    setJhinImage:(jhinImage) => set({jhinImage}),
    sideNum:false,
    setSideNum:(sideNum) => set({sideNum}),
}));

export default useConversation;