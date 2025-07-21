/**
 * Captures native intrinsics during initialization, so vetted shims
 * (running between initialization of SES and calling lockdown) are free to
 * modify the environment without compromising the integrity of SES. For
 * example, a vetted shim can modify Object.assign because we capture and
 * export Object and assign here, then never again consult Object to get its
 * assign property.
 *
 * This pattern of use is enforced by eslint rules no-restricted-globals and
 * no-polymorphic-call.
 * We maintain the list of restricted globals in ../package.json.
 *
 * @module
 */ /* global globalThis */ /* eslint-disable no-restricted-globals */ // We cannot use globalThis as the local name since it would capture the
// lexical name.
const $a9aca437113c766f$export$18d76ae2c6f15b8 = globalThis;
const { Array: $a9aca437113c766f$export$c4be6576ca6fe4aa, ArrayBuffer: $a9aca437113c766f$export$5d43b79a1f53c8d0, Date: $a9aca437113c766f$export$6341f9a885713487, FinalizationRegistry: $a9aca437113c766f$export$76a7cbb61503421d, Float32Array: $a9aca437113c766f$export$4260b0b3d744d432, JSON: $a9aca437113c766f$export$eba5dfac2fe298, Map: $a9aca437113c766f$export$a5c7b93649eaf8f8, Math: $a9aca437113c766f$export$380958644dbbc22b, Number: $a9aca437113c766f$export$fffa67e515d04022, Object: $a9aca437113c766f$export$164a3ab98abb171d, Promise: $a9aca437113c766f$export$775f0de60169233c, Proxy: $a9aca437113c766f$export$accffb5fb4579e0d, Reflect: $a9aca437113c766f$export$5529805dde9bd358, RegExp: $a9aca437113c766f$export$7ad1be807509c5f3, Set: $a9aca437113c766f$export$bdf4ff5a442cbbc5, String: $a9aca437113c766f$export$89b8e0fa65f6a914, Symbol: $a9aca437113c766f$export$3e25e887b7a5b37b, Uint8Array: $a9aca437113c766f$export$1fcb4a98fb569a20, WeakMap: $a9aca437113c766f$export$c3ef06a70ae491c3, WeakSet: $a9aca437113c766f$export$c0627e557a270ad } = globalThis;
const { // The feral Error constructor is safe for internal use, but must not be
// revealed to post-lockdown code in any compartment including the start
// compartment since in V8 at least it bears stack inspection capabilities.
Error: $a9aca437113c766f$export$ee8c0120c8a1ca9e, RangeError: $a9aca437113c766f$export$9f5aafe6a3f83dd4, ReferenceError: $a9aca437113c766f$export$4ddbb8276b366146, SyntaxError: $a9aca437113c766f$export$f21cea08b0dd60e8, TypeError: $a9aca437113c766f$export$f1c4b559ff572cce, AggregateError: $a9aca437113c766f$export$7ae5b9bba4b0e7d5 } = globalThis;
const { assign: $a9aca437113c766f$export$e6e34fd1f2686227, create: $a9aca437113c766f$export$185802fd694ee1f5, defineProperties: $a9aca437113c766f$export$b61bda4fbca264f2, entries: $a9aca437113c766f$export$3e9f948b41964866, freeze: $a9aca437113c766f$export$792f3d81ea979f55, getOwnPropertyDescriptor: $a9aca437113c766f$export$b6b8a7926c5f8342, getOwnPropertyDescriptors: $a9aca437113c766f$export$cea84f72459ece05, getOwnPropertyNames: $a9aca437113c766f$export$988e3e0b7c600422, getPrototypeOf: $a9aca437113c766f$export$dd5385caa81b6660, is: $a9aca437113c766f$export$226b3eccf92c9ed9, isFrozen: $a9aca437113c766f$export$4fa9d63bd1bcd162, isSealed: $a9aca437113c766f$export$b6da43c47bf3b9ab, isExtensible: $a9aca437113c766f$export$64c3a041a0885d59, keys: $a9aca437113c766f$export$ed97f33186d4b816, prototype: $a9aca437113c766f$export$4c96138ee59c3c73, seal: $a9aca437113c766f$export$2b159b7d6747ae3f, preventExtensions: $a9aca437113c766f$export$24c678d8796f8ab8, setPrototypeOf: $a9aca437113c766f$export$1cb0d91350beb6cc, values: $a9aca437113c766f$export$68c286be0e7e55b7, fromEntries: $a9aca437113c766f$export$5150077fc2e7c662, hasOwn: $a9aca437113c766f$export$b5a638e9b3fff9f3 } = $a9aca437113c766f$export$164a3ab98abb171d;
const { species: $a9aca437113c766f$export$b32f6a36bf6abfe9, toStringTag: $a9aca437113c766f$export$770714d61f310111, iterator: $a9aca437113c766f$export$773d107fdaac5078, matchAll: $a9aca437113c766f$export$c499caacefcddd1a, unscopables: $a9aca437113c766f$export$86b5ec58d3c7d1e1, keyFor: $a9aca437113c766f$export$5cc35ecfe266eba7, for: $a9aca437113c766f$export$4d0ba04d25a41f31 } = $a9aca437113c766f$export$3e25e887b7a5b37b;
const { isInteger: $a9aca437113c766f$export$a287f47fed4544b8 } = $a9aca437113c766f$export$fffa67e515d04022;
const { stringify: $a9aca437113c766f$export$da236ad7d89272a5 } = $a9aca437113c766f$export$eba5dfac2fe298;
// Needed only for the Safari bug workaround below
const { defineProperty: $a9aca437113c766f$var$originalDefineProperty } = $a9aca437113c766f$export$164a3ab98abb171d;
const $a9aca437113c766f$export$fdab3c20aae16ddf = (object, prop, descriptor)=>{
    // We used to do the following, until we had to reopen Safari bug
    // https://bugs.webkit.org/show_bug.cgi?id=222538#c17
    // Once this is fixed, we may restore it.
    // // Object.defineProperty is allowed to fail silently so we use
    // // Object.defineProperties instead.
    // return defineProperties(object, { [prop]: descriptor });
    // Instead, to workaround the Safari bug
    const result = $a9aca437113c766f$var$originalDefineProperty(object, prop, descriptor);
    if (result !== object) // See https://github.com/endojs/endo/blob/master/packages/ses/error-codes/SES_DEFINE_PROPERTY_FAILED_SILENTLY.md
    throw $a9aca437113c766f$export$f1c4b559ff572cce(`Please report that the original defineProperty silently failed to set ${$a9aca437113c766f$export$da236ad7d89272a5($a9aca437113c766f$export$89b8e0fa65f6a914(prop))}. (SES_DEFINE_PROPERTY_FAILED_SILENTLY)`);
    return result;
};
const { apply: $a9aca437113c766f$export$5635d7ef4b8fee1c, construct: $a9aca437113c766f$export$453b03cfbfbe7c1c, get: $a9aca437113c766f$export$88f2f314ac4638e, getOwnPropertyDescriptor: $a9aca437113c766f$export$9d38c3135d67504e, has: $a9aca437113c766f$export$d5b4a4398144c1a9, isExtensible: $a9aca437113c766f$export$d9c3bfbe8005e380, ownKeys: $a9aca437113c766f$export$6aa2094d45f88f20, preventExtensions: $a9aca437113c766f$export$559b8858d606faa7, set: $a9aca437113c766f$export$1529a676e6d26f75 } = $a9aca437113c766f$export$5529805dde9bd358;
const { isArray: $a9aca437113c766f$export$43bee75e5e14138e, prototype: $a9aca437113c766f$export$f486e9a71c2ad64 } = $a9aca437113c766f$export$c4be6576ca6fe4aa;
const { prototype: $a9aca437113c766f$export$36022a00cdf7d33e } = $a9aca437113c766f$export$5d43b79a1f53c8d0;
const { prototype: $a9aca437113c766f$export$3bb695aede5419ee } = $a9aca437113c766f$export$a5c7b93649eaf8f8;
const { revocable: $a9aca437113c766f$export$92755a867993644b } = $a9aca437113c766f$export$accffb5fb4579e0d;
const { prototype: $a9aca437113c766f$export$c3765db6b36d3acb } = RegExp;
const { prototype: $a9aca437113c766f$export$c258e7088964d7d3 } = $a9aca437113c766f$export$bdf4ff5a442cbbc5;
const { prototype: $a9aca437113c766f$export$3ead20a35d993155 } = $a9aca437113c766f$export$89b8e0fa65f6a914;
const { prototype: $a9aca437113c766f$export$bc4fa0dd64bc6401 } = $a9aca437113c766f$export$c3ef06a70ae491c3;
const { prototype: $a9aca437113c766f$export$94ba1ab67cd777ff } = $a9aca437113c766f$export$c0627e557a270ad;
const { prototype: $a9aca437113c766f$export$fec1d9ef784bcddd } = Function;
const { prototype: $a9aca437113c766f$export$36b55c81f41a949f } = $a9aca437113c766f$export$775f0de60169233c;
const { prototype: $a9aca437113c766f$export$beb76942923124e5 } = $a9aca437113c766f$export$dd5385caa81b6660(// eslint-disable-next-line no-empty-function, func-names
function*() {});
const $a9aca437113c766f$export$a18b70c60f91aed9 = $a9aca437113c766f$export$dd5385caa81b6660(// eslint-disable-next-line @endo/no-polymorphic-call
$a9aca437113c766f$export$dd5385caa81b6660($a9aca437113c766f$export$f486e9a71c2ad64.values()));
const $a9aca437113c766f$export$d12e772427ea6a39 = $a9aca437113c766f$export$dd5385caa81b6660($a9aca437113c766f$export$1fcb4a98fb569a20.prototype);
const { bind: $a9aca437113c766f$var$bind } = $a9aca437113c766f$export$fec1d9ef784bcddd;
const $a9aca437113c766f$export$79f1061a2b5eaa89 = $a9aca437113c766f$var$bind.bind($a9aca437113c766f$var$bind.call); // eslint-disable-line @endo/no-polymorphic-call
const $a9aca437113c766f$export$749505955cb16739 = $a9aca437113c766f$export$b5a638e9b3fff9f3;
const $a9aca437113c766f$export$84effe734e770183 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.filter);
const $a9aca437113c766f$export$bfd322eed8b92677 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.forEach);
const $a9aca437113c766f$export$22012a5c726bef55 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.includes);
const $a9aca437113c766f$export$1153d461a945b3f7 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.join);
const $a9aca437113c766f$export$dc30017ac4432edc = /** @type {any} */ $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.map);
const $a9aca437113c766f$export$90fd762c9cdf58f6 = /** @type {any} */ $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.flatMap);
const $a9aca437113c766f$export$82e7627f0a357dca = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.pop);
const $a9aca437113c766f$export$ebdeef2dcdcc4b9e = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.push);
const $a9aca437113c766f$export$1241e6f76911999f = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.slice);
const $a9aca437113c766f$export$b208bca929f0b97b = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.some);
const $a9aca437113c766f$export$7a7adbcc2fafd347 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64.sort);
const $a9aca437113c766f$export$22cf68377ec2cccb = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$f486e9a71c2ad64[$a9aca437113c766f$export$773d107fdaac5078]);
const $a9aca437113c766f$export$6789cca2224a55dc = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$36022a00cdf7d33e.slice);
const $a9aca437113c766f$export$6fb77ce15e6f9865 = $a9aca437113c766f$export$79f1061a2b5eaa89(// @ts-expect-error we know it is there on all conforming platforms
$a9aca437113c766f$export$b6b8a7926c5f8342($a9aca437113c766f$export$36022a00cdf7d33e, 'byteLength').get);
const $a9aca437113c766f$export$d4ef36af297de0f4 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$d12e772427ea6a39.set);
const $a9aca437113c766f$export$1cce47ed56b31503 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3bb695aede5419ee.set);
const $a9aca437113c766f$export$73d9c6e26383cd58 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3bb695aede5419ee.get);
const $a9aca437113c766f$export$da8f1c6a8378fffa = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3bb695aede5419ee.has);
const $a9aca437113c766f$export$99f2cf85fd3f5ef1 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3bb695aede5419ee.delete);
const $a9aca437113c766f$export$592ef47eabb05614 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3bb695aede5419ee.entries);
const $a9aca437113c766f$export$2551bfdae9edafee = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3bb695aede5419ee[$a9aca437113c766f$export$773d107fdaac5078]);
const $a9aca437113c766f$export$32ca3ec1f5b56712 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c258e7088964d7d3.add);
const $a9aca437113c766f$export$fe56fb351c95a513 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c258e7088964d7d3.delete);
const $a9aca437113c766f$export$f15f836349dea7aa = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c258e7088964d7d3.forEach);
const $a9aca437113c766f$export$245638463c99837b = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c258e7088964d7d3.has);
const $a9aca437113c766f$export$2801d3d56f0bed59 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c258e7088964d7d3[$a9aca437113c766f$export$773d107fdaac5078]);
const $a9aca437113c766f$export$f5eecb331335fb89 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c3765db6b36d3acb.test);
const $a9aca437113c766f$export$fdf9235e05baf42e = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c3765db6b36d3acb.exec);
const $a9aca437113c766f$export$68daa558fff33f58 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$c3765db6b36d3acb[$a9aca437113c766f$export$c499caacefcddd1a]);
const $a9aca437113c766f$export$23fe586b9145310f = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.endsWith);
const $a9aca437113c766f$export$df98a4877dd5da09 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.includes);
const $a9aca437113c766f$export$919f969ddac3f3d4 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.indexOf);
const $a9aca437113c766f$export$e762a0e72c6cdc63 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.match);
const $a9aca437113c766f$export$69fa074bbf5d7656 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$beb76942923124e5.next);
const $a9aca437113c766f$export$3c7aa01d80b128a6 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$beb76942923124e5.throw);
const $a9aca437113c766f$export$a87ed4959b18f4c9 = /** @type {any} */ $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.replace);
const $a9aca437113c766f$export$3f1aed5d14f65755 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.search);
const $a9aca437113c766f$export$c092da91f497e797 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.slice);
const $a9aca437113c766f$export$aa7f8babb17e7672 = /** @type {(thisArg: string, splitter: string | RegExp | { [Symbol.split](string: string, limit?: number): string[]; }, limit?: number) => string[]} */ $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.split);
const $a9aca437113c766f$export$5a2da04c6e9e70ff = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155.startsWith);
const $a9aca437113c766f$export$f10784f3b2f485a1 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$3ead20a35d993155[$a9aca437113c766f$export$773d107fdaac5078]);
const $a9aca437113c766f$export$114aeaf62e3d2e3 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$bc4fa0dd64bc6401.delete);
const $a9aca437113c766f$export$4598b9c0e3f20c2d = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$bc4fa0dd64bc6401.get);
const $a9aca437113c766f$export$8528f42ef0e38e11 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$bc4fa0dd64bc6401.has);
const $a9aca437113c766f$export$493f42c007ccbca7 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$bc4fa0dd64bc6401.set);
const $a9aca437113c766f$export$1eb6f9a5857c0952 = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$94ba1ab67cd777ff.add);
const $a9aca437113c766f$export$902ce0282af3d7e = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$94ba1ab67cd777ff.has);
const $a9aca437113c766f$export$3f4acdc58db5898f = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$fec1d9ef784bcddd.toString);
const $a9aca437113c766f$export$a7853f6e7b955cfa = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$var$bind);
//
const { all: $a9aca437113c766f$var$all } = $a9aca437113c766f$export$775f0de60169233c;
const $a9aca437113c766f$export$327697e6f503f78f = (promises)=>$a9aca437113c766f$export$5635d7ef4b8fee1c($a9aca437113c766f$var$all, $a9aca437113c766f$export$775f0de60169233c, [
        promises
    ]);
