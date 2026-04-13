// ignore-css.mjs
export async function resolve(specifier, context, defaultResolve) {
  // If the file ends in .css, .scss, .sass, or .less
  if (specifier.match(/\.(css|scss|sass|less)(\?.*)?$/)) {
    return {
      shortCircuit: true,
      // Redirect it to a data URI that is an empty JS module
      url: 'data:text/javascript,export default {}',
    };
  }
  return defaultResolve(specifier, context);
}