# First time using next JS

<img src="./github/nextjs.jpeg" width="400px" alt="Logo do frame work next JS" align="right"/>

## Vantagens

- Sistema de navegação entre páginas (exclue a necessidade de usar o react router dom)
- Capacidade para fazer construções de páginas no <i>client side</i> ou <i>server side</i>
- Alternativa para melhores resultados de SEO

<br>

## Instalação

#### Usando javascript

```
npx create-next-app@latest
```

#### Usando typescript

```
npx create-next-app@latest --ts
```

### Iniciando o projeto

```
npm run dev
```

Ao usar o react puro, a renderização é feita automaticamente no lado do cliente, como se fosse um app criado com <i>create react app</i>

## Requisição simples renderizada no lado do cliente

```
import axios from "axios";
import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = await response.data;

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
export default Users;

```

Um problema é que no código fonte, não vem o html pronto, pois a renderização ocorreu em run time no lado do cliente, afetando o SEO na página.
A mesma renderização agora no lado do servidor:

```
import axios from "axios";

const Users = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
export default Users;

export async function getServerSideProps(context) {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const data = await response.data;

  return {
    props: { users: data },
  };
}

```

Dessa forma, trazemos para a página web já o html pronto, que vai ajudar em muito na avaliação do SEO da página.

Porém o next.js também renderiza páginas estáticas, antes de prosseguir só um <i>disclaimer</i>

- SSR: ele atua no tempo de execução, ou seja, a todo momento que for requisitado, ele irá no servidor para buscar as informações.

- SSG: ele atua no momento de build, ou seja, geração da página, ele já entrega para o browser uma página estática, com o html completo (assim como no SSR).

<br>

No SSG (Static Site Generation) - as páginas ficam salva em um servidor CDN, ao fazer a request, ele apenas devolve o html, sem a necessidade do javascript para 'montar' a página

Antes de continuar com o SSG, é preciso explicar o que são rotas dinâmicas no next.js

<br>

Este componente, perceba que foi usado [] ao redor do arquivo, isso indica que este arquivo é mutável, por exemplo, um item de uma lista de produtos de e-commerce, que poderá ser diferente de acordo com o produto que o cliente escolheu.

<img src="./github/rotas_dinamicas.png" align="right" width="300px" alt="exemplo de rota dinamica">

```
import { useRouter } from "next/dist/client/router";

const Profile = () => {
  const router = useRouter();
  console.log(router);

  return <h1>Profile</h1>;
};

export default Profile;
```

Ao dar console.log, temos o seguinte resultado, lembre-se que a url está dessa maneira:

```
http://localhost:3000/profile/1
```

<img src="./github/useRouter.png" align="right" width="500px" alt="exemplo de rota dinamica">

<br>

Note, que no final, em query.id, temos o mesmo valor passado na URL acima id = 1

<br>

<b>Importante</b>

<br>

<p>Se quisermos passar o nome do item do nosso e-commerce, utilizaremos o hook `useRouter` <br> e a partir disso, poderemos salvar o dado em uma variável:<br>

```
const router = useRouter();
const data = router.query.id;
console.log(data);
```

<br> A partir desse data, podemos fazer uma nova requisição, por exemplo.<br></p>

Voltando ao exemplo, o método <i>getStaticProps</i> é uma outra maneira de pegar dados do servidor, segue o código:

<center><img src="./github/getStaticProps.png"  width="700px" alt="exemplo de uso do getStaticProps">
</center>

Perceba que sintaticamente, é bem similar, mas há uma diferença muito importante. Se você tentar rodar esse código em uma rota dinâmica, como no nosso exemplo `[id].js`
<br> E faz sentido dar erro concorda? Afinal você quer renderizar uma página dinâmica como estática???

Mas para esse problema também há solução, usando o famoso `getStaticPaths`
