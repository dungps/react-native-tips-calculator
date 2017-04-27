import React, { Component } from 'react';
import { View, TextInput, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { Icon, Slider, Card, Grid, Row, Col, ButtonGroup, Text, Divider } from 'react-native-elements';

import { Header } from './common';
import { amountChanged, percentChanged, noOfPeopleChanged } from '../actions';
import { getCurrencySymbol } from '../data/currency';

const styles = {
    gridStyle: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    rowStyle: {
        paddingTop: 15,
        paddingBottom: 15
    },
    colStyle: {
        height: 35,
        justifyContent: 'center'
    },
    inputStyle: {
        borderWidth: 1,
        color: '#546a79'
    },
    textStyle: {
        color: '#546a79'
    }
};

function number_format(number, decimals, decPoint, thousandsSep){
    decimals = decimals || 0;
	number = parseFloat(number);

	if(!decPoint || !thousandsSep){
		decPoint = '.';
		thousandsSep = ',';
	}

	var roundedNumber = Math.round( Math.abs( number ) * ('1e' + decimals) ) + '';
	// add zeros to decimalString if number of decimals indicates it
	roundedNumber = (1 > number && -1 < number && roundedNumber.length <= decimals)
		      ? Array(decimals - roundedNumber.length + 1).join("0") + roundedNumber
		      : roundedNumber;
	var numbersString = decimals ? roundedNumber.slice(0, decimals * -1) : roundedNumber.slice(0);
	var checknull = parseInt(numbersString) || 0;
  
	// check if the value is less than one to prepend a 0
	numbersString = (checknull == 0) ? "0": numbersString;
	var decimalsString = decimals ? roundedNumber.slice(decimals * -1) : '';
	
	var formattedNumber = "";
	while(numbersString.length > 3){
		formattedNumber = thousandsSep + numbersString.slice(-3) + formattedNumber;
		numbersString = numbersString.slice(0,-3);
	}

	return (number < 0 ? '-' : '') + numbersString + formattedNumber + (decimalsString ? (decPoint + decimalsString) : '');
}

function formatAmount(context, settings) {
    const { position, currency } = settings;
    const decimalSeperator = ".";
    const thousandsSeperator = ",";

    if (typeof context == 'number') {
        context = context + "";
    }
    if (context == 0 || typeof context == 'undefined') {
        context = 0;    
    } else {
        const sepfound = context.indexOf(decimalSeperator);
        if (decimalSeperator === ',' && false !== sepfound) {
            let whole = context.substr(0, sepfound);
            let path = context.substr( sepfound + 1, context.length );
            context = whole + '.' + path;
        }

        const found = context.indexOf(thousandsSeperator);

        if (thousandsSeperator === ',' && false !== found) {
            context.replace(',', '');
        }

        if (thousandsSeperator === ' ' && false !== found) {
            context.replace(' ', '');
        }
    }

    let numberFormat = number_format(context, 2,decimalSeperator, thousandsSeperator);

    switch (position) {
        case 'after':
            return numberFormat + getCurrencySymbol(currency);
        case 'before':
        default:
            return getCurrencySymbol(currency) + numberFormat;
    }
}

class MainScene extends Component {
    onAmountChange(text) {
        this.props.amountChanged(text);
    }

    onPercentChange(key) {
        this.props.percentChanged(key);
    }

    onPeopleChange(no) {
        this.props.noOfPeopleChanged(no);
    }

    onSettingPress() {
        this.props.navigator.push({ id: 'setting' });
        Keyboard.dismiss();
    }

    render() {
        let { percent, amount, NoOfPeople, amountPerPeople, result, settings } = this.props;
        const percentage = settings.percentage.map(item => {
            return item + '%';
        })
        amountPerPeople = formatAmount(amountPerPeople, settings);
        result = formatAmount(result, settings);
        percent = parseInt(percent, 0);
        NoOfPeople = NoOfPeople + "";
        return (
            <View style={{ backgroundColor: '#f3f3f3', flex: 1 }}>
                <NavigationBar
                    style={{ backgroundColor: '#546a79', height: 60 }}
                    title={{
                        title: 'Tip Calculator',
                        style: {
                            color: 'white',
                            fontFamily: 'Roboto'
                        }
                    }}
                    rightButton={{
                        tintColor: 'white',
                        title: 'Settings',
                        handler: this.onSettingPress.bind(this)
                    }}
                />

                <ScrollView>
                    <Grid style={styles.gridStyle}>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={[styles.textStyle, { fontSize: 18 }]}>Bill Amount</Text>
                            </Col>
                            <Col size={60} containerStyle={styles.colStyle}>
                                <TextInput
                                    keyboardType="numeric"
                                    placeholder="0"
                                    autoFocus={true}
                                    value={amount}
                                    onChangeText={this.onAmountChange.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={40} containerStyle={styles.colStyle}>
                                <Text style={[styles.textStyle, { fontSize: 18 }]}>No. of People</Text>
                            </Col>
                            <Col size={60} containerStyle={styles.colStyle}>
                                <TextInput
                                    keyboardType="numeric"
                                    defaultValue="1"
                                    value={NoOfPeople}
                                    onChangeText={this.onPeopleChange.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row containerStyle={styles.rowStyle}>
                            <Col size={100} containerStyle={styles.colStyle}>
                                <ButtonGroup
                                    onPress={this.onPercentChange.bind(this)}
                                    selectedIndex={percent || 0}
                                    selectedBackgroundColor="#546a79"
                                    selectedTextStyle={{ color: 'white' }}
                                    buttons={percentage}
                                />
                            </Col>
                        </Row>
                        <Row containerStyle={[styles.rowStyle]}>
                            <Col size={30} containerStyle={styles.colStyle}>
                                <Text h3 style={{ color: '#546a79' }}>Tip</Text>
                                <Text style={{ color: '#546a79' }}>PER PERSON</Text>
                            </Col>
                            <Col size={70} containerStyle={styles.colStyle}>
                                <Text h3 style={{ textAlign: 'right', color: '#546a79', fontWeight: 'normal' }}>{amountPerPeople}</Text>
                            </Col>
                        </Row>

                        <Divider style={{ backgroundColor: '#ddd' }} />

                        <Row containerStyle={styles.rowStyle}>
                            <Col size={30} containerStyle={styles.colStyle}>
                                <Text h3 style={{ color: '#546a79' }}>Total</Text>
                            </Col>
                            <Col size={70} containerStyle={styles.colStyle}>
                                <Text h3 style={{ textAlign: 'right', color: '#546a79' }}>{result}</Text>
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    let { amount, percent, NoOfPeople } = state.data;
    const settings = state.settings;

    let result = 0;
    let percentAmount = parseInt(settings.percentage[percent]) / 100;
    let amountPerPeople = 0;

    console.log(percentAmount);

    percent = parseInt(percent, 0);

    if (parseInt(amount, 0) > 0) {
        tipAmount = parseInt(amount, 0) * percentAmount;
        result = parseInt(amount, 0) + tipAmount;
        if (NoOfPeople) {
            amountPerPeople = result / parseInt(NoOfPeople, 0);
        } else {
            amountPerPeople = result;
        }
    }

    return { amount, percent, NoOfPeople, result, percentAmount, amountPerPeople, settings };
};

export default connect(
    mapStateToProps,
    {
        amountChanged,
        percentChanged,
        noOfPeopleChanged
    }
)(MainScene);
