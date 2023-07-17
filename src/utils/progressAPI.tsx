import React from 'react'

import axios from "axios";

const progressUrl: string = "https://advance-production.onrender.com/api/v1/progress"

export const createProgress = async (data: any) => {
    try {
        return await axios.post(`${progressUrl}/create-progress`, data).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error);

    }
}

export const readProgress = async () => {
    try {
        return await axios.get(`${progressUrl}/view-progress`).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const readOneProgress = async (id: string) => {
    try {
        return await axios.get(`${progressUrl}/${id}/view-progress-info`).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteOneProgress = async (id: string) => {
    try {
        return await axios.delete(`${progressUrl}/${id}/delete-progress`).then((res: any) => {
            return res.data.data
        })
    } catch (error) {
        console.log(error)
    }
}

