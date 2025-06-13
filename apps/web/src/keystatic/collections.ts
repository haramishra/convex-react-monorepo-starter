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
        publicPath: "@assets/images/posts",
      }),
      tags: fields.array(fields.text({ label: "Tag" }), {
        label: "Tags",
        itemLabel: (props) => props.value,
      }),
      content: fields.mdx({
        label: "Content",
        options: {
          image: {
            directory: "src/assets/images/posts",

            // Use the @assets path alias
            publicPath: "@assets/images/posts/",
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
            directory: "src/assets/images/posts",

            // Use the @assets path alias
            publicPath: "@assets/images/posts/",
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

            // Use the @assets path alias
            publicPath: "@assets/images/changelog/",
          },
        },
      }),
    },
  }),

  // Guides Collection
  guides: collection({
    label: "Guides",
    slugField: "title",

    path: "src/content/guides/**/*", // Example for guides
    format: {
      contentField: "content",
    },
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      description: fields.text({ label: "Description", multiline: true }),
      category: fields.text({ label: "Category" }),
      lastUpdated: fields.date({ label: "Last Updated" }),
      content: fields.mdx({
        label: "Content",
        options: {
          image: {
            directory: "src/assets/images/guides",

            // Use the @assets path alias
            publicPath: "@assets/images/guides/",
          },
        },
      }),
    },
  }),
};
