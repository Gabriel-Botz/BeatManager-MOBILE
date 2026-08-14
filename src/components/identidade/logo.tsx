import { Image, StyleSheet } from 'react-native';

export function Logo() {
  return (
    <Image
      source={require('@assets/images/logo-header.png')}
      style={estilos.logo}
      resizeMode="contain"
    />
  );
}

const estilos = StyleSheet.create({
  logo: {
    width: 160,
    height: 54,
    alignSelf: 'center',
    marginBottom: 24,
  },
});
