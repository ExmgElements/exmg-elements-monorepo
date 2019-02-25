import {convertSearchQueryToQueryParams, replaceParamsPlaceholders} from '../../src/router/utils';

const {assert} = chai;

suite('router/utils', function () {
  suite('convertSearchQueryToQueryParams', () => {
    test('Convert queryParams when passed as flat values', () => {
      const result = convertSearchQueryToQueryParams('?a=aValue&b=bValue');
      assert.deepEqual(result, {a: ['aValue'], b: ['bValue']});
    });

    test('Convert queryParams when passed as array', () => {
      const result = convertSearchQueryToQueryParams('?a[]=aValue1&a[]=aValue2&b[]=bValue1');
      assert.deepEqual(result, {'a[]': ['aValue1', 'aValue2'], 'b[]': ['bValue1']});
    });

    test('Convert queryParams when passed as object', () => {
      const result = convertSearchQueryToQueryParams('?a[key]=aValue1&a[key]=aValue2&a[key2]=aValue1&b[key]=bValue1');
      assert.deepEqual(result, {'a[key]': ['aValue1', 'aValue2'], 'a[key2]': ['aValue1'], 'b[key]': ['bValue1']});
    });

    test('Convert queryParams when passed as mixed', () => {
      const searchQueryA
        = 'a=aFlatValue1&a=aFlatValue2&a[]=aArrayValue1&a[]=aArrayValue2&a[key]=aObjectValue1&a[key]=aObjectValue2&a[key2]=aObjectValue1';
      const searchQueryB
        = 'b=bFlatValue1&b=bFlatValue2&b[]=bArrayValue1&b[]=bArrayValue2&b[key]=bObjectValue1&b[key]=bObjectValue2&b[key2]=bObjectValue1';
      const result = convertSearchQueryToQueryParams(`?${searchQueryA}&${searchQueryB}`);

      assert.deepEqual(
        result,
        {
          a: [
            'aFlatValue1',
            'aFlatValue2',
          ],
          'a[]': [
            'aArrayValue1',
            'aArrayValue2',
          ],
          'a[key]': [
            'aObjectValue1',
            'aObjectValue2',
          ],
          'a[key2]': ['aObjectValue1'],
          b: [
            'bFlatValue1',
            'bFlatValue2',
          ],
          'b[]': [
            'bArrayValue1',
            'bArrayValue2',
          ],
          'b[key]': [
            'bObjectValue1',
            'bObjectValue2',
          ],
          'b[key2]': ['bObjectValue1'],
        }
      );
    });
  });

  suite('replaceParamsPlaceholders', () => {
    test('When no parameter text should be the same', () => {
      const text = 'Text {id}.';
      const actual = replaceParamsPlaceholders(text);
      assert.equal(actual, text, 'Text is the same');
    });

    test('When multiply parameters should replace all occurrences', () => {
      const text = 'This is text {id} with repeated {id} placeholders {other} {id}';
      const expected = 'This is text 10 with repeated 10 placeholders {other} 10';
      const actual = replaceParamsPlaceholders(text, {id: '10', unknown: 'some value'});
      assert.equal(actual, expected, 'All {id} placeholders are replaced in text');
    });
  });
});
