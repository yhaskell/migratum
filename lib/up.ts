
export function up(migration?: string) {
    if (migration) {
        console.log(`migrated up to a ${migration}`);
    } else {
        console.log("migrated to a latest migration");
    }
}
