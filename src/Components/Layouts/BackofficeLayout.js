import HeaderBackoffice from '../CommonComponents/HeaderBackoffice';
import { Switch } from 'react-router-dom';

const BackofficeLayout = ({ children }) => {
  return (
    <HeaderBackoffice>
      <div style={{ minHeight: '58vh' }}>
        <Switch>{children}</Switch>
      </div>
    </HeaderBackoffice>
  );
};
////MERGE TESTTTTTTT

export default BackofficeLayout;
