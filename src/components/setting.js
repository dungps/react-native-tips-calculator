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
        justifyContent: 'center',
        flex: 1
    },
    gridStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },
    rowStyle: {
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1
    }
}

class SettingScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: this.props.position,
            transition: this.props.transition,
            thousandsSeperator: this.props.thousandsSeperator,
            decimalSeperator: this.props.decimalSeperator,
            percentage: this.props.percentage
        }
        this.renderPickerItems = this.renderPickerItems.bind(this);
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

    onPercentChange(type, value) {
        const { value1, value2, value3 } = this.refs;
        let percentage = [value1.props.value, value2.props.value, value3.props.value];

        switch (type) {
            case 'value1':
                percentage[0] = value;
                break;
            case 'value2':
                percentage[1] = value;
                break;
            case 'value3':
                percentage[2] = value;
                break;
        }

        this.setState({
            percentage: percentage
        })
        this.updateStorage({...this.state, percentage: percentage});
    }
    
    onBackPress() {
        this.props.navigator.push({ id: "main" });
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
        const { percentage, transition, position, currency } = this.props;
    
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
                        handler: this.onBackPress.bind(this)
                    }}
                />

                <ScrollView style={{ flex: 1 }}>
                    <Grid containerStyle={styles.gridStyle}>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Transition</Text>
                            </Col>
                            <Col size={60} containerStyle={styles.colStyle}>
                                <Picker
                                    selectedValue={transition}
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
                                    selectedValue={position}
                                    onValueChange={this.onPositionChange.bind(this)}
                                >
                                    <Picker.Item label="Before $10" value="before" />
                                    <Picker.Item label="After 10$" value="after" />
                                </Picker>
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Currency</Text>
                            </Col>
                            <Col size={60} containerStyle={styles.colStyle}>
                                <Picker
                                    selectedValue={currency}
                                    onValueChange={this.onCurrencyChange.bind(this)}
                                >
                                    {this.renderPickerItems(currencies)}
                                </Picker>
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Percentage Value 1</Text>
                            </Col>
                            <Col size={60} containerStyle={[styles.colStyle, { height: 40 }]}>
                                <TextInput
                                    ref="value1"
                                    keyboardType="numeric"
                                    value={percentage[0]}
                                    onChangeText={this.onPercentChange.bind(this, 'value1')}
                                />
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Percentage Value 2</Text>
                            </Col>
                            <Col size={60} containerStyle={[styles.colStyle, { height: 40 }]}>
                                <TextInput
                                    ref="value2"
                                    keyboardType="numeric"
                                    value={percentage[1]}
                                    onChangeText={this.onPercentChange.bind(this, 'value2')}
                                />
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={styles.fontStyle}>Percentage Value 3</Text>
                            </Col>
                            <Col size={60} containerStyle={[styles.colStyle, { height: 40 }]}>
                                <TextInput
                                    ref="value3"
                                    keyboardType="numeric"
                                    value={percentage[2]}
                                    onChangeText={this.onPercentChange.bind(this, 'value3')}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => {
    let { transition, position, currency, percentage } = state.settings;

    if (typeof transition === 'function' ) {
        transition = transition();
    }

    return { transition, position, currency, percentage };
};

export default connect(mapStateToProps, { settingChanged })(SettingScene);
