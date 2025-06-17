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
import type { Navigation, NavItem } from "@/types";

export function NavLinks({ navigationData }: { navigationData: Navigation }) {
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
                  <ul className="grid w-[300px] gap-2 md:w-[200px] md:grid-cols-1 ">
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
