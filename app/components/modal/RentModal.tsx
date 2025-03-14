'use client'
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Catagories";
import CategoryInput from "../Input/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../Input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Input/Counter";
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}
const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset

    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            decription: ''

        }
    })
    const category = watch('category');
    const location = watch('location');
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])
    // const category = watch('category');
    // const category = watch('category');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    const onBack = () => {
        setStep(value => value - 1)
    }
    const onNext = () => {
        setStep(value => value + 1)
    }
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) { return 'Create' }
        return 'Next'
    }, [step])
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step])
    let bodyCentent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of the best describes your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map(item => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
    if (step === STEPS.LOCATION) {
        bodyCentent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place loadted?"
                    subtitle="Help guests find you" />
                <CountrySelect value={location}
                    onChange={(value) => setCustomValue("location", value)} />
                <Map center={location?.latlng} />
            </div>

        )
    }
    if (step === STEPS.INFO) {
        bodyCentent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your places"
                    subtitle="What amenities do you have?"
                />
                <Counter subtitle="How many guests"
                    title="number of guest"
                />
            </div>)
    }
    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title='airbnbHome'
            body={bodyCentent}
        />

    )
}

export default RentModal
