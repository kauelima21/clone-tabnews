import database from "../../../../infra/database.js";

async function status(request, response) {
  response.status(200).send({ chave: "valor" });
}

export default status;
