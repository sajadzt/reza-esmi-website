/**
 * Normalizes project asset paths before they are rendered.
 *
 * This is especially important for the industrial projects,
 * because the actual folder is:
 *
 * /public/images/projects/industrial-projects/
 *
 * while some older project data still uses:
 *
 * /images/projects/industrial/
 */

export function normalizeProjectAssetPath(
  src?: string | null
): string {
  if (!src) return "";

  let path = src.trim();

  /*
   * Remove accidental duplicate slashes.
   */
  path = path.replace(/\/{2,}/g, "/");

  /*
   * Industrial projects were previously stored with
   * /industrial/ but the real folder is
   * /industrial-projects/
   */
  path = path.replace(
    /^\/images\/projects\/industrial\//,
    "/images/projects/industrial-projects/"
  );

  /*
   * Fix the Sirang typo that existed in the project data:
   *
   * iindustrial-projects -> industrial-projects
   */
  path = path.replace(
    /^\/images\/projects\/iindustrial-projects\//,
    "/images/projects/industrial-projects/"
  );

  /*
   * Some older paths used bahrman while the actual
   * project folder may be bahraman.
   */
  path = path.replace(
    /\/images\/projects\/industrial-projects\/bahrman\//,
    "/images/projects/industrial-projects/bahraman/"
  );

  return path;
}

/**
 * Normalize an entire project asset collection.
 */
export function normalizeProjectAssets(
  assets?: string[]
): string[] {
  if (!assets) return [];

  return Array.from(
    new Set(
      assets
        .map(normalizeProjectAssetPath)
        .filter(Boolean)
    )
  );
}