  document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var email = document.getElementById("email").value;

        // Simulação de envio de e-mail de recuperação de senha
        if (email === "admin@example.com") {
            // Exibe mensagem de sucesso
            document.getElementById("error-message").innerText = "Um e-mail de recuperação foi enviado para o endereço fornecido.";
        } else {
            // Exibe mensagem de erro
            document.getElementById("error-message").innerText = "O e-mail fornecido não está registrado.";
        }
    });