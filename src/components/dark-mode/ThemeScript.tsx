const ThemeScript = () => {
  const code = `
      (function() {
        try {
          const stored = localStorage.getItem('theme');
          const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          const theme = stored === 'dark' || stored === 'light' ? stored : system;
          document.documentElement.classList.add(theme);
        } catch(e) {}
      })();
    `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
};

export default ThemeScript;
