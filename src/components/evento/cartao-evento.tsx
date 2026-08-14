import { View, Text, Image, StyleSheet } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import type { Evento } from '@/lib/types';
import { Cores } from '@/constants/colors';

interface CartaoEventoProps {
  evento: Evento;
}

export function CartaoEvento({ evento }: CartaoEventoProps) {
  return (
    <View style={estilos.cartao}>
      <View style={estilos.capa}>
        <Image source={{ uri: evento.imagemUrl }} style={estilos.imagem} />
        <View style={estilos.badge}>
          <Text style={estilos.badgeTexto}>{evento.tipo}</Text>
        </View>
      </View>
      <View style={estilos.info}>
        <Text style={estilos.titulo} numberOfLines={1}>{evento.nome}</Text>
        <View style={estilos.detalhes}>
          <View style={estilos.detalhe}>
            <Calendar size={14} color={Cores.mutado} />
            <Text style={estilos.detalheTexto}>
              {new Date(evento.data).toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <View style={estilos.detalhe}>
            <MapPin size={14} color={Cores.mutado} />
            <Text style={estilos.detalheTexto} numberOfLines={1}>{evento.localizacao}</Text>
          </View>
        </View>
        <Text style={estilos.descricao} numberOfLines={2}>{evento.descricao}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: 'rgba(20, 16, 34, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  capa: {
    height: 140,
    position: 'relative',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(126, 63, 252, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeTexto: {
    color: Cores.branco,
    fontSize: 11,
    fontWeight: '600',
  },
  info: {
    padding: 12,
    gap: 6,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: Cores.texto,
  },
  detalhes: {
    gap: 4,
  },
  detalhe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detalheTexto: {
    fontSize: 13,
    color: Cores.mutado,
  },
  descricao: {
    fontSize: 13,
    color: Cores.mutado,
    lineHeight: 18,
    marginTop: 2,
  },
});
