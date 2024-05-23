document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cdConsulta = urlParams.get('cdConsulta');

    if (cdConsulta) {
        buscarConsulta(cdConsulta);
    } else {
        console.error('ID da consulta não encontrado na URL.');
    }

    document.getElementById("consultaForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let cdMedico = document.getElementById("cdMedico").value;
        let cdPaciente = document.getElementById("cdPaciente").value;
        let data = document.getElementById("data").value;
        let hora = document.getElementById("hora").value;
        let motivoConsulta = document.getElementById("motivoConsulta").value;

        reagendarConsulta(cdConsulta, cdMedico, cdPaciente, data, hora, motivoConsulta);
    });
});

async function buscarConsulta(cdConsulta) {
    try {
        const response = await fetch(`http://localhost:8080/consultas/${cdConsulta}`);
        
        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }

        const consulta = await response.json();

        // Preencher o formulário com os dados da consulta
        document.getElementById("cdMedico").value = consulta.medico.cdMedico;
        document.getElementById("cdPaciente").value = consulta.paciente.cdPaciente;
        document.getElementById("data").value = formatarData(consulta.data);
        document.getElementById("hora").value = consulta.hora;
        document.getElementById("motivoConsulta").value = consulta.motivoConsulta;

    } catch (error) {
        console.error('Erro ao buscar consulta: ' + error);
        popUpErro('Erro ao buscar consulta, entre em contato com o administrador');
    }
}

function formatarData(data) {
    const date = new Date(data);
    const ano = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

async function reagendarConsulta(cdConsulta, cdMedico, cdPaciente, data, hora, motivoConsulta) {
    let body = {
        cdConsulta: cdConsulta, 
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
        const response = await fetch(`http://localhost:8080/consultas`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Erro de Rede: ${response.statusText}`);
        }
        window.location.href = 'http://127.0.0.7:5500/templates/consulta/listagemConsulta.html';

    } catch (error) {
        console.log('Erro: ' + error);
        popUpErro('Erro ao reagendar consulta, entre em contato com o administrador');
    }
}

function popUpErro(mensagem) {
    alert(mensagem); // Substitua por sua implementação de pop-up de erro, se houver.
}
