import { useState } from "react";

import { Menu, ChevronDown } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/ui/components/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible";
import { Separator } from "@repo/ui/components/separator";

import navData from "@/config/navMenuConfig.json";
import type { ResponsiveNavProps } from "@/types";

export default function MainNavigationMenu({
  sidebarItems,
}: ResponsiveNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSidebar = sidebarItems && sidebarItems.length > 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">L</span>
          </div>
          <span className="font-bold text-xl">Logo</span>
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navData.navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.discriminant === "plainLink" ? (
                  <NavigationMenuLink asChild>
                    <a
                      href={item.value.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.value.title}
                    </a>
                  </NavigationMenuLink>
                ) : (
                  <>
                    <NavigationMenuTrigger>
                      {item.value.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] p-2">
                        {item.value.items?.map((subItem, subIndex) => (
                          <NavigationMenuLink key={subIndex} asChild>
                            <a
                              href={subItem.href}
                              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                            >
                              <div className="text-sm font-medium leading-none group-hover:underline">
                                {subItem.title}
                              </div>
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <Button className="hidden md:inline-flex">Get Started</Button>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 mt-4">
              {/* Main Navigation Items */}
              {navData.navItems.map((item, index) => (
                <div key={index}>
                  {item.discriminant === "plainLink" ? (
                    <a
                      href={item.value.href}
                      className="flex items-center py-2 text-lg font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.value.title}
                    </a>
                  ) : (
                    <Collapsible className="space-y-2">
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-lg font-semibold [&[data-state=open]>svg]:rotate-180">
                        {item.value.title}
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2">
                        <div className="ml-4 space-y-2">
                          {item.value.items?.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="font-medium">{subItem.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {subItem.description}
                              </div>
                            </a>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              ))}

              {/* Sidebar Navigation Items (only in mobile) */}
              {hasSidebar && (
                <>
                  <Separator className="my-2" />
                  <div className="py-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Page Navigation
                    </h3>
                    {sidebarItems.map((item, index) => (
                      <div key={index} className="mb-2">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="flex items-center py-2 text-sm font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.icon && (
                              <span className="mr-2">{item.icon}</span>
                            )}
                            {item.title}
                          </a>
                        ) : item.items ? (
                          <Collapsible className="space-y-1">
                            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium [&[data-state=open]>svg]:rotate-180">
                              <span className="flex items-center">
                                {item.icon && (
                                  <span className="mr-2">{item.icon}</span>
                                )}
                                {item.title}
                              </span>
                              <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1">
                              <div className="ml-4 space-y-1">
                                {item.items.map((subItem, subIndex) => (
                                  <a
                                    key={subIndex}
                                    href={subItem.href}
                                    className="block py-1.5 text-sm text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.title}
                                    {subItem.description && (
                                      <div className="text-xs text-muted-foreground">
                                        {subItem.description}
                                      </div>
                                    )}
                                  </a>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <div className="py-2 text-sm font-medium">
                            {item.title}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="pt-4 border-t">
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
