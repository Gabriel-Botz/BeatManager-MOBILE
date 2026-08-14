import { Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Cores } from '@/constants/colors';

interface RodapeFormularioProps {
  texto: string;
  textoLink: string;
  href: string;
}

export function RodapeFormulario({ texto, textoLink, href }: RodapeFormularioProps) {
  const router = useRouter();

  return (
    <Text style={estilos.texto}>
      {texto}{' '}
      <Pressable onPress={() => router.push(href)}>
        <Text style={estilos.link}>{textoLink}</Text>
      </Pressable>
    </Text>
  );
}

const estilos = StyleSheet.create({
  texto: {
    fontSize: 15,
    color: Cores.mutado,
    textAlign: 'center',
  },
  link: {
    color: Cores.primaria,
    fontWeight: '500',
  },
});
