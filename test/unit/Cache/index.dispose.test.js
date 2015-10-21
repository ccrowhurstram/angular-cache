describe('Cache#dispose()', function () {
  it('should remove the cache from the registry of caches.', function () {
    var cache = TestCacheFactory('dispose-cache');
    cache.dispose();
    try {
      assert.equal(cache.info(), { size: 0 });
      fail('should not be able to use a cache after disposing it');
    } catch (err) {

    }
    assert.isUndefined(TestCacheFactory.get('dispose-cache'));
  });
  it('should not remove items from localStorage when storageMode is used.', function () {
    var localStorageCache = TestCacheFactory('dispose-lsc', { storageMode: 'localStorage', storagePrefix: 'acc.' });
    var sessionStorageCache = TestCacheFactory('dispose-ssc', { storageMode: 'sessionStorage' });

    localStorageCache.put('item1', 'value1');
    sessionStorageCache.put('item1', 'value1');

    var localStoragePrefix = localStorageCache.$$storagePrefix;
    var sessionStoragePrefix = sessionStorageCache.$$storagePrefix;

    localStorageCache.dispose();
    sessionStorageCache.dispose();

    assert.equal(JSON.parse(localStorage.getItem(localStoragePrefix + 'dispose-lsc.data.item1')).value, 'value1');
    assert.equal(localStorage.getItem(localStoragePrefix + 'dispose-lsc.keys'), '["item1"]');
    assert.equal(JSON.parse(sessionStorage.getItem(sessionStoragePrefix + 'dispose-ssc.data.item1')).value, 'value1');
    assert.equal(sessionStorage.getItem(sessionStoragePrefix + 'dispose-ssc.keys'), '["item1"]');
  });
});
