import normalizeId from './helpers/normalize-id.js';
import removeVersion from './helpers/remove-version.js';
import removePrivatePath from './helpers/remove-private-path.js';

const toJSON = schema => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      //Remove private paths
      if (schema.options.removePrivatePaths !== false) {
        removePrivatePath(ret, schema);
      }

      //Remove version
      if (schema.options.removeVersion !== false) {
        removeVersion(ret);
      }

      //Normalize ID
      if (schema.options.normalizeId !== false) {
        normalizeId(ret);
      }

      //Call custom transform if present
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

export default toJSON;
