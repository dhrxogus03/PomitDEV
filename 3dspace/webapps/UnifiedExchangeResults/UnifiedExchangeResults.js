define("DS/UnifiedExchangeResults/models/DownloadModel",["UWA/Class/Model"],function(e){return e.extend({STATUS:"status",NO_URL:"nourl",NO_JOB:"nojob",START_DOWNLOAD:"startdownload",FAIL_DOWNLOAD:"faildownload",EXIT_DOWNLOAD:"exitdownload",END_DOWNLOAD:"enddownload"},{defaults:{status:void 0,type:void 0},download:function(e,n){var t=this;if(n&&n.status&&t.set(t.STATUS,n.status),e){t.set(t.START_DOWNLOAD,!0),async function(){await window.open(e,"_top"),t.set(t.END_DOWNLOAD,!0)}()}else t.noUrl()},noUrl:function(){this.set(this.NO_URL,!0)},noJob:function(){this.set(this.NO_JOB,!0)},fail:function(){this.set(this.FAIL_DOWNLOAD,!0)}})}),define("DS/UnifiedExchangeResults/views/DownloadView",["UWA/Class/View","DS/Controls/Button","DS/Controls/TooltipModel","DS/UnifiedExchangeResults/models/DownloadModel","i18n!DS/UnifiedExchangeResults/assets/nls/UnifiedExchangeResultsNLS","css!DS/UnifiedExchangeResults/UnifiedExchangeResults"],function(e,n,t,l,o){var i,a,s,d,c;return UWA.i18n(o),e.extend({tagName:"div",className:"exchange-results-view-download",setup:function(e){let n=this;widget.setTitle("Download"),n.supercentered(),n.model=new l,n.listenTo(n.model,"onChange:"+n.model.START_DOWNLOAD,n.onDownloadStart.bind(null,n)),n.listenTo(n.model,"onChange:"+n.model.END_DOWNLOAD,n.onDownloadEnd.bind(null,n)),n.listenTo(n.model,"onChange:"+n.model.FAIL_DOWNLOAD,n.onDownloadFail.bind(null,n)),n.listenTo(n.model,"onChange:"+n.model.NO_URL,n.onEmptyUrl.bind(null,n)),n.listenTo(n.model,"onChange:"+n.model.NO_JOB,n.onJobNotFound.bind(null,n))},supercentered:function(){this.setupBadge(),this.setupText(),this.learnMore()},setupBadge:function(){s=UWA.createElement("div",{class:"exchange-results-view-download-badge"}).inject(this.container),d=UWA.createElement("div",{class:"exchange-results-view-download-badge-border"}).inject(s),UWA.createElement("div",{class:"exchange-results-view-download-badge-icon",html:UWA.createElement("span",{class:"wux-ui-3ds wux-ui-3ds-docs"})}).inject(s)},setupText:function(){(i=UWA.createElement("div",{class:"exchange-results-view-download-text"})).inject(this.container),(a=UWA.createElement("p",{class:"exchange-results-view-download-title",html:UWA.i18n("exchangeresults.heading.label.default")})).inject(i)},learnMore:function(){var e=UWA.createElement("div",{class:"exchange-results-view-download-learnmore"});e.inject(this.container),(c=new n({label:UWA.i18n("exchangeresults.button.label.showjobdetails"),disabled:!0,visibleFlag:!!this.options.learnMoreAction}).inject(e)).addEventListener("click",this.options.learnMoreAction)},onDownloadStart:function(e){var n=e.model.get(e.model.STATUS),t="",l="";"succeeded"==n?(l=UWA.i18n("exchangeresults.heading.label.download.data.start"),t="success"):"failed"==n?(l=UWA.i18n("exchangeresults.heading.label.download.report.start"),t="high-attention"):(l=UWA.i18n("exchangeresults.heading.label.download.content.start"),t="secondary"),d.style.visibility="hidden",c.disabled=!1,c.emphasize=t,a.setHTML(l)},onDownloadEnd:function(e){var n=e.model.get(e.model.STATUS),t="";t="succeeded"==n?UWA.i18n("exchangeresults.heading.label.download.data.end"):"failed"==n?UWA.i18n("exchangeresults.heading.label.download.report.end"):UWA.i18n("exchangeresults.heading.label.download.content.end"),a.setHTML(t)},onEmptyUrl:function(e){var n=e.model.get(e.model.STATUS),t="",l="";"succeeded"==n?(l=UWA.i18n("exchangeresults.heading.label.download.data.nourl"),t="success"):"failed"==n?(l=UWA.i18n("exchangeresults.heading.label.download.report.nourl"),t="high-attention"):(l=UWA.i18n("exchangeresults.heading.label.download.content.nourl"),t="secondary"),d.style.visibility="hidden",c.disabled=!1,c.emphasize=t,a.setHTML(l)},onJobNotFound:function(e){d.style.visibility="hidden",c.visibleFlag=!1,a.setHTML(UWA.i18n("exchangeresults.heading.label.download.nojob"))},onDownloadFail:function(e){var n=e.model.get(e.model.STATUS),t="";"succeeded"==n?t=UWA.i18n("exchangeresults.heading.label.download.data.fail"):"failed"==n?t=UWA.i18n("exchangeresults.heading.label.download.report.fail"):t=UWA.i18n("exchangeresults.heading.label.download.content.fail"),d.style.visibility="hidden",c.visibleFlag=!1,a.setHTML(t)}})}),define("DS/UnifiedExchangeResults/UnifiedExchangeResults",["DS/UnifiedExchangeResults/views/DownloadView","css!DS/UnifiedExchangeResults/UnifiedExchangeResults"],function(e){return{onLoad:function(){widget.body.empty(),(new e).inject(widget.body)}}});