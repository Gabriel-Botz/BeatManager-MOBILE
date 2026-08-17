import { Image, StyleSheet } from 'react-native';

export function Logo() {
  return (
    <Image
      source={require('../../../assets/images/logo-header.png')}
      style={estilos.logo}
      resizeMode="contain"
    />
  );
}

const estilos = StyleSheet.create({
  logo: {
    width: 480,
    height: 162,
    alignSelf: 'center',
    marginBottom: 24,
  },
});
