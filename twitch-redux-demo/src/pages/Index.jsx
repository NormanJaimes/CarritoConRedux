import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { setUser } from '../reducers/user/userSlice';

function Index() {
  const emailField = useRef(null);
  const passwordField = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get('http://localhost:3000/users').then((response) => {
      const users = response.data;
      const userToLog = users.find(
        (user) => user.email === emailField.current.value
      );

      console.log(userToLog);

      if (userToLog) {
        if (userToLog.password === passwordField.current.value) {
          console.log('Credenciales válidas');
          dispatch(
            setUser({
              email: userToLog.email,
              fullName: `${userToLog.first_name} ${userToLog.last_name}`,
              token: Date.now(),
            })
          );
          navigate('/home');
        }
      }
    });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="mb-4">LOGIN FORM</div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Email Addres
            </label>
            <input type="email" className="form-control" ref={emailField} />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              ref={passwordField}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {' '}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
