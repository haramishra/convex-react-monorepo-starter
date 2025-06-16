"use client";

import * as React from "react";

import { Menu, ChevronRight } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@repo/ui/components/sheet";
import { Logo } from "@repo/ui/components/logo";
import { Separator } from "@repo/ui/components/separator";
import type { Navigation } from "@/types";

export function MobileNavigation({
  navigationData,
}: {
  navigationData: Navigation;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="mr-2 h-8 px-1.5 md:hidden"
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-start px-6 py-4">
            <a
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <Logo />
            </a>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="px-6 py-6">
            <nav className="flex flex-col space-y-2">
              {navigationData?.navItems.map((item, index) => (
                <div key={index}>
                  {item.discriminant === "plainLink" ? (
                    <a
                      href={item.value.href}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <span>{item.value.title}</span>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </a>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-foreground">
                        <span>{item.value.title}</span>
                      </div>
                      <div className="ml-3 space-y-1">
                        {item.value.items.map((dropdownItem, dropdownIndex) => (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="block rounded-md px-3 py-2.5 hover:bg-accent/50 transition-colors group"
                            onClick={() => setOpen(false)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="text-sm font-medium text-foreground group-hover:text-accent-foreground">
                                  {dropdownItem.title}
                                </div>
                                <div className="text-xs text-muted-foreground group-hover:text-accent-foreground/70">
                                  {dropdownItem.description}
                                </div>
                              </div>
                              <ChevronRight className="h-3 w-3 opacity-50 group-hover:opacity-70" />
                            </div>
                          </a>
                        ))}
                      </div>
                      {index < navigationData.navItems.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// Combined component that shows desktop nav on larger screens and mobile nav on smaller screens
// export function ResponsiveNavigation({
//   navigationData = defaultNavigationData,
//   logoSrc = "/logo-light.png",
//   logoDarkSrc = "/logo-dark.png",
//   logoAlt = "logo",
// }: MobileNavigationProps) {
//   return (
//     <>
//       {/* Mobile Navigation */}
//       <MobileNavigation
//         navigationData={navigationData}
//         logoSrc={logoSrc}
//         logoDarkSrc={logoDarkSrc}
//         logoAlt={logoAlt}
//       />
//     </>
//   );
// }
