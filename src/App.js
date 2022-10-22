
import AppRoutes from './components/AppRoutes';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import RestaurantContextProvider from './context/RestaurantContext';


Amplify.configure(awsconfig);


function App() {
  return (
    <RestaurantContextProvider>
      <AppRoutes />
    </RestaurantContextProvider>
  );
}

export default withAuthenticator(App);
