/**
 * projectImages.js
 * Dynamic screenshot loading helper using Vite's glob import and readable caption generator.
 */

// Eagerly glob all screenshots under src/assets/projects/*/*
const projectImageModules = import.meta.glob(
  '../assets/projects/*/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);

/**
 * Returns an array of { src, key } objects for a given project folder inside src/assets/projects/.
 * key is the filename without extension and without leading numeric prefix (e.g. "01-dashboard.png" -> "dashboard").
 *
 * @param {string} folderName - Subfolder name inside src/assets/projects/
 * @returns {Array<{ src: string, key: string }>} Sorted list of images
 */
export function getProjectImages(folderName) {
  if (!folderName || typeof folderName !== 'string') {
    return [];
  }

  // Normalize search folder
  const targetSegment = `/projects/${folderName}/`;

  // Filter matching paths
  const matchingPaths = Object.keys(projectImageModules).filter((path) => {
    const normalized = path.replace(/\\/g, '/');
    return normalized.includes(targetSegment);
  });

  // Sort alphabetically by path / filename to preserve numeric ordering (e.g. 01-, 02-)
  matchingPaths.sort((a, b) => a.localeCompare(b));

  return matchingPaths.map((path) => {
    const filename = path.replace(/\\/g, '/').split('/').pop() || '';
    // Strip file extension
    const withoutExt = filename.replace(/\.[^/.]+$/, '');
    // Strip leading number prefix (e.g. "01-dashboard" -> "dashboard", "2_billing" -> "billing")
    const key = withoutExt.replace(/^\d+[-_]?/, '');

    return {
      src: projectImageModules[path],
      key,
    };
  });
}

/**
 * Formats a human-readable caption for a screenshot.
 * Prioritizes project.screenshotCaptions[key].
 * If missing, generates a readable caption by replacing hyphens and underscores with spaces,
 * and capitalizing the first letter (e.g. "bill-scan" -> "Bill scan").
 * Never displays raw filenames or extensions.
 *
 * @param {object} project - Project data object
 * @param {string} key - Screenshot key
 * @param {number} [fallbackIndex] - Optional 0-based index for fallback naming
 * @returns {string} Human-readable caption
 */
export function getProjectCaption(project, key, fallbackIndex) {
  if (key && project?.screenshotCaptions?.[key]) {
    return project.screenshotCaptions[key];
  }
  if (key && typeof key === 'string') {
    // Strip any lingering extension and replace hyphens/underscores with spaces
    const cleanKey = key.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim();
    if (cleanKey.length > 0) {
      return cleanKey.charAt(0).toUpperCase() + cleanKey.slice(1);
    }
  }
  return typeof fallbackIndex === 'number' ? `Screenshot ${fallbackIndex + 1}` : 'Screenshot';
}

export default getProjectImages;
