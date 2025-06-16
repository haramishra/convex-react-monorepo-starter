export type PlainLink = {
  discriminant: "plainLink";
  value: {
    title: string;
    href: string;
  };
};

export type DropdownItem = {
  title: string;
  href: string;
  description: string;
};

export type Dropdown = {
  discriminant: "dropdown";
  value: {
    title: string;
    items: DropdownItem[];
  };
};

export type NavItem = PlainLink | Dropdown;

export type Navigation = {
  navItems: NavItem[];
};

export type SidebarItem = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  items?: {
    title: string;
    href: string;
    description?: string;
  }[];
};
