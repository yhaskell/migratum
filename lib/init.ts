import * as fs from 'fs'
import { checkExists, fail, generateConfig } from './utils'
import { MIGRATUM_FOLDER, CONFIG_FILE } from './defines'


/**
 * Initialize migrations in the current folder.
 * That includes: 
 * - creating migrations folder (.migratum)
 * - writing config to this folder 
 * - creating empty migration list.
 * If migrations folder exists, fail.
 */
export function init() {
    if (checkExists(MIGRATUM_FOLDER) == true) {
        fail(`${process.cwd()} looks to be a folder with already initialized migrations`)
    }
    try {
        fs.mkdirSync(MIGRATUM_FOLDER)
    } catch (err) {
        fail(`cannot create ${MIGRATUM_FOLDER}: ${err}`)
    }
    try {
        const config = generateConfig()
        fs.writeFileSync(CONFIG_FILE, config)
    } catch (err) {
        fail(`cannot write config: ${err}`)
    }
    console.log(`Initialized new migrations in ${process.cwd()}`)
}

export default init;