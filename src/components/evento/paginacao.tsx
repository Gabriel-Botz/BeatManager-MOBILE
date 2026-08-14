import { View, Pressable, Text, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Cores } from '@/constants/colors';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  aoMudarPagina: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <View style={estilos.paginacao}>
      <Pressable
        onPress={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 0}
        style={[estilos.botao, paginaAtual === 0 && estilos.desabilitado]}
      >
        <ChevronLeft size={16} color={Cores.primariaClara} />
        <Text style={estilos.botaoTexto}>Anterior</Text>
      </Pressable>

      <Text style={estilos.info}>
        {paginaAtual + 1} / {totalPaginas}
      </Text>

      <Pressable
        onPress={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual >= totalPaginas - 1}
        style={[estilos.botao, paginaAtual >= totalPaginas - 1 && estilos.desabilitado]}
      >
        <Text style={estilos.botaoTexto}>Proximo</Text>
        <ChevronRight size={16} color={Cores.primariaClara} />
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  paginacao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(126, 63, 252, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(126, 63, 252, 0.3)',
  },
  desabilitado: {
    opacity: 0.35,
  },
  botaoTexto: {
    color: Cores.primariaClara,
    fontSize: 13,
    fontWeight: '500',
  },
  info: {
    color: Cores.mutado,
    fontSize: 13,
    minWidth: 40,
    textAlign: 'center',
  },
});
