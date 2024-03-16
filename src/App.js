import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/signin/signin.component'
import Register from './routes/register/register.component'
import Profile from './routes/profile/profile.component'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='register' element={<Register />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App
