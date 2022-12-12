import { RouteComponent } from "./route"
import { BrowserRouter } from "react-router-dom"
import { Header } from "./components/Header"

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex flex-1">
          <RouteComponent />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App