const $a9aca437113c766f$export$ebcfb3ef221c9c4d = $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$36b55c81f41a949f.catch);
const $a9aca437113c766f$export$5df87efab9e709f6 = /** @type {any} */ $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$36b55c81f41a949f.then);
const $a9aca437113c766f$export$967fa4fe2038050e = $a9aca437113c766f$export$76a7cbb61503421d && $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$76a7cbb61503421d.prototype.register);
const $a9aca437113c766f$export$5e4c0c4fbffcea9f = $a9aca437113c766f$export$76a7cbb61503421d && $a9aca437113c766f$export$79f1061a2b5eaa89($a9aca437113c766f$export$76a7cbb61503421d.prototype.unregister);
const $a9aca437113c766f$export$cf6d801b2f909dae = (fn)=>$a9aca437113c766f$export$88f2f314ac4638e($a9aca437113c766f$export$dd5385caa81b6660(fn), 'constructor');
const $a9aca437113c766f$export$c3825b437cbdea5c = (val)=>!val || typeof val !== 'object' && typeof val !== 'function';
const $a9aca437113c766f$export$e6127cc7fe7395c3 = (value)=>value instanceof $a9aca437113c766f$export$ee8c0120c8a1ca9e;
const $a9aca437113c766f$export$f0954fd7d5368655 = (x)=>x;
const $a9aca437113c766f$export$8a0311b874bd5e8e = eval;
const $a9aca437113c766f$export$4b694e01215dcea1 = Function;
const $a9aca437113c766f$export$4da61802f00cb993 = ()=>{
    // See https://github.com/endojs/endo/blob/master/packages/ses/error-codes/SES_NO_EVAL.md
    throw $a9aca437113c766f$export$f1c4b559ff572cce('Cannot eval with evalTaming set to "no-eval" (SES_NO_EVAL)');
};
// ////////////////// FERAL_STACK_GETTER FERAL_STACK_SETTER ////////////////////
const $a9aca437113c766f$var$er1StackDesc = $a9aca437113c766f$export$b6b8a7926c5f8342(Error('er1'), 'stack');
const $a9aca437113c766f$var$er2StackDesc = $a9aca437113c766f$export$b6b8a7926c5f8342($a9aca437113c766f$export$f1c4b559ff572cce('er2'), 'stack');
let $a9aca437113c766f$var$feralStackGetter;
let $a9aca437113c766f$var$feralStackSetter;
if ($a9aca437113c766f$var$er1StackDesc && $a9aca437113c766f$var$er2StackDesc && $a9aca437113c766f$var$er1StackDesc.get) {
    // We should only encounter this case on v8 because of its problematic
    // error own stack accessor behavior.
    // Note that FF/SpiderMonkey, Moddable/XS, and the error stack proposal
    // all inherit a stack accessor property from Error.prototype, which is
    // great. That case needs no heroics to secure.
    if (// In the v8 case as we understand it, all errors have an own stack
    // accessor property, but within the same realm, all these accessor
    // properties have the same getter and have the same setter.
    // This is therefore the case that we repair.
    typeof $a9aca437113c766f$var$er1StackDesc.get === 'function' && $a9aca437113c766f$var$er1StackDesc.get === $a9aca437113c766f$var$er2StackDesc.get && typeof $a9aca437113c766f$var$er1StackDesc.set === 'function' && $a9aca437113c766f$var$er1StackDesc.set === $a9aca437113c766f$var$er2StackDesc.set) {
        // Otherwise, we have own stack accessor properties that are outside
        // our expectations, that therefore need to be understood better
        // before we know how to repair them.
        $a9aca437113c766f$var$feralStackGetter = $a9aca437113c766f$export$792f3d81ea979f55($a9aca437113c766f$var$er1StackDesc.get);
        $a9aca437113c766f$var$feralStackSetter = $a9aca437113c766f$export$792f3d81ea979f55($a9aca437113c766f$var$er1StackDesc.set);
    } else // See https://github.com/endojs/endo/blob/master/packages/ses/error-codes/SES_UNEXPECTED_ERROR_OWN_STACK_ACCESSOR.md
    throw $a9aca437113c766f$export$f1c4b559ff572cce('Unexpected Error own stack accessor functions (SES_UNEXPECTED_ERROR_OWN_STACK_ACCESSOR)');
}
const $a9aca437113c766f$export$7c57ff8c32980d69 = $a9aca437113c766f$var$feralStackGetter;
const $a9aca437113c766f$export$f135953bd669a7 = $a9aca437113c766f$var$feralStackSetter;
const $a9aca437113c766f$var$getAsyncGeneratorFunctionInstance = ()=>{
    // Test for async generator function syntax support.
    try {
        // Wrapping one in an new Function lets the `hermesc` binary file
        // parse the Metro js bundle without SyntaxError, to generate the
        // optimised Hermes bytecode bundle, when `gradlew` is called to
        // assemble the release build APK for React Native prod Android apps.
        // Delaying the error until runtime lets us customise lockdown behaviour.
        return new $a9aca437113c766f$export$4b694e01215dcea1('return (async function* AsyncGeneratorFunctionInstance() {})')();
    } catch (error) {
        // Note: `Error.prototype.jsEngine` is only set by React Native runtime, not Hermes:
        // https://github.com/facebook/react-native/blob/main/packages/react-native/ReactCommon/hermes/executor/HermesExecutorFactory.cpp#L224-L230
        if (error.name === 'SyntaxError') // Swallows Hermes error `async generators are unsupported` at runtime.
        // Note: `console` is not a JS built-in, so Hermes engine throws:
        // Uncaught ReferenceError: Property 'console' doesn't exist
        // See: https://github.com/facebook/hermes/issues/675
        // However React Native provides a `console` implementation when setting up error handling:
        // https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/InitializeCore.js
        return undefined;
        else if (error.name === 'EvalError') // eslint-disable-next-line no-empty-function
        return async function* AsyncGeneratorFunctionInstance() {};
        else throw error;
    }
};
const $a9aca437113c766f$export$17a40afc5631b10f = $a9aca437113c766f$var$getAsyncGeneratorFunctionInstance();


const $46b0c518f9f8d37e$export$d6a4d510e7af821 = (obj, prop, known, subPath, { warn: warn, error: error })=>{
    // Either the object lacks a permit or the object doesn't match the
    // permit.
    // If the permit is specifically false, not merely undefined,
    // this is a property we expect to see because we know it exists in
    // some environments and we have expressly decided to exclude it.
    // Any other disallowed property is one we have not audited and we log
    // that we are removing it so we know to look into it, as happens when
    // the language evolves new features to existing intrinsics.
    if (!known) warn(`Removing ${subPath}`);
    try {
        delete obj[prop];
    } catch (err) {
        if ((0, $a9aca437113c766f$export$b5a638e9b3fff9f3)(obj, prop)) {
            if (typeof obj === 'function' && prop === 'prototype') {
                obj.prototype = undefined;
                if (obj.prototype === undefined) {
                    warn(`Tolerating undeletable ${subPath} === undefined`);
                    return;
                }
            }
            error(`failed to delete ${subPath}`, err);
        } else error(`deleting ${subPath} threw`, err);
        throw err;
    }
};



