

export interface Connection {
    createMigrationTable(): Promise<boolean>
    migrationsList(): Promise<string[]>
    applyMigration(name: string, text: string): Promise<void>
}

export interface ConnectionInit {
    (connectionString: string): Promise<Connection>
}
