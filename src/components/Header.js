import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
  render() {
    const { title, styles } = this.props;

    const syncStylesWithProps = { 
      container: { ...defaultStyles.container, ...styles.container },
      text: { ...defaultStyles.text, ...styles.text }
    };

    return (
      <View style={syncStylesWithProps.container}>
        <Text style={syncStylesWithProps.text}>
          {title}
        </Text>
      </View>
    );
  }
}

Header.defaultProps = {
  styles: { container: {}, text: {} }
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  styles: PropTypes.object
};

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF'
  }
});