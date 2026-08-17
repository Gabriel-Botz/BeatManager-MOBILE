import { View, Image, StyleSheet } from 'react-native';

export function FundoEfeitoBrilho() {
  return (
    <View style={estilos.container} pointerEvents="none">
      <Image
        source={require('../../../assets/images/background-mb.png')}
        style={estilos.textura}
        resizeMode="cover"
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  textura: {
    position: 'absolute',
    width: '200%',
    height: '100%',
    left: '-50%',
    top: '0%',
    marginLeft: 15,
    opacity: 0.15,
  },
});
