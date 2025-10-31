# 💜 SOS Patas | Plataforma de Resgate e Adoção Responsável

## 🎯 Objetivo do Projeto

Este projeto visa a criação de uma **Single Page Application (SPA) básica e responsiva** para a ONG SOS Patas. O foco é demonstrar o domínio de conceitos avançados de HTML5, CSS3 (com Design System, Flexbox e Grid) e JavaScript para criar uma aplicação dinâmica, acessível e com boas práticas de desenvolvimento (versionamento e documentação).

---

## ✨ Funcionalidades Implementadas

O sistema foi desenvolvido com uma arquitetura de SPA (Single Page Application) baseada em JavaScript, garantindo uma navegação rápida e moderna.

* **Navegação SPA Básica:** Carregamento dinâmico de conteúdo (`projetos.html`, `cadastro.html`, `contato.html`) sem recarga total da página, simulando uma aplicação web interativa.
* **Design System:** Utilização de variáveis CSS (`:root`) para definir paleta de cores, tipografia e espaçamento modular.
* **Layout Responsivo:** Implementação de `flexbox` e `CSS Grid` para diferentes tipos de conteúdo, incluindo cards de projetos e formulário de cadastro com **3 *breakpoints*** (Mobile, Tablet, Desktop).
* **Componentes:**
    * Menu Principal Interativo com **Dropdown Responsivo**.
    * Sistema de **Cards dinâmicos** para projetos (renderizados via JavaScript Template).
    * Formulário de Cadastro com **máscaras de entrada** (CPF, Telefone, CEP) e layout Grid.
* **Versionamento:** Projeto gerenciado com Git/GitHub, utilizando histórico de *commits* e documentação.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **HTML5** | Estrutura semântica dos componentes. |
| **CSS3** | Estilização, responsividade e implementação do Design System. |
| **JavaScript (Vanilla)** | Lógica SPA, manipulação do DOM e máscaras de formulário. |
| **Git/GitHub** | Controle de versão e entrega do projeto final. |

---

## 📂 Estrutura do Projeto

A organização das pastas segue as boas práticas para facilitar a manutenção e o desenvolvimento:

. ├── assets/ │ ├── css/ │ │ └── style.css // Todo o CSS do projeto │ ├── images/ // Imagens do projeto e cards de projetos │ └── js/ │ └── script.js // Lógica SPA, renderização e máscaras ├── index.html // Página principal e base do SPA (contém o <template>) ├── projetos.html // Conteúdo principal injetado pelo SPA (<main>) ├── cadastro.html // Conteúdo principal injetado pelo SPA (<main>) ├── contato.html // Conteúdo principal injetado pelo SPA (<main>) └── README.md // Documentação Técnica (este arquivo)


---

## ⚙️ Como Executar o Projeto Localmente

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/rubia-cavalcante/site-ong-sos-patas-css.git](https://github.com/rubia-cavalcante/site-ong-sos-patas-css.git)
    ```
2.  **Entre na Pasta:**
    ```bash
    cd site-ong-sos-patas-css
    ```
3.  **Abra:** Simplesmente abra o arquivo `index.html` em seu navegador ou use uma extensão de servidor local (como o Live Server do VS Code).

---

## 🤝 Contribuições (Registro de Versionamento)

Este projeto segue um histórico de *commits* organizado para facilitar a colaboração e rastreamento de mudanças.

| Tipo de Commit | Exemplo de Uso |
| :--- | :--- |
| **feat:** | Implementação de uma nova funcionalidade (ex: `feat: Implementação do sistema SPA básica`). |
| **fix:** | Correção de um bug (ex: `fix: Corrigido erro 404 ao carregar projetos`). |
| **style:** | Alterações relacionadas a formatação ou estilos (ex: `style: Ajuste na quebra de linha do rodapé`). |
| **refactor:** | Refatoração de código sem mudança de funcionalidade. |
| **docs:** | Alterações na documentação (ex: `docs: Atualização do README`). |
