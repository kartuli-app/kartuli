import { withMermaidTheme } from '@aether-labs/vitepress-mermaid/runtime';
import '@aether-labs/vitepress-mermaid/style.css';
import DefaultTheme from 'vitepress/theme';
import './navigation.css';

export default withMermaidTheme(DefaultTheme, {
  securityLevel: 'strict',
});
