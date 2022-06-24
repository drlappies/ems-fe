import Router from "./Router";
import { store, history } from './redux/store'
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <ReduxRouter history={history}>
        <Router />
      </ReduxRouter>
    </Provider>
  );
}

export default App;