import React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {

    if (!this.props.userStore.isLoggedIn) {
      browserHistory.replace("/");
    }
  }

  render() {
    if (this.props.userStore.isLoggedIn) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

EnsureLoggedInContainer.propTypes = {
  userStore: React.PropTypes.object,
  children: React.PropTypes.object
};

export default inject('userStore')(observer(EnsureLoggedInContainer));
