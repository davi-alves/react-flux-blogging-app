import crypto from 'crypto';

/**
 * Transform a string in camelCase style
 *
 * @param  {String} string string to transform
 * @return {String}        transformed string
 */
export const camelCase = function(string) {
  return string
    .split('_')
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase();
      }

      return word.charAt(0) + word.slice(1).toLowerCase();
    })
    .join('');
};

export const avatar = function (email) {
  if (!email) {
    return '';
  }

  email = crypto.createHash('md5').update(email).digest('hex');

  return `http://www.gravatar.com/avatar/${email}?s=92`;
};
