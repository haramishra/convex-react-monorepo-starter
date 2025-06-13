import { collection, fields } from "@keystatic/core";
export const collectionsConfig = {
  // Blog Collection with i18n
  posts: collection({
    label: "Blog Posts",
    slugField: "title",
    columns: ["title", "pubDate"],
    entryLayout: "content",
    path: "src/content/posts/**", // Adjust with your supported languages
    format: {
      contentField: "content",
    },
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      description: fields.text({ label: "Description", multiline: true }),
      pubDate: fields.date({
        label: "Publication Date",
        defaultValue: Date(),
      }),
      publish: fields.checkbox({
        label: "Publish post",
        defaultValue: false,
        description: "Click if you wnat the post to be published on prod.",
      }),
      cover: fields.image({
        label: "Blog cover Image",
        directory: "src/assets/images/posts",
        publicPath: "/src/assets/images/posts",
      }),
      category: fields.array(fields.text({ label: "Category" }), {
        label: "Tags",
        itemLabel: (props) => props.value,
      }),
      content: fields.mdx({
        label: "Content",
        options: {
          image: {
            directory: "src/assets/images/posts",

            // Use the /src/assets path alias
            publicPath: "/src/assets/images/posts/",
          },
        },
      }),
    },
  }),

  //pages for leagal terms, privacy, refund, etc
  legal: collection({
    label: "Legal Pages",
    slugField: "title",
    columns: ["title", "pubDate"],
    entryLayout: "content",
    path: "src/content/legal/**", // Adjust with your supported languages
    format: {
      contentField: "content",
    },
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      description: fields.text({ label: "Description", multiline: true }),
      pubDate: fields.date({
        label: "Publication Date",
        defaultValue: "today",
      }),
      content: fields.mdx({
        label: "Content",

        options: {
          image: {
            directory: "src/assets/images/legal",

            // Use the /src/assets path alias
            publicPath: "/src/assets/images/legal/",
          },
        },
      }),
    },
  }),

  // Changelog Collection
  changelog: collection({
    label: "Changelog",
    slugField: "version",
    path: "src/content/changelog/*",
    entryLayout: "content",
    format: {
      contentField: "summary",
    },
    schema: {
      version: fields.slug({ name: { label: "Version (e.g., 1.0.0)" } }),
      releaseDate: fields.date({ label: "Release Date" }),
      type: fields.select({
        label: "Change Type",
        options: [
          { label: "Feature", value: "feature" },
          { label: "Fix", value: "fix" },
          { label: "Improvement", value: "improvement" },
        ],
        defaultValue: "feature",
      }),
      summary: fields.mdx({
        label: "Content",
        options: {
          image: {
            directory: "src/assets/images/changelog",

            // Use the /src/assets path alias
            publicPath: "/src/assets/images/changelog/",
          },
        },
      }),
    },
  }),

  // Guides Collection
  guides: collection({
    label: "Guides",
    slugField: "title",
    entryLayout: "content",
    path: "src/content/guides/*", // Example for guides
    format: {
      contentField: "content",
    },
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      description: fields.text({ label: "Description", multiline: true }),
      published: fields.checkbox({
        label: "Published",
        description: "Check it you want to show it on prod",
        defaultValue: false,
      }),
      featured: fields.checkbox({
        label: "Featured",
        description: "Check it you want guide to be featured",
        defaultValue: false,
      }),
      cover: fields.image({
        label: "Blog cover Image",
        directory: "src/assets/images/guides",
        publicPath: "/src/assets/images/guides/",
      }),
      pubDate: fields.date({ label: "Publish Date", defaultValue: Date() }),
      content: fields.mdx({
        label: "Content",
        options: {
          image: {
            directory: "src/assets/images/guides",

            // Use the /src/assets path alias
            publicPath: "/src/assets/images/guides/",
          },
        },
      }),
    },
  }),
};
