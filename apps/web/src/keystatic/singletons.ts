// keystatic.config.ts - singletons object
import { fields, collection, singleton } from "@keystatic/core";

const singletonsConfig = {
  siteConfig: singleton({
    label: "Site Details",
    path: "src/config/siteConfig",
    format: {
      // Assuming you might want to keep the export structure
      data: "json",
    },
    schema: {
      name: fields.text({ label: "Site Name" }),
      description: fields.text({ label: "Site Description", multiline: true }),
      url: fields.url({ label: "Site URL" }),
      appUrl: fields.url({ label: "App URL" }),
      ogImage: fields.url({ label: "Open Graph Image URL" }),
    },
  }),
  socials: singleton({
    label: "Social Links",
    path: "src/config/socials",
    schema: {
      socialMedia: fields.array(
        fields.object({
          name: fields.text({
            label: "name of the account",
            description: "eg: Instagram, Facebook, etc",
            validation: {
              isRequired: true,
              length: { min: 2 },
            },
          }),
          url: fields.url({ label: "social media link" }),
          icon: fields.text({
            label: "Icon SVG",
            description: "Paste the SVG for the Icon",
            multiline: true,
          }),
        }),
        { label: "Social media" }
      ),
    },
  }),
  navMenu: singleton({
    // Use singleton() directly
    label: "Navigation Menu",
    path: "src/config/navMenuConfig", // Path set to src/config/ (e.g., src/config/navMenu.json)
    format: { data: "json" }, // We'll store it as JSON
    schema: {
      // The navItems field is now directly a fields.blocks array
      navItems: fields.blocks(
        {
          // Block for a simple, plain link
          plainLink: {
            label: "Plain Link",
            schema: fields.object({
              title: fields.text({ label: "Title" }),
              href: fields.url({ label: "URL" }),
              description: fields.text({
                label: "Description (Optional)",
                multiline: true,
              }),
            }),
          },
          // Block for a dropdown menu item
          dropdown: {
            label: "Dropdown",
            schema: fields.object({
              title: fields.text({ label: "Dropdown Title" }),
              items: fields.array(
                // The items inside the dropdown are an array
                fields.object({
                  title: fields.text({ label: "Sub-item Title" }),
                  href: fields.url({ label: "URL" }),
                  description: fields.text({
                    label: "Description",
                    multiline: true,
                  }),
                  image: fields.image({
                    label: "Image (Optional)",
                    directory: "src/assets/images/nav-menu", // Store images here
                    publicPath: "@assets/images/nav-menu/", // Use the @assets path alias
                  }),
                }),
                {
                  label: "Dropdown child liinks",
                  itemLabel: (props) =>
                    props.fields.title.value || "New Sub-item",
                }
              ),
            }),
          },
        },
        { label: "Main nav links" }
      ),
    },
    // entryLayout and initialEntry are not needed/requested here
  }),
  footerLinks: singleton({
    label: "Footer Links",
    path: "src/config/footerLinks",
    format: {
      // Assuming you might want to keep the export structure
      data: "json",
    },
    schema: {
      links: fields.array(
        fields.object({
          title: fields.text({ label: "Section Title" }),
          items: fields.array(
            fields.object({
              title: fields.text({ label: "Link Title" }),
              href: fields.text({ label: "URL or Path" }), // Using text for relative paths
            }),
            {
              slugField: "title",
              label: "Footer links",
              description: "Add links ",
              itemLabel: (props) => props.fields.title.value || "New Link",
            }
          ),
        }),
        {
          label: "Footer Sections",
          description: "Footer link categories (company, legal, etc)",
          slugField: "title",
          itemLabel: (props) => props.fields.title.value || "New Section",
        }
      ),
    },
  }),
};

export default singletonsConfig; // Export the singletons object
