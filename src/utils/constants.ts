import path from 'path'

export const CATEGORY_ORDER: Record<string, number> = {
  'Introdução': 1,
  'Estruturas de Dados': 2,
  'Algoritmos': 3,
  'Árvores': 4,
  'Grafos': 5,
  'Algoritmos Avançados': 6,
  'Outros': 7,
  'Geral': 8,
}

export const docsDirectory = path.join(process.cwd(), 'src/docs')

export function getCategoryOrder(category: string): number {
  return CATEGORY_ORDER[category] ?? 999
}