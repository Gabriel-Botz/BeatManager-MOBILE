import { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';
import { Evento, TipoEvento } from '@/lib/types';
import * as api from '@/lib/api';
import { Cabecalho } from '@/components/layout/cabecalho';
import { CabecalhoLogado } from '@/components/layout/cabecalho-logado';
import { FundoEfeitoBrilho } from '@/components/layout/fundo-efeito-brilho';
import { CartaoEvento } from '@/components/evento/cartao-evento';
import { ModalEvento } from '@/components/evento/modal-evento';
import { FiltrosEventos } from '@/components/evento/filtros-eventos';
import { FormularioEvento } from '@/components/evento/formulario-evento';
import { Paginacao } from '@/components/evento/paginacao';
import { Cores } from '@/constants/colors';
import { Calendar } from 'lucide-react-native';

const categorias = ['Todas', ...Object.values(TipoEvento)];
const ITENS_POR_PAGINA = 6;

export default function MeusEventosPage() {
  const router = useRouter();
  const { admin, token, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ aba?: string }>();
  const [aba, setAba] = useState<'lista' | 'cadastrar' | 'editar'>(
    (params.aba as 'lista' | 'cadastrar' | 'editar') ?? 'lista',
  );
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);
  const [listaEventos, setListaEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    if (!token || !admin) return;

    api.listarMeusEventos(token, admin.id, paginaAtual, ITENS_POR_PAGINA)
      .then((res) => {
        setListaEventos(res.content);
        setTotalPaginas(res.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, admin, paginaAtual]);

  const eventosFiltrados = listaEventos.filter((evento) => {
    const buscaMatch =
      evento.nome.toLowerCase().includes(busca.toLowerCase()) ||
      evento.localizacao.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch = categoria === 'Todas' || evento.tipo === categoria;
    return buscaMatch && categoriaMatch;
  });

  function aoCadastrarEvento(evento: Evento) {
    setListaEventos((prev) => [...prev, evento]);
    setAba('lista');
  }

  function aoEditarEvento(evento: Evento) {
    setListaEventos((prev) => prev.map((e) => (e.id === evento.id ? evento : e)));
    setEventoEditando(null);
    setEventoSelecionado(null);
    setAba('lista');
  }

  async function aoExcluirEvento(evento: Evento) {
    if (!token) return;
    try {
      await api.deletarImagem(token, evento.imagemUrl).catch(() => {});
      await api.deletarEvento(token, evento.id);
      setListaEventos((prev) => prev.filter((e) => e.id !== evento.id));
      setEventoSelecionado(null);
    } catch {}
  }

  function confirmarExclusao(evento: Evento) {
    Alert.alert(
      'Excluir evento',
      `Tem certeza que deseja excluir "${evento.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => aoExcluirEvento(evento) },
      ],
    );
  }

  function abrirEdicao(evento: Evento) {
    setEventoEditando(evento);
    setEventoSelecionado(null);
    setAba('editar');
  }

  const estaEditando = aba === 'editar' && eventoEditando;
  const estaCadastrando = aba === 'cadastrar';
  const estaNaLista = !estaEditando && !estaCadastrando;

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

      {estaEditando && eventoEditando ? (
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>
            <Text style={estilos.textoGradiente}>Editando</Text> evento
          </Text>
          <FormularioEvento
            token={token!}
            aoCadastrar={aoEditarEvento}
            evento={eventoEditando}
            aoCancelar={() => { setAba('lista'); setEventoEditando(null); }}
          />
        </View>
      ) : estaCadastrando ? (
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>
            <Text style={estilos.textoGradiente}>Novo</Text> evento
          </Text>
          <FormularioEvento token={token!} aoCadastrar={aoCadastrarEvento} />
        </View>
      ) : (
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
                <Text style={estilos.textoGradiente}>Meus</Text> eventos
              </Text>
              <Text style={estilos.subtitulo}>Gerencie e cadastre seus eventos.</Text>

              <View style={estilos.abas}>
                <Pressable
                  onPress={() => { setAba('lista'); setEventoEditando(null); }}
                  style={[estilos.aba, estaNaLista && estilos.abaAtiva]}
                >
                  <Text style={[estilos.abaTexto, estaNaLista && estilos.abaTextoAtiva]}>
                    Meus Eventos
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => { setAba('cadastrar'); setEventoEditando(null); }}
                  style={[estilos.aba, estaCadastrando && estilos.abaAtiva]}
                >
                  <Text style={[estilos.abaTexto, estaCadastrando && estilos.abaTextoAtiva]}>
                    Cadastrar
                  </Text>
                </Pressable>
              </View>

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
                <Text style={estilos.vazioTexto}>Voce ainda nao cadastrou nenhum evento.</Text>
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
      )}

      {eventoSelecionado && (
        <ModalEvento
          evento={eventoSelecionado}
          aoFechar={() => setEventoSelecionado(null)}
          aoEditar={abrirEdicao}
          aoExcluir={confirmarExclusao}
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
    flex: 1,
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
  abas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Cores.bordaCartao,
    marginBottom: 20,
  },
  aba: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  abaAtiva: {
    borderBottomColor: Cores.primaria,
  },
  abaTexto: {
    color: Cores.mutado,
    fontWeight: '500',
    fontSize: 15,
  },
  abaTextoAtiva: {
    color: Cores.primaria,
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
