// Elementos do carrinho
const abrirCarrinhoBtn = document.getElementById('cart-flutuante');
const carrinhoPopup = document.getElementById('cart-painel');
const carrinhoConteudo = document.getElementById('cart-items-flutuante');
const carrinhoTotalEl = document.getElementById('cart-total-flutuante');
const contadorCarrinho = document.getElementById('cart-count');

// Abertura e fechamento do carrinho
if (abrirCarrinhoBtn) {
  abrirCarrinhoBtn.addEventListener('click', () => {
    if (carrinhoPopup.classList.contains('aberto')) {
      fecharCarrinho();
    } else {
      mostrarCarrinho();
    }
  });
}

function mostrarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinhoConteudo.innerHTML = '';

  if (carrinho.length === 0) {
    carrinhoConteudo.innerHTML = '<p>Seu carrinho está vazio 😢</p>';
    carrinhoTotalEl.textContent = '';
    if (contadorCarrinho) contadorCarrinho.innerText = 0;
    carrinhoPopup.classList.add('aberto');
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const divItem = document.createElement('div');
    divItem.classList.add('item');
    divItem.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <strong>${item.nome}</strong>
      <br>Preço unitário: R$ ${item.preco.toFixed(2)}
      <br>Quantidade: <input type="number" min="1" value="${item.quantidade}" onchange="alterarQuantidade(${index}, this.value)" />
      <button onclick="removerProduto(${index})">Remover</button>
    `;
    carrinhoConteudo.appendChild(divItem);
  });

  carrinhoTotalEl.textContent = `Total: R$ ${total.toFixed(2)}`;

  const count = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  if (contadorCarrinho) contadorCarrinho.innerText = count;

  carrinhoPopup.classList.add('aberto');
}

function fecharCarrinho() {
  carrinhoPopup.classList.remove('aberto');
}

function alterarQuantidade(index, novaQuantidade) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  novaQuantidade = parseInt(novaQuantidade);
  if (novaQuantidade < 1 || isNaN(novaQuantidade)) {
    alert('Quantidade inválida!');
    mostrarCarrinho();
    return;
  }
  carrinho[index].quantidade = novaQuantidade;
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarCarrinho();
}

function removerProduto(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  mostrarCarrinho();
}

function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Compra finalizada com sucesso! 🪄✨');
  localStorage.removeItem('carrinho');
  mostrarCarrinho();
}

// Atualiza contador do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const count = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  if (contadorCarrinho) contadorCarrinho.innerText = count;
});
