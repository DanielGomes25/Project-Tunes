<div align="center">

# Trybe Tunes

Aplicação React para buscar álbuns, ouvir prévias de faixas, favoritar músicas e editar o perfil do usuário — com um tema escuro consistente e layout responsivo.

</div>

## ✨ Destaques

- Tema escuro consistente com design tokens (variáveis CSS)
- Layout responsivo (grid de álbuns com `auto-fill` + `minmax`)
- Header “sticky” com desfoque e navegação clara
- Feedbacks de UX: loading, botões desabilitados, mensagens de vazio
- Qualidade de código com ESLint e Stylelint; build estável (Node 22)

## 🧭 Funcionalidades

- Busca de álbuns por banda/artista (grade responsiva de resultados)
- Visualização de álbum e faixas, com preview de áudio por música
- Lista de músicas favoritas (adicionar/remover, visualização)
- Edição de perfil com validação simples (nome, e‑mail, imagem, bio)
- Estados de carregamento e overlay dedicados

## 🛠️ Tecnologias Utilizadas

- Front-end: React 18, React Router v5
- Build/Dev: Create React App (react-scripts 5), Browserslist
- Estilos: CSS puro com variáveis (tema), layout Flex/Grid
- Qualidade: ESLint (`@trybe/eslint-config-frontend`), Stylelint (standard, order)
- Testes utilitários: Testing Library (jest-dom, react, user-event)
- Métricas: Web Vitals
- Deploy: Vercel (Node 22.x)

## 📂 Estrutura (principais)

- Páginas: `src/pages/Search.jsx`, `src/pages/Favorites.jsx`, `src/pages/ProfileEdit.jsx`, `src/pages/Loading.jsx`
- Componentes: `src/components/Header.jsx`, `src/components/MusicCard.jsx`
- Estilos: `src/index.css` (tokens, layout, componentes visuais)
- Serviços: `src/services/searchAlbumsAPI.js`, `src/services/favoriteSongsAPI.js`, `src/services/userAPI.js`

## 🚀 Como Rodar Localmente

Pré‑requisitos: Node 22.x (use `nvm` para garantir a versão correta).

```bash
nvm install 22 && nvm use 22
npm install
npm start
```

Build de produção:

```bash
npm run build
```

## 📦 Scripts úteis

- `npm start` — roda a aplicação em modo desenvolvimento
- `npm run build` — gera build de produção otimizado
- `npm test` — executa os testes (CRA)
- `npm run lint` — lint de JS/JSX (ESLint)
- `npm run lint:styles` — lint de CSS (Stylelint)

## 🌐 Deploy

- Plataforma: Vercel
- Engine: Node `22.x` (definido em `package.json` e `.nvmrc`)
- URL: adicione aqui o link do deploy (ex.: https://seu-projeto.vercel.app)

## 🖼️ Screenshots (opcional)

Adicione aqui imagens do app em funcionamento (home, busca, álbum, favoritos, perfil).

---

Projeto desenvolvido durante o curso da Trybe, com foco em React, roteamento, estilização com CSS puro e boas práticas de qualidade e deploy.
