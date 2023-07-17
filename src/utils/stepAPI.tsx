import axios from "axios"


const url: string = "https://advance-production.onrender.com/api/v1/step"

export const createStep = async (id: string, data: any) => {
    try {
        return await axios.post(`${url}/${id}/create-step`, data).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteStep = async (id: string,) => {
    try {
        return await axios.delete(`${url}/${id}/delete-step`,).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}


export const readStep = async (id: string) => {
    try {
        return await axios.get(`${url}/${id}/view-step`).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}