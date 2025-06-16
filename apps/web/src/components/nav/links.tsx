"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/navigation-menu";

type PlainLink = {
  discriminant: "plainLink";
  value: {
    title: string;
    href: string;
  };
};

type DropdownItem = {
  title: string;
  href: string;
  description: string;
};

type Dropdown = {
  discriminant: "dropdown";
  value: {
    title: string;
    items: DropdownItem[];
  };
};

type NavItem = PlainLink | Dropdown;

type NavigationData = {
  navItems: NavItem[];
};

const navigationData: NavigationData = {
  navItems: [
    {
      discriminant: "plainLink",
      value: {
        title: "Home",
        href: "/home",
      },
    },
    {
      discriminant: "dropdown",
      value: {
        title: "Resources",
        items: [
          {
            title: "Blog",
            href: "/blog",
            description: "Explore our blog",
          },
          {
            title: "Guides",
            href: "/guides",
            description: "Explore our guide",
          },
        ],
      },
    },
    {
      discriminant: "plainLink",
      value: {
        title: "Features",
        href: "/features",
      },
    },
    {
      discriminant: "plainLink",
      value: {
        title: "Pricing",
        href: "/pricing",
      },
    },
  ],
};

export function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {navigationData.navItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.discriminant === "plainLink" ? (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href={item.value.href}>{item.value.title}</a>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>
                  {item.value.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {item.value.items.map((dropdownItem) => (
                      <ListItem
                        key={dropdownItem.title}
                        title={dropdownItem.title}
                        href={dropdownItem.href}
                      >
                        {dropdownItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
