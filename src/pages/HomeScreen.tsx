import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import MyColumnCard from '../components/static/MyColumnCard'
import { readTask } from '../utils/taskAPI'
import { useQuery } from "@tanstack/react-query"
import { readProgress } from '../utils/progressAPI'
import { readDone } from '../utils/doneApi'



const HomeScreen = () => {

    // const [state, setState] = useState<any>([])

    // useEffect(() => {
    //     readTask().then((res: any) => {
    //         setState(res)
    //     })
    // }, [])

    const { data } = useQuery({
        queryKey: ["tasks"],
        queryFn: readTask,
        refetchInterval: 1000
    })

    const { data: progress } = useQuery({
        queryKey: ["progress"],
        queryFn: readProgress,
        refetchInterval: 1000
    })

    const { data: done } = useQuery({
        queryKey: ["done"],
        queryFn: readDone,
        refetchInterval: 1000
    })



    return (
        <div>
            <Container>
                <Main>
                    <MyColumnCard
                        title="task"
                        icon
                        but
                        data={data}
                    />
                    <MyColumnCard
                        title="progress"
                        data={progress}

                    />
                    <MyColumnCard
                        title="Done"
                        data={done}

                    />
                </Main>
            </Container>
        </div>
    )
}

export default HomeScreen

const Main = styled.div`
display:flex;
justify-content: center;
width: 100%;
`

const Container = styled.div`
display:flex;
justify-content: center;
width: 100%;
padding-top: 50px
`
