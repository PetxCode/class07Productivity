import axios from "axios"


const url: string = "https://advance-production.onrender.com/api/v1/task"

export const createTask = async (id: string, data: any) => {
    try {
        return await axios.post(`${url}/${id}/create-task`, data).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (id: string,) => {
    try {
        return await axios.delete(`${url}/${id}/delete-task`,).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateStepTask = async (id: string, data: any) => {
    try {
        return await axios.patch(`${url}/${id}/update-task-step`, data).then((res: any) => {
            console.log("reading: ", res)
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}


export const readTask = async () => {
    try {
        return await axios.get(`${url}/view-tasks`).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}