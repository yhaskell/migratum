import * as fs from 'fs'
import { MIGRATUM_FOLDER, CONNECTION_FILE, MIGRATIONS_FILE } from './defines';
import { Migration } from './migration';
export function checkExists(path: string) {
    try {
        fs.statSync(path)
        return true
    } catch {
        return false
    }
}

export function checkExistsDirectory(path: string) {
    try {
        const stats = fs.statSync(path)
        return stats.isDirectory()
    } catch {
        return false
    }
}

export function fail(...args: any[]) {
    console.error(...args)
    process.exit(1)
    throw new Error(...args);
}

export function generateMigrationList() {
    return migrationsFile([])
}

export function getAvailableMigrations(): Migration[] {
    const migrationsJSON = fs.readFileSync(MIGRATIONS_FILE, 'utf-8')
    return JSON.parse(migrationsJSON).migrations
}

export function migrationsFile(migrations: Migration[]) {
    const json = { migrations }

    return JSON.stringify(json, null, 4)
}

export function getConnectionString(): string {
    const connStringJSON = fs.readFileSync(CONNECTION_FILE, 'utf-8')
    const { connectionString } = JSON.parse(connStringJSON)
    return connectionString
}


export function saveMigrations(migrations: Migration[]) {
    try {
        const config = migrationsFile(migrations)
        fs.writeFileSync(MIGRATIONS_FILE, config)
    } catch (err) {
        fail(`cannot write migrations: ${err}`)
    }
}
