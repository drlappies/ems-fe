import Router from "./Router";
import { store, history } from './redux/store'
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import { Provider } from 'react-redux';
import DrawerProvider from './contexts/DrawerContext';

function App() {
  return (
    <Provider store={store}>
      <ReduxRouter history={history}>
        <DrawerProvider>
          <Router />
        </DrawerProvider>
      </ReduxRouter>
    </Provider>
  );
}

export default App;