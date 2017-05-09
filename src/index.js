import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import App from './components/App';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import OrderDetails from './components/OrderDetails';
import ReviewOrder from './components/ReviewOrder';
import { Provider } from 'mobx-react';
import UserStore from './stores/UserStore';
import OrderStore from './stores/OrderStore';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';
import EntryPage from './components/EntryPage';
const orderStore = new OrderStore();
const userStore = new UserStore();

render((
  <Provider userStore={userStore} orderStore={orderStore}>
    <Router history={browserHistory}>
    <Route path="/" component={EntryPage}/>
      <Route component={EnsureLoggedInContainer}>
        <Route path="/home" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/orderdetails" component={OrderDetails}/>
          <Route path="/revieworder" component={ReviewOrder}/>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
