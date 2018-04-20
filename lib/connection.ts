

export interface Connection {
    createMigrationTable(): Promise<boolean>
    migrationsList(): Promise<string[]>
    applyMigration(name: string, text: string, direction: 'up' | 'down'): Promise<void>
}

export interface ConnectionInit {
    (connectionString: string): Promise<Connection>
}
