import type { ComponentType, SVGProps } from 'react';

type NavigationIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface BackofficeNavigationItem {
  id: 'home' | 'about';
  href: string;
  label: string;
  icon: NavigationIcon;
  activeIcon: NavigationIcon;
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" data-testid="home-icon" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3.75 10.5 12 3.75l8.25 6.75v8.25a1.5 1.5 0 0 1-1.5 1.5h-4.5v-6h-4.5v6h-4.5a1.5 1.5 0 0 1-1.5-1.5V10.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function HomeActiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      data-testid="home-active-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M2.75 10.5a1 1 0 0 1 .37-.77l8.25-6.75a1 1 0 0 1 1.26 0l8.25 6.75a1 1 0 0 1 .37.77v8.25a2.5 2.5 0 0 1-2.5 2.5h-4.5a1 1 0 0 1-1-1v-5h-2.5v5a1 1 0 0 1-1 1h-4.5a2.5 2.5 0 0 1-2.5-2.5V10.5Z" />
    </svg>
  );
}

function AboutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" data-testid="about-icon" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 10.5v6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function AboutActiveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      data-testid="about-active-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 4a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm1 4a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export const backofficeNavigationItems = [
  {
    id: 'home',
    href: '/en',
    label: 'Home',
    icon: HomeIcon,
    activeIcon: HomeActiveIcon,
  },
  {
    id: 'about',
    href: '/en/about',
    label: 'About',
    icon: AboutIcon,
    activeIcon: AboutActiveIcon,
  },
] as const satisfies readonly BackofficeNavigationItem[];
