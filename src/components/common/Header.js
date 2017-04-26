import React, { Component } from 'react';
import { View, Text, ToolbarAndroid } from 'react-native';

const styles = {
    textStyle: {
        fontSize: 20
    },
    containerStyle: {
        backgroundColor: '#ddd',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingTop: 5,
        borderBottomWidth: 1,
        elevation: 2,
        position: 'relative',
        marginBottom: 10,
        paddingLeft: 10
    },
    leftView: {
        flex: 2
    },
    rightView: {
        flex: 1
    },
    middleView: {
        flex: 3
    }
};

class Header extends Component {
    handleActionSelected(position: number) {
        let items = this.props.extraItems || [];
        if (this.props.rightItem) {
            items = [this.props.rightItem, ...items];
        }

        const item = items[position];
        item && item.onPress && item.onPress();
    }

    render() {
        const { leftItem, rightItem, extraItems } = this.props;
        let actions = [];

        if (rightItem) {
            const { title, icon, layout } = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always'
            });
        }

        if (extraItems) {
            actions = actions.concat(extraItems.map((item) => ({
                title: item.title,
                show: 'never'
            })));
        }
        
        let content;
        if (React.Children.count(this.props.child) > 0) {
            content = (
                <View collapsable={false} style={{ flex: 1 }}>{this.props.children}</View>
            );
        }

        const colorProps = {
            titleColor: this.props.foreground || 'black',
            subtitleColor: this.props.foreground || 'black'
        }

        return (
            <View style={[{ height: 60 }, this.props.style]}>
                <ToolbarAndroid
                    navIcon={leftItem && leftItem.icon}
                    onIconClicked={leftItem && leftItem.onPress}
                    title={this.props.title}
                    actions={actions}
                    onActionSelected={this.handleActionSelected.bind(this)}
                    style={{ flex: 2, alignItems: 'center' }}
                    {...colorProps}
                >
                {content}
                </ToolbarAndroid>
            </View>
        );
    }
}

export { Header };
