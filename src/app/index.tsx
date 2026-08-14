import { View, Text, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';
import { Cabecalho } from '@/components/layout/cabecalho';
import { CartaoRecurso } from '@/components/evento/cartao-recurso';
import { Cores } from '@/constants/colors';
import { Calendar, Music, Headphones } from 'lucide-react-native';

export default function IndexScreen() {
  const router = useRouter();
  const { admin, logout } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={estilos.pagina}>
      <Cabecalho>
        {admin ? (
          <Pressable style={estilos.botaoSair} onPress={logout}>
            <Text style={estilos.textoSair}>Sair</Text>
          </Pressable>
        ) : (
          <View style={estilos.navegacao}>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={estilos.textoNav}>Entrar</Text>
            </Pressable>
            <Pressable style={estilos.botaoPrimario} onPress={() => router.push('/cadastro')}>
              <Text style={estilos.textoPrimario}>Cadastrar</Text>
            </Pressable>
          </View>
        )}
      </Cabecalho>

      <ScrollView
        contentContainerStyle={[
          estilos.conteudo,
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 },
        ]}
      >
        <Image
          source={require('../../assets/images/logo-header2.png')}
          style={estilos.logo}
          resizeMode="contain"
        />

        <Text style={estilos.titulo}>
          Gerencie seus{'\n'}
          <Text style={estilos.textoGradiente}>eventos</Text>
        </Text>

        <Text style={estilos.subtitulo}>
          Planeje, organize e administre seus eventos de musica eletronica em um so lugar.
        </Text>

        <View style={estilos.botoes}>
          {admin ? (
            <Pressable style={estilos.botaoGrande} onPress={() => router.push('/(auth)/eventos')}>
              <Text style={estilos.botaoGrandeTexto}>Eventos</Text>
            </Pressable>
          ) : (
            <>
              <Pressable style={estilos.botaoGrande} onPress={() => router.push('/cadastro')}>
                <Text style={estilos.botaoGrandeTexto}>Comecar Agora</Text>
              </Pressable>
              <Pressable style={estilos.botaoSecundario} onPress={() => router.push('/login')}>
                <Text style={estilos.botaoSecundarioTexto}>Ja tenho conta</Text>
              </Pressable>
            </>
          )}
        </View>

        <View style={estilos.gradeRecursos}>
          <CartaoRecurso
            icone={Calendar}
            cor={Cores.primaria}
            titulo="Agendamento"
            descricao="Organize seus eventos com facilidade"
          />
          <CartaoRecurso
            icone={Music}
            cor={Cores.acento}
            titulo="Catalogo"
            descricao="Mantenha seu catalogo atualizado"
          />
          <CartaoRecurso
            icone={Headphones}
            cor={Cores.primariaClara}
            titulo="Controle"
            descricao="Gerencie tudo em um painel"
          />
        </View>
      </ScrollView>

      <Text style={estilos.rodape}>BeatManager &copy; 2026</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  conteudo: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 54,
    marginBottom: 32,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
    color: Cores.texto,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  textoGradiente: {
    color: Cores.primaria,
  },
  subtitulo: {
    fontSize: 16,
    color: Cores.mutado,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 340,
  },
  botoes: {
    gap: 12,
    width: '100%',
    maxWidth: 320,
    marginBottom: 40,
  },
  botaoGrande: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Cores.primaria,
    alignItems: 'center',
  },
  botaoGrandeTexto: {
    color: Cores.branco,
    fontWeight: '600',
    fontSize: 16,
  },
  botaoSecundario: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Cores.bordaCartao,
    alignItems: 'center',
  },
  botaoSecundarioTexto: {
    color: 'rgba(226, 232, 240, 0.7)',
    fontWeight: '600',
    fontSize: 16,
  },
  gradeRecursos: {
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  navegacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textoNav: {
    color: 'rgba(226, 232, 240, 0.7)',
    fontWeight: '500',
    fontSize: 14,
  },
  botaoPrimario: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Cores.primaria,
  },
  textoPrimario: {
    color: Cores.branco,
    fontWeight: '600',
    fontSize: 14,
  },
  botaoSair: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  textoSair: {
    color: Cores.erro,
    fontWeight: '500',
    fontSize: 13,
  },
  rodape: {
    textAlign: 'center',
    paddingVertical: 16,
    fontSize: 12,
    color: Cores.mutado,
  },
});
