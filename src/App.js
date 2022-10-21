
import AppRoutes from './components/AppRoutes';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';


Amplify.configure(awsconfig);


function App() {
  return (
    <AppRoutes />
  );
}

export default withAuthenticator(App);
