<?php
// 1. Conectar com banco de dados (ajuste os dados se precisar)
$servername = "localhost";
$username = "root";
$password = "";
$database = "loja_impossivel";

$conn = new mysqli($servername, $username, $password, $database);

// 2. Verificar conexão
if ($conn->connect_error) {
  die("Conexão falhou: " . $conn->connect_error);
}

// 3. Coletar dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$endereco = $_POST['endereco'];
$produtos = $_POST['produtos'];
$total = $_POST['total'];

// 4. Inserir no banco
$sql = "INSERT INTO pedidos (nome, email, telefone, endereco, produtos, total)
        VALUES ('$nome', '$email', '$telefone', '$endereco', '$produtos', '$total')";

if ($conn->query($sql) === TRUE) {
  echo "<h1>Pedido realizado com sucesso! 🧙‍♂️✨</h1>";
} else {
  echo "Erro ao salvar pedido: " . $conn->error;
}

$conn->close();
?>
