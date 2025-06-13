import { collectionsConfig } from "@/keystatic/collections";
import singletonsConfig from "@/keystatic/singletons";
import { config } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },

  collections: collectionsConfig,
  singletons: singletonsConfig,
});
