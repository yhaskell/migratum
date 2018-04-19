import * as fs from 'fs'
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