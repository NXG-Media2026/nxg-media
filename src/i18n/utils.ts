import { ui, type UIKey } from './ui';
import { routeSegments } from './routes';
import type { Locale } from '../data/site';

export function getLocaleFromPath(_path: string): Locale {
  return 'de';
}

export function t(key: UIKey, _locale: Locale = 'de'): string {
  return ui.de[key] ?? key;
}

export function getTranslatedPath(path: string, _targetLocale: Locale): string {
  return path;
}

export function getCollectionBasePath(
  collection: 'produkte' | 'coaching' | 'blog' | 'themen',
  _locale: Locale = 'de',
): string {
  const segment = routeSegments.de[collection];
  return `/${segment}`;
}
