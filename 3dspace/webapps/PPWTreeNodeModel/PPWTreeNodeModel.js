define("DS/PPWTreeNodeModel/PPWTreeNodeModel",["UWA/Core","DS/TreeModel/TreeNodeModel","i18n!DS/PPWTreeNodeModel/assets/nls/TreeNodeModel.json"],function(e,t,r){"use strict";var o,i,n,l;return i=function e(r){var o;this.getNodeSource()===t.NODE_SOURCE.GROUPING&&(o=this.getChildren())&&o.length>0&&o.forEach(function(t){e.call(t,r)}),this.groupChildren(r)},n=function e(r){var o=this.getChildren();o&&o.length>0&&o.forEach(function(o){o.getNodeSource()===t.NODE_SOURCE.GROUPING&&e.call(o,r),o.collapse()})},l=function(t){var o,i,n,l;return o=this.getAttributeValue(t),n=(i=this.getTreeDocument())?i.getFilterManager().getFilters():{},e.is(n[t])&&e.is(n[t].filterOptions)&&(l=n[t].filterOptions,e.is(l)&&(e.is(l.getCellValueForFilter)&&(o=l.getCellValueForFilter(t,this)),e.is(l._isBoolean)&&l._isBoolean&&(o=e.is(o,"string")?"true"===o.toLowerCase()?r.get("Filter.Boolean.TRUE"):r.get("Filter.Boolean.FALSE"):void 0))),o},((o=function(r){var o={getAttributeValueForFiltering:l.bind(this)};r=r||{},r=e.extend(o,r),t.call(this,r),this._propertiesToGroup=[],this._appliedGroupingProps=[],this._isGroupingInProgress=!1}).prototype=Object.create(t.prototype)).constructor=t,o.NODE_SOURCE=t.NODE_SOURCE,o.prototype.groupChildren=function(r){var o,l;(o=e.clone(r)).propertiesToGroup=this._propertiesToGroup,this._isGroupingInProgress=!0,t.prototype.groupChildren.call(this,o),function e(t){var r,o;(r=t._getFakeNodesTable())&&(o=Object.values(r),o=Array.isArray(o)?o:[],Object.values(o).forEach(function(r){e(r),r.isHidden()||r.getParent()===t||t.addChild(r)}))}(this),0===o.propertiesToGroup.length?(l=this.getChildren(),Array.isArray(l)&&this.getChildren().forEach(function(e){i.call(e,o)})):n.call(this,o),this._appliedGroupingProps=Array.from(this._propertiesToGroup),this._isGroupingInProgress=!1},o.prototype.ungroupChildren=function(e){var r,o,i;if(i=function e(r){var o,i,n,l=r.getChildren();if(l)for(o=l.length-1;o>=0;o--)l[o].getNodeSource()===t.NODE_SOURCE.GROUPING&&e(l[o]);(!(l=r.getChildren())||l&&0===l.length)&&((i=r.getParent()).removeChild(r),(n=i._getFakeNodesTable())&&delete n[r.getIdentifier()])},r=this.getChildren())for(o=r.length-1;o>=0;o--)r[o].getNodeSource()===t.NODE_SOURCE.GROUPING&&i(r[o]);t.prototype.ungroupChildren.call(this,e)},o});