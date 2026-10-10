const basePath = import.meta.env.BASE_URL;

/** Prefix a root-relative public asset with the active Vite base path. */
export function publicPath(path: string) {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    (basePath !== "/" && path.startsWith(basePath))
  ) {
    return path;
  }

  return `${basePath}${path.slice(1)}`;
}

export const routerBasePath =
  basePath === "/" ? undefined : basePath.replace(/\/$/, "");
