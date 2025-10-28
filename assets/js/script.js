// Este é o esqueleto inicial. Para máscaras robustas (CPF, CEP, Telefone), 
// é altamente recomendável usar uma biblioteca JS como 'imask.js'
// ou 'jQuery Mask Plugin' para evitar bugs.

document.addEventListener('DOMContentLoaded', () => {
    
    const inputTelefone = document.getElementById('telefone');

    if (inputTelefone) {
        // Função para formatar o telefone (exemplo simplificado)
        // (00) 0000-0000 ou (00) 00000-0000
        const formatarTelefone = (valor) => {
            valor = valor.replace(/\D/g, ""); // Remove tudo que não é dígito
            if (valor.length > 0) {
                valor = "(" + valor;
            }
            if (valor.length > 3) {
                valor = valor.substring(0, 3) + ") " + valor.substring(3);
            }
            // 9 dígitos para celular, 8 para fixo
            if (valor.length > 9) {
                if (valor.length === 11) { // Celular 9XXXX-XXXX
                    valor = valor.substring(0, 10) + "-" + valor.substring(10, 14);
                } else { // Fixo 4XXXX-XXXX ou 5XXXX-XXXX
                    valor = valor.substring(0, 9) + "-" + valor.substring(9, 13);
                }
            }
            return valor;
        };

        inputTelefone.addEventListener('input', (event) => {
            event.target.value = formatarTelefone(event.target.value);
        });
    }

    // Ações de validação de formulário ou outras interações aqui.

    // Exemplo: Função para validar se o CPF é válido (apenas dígitos) antes de enviar
    const formCadastro = document.querySelector('form');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            const inputCpf = document.getElementById('cpf');
            // Nota: O pattern já faz uma validação básica.
            // Aqui você adicionaria uma validação de algoritmo de CPF, se necessário.

            // if (!validarCpf(inputCpf.value)) {
            //     alert('CPF inválido!');
            //     event.preventDefault();
            // }
        });
    }
    
});
