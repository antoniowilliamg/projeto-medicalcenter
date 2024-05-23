document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/pacientes")
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById("pacientes-table").getElementsByTagName('tbody')[0];
            data.forEach(paciente => {
                let novaLinha = tabela.insertRow();
                novaLinha.innerHTML = `
                    <td>${paciente.cdPaciente}</td>
                    <td>${paciente.nome}</td>
                    <td>${paciente.cpf}</td>
                    <td>${paciente.dataNascimento}</td>
                    <td>${paciente.endereco}</td>
                    <td>${paciente.cep}</td>
                    <td>${paciente.email}</td>
                    <td>${paciente.telefone}</td>
                    <td>
                        <button class="edit-button">Editar</button>
                        <button class="delete-button">Excluir</button>
                    </td>
                `;
                novaLinha.querySelector('.edit-button').addEventListener('click', () => {
                    const cdPaciente = paciente.cdPaciente;
                    window.location.href = `http://127.0.0.7:5500/templates/paciente/editarCadastroPaciente.html?cdPaciente=${cdPaciente}`;
                });

                novaLinha.querySelector('.delete-button').addEventListener('click', () => {
                    if (confirm("Tem certeza de que deseja excluir este paciente?")) {
                        fetch(`http://localhost:8080/pacientes/${paciente.cdPaciente}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Paciente excluído com sucesso');
                                    novaLinha.remove();
                                } else {
                                    response.text().then(text => console.error(text));
                                }
                            })
                            .catch(error => console.error('Erro ao excluir paciente:', error));
                    }
                });
            });
        })
        .catch(error => console.error('Erro ao buscar pacientes:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    const cdMedico = obterParametroUrl('cdPaciente');
    if (cdPaciente) {
        buscarPaciente(cdPaciente);
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
        cadastrarPaciente(nome, cpf, dataNascimento, endereco, cep, email, telefone);
    });
});

function obterParametroUrl(param) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(param);
}

async function buscarPaciente(cdPaciente) {
    try {
        const response = await fetch(`http://localhost:8080/pacientes/${cdPaciente}`);
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        const paciente = await response.json();
        preencheDadosPaciente(paciente);
    } catch (error) {
        console.error('Erro ao buscar paciente:', error);
        alert('Erro ao buscar paciente');
    }
}

async function cadastrarPaciente(nome, cpf, dataNascimento, endereco, cep, email, telefone) {
    let body = {
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
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/paciente/listagemPaciente.html';
    } catch (error) {
        console.error('Erro ao cadastrar paciente:', error);
        alert('Erro ao cadastrar paciente, entre em contato com o administrador');
    }
}

function preencheDadosPaciente(paciente) {
    document.getElementById("nome").value = paciente.nome;
    document.getElementById("cpf").value = paciente.cpf;
    document.getElementById("dataNascimento").value = paciente.dataNascimento;
    document.getElementById("endereco").value = paciente.endereco;
    document.getElementById("cep").value = paciente.cep;
    document.getElementById("email").value = paciente.email;
    document.getElementById("telefone").value = paciente.telefone;
}
