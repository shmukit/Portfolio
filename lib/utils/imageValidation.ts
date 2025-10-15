/**
 * Validates if an image URL should be displayed
 * @param imageUrl - The image URL to validate
 * @returns boolean - Whether the image should be displayed
 */
export function isValidImageUrl(imageUrl: string | null | undefined): boolean {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return false;
  }

  const trimmedUrl = imageUrl.trim();
  
  // Check for empty or null strings
  if (trimmedUrl === '' || trimmedUrl === 'null' || trimmedUrl === 'undefined') {
    return false;
  }

  // Check for placeholder or dummy URLs
  const invalidPatterns = [
    'placeholder',
    'dummy',
    'example',
    'sample',
    'test',
    'temp',
    'temporary'
  ];

  for (const pattern of invalidPatterns) {
    if (trimmedUrl.toLowerCase().includes(pattern)) {
      return false;
    }
  }

  // Check if it's a valid image path
  if (!trimmedUrl.startsWith('/images/')) {
    return false;
  }

  // Check for valid image extensions
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  const hasValidExtension = validExtensions.some(ext => 
    trimmedUrl.toLowerCase().endsWith(ext)
  );

  if (!hasValidExtension) {
    return false;
  }

  return true;
}
