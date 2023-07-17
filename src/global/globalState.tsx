import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toggle: false,
    stepToggle: false,
    user: "" || null,
}

const globalState = createSlice({
    name: "second",
    initialState,
    reducers: {
        changeToggleToTrue: (state: any) => {
            state.toggle = true
        },
        changeToggleToFalse: (state: any) => {
            state.toggle = false
        },
        changeStepToggleToTrue: (state: any) => {
            state.stepToggle = true
        },
        changeStepToggleToFalse: (state: any) => {
            state.stepToggle = false
        },
        signUserGlobal: (state: any, { payload }: any) => {
            state.user = payload
        },
        logOut: (state: any,) => {
            state.user = null
        },
    }
});

export const { changeStepToggleToFalse, changeStepToggleToTrue, changeToggleToFalse, changeToggleToTrue, signUserGlobal, logOut } = globalState.actions

export default globalState.reducer