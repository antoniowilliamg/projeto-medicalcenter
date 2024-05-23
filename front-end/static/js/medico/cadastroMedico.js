
document.getElementById("medico-form").addEventListener("submit", function(event){
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let crm = document.getElementById("crm").value;
    let especialidade = document.getElementById("especialidade").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;
    let email = document.getElementById("email").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let dataContratacao = document.getElementById("dataContratacao").value;
    cadastrarMedico(nome, crm, especialidade, telefone, endereco, email, dataNascimento, dataContratacao);
});
 
async function cadastrarMedico(nome, crm, especialidade, telefone, endereco, email, dataNascimento, dataContratacao) {
    let body = {
        "nome": nome,
        "crm": crm,
        "especialidade": especialidade,
        "telefone": telefone,
        "endereco": endereco,
        "email": email,
        "dataNascimento": dataNascimento,
        "dataContratacao": dataContratacao
    };
    try {
        const response = await fetch(`http://localhost:8080/medicos`, 
                                    {method: "POST",
                                    headers: {"Content-type": "application/json"},
                                    body: JSON.stringify(body)});

        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/medico/listagemMedica.html';

    } catch (error) {
        console.log('Error: ' + error);
        popUpErro('Erro ao salvar medico, entre em contato com o administrador');
    }
}