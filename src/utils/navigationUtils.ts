
/**
 * Checks if a link should be considered active based on the current path.
 * 
 * @param currentPath - The current browser path
 * @param linkPath - The navigation link's path
 * @returns Whether the link should be considered active
 */
export const isActiveLink = (currentPath: string, linkPath: string): boolean => {
  // Handle fragment links (e.g., /#contact)
  if (linkPath.includes('#')) {
    const basePath = linkPath.split('#')[0];
    return currentPath === basePath || currentPath === `${basePath}/`;
  }
  
  // Handle exact matches
  if (currentPath === linkPath || currentPath === `${linkPath}/`) {
    return true;
  }
  
  // Handle nested routes
  if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
    return true;
  }
  
  return false;
};
