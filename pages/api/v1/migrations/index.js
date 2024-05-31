import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";
import db from "node-pg-migrate/dist/db";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  let migrationRunnerConfig = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const migrations = await migrationRunner(migrationRunnerConfig);
    await dbClient.end();

    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...migrationRunnerConfig,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}
