import { fail, getConnectionString, getAvailableMigrations } from "./utils"
import { init } from "./connect"
import { readFileSync } from "fs"
import { MIGRATUM_FOLDER } from "./defines"
import { Connection } from "./connection";

function readMigration(name: string, direction: 'up' | 'down') {
    try {
        return readFileSync(`${MIGRATUM_FOLDER}/${name}/${direction}`, 'utf-8')
    } catch (err) {
        fail(`Couldn't read migration file ${name}/${direction}:`, err.message)
        throw err
    }
}

async function tryApplyMigration(connection: Connection, name: string, text: string) {
    try {
        return await connection.applyMigration(name, text)
    } catch (err) {
        fail(`Couldn't apply migration ${name}: ${err.message}`)
    }
}

export async function apply(migration: string, direction: string) {
    if (direction !== 'up' && direction !== 'down') {
        return fail("direction should either up or down")
    }
    const connString = getConnectionString()
    const connection = await init(connString)

    const migrations = getAvailableMigrations()
    const found = migrations.find(m => m.name === migration)

    if (!found) {
        fail(`Couldn't find migration ${migration}`)
    }

    const text = readMigration(migration, direction)

    await tryApplyMigration(connection, migration, text)

    process.exit(0)
}