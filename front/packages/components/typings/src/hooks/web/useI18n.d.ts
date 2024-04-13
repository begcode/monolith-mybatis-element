type I18nGlobalTranslation = {
    (key: string): string;
    (key: string, locale: string): string;
    (key: string, locale: string, list: unknown[]): string;
    (key: string, locale: string, named: Record<string, unknown>): string;
    (key: string, list: unknown[]): string;
    (key: string, named: Record<string, unknown>): string;
};
type getEnumDictType = {
    (enumType: any): any[];
};
export declare const useI18n: (namespace?: string) => {
    t: I18nGlobalTranslation;
    getEnumDict: getEnumDictType;
};
export declare const t: (key: string) => string;
export {};
