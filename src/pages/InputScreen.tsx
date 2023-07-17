import React from 'react'
import { styled } from 'styled-components'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { createTask } from '../utils/taskAPI'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeToggleToFalse } from '../global/globalState'

const InputScreen = () => {
    const dispatch = useDispatch()
    const query = useQueryClient()
    const user: any = useSelector((state: any) => state.user)
    const schema = yup.object({
        task: yup.string().required(),
        priority: yup.string().required(),
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset } = useForm({
            resolver: yupResolver(schema)
        })

    const mutate = useMutation({
        mutationKey: ['tasks'],
        mutationFn: (data) => createTask(user, data),
        onSuccess: (() => {
            query.invalidateQueries({ queryKey: ["tasks"] })
        })
    })

    const onSubmit = handleSubmit(async (res: any) => {
        // createTask(user, res)
        mutate.mutate(res)
        dispatch(changeToggleToFalse())
        console.log("Adding Task ")
    })

    return (
        <div>
            <Card onSubmit={onSubmit} >
                <InputHolder>
                    <InputText>Task</InputText>
                    <Input placeholder="Task"
                        {...register("task")}
                    />
                    {errors.task && <Error>Task Error</Error>}
                </InputHolder>
                <InputHolder>
                    <InputText>Priority</InputText>
                    <Input placeholder="Priority"
                        {...register("priority")}
                    />
                    {errors.priority && <Error>Priority Error</Error>}
                </InputHolder>

                <Button type="submit" >Add Task</Button>
            </Card>

        </div>
    )
}

export default InputScreen

const Card = styled.form``

const Button = styled.button<{ bg?: string }>`
width: 99%;
height: 40px;
justify-content: center;
align-items: center;
display:flex;
background-color: ${({ bg }) => bg ? "#590059" : "dodgerblue"};

color: white;
border-radius: 3px;
cursor: pointer;
border: 0;
outline: none;
font-family: Poppins;
font-size: 15px;
margin-top: 20px;

`

const Error = styled.div`
font-size: 12px;
color: #c9016c;
text-align: right;
`

const Input = styled.input`
outline: none;
border: 1px solid silver;
border-radius: 3px;
height: 30px;
width: 97%;
padding-left: 5px
`

const InputText = styled.div`
font-size: 13px;
`

const InputHolder = styled.div`
margin: 10px 0;
`
