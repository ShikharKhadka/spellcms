import React from 'react'
import { useForm } from 'react-hook-form'
import { Inputs } from '../component/login/interface'

const useInput = <T,>() => {
    const {
        register,
        handleSubmit,
        watch<T>,
        formState: { errors },
    } = useForm<T>()
    return { register, handleSubmit, watch, errors };
}

export default useInput

