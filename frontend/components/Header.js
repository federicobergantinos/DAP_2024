import React from 'react';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Block, NavBar, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import yummlyTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ProfileButton = ({ isWhite, style }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Profile')}>
      <Icon
        family="Feather"
        size={20}
        name="user"
        color={yummlyTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />
    </TouchableOpacity>
  );
};

const SettingsButton = ({ isWhite, style }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Settings')}>
      <Icon
        family="Feather"
        size={20}
        name="settings"
        color={yummlyTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />
    </TouchableOpacity>
  );
};

const Header = ({ back, title, white, transparent, bgColor, iconColor, titleColor, search, tabs, tabIndex, ...props }) => {
  const navigation = useNavigation();

  const renderLeft = () => {
    return back ? () => navigation.dispatch(CommonActions.goBack()) : () => navigation.navigate('Home');
  };

  const renderRight = () => {
    if (title === 'Title') {
      return [
        <ProfileButton key='profile-title' isWhite={white} />,
        <SettingsButton key='settings-title' isWhite={white} />
      ];
    }

    switch (title) {
      case 'Home':
        return ([
          <ProfileButton key='profile-title' isWhite={white} />,
          <SettingsButton key='settings-title' isWhite={white} />
        ]);
      case 'Perfil':
        return ([
          <SettingsButton key='settings-title' isWhite={white} />
        ]);
      case 'Recipe':
      case 'Search':
      case 'Configuracion':
        return ([
          <ProfileButton key='profile-title' isWhite={white} />
        ]);
      default:
        return null;
    }
  };

  const renderSearch = () => {
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Qué estás buscando?"
        placeholderTextColor={'#8898AA'}
        onFocus={() => { Keyboard.dismiss(); navigation.navigate('Search'); }}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="YummlyExtra" />}
      />
    );
  };

  const renderTabs = () => {
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    );
  };

  const renderHeader = () => {
    if (search || tabs) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {tabs ? renderTabs() : null}
        </Block>
      );
    }
  };

  const noShadow = ['Search', 'Perfil'].includes(title);
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
        right={renderRight()}
        rightStyle={{ alignItems: 'center' }}
        left={
          <Icon
            name={back ? 'chevron-left' : "home"} family="Feather"
            size={20} onPress={renderLeft()}
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
      {renderHeader()}
    </Block>
  );
};


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
    paddingTop: theme.SIZES.BASE,
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
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: yummlyTheme.COLORS.BORDER
  },
});

export default Header;
