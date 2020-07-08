export function extractChangeValue<T>(changesObject: ng.IChangesObject<T>): T {
    if (changesObject && changesObject.currentValue !== undefined) {
        return changesObject.currentValue;
    }
    return undefined;
}
