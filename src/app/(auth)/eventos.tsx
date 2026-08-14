import { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';
import { Evento, TipoEvento } from '@/lib/types';
import * as api from '@/lib/api';
import { Cabecalho } from '@/components/layout/cabecalho';
import { CabecalhoLogado } from '@/components/layout/cabecalho-logado';
import { FundoEfeitoBrilho } from '@/components/layout/fundo-efeito-brilho';
import { CartaoEvento } from '@/components/evento/cartao-evento';
import { ModalEvento } from '@/components/evento/modal-evento';
import { FiltrosEventos } from '@/components/evento/filtros-eventos';
import { Paginacao } from '@/components/evento/paginacao';
import { Cores } from '@/constants/colors';
import { Calendar } from 'lucide-react-native';

const categorias = ['Todas', ...Object.values(TipoEvento)];
const ITENS_POR_PAGINA = 6;

export default function EventosPage() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    if (!token) return;

    api.listarEventos(token, paginaAtual, ITENS_POR_PAGINA)
      .then((res) => {
        setEventos(res.content);
        setTotalPaginas(res.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, paginaAtual]);

  const eventosFiltrados = eventos.filter((evento) => {
    const buscaMatch =
      evento.nome.toLowerCase().includes(busca.toLowerCase()) ||
      evento.localizacao.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch = categoria === 'Todas' || evento.tipo === categoria;
    return buscaMatch && categoriaMatch;
  });

  function aoMudarBusca(valor: string) {
    setBusca(valor);
    setPaginaAtual(0);
  }

  function aoMudarCategoria(valor: string) {
    setCategoria(valor);
    setPaginaAtual(0);
  }

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <View style={estilos.pagina}>
      <FundoEfeitoBrilho />
      <Cabecalho>
        <CabecalhoLogado aoSair={handleLogout} />
      </Cabecalho>

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={[
          estilos.conteudo,
          { paddingBottom: insets.bottom + 24 },
        ]}
        ListHeaderComponent={
          <View>
            <Text style={estilos.titulo}>
              Encontre seu <Text style={estilos.textoGradiente}>evento</Text>
            </Text>
            <Text style={estilos.subtitulo}>
              Explore os melhores eventos de musica eletronica do Brasil.
            </Text>
            <FiltrosEventos
              busca={busca}
              aoMudarBusca={aoMudarBusca}
              categoria={categoria}
              aoMudarCategoria={aoMudarCategoria}
              categorias={categorias}
            />
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => setEventoSelecionado(item)}>
            <CartaoEvento evento={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={
          loading ? (
            <View style={estilos.vazio}>
              <Text style={estilos.vazioTexto}>Carregando eventos...</Text>
            </View>
          ) : (
            <View style={estilos.vazio}>
              <Calendar size={48} color={Cores.mutado} />
              <Text style={estilos.vazioTexto}>Nenhum evento encontrado.</Text>
            </View>
          )
        }
        ListFooterComponent={
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            aoMudarPagina={setPaginaAtual}
          />
        }
      />

      {eventoSelecionado && (
        <ModalEvento
          evento={eventoSelecionado}
          aoFechar={() => setEventoSelecionado(null)}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  conteudo: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: Cores.texto,
    textAlign: 'center',
    marginBottom: 8,
  },
  textoGradiente: {
    color: Cores.primaria,
  },
  subtitulo: {
    fontSize: 16,
    color: Cores.mutado,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  vazio: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  vazioTexto: {
    color: Cores.mutado,
    fontSize: 16,
  },
});
