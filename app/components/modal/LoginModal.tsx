
"use client";
import Modal from "@/app/components/modal/Modal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Heading from "../Heading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            password: '',
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect:false,
        })
            .then((callback) => {
                setIsLoading(false);
                if(callback?.ok)
                    {
                        console.log(12312312312312);
                        toast.success("Loged in")
                        router.refresh();
                        loginModal.onClose();
                    }
                if(callback?.error)
                    {
                        toast.error(callback.error);
                    }
      })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
            <Heading title="Welcome back" subtitle="Login to your accoung!" />

            <Input id="email" label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                
                register={register}
                errors={errors}
                required
            />

        </div>
    )
    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal,registerModal])
    const footerContent = (<>
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                Icon={FcGoogle}
                onClick={() => { signIn('google')}}
            />
            <Button
                outline
                label="Continue with Github"
                Icon={AiFillGithub}
                onClick={() => {signIn('github') }}
            />
            <div className="text-center text-neutral-500 mt-4 font-light">
                <div className="justify-center flex flex-row items">
                    <div>
                        First time using Airbnb?
                    </div>
                    <div onClick={() => toggle()} className="text-neutral-800 cursor-pointer hover: underline">Create an account</div>
                </div>
            </div>
        </div>
    </>)
    return (
        <Modal
            disable={isLoading}
            isOpen={loginModal.isOpen}
            title={'Login'}
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}>

        </Modal>
    )
}

export default LoginModal
