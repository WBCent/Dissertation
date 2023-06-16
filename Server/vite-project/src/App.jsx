import './App.css'
import Form from './Pages/Form/Form';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {path: '/', element: <RootLayout />, errorElement: <ErrorPage />, children: [
    {path: 'Form', element: <Form />},
    {path: 'QuestionSubmitted', element: <QuestionSubmitted />} 

  ]}
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
