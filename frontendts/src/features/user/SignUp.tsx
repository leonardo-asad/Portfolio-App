import * as Types from '../../types/types'
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { createUser } from './userSlice';
import SignUpForm from '../../components/SignUpForm';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
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

  const handleSignUp: Types.HandleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');

    if (
      typeof username === 'string' &&
      typeof password === 'string' &&
      (typeof email === 'string' || typeof email === 'undefined')
      ) {
        dispatch(createUser({
          username: username,
          email: email,
          password: password
        }))
      }
  };

  return (
    <SignUpForm
    handleSignUp={handleSignUp}
    handleDisplay={handleDisplay}
    />
  )
}
