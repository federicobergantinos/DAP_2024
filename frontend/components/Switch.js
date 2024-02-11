import React from 'react';
import { Switch, Platform } from 'react-native';

import yummlyTheme from '../constants/Theme';

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor = Platform.OS === 'ios' ? null :
      Platform.OS === 'android' && value ? yummlyTheme.COLORS.SWITCH_ON : yummlyTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={yummlyTheme.COLORS.SWITCH_OFF}
        trackColor={{ false: yummlyTheme.COLORS.SWITCH_ON, true: yummlyTheme.COLORS.SWITCH_ON }}
        {...props}
      />
    );
  }
}

export default MkSwitch;