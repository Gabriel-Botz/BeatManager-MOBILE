import { View, TextInput, ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { Cores } from '@/constants/colors';

interface FiltrosEventosProps {
  busca: string;
  aoMudarBusca: (valor: string) => void;
  categoria: string;
  aoMudarCategoria: (categoria: string) => void;
  categorias: string[];
}

export function FiltrosEventos({
  busca,
  aoMudarBusca,
  categoria,
  aoMudarCategoria,
  categorias,
}: FiltrosEventosProps) {
  return (
    <View style={estilos.filtros}>
      <View style={estilos.buscaContainer}>
        <Search size={18} color={Cores.mutado} style={estilos.buscaIcone} />
        <TextInput
          style={estilos.buscaInput}
          placeholder="Buscar por nome ou local..."
          placeholderTextColor={Cores.mutado}
          value={busca}
          onChangeText={aoMudarBusca}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.categorias}
      >
        {categorias.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => aoMudarCategoria(cat)}
            style={[
              estilos.categoriaBotao,
              categoria === cat && estilos.categoriaAtiva,
            ]}
          >
            <Text
              style={[
                estilos.categoriaTexto,
                categoria === cat && estilos.categoriaTextoAtiva,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  filtros: {
    gap: 12,
    marginBottom: 20,
  },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Cores.fundoInput,
    borderWidth: 1,
    borderColor: Cores.bordaInput,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  buscaIcone: {
    marginRight: 10,
  },
  buscaInput: {
    flex: 1,
    paddingVertical: 12,
    color: Cores.texto,
    fontSize: 15,
  },
  categorias: {
    flexDirection: 'row',
    gap: 8,
  },
  categoriaBotao: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Cores.cartao,
    borderWidth: 1,
    borderColor: Cores.bordaCartao,
  },
  categoriaAtiva: {
    backgroundColor: Cores.primaria,
    borderColor: Cores.primaria,
  },
  categoriaTexto: {
    color: Cores.mutado,
    fontSize: 13,
    fontWeight: '500',
  },
  categoriaTextoAtiva: {
    color: Cores.branco,
  },
});
