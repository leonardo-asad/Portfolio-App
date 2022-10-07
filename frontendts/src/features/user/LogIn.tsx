import * as Types from '../../types/types'
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { changeDisplay } from '../display/displaySlice';
import { authenticateUser } from './userSlice';
import LogInForm from '../../components/LogInForm';

export default function LogIn() {
  const dispatch = useDispatch<AppDispatch>();

  const handleDisplay: Types.HandleDisplay = (event, display) => {
    event.preventDefault();
    if (display === 'signup') {
      dispatch(changeDisplay('signup'))
    } else if (display === 'login') {
      dispatch(changeDisplay('login'))
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
