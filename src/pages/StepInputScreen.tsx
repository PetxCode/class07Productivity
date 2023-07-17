import React from 'react'
import { styled } from 'styled-components'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { createTask, updateStepTask } from '../utils/taskAPI'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { changeToggleToFalse } from '../global/globalState'
import { createStep } from '../utils/stepAPI'
import { readOneUser } from '../utils/authAPI'
import Swal from "sweetalert2"

interface iProps {
    id?: string
    props?: any
}

const StepInputScreen: React.FC<iProps> = ({ id, props }) => {



    const dispatch = useDispatch()

    const query = useQueryClient()
    const user: any = useSelector((state: any) => state.user)

    const schema = yup.object({
        assignedName: yup.string().required(),
        assignedTask: yup.string().required(),
        assignedPriority: yup.string().required(),
    })

    const { data } = useQuery({
        queryKey: ["user"],
        queryFn: () => readOneUser(user)
    })


    console.log("you are reading props info: ", data?.userName === props?.name)
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset } = useForm({
            resolver: yupResolver(schema)
        })

    const mutate = useMutation({
        mutationKey: ['steps'],
        mutationFn: (data) => createStep(id!, data),
        onSuccess: (() => {
            query.invalidateQueries({ queryKey: ["steps"] })
        })
    })

    const onSubmit = handleSubmit(async (res: any) => {
        if (data?.userName === props?.name) {
            mutate.mutate(res)

        } else {
            Swal.fire({
                icon: "error",
                title: "You can't do this",
                timer: 3000,
                position: 'center',
                showCancelButton: false

            }).then(() => {
                updateStepTask(id!, { stepToggle: false })
            })
        }

        // mutate.mutate(res)
        // console.log("Adding Task ")
        // updateStepTask(id!, { stepToggle: false })
        console.log(res)


    })

    return (
        <div>
            <Card onSubmit={onSubmit} >
                <InputHolder>
                    <InputText>Assign Name</InputText>
                    <Input placeholder="assign Name"
                        {...register("assignedName")}
                    />
                    {errors.assignedName && <Error>Task Error</Error>}
                </InputHolder>
                <InputHolder>
                    <InputText>Assign Task</InputText>
                    <Input placeholder="assign Task"
                        {...register("assignedTask")}
                    />
                    {errors.assignedTask && <Error>Task Error</Error>}
                </InputHolder>
                <InputHolder>
                    <InputText>Assign Priority</InputText>
                    <Input placeholder="assign Priority"
                        {...register("assignedPriority")}
                    />
                    {errors.assignedPriority && <Error>Priority Error</Error>}
                </InputHolder>

                <Button type="submit" >Add This Step</Button>
            </Card>

        </div>
    )
}

export default StepInputScreen

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
