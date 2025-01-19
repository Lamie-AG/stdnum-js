import { validate, format } from './nif';
import { InvalidComponent, InvalidLength } from '../exceptions';

describe('fr/nif', () => {
  it('format:0701987765432', () => {
    const result = format('0701987765432');

    expect(result).toEqual('07 01 987 765 432');
  });

  it('format:3023217600053', () => {
    const result = format('3023217600053');

    expect(result).toEqual('30 23 217 600 053');
  });

  test.each(['3023217600053', '0701987765493', '3023217600053'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual(value);
    },
  );

  test.each(['0000000000000', '3023217600054'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(false);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:9701987765432', () => {
    const result = validate('9701987765432');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});
