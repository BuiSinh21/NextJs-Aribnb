
"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "@/app/components/modal/Modal";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name:'',
            email: '',
            password: '',
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((err) => {
                toast.error("Has something wrong ")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toggle = useCallback(()=>{
        loginModal.onOpen();
        registerModal.onClose();
    },[loginModal,registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4 ">
            <Heading title="Welcome to Airbnb" subtitle="Create an acount" />
            <Input id="email" label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input id="name" label="Name"
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
   
    const footerContent = (<>
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                Icon={FcGoogle}
                onClick={() => { }}
            />
            <Button
                outline
                label="Continue with Github"
                Icon={AiFillGithub }
                onClick={() => { }}
            />
            <div className=" text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items">
                    <div>
                        Already have an account? 
                    </div>
                    <div onClick={()=> toggle()} className="text-neutral-800 cursor-pointer hover: underline"> Log in</div>
                </div>
            </div>
        </div>
    </>)
    return (
        <Modal
            disable={isLoading}
            isOpen={registerModal.isOpen}
            title={'Register'}
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}>

        </Modal>
    )
}

export default RegisterModal
