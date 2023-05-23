import _ from 'lodash';

const spacesCount = 4;
const getIndent = (count) => ' '.repeat(count * spacesCount);

const getValue = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const bracketEndIndent = getIndent(depth - 1);
  const lines = Object.entries(node).map(([key, value]) => `${getIndent(depth)}${key}: ${getValue(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketEndIndent}}`,
  ].join('\n');
};

const stylish = (data, depth = 1) => {
  const indent = getIndent(depth).slice(0, getIndent(depth) - 2);
  const bracketEndIndent = getIndent(depth - 1);

  const lines = data.flatMap((diff) => {
    switch (diff.type) {
      case 'nested':
        return `${indent}  ${diff.key}: ${stylish(diff.children, depth + 1)}`;
      case 'added':
        return `${indent}+ ${diff.key}: ${getValue(diff.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${diff.key}: ${getValue(diff.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${diff.key}: ${getValue(diff.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${diff.key}: ${getValue(diff.value1, depth + 1)}`,
          `${indent}+ ${diff.key}: ${getValue(diff.value2, depth + 1)}`,
        ];
      default:
        throw new Error(`${diff.type} is not defined`);
    }
  });

  return [
    '{',
    ...lines,
    `${bracketEndIndent}}`,
  ].join('\n');
};

export default stylish;
