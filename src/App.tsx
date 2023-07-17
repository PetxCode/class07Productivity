import React from 'react'
import { RouterProvider } from "react-router-dom"
import { mainRouter } from './router/mainRouter'
import { store } from './global/store'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
let persistor = persistStore(store)

let client = new QueryClient()

const App = () => {
  return (
    <div>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={client} >
            <RouterProvider router={mainRouter} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App