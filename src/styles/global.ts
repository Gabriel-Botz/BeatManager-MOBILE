import { Cores } from '@/constants/colors';

export const estilos = {
  pagina: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },

  conteudoPrincipal: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
  },

  tituloPrincipal: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Cores.texto,
    textAlign: 'center' as const,
    marginBottom: 16,
  },

  subtitulo: {
    fontSize: 16,
    color: Cores.mutado,
    textAlign: 'center' as const,
    marginBottom: 32,
    lineHeight: 24,
  },

  rodape: {
    textAlign: 'center' as const,
    paddingVertical: 16,
    fontSize: 12,
    color: Cores.mutado,
  },
};
