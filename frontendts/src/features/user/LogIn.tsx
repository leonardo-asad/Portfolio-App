import * as Types from '../../types/types'
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { authenticateUser } from './userSlice';
import LogInForm from '../../components/LogInForm';
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDisplay: Types.HandleDisplay = (event, display) => {
    event.preventDefault();
    if (display === 'signup') {
      navigate("/signup")
    } else if (display === 'login') {
      navigate("/login")
    }
  }

  const handleSignIn: Types.HandleSignIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username')
    const password = formData.get('password')

    if (typeof username === 'string' && typeof password === 'string') {
      dispatch(authenticateUser({
        username: username,
        password: password
      }))
    }
  };

  return (
    <LogInForm
    handleSignIn={handleSignIn}
    handleDisplay={handleDisplay}
    />
  )
}
