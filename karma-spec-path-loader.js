module.exports = function (source) {
  const filePath = this.resourcePath.replace(process.cwd() + '/', '');

  return `
    (function() {
      window.__karmaSpecMap = window.__karmaSpecMap || {};

      const currentFile = "${filePath}";

      const originalIt = window.it;

      window.it = function(name, fn, timeout) {
        const wrapped = function(...args) {
          window.__karmaCurrentSpecFile = currentFile;
          return fn.apply(this, args);
        };

        // salva mapeamento único
        const key = name + '|' + currentFile;
        window.__karmaSpecMap[key] = currentFile;

        return originalIt(name, wrapped, timeout);
      };
    })();

    ${source}
  `;
};