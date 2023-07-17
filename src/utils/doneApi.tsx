import axios from "axios"

const URL: string = "https://advance-production.onrender.com/api/v1/done"

export const createDone = async (data: any) => {
    try {
        return await axios.post(`${URL}/done-task`, data).then((res) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const readDone = async () => {
    try {
        return await axios.get(`${URL}/read`).then((res) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteProgressStep = async (progressID: string, progressStepID: string) => {
    try {
        return await axios.delete(`${URL}/${progressID}/${progressStepID}/delete-progress-step`).then((res) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}
