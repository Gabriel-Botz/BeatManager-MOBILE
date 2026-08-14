import { View, Text, Image, Pressable, ScrollView, Modal, StyleSheet } from 'react-native';
import { Calendar, MapPin, Pencil, Trash2, X } from 'lucide-react-native';
import type { Evento } from '@/lib/types';
import { Cores } from '@/constants/colors';

interface ModalEventoProps {
  evento: Evento;
  aoFechar: () => void;
  aoEditar?: (evento: Evento) => void;
  aoExcluir?: (evento: Evento) => void;
}

export function ModalEvento({ evento, aoFechar, aoEditar, aoExcluir }: ModalEventoProps) {
  return (
    <Modal transparent animationType="fade" visible onRequestClose={aoFechar}>
      <Pressable style={estilos.overlay} onPress={aoFechar}>
        <Pressable style={estilos.conteudo} onPress={(e) => e.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable style={estilos.fechar} onPress={aoFechar}>
              <X size={20} color={Cores.mutado} />
            </Pressable>

            <Image source={{ uri: evento.imagemUrl }} style={estilos.capa} />

            <View style={estilos.info}>
              <View style={estilos.badge}>
                <Text style={estilos.badgeTexto}>{evento.tipo}</Text>
              </View>
              <Text style={estilos.titulo}>{evento.nome}</Text>

              <View style={estilos.detalhes}>
                <View style={estilos.detalhe}>
                  <Calendar size={16} color={Cores.mutado} />
                  <Text style={estilos.detalheTexto}>
                    {new Date(evento.data).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
                <View style={estilos.detalhe}>
                  <MapPin size={16} color={Cores.mutado} />
                  <Text style={estilos.detalheTexto}>{evento.localizacao}</Text>
                </View>
              </View>

              <Text style={estilos.descricao}>{evento.descricao}</Text>

              {(aoEditar || aoExcluir) && (
                <View style={estilos.acoes}>
                  {aoEditar && (
                    <Pressable style={estilos.botaoEditar} onPress={() => aoEditar(evento)}>
                      <Pencil size={16} color={Cores.primariaClara} />
                      <Text style={estilos.textoEditar}>Editar</Text>
                    </Pressable>
                  )}
                  {aoExcluir && (
                    <Pressable style={estilos.botaoExcluir} onPress={() => aoExcluir(evento)}>
                      <Trash2 size={16} color={Cores.erro} />
                      <Text style={estilos.textoExcluir}>Excluir</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  conteudo: {
    backgroundColor: 'rgba(20, 16, 34, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    maxHeight: '85%',
  },
  fechar: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 20, 0.7)',
    borderWidth: 1,
    borderColor: Cores.bordaCartao,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capa: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 20,
    gap: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(126, 63, 252, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(126, 63, 252, 0.3)',
  },
  badgeTexto: {
    color: Cores.primariaClara,
    fontSize: 12,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: Cores.texto,
  },
  detalhes: {
    gap: 8,
  },
  detalhe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detalheTexto: {
    fontSize: 15,
    color: Cores.mutado,
  },
  descricao: {
    fontSize: 15,
    color: 'rgba(226, 232, 240, 0.8)',
    lineHeight: 22,
    marginTop: 4,
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  botaoEditar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(126, 63, 252, 0.4)',
  },
  textoEditar: {
    color: Cores.primariaClara,
    fontWeight: '500',
    fontSize: 14,
  },
  botaoExcluir: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  textoExcluir: {
    color: Cores.erro,
    fontWeight: '500',
    fontSize: 14,
  },
});
