define("DS/UnifiedExportCommand/UnifiedExportCommand_ko",{});define("DS/UnifiedExportCommand/assets/nls/IPTransferNLS",{"iptransfer.dialog.title":"전송","iptransfer.dialog.tbar.find":"찾기..","iptransfer.dialog.tbar.layout.tiles":"타일 보기","iptransfer.dialog.tbar.layout.grid":"그리드 보기","iptransfer.dialog.footer.transfer":"전송","iptransfer.dialog.footer.transferring":"전송 중...","iptransfer.dialog.footer.cancel":"취소","iptransfer.dialog.footer.processing":"데이터 확장 중...","iptransfer.dialog.field.errortext":"선택한 협업이 여러 조직과 연결되어 있으므로 전송이 허용되지 않습니다.","iptransfer.dialog.field.placeholder.choosetenant":"플랫폼 선택","iptransfer.dialog.field.placeholder.choosedestination":"협업 공간 또는 확장 협업 선택","iptransfer.dialog.field.placeholder.chooseorganization":"조직 선택","iptransfer.dialog.field.tenants.label":"플랫폼","iptransfer.dialog.field.tenants.tooltip":"플랫폼 도움말","iptransfer.dialog.field.destinations.label":"협업 공간 또는 확장 협업","iptransfer.dialog.field.destinations.tooltip":"협업 도움말","iptransfer.dialog.field.organizations.label":"조직","iptransfer.dialog.field.organizations.help":"조직 도움말","iptransfer.loader.tenants":"플랫폼 로드 중...","iptransfer.loader.destinations":"협업 공간 로드 중..","iptransfer.loader.organizations":"조직 로드 중...","iptransfer.destination.type.collaboration":"확장 협업","iptransfer.destination.type.space":"협업 공간","iptransfer.destination.view.grid.column.title":"제목","iptransfer.destination.view.grid.column.company":"회사","iptransfer.destination.view.grid.column.type":"유형","iptransfer.alert.authorize-failure":"전송을 수행할 Engineering Data Exchange Manager(EXH) Role이 없습니다.","iptransfer.alert.transfer-success":"전송이 시작되었습니다. 곧 완료 알림을 받게 됩니다.","iptransfer.alert.transfer-failure":"전송에 실패했습니다.","iptransfer.alert.actions.login":"Login","iptransfer.alert.destination.not.reachable":"The selected platform <b>{0}</b> requires login to export your data.","iptransfer.alert.destination.not.reachable2":"Failed to load collaborative spaces from selected platform."});define("DS/UnifiedExportCommand/assets/nls/UnifiedExportCommandNLS",{"exchangecommand.methods.label.step":"STEP AP242","exchangecommand.methods.label.xcad":"CAD 파일","exchangecommand.dialog.header":"다른 이름으로 내보내기","exchangecommand.dialog.progressMessage.validated":"콘텐츠를 검증하는 중입니다..","exchangecommand.dialog.progressMessage.packaged":"콘텐츠를 패키징하는 중입니다..","exchangecommand.dialog.progressMessage.progress":"요청이 진행 중입니다..","exchangecommand.dialog.footer.button.ok":"데이터 처리 중","exchangecommand.dialog.footer.button.save":"내보내기","exchangecommand.dialog.footer.button.saving":"내보내는 중...","exchangecommand.dialog.footer.button.cancel":"취소","exchangecommand.options.field.exportOutput":"다음으로 내보내기","exchangecommand.options.field.exportOutput.help":"내보내기를 수행할 방법을 선택합니다. 3DEXPERIENCE Platform은 사용자가 맡은 Role에 따라 데이터를 내보낼 수 있는 여러 가지 방법을 제공합니다. ","exchangecommand.options.field.title":"제목","exchangecommand.options.field.title.placeholder":"제목은 비워 둘 수 없습니다.","exchangecommand.options.field.title.error":"제목에 \\#@%*,;?<>[]|:./() 문자를 포함할 수 없음","exchangecommand.options.field.version":"버전","exchangecommand.options.field.format":"포맷","exchangecommand.options.field.expandDepth":"확장 깊이","exchangecommand.options.field.expandLevel":"레벨 확장","exchangecommand.options.field.expandLevel.expandAll":"모두 확장","exchangecommand.options.field.expandLevel.expandNone":"확장 없음","exchangecommand.options.field.expandLevel.help":"확장 수준을 선택하거나 5보다 큰 10진수가 아닌 사용자 정의 수준을 입력합니다.","exchangecommand.options.field.expandLevel.customLevel":"사용자 정의 수준:","exchangecommand.options.placeholder.choosederived":"파생 포맷 선택","exchangecommand.options.placeholder.choosenative":"기본 포맷 선택","exchangecommand.options.placeholder.chooseall":"기본 & 파생 포맷 선택","exchangecommand.options.field.engineeringformat.includeallnative":"모든 기본 포맷 포함","exchangecommand.options.field.engineeringformat.includeallderived":"모든 파생 포맷 포함","exchangecommand.options.field.engineeringformat.includespecific":"특정 포맷 포함","exchangecommand.options.field.engineeringformat.includelatestformats":"최신 파생 포맷만 포함","exchangecommand.options.field.engineeringformat.includeallnative.help":"모든 기본 CAD 포맷을 검색하려면 이 설정을 활성화하고, 완전히 제외하려면 비활성화합니다. 비활성화 후에도 '특정 포맷 포함' 섹션에서 원하는 CAD 포맷을 지정할 수 있습니다.","exchangecommand.options.field.engineeringformat.includeallderived.help":"모든 파생 포맷을 검색하려면 이 설정을 활성화하고, 완전히 제외하려면 이 설정을 비활성화합니다. 비활성화 후에도 '특정 포맷 포함' 섹션에서 원하는 파생 포맷을 지정할 수 있습니다.","exchangecommand.options.field.engineeringformat.includespecific.help":"목록에서 원하는 기본 CAD와 파생 포맷을 선택하여 검색합니다.","exchangecommand.options.field.engineeringformat.includelatestformats.help":"최신 파생 포맷만 검색하려면 이 설정을 활성화합니다.","exchangecommand.options.field.includeformatoptions":"{0} 옵션 포함","exchangecommand.options.placeholder.chooseoptions":"옵션 선택","exchangecommand.options.field.chooseoptions.customFilterMessage":"포맷이 없음","exchangecommand.options.field.expandLevel.error":"결과 없음","exchangecommand.cvfetch.failure.emptypayload":"유효한 선택이 부족하여 등록된 내보내기 방법을 사용할 수 없습니다.","exchangecommand.options.field.cvexpand.error":"선택한 노드가 내보내기 방법에서 지원되지 않으므로 내보내기를 시작할 수 없습니다.","exchangecommand.options.field.cvfetch.noresult":"선택한 콘텐츠는 아직 제대로 인덱싱되지 않았거나 사용 가능한 내보내기 방법에 대해 유효하지 않을 수 있으므로, 내보낼 수 없습니다.","exchangecommand.options.field.cvfetch.failure":"선택한 콘텐츠는 아직 제대로 인덱싱되지 않아서 내보낼 수 없습니다.","exchangecommand.options.field.moreoptions":"다른 옵션","exchangecommand.notification.expansionfailed":"개체를 확장할 수 없습니다.","exchangecommand.notification.expansionfailed.groupnotexpanded":"축소되거나 부분적으로 로드된 그룹은 불완전한 결과를 제공할 수 있습니다. 더 나은 내보내기를 수행하려면 그룹을 완전히 확장하십시오.","exchangecommand.notification.expansionfailed.401":"인증 실패 때문에 개체를 확장할 수 없습니다.","exchangecommand.notification.expansionfailed.400":"잘못된 요청 때문에 개체를 확장할 수 없습니다","exchangecommand.notification.notallowed":"Role 또는 유효한 선택이 부족하여 등록된 내보내기 방법을 사용할 수 없습니다.","exchangecommand.notification.rootlimit":"한 번에 9개 이상의 어셈블리를 내보낼 수 없습니다.","exchangecommand.notification.selectitemstoexport":"내보내기를 시작할 아이템을 선택합니다.","exchangecommand.notification.nostructre":"제품 구조가 없습니다.","exchangecommand.notification.exportstarted.title":"내보내기 시작됨","exchangecommand.notification.exportstarted.message":"내보내기가 시작되었습니다. 곧 완료 알림을 받게 됩니다.","exchangecommand.notification.exportfailed.noresults":"적용된 필터에 대해 일치하는 항목이 없어서, 선택한 콘텐츠를 내보낼 수 없습니다.","exchangecommand.notification.exportfailed.title":"내보내기 실패","exchangecommand.notification.exportfailed.message":"내보내기를 시작할 수 없습니다.","exchangecommand.notification.exportfailed.message2":"일부 데이터가 아직 인덱싱되지 않아서, 내보내기를 시작할 수 없습니다.","exchangecommand.notification.exportfailed.message3":"일부 데이터의 내보내기가 허용되지 않아서, 내보내기를 시작할 수 없습니다.","exchangecommand.notification.exportfailed.noresults2":"선택한 콘텐츠에 관련 데이터가 포함되어 있지 않으므로 내보낼 수 없습니다.","exchangecommand.notification.exportfailed.noresults3":"선택한 콘텐츠가 제대로 인덱싱되지 않았거나 관련 데이터가 없거나 내보내기에 대해 지원되지 않을 수 있으므로 해당 콘텐츠를 내보낼 수 없습니다.","exchangecommand.notification.exportfailed.unsupportedselection":"선택한 콘텐츠 중 일부 또는 전부를 내보낼 수 없습니다.","exchangecommand.notification.exportfailed.unsupportedselection.relationnode":"선택한 구조에 내보내기에 지원되지 않는 관계 노드가 있습니다."});