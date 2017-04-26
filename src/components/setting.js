import React, { Component } from 'react';
import { View, Picker, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { Icon, Card, Grid, Row, Col, Text } from 'react-native-elements';

import { Header } from './common';
import { settingChanged } from '../actions';
import { currencySymbols, currencies, getCurrencySymbol } from '../data/currency';

const settings = [
    'PushFromRight',
    'FloatFromRight',
    'FloatFromLeft',
    'FloatFromBottom',
    'FloatFromBottomAndroid',
    'FadeAndroid',
    'SwipeFromLeft',
    'HorizontalSwipeJump',
    'HorizontalSwipeJumpFromRight',
    'HorizontalSwipeJumpFromLeft',
    'VerticalUpSwipeJump',
    'VerticalDownSwipeJump'
];

const styles = {
    fontStyle: {
        fontSize: 18,
        color: '#546a79'
    },
    colStyle: {
        height: 35,
        justifyContent: 'center'
    },
    gridStyle: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    rowStyle: {
        paddingTop: 15,
        paddingBottom: 15
    }
}

class SettingScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: this.props.position,
            transition: this.props.transition,
            thousandsSeperator: this.props.thousandsSeperator,
            decimalSeperator: this.props.decimalSeperator
        }
        this.renderPickerItems = this.renderPickerItems.bind(this);
        this.onTransitionChange = this.onTransitionChange.bind(this);
    }

    updateStorage(state) {
        this.props.settingChanged(state)
    }

    onTransitionChange(type) {
        this.setState({
            transition: type
        });
        this.updateStorage({...this.state, transition: type});
    }

    onPositionChange(position) {
        this.setState({
            position: position
        });
        this.updateStorage({...this.state, position: position});
    }

    onCurrencyChange(currency) {
        this.setState({
            currency: currency
        });
        this.updateStorage({...this.state, currency: currency});
    }

    renderPickerItems(items) {
        if (Object.prototype.toString.call(items) === '[object Array]') {
            return items.map(item => <Picker.Item label={item} value={item} key={item} /> );
        } else {
            return Object.keys(items).map(item => {
                title = items[item] + ' (' + getCurrencySymbol(item) + ')';
                return <Picker.Item label={title} value={item} key={item} />;
            })
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#f3f3f3', flex: 1 }}>
                <NavigationBar
                    style={{ backgroundColor: '#546a79', height: 60 }}
                    title={{
                        title: 'Settings',
                        style: {
                            color: 'white'
                        }
                    }}
                    leftButton={{
                        tintColor: 'white',
                        title: 'Back',
                        handler: () => {this.props.navigator.pop()}
                    }}
                />

                <ScrollView>
                    <Grid containerStyle={styles.gridStyle}>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Transition</Text>
                            </Col>
                            <Col size={60} containerStyle={styles.colStyle}>
                                <Picker
                                    selectedValue={this.props.transition}
                                    onValueChange={this.onTransitionChange.bind(this)}
                                >
                                    {this.renderPickerItems(settings)}
                                </Picker>
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Position</Text>
                            </Col>
                            <Col size={60} containerStyle={styles.colStyle}>
                                <Picker
                                    selectedValue={this.props.position}
                                    onValueChange={this.onPositionChange.bind(this)}
                                >
                                    <Picker.Item label="Before $10" value="before" />
                                    <Picker.Item label="After 10$" value="after" />
                                </Picker>
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Position</Text>
                            </Col>
                            <Col size={60} containerStyle={styles.colStyle}>
                                <Picker
                                    selectedValue={this.props.currency}
                                    onValueChange={this.onCurrencyChange.bind(this)}
                                >
                                    {this.renderPickerItems(currencies)}
                                </Picker>
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => {
    let { transition, position, currency } = state.settings;

    if (typeof transition === 'function' ) {
        transition = transition();
    }

    return { transition, position, currency };
};

export default connect(mapStateToProps, { settingChanged })(SettingScene);
