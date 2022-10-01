import Rellax from 'rellax';
var _Vue; // tslint:disable-line variable-name
var instanceMap = new WeakMap();
var inserted = function (el, _a, vm) {
    var value = _a.value;
    if (value === false) {
        return;
    }
    instanceMap.set(el, new Rellax(el, value));
    console.log("Installed Rellax on an element.");
};
var destroy = function (el) {
    var instance = instanceMap.get(el);
    if (!instance) {
        return;
    }
    instance.destroy();
};
var unbind = function (el) {
    destroy(el);
};
var update = function (el, _a, vm) {
    var value = _a.value;
    destroy(el);
    if (value === false) {
        return;
    }
    instanceMap.set(el, new Rellax(el, value));
};
var install = function (InjectedVue) {
    _Vue = InjectedVue;
    _Vue.directive('rellax', {
        inserted: inserted,
        update: update,
        unbind: unbind,
    });
};
var plugin = {
    install: install,
};
export default plugin;
