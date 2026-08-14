import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, type TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Cores } from '@/constants/colors';

interface CampoSenhaProps extends Omit<TextInputProps, 'type'> {
  rotulo: string;
}

export function CampoSenha({ rotulo, ...props }: CampoSenhaProps) {
  const [visivel, setVisivel] = useState(false);

  return (
    <View style={estilos.grupo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <View style={estilos.campoContainer}>
        <TextInput
          style={estilos.campo}
          secureTextEntry={!visivel}
          placeholderTextColor={Cores.mutado}
          {...props}
        />
        <Pressable
          style={estilos.botaoIcone}
          onPress={() => setVisivel(!visivel)}
        >
          {visivel ? (
            <EyeOff size={20} color={Cores.mutado} />
          ) : (
            <Eye size={20} color={Cores.mutado} />
          )}
        </Pressable>
      </View>
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
  campoContainer: {
    position: 'relative',
  },
  campo: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingRight: 48,
    borderRadius: 12,
    backgroundColor: Cores.fundoInput,
    borderWidth: 1,
    borderColor: Cores.bordaInput,
    color: Cores.texto,
    fontSize: 16,
  },
  botaoIcone: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    padding: 4,
  },
});
