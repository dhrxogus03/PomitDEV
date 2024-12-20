/**
* @name DS/StudioUIActorModelWeb/CXPUIRepFactory
* @constructor
*
* @description
* Create UIActors rep depending on configuration name
* Map rep with model
*/
define('DS/StudioUIActorModelWeb/CXPUIRepFactory',
[
    'UWA/Core',
	'DS/StudioUIActorModelWeb/CXPUIMapper',
	'DS/StudioUIActorModelWeb/CXPUIActor',
	'DS/StudioUIActorModelWeb/CXPButton',
	'DS/StudioUIActorModelWeb/CXPText',
	'DS/StudioUIActorModelWeb/CXPImage',
	'DS/StudioUIActorModelWeb/CXPSlider',
	'DS/StudioUIActorModelWeb/CXPTextField',
	'DS/StudioUIActorModelWeb/CXPColorPicker',
	'DS/StudioUIActorModelWeb/CXPCameraViewer',
	'DS/StudioUIActorModelWeb/CXPWebViewer',
	'DS/StudioUIActorModelWeb/CXPGalleryMenu',
	'DS/StudioUIActorModelWeb/CXPGalleryViewpoint',
	'DS/StudioUIActorModelWeb/CXPGalleryImage',
	'DS/StudioUIActorModelWeb/CXPGalleryProduct'
],
function (UWA, UIMapper, CXPUIActor, CXPButton, CXPText, CXPImage, CXPSlider, CXPTextField, CXPColorPicker,
    CXPCameraViewer, CXPWebViewer, CXPGalleryMenu, CXPGalleryViewpoint, CXPGalleryImage, CXPGalleryProduct) {
	'use strict';

	var CXPUIRepFactory = UWA.Class.extend(
		/** @lends DS/StudioUIActorModelWeb/CXPUIRepFactory.prototype **/
		{
		init: function () {
		},

		typeMap: {
			undefined: {
				rep: function (iUIActor) {
					return new CXPUIActor(iUIActor);
				},
				binding: []
			},
			CXPButton: {
				rep: function (iUIActor) {
					return new CXPButton(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
					{
						model: 'minimumDimension',
                        ui: 'minimumDimension'
					},
					{
						model: 'data.fontHeight', //YNE2 font bigger in web
						ui: 'fontHeight'
					},
					{ //can't display base64img
						model: 'data.icon',
						ui: 'icon'
					},
					//{ //WUX refresh icon size.
                    {
						model: 'data.iconDimension.x',
						ui: 'iconWidth'
					},
					{
						model: 'data.iconDimension.y',
						ui: 'iconHeight'
					},

					{
						model : 'data.label',
						ui : 'label'
					},
					{
						model: 'data.pushable',
						ui: 'pushable'
					},
					{
						model: 'data.pushed',
						ui: 'pushed'
					}
				]
			},


			CXPText: {
				rep: function (iUIActor) {
					return new CXPText(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.alignment',
						ui: 'alignment'
					},
					{
						model: 'data.color',
						ui: 'color'
					},
					{
						model: 'data.text',
						ui: 'text'
					},
					{
						model: 'data.bold',
						ui: 'bold'
					},
					{ //3DS font don't exist in web
						model: 'data.font',
						ui: 'fontFamily'
					},
					{
						model: 'data.height', //YNE2 font bigger in web
						ui: 'fontHeight'
					},
					{
						model: 'data.italic',
						ui: 'italic'
					},
					{
						model: 'data.backgroundColor',
						ui: 'backgroundColor'
					},
					{
						model: 'data.borderColor',
						ui: 'borderColor'
					},
					{
						model: 'data.showBackground',
						ui: 'showBackground'
					},
					{
						model: 'data.showBorder',
						ui: 'showBorder'
					}
				]
			},


			CXPImage: {
				rep: function (iUIActor) {
					return new CXPImage(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.image',
						ui: 'image'
					}
				]
			},


			CXPSlider: {
				rep: function (iUIActor) {
					return new CXPSlider(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					//{
					//	model: 'data.labelPosition',
					//	ui: 'labelPosition',
					//},
					//{
					//	model: 'data.showValueLabel',
					//	ui: 'showValueLabel',
					//},
					//{
					//	model: 'data.valueUnit',
					//	ui: 'valueUnit',
					//},
					{
						model: 'data.orientation',
						ui: 'orientation'
					},
					{
						model: 'data.maximumValue',
						ui: 'maximumValue'
					},
					{
						model: 'data.minimumValue',
						ui: 'minimumValue'
					},
					{
						model: 'data.stepValue',
						ui: 'stepValue'
					},
					{
						model: 'data.value',
						ui: 'value'
					}

				]
			},



			CXPTextField: {
				rep: function (iUIActor) {
					return new CXPTextField(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.text',
						ui: 'text'
					}
				]
			},




			CXPColorPicker: {
				rep: function (iUIActor) {
					return new CXPColorPicker(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.color',
						ui: 'color'
					}
				]
			},




			CXPCameraViewer: {
				rep: function (iUIActor) {
					return new CXPCameraViewer(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.liveUpdate',
						ui: 'liveUpdate'
					},
					{
						model: 'data.camera',
						ui: 'camera'
					}
				]
			},




			CXPWebViewer: {
				rep: function (iUIActor) {
					return new CXPWebViewer(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'enable',
						ui: 'enable'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.url',
						ui: 'url'
					}
					//{
					//	model: 'data.message',
					//	ui: 'message',
					//},
					//{
					//	model: 'data.script',
					//	ui: 'script',
					//}
				]
			},

			CXPGalleryMenu: {
				rep: function (iUIActor) {
					return new CXPGalleryMenu(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.items',
						ui: 'items'
					},
					{
						model: 'data.orientation',
						ui: 'orientation'
					},
					{
						model: 'data.stretchToContent',
						ui: 'stretchToContent'
					}
				]
			},

			CXPGalleryViewpoint: {
				rep: function (iUIActor) {
					return new CXPGalleryViewpoint(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.items',
						ui: 'items'
					},
					{
						model: 'data.orientation',
						ui: 'orientation'
					},
					{
						model: 'data.stretchToContent',
						ui: 'stretchToContent'
					}
				]
			},

			CXPGalleryImage: {
				rep: function (iUIActor) {
					return new CXPGalleryImage(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.items',
						ui: 'items'
					},
					{
						model: 'data.orientation',
						ui: 'orientation'
					},
					{
						model: 'data.stretchToContent',
						ui: 'stretchToContent'
					}
				]
			},

			CXPGalleryProduct: {
				rep: function (iUIActor) {
					return new CXPGalleryProduct(iUIActor);
				},
				binding: [
					{
						model: 'visible',
						ui: 'visible'
					},
					{
						model: 'opacity',
						ui: 'opacity'
					},
                    {
                        model: 'minimumDimension',
                        ui: 'minimumDimension'
                    },
					{
						model: 'data.items',
						ui: 'items'
					},
					{
						model: 'data.orientation',
						ui: 'orientation'
					},
					{
						model: 'data.stretchToContent',
						ui: 'stretchToContent'
					}
				]
			}
		},

		/**
		* Create UIActors rep depending on configuration name
		* Map rep with model
		* @public
		* @param {String} iType type of rep
		* @param {Actor} iUIActor ui actor
		* @return {Rep} ui actor rep
		*/
		createRep: function (iType, iUIActor) {
			var rep = this.typeMap[iType].rep(iUIActor);
			var mapper = new UIMapper(rep, iUIActor, this.typeMap[iType].binding);
			rep.setUIMapper(mapper);
			return rep;
		}
	});

	return CXPUIRepFactory;
});
