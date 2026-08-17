import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cores } from '@/constants/colors';
import { FundoEfeitoBrilho } from './fundo-efeito-brilho';

interface PaginaFormularioProps {
  children: React.ReactNode;
}

export function PaginaFormulario({ children }: PaginaFormularioProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={estilos.pagina}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FundoEfeitoBrilho />
      <ScrollView
        contentContainerStyle={[
          estilos.conteudo,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
