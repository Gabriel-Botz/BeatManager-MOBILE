import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Upload, X } from 'lucide-react-native';
import { TipoEvento, type Evento, type EventoRequest } from '@/lib/types';
import * as api from '@/lib/api';
import { Cores } from '@/constants/colors';

interface FormularioEventoProps {
  token: string;
  aoCadastrar: (evento: Evento) => void;
  evento?: Evento | null;
  aoCancelar?: () => void;
}

const categoriasDisponiveis = Object.values(TipoEvento) as TipoEvento[];

export function FormularioEvento({ token, aoCadastrar, evento, aoCancelar }: FormularioEventoProps) {
  const [nome, setNome] = useState(evento?.nome ?? '');
  const [data, setData] = useState(evento?.data.split('T')[0] ?? '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);
  const [localizacao, setLocalizacao] = useState(evento?.localizacao ?? '');
  const [descricao, setDescricao] = useState(evento?.descricao ?? '');
  const [tipo, setTipo] = useState<TipoEvento>(evento?.tipo ?? TipoEvento.SHOW);
  const [imagemUrl, setImagemUrl] = useState(evento?.imagemUrl ?? '');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const editando = !!evento;

  function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      setData(`${year}-${month}-${day}`);
    }
  }

  function getDateValue(): Date {
    if (data) {
      const [year, month, day] = data.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  }

  async function selecionarImagem() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
    });

    if (resultado.canceled || !resultado.assets[0]) return;

    const asset = resultado.assets[0];
    if (asset.fileSize && asset.fileSize > 5000000) {
      setErro('A imagem deve ter no maximo 5MB.');
      return;
    }

    setEnviando(true);
    try {
      const res = await api.uploadImagem(token, {
        uri: asset.uri,
        name: asset.fileName ?? 'image.jpg',
        type: asset.mimeType ?? 'image/jpeg',
      });
      setImagemUrl(res.url);
    } catch {
      setErro('Erro ao fazer upload da imagem.');
    } finally {
      setEnviando(false);
    }
  }

  async function handleSubmit() {
    setErro('');

    if (!nome || !data || !localizacao || !descricao) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (editando) {
      try {
        const res = await api.atualizarEvento(token, evento.id, {
          data: data + 'T20:00:00',
          localizacao,
        });
        aoCadastrar(res);
      } catch {
        setErro('Erro ao atualizar evento.');
        return;
      }
    } else {
      if (!imagemUrl) {
        setErro('Faca o upload de uma imagem.');
        return;
      }

      const dto: EventoRequest = {
        nome,
        data: data + 'T20:00:00',
        localizacao,
        descricao,
        imagemUrl,
        tipo,
      };

      try {
        const res = await api.criarEvento(token, dto);
        aoCadastrar(res);
      } catch {
        setErro('Erro ao cadastrar evento.');
        return;
      }
    }

    setSucesso(true);
    setTimeout(() => setSucesso(false), 2000);

    if (!editando) {
      setNome('');
      setData('');
      setLocalizacao('');
      setDescricao('');
      setTipo(TipoEvento.SHOW);
      setImagemUrl('');
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.formulario} showsVerticalScrollIndicator={false}>
      {erro ? (
        <View style={estilos.erro}>
          <Text style={estilos.textoErro}>{erro}</Text>
        </View>
      ) : null}
      {sucesso ? (
        <View style={estilos.sucesso}>
          <Text style={estilos.textoSucesso}>
            {editando ? 'Evento atualizado!' : 'Evento cadastrado!'}
          </Text>
        </View>
      ) : null}

      <View style={estilos.campoGrupo}>
        <Text style={estilos.rotulo}>Nome do evento</Text>
        <TextInput
          style={[estilos.campo, editando && estilos.campoDesabilitado]}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Festival Eletronico"
          placeholderTextColor={Cores.mutado}
          editable={!editando}
        />
      </View>

      <View style={estilos.campoGrupo}>
        <Text style={estilos.rotulo}>Data</Text>
        {Platform.OS === 'web' ? (
          <div style={{
            width: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Cores.bordaInput,
          }}>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              min="2020-01-01"
              max="2030-12-31"
              style={{
                width: '100%',
                height: 48,
                boxSizing: 'border-box',
                border: 'none',
                paddingLeft: 11,
                paddingRight: 11,
                borderRadius: 0,
                backgroundColor: Cores.fundoInput,
                color: Cores.texto,
                fontSize: 16,
                outline: 'none',
              } as any}
            />
          </div>
        ) : (
          <>
            <Pressable
              style={estilos.campo}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={estilos.dataTexto}>
                {data || 'Selecione uma data'}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={getDateValue()}
                mode="date"
                display="spinner"
                onChange={onDateChange}
                minimumDate={new Date(2020, 0, 1)}
                maximumDate={new Date(2030, 11, 31)}
              />
            )}
          </>
        )}
      </View>

      <View style={estilos.campoGrupo}>
        <Text style={estilos.rotulo}>Local</Text>
        <TextInput
          style={estilos.campo}
          value={localizacao}
          onChangeText={setLocalizacao}
          placeholder="Ex: Sao Paulo, SP"
          placeholderTextColor={Cores.mutado}
        />
      </View>

      {!editando && (
        <View style={estilos.campoGrupo}>
          <Text style={estilos.rotulo}>Categoria</Text>
          <View style={estilos.categorias}>
            {categoriasDisponiveis.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setTipo(cat)}
                style={[
                  estilos.categoriaBotao,
                  tipo === cat && estilos.categoriaAtiva,
                ]}
              >
                <Text style={[
                  estilos.categoriaTexto,
                  tipo === cat && estilos.categoriaTextoAtiva,
                ]}>
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {!editando && (
        <View style={estilos.campoGrupo}>
          <Text style={estilos.rotulo}>Descricao</Text>
          <TextInput
            style={[estilos.campo, estilos.textarea]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva o evento..."
            placeholderTextColor={Cores.mutado}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      )}

      {!editando && (
        <View style={estilos.campoGrupo}>
          <Text style={estilos.rotulo}>Capa do evento</Text>
          {imagemUrl ? (
            <View style={estilos.preview}>
              <Image source={{ uri: imagemUrl }} style={estilos.previewImagem} />
              <Pressable style={estilos.remover} onPress={() => setImagemUrl('')}>
                <X size={16} color={Cores.branco} />
                <Text style={estilos.removerTexto}>Remover</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={estilos.uploadBotao}
              onPress={selecionarImagem}
              disabled={enviando}
            >
              <Upload size={20} color={Cores.mutado} />
              <Text style={estilos.uploadTexto}>
                {enviando ? 'Enviando...' : 'Escolher imagem'}
              </Text>
            </Pressable>
          )}
        </View>
      )}

      <View style={estilos.botoes}>
        {aoCancelar && (
          <Pressable style={estilos.botaoCancelar} onPress={aoCancelar}>
            <Text style={estilos.cancelarTexto}>Cancelar</Text>
          </Pressable>
        )}
        <Pressable style={estilos.botaoSalvar} onPress={handleSubmit}>
          <Text style={estilos.salvarTexto}>
            {editando ? 'Salvar Alteracoes' : 'Cadastrar Evento'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  formulario: {
    gap: 20,
  },
  campoGrupo: {
    gap: 8,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(226, 232, 240, 0.7)',
  },
  campo: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 11,
    borderRadius: 12,
    backgroundColor: Cores.fundoInput,
    borderWidth: 1,
    borderColor: Cores.bordaInput,
    color: Cores.texto,
    fontSize: 16,
    outlineStyle: 'none',
  },
  campoDesabilitado: {
    opacity: 0.5,
    backgroundColor: 'rgba(30, 30, 50, 0.5)',
  },
  dataTexto: {
    color: Cores.texto,
    fontSize: 16,
    paddingLeft: 2,
  },
  textarea: {
    minHeight: 80,
    paddingTop: 12,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  uploadBotao: {
    width: '100%',
    paddingVertical: 32,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Cores.bordaInput,
    borderRadius: 12,
    backgroundColor: Cores.fundoInput,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadTexto: {
    color: Cores.mutado,
    fontSize: 15,
    fontWeight: '500',
  },
  preview: {
    position: 'relative',
  },
  previewImagem: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  remover: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
  },
  removerTexto: {
    color: Cores.branco,
    fontSize: 12,
    fontWeight: '500',
  },
  botoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  botaoCancelar: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Cores.bordaCartao,
    alignItems: 'center',
  },
  cancelarTexto: {
    color: Cores.mutado,
    fontWeight: '600',
    fontSize: 16,
  },
  botaoSalvar: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Cores.primaria,
    alignItems: 'center',
  },
  salvarTexto: {
    color: Cores.branco,
    fontWeight: '600',
    fontSize: 16,
  },
  erro: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  textoErro: {
    color: Cores.erro,
    fontSize: 14,
  },
  sucesso: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  textoSucesso: {
    color: Cores.sucesso,
    fontSize: 14,
  },
});
