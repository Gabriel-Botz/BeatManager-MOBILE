import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';
import { PaginaFormulario } from '@/components/layout/pagina-formulario';
import { Logo } from '@/components/identidade/logo';
import { Alerta } from '@/components/ui/alerta';
import { CampoFormulario } from '@/components/ui/campo-formulario';
import { CampoSenha } from '@/components/ui/campo-senha';
import { BotaoPrimario } from '@/components/ui/botao-primario';
import { RodapeFormulario } from '@/components/ui/rodape-formulario';
import { Cores } from '@/constants/colors';

export default function CadastroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit() {
    setErro('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas nao conferem.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter no minimo 6 caracteres.');
      return;
    }

    const cadastrado = await register(nome, email, senha);
    if (!cadastrado) {
      setErro('Este e-mail ja esta cadastrado.');
      return;
    }

    setSucesso(true);
    setTimeout(() => router.push('/login'), 1500);
  }

  return (
    <PaginaFormulario>
      <Logo />

      <View style={estilos.cartao}>
        <Pressable style={estilos.botaoFechar} onPress={() => router.replace('/')}>
          <Text style={estilos.botaoFecharTexto}>X</Text>
        </Pressable>

        {erro ? <Alerta tipo="erro">{erro}</Alerta> : null}
        {sucesso ? (
          <Alerta tipo="sucesso">Cadastro realizado! Redirecionando...</Alerta>
        ) : null}

        <CampoFormulario
          rotulo="Nome completo"
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
          autoCapitalize="words"
        />

        <CampoFormulario
          rotulo="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="admin@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CampoSenha
          rotulo="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Minimo 6 caracteres"
        />

        <CampoSenha
          rotulo="Confirmar senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Repita a senha"
        />

        <BotaoPrimario onPress={handleSubmit}>
          Cadastrar
        </BotaoPrimario>

        <RodapeFormulario
          texto="Ja tem uma conta?"
          textoLink="Entrar"
          href="/login"
        />
      </View>
    </PaginaFormulario>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: 'rgba(20, 16, 34, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 20,
    gap: 14,
    position: 'relative',
  },
  botaoFechar: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Cores.bordaCartao,
    backgroundColor: 'rgba(10, 10, 20, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  botaoFecharTexto: {
    color: 'rgba(226, 232, 240, 0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
});