/* eslint-disable no-restricted-globals */ /* eslint max-lines: 0 */ 
const $6985a7a28bf44856$export$487b638984a51a3 = {
    Infinity: // *** Value Properties of the Global Object
    Infinity,
    NaN: NaN,
    undefined: undefined
};
const $6985a7a28bf44856$export$ec32825d1ea42fb4 = {
    // *** Function Properties of the Global Object
    isFinite: 'isFinite',
    isNaN: 'isNaN',
    parseFloat: 'parseFloat',
    parseInt: 'parseInt',
    decodeURI: 'decodeURI',
    decodeURIComponent: 'decodeURIComponent',
    encodeURI: 'encodeURI',
    encodeURIComponent: 'encodeURIComponent',
    // *** Constructor Properties of the Global Object
    Array: 'Array',
    ArrayBuffer: 'ArrayBuffer',
    BigInt: 'BigInt',
    BigInt64Array: 'BigInt64Array',
    BigUint64Array: 'BigUint64Array',
    Boolean: 'Boolean',
    DataView: 'DataView',
    EvalError: 'EvalError',
    // https://github.com/tc39/proposal-float16array
    Float16Array: 'Float16Array',
    Float32Array: 'Float32Array',
    Float64Array: 'Float64Array',
    Int8Array: 'Int8Array',
    Int16Array: 'Int16Array',
    Int32Array: 'Int32Array',
    Map: 'Map',
    Number: 'Number',
    Object: 'Object',
    Promise: 'Promise',
    Proxy: 'Proxy',
    RangeError: 'RangeError',
    ReferenceError: 'ReferenceError',
    Set: 'Set',
    String: 'String',
    SyntaxError: 'SyntaxError',
    TypeError: 'TypeError',
    Uint8Array: 'Uint8Array',
    Uint8ClampedArray: 'Uint8ClampedArray',
    Uint16Array: 'Uint16Array',
    Uint32Array: 'Uint32Array',
    URIError: 'URIError',
    WeakMap: 'WeakMap',
    WeakSet: 'WeakSet',
    // https://github.com/tc39/proposal-iterator-helpers
    Iterator: 'Iterator',
    // https://github.com/tc39/proposal-async-iterator-helpers
    AsyncIterator: 'AsyncIterator',
    // https://github.com/endojs/endo/issues/550
    AggregateError: 'AggregateError',
    // https://github.com/tc39/proposal-explicit-resource-management
    // TODO DisposableStack, AsyncDisposableStack
    // DisposableStack: 'DisposableStack',
    // AsyncDisposableStack: 'AsyncDisposableStack',
    // https://tc39.es/proposal-shadowrealm/
    // TODO ShadowRealm
    // ShadowRealm: 'ShadowRealm',
    // *** Other Properties of the Global Object
    JSON: 'JSON',
    Reflect: 'Reflect',
    // *** Annex B
    escape: 'escape',
    unescape: 'unescape',
    // ESNext
    // https://github.com/tc39/proposal-source-phase-imports?tab=readme-ov-file#js-module-source
    ModuleSource: 'ModuleSource',
    lockdown: 'lockdown',
    harden: 'harden',
    HandledPromise: 'HandledPromise'
};
const $6985a7a28bf44856$export$38e2914b95d15ce1 = {
    // *** Constructor Properties of the Global Object
    Date: '%InitialDate%',
    Error: '%InitialError%',
    RegExp: '%InitialRegExp%',
    // Omit `Symbol`, because we want the original to appear on the
    // start compartment without passing through the permits mechanism, since
    // we want to preserve all its properties, even if we never heard of them.
    // Symbol: '%InitialSymbol%',
    // *** Other Properties of the Global Object
    Math: '%InitialMath%',
    // ESNext
    // From Error-stack proposal
    // Only on initial global. No corresponding
    // powerless form for other globals.
    getStackString: '%InitialGetStackString%'
};
const $6985a7a28bf44856$export$1e036615d36254ea = {
    // *** Constructor Properties of the Global Object
    Date: '%SharedDate%',
    Error: '%SharedError%',
    RegExp: '%SharedRegExp%',
    Symbol: '%SharedSymbol%',
    // *** Other Properties of the Global Object
    Math: '%SharedMath%'
};
const $6985a7a28bf44856$export$f2395966826b9cb1 = {
    // *** Value Properties of the Global Object
    globalThis: '%UniqueGlobalThis%',
    // *** Function Properties of the Global Object
    eval: '%UniqueEval%',
    // *** Constructor Properties of the Global Object
    Function: '%UniqueFunction%',
    // *** Other Properties of the Global Object
    // ESNext
    Compartment: '%UniqueCompartment%'
};
// All the "subclasses" of Error. These are collectively represented in the
// ECMAScript spec by the meta variable NativeError.
/** @type {GenericErrorConstructor[]} */ const $6985a7a28bf44856$export$41c9044a8b62d77e = [
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError
];
if (typeof AggregateError !== 'undefined') // Conditional, to accommodate platforms prior to AggregateError
(0, $a9aca437113c766f$export$ebdeef2dcdcc4b9e)($6985a7a28bf44856$export$41c9044a8b62d77e, AggregateError);
const $6985a7a28bf44856$export$1fd7b96b1a28b32 = {
    '[[Proto]]': '%FunctionPrototype%',
    length: 'number',
    name: 'string'
};
const $6985a7a28bf44856$export$927a7764f1aaa435 = {
    // This property is not mentioned in ECMA 262, but is present in V8 and
    // necessary for lockdown to succeed.
    '[[Proto]]': '%AsyncFunctionPrototype%'
};
// Aliases
const $6985a7a28bf44856$var$fn = $6985a7a28bf44856$export$1fd7b96b1a28b32;
const $6985a7a28bf44856$var$asyncFn = $6985a7a28bf44856$export$927a7764f1aaa435;
const $6985a7a28bf44856$var$getter = {
    get: $6985a7a28bf44856$var$fn,
    set: 'undefined'
};
// Possible but not encountered in the specs
// export const setter = {
//   get: 'undefined',
//   set: fn,
// };
const $6985a7a28bf44856$var$accessor = {
    get: $6985a7a28bf44856$var$fn,
    set: $6985a7a28bf44856$var$fn
};
// eslint-disable-next-line func-names
const $6985a7a28bf44856$var$strict = function() {
    'use strict';
};
// TODO Remove this once we no longer support the Hermes that needed this.
(0, $a9aca437113c766f$export$bfd322eed8b92677)([
    'caller',
    'arguments'
], (prop)=>{
    try {
        $6985a7a28bf44856$var$strict[prop];
    } catch (e) {
        // https://github.com/facebook/hermes/blob/main/test/hermes/function-non-strict.js
        if (e.message === 'Restricted in strict mode') // Fixed in Static Hermes: https://github.com/facebook/hermes/issues/1582
        $6985a7a28bf44856$export$1fd7b96b1a28b32[prop] = $6985a7a28bf44856$var$accessor;
    }
});
const $6985a7a28bf44856$export$b9df02a2081ce22e = (permit)=>{
    return permit === $6985a7a28bf44856$var$getter || permit === $6985a7a28bf44856$var$accessor;
};
// NativeError Object Structure
function $6985a7a28bf44856$var$NativeError(prototype) {
    return {
        // Properties of the NativeError Constructors
        '[[Proto]]': '%SharedError%',
        prototype: // NativeError.prototype
        prototype
    };
}
function $6985a7a28bf44856$var$NativeErrorPrototype(constructor) {
    return {
        // Properties of the NativeError Prototype Objects
        '[[Proto]]': '%ErrorPrototype%',
        constructor: constructor,
        message: 'string',
        name: 'string',
        // Redundantly present only on v8. Safe to remove.
        toString: false,
        // Superfluously present in some versions of V8.
        // https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-26.md#:~:text=However%2C%20Chrome%2093,and%20node%2016.11.
        cause: false
    };
}
// The TypedArray Constructors
function $6985a7a28bf44856$var$TypedArray(prototype) {
    return {
        // Properties of the TypedArray Constructors
        '[[Proto]]': '%TypedArray%',
        BYTES_PER_ELEMENT: 'number',
        prototype: prototype
    };
}
function $6985a7a28bf44856$var$TypedArrayPrototype(constructor) {
    return {
        // Properties of the TypedArray Prototype Objects
        '[[Proto]]': '%TypedArrayPrototype%',
        BYTES_PER_ELEMENT: 'number',
        constructor: constructor
    };
}
// Without Math.random
const $6985a7a28bf44856$var$CommonMath = {
    E: 'number',
    LN10: 'number',
    LN2: 'number',
    LOG10E: 'number',
    LOG2E: 'number',
    PI: 'number',
    SQRT1_2: 'number',
    SQRT2: 'number',
    '@@toStringTag': 'string',
    abs: $6985a7a28bf44856$var$fn,
    acos: $6985a7a28bf44856$var$fn,
    acosh: $6985a7a28bf44856$var$fn,
    asin: $6985a7a28bf44856$var$fn,
    asinh: $6985a7a28bf44856$var$fn,
    atan: $6985a7a28bf44856$var$fn,
    atanh: $6985a7a28bf44856$var$fn,
    atan2: $6985a7a28bf44856$var$fn,
    cbrt: $6985a7a28bf44856$var$fn,
    ceil: $6985a7a28bf44856$var$fn,
    clz32: $6985a7a28bf44856$var$fn,
    cos: $6985a7a28bf44856$var$fn,
    cosh: $6985a7a28bf44856$var$fn,
    exp: $6985a7a28bf44856$var$fn,
    expm1: $6985a7a28bf44856$var$fn,
    floor: $6985a7a28bf44856$var$fn,
    fround: $6985a7a28bf44856$var$fn,
    hypot: $6985a7a28bf44856$var$fn,
    imul: $6985a7a28bf44856$var$fn,
    log: $6985a7a28bf44856$var$fn,
    log1p: $6985a7a28bf44856$var$fn,
    log10: $6985a7a28bf44856$var$fn,
    log2: $6985a7a28bf44856$var$fn,
    max: $6985a7a28bf44856$var$fn,
    min: $6985a7a28bf44856$var$fn,
    pow: $6985a7a28bf44856$var$fn,
    round: $6985a7a28bf44856$var$fn,
    sign: $6985a7a28bf44856$var$fn,
    sin: $6985a7a28bf44856$var$fn,
    sinh: $6985a7a28bf44856$var$fn,
    sqrt: $6985a7a28bf44856$var$fn,
    tan: $6985a7a28bf44856$var$fn,
    tanh: $6985a7a28bf44856$var$fn,
    trunc: $6985a7a28bf44856$var$fn,
    // https://github.com/tc39/proposal-float16array
    f16round: $6985a7a28bf44856$var$fn,
    // https://github.com/tc39/proposal-math-sum
    sumPrecise: $6985a7a28bf44856$var$fn,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    idiv: false,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    idivmod: false,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    imod: false,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    imuldiv: false,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    irem: false,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523
    mod: false,
    // See https://github.com/Moddable-OpenSource/moddable/issues/523#issuecomment-1942904505
    irandom: false
};
const $6985a7a28bf44856$export$f76933227aa3e1b5 = {
    // ECMA https://tc39.es/ecma262
    // The intrinsics object has no prototype to avoid conflicts.
    '[[Proto]]': null,
    // %ThrowTypeError%
    '%ThrowTypeError%': $6985a7a28bf44856$var$fn,
    // *** The Global Object
    // *** Value Properties of the Global Object
    Infinity: 'number',
    NaN: 'number',
    undefined: 'undefined',
    // *** Function Properties of the Global Object
    // eval
    '%UniqueEval%': $6985a7a28bf44856$var$fn,
    isFinite: $6985a7a28bf44856$var$fn,
    isNaN: $6985a7a28bf44856$var$fn,
    parseFloat: $6985a7a28bf44856$var$fn,
    parseInt: $6985a7a28bf44856$var$fn,
    decodeURI: $6985a7a28bf44856$var$fn,
    decodeURIComponent: $6985a7a28bf44856$var$fn,
    encodeURI: $6985a7a28bf44856$var$fn,
    encodeURIComponent: $6985a7a28bf44856$var$fn,
    // *** Fundamental Objects
    Object: {
        // Properties of the Object Constructor
        '[[Proto]]': '%FunctionPrototype%',
        assign: $6985a7a28bf44856$var$fn,
        create: $6985a7a28bf44856$var$fn,
        defineProperties: $6985a7a28bf44856$var$fn,
        defineProperty: $6985a7a28bf44856$var$fn,
        entries: $6985a7a28bf44856$var$fn,
        freeze: $6985a7a28bf44856$var$fn,
        fromEntries: $6985a7a28bf44856$var$fn,
        getOwnPropertyDescriptor: $6985a7a28bf44856$var$fn,
        getOwnPropertyDescriptors: $6985a7a28bf44856$var$fn,
        getOwnPropertyNames: $6985a7a28bf44856$var$fn,
        getOwnPropertySymbols: $6985a7a28bf44856$var$fn,
        getPrototypeOf: $6985a7a28bf44856$var$fn,
        is: $6985a7a28bf44856$var$fn,
        isExtensible: $6985a7a28bf44856$var$fn,
        isFrozen: $6985a7a28bf44856$var$fn,
        isSealed: $6985a7a28bf44856$var$fn,
        keys: $6985a7a28bf44856$var$fn,
        preventExtensions: $6985a7a28bf44856$var$fn,
        prototype: '%ObjectPrototype%',
        seal: $6985a7a28bf44856$var$fn,
        setPrototypeOf: $6985a7a28bf44856$var$fn,
        values: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-accessible-object-hasownproperty
        hasOwn: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-array-grouping
        groupBy: $6985a7a28bf44856$var$fn,
        // Seen on QuickJS
        __getClass: false
    },
    '%ObjectPrototype%': {
        // Properties of the Object Prototype Object
        '[[Proto]]': null,
        constructor: 'Object',
        hasOwnProperty: $6985a7a28bf44856$var$fn,
        isPrototypeOf: $6985a7a28bf44856$var$fn,
        propertyIsEnumerable: $6985a7a28bf44856$var$fn,
        toLocaleString: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        valueOf: $6985a7a28bf44856$var$fn,
        // Annex B: Additional Properties of the Object.prototype Object
        // See note in header about the difference between [[Proto]] and --proto--
        // special notations.
        '--proto--': $6985a7a28bf44856$var$accessor,
        __defineGetter__: $6985a7a28bf44856$var$fn,
        __defineSetter__: $6985a7a28bf44856$var$fn,
        __lookupGetter__: $6985a7a28bf44856$var$fn,
        __lookupSetter__: $6985a7a28bf44856$var$fn
    },
    '%UniqueFunction%': {
        // Properties of the Function Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%FunctionPrototype%'
    },
    '%InertFunction%': {
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%FunctionPrototype%'
    },
    '%FunctionPrototype%': {
        apply: $6985a7a28bf44856$var$fn,
        bind: $6985a7a28bf44856$var$fn,
        call: $6985a7a28bf44856$var$fn,
        constructor: '%InertFunction%',
        toString: $6985a7a28bf44856$var$fn,
        '@@hasInstance': $6985a7a28bf44856$var$fn,
        // proposed but not yet std. To be removed if there
        caller: false,
        // proposed but not yet std. To be removed if there
        arguments: false,
        // Seen on QuickJS. TODO grab getter for use by console
        fileName: false,
        // Seen on QuickJS. TODO grab getter for use by console
        lineNumber: false
    },
    Boolean: {
        // Properties of the Boolean Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%BooleanPrototype%'
    },
    '%BooleanPrototype%': {
        constructor: 'Boolean',
        toString: $6985a7a28bf44856$var$fn,
        valueOf: $6985a7a28bf44856$var$fn
    },
    '%SharedSymbol%': {
        // Properties of the Symbol Constructor
        '[[Proto]]': '%FunctionPrototype%',
        asyncIterator: 'symbol',
        for: $6985a7a28bf44856$var$fn,
        hasInstance: 'symbol',
        isConcatSpreadable: 'symbol',
        iterator: 'symbol',
        keyFor: $6985a7a28bf44856$var$fn,
        match: 'symbol',
        matchAll: 'symbol',
        prototype: '%SymbolPrototype%',
        replace: 'symbol',
        search: 'symbol',
        species: 'symbol',
        split: 'symbol',
        toPrimitive: 'symbol',
        toStringTag: 'symbol',
        unscopables: 'symbol',
        // https://github.com/tc39/proposal-explicit-resource-management
        asyncDispose: 'symbol',
        // https://github.com/tc39/proposal-explicit-resource-management
        dispose: 'symbol',
        // Seen at core-js https://github.com/zloirock/core-js#ecmascript-symbol
        useSimple: false,
        // Seen at core-js https://github.com/zloirock/core-js#ecmascript-symbol
        useSetter: false,
        // Seen on QuickJS
        operatorSet: false
    },
    '%SymbolPrototype%': {
        // Properties of the Symbol Prototype Object
        constructor: '%SharedSymbol%',
        description: $6985a7a28bf44856$var$getter,
        toString: $6985a7a28bf44856$var$fn,
        valueOf: $6985a7a28bf44856$var$fn,
        '@@toPrimitive': $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    '%InitialError%': {
        // Properties of the Error Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%ErrorPrototype%',
        // Non standard, v8 only, used by tap
        captureStackTrace: $6985a7a28bf44856$var$fn,
        // Non standard, v8 only, used by tap, tamed to accessor
        stackTraceLimit: $6985a7a28bf44856$var$accessor,
        // Non standard, v8 only, used by several, tamed to accessor
        prepareStackTrace: $6985a7a28bf44856$var$accessor,
        // https://github.com/tc39/proposal-is-error
        isError: $6985a7a28bf44856$var$fn
    },
    '%SharedError%': {
        // Properties of the Error Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%ErrorPrototype%',
        // Non standard, v8 only, used by tap
        captureStackTrace: $6985a7a28bf44856$var$fn,
        // Non standard, v8 only, used by tap, tamed to accessor
        stackTraceLimit: $6985a7a28bf44856$var$accessor,
        // Non standard, v8 only, used by several, tamed to accessor
        prepareStackTrace: $6985a7a28bf44856$var$accessor,
        // https://github.com/tc39/proposal-is-error
        isError: $6985a7a28bf44856$var$fn
    },
    '%ErrorPrototype%': {
        constructor: '%SharedError%',
        message: 'string',
        name: 'string',
        toString: $6985a7a28bf44856$var$fn,
        // proposed de-facto, assumed TODO
        // Seen on FF Nightly 88.0a1
        at: false,
        // Seen on FF and XS
        stack: $6985a7a28bf44856$var$accessor,
        // Superfluously present in some versions of V8.
        // https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-26.md#:~:text=However%2C%20Chrome%2093,and%20node%2016.11.
        cause: false
    },
    // NativeError
    EvalError: $6985a7a28bf44856$var$NativeError('%EvalErrorPrototype%'),
    RangeError: $6985a7a28bf44856$var$NativeError('%RangeErrorPrototype%'),
    ReferenceError: $6985a7a28bf44856$var$NativeError('%ReferenceErrorPrototype%'),
    SyntaxError: $6985a7a28bf44856$var$NativeError('%SyntaxErrorPrototype%'),
    TypeError: $6985a7a28bf44856$var$NativeError('%TypeErrorPrototype%'),
    URIError: $6985a7a28bf44856$var$NativeError('%URIErrorPrototype%'),
    // https://github.com/endojs/endo/issues/550
    AggregateError: $6985a7a28bf44856$var$NativeError('%AggregateErrorPrototype%'),
    // TODO SuppressedError
    // https://github.com/tc39/proposal-explicit-resource-management
    // SuppressedError: NativeError('%SuppressedErrorPrototype%'),
    '%EvalErrorPrototype%': $6985a7a28bf44856$var$NativeErrorPrototype('EvalError'),
    '%RangeErrorPrototype%': $6985a7a28bf44856$var$NativeErrorPrototype('RangeError'),
    '%ReferenceErrorPrototype%': $6985a7a28bf44856$var$NativeErrorPrototype('ReferenceError'),
    '%SyntaxErrorPrototype%': $6985a7a28bf44856$var$NativeErrorPrototype('SyntaxError'),
    '%TypeErrorPrototype%': $6985a7a28bf44856$var$NativeErrorPrototype('TypeError'),
    '%URIErrorPrototype%': $6985a7a28bf44856$var$NativeErrorPrototype('URIError'),
    // https://github.com/endojs/endo/issues/550
    '%AggregateErrorPrototype%': $6985a7a28bf44856$var$NativeErrorPrototype('AggregateError'),
    // TODO AggregateError .errors
    // TODO SuppressedError
    // https://github.com/tc39/proposal-explicit-resource-management
    // '%SuppressedErrorPrototype%': NativeErrorPrototype('SuppressedError'),
    // TODO SuppressedError .error
    // TODO SuppressedError .suppressed
    // *** Numbers and Dates
    Number: {
        // Properties of the Number Constructor
        '[[Proto]]': '%FunctionPrototype%',
        EPSILON: 'number',
        isFinite: $6985a7a28bf44856$var$fn,
        isInteger: $6985a7a28bf44856$var$fn,
        isNaN: $6985a7a28bf44856$var$fn,
        isSafeInteger: $6985a7a28bf44856$var$fn,
        MAX_SAFE_INTEGER: 'number',
        MAX_VALUE: 'number',
        MIN_SAFE_INTEGER: 'number',
        MIN_VALUE: 'number',
        NaN: 'number',
        NEGATIVE_INFINITY: 'number',
        parseFloat: $6985a7a28bf44856$var$fn,
        parseInt: $6985a7a28bf44856$var$fn,
        POSITIVE_INFINITY: 'number',
        prototype: '%NumberPrototype%'
    },
    '%NumberPrototype%': {
        // Properties of the Number Prototype Object
        constructor: 'Number',
        toExponential: $6985a7a28bf44856$var$fn,
        toFixed: $6985a7a28bf44856$var$fn,
        toLocaleString: $6985a7a28bf44856$var$fn,
        toPrecision: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        valueOf: $6985a7a28bf44856$var$fn
    },
    BigInt: {
        // Properties of the BigInt Constructor
        '[[Proto]]': '%FunctionPrototype%',
        asIntN: $6985a7a28bf44856$var$fn,
        asUintN: $6985a7a28bf44856$var$fn,
        prototype: '%BigIntPrototype%',
        // See https://github.com/Moddable-OpenSource/moddable/issues/523
        bitLength: false,
        // See https://github.com/Moddable-OpenSource/moddable/issues/523
        fromArrayBuffer: false,
        // Seen on QuickJS
        tdiv: false,
        // Seen on QuickJS
        fdiv: false,
        // Seen on QuickJS
        cdiv: false,
        // Seen on QuickJS
        ediv: false,
        // Seen on QuickJS
        tdivrem: false,
        // Seen on QuickJS
        fdivrem: false,
        // Seen on QuickJS
        cdivrem: false,
        // Seen on QuickJS
        edivrem: false,
        // Seen on QuickJS
        sqrt: false,
        // Seen on QuickJS
        sqrtrem: false,
        // Seen on QuickJS
        floorLog2: false,
        // Seen on QuickJS
        ctz: false
    },
    '%BigIntPrototype%': {
        constructor: 'BigInt',
        toLocaleString: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        valueOf: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    '%InitialMath%': {
        ...$6985a7a28bf44856$var$CommonMath,
        // `%InitialMath%.random()` has the standard unsafe behavior
        random: $6985a7a28bf44856$var$fn
    },
    '%SharedMath%': {
        ...$6985a7a28bf44856$var$CommonMath,
        // `%SharedMath%.random()` is tamed to always throw
        random: $6985a7a28bf44856$var$fn
    },
    '%InitialDate%': {
        // Properties of the Date Constructor
        '[[Proto]]': '%FunctionPrototype%',
        now: $6985a7a28bf44856$var$fn,
        parse: $6985a7a28bf44856$var$fn,
        prototype: '%DatePrototype%',
        UTC: $6985a7a28bf44856$var$fn
    },
    '%SharedDate%': {
        // Properties of the Date Constructor
        '[[Proto]]': '%FunctionPrototype%',
        // `%SharedDate%.now()` is tamed to always throw
        now: $6985a7a28bf44856$var$fn,
        parse: $6985a7a28bf44856$var$fn,
        prototype: '%DatePrototype%',
        UTC: $6985a7a28bf44856$var$fn
    },
    '%DatePrototype%': {
        constructor: '%SharedDate%',
        getDate: $6985a7a28bf44856$var$fn,
        getDay: $6985a7a28bf44856$var$fn,
        getFullYear: $6985a7a28bf44856$var$fn,
        getHours: $6985a7a28bf44856$var$fn,
        getMilliseconds: $6985a7a28bf44856$var$fn,
        getMinutes: $6985a7a28bf44856$var$fn,
        getMonth: $6985a7a28bf44856$var$fn,
        getSeconds: $6985a7a28bf44856$var$fn,
        getTime: $6985a7a28bf44856$var$fn,
        getTimezoneOffset: $6985a7a28bf44856$var$fn,
        getUTCDate: $6985a7a28bf44856$var$fn,
        getUTCDay: $6985a7a28bf44856$var$fn,
        getUTCFullYear: $6985a7a28bf44856$var$fn,
        getUTCHours: $6985a7a28bf44856$var$fn,
        getUTCMilliseconds: $6985a7a28bf44856$var$fn,
        getUTCMinutes: $6985a7a28bf44856$var$fn,
        getUTCMonth: $6985a7a28bf44856$var$fn,
        getUTCSeconds: $6985a7a28bf44856$var$fn,
        setDate: $6985a7a28bf44856$var$fn,
        setFullYear: $6985a7a28bf44856$var$fn,
        setHours: $6985a7a28bf44856$var$fn,
        setMilliseconds: $6985a7a28bf44856$var$fn,
        setMinutes: $6985a7a28bf44856$var$fn,
        setMonth: $6985a7a28bf44856$var$fn,
        setSeconds: $6985a7a28bf44856$var$fn,
        setTime: $6985a7a28bf44856$var$fn,
        setUTCDate: $6985a7a28bf44856$var$fn,
        setUTCFullYear: $6985a7a28bf44856$var$fn,
        setUTCHours: $6985a7a28bf44856$var$fn,
        setUTCMilliseconds: $6985a7a28bf44856$var$fn,
        setUTCMinutes: $6985a7a28bf44856$var$fn,
        setUTCMonth: $6985a7a28bf44856$var$fn,
        setUTCSeconds: $6985a7a28bf44856$var$fn,
        toDateString: $6985a7a28bf44856$var$fn,
        toISOString: $6985a7a28bf44856$var$fn,
        toJSON: $6985a7a28bf44856$var$fn,
        toLocaleDateString: $6985a7a28bf44856$var$fn,
        toLocaleString: $6985a7a28bf44856$var$fn,
        toLocaleTimeString: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        toTimeString: $6985a7a28bf44856$var$fn,
        toUTCString: $6985a7a28bf44856$var$fn,
        valueOf: $6985a7a28bf44856$var$fn,
        '@@toPrimitive': $6985a7a28bf44856$var$fn,
        // Annex B: Additional Properties of the Date.prototype Object
        getYear: $6985a7a28bf44856$var$fn,
        setYear: $6985a7a28bf44856$var$fn,
        toGMTString: $6985a7a28bf44856$var$fn
    },
    // Text Processing
    String: {
        // Properties of the String Constructor
        '[[Proto]]': '%FunctionPrototype%',
        fromCharCode: $6985a7a28bf44856$var$fn,
        fromCodePoint: $6985a7a28bf44856$var$fn,
        prototype: '%StringPrototype%',
        raw: $6985a7a28bf44856$var$fn,
        // See https://github.com/Moddable-OpenSource/moddable/issues/523
        fromArrayBuffer: false
    },
    '%StringPrototype%': {
        // Properties of the String Prototype Object
        length: 'number',
        charAt: $6985a7a28bf44856$var$fn,
        charCodeAt: $6985a7a28bf44856$var$fn,
        codePointAt: $6985a7a28bf44856$var$fn,
        concat: $6985a7a28bf44856$var$fn,
        constructor: 'String',
        endsWith: $6985a7a28bf44856$var$fn,
        includes: $6985a7a28bf44856$var$fn,
        indexOf: $6985a7a28bf44856$var$fn,
        lastIndexOf: $6985a7a28bf44856$var$fn,
        localeCompare: $6985a7a28bf44856$var$fn,
        match: $6985a7a28bf44856$var$fn,
        matchAll: $6985a7a28bf44856$var$fn,
        normalize: $6985a7a28bf44856$var$fn,
        padEnd: $6985a7a28bf44856$var$fn,
        padStart: $6985a7a28bf44856$var$fn,
        repeat: $6985a7a28bf44856$var$fn,
        replace: $6985a7a28bf44856$var$fn,
        replaceAll: $6985a7a28bf44856$var$fn,
        search: $6985a7a28bf44856$var$fn,
        slice: $6985a7a28bf44856$var$fn,
        split: $6985a7a28bf44856$var$fn,
        startsWith: $6985a7a28bf44856$var$fn,
        substring: $6985a7a28bf44856$var$fn,
        toLocaleLowerCase: $6985a7a28bf44856$var$fn,
        toLocaleUpperCase: $6985a7a28bf44856$var$fn,
        toLowerCase: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        toUpperCase: $6985a7a28bf44856$var$fn,
        trim: $6985a7a28bf44856$var$fn,
        trimEnd: $6985a7a28bf44856$var$fn,
        trimStart: $6985a7a28bf44856$var$fn,
        valueOf: $6985a7a28bf44856$var$fn,
        '@@iterator': $6985a7a28bf44856$var$fn,
        // Failed tc39 proposal
        // https://github.com/tc39/proposal-relative-indexing-method
        at: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-is-usv-string
        isWellFormed: $6985a7a28bf44856$var$fn,
        toWellFormed: $6985a7a28bf44856$var$fn,
        unicodeSets: $6985a7a28bf44856$var$fn,
        // Annex B: Additional Properties of the String.prototype Object
        substr: $6985a7a28bf44856$var$fn,
        anchor: $6985a7a28bf44856$var$fn,
        big: $6985a7a28bf44856$var$fn,
        blink: $6985a7a28bf44856$var$fn,
        bold: $6985a7a28bf44856$var$fn,
        fixed: $6985a7a28bf44856$var$fn,
        fontcolor: $6985a7a28bf44856$var$fn,
        fontsize: $6985a7a28bf44856$var$fn,
        italics: $6985a7a28bf44856$var$fn,
        link: $6985a7a28bf44856$var$fn,
        small: $6985a7a28bf44856$var$fn,
        strike: $6985a7a28bf44856$var$fn,
        sub: $6985a7a28bf44856$var$fn,
        sup: $6985a7a28bf44856$var$fn,
        trimLeft: $6985a7a28bf44856$var$fn,
        trimRight: $6985a7a28bf44856$var$fn,
        // See https://github.com/Moddable-OpenSource/moddable/issues/523
        compare: false,
        // Seen on QuickJS
        __quote: false
    },
    '%StringIteratorPrototype%': {
        '[[Proto]]': '%IteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    '%InitialRegExp%': {
        // Properties of the RegExp Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%RegExpPrototype%',
        '@@species': $6985a7a28bf44856$var$getter,
        // https://github.com/tc39/proposal-regex-escaping
        escape: $6985a7a28bf44856$var$fn,
        // The https://github.com/tc39/proposal-regexp-legacy-features
        // are all optional, unsafe, and omitted
        input: false,
        $_: false,
        lastMatch: false,
        '$&': false,
        lastParen: false,
        '$+': false,
        leftContext: false,
        '$`': false,
        rightContext: false,
        "$'": false,
        $1: false,
        $2: false,
        $3: false,
        $4: false,
        $5: false,
        $6: false,
        $7: false,
        $8: false,
        $9: false
    },
    '%SharedRegExp%': {
        // Properties of the RegExp Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%RegExpPrototype%',
        '@@species': $6985a7a28bf44856$var$getter,
        // https://github.com/tc39/proposal-regex-escaping
        escape: $6985a7a28bf44856$var$fn
    },
    '%RegExpPrototype%': {
        // Properties of the RegExp Prototype Object
        constructor: '%SharedRegExp%',
        exec: $6985a7a28bf44856$var$fn,
        dotAll: $6985a7a28bf44856$var$getter,
        flags: $6985a7a28bf44856$var$getter,
        global: $6985a7a28bf44856$var$getter,
        hasIndices: $6985a7a28bf44856$var$getter,
        ignoreCase: $6985a7a28bf44856$var$getter,
        '@@match': $6985a7a28bf44856$var$fn,
        '@@matchAll': $6985a7a28bf44856$var$fn,
        multiline: $6985a7a28bf44856$var$getter,
        '@@replace': $6985a7a28bf44856$var$fn,
        '@@search': $6985a7a28bf44856$var$fn,
        source: $6985a7a28bf44856$var$getter,
        '@@split': $6985a7a28bf44856$var$fn,
        sticky: $6985a7a28bf44856$var$getter,
        test: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        unicode: $6985a7a28bf44856$var$getter,
        unicodeSets: $6985a7a28bf44856$var$getter,
        // Annex B: Additional Properties of the RegExp.prototype Object
        compile: false
    },
    '%RegExpStringIteratorPrototype%': {
        // The %RegExpStringIteratorPrototype% Object
        '[[Proto]]': '%IteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    // Indexed Collections
    Array: {
        // Properties of the Array Constructor
        '[[Proto]]': '%FunctionPrototype%',
        from: $6985a7a28bf44856$var$fn,
        isArray: $6985a7a28bf44856$var$fn,
        of: $6985a7a28bf44856$var$fn,
        prototype: '%ArrayPrototype%',
        '@@species': $6985a7a28bf44856$var$getter,
        // Failed tc39 proposal
        // https://tc39.es/proposal-relative-indexing-method/
        at: $6985a7a28bf44856$var$fn,
        // https://tc39.es/proposal-array-from-async/
        fromAsync: $6985a7a28bf44856$var$fn
    },
    '%ArrayPrototype%': {
        // Properties of the Array Prototype Object
        length: 'number',
        concat: $6985a7a28bf44856$var$fn,
        constructor: 'Array',
        copyWithin: $6985a7a28bf44856$var$fn,
        entries: $6985a7a28bf44856$var$fn,
        every: $6985a7a28bf44856$var$fn,
        fill: $6985a7a28bf44856$var$fn,
        filter: $6985a7a28bf44856$var$fn,
        find: $6985a7a28bf44856$var$fn,
        findIndex: $6985a7a28bf44856$var$fn,
        flat: $6985a7a28bf44856$var$fn,
        flatMap: $6985a7a28bf44856$var$fn,
        forEach: $6985a7a28bf44856$var$fn,
        includes: $6985a7a28bf44856$var$fn,
        indexOf: $6985a7a28bf44856$var$fn,
        join: $6985a7a28bf44856$var$fn,
        keys: $6985a7a28bf44856$var$fn,
        lastIndexOf: $6985a7a28bf44856$var$fn,
        map: $6985a7a28bf44856$var$fn,
        pop: $6985a7a28bf44856$var$fn,
        push: $6985a7a28bf44856$var$fn,
        reduce: $6985a7a28bf44856$var$fn,
        reduceRight: $6985a7a28bf44856$var$fn,
        reverse: $6985a7a28bf44856$var$fn,
        shift: $6985a7a28bf44856$var$fn,
        slice: $6985a7a28bf44856$var$fn,
        some: $6985a7a28bf44856$var$fn,
        sort: $6985a7a28bf44856$var$fn,
        splice: $6985a7a28bf44856$var$fn,
        toLocaleString: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        unshift: $6985a7a28bf44856$var$fn,
        values: $6985a7a28bf44856$var$fn,
        '@@iterator': $6985a7a28bf44856$var$fn,
        '@@unscopables': {
            '[[Proto]]': null,
            copyWithin: 'boolean',
            entries: 'boolean',
            fill: 'boolean',
            find: 'boolean',
            findIndex: 'boolean',
            flat: 'boolean',
            flatMap: 'boolean',
            includes: 'boolean',
            keys: 'boolean',
            values: 'boolean',
            // Failed tc39 proposal
            // https://tc39.es/proposal-relative-indexing-method/
            // Seen on FF Nightly 88.0a1
            at: 'boolean',
            // See https://github.com/tc39/proposal-array-find-from-last
            findLast: 'boolean',
            findLastIndex: 'boolean',
            // https://github.com/tc39/proposal-change-array-by-copy
            toReversed: 'boolean',
            toSorted: 'boolean',
            toSpliced: 'boolean',
            with: 'boolean',
            // https://github.com/tc39/proposal-array-grouping
            group: 'boolean',
            groupToMap: 'boolean',
            groupBy: 'boolean'
        },
        // See https://github.com/tc39/proposal-array-find-from-last
        findLast: $6985a7a28bf44856$var$fn,
        findLastIndex: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-change-array-by-copy
        toReversed: $6985a7a28bf44856$var$fn,
        toSorted: $6985a7a28bf44856$var$fn,
        toSpliced: $6985a7a28bf44856$var$fn,
        with: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-array-grouping
        group: $6985a7a28bf44856$var$fn,
        groupToMap: $6985a7a28bf44856$var$fn,
        groupBy: $6985a7a28bf44856$var$fn,
        // Failed tc39 proposal
        // https://tc39.es/proposal-relative-indexing-method/
        at: $6985a7a28bf44856$var$fn
    },
    '%ArrayIteratorPrototype%': {
        // The %ArrayIteratorPrototype% Object
        '[[Proto]]': '%IteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    // *** TypedArray Objects
    '%TypedArray%': {
        // Properties of the %TypedArray% Intrinsic Object
        '[[Proto]]': '%FunctionPrototype%',
        from: $6985a7a28bf44856$var$fn,
        of: $6985a7a28bf44856$var$fn,
        prototype: '%TypedArrayPrototype%',
        '@@species': $6985a7a28bf44856$var$getter
    },
    '%TypedArrayPrototype%': {
        buffer: $6985a7a28bf44856$var$getter,
        byteLength: $6985a7a28bf44856$var$getter,
        byteOffset: $6985a7a28bf44856$var$getter,
        constructor: '%TypedArray%',
        copyWithin: $6985a7a28bf44856$var$fn,
        entries: $6985a7a28bf44856$var$fn,
        every: $6985a7a28bf44856$var$fn,
        fill: $6985a7a28bf44856$var$fn,
        filter: $6985a7a28bf44856$var$fn,
        find: $6985a7a28bf44856$var$fn,
        findIndex: $6985a7a28bf44856$var$fn,
        forEach: $6985a7a28bf44856$var$fn,
        includes: $6985a7a28bf44856$var$fn,
        indexOf: $6985a7a28bf44856$var$fn,
        join: $6985a7a28bf44856$var$fn,
        keys: $6985a7a28bf44856$var$fn,
        lastIndexOf: $6985a7a28bf44856$var$fn,
        length: $6985a7a28bf44856$var$getter,
        map: $6985a7a28bf44856$var$fn,
        reduce: $6985a7a28bf44856$var$fn,
        reduceRight: $6985a7a28bf44856$var$fn,
        reverse: $6985a7a28bf44856$var$fn,
        set: $6985a7a28bf44856$var$fn,
        slice: $6985a7a28bf44856$var$fn,
        some: $6985a7a28bf44856$var$fn,
        sort: $6985a7a28bf44856$var$fn,
        subarray: $6985a7a28bf44856$var$fn,
        toLocaleString: $6985a7a28bf44856$var$fn,
        toString: $6985a7a28bf44856$var$fn,
        values: $6985a7a28bf44856$var$fn,
        '@@iterator': $6985a7a28bf44856$var$fn,
        '@@toStringTag': $6985a7a28bf44856$var$getter,
        // Failed tc39 proposal
        // https://tc39.es/proposal-relative-indexing-method/
        at: $6985a7a28bf44856$var$fn,
        // See https://github.com/tc39/proposal-array-find-from-last
        findLast: $6985a7a28bf44856$var$fn,
        findLastIndex: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-change-array-by-copy
        toReversed: $6985a7a28bf44856$var$fn,
        toSorted: $6985a7a28bf44856$var$fn,
        with: $6985a7a28bf44856$var$fn
    },
    // The TypedArray Constructors
    BigInt64Array: $6985a7a28bf44856$var$TypedArray('%BigInt64ArrayPrototype%'),
    BigUint64Array: $6985a7a28bf44856$var$TypedArray('%BigUint64ArrayPrototype%'),
    // https://github.com/tc39/proposal-float16array
    Float16Array: $6985a7a28bf44856$var$TypedArray('%Float16ArrayPrototype%'),
    Float32Array: $6985a7a28bf44856$var$TypedArray('%Float32ArrayPrototype%'),
    Float64Array: $6985a7a28bf44856$var$TypedArray('%Float64ArrayPrototype%'),
    Int16Array: $6985a7a28bf44856$var$TypedArray('%Int16ArrayPrototype%'),
    Int32Array: $6985a7a28bf44856$var$TypedArray('%Int32ArrayPrototype%'),
    Int8Array: $6985a7a28bf44856$var$TypedArray('%Int8ArrayPrototype%'),
    Uint16Array: $6985a7a28bf44856$var$TypedArray('%Uint16ArrayPrototype%'),
    Uint32Array: $6985a7a28bf44856$var$TypedArray('%Uint32ArrayPrototype%'),
    Uint8ClampedArray: $6985a7a28bf44856$var$TypedArray('%Uint8ClampedArrayPrototype%'),
    Uint8Array: {
        ...$6985a7a28bf44856$var$TypedArray('%Uint8ArrayPrototype%'),
        // https://github.com/tc39/proposal-arraybuffer-base64
        fromBase64: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-arraybuffer-base64
        fromHex: $6985a7a28bf44856$var$fn
    },
    '%BigInt64ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('BigInt64Array'),
    '%BigUint64ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('BigUint64Array'),
    // https://github.com/tc39/proposal-float16array
    '%Float16ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Float16Array'),
    '%Float32ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Float32Array'),
    '%Float64ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Float64Array'),
    '%Int16ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Int16Array'),
    '%Int32ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Int32Array'),
    '%Int8ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Int8Array'),
    '%Uint16ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Uint16Array'),
    '%Uint32ArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Uint32Array'),
    '%Uint8ClampedArrayPrototype%': $6985a7a28bf44856$var$TypedArrayPrototype('Uint8ClampedArray'),
    '%Uint8ArrayPrototype%': {
        ...$6985a7a28bf44856$var$TypedArrayPrototype('Uint8Array'),
        // https://github.com/tc39/proposal-arraybuffer-base64
        setFromBase64: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-arraybuffer-base64
        setFromHex: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-arraybuffer-base64
        toBase64: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-arraybuffer-base64
        toHex: $6985a7a28bf44856$var$fn
    },
    // *** Keyed Collections
    Map: {
        // Properties of the Map Constructor
        '[[Proto]]': '%FunctionPrototype%',
        '@@species': $6985a7a28bf44856$var$getter,
        prototype: '%MapPrototype%',
        // https://github.com/tc39/proposal-array-grouping
        groupBy: $6985a7a28bf44856$var$fn
    },
    '%MapPrototype%': {
        clear: $6985a7a28bf44856$var$fn,
        constructor: 'Map',
        delete: $6985a7a28bf44856$var$fn,
        entries: $6985a7a28bf44856$var$fn,
        forEach: $6985a7a28bf44856$var$fn,
        get: $6985a7a28bf44856$var$fn,
        has: $6985a7a28bf44856$var$fn,
        keys: $6985a7a28bf44856$var$fn,
        set: $6985a7a28bf44856$var$fn,
        size: $6985a7a28bf44856$var$getter,
        values: $6985a7a28bf44856$var$fn,
        '@@iterator': $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    '%MapIteratorPrototype%': {
        // The %MapIteratorPrototype% Object
        '[[Proto]]': '%IteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    Set: {
        // Properties of the Set Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%SetPrototype%',
        '@@species': $6985a7a28bf44856$var$getter,
        // Seen on QuickJS
        groupBy: false
    },
    '%SetPrototype%': {
        add: $6985a7a28bf44856$var$fn,
        clear: $6985a7a28bf44856$var$fn,
        constructor: 'Set',
        delete: $6985a7a28bf44856$var$fn,
        entries: $6985a7a28bf44856$var$fn,
        forEach: $6985a7a28bf44856$var$fn,
        has: $6985a7a28bf44856$var$fn,
        keys: $6985a7a28bf44856$var$fn,
        size: $6985a7a28bf44856$var$getter,
        values: $6985a7a28bf44856$var$fn,
        '@@iterator': $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string',
        // See https://github.com/tc39/proposal-set-methods
        intersection: $6985a7a28bf44856$var$fn,
        // See https://github.com/tc39/proposal-set-methods
        union: $6985a7a28bf44856$var$fn,
        // See https://github.com/tc39/proposal-set-methods
        difference: $6985a7a28bf44856$var$fn,
        // See https://github.com/tc39/proposal-set-methods
        symmetricDifference: $6985a7a28bf44856$var$fn,
        // See https://github.com/tc39/proposal-set-methods
        isSubsetOf: $6985a7a28bf44856$var$fn,
        // See https://github.com/tc39/proposal-set-methods
        isSupersetOf: $6985a7a28bf44856$var$fn,
        // See https://github.com/tc39/proposal-set-methods
        isDisjointFrom: $6985a7a28bf44856$var$fn
    },
    '%SetIteratorPrototype%': {
        // The %SetIteratorPrototype% Object
        '[[Proto]]': '%IteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    WeakMap: {
        // Properties of the WeakMap Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%WeakMapPrototype%'
    },
    '%WeakMapPrototype%': {
        constructor: 'WeakMap',
        delete: $6985a7a28bf44856$var$fn,
        get: $6985a7a28bf44856$var$fn,
        has: $6985a7a28bf44856$var$fn,
        set: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    WeakSet: {
        // Properties of the WeakSet Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%WeakSetPrototype%'
    },
    '%WeakSetPrototype%': {
        add: $6985a7a28bf44856$var$fn,
        constructor: 'WeakSet',
        delete: $6985a7a28bf44856$var$fn,
        has: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    // *** Structured Data
    ArrayBuffer: {
        // Properties of the ArrayBuffer Constructor
        '[[Proto]]': '%FunctionPrototype%',
        isView: $6985a7a28bf44856$var$fn,
        prototype: '%ArrayBufferPrototype%',
        '@@species': $6985a7a28bf44856$var$getter,
        // See https://github.com/Moddable-OpenSource/moddable/issues/523
        fromString: false,
        // See https://github.com/Moddable-OpenSource/moddable/issues/523
        fromBigInt: false
    },
    '%ArrayBufferPrototype%': {
        byteLength: $6985a7a28bf44856$var$getter,
        constructor: 'ArrayBuffer',
        slice: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string',
        // See https://github.com/Moddable-OpenSource/moddable/issues/523
        concat: false,
        // See https://github.com/tc39/proposal-resizablearraybuffer
        transfer: $6985a7a28bf44856$var$fn,
        resize: $6985a7a28bf44856$var$fn,
        resizable: $6985a7a28bf44856$var$getter,
        maxByteLength: $6985a7a28bf44856$var$getter,
        // https://github.com/tc39/proposal-arraybuffer-transfer
        transferToFixedLength: $6985a7a28bf44856$var$fn,
        detached: $6985a7a28bf44856$var$getter,
        // https://github.com/endojs/endo/pull/2309#issuecomment-2155513240
        // to be proposed
        transferToImmutable: $6985a7a28bf44856$var$fn,
        sliceToImmutable: $6985a7a28bf44856$var$fn,
        immutable: $6985a7a28bf44856$var$getter
    },
    // If this exists, it is purely an artifact of how we currently shim
    // `transferToImmutable`. As natively implemented, there would be no
    // such extra prototype.
    '%ImmutableArrayBufferPrototype%': {
        '[[Proto]]': '%ArrayBufferPrototype%',
        byteLength: $6985a7a28bf44856$var$getter,
        slice: $6985a7a28bf44856$var$fn,
        // See https://github.com/endojs/endo/tree/master/packages/immutable-arraybuffer#purposeful-violation
        '@@toStringTag': 'string',
        // See https://github.com/tc39/proposal-resizablearraybuffer
        transfer: $6985a7a28bf44856$var$fn,
        resize: $6985a7a28bf44856$var$fn,
        resizable: $6985a7a28bf44856$var$getter,
        maxByteLength: $6985a7a28bf44856$var$getter,
        // https://github.com/tc39/proposal-arraybuffer-transfer
        transferToFixedLength: $6985a7a28bf44856$var$fn,
        detached: $6985a7a28bf44856$var$getter,
        // https://github.com/endojs/endo/pull/2309#issuecomment-2155513240
        // to be proposed
        transferToImmutable: $6985a7a28bf44856$var$fn,
        sliceToImmutable: $6985a7a28bf44856$var$fn,
        immutable: $6985a7a28bf44856$var$getter
    },
    // SharedArrayBuffer Objects
    SharedArrayBuffer: false,
    '%SharedArrayBufferPrototype%': false,
    DataView: {
        // Properties of the DataView Constructor
        '[[Proto]]': '%FunctionPrototype%',
        BYTES_PER_ELEMENT: 'number',
        prototype: '%DataViewPrototype%'
    },
    '%DataViewPrototype%': {
        buffer: $6985a7a28bf44856$var$getter,
        byteLength: $6985a7a28bf44856$var$getter,
        byteOffset: $6985a7a28bf44856$var$getter,
        constructor: 'DataView',
        getBigInt64: $6985a7a28bf44856$var$fn,
        getBigUint64: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-float16array
        getFloat16: $6985a7a28bf44856$var$fn,
        getFloat32: $6985a7a28bf44856$var$fn,
        getFloat64: $6985a7a28bf44856$var$fn,
        getInt8: $6985a7a28bf44856$var$fn,
        getInt16: $6985a7a28bf44856$var$fn,
        getInt32: $6985a7a28bf44856$var$fn,
        getUint8: $6985a7a28bf44856$var$fn,
        getUint16: $6985a7a28bf44856$var$fn,
        getUint32: $6985a7a28bf44856$var$fn,
        setBigInt64: $6985a7a28bf44856$var$fn,
        setBigUint64: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-float16array
        setFloat16: $6985a7a28bf44856$var$fn,
        setFloat32: $6985a7a28bf44856$var$fn,
        setFloat64: $6985a7a28bf44856$var$fn,
        setInt8: $6985a7a28bf44856$var$fn,
        setInt16: $6985a7a28bf44856$var$fn,
        setInt32: $6985a7a28bf44856$var$fn,
        setUint8: $6985a7a28bf44856$var$fn,
        setUint16: $6985a7a28bf44856$var$fn,
        setUint32: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    // Atomics
    Atomics: false,
    JSON: {
        parse: $6985a7a28bf44856$var$fn,
        stringify: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string',
        // https://github.com/tc39/proposal-json-parse-with-source/
        rawJSON: $6985a7a28bf44856$var$fn,
        isRawJSON: $6985a7a28bf44856$var$fn
    },
    // *** Control Abstraction Objects
    // https://github.com/tc39/proposal-iterator-helpers
    Iterator: {
        // Properties of the Iterator Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%IteratorPrototype%',
        from: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-joint-iteration
        zip: $6985a7a28bf44856$var$fn,
        zipKeyed: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-iterator-sequencing
        concat: $6985a7a28bf44856$var$fn
    },
    '%IteratorPrototype%': {
        // The %IteratorPrototype% Object
        '@@iterator': $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-iterator-helpers
        constructor: 'Iterator',
        map: $6985a7a28bf44856$var$fn,
        filter: $6985a7a28bf44856$var$fn,
        take: $6985a7a28bf44856$var$fn,
        drop: $6985a7a28bf44856$var$fn,
        flatMap: $6985a7a28bf44856$var$fn,
        reduce: $6985a7a28bf44856$var$fn,
        toArray: $6985a7a28bf44856$var$fn,
        forEach: $6985a7a28bf44856$var$fn,
        some: $6985a7a28bf44856$var$fn,
        every: $6985a7a28bf44856$var$fn,
        find: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string',
        // https://github.com/tc39/proposal-async-iterator-helpers
        toAsync: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-explicit-resource-management
        // See https://github.com/Moddable-OpenSource/moddable/issues/523#issuecomment-1942904505
        '@@dispose': false
    },
    // https://github.com/tc39/proposal-iterator-helpers
    '%WrapForValidIteratorPrototype%': {
        '[[Proto]]': '%IteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        return: $6985a7a28bf44856$var$fn
    },
    // https://github.com/tc39/proposal-iterator-helpers
    '%IteratorHelperPrototype%': {
        '[[Proto]]': '%IteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        return: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    // https://github.com/tc39/proposal-async-iterator-helpers
    AsyncIterator: {
        // Properties of the Iterator Constructor
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%AsyncIteratorPrototype%',
        from: $6985a7a28bf44856$var$fn
    },
    '%AsyncIteratorPrototype%': {
        // The %AsyncIteratorPrototype% Object
        '@@asyncIterator': $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-async-iterator-helpers
        constructor: 'AsyncIterator',
        map: $6985a7a28bf44856$var$fn,
        filter: $6985a7a28bf44856$var$fn,
        take: $6985a7a28bf44856$var$fn,
        drop: $6985a7a28bf44856$var$fn,
        flatMap: $6985a7a28bf44856$var$fn,
        reduce: $6985a7a28bf44856$var$fn,
        toArray: $6985a7a28bf44856$var$fn,
        forEach: $6985a7a28bf44856$var$fn,
        some: $6985a7a28bf44856$var$fn,
        every: $6985a7a28bf44856$var$fn,
        find: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string',
        // https://github.com/tc39/proposal-explicit-resource-management
        // See https://github.com/Moddable-OpenSource/moddable/issues/523#issuecomment-1942904505
        '@@asyncDispose': false
    },
    // https://github.com/tc39/proposal-async-iterator-helpers
    '%WrapForValidAsyncIteratorPrototype%': {
        '[[Proto]]': '%AsyncIteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        return: $6985a7a28bf44856$var$fn
    },
    // https://github.com/tc39/proposal-async-iterator-helpers
    '%AsyncIteratorHelperPrototype%': {
        '[[Proto]]': '%AsyncIteratorPrototype%',
        next: $6985a7a28bf44856$var$fn,
        return: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    '%InertGeneratorFunction%': {
        // Properties of the GeneratorFunction Constructor
        '[[Proto]]': '%InertFunction%',
        prototype: '%Generator%'
    },
    '%Generator%': {
        // Properties of the GeneratorFunction Prototype Object
        '[[Proto]]': '%FunctionPrototype%',
        constructor: '%InertGeneratorFunction%',
        prototype: '%GeneratorPrototype%',
        '@@toStringTag': 'string'
    },
    '%InertAsyncGeneratorFunction%': {
        // Properties of the AsyncGeneratorFunction Constructor
        '[[Proto]]': '%InertFunction%',
        prototype: '%AsyncGenerator%'
    },
    '%AsyncGenerator%': {
        // Properties of the AsyncGeneratorFunction Prototype Object
        '[[Proto]]': '%FunctionPrototype%',
        constructor: '%InertAsyncGeneratorFunction%',
        prototype: '%AsyncGeneratorPrototype%',
        // length prop added here for React Native jsc-android
        // https://github.com/endojs/endo/issues/660
        // https://github.com/react-native-community/jsc-android-buildscripts/issues/181
        length: 'number',
        '@@toStringTag': 'string'
    },
    '%GeneratorPrototype%': {
        // Properties of the Generator Prototype Object
        '[[Proto]]': '%IteratorPrototype%',
        constructor: '%Generator%',
        next: $6985a7a28bf44856$var$fn,
        return: $6985a7a28bf44856$var$fn,
        throw: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    '%AsyncGeneratorPrototype%': {
        // Properties of the AsyncGenerator Prototype Object
        '[[Proto]]': '%AsyncIteratorPrototype%',
        constructor: '%AsyncGenerator%',
        next: $6985a7a28bf44856$var$fn,
        return: $6985a7a28bf44856$var$fn,
        throw: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    // TODO: To be replaced with Promise.delegate
    //
    // The HandledPromise global variable shimmed by `@agoric/eventual-send/shim`
    // implements an initial version of the eventual send specification at:
    // https://github.com/tc39/proposal-eventual-send
    //
    // We will likely change this to add a property to Promise called
    // Promise.delegate and put static methods on it, which will necessitate
    // another permits change to update to the current proposed standard.
    HandledPromise: {
        '[[Proto]]': 'Promise',
        applyFunction: $6985a7a28bf44856$var$fn,
        applyFunctionSendOnly: $6985a7a28bf44856$var$fn,
        applyMethod: $6985a7a28bf44856$var$fn,
        applyMethodSendOnly: $6985a7a28bf44856$var$fn,
        get: $6985a7a28bf44856$var$fn,
        getSendOnly: $6985a7a28bf44856$var$fn,
        prototype: '%PromisePrototype%',
        resolve: $6985a7a28bf44856$var$fn
    },
    // https://github.com/tc39/proposal-source-phase-imports?tab=readme-ov-file#js-module-source
    ModuleSource: {
        '[[Proto]]': '%AbstractModuleSource%',
        prototype: '%ModuleSourcePrototype%'
    },
    '%ModuleSourcePrototype%': {
        '[[Proto]]': '%AbstractModuleSourcePrototype%',
        constructor: 'ModuleSource',
        '@@toStringTag': 'string',
        // https://github.com/tc39/proposal-compartments
        bindings: $6985a7a28bf44856$var$getter,
        needsImport: $6985a7a28bf44856$var$getter,
        needsImportMeta: $6985a7a28bf44856$var$getter,
        // @endo/module-source provides a legacy interface
        imports: $6985a7a28bf44856$var$getter,
        exports: $6985a7a28bf44856$var$getter,
        reexports: $6985a7a28bf44856$var$getter
    },
    '%AbstractModuleSource%': {
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%AbstractModuleSourcePrototype%'
    },
    '%AbstractModuleSourcePrototype%': {
        constructor: '%AbstractModuleSource%'
    },
    Promise: {
        // Properties of the Promise Constructor
        '[[Proto]]': '%FunctionPrototype%',
        all: $6985a7a28bf44856$var$fn,
        allSettled: $6985a7a28bf44856$var$fn,
        // https://github.com/Agoric/SES-shim/issues/550
        any: $6985a7a28bf44856$var$fn,
        prototype: '%PromisePrototype%',
        race: $6985a7a28bf44856$var$fn,
        reject: $6985a7a28bf44856$var$fn,
        resolve: $6985a7a28bf44856$var$fn,
        // https://github.com/tc39/proposal-promise-with-resolvers
        withResolvers: $6985a7a28bf44856$var$fn,
        '@@species': $6985a7a28bf44856$var$getter,
        // https://github.com/tc39/proposal-promise-try
        try: $6985a7a28bf44856$var$fn
    },
    '%PromisePrototype%': {
        // Properties of the Promise Prototype Object
        catch: $6985a7a28bf44856$var$fn,
        constructor: 'Promise',
        finally: $6985a7a28bf44856$var$fn,
        then: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string',
        // Non-standard, used in node to prevent async_hooks from breaking
        'UniqueSymbol(async_id_symbol)': $6985a7a28bf44856$var$accessor,
        'UniqueSymbol(trigger_async_id_symbol)': $6985a7a28bf44856$var$accessor,
        'UniqueSymbol(destroyed)': $6985a7a28bf44856$var$accessor
    },
    '%InertAsyncFunction%': {
        // Properties of the AsyncFunction Constructor
        '[[Proto]]': '%InertFunction%',
        prototype: '%AsyncFunctionPrototype%'
    },
    '%AsyncFunctionPrototype%': {
        // Properties of the AsyncFunction Prototype Object
        '[[Proto]]': '%FunctionPrototype%',
        constructor: '%InertAsyncFunction%',
        // length prop added here for React Native jsc-android
        // https://github.com/endojs/endo/issues/660
        // https://github.com/react-native-community/jsc-android-buildscripts/issues/181
        length: 'number',
        '@@toStringTag': 'string'
    },
    // Reflection
    Reflect: {
        // The Reflect Object
        // Not a function object.
        apply: $6985a7a28bf44856$var$fn,
        construct: $6985a7a28bf44856$var$fn,
        defineProperty: $6985a7a28bf44856$var$fn,
        deleteProperty: $6985a7a28bf44856$var$fn,
        get: $6985a7a28bf44856$var$fn,
        getOwnPropertyDescriptor: $6985a7a28bf44856$var$fn,
        getPrototypeOf: $6985a7a28bf44856$var$fn,
        has: $6985a7a28bf44856$var$fn,
        isExtensible: $6985a7a28bf44856$var$fn,
        ownKeys: $6985a7a28bf44856$var$fn,
        preventExtensions: $6985a7a28bf44856$var$fn,
        set: $6985a7a28bf44856$var$fn,
        setPrototypeOf: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    Proxy: {
        // Properties of the Proxy Constructor
        '[[Proto]]': '%FunctionPrototype%',
        revocable: $6985a7a28bf44856$var$fn
    },
    // Appendix B
    // Annex B: Additional Properties of the Global Object
    escape: $6985a7a28bf44856$var$fn,
    unescape: $6985a7a28bf44856$var$fn,
    // Proposed
    '%UniqueCompartment%': {
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%CompartmentPrototype%',
        toString: $6985a7a28bf44856$var$fn
    },
    '%InertCompartment%': {
        '[[Proto]]': '%FunctionPrototype%',
        prototype: '%CompartmentPrototype%',
        toString: $6985a7a28bf44856$var$fn
    },
    '%CompartmentPrototype%': {
        constructor: '%InertCompartment%',
        evaluate: $6985a7a28bf44856$var$fn,
        globalThis: $6985a7a28bf44856$var$getter,
        name: $6985a7a28bf44856$var$getter,
        import: $6985a7a28bf44856$var$asyncFn,
        load: $6985a7a28bf44856$var$asyncFn,
        importNow: $6985a7a28bf44856$var$fn,
        module: $6985a7a28bf44856$var$fn,
        '@@toStringTag': 'string'
    },
    lockdown: $6985a7a28bf44856$var$fn,
    harden: {
        ...$6985a7a28bf44856$var$fn,
        isFake: 'boolean'
    },
    '%InitialGetStackString%': $6985a7a28bf44856$var$fn
};


/**
 * @import {Reporter} from './reporting-types.js'
 */ const $8d182ee54ee0d35f$var$isFunction = (obj)=>typeof obj === 'function';
// Like defineProperty, but throws if it would modify an existing property.
// We use this to ensure that two conflicting attempts to define the same
// property throws, causing SES initialization to fail. Otherwise, a
// conflict between, for example, two of SES's internal permits might
// get masked as one overwrites the other. Accordingly, the thrown error
// complains of a "Conflicting definition".
function $8d182ee54ee0d35f$var$initProperty(obj, name, desc) {
    if ((0, $a9aca437113c766f$export$b5a638e9b3fff9f3)(obj, name)) {
        const preDesc = (0, $a9aca437113c766f$export$b6b8a7926c5f8342)(obj, name);
        if (!preDesc || !(0, $a9aca437113c766f$export$226b3eccf92c9ed9)(preDesc.value, desc.value) || preDesc.get !== desc.get || preDesc.set !== desc.set || preDesc.writable !== desc.writable || preDesc.enumerable !== desc.enumerable || preDesc.configurable !== desc.configurable) throw (0, $a9aca437113c766f$export$f1c4b559ff572cce)(`Conflicting definitions of ${name}`);
    }
    (0, $a9aca437113c766f$export$fdab3c20aae16ddf)(obj, name, desc);
}
// Like defineProperties, but throws if it would modify an existing property.
// This ensures that the intrinsics added to the intrinsics collector object
// graph do not overlap.
function $8d182ee54ee0d35f$var$initProperties(obj, descs) {
    for (const [name, desc] of (0, $a9aca437113c766f$export$3e9f948b41964866)(descs))$8d182ee54ee0d35f$var$initProperty(obj, name, desc);
}
// sampleGlobals creates an intrinsics object, suitable for
// interinsicsCollector.addIntrinsics, from the named properties of a global
// object.
function $8d182ee54ee0d35f$var$sampleGlobals(globalObject, newPropertyNames) {
    const newIntrinsics = {
        __proto__: null
    };
    for (const [globalName, intrinsicName] of (0, $a9aca437113c766f$export$3e9f948b41964866)(newPropertyNames))if ((0, $a9aca437113c766f$export$b5a638e9b3fff9f3)(globalObject, globalName)) newIntrinsics[intrinsicName] = globalObject[globalName];
    return newIntrinsics;
}
const $8d182ee54ee0d35f$export$5756352dc4d5967a = (reporter)=>{
    /** @type {Record<any, any>} */ const intrinsics = (0, $a9aca437113c766f$export$185802fd694ee1f5)(null);
    let pseudoNatives;
    const addIntrinsics = (newIntrinsics)=>{
        $8d182ee54ee0d35f$var$initProperties(intrinsics, (0, $a9aca437113c766f$export$cea84f72459ece05)(newIntrinsics));
    };
    (0, $a9aca437113c766f$export$792f3d81ea979f55)(addIntrinsics);
    // For each intrinsic, if it has a `.prototype` property, use the
    // permits to find out the intrinsic name for that prototype and add it
    // to the intrinsics.
    const completePrototypes = ()=>{
        for (const [name, intrinsic] of (0, $a9aca437113c766f$export$3e9f948b41964866)(intrinsics)){
            if ((0, $a9aca437113c766f$export$c3825b437cbdea5c)(intrinsic)) continue;
            if (!(0, $a9aca437113c766f$export$b5a638e9b3fff9f3)(intrinsic, 'prototype')) continue;
            const permit = (0, $6985a7a28bf44856$export$f76933227aa3e1b5)[name];
            if (typeof permit !== 'object') throw (0, $a9aca437113c766f$export$f1c4b559ff572cce)(`Expected permit object at permits.${name}`);
            const namePrototype = permit.prototype;
            if (!namePrototype) {
                (0, $46b0c518f9f8d37e$export$d6a4d510e7af821)(intrinsic, 'prototype', false, `${name}.prototype`, reporter);
                continue;
            }
            if (typeof namePrototype !== 'string' || !(0, $a9aca437113c766f$export$b5a638e9b3fff9f3)((0, $6985a7a28bf44856$export$f76933227aa3e1b5), namePrototype)) throw (0, $a9aca437113c766f$export$f1c4b559ff572cce)(`Unrecognized ${name}.prototype permits entry`);
            const intrinsicPrototype = intrinsic.prototype;
            if ((0, $a9aca437113c766f$export$b5a638e9b3fff9f3)(intrinsics, namePrototype)) {
                if (intrinsics[namePrototype] !== intrinsicPrototype) throw (0, $a9aca437113c766f$export$f1c4b559ff572cce)(`Conflicting bindings of ${namePrototype}`);
                continue;
            }
            intrinsics[namePrototype] = intrinsicPrototype;
        }
    };
    (0, $a9aca437113c766f$export$792f3d81ea979f55)(completePrototypes);
    const finalIntrinsics = ()=>{
        (0, $a9aca437113c766f$export$792f3d81ea979f55)(intrinsics);
        pseudoNatives = new (0, $a9aca437113c766f$export$c0627e557a270ad)((0, $a9aca437113c766f$export$84effe734e770183)((0, $a9aca437113c766f$export$68c286be0e7e55b7)(intrinsics), $8d182ee54ee0d35f$var$isFunction));
        return intrinsics;
    };
    (0, $a9aca437113c766f$export$792f3d81ea979f55)(finalIntrinsics);
    const isPseudoNative = (obj)=>{
        if (!pseudoNatives) throw (0, $a9aca437113c766f$export$f1c4b559ff572cce)('isPseudoNative can only be called after finalIntrinsics');
        return (0, $a9aca437113c766f$export$902ce0282af3d7e)(pseudoNatives, obj);
    };
    (0, $a9aca437113c766f$export$792f3d81ea979f55)(isPseudoNative);
    const intrinsicsCollector = {
        addIntrinsics: addIntrinsics,
        completePrototypes: completePrototypes,
        finalIntrinsics: finalIntrinsics,
        isPseudoNative: isPseudoNative
    };
    (0, $a9aca437113c766f$export$792f3d81ea979f55)(intrinsicsCollector);
    addIntrinsics((0, $6985a7a28bf44856$export$487b638984a51a3));
    addIntrinsics($8d182ee54ee0d35f$var$sampleGlobals((0, $a9aca437113c766f$export$18d76ae2c6f15b8), (0, $6985a7a28bf44856$export$ec32825d1ea42fb4)));
    return intrinsicsCollector;
};
const $8d182ee54ee0d35f$export$2d49614a44efa301 = (globalObject, reporter)=>{
    // TODO pass a proper reporter to `makeIntrinsicsCollector`
    const { addIntrinsics: addIntrinsics, finalIntrinsics: finalIntrinsics } = $8d182ee54ee0d35f$export$5756352dc4d5967a(reporter);
    addIntrinsics($8d182ee54ee0d35f$var$sampleGlobals(globalObject, (0, $6985a7a28bf44856$export$1e036615d36254ea)));
    return finalIntrinsics();
};


const $c3f6c693698dc7cd$var$key = 'Compartment';
const $c3f6c693698dc7cd$export$6261f3fc031436ca = $c3f6c693698dc7cd$var$key in globalThis ? globalThis[$c3f6c693698dc7cd$var$key] : class _UniCompartment {
    static #evaluatorFactory = 'eval' in globalThis ? new Function('$', `with($){return a=>eval(a);}`) : '~CodeFactory' in globalThis ? ($)=>globalThis['~CodeFactory'].compartment($) : ($)=>{
        throw ``;
    };
    #opts;
    constructor(opts){
        this.#opts = opts;
        const val = {
            ...(()=>{
                if ('Object' in globalThis && 'freeze' in globalThis['Object']) return (0, $8d182ee54ee0d35f$export$2d49614a44efa301)(globalThis, {
                    ...console
                });
                else if ('~GetClean' in globalThis) return globalThis['~GetClean']();
                else return {};
            })(),
            ...opts.globals ?? {}
        };
        if ('Object' in globalThis && 'freeze' in globalThis['Object']) globalThis['Object']['freeze'](val);
        this.#scope = 'Proxy' in globalThis ? new globalThis["Proxy"](val, {
            has (target, p) {
                return true;
            }
        }) : '~MakeCage' in globalThis ? globalThis['~MakeCage'](val) : val;
    }
    #scope;
    get globalThis() {
        return this.#scope;
    }
    get name() {
        return this.#opts.name ??= 'crypto' in globalThis ? globalThis.crypto.randomUUID() : 'Math' in globalThis ? `${Math.random()}` : "unnamed";
    }
    #_evaluator;
    get #evaluator() {
        return this.#_evaluator ??= _UniCompartment.#evaluatorFactory.call(this.#scope, this.#scope);
    }
    evaluate(a, opts) {
        a = this.#opts.transforms?.reduce?.((i, f)=>f(i), a) ?? a;
        return this.#evaluator(a);
    }
};


export {$c3f6c693698dc7cd$export$6261f3fc031436ca as UniCompartment};
//# sourceMappingURL=index.js.map
