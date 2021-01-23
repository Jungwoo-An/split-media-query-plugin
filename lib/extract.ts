import { parse, generate, StyleSheet, List } from 'css-tree';

function extract(css: string) {
  const ast = parse(css);
  if (ast.type !== 'StyleSheet') {
    throw new Error(
      'split-media-query-plugin: Parameter must be stylesheet string'
    );
  }

  const queries: Record<string, StyleSheet> = {};

  ast.children.each((node, item, list) => {
    if (node.type !== 'Atrule') {
      return;
    }

    if (node.name !== 'media') {
      return;
    }

    const query = generate({
      ...node,
      block: null,
    });

    if (!queries[query]) {
      queries[query] = {
        type: 'StyleSheet',
        children: new List(),
      };
    }

    queries[query].children.appendData(node);
  });

  return Object.keys(queries).map((query) => ({
    stylesheet: generate(queries[query]),
    query,
  }));
}

export default extract;
