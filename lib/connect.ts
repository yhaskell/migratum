import { fail, checkExistsDirectory } from "./utils"
import { Connection, ConnectionInit } from "./connection"
import { writeFileSync } from "fs";
import { CONNECTION_FILE, MIGRATUM_FOLDER } from "./defines";

export function getProtocol(connString: string) {
    const protoColon = connString.indexOf('://')
    

    if (protoColon === -1) {
        fail("incorrect connection url")
        throw new Error()   
    }

    return connString.substr(0, protoColon)
}

export function getDriver(moduleName: string): ConnectionInit {
    try {
        const { init } = require(moduleName)
        return init
    } catch (err) {
        fail(`driver ${moduleName} is not installed`)
        throw err
    }
}

export async function initConnection(moduleName: string, connString: string) {
    const init = getDriver(moduleName)
    try {
        return await init(connString)
    } catch (err) {
        fail("Cannot connect to database", err)
        throw err
    }
}

function saveConnectionString(connectionString: string) {
    if (!checkExistsDirectory(MIGRATUM_FOLDER)) {
        fail(`it appears you're trying to connect in a folder without migratum initialized`)
    }
    try {   
        writeFileSync(CONNECTION_FILE, JSON.stringify({ connectionString }, undefined, 4))
    } catch (err) {
        fail(`Couldn't write a connection string to a file: `, err.message)
    }
}

export async function init(connString: string) {
    const protocol = getProtocol(connString)
    const moduleName = `migratum-${protocol}`

    return await initConnection(moduleName, connString)
}

export async function connect(connString: string) {
    const connection = await init(connString)    

    try {
        const created = await connection.createMigrationTable()
        if (!created) {
            console.warn('this database appears to already have a migration table. use list command to see a list of applied migrations')
        }
        saveConnectionString(connString)
    } catch (err) {
        fail("Failed on creating migration table:", err)
        throw err
    }
    process.exit(0)
}