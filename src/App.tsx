import { Provider } from "react-redux"
import { persistor, store } from "./redux/store/store"
import { PersistGate } from "redux-persist/integration/react"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
