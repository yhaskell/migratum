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
    const emptyList = {
        migrations: []
    }

    return JSON.stringify(emptyList, null, 4)
}

export function getAvailableMigrations(): Migration[] {
    const migrationsJSON = fs.readFileSync(MIGRATIONS_FILE, 'utf-8')
    return JSON.parse(migrationsJSON).migrations
}

export function getConnectionString() {
    const connStringJSON = fs.readFileSync(CONNECTION_FILE, 'utf-8')
    const { connectionString } = JSON.parse(connStringJSON)
    return connectionString
}