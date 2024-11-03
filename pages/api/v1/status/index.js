import database from "infra/database.js";

async function status(request, response) {
  console.log(database);
  response.status(200).send({ chave: "valor" });
}

export default status;
