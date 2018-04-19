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
}

export function generateConfig() {
    const defaultConfig = {
        type: "postgres",
        connection: {
            hostname: "localhost",
            port: 5432,
            user: "postgres",
            password: ""
        }
    }
    return JSON.stringify(defaultConfig, undefined, 4)
}
