
document.getElementById("paciente-form").addEventListener("submit", function(event){
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
 
async function cadastrarPaciente(nome, cpf, dataNascimento, endereco, cep, email, telefone) {
    let body = {
        "nome": nome,
        "cpf": cpf,
        "dataNascimento": dataNascimento,
        "endereco": endereco,
        "cep": cep,
        "email": email,
        "telefone": telefone,
    };
    try {
        const response = await fetch(`http://localhost:8080/pacientes`, 
                                    {method: "POST",
                                    headers: {"Content-type": "application/json"},
                                    body: JSON.stringify(body)});

        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/paciente/listagemPaciente.html';

    } catch (error) {
        console.log('Error: ' + error);
        popUpErro('Erro ao salvar paciente, entre em contato com o administrador');
    }
}