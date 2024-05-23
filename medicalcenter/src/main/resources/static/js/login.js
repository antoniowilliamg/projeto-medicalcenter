 document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Validação de usuário e senha
        if (username === "admin" && password === "admin") {
            // Redireciona para a página de sucesso
            window.location.href = "pagina.html";
        } else {
            // Exibe mensagem de erro
            document.getElementById("error-message").innerText = "Usuário ou senha inválidos. Por favor, tente novamente.";
        }
    });