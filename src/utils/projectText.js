/**
 * projectText.js
 * Helpers for resolving project copy across card, list, and detail views.
 */

/**
 * Returns project.summary if present, otherwise falls back to project.description.
 *
 * @param {Object} project - The project data object
 * @returns {string} The text to display on project cards
 */
export function getCardText(project) {
  if (!project) return '';
  return project.summary || project.description || '';
}

export default { getCardText };
