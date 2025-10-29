// Page configuration system
interface ShellSettingsPerPage {
  showBackButton: boolean;
  title?: React.ReactNode;
  // Add more settings as needed
}

const SHELL_SETTINGS_PER_PAGE: Record<string, ShellSettingsPerPage> = {
  // Hub page (root) - no back button
  '/en/ka': {
    showBackButton: false,
    title: (
      <>
        <span className="text-ds-primary-700"> kartuli</span>
        <span className="text-slate-500">.app</span>
      </>
    ),
  },
  // Me page - has back button
  '/en/ka/me': {
    showBackButton: true,
    title: 'My profile',
  },
  // Search page - has back button
  '/en/ka/search': {
    showBackButton: true,
    title: 'Search',
  },
  // Saved page - has back button
  '/en/ka/saved': {
    showBackButton: true,
    title: 'Saved items',
  },
  // More page - has back button
  '/en/ka/more': {
    showBackButton: true,
    title: 'More',
  },
};

export function getShellSettingsPerPage(pathname: string): ShellSettingsPerPage {
  return (
    SHELL_SETTINGS_PER_PAGE[pathname] || {
      showBackButton: false,
      title: 'Kartuli',
    }
  );
}
