import type { ModuleItem } from "@/components/contextApi/AuthContext";

/**
 * Recursively finds the first non-null `path` inside a moduleList tree.
 */
export const findFirstValidPath = (modules: ModuleItem[]): string | null => {
    for (const module of modules) {
        if (module.path) return module.path;
        if (module.moduleList?.length) {
            const nested = findFirstValidPath(module.moduleList);
            if (nested) return nested;
        }
    }
    return null;
};

/**
 * Flattens the full moduleList tree into a flat array of all non-null paths.
 * e.g. ["/user", "/user/add", "/dashboard"]
 */
export const flattenAllowedPaths = (modules: ModuleItem[]): string[] => {
    const paths: string[] = [];
    for (const module of modules) {
        if (module.path) paths.push(module.path);
        if (module.moduleList?.length) {
            paths.push(...flattenAllowedPaths(module.moduleList));
        }
    }
    return paths;
};

/**
 * Checks whether `currentPath` is permitted given the allowed paths.
 *
 * Rules:
 *  - Exact match:   "/user"  allows  "/user"
 *  - Prefix match:  "/user"  allows  "/user/add", "/user/123/edit"
 *
 * This means if a module entry has path "/user", then all sub-routes like
 * "/user/add" are automatically allowed — you don't need to enumerate every
 * child route in the backend module list.
 */
export const isPathAllowed = (
    currentPath: string,
    allowedPaths: string[]
): boolean => {
    return allowedPaths.some(
        (allowed) =>
            currentPath === allowed ||
            currentPath.startsWith(allowed + "/")
    );
};
