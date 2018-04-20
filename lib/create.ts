import { checkExistsDirectory, fail, getAvailableMigrations, saveMigrations } from "./utils";
import { MIGRATUM_FOLDER } from "./defines";
import { mkdirSync, writeFileSync } from 'fs'

export function create(name: string, description?: string) {
    if (!checkExistsDirectory(MIGRATUM_FOLDER)) {
        fail(`it appears you're trying to connect in a folder without migratum initialized`)
    }
    
    const migrations = getAvailableMigrations()
    if (migrations.find(m => m.name == name)) {
        fail("migration with this name already does exist")
    }

    const backupMigrations = [...migrations]

    migrations.push({ 
        name, 
        description: typeof description === 'undefined' ? '' : description
    });

    saveMigrations(migrations)

    try {
        mkdirSync(`${MIGRATUM_FOLDER}/${name}`)
        writeFileSync(`${MIGRATUM_FOLDER}/${name}/up`, '')
        writeFileSync(`${MIGRATUM_FOLDER}/${name}/down`, '')
    } catch (err) {
        saveMigrations(backupMigrations)
        fail("Cannot create migration: ", err.message)
    }
}
