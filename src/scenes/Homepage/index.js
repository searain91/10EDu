import React, { useContext, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { NavigationContext } from 'react-navigation';
import { Button, Container, Content, Icon, Text } from 'native-base';
import { getUserInfoRequest } from '@redux/actions';
import { selectUserInfo } from '@redux/user/selectors';
import EnvInfoView from '@components/AppVersion';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const Home = () => {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserInfo);
  const navigation = useContext(NavigationContext);

  const currentLocale = i18n.language;
  const switchLocaleToEn = useCallback(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const switchLocaleToIt = useCallback(() => {
    i18n.changeLanguage('it');
  }, [i18n]);

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  return (
    <Container style={styles.container}>
      <GenericHeader
        BodyHeader={
          <Icon
            type="FontAwesome5"
            name="react"
            style={styles.headerIconContent}
          />
        }
      />
      <Content contentContainerStyle={styles.content}>
        <Trans
          style={styles.mainText}
          i18nKey="Homepage:welcome"
          values={userData}
        />
        <Trans style={styles.subText} i18nKey="Homepage:releasedWithLove" />

        <View style={styles.languangeContainer}>
          <Button
            onPress={switchLocaleToIt}
            style={styles.button}
            status={currentLocale === 'it' ? 'primary' : 'basic'}
          >
            <Text style={styles.buttonText}>{t('common:italian')}</Text>
          </Button>

          <Button
            onPress={switchLocaleToEn}
            style={styles.button}
            status={currentLocale === 'en' ? 'primary' : 'basic'}
          >
            <Text style={styles.buttonText}>{t('common:english')}</Text>
          </Button>
        </View>

        <View style={styles.buttonGoToContainer}>
          <Button
            onPress={() => navigation.navigate('AnotherPage')}
            style={styles.navigationButton}
          >
            <Icon name="ios-options" style={styles.iconContent} />
            <Text style={styles.buttonText}>
              {t('Homepage:goToAnotherPage')}
            </Text>
          </Button>
        </View>

        <EnvInfoView />
      </Content>
    </Container>
  );
};

export default React.memo(Home);
