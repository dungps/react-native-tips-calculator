import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RouterWithRedux from './router';
import configureStore from './store';

const store = (module.hot && module.hot.data && module.hot.data.store)
    ? module.hot.data.store
    : configureStore();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            store: (module.hot && module.hot.data && module.hot.data.store)
                ? module.hot.data.store
                : configureStore(() => {this.setState({ loading: false })})
        };
    }
    render() {
        if (this.state.loading) {
            return null;
        }
        
        return (
            <Provider store={this.state.store}>
                <RouterWithRedux />
            </Provider>
        );
    }
}

export default App;
