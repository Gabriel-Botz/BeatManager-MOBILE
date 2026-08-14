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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit() {
    setErro('');

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    const logado = await login(email, senha);
    if (!logado) {
      setErro('E-mail ou senha invalidos.');
      return;
    }

    router.push('/(auth)/eventos');
  }

  return (
    <PaginaFormulario>
      <Logo />

      <View style={estilos.cartao}>
        {erro ? <Alerta tipo="erro">{erro}</Alerta> : null}

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
          placeholder="Sua senha"
        />

        <BotaoPrimario onPress={handleSubmit}>
          Entrar
        </BotaoPrimario>

        <RodapeFormulario
          texto="Nao tem conta?"
          textoLink="Cadastre-se"
          href="/cadastro"
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
  },
});
