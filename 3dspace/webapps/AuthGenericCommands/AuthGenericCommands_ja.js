define("DS/AuthGenericCommands/AuthGenericCommands_ja",{});define("DS/AuthGenericCommands/assets/nls/AuthDlgReorder",{modalHeader:"ツリーをリオーダ",modalFooterReset:"ツリーの順序をリセット",modalFooterOK:"OK",modalFooterCancel:"キャンセル",upArrow:"選択を上に移動",downArrow:"選択を下に移動",freeArrow:"選択を自由に移動",TreeListViewHeaderName:"タイトル",TreeListViewHeaderResponsible:"責任者",TreeListViewHeaderModifiedDate:"変更日",TreeListViewHeaderCreationDate:"作成日"});define("DS/AuthGenericCommands/assets/nls/AuthDlgRevisionUpdate",{modalFooterOK:"OK",modalFooterCancel:"キャンセル",TreeListViewHeaderName:"タイトル",TreeListViewHeaderRevisionCurrent:"リビジョン",TreeListViewHeaderAction:"アクション",TreeListViewHeaderRevisionPreview:"想定されるリビジョン",TreeListViewHeaderMaturityCurrent:"完成度状態",TreeListViewHeaderMaturityPreview:"想定される完成度",TreeListViewHeaderType:"タイプ",TreeListViewHeaderResponsible:"オーナー",TreeListViewHeaderCandidate:"候補",SelectAllVisible:"表示可能なすべてを選択",SelectChildren:"子を選択",SelectLeaves:"リーフを選択",ExpandAll:"すべてを展開",ExpandNLevel:"n レベルを展開",CollapseAll:"すべてを折りたたむ",CompareRevisions:"リビジョンを比較",Replaceby:"選択を次で置換",ResetAction:"アクションをリセット",MenuAutoSetReplaceByNewRevision:"新しいリビジョンで置換を親に適用",TreeListViewReplacePlaceholder:"置換",ToolBarReplaceAll:"すべてを次で置換:",ReplaceActionLatest:"最新リビジョンで置換",ReplaceActionLatestStable:"最新の安定したリビジョンで置換",ReplaceActionLatestReleased:"最新リリース リビジョンで置換",ReplaceActionByNewRevision:"新しいリビジョンで置換",ReplaceActionByRevision:"リビジョンで置換",CreateNewRevision:"リビジョンを新規作成",ReplaceActionNone:"なし",ReplaceMultiInfoPartial:"{selectedNodes} 個のうち {candidatesCount} 個が {action} の候補です",ReplaceMultiInfoFailure:"選択したオブジェクトのいずれも {action} の候補ではありません",ReplaceMultiInfoSuccess:"選択したすべてのオブジェクトが {action} の候補です",TreeListViewTooltipHeaderIsModified:"変更",TreeListViewTooltipCellCandidateAvailable:"{objectName} を次に更新できます: \n{candidateList}",TreeListViewTooltipCellCandidateNone:"{objectName} は更新できません。",TreeListViewTooltipCellIsModifiedAvailable:"権限がある場合、{objectName} は確定後に変更されます。",TreeListViewTooltipCellIsModifiedForbidden:"{objectName} では置換操作を実行できない可能性があります。",TreeListViewTooltipCellIsRevisionForbidden:"{objectName} を改訂できない可能性があります。",ReplaceActionLatestRevision:"最新リビジョン",ReplaceActionLatestReleasedRevision:"最新リリース リビジョン",ReplaceActionLatestStableRevision:"最新の安定したリビジョン",NewRevision:"新規リビジョン",MaturityNewRevision:"作業中",update:"更新",tooltip_update:"このエレメントの少なくとも 1 つの子が、最新リビジョンに置き換えられます",newRevisionAndUpdate:"新規リビジョンと更新",tooltip_newRevisionAndUpdate:"このエレメントの新しいリビジョンが作成され、その新規リビジョンの少なくとも 1 つの子が最新リビジョンに置き換えられます",newRevision:"新規リビジョン",tooltip_newRevision:"このエレメントの新しいリビジョンが作成されます"});define("DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog",{SEL_007:"オブジェクトを複数選択して、このコマンドを実行することはできません。オブジェクトを 1 つだけ選択してください。",BAD_SELECTION:"誤った選択を除去しました。",selection_root:"ルート オブジェクト {name} を選択できません。",selection_child:"親 {parent} と子 {child} を選択した場合、その子オブジェクトを選択できません。",selection_root_no_children:"{name} は、有効な子がないか展開されていないため選択できません。",selection_unsupported_type:"タイプ {type} のオブジェクト {name} を選択できません。",selection_cycle:"{name} とその親は、同時には選択できません。",ERR_007:"オブジェクト {name} は存在しません。ウィジェットをリフレッシュしてから、この操作を行ってください。",ERR_008:"選択したオブジェクトのうち、少なくとも 1 つが存在しません。ウィジェットをリフレッシュしてから、この操作を実行してください。",error_license:"このコマンドに必要なライセンスを持っていません。",operationAborted_Cycle:"循環参照が生じるため、操作は中断されました。",error_timeout:"操作がタイムアウトしました。",error_internal:"内部エラー",error_cancelled:"操作がキャンセルされました。",displayAgain:"このメッセージを再表示しない",executing:"実行しています...",insert_success:"既存項目の挿入に成功しました。",insert_error:"既存項目の挿入に失敗しました: ",insert_unsupported_type_parent:"タイプ {type} のオブジェクトの下に挿入できません。",insert_unsupported_unkowntype_parent:"タイプ {type} のオブジェクトの下にのみ挿入できます。",insert_unsupported_child:"オブジェクト {name} を挿入できません。",insert_unsupported_child_type:"タイプ {name} のオブジェクト {type} は挿入できません。",insert_unsupported_root:"タイプ {type} のルート オブジェクト {name} を追加できません。",insert_unsupported_cycle:"挿入すると {child} と {parent} の間で循環参照が生じるため、挿入は中止されました。",insert_unsupported_itself:"オブジェクト {name} は自身には挿入できません。",insert_failure:"既存の挿入に失敗しました。{parent} の下に {child} は挿入できません。{error}",insert_report_success:"{parent} の下への {child} の挿入に成功しました。",insert_report_failure:"{parent} の下への {child} の挿入に失敗しました。",insert_report_cancelled:"{parent} の下への {child} の挿入がキャンセルされました。",insert_duplicate_report_failure:"{parent} の下への {child} の複写挿入に失敗しました。",insert_duplicate_report_cancelled:"{parent} の下への {child} の複写挿入がキャンセルされました。",replace_success:"置換に成功しました。",replace_error:"置換に失敗しました。 ",SEL_001:"複数選択されたオブジェクトは置換できません。オブジェクトを 1 つだけ選択してください。",SEL_002:"ルート オブジェクトは置換できません。サブレベルのオブジェクトを選択してください。",replace_unsupported_type:"タイプ {type} のオブジェクト {name} を置換できません。",replace_unaccessible_objet:"オブジェクト {name} へのアクセス権がありません。",replace_bad_replacer_type:"タイプ {type} は無効であるため、オブジェクト {name} で置換できません。",replace_latest_failed_already_latest:"置換操作は無視されました。オブジェクト {name} は、すでに最新リビジョンです。",replace_latest_failed_nograph:"置換操作は無視されました。オブジェクト {name} にはリビジョンがありません。",replace_latest_failed_child_selected:"置換対象として、ノードと、その直接または間接の子を一緒に選択しないでください。",replace_report_success:"{oldName} から {newName} への置換に成功しました。",replace_report_failure1:"{oldName} の置換に失敗しました。",replace_report_failure2:"{oldName} から {newName} への置換に失敗しました。",replace_report_abort:"{oldName} から {newName} への置換が中止されました。",replace_report_neutral:"置換操作は無視されました。オブジェクト {oldName} を改訂できませんでした。",replace_unsupported_cycle:"{child} と {parent} の間のサイクルを作成するため、置換操作は無視されました。",replace_unsupported_itself:"置換操作は無視されました。オブジェクト {name} をそれ自体で置換することはできません。",replace_duplicate_report_success:"複写による {oldName} の置換に成功しました。",replace_duplicate_report_abort:"複写による {oldName} の置換を中止しました。",unparent_confirm_message_details:"オブジェクトを添付解除すると、このオブジェクトとその親との間の関係と、それに関する情報が削除されます。",NewRevision_report_success:"{oldName} から新しいリビジョン {newName} が正常に作成されました。",NewRevision_report_failure:"{oldName} から新しいリビジョンを作成できませんでした。",NewRevision_report_abort:"{oldName} からの新しいリビジョンの作成が中止されました。",NewRevision_report_neutral:"{oldName} からの新しいリビジョンが許可されません。少なくとも 2 つのオブジェクトのリビジョン ファミリーが同じです。",unparent_success:"切り離しに成功しました。",unparent_error:"切り離しに失敗しました。 ",unparent_unsupported_object:"オブジェクト {name} の親を解除できません。",unparent_unsupported_root:"少なくとも 1 個の選択ルート オブジェクトに親がないため、切り離せません。サブレベルのオブジェクトのみを選択してください。",unparent_confirm_title:"切り離し",unparent_confirm_message_single:"{name} を切り離してもよろしいですか?",unparent_confirm_message_multiple:"選択したオブジェクトをすべて切り離しますか?",unparent_report_success:"{parentName} からの {instanceName} の切り離しが成功しました",unparent_report_failure:"{parentName} からの {instanceName} の切り離しが失敗しました。",unparent_report_cancelled:"{parentName} からの {instanceName} の切り離しがキャンセルされました。",unwanted_word_delete:"削除",unwanted_word_replacer_delete:"切り離し",reparent_failed_unsupported_type_child_known:"タイプ {type} のオブジェクトを再親化できません。",reparent_failed_unsupported_type_child_unknown:"このタイプのオブジェクトを再親化できません。",SEL_003:"オブジェクトをリオーダするには、そのオブジェクトは 2 つ以上の有効な子を持ち、展開されている必要があります。",SEL_004:"{type} のみをリオーダできます。 {type} を選択してください。",SEL_005:"複数選択したオブジェクトはリオーダできません。オブジェクトを 1 つだけ選択してください。",SUC_005:"リオーダに成功しました。",ERR_005:"リオーダに失敗しました: ",ERR_006:"構造はリオーダ操作中に変更されました (1 つ以上のエレメントが追加または削除されました)。選択内容をリフレッシュした後でツリーをリオーダしてください。",reorder_view_partially_expanded:"構造は部分的に展開されています。表示されていないエレメントはリオーダされません。構造のすべてのエレメントをリオーダするには、構造全体を表示してください。",reorder_failure:"{name} からのリオーダを続行できません ",reorder_warning_unsaved_sorting:"リオーダ コマンドでは、未保存のソートは考慮されません。",insertPC_success:"既存製品構成の挿入に成功しました。",insertPC_error:"既存製品構成の挿入に失敗しました: ",insertPC_failure:"既存製品構成の挿入に失敗しました。{parent} の下に {child} は挿入できません。{error}",insertPC_noPCFound:"挿入は中止されました。製品構成が見つかりません。アタッチされている構成モデルに製品構成が存在するオブジェクトを挿入対象として選択してください。",SUC_ReplaceProductCconfiguration:"既存で製品構成の置換に成功しました。",ERR_ReplaceProductCconfiguration:"既存で製品構成の置換に失敗しました: ",replacePC_failure:"既存で製品構成の置換に失敗しました。{parent} の下の {child} は置換できません。{error}",replacePC_noPCFound:"置換は中止されました。製品構成が見つかりません。アタッチされている構成モデルに製品構成が存在するオブジェクトを置換対象として選択してください。",abort_confirm_message:"この操作を中止してよろしいですか",confirm:"確認",modalFooterAbort:"中断",analyzing:"レベル {level} を解析しています",revising:"新規リビジョンを作成しています...",updating:"更新中...",structure_already_latest:"構造は、すでに最新リビジョンで更新されています。"});define("DS/AuthGenericCommands/assets/nls/AuthGenericReportPanel",{success:"成功",failure:"失敗",neutral:"警告",aborted:"中止"});