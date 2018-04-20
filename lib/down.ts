import { getConnectionString, fail } from "./utils"
import { init } from "./connect"
import { getMigrationList } from "./list"
import { readMigration, tryApplyMigration } from "./apply"

export async function down(migration: string) {
    const connString = getConnectionString()
    const connection = await init(connString)

    const { available, toApply, outOfOrder } = await getMigrationList(connection)

    if (outOfOrder) {
        fail("Some migrations are applied out of order. Apply them manually")
    }

    if (!available.find(m => m.name === migration)) {
        fail(`Couldn't find migration ${name}`)
    }

    for (const { name } of available.reverse()) {
        if (name === migration) break
        if (toApply[name]) continue
        console.log(`${name}...`)
        const text = readMigration(name, 'down')
        await tryApplyMigration(connection, name, text, 'down')
    }

    process.exit(0)
}
