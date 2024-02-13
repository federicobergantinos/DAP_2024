import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Block, NavBar, theme } from 'galio-framework';
import { CommonActions } from '@react-navigation/native';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import yummlyTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ProfileButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('ProfileDrawer')}>
    <Icon
      family="Feather"
      size={20}
      name="user"
      color={yummlyTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const SettingsButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('SettingsDrawer')}>
    <Icon
      family="Feather"
      size={20}
      name="settings"
      color={yummlyTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);


class Header extends React.Component {
  renderLeft = () => {
    const { back, white, navigation } = this.props;
    return(back ? navigation.dispatch(CommonActions.goBack()) : navigation.navigate('HomeDrawer'));
  }
  renderRight = () => {
    const { white, title, navigation } = this.props;

    if (title === 'Title') {
      return [
        <ProfileButton key='profile-title' navigation={navigation} isWhite={white} />,
        <SettingsButton key='settings-title' navigation={navigation} isWhite={white} />
      ]
    }
    
    switch (title) {
      case 'Home':
      case 'Profile':
      case 'Recipe':
      case 'Search':
      case 'Settings':
        return ([
          <ProfileButton key='profile-title' navigation={navigation} isWhite={white} />,
          <SettingsButton key='settings-title' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Que estas buscando?"
        placeholderTextColor={'#8898AA'}
        onFocus={() => {Keyboard.dismiss(); navigation.navigate('Search');}}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="YummlyExtra" />}
      />
    );
  }
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { search, tabs } = this.props;
    if (search || tabs) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const noShadow = ['Search', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon 
              name={back ? 'chevron-left' : "home"} family="Feather" 
              size={back ? 20 : 20} onPress={this.renderLeft}
              color={iconColor || (white ? yummlyTheme.COLORS.WHITE : yummlyTheme.COLORS.ICON)}
              style={{ marginTop: 2 }}
              />
          }
          leftStyle={{ flex: 0.35 }}
          titleStyle={[
            styles.title,
            { color: yummlyTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: yummlyTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: yummlyTheme.COLORS.BORDER
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: yummlyTheme.COLORS.HEADER
  },
});

export default withNavigation(Header);
