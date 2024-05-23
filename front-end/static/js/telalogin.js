document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

   
    if (username === "admin" && password === "123") {
        
        window.location.href = "http://127.0.0.7:5500/templates/paginaInicial.html";
    } else {
       
        document.getElementById("error-message").innerText = "Usuário ou senha inválidos. Por favor, tente novamente.";
    }
});