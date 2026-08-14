# BeatManager - App Mobile

Aplicacao mobile para gerenciamento de eventos de musica eletronica, construida com Expo SDK 57 e integrada a uma API REST em Spring Boot.

## Stack

- **Framework:** Expo SDK 57 + React Native 0.86
- **Roteamento:** Expo Router (file-based)
- **UI:** React 19, TypeScript 6, StyleSheet nativo
- **Autenticacao:** JWT (AsyncStorage + Context API)
- **HTTP Client:** Fetch API nativa
- **Icones:** Lucide React Native
- **Upload de imagens:** Expo Image Picker

## Estrutura

```
src/
├── app/
│   ├── _layout.tsx              # Stack navigator root
│   ├── index.tsx                # Landing page
│   ├── login.tsx                # Login
│   ├── cadastro.tsx             # Cadastro de administrador
│   └── (auth)/
│       ├── _layout.tsx          # Layout autenticado (verifica token)
│       ├── eventos.tsx          # Listagem de todos os eventos
│       └── meus-eventos.tsx     # Gerenciamento dos proprios eventos
├── components/
│   ├── identidade/
│   │   └── logo.tsx             # Logo
│   ├── layout/
│   │   ├── cabecalho.tsx        # Header generico
│   │   ├── cabecalho-logado.tsx # Header para usuarios logados
│   │   └── pagina-formulario.tsx
│   ├── ui/
│   │   ├── alerta.tsx
│   │   ├── botao-primario.tsx
│   │   ├── campo-formulario.tsx
│   │   ├── campo-senha.tsx
│   │   └── rodape-formulario.tsx
│   └── evento/
│       ├── cartao-evento.tsx
│       ├── cartao-recurso.tsx
│       ├── filtros-eventos.tsx
│       ├── formulario-evento.tsx
│       ├── modal-evento.tsx
│       └── paginacao.tsx
├── contexts/
│   └── auth-context.tsx         # Autenticacao (login, logout, token)
├── lib/
│   ├── api.ts                   # Chamadas a API
│   └── types.ts                 # Tipos TypeScript
├── constants/
│   ├── colors.ts                # Paleta de cores BeatManager
│   └── theme.ts                 # Espacamentos, fontes, etc
└── styles/
    └── global.ts                # Estilos compartilhados
```

## Como rodar

### Pre-requisitos

- Node.js 20+
- Backend rodando em `http://localhost:8081`
- App **Expo Go** instalado no celular (Play Store / App Store)

### Instalacao

```bash
cd BeatManager-MOBILE
npm install
```

### Desenvolvimento

```bash
# Start generico (escolhe a plataforma)
npm start

# Web (mais rapido pra testar)
npm run web

# Android (via Expo Go)
npm run android

# iOS (via Expo Go)
npm run ios
```

Se usar Expo Go, escaneie o **QR code** que aparece no terminal.

### Build para producao

```bash
npx eas build
```

## Variavel de Ambiente

Criar arquivo `.env` na raiz:

```
EXPO_PUBLIC_API_URL=http://localhost:8081
```

**Testando no celular:** Troque `localhost` pelo IP da sua maquina na rede local:

```bash
ipconfig   # Windows
ifconfig   # Mac/Linux
```

Use o IPv4 do Wi-Fi (ex: `http://192.168.1.100:8081`).

## Funcionalidades

- **Landing page** com apresentacao do sistema
- **Login e cadastro** de administradores
- **Listagem de eventos** com busca por nome/local e filtro por categoria
- **Paginacao** com 6 eventos por pagina
- **Criar evento** com upload de imagem (Expo Image Picker)
- **Editar evento** (data e localizacao)
- **Deletar evento** (remove imagem do Cloudinary automaticamente)
- **Controle de acesso** — cada admin so gerencia seus proprios eventos
- **Token expirado** — redireciona para login automaticamente
- **Navegacao** via abas no header (Eventos / Meus Eventos / Sair)

## API Consumida

| Metodo | Rota | Descricao |
|--------|------|-----------|
| POST | `/auth/cadastro` | Cadastro |
| POST | `/auth/login` | Login |
| GET | `/auth/me` | Perfil do usuario logado |
| GET | `/eventos` | Listar eventos (paginado) |
| GET | `/eventos/administrador/{id}` | Meus eventos (paginado) |
| POST | `/eventos` | Criar evento |
| PUT | `/eventos/{id}` | Atualizar evento |
| DELETE | `/eventos/{id}` | Deletar evento |
| POST | `/upload` | Upload de imagem |
| DELETE | `/upload` | Deletar imagem |

## Fluxo de Navegacao

```
Landing (index)
├── Cadastro → Login
└── Login → Eventos
              ├── Meus Eventos (abas: lista / cadastrar / editar)
              └── Eventos (somente visualizacao)
```

## Branches

| Branch | Descricao |
|--------|-----------|
| `main` | Branch principal, sempre funcional |
| `feature/infra-base` | Dependencias, constants, API, types |
| `feature/ui-components` | Componentes UI genericos |
| `feature/event-components` | Componentes de evento |
| `feature/screen-login` | Tela de login |
| `feature/screen-cadastro` | Tela de cadastro |
| `feature/screen-eventos` | Tela de listagem + layout autenticado |
| `feature/screen-meus-eventos` | CRUD completo |
| `feature/screen-landing` | Tela inicial |
| `feature/visual-tuning` | Ajustes visuais |
| `fix/lint-adjustments` | Correcao de warnings |
