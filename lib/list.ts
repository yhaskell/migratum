import { checkExistsDirectory, getConnectionString, getAvailableMigrations } from "./utils"
import { MIGRATUM_FOLDER } from "./defines"
import { init } from "./connect"
import chalk from 'chalk'

export async function list() {
    if (!checkExistsDirectory(MIGRATUM_FOLDER)) {
        throw new Error("Not a migratum project")
    }
    const connString = getConnectionString()
    const connection = await init(connString)

    const available = getAvailableMigrations()
    const applied = await connection.migrationsList()

    let outOfOrder = false
    let found = false

    const toApply: { [key: string]: boolean } = available.reduce((p, m) => ({ ...p, [m.name]: true }), {})
    applied.forEach(u => toApply[u] = false)

    let changed = false
    let warn = false
    for (const migration of available) {
        const fn = toApply[migration.name] ? chalk.green : chalk.grey
        console.log(fn(migration.name), `\t\t${migration.description}`)
        if (toApply[migration.name]) changed = true
        else if (changed) warn = true
    }

    if (warn) {
        console.warn('warning: some migrations are applied out of order. please apply them manually before doing migratum up')
    }

    process.exit(0)
}