import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';

import SettingScene from './components/setting';
import MainScene from './components/main';

import { transitionChanged } from './actions';

class RouterComponent extends Component {
    configureScene() {
        if (typeof this.props.transition === 'function') {
            return Navigator.SceneConfigs[this.props.transition()];
        }

        return Navigator.SceneConfigs[this.props.transition];
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'main':
            default:
                return <MainScene navigator={navigator} route={route} />;
            case 'setting':
                return <SettingScene navigator={navigator} route={route} />;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ id: 'main' }}
                renderScene={this.renderScene.bind(this)}
                configureScene={this.configureScene.bind(this)}
            />
        );
    }
}

const mapStateToProps = state => {
    const { transition } = state.settings;

    return { transition };
};

export default connect(mapStateToProps, { transitionChanged })(RouterComponent);
