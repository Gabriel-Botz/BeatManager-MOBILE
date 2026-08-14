import type {
  AuthResponse,
  Administrador,
  Evento,
  LoginRequest,
  CadastroRequest,
  EventoRequest,
  EventoUpdateRequest,
  PageResponse,
} from './types';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081';

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(callback: () => void) {
  onUnauthorized = callback;
}

async function requisicao<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 401) {
    onUnauthorized?.();
    throw new Error('Sessao expirada. Faca login novamente.');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const mensagem = body?.mensagem || body?.message || `Erro ${res.status}`;
    throw new Error(mensagem);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

function cabecalhoAuth(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

export function login(dto: LoginRequest): Promise<AuthResponse> {
  return requisicao<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export function cadastrar(dto: CadastroRequest): Promise<Administrador> {
  return requisicao<Administrador>('/auth/cadastro', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export function buscarPerfil(token: string): Promise<Administrador> {
  return requisicao<Administrador>('/auth/me', {
    headers: cabecalhoAuth(token),
  });
}

export function listarEventos(
  token: string,
  pagina: number = 0,
  tamanho: number = 6,
): Promise<PageResponse<Evento>> {
  return requisicao<PageResponse<Evento>>(
    `/eventos?page=${pagina}&size=${tamanho}`,
    { headers: cabecalhoAuth(token) },
  );
}

export function listarMeusEventos(
  token: string,
  administradorId: number,
  pagina: number = 0,
  tamanho: number = 6,
): Promise<PageResponse<Evento>> {
  return requisicao<PageResponse<Evento>>(
    `/eventos/administrador/${administradorId}?page=${pagina}&size=${tamanho}`,
    { headers: cabecalhoAuth(token) },
  );
}

export function buscarEventoPorId(id: number): Promise<Evento> {
  return requisicao<Evento>(`/eventos/${id}`);
}

export function criarEvento(
  token: string,
  dto: EventoRequest,
): Promise<Evento> {
  return requisicao<Evento>('/eventos', {
    method: 'POST',
    headers: cabecalhoAuth(token),
    body: JSON.stringify(dto),
  });
}

export function atualizarEvento(
  token: string,
  id: number,
  dto: EventoUpdateRequest,
): Promise<Evento> {
  return requisicao<Evento>(`/eventos/${id}`, {
    method: 'PUT',
    headers: cabecalhoAuth(token),
    body: JSON.stringify(dto),
  });
}

export function deletarEvento(token: string, id: number): Promise<void> {
  return requisicao<void>(`/eventos/${id}`, {
    method: 'DELETE',
    headers: cabecalhoAuth(token),
  });
}

export async function uploadImagem(
  token: string,
  arquivo: File | { uri: string; name: string; type: string },
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', arquivo as unknown as Blob);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (res.status === 401) {
    onUnauthorized?.();
    throw new Error('Sessao expirada. Faca login novamente.');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const mensagem = body?.mensagem || `Erro ${res.status}`;
    throw new Error(mensagem);
  }

  return res.json();
}

export function deletarImagem(
  token: string,
  imageUrl: string,
): Promise<void> {
  return requisicao<void>(`/upload?imageUrl=${encodeURIComponent(imageUrl)}`, {
    method: 'DELETE',
    headers: cabecalhoAuth(token),
  });
}
