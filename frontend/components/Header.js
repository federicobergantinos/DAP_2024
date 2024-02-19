import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard, View, Share} from 'react-native';
import { Block, NavBar, theme } from 'galio-framework';
import { CommonActions, useNavigation } from '@react-navigation/native'; // Importa useNavigation de '@react-navigation/native'

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import yummlyTheme from '../constants/Theme';
import RecipeContext from "../navigation/RecipeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendGateway from "../api/backendGateway";

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

const getUserId = async () => {
  return await AsyncStorage.getItem("userId");
}



const Header = ({ back, title, white, transparent, bgColor, iconColor, titleColor, search, tabs, tabIndex, ...props }) => {
  const navigation = useNavigation();
  const { recipe } = useContext(RecipeContext)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(false);

  useEffect(() => {
    const checkOwner = async () => {
      const userId = await getUserId();
      setCurrentUserId(userId)
      setIsOwner(userId.toString() === recipe.userId.toString());
    };

    setIsFavorite(recipe.isFavorite)
    checkOwner().then(renderRight());

  }, [recipe]);
  const handleFavorite = async () => {
    const likeOrDislike = async (like) => {
      try {
        setIsFavorite(like);
        const { statusCode } = like ? await backendGateway.users.like(currentUserId, recipe.id) : await backendGateway.users.dislike(currentUserId, recipe.id);
        if (statusCode !== 204) {
          setIsFavorite(!like);
        }
      } catch (error) {
        console.error('No se pudo agregar a favoritos');
        setIsFavorite(!like);
      }
    };

    if (isFavorite) {
      likeOrDislike(false);
    } else {
      likeOrDislike(true);
    }
  }

  const handleShare = async () => {
    try {
      await Share.share({
        title: 'Compartir por',
        message: `${recipe.title}: ${recipe.description}`,
      });
    } catch (error) {
      console.error('Error al compartir:', error.message);
    }
  };


  const RenderEditButton = () => {
    if(!isOwner) return null;
    return (
        <TouchableOpacity style={{ paddingHorizontal:5}} >
          <Icon family='MaterialIcons' name='edit' size={25} color={yummlyTheme.COLORS.WHITE} />
        </TouchableOpacity>
    )
  }

  const RenderFavoriteButton = () => {
    return (
        <TouchableOpacity style={{ paddingHorizontal:5, marginRight:20}} onPress={handleFavorite}>
          <Icon family='MaterialIcons' name={isFavorite ? 'favorite' : 'favorite-border'} size={25} color={yummlyTheme.COLORS.WHITE} />
        </TouchableOpacity>
    )
  }

  const RenderShareButton = () => {
    return (
        <TouchableOpacity style={{ paddingHorizontal:5}} onPress={handleShare} >
          <Icon family='MaterialIcons' name="share" size={25} color={yummlyTheme.COLORS.WHITE} />
        </TouchableOpacity>
    )
  }

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
    if(title === 'Recipe') {
      return ([
          <RenderEditButton isOwner={isOwner}/>,
          <RenderShareButton/>,
          <RenderFavoriteButton/>
      ])
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
        title={title!=='Recipe'? title: '' }
        style={navbarStyles}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{ alignItems: 'center' }}
        left={
          <Icon
            name={back ? 'chevron-left' : "home"} family="Feather"
            size={25} onPress={renderLeft()}
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
