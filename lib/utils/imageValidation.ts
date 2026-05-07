/**
 * Validates if an image URL should be displayed
 */

function isTrustedHttpsHost(hostname: string): boolean {
  if (hostname.endsWith('.supabase.co')) return true;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes('your-project')) {
    try {
      if (new URL(supabaseUrl).hostname === hostname) return true;
    } catch {
      /* ignore */
    }
  }
  if (hostname === 'images.unsplash.com') return true;
  return false;
}

function isValidRemoteMediaUrl(trimmedUrl: string): boolean {
  try {
    const u = new URL(trimmedUrl);
    if (u.protocol !== 'https:') return false;
    return isTrustedHttpsHost(u.hostname);
  } catch {
    return false;
  }
}

export function isValidImageUrl(imageUrl: string | null | undefined): boolean {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return false;
  }

  const trimmedUrl = imageUrl.trim();

  if (trimmedUrl === '' || trimmedUrl === 'null' || trimmedUrl === 'undefined') {
    return false;
  }

  const invalidPatterns = [
    'placeholder',
    'dummy',
    'example',
    'sample',
    'test',
    'temp',
    'temporary',
  ];

  for (const pattern of invalidPatterns) {
    if (trimmedUrl.toLowerCase().includes(pattern)) {
      return false;
    }
  }

  const validExtensions = [
    '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg',
    '.webm', '.mp4', '.mov',
  ];
  const hasValidExtension = validExtensions.some((ext) =>
    trimmedUrl.toLowerCase().endsWith(ext)
  );

  if (!hasValidExtension) {
    return false;
  }

  if (trimmedUrl.startsWith('/images/')) {
    return true;
  }

  return isValidRemoteMediaUrl(trimmedUrl);
}
