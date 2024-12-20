/* global describe, it, xit, expect, beforeEach, jasmine, window */

var ifWindowIt = typeof window === 'undefined' ? xit : it;

describe('Object', function () {
    'use strict';

    describe('.keys()', function () {
        var obj = {
            str: 'boz',
            obj: { },
            arr: [],
            bool: true,
            num: 42,
            'null': null,
            undefined: undefined
        };

        var loopedValues = [];
        for (var k in obj) {
            loopedValues.push(k);
        }

        var keys = Object.keys(obj);
        it('should have correct length', function () {
            expect(keys.length).toBe(7);
        });

        describe('arguments objects', function () {
            it('works with an arguments object', function () {
                (function () {
                    expect(arguments.length).toBe(3);
                    expect(Object.keys(arguments)).toEqual(['0', '1', '2']);
                }(1, 2, 3));
            });

            it('works with a legacy arguments object', function () {
                var FakeArguments = function (args) {
                    args.forEach(function (arg, i) {
                        this[i] = arg;
                    }.bind(this));
                };
                FakeArguments.prototype.length = 3;
                FakeArguments.prototype.callee = function () {};

                var fakeOldArguments = new FakeArguments(['a', 'b', 'c']);
                expect(Object.keys(fakeOldArguments)).toEqual(['0', '1', '2']);
            });
        });

        it('should return an Array', function () {
            expect(Array.isArray(keys)).toBe(true);
        });

        it('should return names which are own properties', function () {
            keys.forEach(function (name) {
                expect(obj.hasOwnProperty(name)).toBe(true);
            });
        });

        it('should return names which are enumerable', function () {
            keys.forEach(function (name) {
                expect(loopedValues.indexOf(name)).toNotBe(-1);
            });
        });

        // ES6 Object.keys does not require this throw
        xit('should throw error for non object', function () {
            var e = {};
            expect(function () {
                try {
                    Object.keys(42);
                } catch (err) {
                    throw e;
                }
            }).toThrow(e);
        });

        describe('enumerating over non-enumerable properties', function () {
             it('has no enumerable keys on a Function', function () {
                 var Foo = function () {};
                 expect(Object.keys(Foo.prototype)).toEqual([]);
             });

             it('has no enumerable keys on a boolean', function () {
                 expect(Object.keys(Boolean.prototype)).toEqual([]);
             });

             it('has no enumerable keys on an object', function () {
                 expect(Object.keys(Object.prototype)).toEqual([]);
             });
        });

        it('works with boxed primitives', function () {
            expect(Object.keys(Object('hello'))).toEqual(['0', '1', '2', '3', '4']);
        });

        it('works with boxed primitives with extra properties', function () {
            var x = Object('x');
            x.y = 1;
            var actual = Object.keys(x);
            var expected = ['0', 'y'];
            actual.sort();
            expected.sort();
            expect(actual).toEqual(expected);
        });

        ifWindowIt('can serialize all objects on the `window`', function () {
          var has = Object.prototype.hasOwnProperty;
          var keys, exception;
          var blacklistedKeys = ['window', 'console', 'parent', 'self', 'frames'];
          for (var k in window) {
              keys = exception = void 0;
              if (blacklistedKeys.indexOf(k) === -1 && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                     try {
                         keys = Object.keys(window[k]);
                     } catch (e) {
                         exception = e;
                     }
                     expect(Array.isArray(keys)).toEqual(true);
                     expect(exception).toBeUndefined();
              }
          }
        });
    });

    describe('Object.isExtensible', function () {
        var obj = { };

        it('should return true if object is extensible', function () {
            expect(Object.isExtensible(obj)).toBe(true);
        });

        it('should return false if object is not extensible', function () {
            expect(Object.isExtensible(Object.preventExtensions(obj))).toBe(false);
        });

        it('should return false if object is seal', function () {
            expect(Object.isExtensible(Object.seal(obj))).toBe(false);
        });

        it('should return false if object is freeze', function () {
            expect(Object.isExtensible(Object.freeze(obj))).toBe(false);
        });

        it('should throw error for non object', function () {
            try {
                // note: in ES6, this is expected to return false.
                expect(Object.isExtensible(42)).toBe(false);
            } catch (err) {
                expect(err).toEqual(jasmine.any(TypeError));
            }
        });
    });

    describe('Object.defineProperty', function () {
        var obj;

        beforeEach(function () {
           obj = {};

           Object.defineProperty(obj, 'name', {
               value: 'Testing',
               configurable: true,
               enumerable: true,
               writable: true
           });
        });

        it('should return the initial value', function () {
            expect(obj.hasOwnProperty('name')).toBeTruthy();
            expect(obj.name).toBe('Testing');
        });

        it('should be setable', function () {
            obj.name = 'Other';
            expect(obj.name).toBe('Other');
        });

        it('should return the parent initial value', function () {
            var child = Object.create(obj, {});

            expect(child.name).toBe('Testing');
            expect(child.hasOwnProperty('name')).toBeFalsy();
        });

        it('should not override the parent value', function () {
            var child = Object.create(obj, {});

            Object.defineProperty(child, 'name', {
                value: 'Other'
            });

            expect(obj.name).toBe('Testing');
            expect(child.name).toBe('Other');
        });

        it('should throw error for non object', function () {
            expect(function () {
                Object.defineProperty(42, 'name', {});
            }).toThrow();
        });

        it('should not throw error for empty descriptor', function () {
            expect(function () {
                Object.defineProperty({}, 'name', {});
            }).not.toThrow();
        });
    });

    describe('Object.getOwnPropertyDescriptor', function () {
        it('should return undefined because the object does not own the property', function () {
            var descr = Object.getOwnPropertyDescriptor({}, 'name');

            expect(descr).toBeUndefined();
        });

        it('should return a data descriptor', function () {
            var descr = Object.getOwnPropertyDescriptor({ name: 'Testing' }, 'name');

            expect(descr).not.toBeUndefined();
            expect(descr.value).toBe('Testing');
            expect(descr.writable).toBe(true);
            expect(descr.enumerable).toBe(true);
            expect(descr.configurable).toBe(true);
        });

        it('should return undefined because the object does not own the property', function () {
            var descr = Object.getOwnPropertyDescriptor(Object.create({ name: 'Testing' }, {}), 'name');

            expect(descr).toBeUndefined();
        });

        it('should return a data descriptor', function () {
            var obj = Object.create({}, {
                name: {
                    value: 'Testing',
                    configurable: true,
                    enumerable: true,
                    writable: true
                }
            });

            var descr = Object.getOwnPropertyDescriptor(obj, 'name');

            expect(descr).not.toBeUndefined();
            expect(descr.value).toBe('Testing');
            expect(descr.writable).toBe(true);
            expect(descr.enumerable).toBe(true);
            expect(descr.configurable).toBe(true);
        });

        it('should throw error for non object', function () {
            try {
                // note: in ES6, we expect this to return undefined.
                expect(Object.getOwnPropertyDescriptor(42, 'name')).toBeUndefined();
            } catch (err) {
                expect(err).toEqual(jasmine.any(TypeError));
            }
        });
    });

    describe('Object.defineProperties', function () {
        it('should define the constructor property', function () {
            var target = {};
            var newProperties = {
                constructor: {
                  value: 'new constructor'
                }
            };
            Object.defineProperties(target, newProperties);
            expect(target.constructor).toEqual('new constructor');
        });
    });
});
