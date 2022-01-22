import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const token = localStorage.getItem('token');

  if (token === '1' || !token) return <Redirect to="/" />;

  return <Route {...props} />;
};

export default PrivateRoute;
