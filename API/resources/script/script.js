
let series = [];

const container = document.getElementById("series");
const pesquisa = document.getElementById("pesquisa");

// Buscar séries na API
fetch("https://api.tvmaze.com/shows?page=0")
.then(res => {
if (!res.ok) {
throw new Error("Erro ao buscar as séries");
}
return res.json();
})
    .then(dados => {
series = dados;
mostrar(series.slice(0, 10));
    })
.catch(erro => {
container.innerHTML = "<p>Erro ao carregar as séries. Tente novamente!</p>";
console.error(erro);
    });

// Mostrar séries na tela
function mostrar(lista) {

container.innerHTML = "";

if (lista.length === 0) {
container.innerHTML = "<p>Nenhuma série encontrada!</p>";
 return;
}

    lista.forEach(item => {

const imagem = item.image
? item.image.medium
: "https://via.placeholder.com/180x250?text=Sem+Imagem";

const nota = item.rating.average || "Sem nota";

container.innerHTML += `
<div class="card">
<img src="${imagem}" alt="Imagem da série ${item.name}">
<h2>${item.name}</h2>
<p><strong>Estreia:</strong> ${item.premiered || "Sem data"}</p>
<p><strong>Nota:</strong> ${nota}</p>

<p><strong>Gênero:</strong> ${item.genres.join(", ") || "Não informado"}</p>
</div>
 `;
});
}

// Pesquisar séries
pesquisa.addEventListener("input", function () {

const texto = this.value.toLowerCase().trim();

const resultado = series.filter(item =>
item.name.toLowerCase().includes(texto)
    );

    mostrar(resultado.slice(0, 10));
});
