import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { Input } from "galio-framework";

import Icon from "./Icon";
import { yummlyTheme } from "../constants";

class ArInput extends React.Component {
  render() {
    const { shadowless, success, error } = this.props;

    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      { ...this.props.style },
    ];

    return (
      <Input
        placeholderTextColor={yummlyTheme.COLORS.MUTED}
        style={inputStyles}
        color={yummlyTheme.COLORS.HEADER}
        iconContent={
          <Icon
            size={14}
            color={yummlyTheme.COLORS.ICON}
            name="link"
            family="AntDesign"
          />
        }
        {...this.props}
      />
    );
  }
}

ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: yummlyTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  success: {
    borderColor: yummlyTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: yummlyTheme.COLORS.INPUT_ERROR,
  },
  shadow: {
    shadowColor: yummlyTheme.COLORS.BLACK,
    backgroundColor: "#FFF",
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});

export default ArInput;
