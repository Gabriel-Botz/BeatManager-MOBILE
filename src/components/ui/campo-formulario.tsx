import { View, Text, TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { Cores } from '@/constants/colors';

interface CampoFormularioProps extends TextInputProps {
  rotulo: string;
}

export function CampoFormulario({ rotulo, ...props }: CampoFormularioProps) {
  return (
    <View style={estilos.grupo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        style={estilos.campo}
        placeholderTextColor={Cores.mutado}
        {...props}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  grupo: {
    gap: 6,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(226, 232, 240, 0.7)',
  },
  campo: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: Cores.fundoInput,
    borderWidth: 1,
    borderColor: Cores.bordaInput,
    color: Cores.texto,
    fontSize: 16,
    outlineStyle: 'none',
  },
});
