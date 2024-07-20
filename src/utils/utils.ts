/**
 * Helpful utilities for components and service
 */
export class Utils {
    /**
     * Checks whether data within the objects are the same
     * @param data1 First data to compare
     * @param data2 Second data to compare
     * @returns Whether provided data are equal
     */
    static areEqual(data1: unknown, data2: unknown): boolean {
        return JSON.stringify(data1) === JSON.stringify(data2);
    }

    /**
     * Checks whether strings are equal ignoring spaces
     * @param string1 First string to compare
     * @param string2 Second string to compare
     * @returns Whether provided strings are equal
     */
    static areEqualStrings(string1: string, string2: string): boolean {
        return string1?.trim() === string2?.trim();
    }

    /**
     * Sanitizes the provided input
     * @param input The input to be sanitized
     */
    static sanitize(input: string): string {
        return input ? input.replace(/(<([^>]+)>)/gi, '') : '';
    }
}
