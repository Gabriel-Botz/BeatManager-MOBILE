import { View, Image, StyleSheet } from 'react-native';
import { Cores } from '@/constants/colors';

interface CabecalhoProps {
  children?: React.ReactNode;
}

export function Cabecalho({ children }: CabecalhoProps) {
  return (
    <View style={estilos.cabecalho}>
      <Image
        source={require('@assets/images/logo-header2.png')}
        style={estilos.logo}
        resizeMode="contain"
      />
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Cores.bordaCartao,
    backgroundColor: 'rgba(10, 10, 20, 0.3)',
  },
  logo: {
    width: 120,
    height: 40,
  },
});
