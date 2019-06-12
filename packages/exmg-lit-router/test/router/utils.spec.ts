import {
  convertSearchQueryToQueryParams,
  replaceParamsPlaceholders,
  extractBreadcrumbsFromLocation,
} from '../../src/router/utils';
import {mockLocation} from '../utils';
import {connectUrlGeneratorWithRouter} from '../../src/router/url-generator';
import {Router} from '@vaadin/router';

const {assert} = chai;

suite('router/utils', function() {
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
      const searchQueryA =
        'a=aFlatValue1&a=aFlatValue2&a[]=aArrayValue1&a[]=aArrayValue2&a[key]=aObjectValue1&a[key]=aObjectValue2&a[key2]=aObjectValue1';
      const searchQueryB =
        'b=bFlatValue1&b=bFlatValue2&b[]=bArrayValue1&b[]=bArrayValue2&b[key]=bObjectValue1&b[key]=bObjectValue2&b[key2]=bObjectValue1';
      const result = convertSearchQueryToQueryParams(`?${searchQueryA}&${searchQueryB}`);

      assert.deepEqual(result, {
        a: ['aFlatValue1', 'aFlatValue2'],
        'a[]': ['aArrayValue1', 'aArrayValue2'],
        'a[key]': ['aObjectValue1', 'aObjectValue2'],
        'a[key2]': ['aObjectValue1'],
        b: ['bFlatValue1', 'bFlatValue2'],
        'b[]': ['bArrayValue1', 'bArrayValue2'],
        'b[key]': ['bObjectValue1', 'bObjectValue2'],
        'b[key2]': ['bObjectValue1'],
      });
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

    test('Params keys are escaped', () => {
      const text = 'This is text {0} with repeated {a+.{}[]b} placeholders {other} {a+.{}[]b}';
      const expected = 'This is text 10 with repeated -1:value- placeholders {other} -1:value-';
      /* tslint:disable: object-literal-key-quotes */
      const actual = replaceParamsPlaceholders(text, {0: '10', 'a+.{}[]b': '-1:value-'});
      assert.equal(actual, expected, 'All {id} placeholders are replaced in text');
    });
  });

  suite('extractBreadcrumbsFromLocation', () => {
    const createRouter = () => {
      const outlet = document.createElement('div');
      return new Router(outlet);
    };

    test('When no routes then breadcrumbs also empty', () => {
      const breadcrumbs = extractBreadcrumbsFromLocation(mockLocation({}));
      assert.isTrue(breadcrumbs.length === 0);
    });

    test('When routes without breadcrumbs configuration then output is empty', () => {
      const breadcrumbs = extractBreadcrumbsFromLocation(
        mockLocation({
          routes: [{path: '', component: 'home'}, {path: 'page1', component: 'page1'}],
        }),
      );
      assert.isTrue(breadcrumbs.length === 0);
    });

    test('When routes provided with breadcrumbs configuration then output is not empty', () => {
      connectUrlGeneratorWithRouter(createRouter());
      const breadcrumbs = extractBreadcrumbsFromLocation(
        mockLocation({
          routes: [
            {path: '', component: 'home', breadcrumb: {href: '', label: 'Home'}},
            {path: 'page1', component: 'page1', breadcrumb: {href: 'page1', label: 'Page1'}},
          ],
        }),
      );

      const expected = [
        {
          path: '',
          disabled: false,
          href: '',
          label: 'Home',
          matchPath: true,
          matchFullPath: false,
        },
        {
          path: 'page1',
          disabled: false,
          href: 'page1',
          label: 'Page1',
          matchPath: false,
          matchFullPath: false,
        },
      ];
      assert.deepEqual(breadcrumbs, expected);
    });

    test('When routes provided with breadcrumbs configuration then output is not empty and have selected info', () => {
      connectUrlGeneratorWithRouter(createRouter());
      const breadcrumbs = extractBreadcrumbsFromLocation(
        mockLocation({
          pathname: 'page1',
          routes: [
            {path: '', component: 'home', breadcrumb: {href: '', label: 'Home'}},
            {path: 'page1', component: 'page1', breadcrumb: {href: 'page1', label: 'Page1'}},
          ],
        }),
      );

      const expected = [
        {
          path: '',
          disabled: false,
          href: '',
          label: 'Home',
          matchPath: true,
          matchFullPath: false,
        },
        {
          path: 'page1',
          disabled: false,
          href: 'page1',
          label: 'Page1',
          matchPath: true,
          matchFullPath: true,
        },
      ];
      assert.deepEqual(breadcrumbs, expected);
    });
  });
});
