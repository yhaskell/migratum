import { getConnectionString, fail } from "./utils"
import { init } from "./connect"
import { getMigrationList } from "./list"
import { readMigration, tryApplyMigration } from "./apply"

export async function up(migration?: string) {
    const connString = getConnectionString()
    const connection = await init(connString)

    const { available, toApply, outOfOrder } = await getMigrationList(connection)

    if (outOfOrder) {
        fail("Some migrations are applied out of order. Apply them manually")
    }

    if (typeof migration !== 'undefined' && !available.find(m => m.name === migration)) {
        fail(`Couldn't find migration ${name}`)
    }

    for (const { name } of available) {
        if (!toApply[name]) continue
        console.log(`${name}...`)
        const text = readMigration(name, 'up')
        await tryApplyMigration(connection, name, text, 'up')
        if (name === migration) break
    }

    process.exit(0)
}
