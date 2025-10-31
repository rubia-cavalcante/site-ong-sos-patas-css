// =========================================================
// MÓDULO DE DADOS
// =========================================================
const dadosProjetos = [
    { id: 1, titulo: "Resgate Imediato (Resgate)", descricao: "Foco na recuperação e tratamento inicial de animais em situação de risco.", categoria: "Resgate", imagem: "assets/images/cachorro-resgate.jpg" },
    { id: 2, titulo: "Programa Família Feliz (Adoção)", descricao: "Conecta animais reabilitados a famílias responsáveis, com acompanhamento pós-adoção.", categoria: "Adoção", imagem: "assets/images/adocao-familia.jpg" },
    { id: 3, titulo: "Voluntário na Escola (Educação)", descricao: "Ações de conscientização e educação em escolas públicas sobre guarda responsável.", categoria: "Educação", imagem: "assets/images/crianca-cachorro.jpg" },
    { id: 4, titulo: "Campanha de Vacinação", descricao: "Iniciativa anual para garantir a saúde e imunização de animais de rua e resgatados.", categoria: "Saúde", imagem: "assets/images/cachorro.jpg" },
];


// =========================================================
// RENDERIZAÇÃO DE TEMPLATES
// =========================================================
function renderProjects(containerSelector) {
    const container = document.querySelector(containerSelector);
    const template = document.getElementById('projeto-template');
    
    if (!container || !template) return; 

    container.innerHTML = ''; 

    dadosProjetos.forEach(projeto => {
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.card-imagem').src = projeto.imagem; 
        clone.querySelector('.card-imagem').alt = `Imagem do projeto: ${projeto.titulo}`;
        clone.querySelector('.card-titulo').textContent = projeto.titulo;
        clone.querySelector('.card-descricao').textContent = projeto.descricao;
        clone.querySelector('.card-badge').textContent = projeto.categoria;
        clone.querySelector('.botao-principal').href = `#projeto-${projeto.id}`; 
        
        container.appendChild(clone);
    });
}


// =========================================================
// MÁSCARAS DE INPUT
// =========================================================
function applyMasks() {
    // Máscara CPF: 000.000.000-00 
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/^(\d{3})(\d)/, "$1.$2");
            value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
            value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
            e.target.value = value.substring(0, 14);
        });
    }

    // Máscara Telefone: (00) 90000-0000 
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            if (value.length > 9) { 
                 value = value.replace(/(\d{5})(\d)/, "$1-$2");
            } else {
                 value = value.replace(/(\d{4})(\d)/, "$1-$2");
            }
            e.target.value = value.substring(0, 15); 
        });
    }

    // Máscara CEP: 00000-000 
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
            e.target.value = value.substring(0, 9);
        });
    }
}


// =========================================================
// SPA BÁSICO
// =========================================================
const container = document.getElementById('spa-container');
const menuDropdown = document.querySelector('.dropdown');

function updateActiveLink(pageName) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        // Usa includes para garantir que links do dropdown também ativem o pai
        if (link.getAttribute('href').includes(pageName)) {
            link.classList.add('active');
        }
    });
}

async function loadContent(pageName) {
    if (!container) return;
    
    // Nome do arquivo (ex: projetos.html, cadastro.html)
    const fileName = pageName === 'index' ? 'index.html' : `${pageName}.html`;
    
    try {
        const response = await fetch(fileName);
        
        if (!response.ok) {
             throw new Error(`Arquivo não encontrado (Status: ${response.status})`);
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        let newMainContent;
        if (pageName === 'index') {
            // Para index, carrega apenas o conteúdo da seção inicial
            const initialSection = doc.querySelector('#institucional');
            newMainContent = initialSection ? initialSection.outerHTML : "<h2>Conteúdo Inicial Ausente</h2>";
        } else {
             // Para outros, carrega todo o conteúdo DENTRO da tag <main>
            const mainContent = doc.querySelector('main');
            if (mainContent) {
                newMainContent = mainContent.innerHTML;
            } else {
                throw new Error("Conteúdo principal (<main>) não encontrado no arquivo HTML injetado.");
            }
        }
        
        container.innerHTML = newMainContent;
        
        // Atualiza a URL e o histórico
        history.pushState(null, '', pageName === 'index' ? '/' : `/${pageName}.html`);
        
        // Fecha o menu mobile e atualiza link ativo
        document.body.classList.remove('menu-open');
        updateActiveLink(pageName);

        // EXECUÇÃO DE FUNÇÕES ESPECÍFICAS
        if (pageName === 'projetos') {
            renderProjects('.cards-container');
        } else if (pageName === 'cadastro') {
            applyMasks();
        }

    } catch (error) {
        console.error(`Erro fatal ao carregar a página ${fileName}:`, error);
        container.innerHTML = `<section><h2>Erro 404</h2><p>Não foi possível carregar a página <b>${pageName}</b>. Verifique se o arquivo <b>${fileName}</b> existe na pasta raiz e se o seu conteúdo está dentro da tag &lt;main&gt;.</p></section>`;
    }
}


// =========================================================
// EVENT LISTENERS
// =========================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Menu Hambúrguer (Abre/Fecha)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // 2. Dropdown do Menu (Alternar no Mobile/Clique)
    if (menuDropdown) {
        menuDropdown.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault(); 
                menuDropdown.classList.toggle('open');
            }
        });
    }

    // 3. Captura de Cliques para Roteamento SPA
    document.body.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        
        // Roteamento SPA: Link que aponta para um arquivo .html na mesma origem e NÃO é âncora interna (#)
        if (link && link.href.startsWith(window.location.origin) && link.pathname.endsWith('.html') && !link.hash) {
            event.preventDefault(); 
            const urlPath = link.pathname.split('/').pop();
            const pageName = urlPath.replace('.html', '');
            
            loadContent(pageName);
        }
        
        // Roteamento Âncora (para links como #adote dentro de projetos.html)
        if (link && link.hash && link.closest('#spa-container')) {
            // Fecha o menu mobile após o clique em âncora
            document.body.classList.remove('menu-open');
        }
        
        // Fecha o menu mobile ao clicar em qualquer link de navegação
        if (link && (link.classList.contains('nav-link') || link.classList.contains('nav-link-sub'))) {
             document.body.classList.remove('menu-open');
             if (menuDropdown) menuDropdown.classList.remove('open');
        }
    });

    // 4. Lógica para carregar a página correta na primeira vez (ou ao recarregar)
    const initialPath = window.location.pathname.split('/').pop();
    const initialPage = initialPath.includes('.html') 
        ? initialPath.replace('.html', '') 
        : 'index';

    loadContent(initialPage);
});