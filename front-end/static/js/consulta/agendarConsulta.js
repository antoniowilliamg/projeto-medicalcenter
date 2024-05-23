document.getElementById("consultaForm").addEventListener("submit", function(event){
    event.preventDefault();

    let cdMedico = document.getElementById("cdMedico").value;
    let cdPaciente = document.getElementById("cdPaciente").value;
    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;
    let motivoConsulta = document.getElementById("motivoConsulta").value;
    cadastrarMedico(cdMedico, cdPaciente, data, hora, motivoConsulta);
});
 
async function cadastrarMedico(cdMedico, cdPaciente, data, hora, motivoConsulta) {
    let body = {
        medico: {
                cdMedico: parseInt(cdMedico)
            },
            paciente: {
                cdPaciente: parseInt(cdPaciente)
            },
            data: data,
            hora: hora,
            motivoConsulta: motivoConsulta
        };
    try {
        const response = await fetch(`http://localhost:8080/consultas`, 
                                    {method: "POST",
                                    headers: {"Content-type": "application/json"},
                                    body: JSON.stringify(body)});

        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/consulta/listagemConsulta.html';

    } catch (error) {
        console.log('Error: ' + error);
        popUpErro('Erro ao salvar consulta, entre em contato com o administrador');
    }
}
