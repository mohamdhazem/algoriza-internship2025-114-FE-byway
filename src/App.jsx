import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserLogin } from './pages/user/UserLogin'
import { AdminLogin } from './pages/admin/AdminLogin'
import { SignUp } from './pages/user/SignUp'
import { Dashboard } from './pages/admin/Dashboard'
import { Instructors } from './pages/admin/Instructors'
import { Courses } from './pages/admin/Courses'
import { AddCourse } from './pages/admin/AddCourse'
import { EditCourse } from './pages/admin/EditCourse'
import { ViewCourse } from './pages/admin/ViewCourse'
import ProtectedRoute from './ProtectedRoute'
import { Landing } from './pages/user/Landing'
import { UserCourses } from './pages/user/UserCourses'
import { CourseDetails } from './pages/user/CourseDetails'
import ScrollToTop from './helpers/ScrollToTop'
import { ShoppingCart } from './pages/user/ShoppingCart'
import { Checkout } from './pages/user/Checkout'
import { CompletedOrder } from './pages/user/CompletedOrder'
import { AuthCallback } from './components/user/login/Auth-Callback'


function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/AdminLogin" element={<AdminLogin></AdminLogin>}></Route>
          <Route path="/UserLogin" element={<UserLogin></UserLogin>}></Route>
          <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
          <Route path="/Landing" element={<Landing></Landing>}></Route>
          <Route path="/*" element={<Landing></Landing>}></Route>
          <Route path="/UserCourses" element={<UserCourses></UserCourses>}></Route>
          <Route path="/CourseDetails/:id" element={<CourseDetails></CourseDetails>}></Route>

          <Route path="/auth-callback" element={<AuthCallback></AuthCallback>}></Route>

          <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
            <Route path="/Cart" element={<ShoppingCart></ShoppingCart>}></Route>
            <Route path="/Checkout" element={<Checkout></Checkout>}></Route>
            <Route path="/PurchaseComplete" element={<CompletedOrder></CompletedOrder>}></Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/Instructors" element={<Instructors></Instructors>}></Route>
            <Route path="/Courses" element={<Courses></Courses>}></Route>
            <Route path="/Courses/Add" element={<AddCourse></AddCourse>}></Route>
            <Route path="/Courses/:id/Edit" element={<EditCourse></EditCourse>}></Route>
            <Route path="/Courses/:id/View" element={<ViewCourse></ViewCourse>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
