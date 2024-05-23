document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cdPaciente = urlParams.get('cdPaciente');

    if (cdPaciente) {
        buscarPaciente(cdPaciente);
    } else {
        console.error('ID do paciente não encontrado na URL.');
    }

    document.getElementById("paciente-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let nome = document.getElementById("nome").value;
        let cpf = document.getElementById("cpf").value;
        let dataNascimento = document.getElementById("dataNascimento").value;
        let endereco = document.getElementById("endereco").value;
        let cep = document.getElementById("cep").value;
        let email = document.getElementById("email").value;
        let telefone = document.getElementById("telefone").value;
        editarPaciente(cdPaciente, nome, cpf, dataNascimento, endereco, cep, email, telefone);
    });
});

async function buscarPaciente(cdPaciente) {
    try {
        const response = await fetch(`http://localhost:8080/pacientes/${cdPaciente}`);
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        const paciente = await response.json();
        preencherFormulario(paciente);
    } catch (error) {
        console.error('Erro ao buscar paciente:', error);
        alert('Erro ao buscar paciente');
    }
}

function preencherFormulario(paciente) {
    document.getElementById("nome").value = paciente.nome;
    document.getElementById("cpf").value = paciente.cpf;
    document.getElementById("dataNascimento").value = paciente.dataNascimento;
    document.getElementById("endereco").value = paciente.endereco;
    document.getElementById("cep").value = paciente.cep;
    document.getElementById("email").value = paciente.email;
    document.getElementById("telefone").value = paciente.telefone;
}

async function editarPaciente(cdPaciente, nome, cpf, dataNascimento, endereco, cep, email, telefone) {
    let body = {
        cdPaciente,
        nome,
        cpf,
        dataNascimento,
        endereco,
        cep,
        email,
        telefone
    };
    try {
        const response = await fetch(`http://localhost:8080/pacientes`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/paciente/listagemPaciente.html';
    } catch (error) {
        console.error('Erro ao salvar paciente:', error);
        alert('Erro ao salvar paciente, entre em contato com o administrador');
    }
}
