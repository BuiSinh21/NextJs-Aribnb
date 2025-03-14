'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import useRegisterModal from "../../hooks/useRegisterModal"
import useLoginModal from "../../hooks/useLoginModal"
import { SafeUser } from "../../types"
import useRentModal from "@/app/hooks/useRentModal"

interface UserMenuProps {
    currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = (
    currentUser
) => {
    const [isOpen, setIsOpen] = useState(false)
    const registerModal = useRegisterModal();
    const rentModal = useRentModal();
    const loginModal = useLoginModal();
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }
    const onRent = useCallback(()=>{
        if(!currentUser.currentUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    },[currentUser,loginModal,rentModal])
    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div onClick={() =>onRent()}
                    className=' hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover: bg-neutral-100 transition cursor-pointer '>
                    Aribn your home
                </div>
                <div onClick={() => { toggleOpen() }} className=" py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-sm w-[40vw] md:w-3/4 bg-neutral-50 overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {
                            currentUser.currentUser  ? 
                                <>
                                    <MenuItem onClick={() => { }} label='My trips' />
                                    <MenuItem onClick={() => { }} label='My favorites' />
                                    <MenuItem onClick={() => { }} label='My reservations' />
                                    <MenuItem onClick={() => { }} label='My properties' />
                                    <MenuItem onClick={() => { }} label='Airbnb my home' />
                                    <hr />
                                    <MenuItem onClick={() => signOut() } label='Logout' />

                                </>
                            :
                                <>
                                    <MenuItem onClick={() => { loginModal.onOpen() }} label='Login' />
                                    <MenuItem onClick={() => { registerModal.onOpen() }} label='Sign up' />
                                    {/* <MenuItem onClick={() => {signOut();localStorage.clear()} } label='Logout' /> */}

                                </>
                         } 
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserMenu
