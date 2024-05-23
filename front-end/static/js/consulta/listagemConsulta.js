async function carregarConsultas() {
    try {
        const response = await fetch('http://localhost:8080/consultas');
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar consultas: ${response.statusText}`);
        }

        const consultas = await response.json();
        const consultasTable = document.getElementById('consultasTable').getElementsByTagName('tbody')[0];
        
        for (const consulta of consultas) {
            const medicoPromise = buscarMedico(consulta.medico.cdMedico);
            const pacientePromise = buscarPaciente(consulta.paciente.cdPaciente);
            
            const [medico, paciente] = await Promise.all([medicoPromise, pacientePromise]);

            const row = consultasTable.insertRow();
            row.innerHTML = `
                <td>${consulta.cdConsulta}</td>
                <td>${consulta.medico.cdMedico}</td>
                <td>${medico.nome}</td>
                <td>${medico.crm}</td>
                <td>${medico.especialidade}</td>
                <td>${consulta.paciente.cdPaciente}</td>
                <td>${paciente.nome}</td>
                <td>${paciente.cpf}</td>
                <td>${formatarData(paciente.dataNascimento)}</td>
                <td>${formatarData(consulta.data)}</td>
                <td>${formatarHora(consulta.hora)}</td>
                <td>${consulta.motivoConsulta}</td>
                <td>
                    <button class="edit-button">Reagendar Consulta</button>
                </td>
            `;

            row.querySelector('.edit-button').addEventListener('click', () => {
                const cdConsulta = consulta.cdConsulta;
                window.location.href = `http://127.0.0.7:5500/templates/consulta/reagendarConsulta.html?cdConsulta=${cdConsulta}`;
            });
        }
    } catch (error) {
        console.error('Erro ao carregar consultas:', error);
        alert('Erro ao carregar consultas');
    }
}

async function buscarMedico(cdMedico) {
    try {
        const response = await fetch(`http://localhost:8080/medicos/${cdMedico}`);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar médico: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar médico:', error);
        throw error;
    }
}

async function buscarPaciente(cdPaciente) {
    try {
        const response = await fetch(`http://localhost:8080/pacientes/${cdPaciente}`);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar paciente: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar paciente:', error);
        throw error;
    }
}

// Formatar a data no formato dd/mm/aaaa
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // January is 0!
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Formatar a hora no formato hh:mm
function formatarHora(hora) {
    const horaObj = new Date(`2000-01-01T${hora}`);
    const horaFormatada = horaObj.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    return horaFormatada;
}

// Chama a função para carregar as consultas ao carregar a página
carregarConsultas();
