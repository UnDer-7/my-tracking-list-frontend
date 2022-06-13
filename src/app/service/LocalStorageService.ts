export class LocalStorageService {
    public static save(key: LocalStorageKeys, value: string): void {
        localStorage.setItem(key, value);
    }

    public static getValue(key: LocalStorageKeys): string | null {
        return localStorage.getItem(key);
    }
}

export enum LocalStorageKeys {
    JWT_TOKEN = 'JWT_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}
