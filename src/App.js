import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import ApplicationNavigator from './pages';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ApplicationNavigator />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
