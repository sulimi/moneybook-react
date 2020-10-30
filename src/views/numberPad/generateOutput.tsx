type InputString = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '删除' | '清空' | '.'  //更精确 严谨
const generateOutPut = (text: InputString, output = '0') => {
  switch (text) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (output === '0') {
        return text;
      } else {
        let p = output + text;
        if (p.split('.').length === 2) {
          const l = p.split('.')[0];
          const r = p.split('.')[1].substring(0, 2);
          p = l + '.' + r;
        }
        return p;
      }
    case '.':
      if (output.indexOf('.') >= 0) {
        return output;
      }
      return output + '.';
    case '删除':
      if (output.length === 1) {
        return '0';
      } else {
        return output.slice(0, -1);
      }
    case '清空':
      return '0';
    default:
      return '';
  }
};

export {generateOutPut};