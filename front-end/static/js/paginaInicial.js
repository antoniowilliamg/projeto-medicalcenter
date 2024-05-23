document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;

    
    if (email === "a.williamgv@gmail.com") {
        
        document.getElementById("error-message").innerText = "Um e-mail de recuperação foi enviado para o endereço fornecido.";
    } else {
        
        document.getElementById("error-message").innerText = "O e-mail fornecido não está registrado.";
    }
});