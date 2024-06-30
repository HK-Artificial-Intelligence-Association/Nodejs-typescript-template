export default function replaceTsWithJs({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        if (source.endsWith('.ts')) {
          path.node.source.value = source.replace(/\.ts$/, '.js');
        }
      }
    }
  };
}
