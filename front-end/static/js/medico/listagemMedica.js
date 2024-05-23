document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/medicos")
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById("medicos-table").getElementsByTagName('tbody')[0];
            data.forEach(medico => {
                let novaLinha = tabela.insertRow();
                novaLinha.innerHTML = `
                    <td>${medico.cdMedico}</td>
                    <td>${medico.nome}</td>
                    <td>${medico.crm}</td>
                    <td>${medico.especialidade}</td>
                    <td>${medico.telefone}</td>
                    <td>${medico.endereco}</td>
                    <td>${medico.email}</td>
                    <td>${medico.dataNascimento}</td>
                    <td>${medico.dataContratacao}</td>
                    <td>
                        <button class="edit-button">Editar</button>
                        <button class="delete-button">Excluir</button>
                    </td>
                `;
                novaLinha.querySelector('.edit-button').addEventListener('click', () => {
                    const cdMedico = medico.cdMedico;
                    window.location.href = `http://127.0.0.7:5500/templates/medico/editarCadastroMedico.html?cdMedico=${cdMedico}`;
                });

                novaLinha.querySelector('.delete-button').addEventListener('click', () => {
                    if (confirm("Tem certeza de que deseja excluir este médico?")) {
                        fetch(`http://localhost:8080/medicos/${medico.cdMedico}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Médico excluído com sucesso');
                                    novaLinha.remove();
                                } else {
                                    response.text().then(text => console.error(text));
                                }
                            })
                            .catch(error => console.error('Erro ao excluir médico:', error));
                    }
                });
            });
        })
        .catch(error => console.error('Erro ao buscar médicos:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    const cdMedico = obterParametroUrl('cdMedico');
    if (cdMedico) {
        buscarMedico(cdMedico);
    }

    document.getElementById("medico-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let nome = document.getElementById("nome").value;
        let crm = document.getElementById("crm").value;
        let especialidade = document.getElementById("especialidade").value;
        let telefone = document.getElementById("telefone").value;
        let email = document.getElementById("email").value;
        let dataNascimento = document.getElementById("dataNascimento").value;
        let dataContratacao = document.getElementById("dataContratacao").value;
        let endereco = document.getElementById("endereco").value;
        cadastrarMedico(nome, crm, especialidade, telefone, endereco, email, dataNascimento, dataContratacao,);
    });
});

function obterParametroUrl(param) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(param);
}

async function buscarMedico(cdMedico) {
    try {
        const response = await fetch(`http://localhost:8080/medicos/${cdMedico}`);
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        const medico = await response.json();
        preencheDadosMedico(medico);
    } catch (error) {
        console.error('Erro ao buscar médico:', error);
        alert('Erro ao buscar médico');
    }
}

async function cadastrarMedico(nome, crm, especialidade, telefone, endereco, email, dataNascimento, dataContratacao,) {
    let body = {
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
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/medico/listagemMedico.html';
    } catch (error) {
        console.error('Erro ao cadastrar médico:', error);
        alert('Erro ao cadastrar médico, entre em contato com o administrador');
    }
}

function preencheDadosMedico(medico) {
    document.getElementById("nome").value = medico.nome;
    document.getElementById("crm").value = medico.crm;
    document.getElementById("especialidade").value = medico.especialidade;
    document.getElementById("telefone").value = medico.telefone;
    document.getElementById("endereco").value = medico.endereco;
    document.getElementById("email").value = medico.email;
    document.getElementById("dataNascimento").value = medico.dataNascimento;
    document.getElementById("dataContratacao").value = medico.dataContratacao;
    
}
