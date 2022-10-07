import * as Interface from '../../interfaces/interfaces'
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { changeDisplay } from '../display/displaySlice';
import { createUser } from './userSlice';
import SignUpForm from '../../components/SignUpForm';

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();

  const handleDisplay: Interface.HandleDisplay = (event, display) => {
    event.preventDefault();
    if (display === 'signup') {
      dispatch(changeDisplay('signup'))
    } else if (display === 'login') {
      dispatch(changeDisplay('login'))
    }
  }

  const handleSignUp: Interface.HandleSignUp = (event) => {
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
