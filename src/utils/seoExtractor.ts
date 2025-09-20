import matter from 'gray-matter'

interface SEOData {
  keywords: string[]
  images: string[]
}

export function extractSEOFromMarkdown(markdownContent: string): SEOData {
  const { content } = matter(markdownContent)

  const cleanText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/>\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim()

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  const images: string[] = []
  let imageMatch
  while ((imageMatch = imageRegex.exec(content)) !== null) {
    images.push(imageMatch[2])
  }

  const codeLanguages: string[] = []
  const codeRegex = /```(\w+)/g
  let codeMatch
  while ((codeMatch = codeRegex.exec(content)) !== null) {
    if (!codeLanguages.includes(codeMatch[1])) {
      codeLanguages.push(codeMatch[1])
    }
  }

  const keywords = extractKeywords(cleanText, codeLanguages)

  return {
    keywords,
    images,
  }
}

function extractKeywords(text: string, codeLanguages: string[]): string[] {
  const keywords: string[] = []

  keywords.push(...codeLanguages)

  const technicalTerms = [
    'array', 'matriz', 'vetor', 'lista', 'pilha', 'stack', 'fila', 'queue',
    'deque', 'buffer', 'heap', 'árvore', 'tree', 'nó', 'node', 'raiz', 'folha',

    'árvore binária', 'binary tree', 'árvore avl', 'árvore red-black',
    'árvore b', 'b-tree', 'árvore de busca', 'bst', 'trie', 'árvore patricia',
    'árvore de segmentos', 'segment tree', 'fenwick tree', 'árvore de intervalos',

    'grafo', 'graph', 'vértice', 'vertex', 'aresta', 'edge', 'adjacência',
    'grafo dirigido', 'grafo não-dirigido', 'grafo ponderado', 'caminho', 'ciclo',
    'componente conexo', 'grafo acíclico', 'dag', 'árvore geradora', 'spanning tree',

    'hash', 'hashtable', 'tabela hash', 'função hash', 'colisão', 'rehashing',
    'hash aberto', 'hash fechado', 'chaining', 'linear probing', 'quadratic probing',
    'double hashing', 'bloom filter', 'consistent hashing',

    'ordenação', 'sorting', 'bubble sort', 'selection sort', 'insertion sort',
    'merge sort', 'quick sort', 'heap sort', 'radix sort', 'counting sort',
    'bucket sort', 'shell sort', 'tim sort', 'estável', 'in-place',

    'busca', 'search', 'busca linear', 'linear search', 'busca binária', 'binary search',
    'busca ternária', 'ternary search', 'busca exponencial', 'interpolation search',
    'busca em largura', 'bfs', 'breadth-first', 'busca em profundidade', 'dfs', 'depth-first',

    'algoritmo', 'recursão', 'iteração', 'dividir e conquistar', 'divide and conquer',
    'programação dinâmica', 'dynamic programming', 'memoização', 'greedy', 'guloso',
    'backtracking', 'força bruta', 'brute force', 'two pointers', 'sliding window',

    'complexidade', 'big o', 'notação big o', 'tempo', 'espaço', 'linear', 'logarítmico',
    'quadrático', 'exponencial', 'fatorial', 'constante', 'amortizado', 'melhor caso',
    'pior caso', 'caso médio', 'análise assintótica',

    'union find', 'disjoint set', 'segment tree', 'binary indexed tree', 'suffix array',
    'suffix tree', 'rope', 'skip list', 'treap', 'splay tree', 'fibonacci heap',
    'binomial heap', 'van emde boas', 'persistent', 'imutável',

    'dijkstra', 'bellman-ford', 'floyd-warshall', 'kruskal', 'prim', 'tarjan',
    'kosaraju', 'ford-fulkerson', 'max-flow', 'min-cut', 'bipartite matching',
    'topological sort', 'ordenação topológica', 'strongly connected components',

    'ponteiro', 'pointer', 'referência', 'alocação', 'memória', 'garbage collection',
    'overflow', 'underflow', 'invariante', 'pré-condição', 'pós-condição',
    'estrutura', 'dados', 'abstração', 'encapsulamento', 'modularidade'
  ]

  const lowerText = text.toLowerCase()
  technicalTerms.forEach(term => {
    if (lowerText.includes(term) && !keywords.includes(term)) {
      keywords.push(term)
    }
  })

  return keywords.slice(0, 20)
}