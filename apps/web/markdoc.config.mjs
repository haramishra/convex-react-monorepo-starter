import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";
import prism from "@astrojs/markdoc/prism";
export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document, // Apply defaults for other options
      render: null, // default 'article'
    },
  },
  extends: [prism()],
});
