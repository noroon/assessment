const oneDigitsAndTens = [
  '',
  'one ',
  'two ',
  'three ',
  'four ',
  'five ',
  'six ',
  'seven ',
  'eight ',
  'nine ',
  'ten ',
  'eleven ',
  'twelve ',
  'thirteen ',
  'fourteen ',
  'fifteen ',
  'sixteen ',
  'seventeen ',
  'eighteen ',
  'nineteen ',
];

const twoDigits = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const convertNumber = (number: number): string => {
  const numberOfDigits = String(number).length;
  if (numberOfDigits > 8) return 'Sorry, this conversion not implemented yet.';
  if (number === 0) return 'zero';

  const regex = /^(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/;
  const n = ('00000000' + String(number)).slice(-8).match(regex);
  if (!n) return '';

  let str = '';
  str += (n[1] !== '00') ? (oneDigitsAndTens[Number(n[1])] || twoDigits[Number(n[1][0])] + '-' + oneDigitsAndTens[Number(n[1][1])]) + 'million ' : '';
  str += (n[2] !== '0') ? (oneDigitsAndTens[Number(n[2])] || twoDigits[Number(n[2][0])] + ' ' + oneDigitsAndTens[Number(n[2][1])]) + 'hundred ' : '';
  str += (n[2] !== '0' && n[3] === '00') ? 'thousand ' : (n[2] === '0') ? '' : 'and ';
  str += (n[3] !== '00') ? (oneDigitsAndTens[Number(n[3])] || twoDigits[Number(n[3][0])] + '-' + oneDigitsAndTens[Number(n[3][1])]) + 'thousand ' : '';
  str += (n[4] !== '0') ? (oneDigitsAndTens[Number(n[4])] || twoDigits[Number(n[4][0])] + ' ' + oneDigitsAndTens[Number(n[4][1])]) + 'hundred ' : '';
  str += (n[5] !== '00') ? (str !== '' ? 'and ' : '') + (oneDigitsAndTens[Number(n[5])] || twoDigits[Number(n[5][0])] + '-' + oneDigitsAndTens[Number(n[5][1])]) : '';

  if (str.slice(-1) === '-') str = str.slice(0, -1);
  
  return str;
};

const convertNumberForBritishEnglish = (number: number): string => {
  let str = '';
  const regex = /^(\d{2})(\d{2})$/;
  const n = ('0000' + String(number)).slice(-4).match(regex);
  if (!n) return '';

  str += oneDigitsAndTens[Number(n[1])] + 'hundred ';
  str += (n[2] !== '00') ? (str !== '' ? 'and ' : '') + (oneDigitsAndTens[Number(n[2])] || twoDigits[Number(n[2][0])] + '-' + oneDigitsAndTens[Number(n[2][1])]) : '';

  return str;
};

export { convertNumber, convertNumberForBritishEnglish };
