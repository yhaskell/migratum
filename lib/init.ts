import * as fs from 'fs'
import { checkExists, fail, generateMigrationList } from './utils'
import { MIGRATUM_FOLDER, MIGRATIONS_FILE } from './defines'

function initFolder() {
    try {
        fs.mkdirSync(MIGRATUM_FOLDER)
    } catch (err) {
        fail(`cannot create ${MIGRATUM_FOLDER}: ${err}`)
    }
}

function initMigrationList() {
    try {
        const config = generateMigrationList()
        fs.writeFileSync(MIGRATIONS_FILE, config)
    } catch (err) {
        fail(`cannot write config: ${err}`)
    }
}

/**
 * Initialize migrations in the current folder.
 * That includes: 
 * - creating migrations folder (.migratum)
 * - creating empty migration list.
 * If migrations folder exists, fail.
 */
export function init() {
    if (checkExists(MIGRATUM_FOLDER) == true) {
        fail(`${process.cwd()} looks to be a folder with already initialized migrations`)
    }
    initFolder()
    initMigrationList()

    console.log(`Initialized new migrations in ${process.cwd()}`)
}

export default init;