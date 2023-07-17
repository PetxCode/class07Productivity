import { styled } from "styled-components"
import { BiSolidAlarmAdd } from "react-icons/bi"
import { useState, useEffect } from "react";
import InputScreen from "../../pages/InputScreen";
import { useSelector, useDispatch } from "react-redux";
import { changeStepToggleToFalse, changeStepToggleToTrue, changeToggleToFalse, changeToggleToTrue } from "../../global/globalState";
import { readTask, updateStepTask, deleteTask } from "../../utils/taskAPI";
import InnerSteps from "./InnerSteps";
import { createStep } from "../../utils/stepAPI";
import StepInputScreen from "../../pages/StepInputScreen";
import { createProgress } from "../../utils/progressAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readOneUser } from "../../utils/authAPI";
import Swal from "sweetalert2";
import moment from "moment"


export interface iCard {
    title?: string;
    icon?: boolean;
    but?: boolean;
    data?: [];
}

const MyColumnCard: React.FC<iCard> = ({ title, icon, data, but }) => {
    const toggle = useSelector((state: any) => state.toggle)
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const client = useQueryClient();

    const todoTask = (x1: any, x2: string) => {
        createProgress(x1)
        deleteTask(x2)
    }

    const mutation = useMutation({
        mutationKey: ["progress"],
        mutationFn: (res: any) => createProgress(res),
        onSuccess: (() => {
            client.invalidateQueries()
        })
    })



    const { data: myUser } = useQuery({
        queryKey: ['users'],
        queryFn: () => readOneUser(user)
    })


    return <CardColumn>
        <Title>
            <span>{title}</span>
            {icon && <div>
                {
                    toggle ? <Icon
                        onClick={() => {
                            dispatch(changeToggleToFalse())
                        }}
                    /> : <Icon
                        onClick={() => {
                            dispatch(changeToggleToTrue())
                        }}
                    />
                }
            </div>

            }
        </Title>
        {
            (icon && toggle) && <InputScreen />
        }

        {
            data?.map((props: any) => (
                <div key={props._id}>

                    <Card bg="#fbe7fb" w="o">
                        <Holder>
                            <Avatar src={props.avatar ? props.avatar : props.assignedAvatar} />
                            <Name>
                                <TaskName>{props.task ? props.task : props.assignedTask}</TaskName>
                                <UserName>{props.name ? props.name : props.assignedName}</UserName>
                                <Space />
                                <Div>{props.assignedName && <span > Finished at : {moment(props.createAt).format("LLL")} </span>}
                                </Div>

                            </Name>
                        </Holder>
                        {
                            but && <ButtonHolder>
                                {
                                    props.stepToggle ? <Button bg="purple"
                                        onClick={() => {
                                            updateStepTask(props._id, { stepToggle: false })
                                        }}
                                    >step</Button> : <Button bg="purple"
                                        onClick={() => {
                                            updateStepTask(props._id, { stepToggle: true })
                                        }}
                                    >step</Button>
                                }
                                <Button bg="dodgerblue"
                                    onClick={() => {
                                        if (props.name === myUser.userName) {
                                            // todoTask(props, props._id)
                                            mutation.mutate(props)
                                            deleteTask(props._id)
                                        } else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Not Authorized",
                                                timerProgressBar: true,
                                                timer: 3000
                                            })
                                        }

                                    }}
                                >Start</Button>
                                <Button bg="#720a34">Delete</Button>
                            </ButtonHolder>
                        }
                    </Card>

                    <InnerSteps id={props._id} props={props} />

                    {
                        props.stepToggle && <StepInputScreen id={props._id} props={props} />
                    }

                </div>
            ))
        }

    </CardColumn>
}

export default MyColumnCard;
const Div = styled.div`
font-size: 10px;
font-weight: 600
`

const Space = styled.div`
    flex: 1

`
const Button = styled.div<{ bg?: string }>`
width: 50px;
height: 30px;
margin: 5px 0;
display:flex;
justify-content: center;
align-items: center;
background-color: ${({ bg }) => bg};
font-size: 12px;
border-radius: 3px;
color: white;
cursor: pointer;

`

const MyCard = styled.div`
display:flex;
justify-content: flex-end;
`

const ButtonHolder = styled.div`

`

const UserName = styled.div`
font-size: 10px;
font-weight: 600
`

const TaskName = styled.div`
font-size: 14px;
width: 160px;
word-wrap: break-word;
`

const Name = styled.div`
margin-left: 5px;
display: flex;
flex-direction: column;

`

const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
border: 1px solid #1c001c;
object-fit: cover
`

const Holder = styled.div`
display:flex;
margin-top: 5px
/* align-items: center */
`

const Card = styled.div<{ bg?: string, w?: string }>`
width: ${({ w }) => w ? "97%" : "85%"};
min-height: 80px;
border: 1px solid #a49aa4;
border-radius: 5px;
background-color: ${({ bg }) => bg} ;
color: #1c001c;
display:flex;
/* align-items:center ; */
padding: 5px ;
justify-content: space-between;
margin: 5px 0;
`

const Icon = styled(BiSolidAlarmAdd)`
font-size: 25px;
color: #340134
`

const Title = styled.div`
margin: 10px 0;
display:flex;
align-items: center;
justify-content: space-between;

span{
    font-weight: 600;
    text-transform: capitalize
}
`

const CardColumn = styled.div`
border: 1px solid silver;
width: 280px;
min-height: 300px;
border-radius: 5px;
padding: 10px;
margin: 0 5px;
`
