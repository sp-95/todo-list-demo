import TaskContainer from "./components/TaskContainer"
import store from "./redux/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <TaskContainer />
    </Provider>
  )
}

export default App
