document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cdMedico = urlParams.get('cdMedico');

    if (cdMedico) {
        buscarMedico(cdMedico);
    } else {
        console.error('ID do médico não encontrado na URL.');
    }

    document.getElementById("medico-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let nome = document.getElementById("nome").value;
        let crm = document.getElementById("crm").value;
        let especialidade = document.getElementById("especialidade").value;
        let telefone = document.getElementById("telefone").value;
        let endereco = document.getElementById("endereco").value;
        let email = document.getElementById("email").value;
        let dataNascimento = document.getElementById("dataNascimento").value;
        let dataContratacao = document.getElementById("dataContratacao").value;
        editarMedico(cdMedico, nome, crm, especialidade, telefone, endereco, email, dataNascimento, dataContratacao);
    });
});

async function buscarMedico(cdMedico) {
    try {
        const response = await fetch(`http://localhost:8080/medicos/${cdMedico}`);
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        const medico = await response.json();
        preencherFormulario(medico);
    } catch (error) {
        console.error('Erro ao buscar médico:', error);
        alert('Erro ao buscar médico');
    }
}

function preencherFormulario(medico) {
    document.getElementById("nome").value = medico.nome;
    document.getElementById("crm").value = medico.crm;
    document.getElementById("especialidade").value = medico.especialidade;
    document.getElementById("telefone").value = medico.telefone;
    document.getElementById("endereco").value = medico.endereco;
    document.getElementById("email").value = medico.email;
    document.getElementById("dataNascimento").value = medico.dataNascimento;
    document.getElementById("dataContratacao").value = medico.dataContratacao;
}

async function editarMedico(cdMedico, nome, crm, especialidade, telefone, endereco, email, dataNascimento, dataContratacao) {
    let body = {
        cdMedico,
        nome,
        crm,
        especialidade,
        telefone,
        endereco,
        email,
        dataNascimento,
        dataContratacao
    };
    try {
        const response = await fetch(`http://localhost:8080/medicos`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/medico/listagemMedica.html';
    } catch (error) {
        console.error('Erro ao salvar médico:', error);
        alert('Erro ao salvar médico, entre em contato com o administrador');
    }
}
