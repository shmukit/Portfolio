import type { ReactNode } from 'react';

export type BulletTextVariant = 'full' | 'simple';

/**
 * Renders plain text as a paragraph or as a bullet list when every non-empty line is a "-" bullet.
 */
export function renderParagraphOrBullets(
  text: string,
  theme: string,
  variant: BulletTextVariant = 'full'
): ReactNode {
  const normalizedText =
    variant === 'full'
      ? text
          .replace(/\r\n/g, '\n')
          .replace(/[•–—−]/g, '-')
          .replace(/^\s*-\s+/gm, '- ')
          .replace(/\s+-\s+/g, '\n- ')
          .trim()
      : text.replace(/\s-\s+/g, '\n- ').trim();

  const lines = normalizedText.split('\n').map((line) => line.trim()).filter(Boolean);
  const bulletItems = lines
    .filter((line) => line.startsWith('-'))
    .map((line) => line.replace(/^-+\s*/, '').trim())
    .filter(Boolean);

  const shouldRenderBullets = lines.length > 1 && bulletItems.length === lines.length;

  if (shouldRenderBullets) {
    return (
      <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {bulletItems.map((item, index) => (
          <li key={`${item}-${index}`} className="text-sm leading-relaxed flex items-start">
            <span className="text-gray-500 mr-2 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      {text}
    </p>
  );
}
