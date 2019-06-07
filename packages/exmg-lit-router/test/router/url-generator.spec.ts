import {
  connectUrlGeneratorWithRouter, generateUrlByNameOrComponentName, generateUrlByPath, generateUrl
} from '../../src/router/url-generator';
import {Router} from '@vaadin/router';
// @ts-ignore
import {stub, assert as sinonAssert} from '../../node_modules/sinon/pkg/sinon-esm.js';

const {assert} = chai;

suite('router/url-generator', () => {
  const createRouter = () => {
    const outlet = document.createElement('div');
    return new Router(outlet);
  };

  const connectRouter = (): Router => {
    const router = createRouter();
    connectUrlGeneratorWithRouter(router);
    return router;
  };

  const restoreModuleState = () => {
    // @ts-ignore - let's restore module state
    connectUrlGeneratorWithRouter(undefined);
  };

  setup(() => {
    // restoreModuleState();
  });

  teardown(() => {
    restoreModuleState();
  });

  suite('connectUrlGeneratorWithRouter', () => {
    test('If not connected then error should be thrown', () => {
      assert.throws(generateUrl, Error);
      assert.throws(generateUrl, /Router instance should be connected during installation/);
    });

    test('If connected then error should not be thrown', () => {
      const router = connectRouter();
      const urlForPathStub = stub(router, 'urlForPath');
      assert.doesNotThrow(generateUrlByPath, Error);
      sinonAssert.callCount(urlForPathStub, 1);
      urlForPathStub.restore();
    });
  });

  suite('generateUrl', () => {
    test('should be called once without params', () => {
      const router = connectRouter();
      const getUrlStub = stub(router.location, 'getUrl');

      generateUrl();

      sinonAssert.calledWith(getUrlStub, undefined);
      sinonAssert.callCount(getUrlStub, 1);
      getUrlStub.restore();
    });

    test('should be called once with params', () => {
      const router = connectRouter();
      const getUrlStub = stub(router.location, 'getUrl');

      const params = {name: 'name'};
      generateUrl(params);

      sinonAssert.calledWith(getUrlStub, params);
      sinonAssert.callCount(getUrlStub, 1);
      getUrlStub.restore();
    });
  });

  suite('generateUrlByPath', () => {
    test('should be called once with path', () => {
      const router = connectRouter();
      const urlForPathStub = stub(router, 'urlForPath');

      generateUrlByPath('/test');

      sinonAssert.calledWith(urlForPathStub, '/test');
      sinonAssert.callCount(urlForPathStub, 1);
      urlForPathStub.restore();
    });

    test('should be called once with path and params', () => {
      const router = connectRouter();
      const urlForPathStub = stub(router, 'urlForPath');

      const params = {name: 'name'};
      generateUrlByPath('/test/:name', params);

      sinonAssert.calledWith(urlForPathStub, '/test/:name', params);
      sinonAssert.callCount(urlForPathStub, 1);
      urlForPathStub.restore();
    });
  });

  suite('generateUrlByNameOrComponentName', () => {
    test('should be called once with path', () => {
      const router = connectRouter();
      const urlForNameStub = stub(router, 'urlForName');

      generateUrlByNameOrComponentName('route-name');

      sinonAssert.calledWith(urlForNameStub, 'route-name');
      sinonAssert.callCount(urlForNameStub, 1);
      urlForNameStub.restore();
    });

    test('should be called once with path and params', () => {
      const router = connectRouter();
      const urlForNameStub = stub(router, 'urlForName');

      const params = {name: 'name'};
      generateUrlByNameOrComponentName('route-name', params);

      sinonAssert.calledWith(urlForNameStub, 'route-name', params);
      sinonAssert.callCount(urlForNameStub, 1);
      urlForNameStub.restore();
    });
  });
});
