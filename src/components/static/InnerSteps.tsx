import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { deleteStep, readStep } from '../../utils/stepAPI'
import { useQuery } from '@tanstack/react-query'
import { readOneProgress } from '../../utils/progressAPI'
import { createDone, deleteProgressStep } from '../../utils/doneApi'

interface iID {
    id?: string
    props?: any
}

const InnerSteps: React.FC<iID> = ({ id, props }) => {

    // const [state, setState] = useState<any>([])


    // useEffect(() => {
    //     readStep(id!).then((res: any) => {

    //         setState(res)
    //     })
    // }, [])
    // console.log("we are reading steps: ", state)

    const { data } = useQuery({
        queryKey: ['steps', { id: id }],
        queryFn: () => readStep(id!),
        refetchInterval: 1000
    })

    const { data: progressStep } = useQuery({
        queryKey: ['progressStep', { id: id }],
        queryFn: () => readOneProgress(id!),
        refetchInterval: 1000
    })


    return (
        <div>
            {
                progressStep ? <div>
                    {
                        progressStep?.step?.map((props: any) => (
                            <MyCard key={props._id}>
                                <Card bg="#ebdbe1">
                                    <Holder>
                                        <Avatar src={props.assignedAvatar} />
                                        <Name>
                                            <TaskName>{props.assignedTask}</TaskName>
                                            <UserName>{props.assignedName}</UserName>

                                        </Name>
                                    </Holder>
                                    <ButtonHolder>
                                        <Button bg="dodgerblue"
                                            onClick={() => {
                                                createDone(props)
                                                    .then(() => {
                                                        deleteProgressStep(id!, props._id)
                                                    })
                                            }}
                                        >Done</Button>
                                    </ButtonHolder>
                                </Card>
                            </MyCard>
                        ))
                    }
                </div> :
                    data ? <div>
                        {
                            data?.step?.map((props: any) => (
                                <MyCard key={props._id}>
                                    <Card bg="#ebdbe1">
                                        <Holder>
                                            <Avatar src={props.assignedAvatar} />
                                            <Name>
                                                <TaskName>{props.assignedTask}</TaskName>
                                                <UserName>{props.assignedName}</UserName>

                                            </Name>
                                        </Holder>
                                        {/* <ButtonHolder>
        <Button bg="purple" >step</Button>
        <Button bg="dodgerblue" >Start</Button>
        <Button bg="#720a34" >Delete</Button>
    </ButtonHolder> */}
                                    </Card>
                                </MyCard>
                            ))
                        }
                    </div> : null
            }
        </div>
    )
}

export default InnerSteps


const ButtonHolder = styled.div``

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


`


const UserName = styled.div`
font-size: 8px;
font-weight: 600
`

const TaskName = styled.div`
font-size: 12px;
width: 160px;
word-wrap: break-word;
`

const Name = styled.div`
margin-left: 5px;
`

const Avatar = styled.img`
width: 35px;
height: 35px;
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
width: ${({ w }) => w ? "97%" : "90%"};
min-height: 50px;
border: 1px solid #a49aa4;
border-radius: 5px;
background-color: ${({ bg }) => bg} ;
color: #1c001c;
display:flex;
/* align-items:center ; */
padding: 5px ;
justify-content: space-between;
margin: 1px 0;
`


const MyCard = styled.div`
display:flex;
justify-content: flex-end;
`