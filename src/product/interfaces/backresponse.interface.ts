export interface BackResponse<T>{
    readonly data: T;
    readonly status: number;
    readonly error?: string;
}