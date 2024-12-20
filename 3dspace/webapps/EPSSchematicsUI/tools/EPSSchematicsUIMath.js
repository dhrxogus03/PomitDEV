/// <amd-module name='DS/EPSSchematicsUI/tools/EPSSchematicsUIMath'/>
define("DS/EPSSchematicsUI/tools/EPSSchematicsUIMath", ["require", "exports"], function (require, exports) {
    "use strict";
    class UIMath {
        /**
         * Gets the maximum value by comparing the 2 provided numbers.
         * @private
         * @param {number} a - The first number.
         * @param {number} b - The second number.
         * @returns {number} The greatest number.
         */
        static getMax(a, b) {
            return (!isNaN(a) && !isNaN(b)) ? Math.max(a, b) : (!isNaN(a) ? a : b);
        }
        /**
         * Gets the minimum value by comparing the 2 provided numbers.
         * @private
         * @param {number} a - The first number.
         * @param {number} b - The second number.
         * @returns {number} The smallest number.
         */
        static getMin(a, b) {
            return (!isNaN(a) && !isNaN(b)) ? Math.min(a, b) : (!isNaN(a) ? a : b);
        }
        /**
         * Snaps the specified value with the specified gap factor.
         * @private
         * @param {number} value - The value to be snapped.
         * @param {number} [gap=10] - The gap factor.
         * @returns {number} The snapped value.
         */
        static snapValue(value, gap = 10) {
            const remain = value % gap;
            const dir = value > 0 ? 1 : -1;
            const halfGap = gap / 2;
            const remainAbs = Math.abs(remain);
            return (dir > 0 && remainAbs < halfGap) || (dir < 0 && remainAbs <= halfGap) ? value - remain : value + gap * dir - remain;
        }
        /**
         * Upper snaps the specified value with the specified gap factor.
         * @private
         * @param {number} value - The value to be upper snapped.
         * @param {number} [gap=10] - The gap factor.
         * @returns {number} the upper snapped value.
         */
        static upperSnapValue(value, gap = 10) {
            const remain = value % gap;
            return remain > 0 ? value + gap - remain : value;
        }
    }
    return UIMath;
});
