define("DS/IssueManagement/IssueManagement_pt-BR",{});define("DS/IssueManagement/assets/nls/IssueManagement_list",{columns:{instanceName:"Nome da Instância",instanceMatrix:"Matriz de Posição",selection:"Seleção","ds6w:reserved":"Status da reserva","ds6w:reservedBy":"Proprietário da Reserva",hide_show:"Ocultar/Mostrar",find_in_ctx:"Localizar no contexto",tree:"Título","ds6wg:revision":"Revisão","ds6w:type":"Tipo","ds6w:responsible":"Responsável","ds6w:description":"Descrição","ds6w:created":"Carimbo de data/hora criado","ds6w:modified":"Carimbo de data/hora modificado","ds6w:identifier":"Identificador",thumbnail:"Miniatura","ds6w:policy":"Política Colaborativa","ds6w:organizationResponsible":"Organização","ds6w:project":"Espaço Colaborativo",isDuplicated:"Duplicado",isLastMinorRevision:"Não É a Revisão Mais Recente",svg:"Visualizar"},tooltip_reserved:"Reservado",tooltip_unreserved:"Reserva Cancelada",tooltip_thumbnail:"Clique para ver a miniatura",tooltip_true:"Verdadeiro",tooltip_false:"Falso",exportMask:"Exportação CSV.",customize_title:"Personalizar Exibição de Lista em Árvore",PrintOptions_title:"Escolher colunas a serem impressas",PrintOptions_header:"Coluna a ser impressa",PrintOptions_ok:"Imprimir",ExportCSVOptions_title:"Escolher colunas a serem exportadas",ExportCSVOptions_header:"Coluna a ser exportada",ExportCSVOptions_ok:"Exportar",reset:"Redefinir",ColumnVisibility_title:"Escolha as colunas a serem mostradas",ColumnVisibility_header:"Nome da Coluna",ColumnVisibility_color:"Cor",ColumnVisibility_ok:"OK",ColumnVisibility_cancel:"Salvar como modelo",treelistview_customization_selection:"Caixas de Seleção",treelistview_customization_hide_show:"Ocultar/Mostrar em 3D",treelistview_customization_find_in_ctx:"Localizar no contexto",treelistview_customization_instanceName:"Nome da Instância",treelistview_customization_instanceMatrix:"Matriz de Posição",treelistview_customization_thumbnail:"Exibir miniaturas",treelistview_customization_svg:"Visualizar",padcustomizeview_ColumnVisibility_title:"Personalização de coluna",padcustomizeview_PrintOptions_title:"Opções de Impressão",padcustomizeview_ExportCSVOptions_title:"Opções de Exportação",padcustomizeview_ColumnVisibility_instruction:"Oculte ou revele colunas marcando a caixa de seleção",padcustomizeview_PrintOptions_instruction:"Escolha as colunas a serem impressas marcando as caixas de seleção",padcustomizeview_ExportCSVOptions_instruction:"Escolha as colunas a serem exportadas marcando as caixas de seleção",padcustomizeview_button_reset:"Redefinir",padcustomizeview_button_close:"Fechar",padcustomizeview_button_save:"Salvar",padcustomizeview_button_cancel:"Cancelar",padcustomizeview_column_name_header:"Nome da Coluna",padcustomizeview_color_header:"Cor",padcustomizeview_apply_to_this_app:"Aplicar as opções somente a este aplicativo",padcustomizeview_tooltip_show_or_hide:"Mostrar ou ocultar esta coluna",padcustomizeview_tooltip_cannot_hide:"Não é possível ocultar esta coluna",padcustomizeview_tooltip_set_color:"Definir a cor desta coluna",padcustomizeview_tooltip_apply_toggle:"Controla se as alterações devem ser aplicadas a outros aplicativos também",PADColorView_content:"a",density:"Densidade",Comfortable:"Confortável",ComfortableExplanation:"Adaptado a Dispositivos Móveis",Compact:"Compacto",CompactExplanation:"Adaptado ao Uso do Mouse",more:"Mais",colorPicker:{title:"Adicionar cor personalizada",addTitle:"Adicionar",resetTitle:"Redefinir",OKtitle:"Salvar e Aplicar",Canceltitle:"Cancelar",Resettitle:"Redefinir",preview:"Visualizar",backgroundColor:"Cor de fundo",textColor:"Cor do texto",titleCustom:"Adicionar cor personalizada"},colorView:{content:"a",checkmark:"&#x2714;"},PADFind_matchcase:"Corresponder maiúsculas/minúsculas",PADFind_wholeword:"Palavra inteira",PADFind_close:"Fechar"});define("DS/IssueManagement/assets/nls/IssueManagement",{titles:{issues:"{number} problemas",placeholder:{title:"Não há problemas a serem mostrados.",label:"Nenhum problema correspondente aos filtros foi encontrado.",sub:"Tente modificar os critérios dos filtros {filter} ou criar um novo problema {create}.",sub2:"Tente modificar os critérios de filtro {filter}"},refreshing:"Atualizando problemas...",documentation:"Ajuda do Issue Management"},error:{generic:{label:"Algo deu errado.",sub:"Ocorreu um problema com sua solicitação. Atualize a página e tente novamente."},licensing:{label:"Erro de Licença.",sub:"O servidor não conseguiu obter a licença para o usuário {user}"}},information:{toggleTooltip:"Informações",layoutSwitcherTooltip:"Exibir opção",right:"Exibir à direita",bottom:"Exibir na parte inferior",views:{properties:"Propriedades",relatedObjects:"Conteúdo",contexts:"Contextos",team:"Membros",attachments:"Anexos",comments:"Comentários",relations:"Relations",history:"Histórico",documents:"Documentos",noSelection:"Selecione um problema para ver as informações."},header:{summary:"Aberto {timeSince} atrás. Propriedade de {ownerIcon} {owner}.",multipleSelection:{title:"{number} problemas selecionados.",summary:"As alterações serão aplicadas a todos."},showMenu:"Ações",goToNext:"Ir para o próximo problema.",close:"Fechar",goToPrevious:"Ir para o problema anterior.",Varies:"Varia",changeResponsibleOrg:"Organização Responsável",changeReportingOrg:"Organização Relatora",moveResponsibleOrg:"Mover Organização responsável",moveReportingOrg:"Mover Organização de relatório",moveOrgMsg:"Alteração de Organização responsável bem-sucedida",moveReportingOrgMsg:"Alteração da Organização de relatório bem-sucedida.",move:"Mover",cancel:"Cancelar"}},actions:{create:{title:"Novo problema",more:"Novo a partir de...",placeholder:"Título do novo problema...",open:"Abrir a caixa de diálogo de criação",clear:"Limpar",success:'Problema "{title}" criado com êxito.',failure:"Ocorreu um erro durante a criação. Tente novamente.",issue:{blank:"Novo problema",template:"Novo problema com base no template",recentTemplate:"Modelos recentes",similarIssues:"{count} problemas semelhantes encontrados."}},changeAction:"Adicionar uma nova ação de alteração como resolvida por",markup3D:"Adicionar uma nova anotação 3D como anexo",templates:"Gerenciar modelos",print:"Imprimir","export":"Exportar como",exportCSV:"CSV",exportPPTX:"PPTX",exportZIP:"ZIP",customizeView:"Configurar vistas da tabela",select:{title:"Selecionar objetos",selectIssues:"Selecionar todos os problemas",selectChildren:"Selecionar todo o conteúdo visível do problema",unselectAll:"Desmarcar tudo"},find:{title:"Localizar",placeholder:"Localizar...",clear:"Limpar",next:"Próximo {number1}/{number2}",previous:"{number1}/{number2} anterior",select:"Selecione {number} problemas encontrados"},gridView:"Exibição em tabela",listView:"Exibição de Lista",kanbanView:"Exibição de Kanban",more:"Mais ações",dummy:"Não disponível",subscription:{header:"Inscrição",subscribe:"Inscrever-se",unsubscribe:"Cancelar inscrição",editSubscription:"Editar inscrições",mySubscriptions:"Minhas inscrições"}},kanban:{resolutionDate:{overdue:"Atrasado",none:"Sem data",today:"Hoje",tomorrow:"Amanhã",week:"Esta semana",future:"Futuro"},all:"Tudo",dnd:{unsupportedPromote:"Não é possível promover problemas diretamente de '{currState}' para '{state}'.",unsupportedDemote:"Não é possível rebaixar problemas diretamente de '{currState}' para '{state}'.",cannotEditClosedIssues:"Alguns problemas já estão 'Concluídos' e não puderam ser atualizados.",placeholder:"Soltar aqui",notAllSameStatePromote:"Não é possível promover/rebaixar problemas que não estejam em estados iguais."},warning:{closed:"O filtro para a exibição dos problemas 'Concluídos' não está selecionado.<br>Ative-o nas preferências de filtro."},tooltips:{chizu:"Clique para mostrar a coluna:<br> {title}",leftArrow:"Ir para a coluna anterior",rightArrow:"Ir para a próxima coluna"}},filter:{title:"Filtrar por",session:{header:"Minha sessão",title:"Exibir {number} problemas",nothing:"Nada na sessão"},owned:"De minha propriedade",assigned:"Atribuído a mim",filterbyobject:{title:"Filtrar por objeto",placeholder:"Procure um objeto para filtrar",filterMessage:"Nenhum resultado encontrado",search:"Pesquisar",menu:{title:"Menu",settings:{title:"Configurações",filterby:"Filtrar por",affectedItem:"Itens afetados",resolvedItem:"Item Resolvido",context:"Contexto",apply:"Aplicar",cancel:"Cancelar",issueCreation:"Criação de problema",createSetting:"Adicionar automaticamente o objeto selecionado durante a criação do problema"},information:"Informações",openwith:"Abrir com"},dropNotSupported:"Esta operação de soltar não é suportada."},others:{title:"Outros",reported:"De propriedade das minhas organizações",responsible:"Atribuídos às minhas organizações",contributed:"Onde eu contribuo",closed:"Concluído"}},columns:{selection:"",actionsColumn:"Ações",titleColumn:"Título",nameColumn:"Nome",occurrenceColumn:"Caminho",stateColumn:"Estado de maturidade",allColumn:"Tudo",validationColumn:"Status de Validação",descriptionColumn:"Descrição",priorityColumn:"Prioridade",contextsColumn:"Contextos",reportedAgainstColumn:"Itens afetados",resolvedByColumn:"Resolvido por",resolvedItemsColumn:"Itens resolvidos",assigneesColumn:"Encarregados",originatorColumn:"Originador",ownerColumn:"Proprietário",coOwnersColumn:"Coordenadores",contributorsColumn:"Colaboradores",informedUsersColumn:"Usuários Informados",modifiedColumn:"Data de modificação",revisionColumn:"Revisão",isLastRevisionColumn:"É a revisão mais recente",typeColumn:"Tipo",organizationColumn:"Organização",collaborativeSpaceColumn:"Espaço Colaborativo",reportingOrganizationColumn:"Organização Relatora",responsibleOrganizationColumn:"Organização Responsável",resolutionDateColumn:"Data de Vencimento",actionTakenColumn:"Ação Executada",resolutionRecommendationColumn:"Recomendação de Resolução",resolutionStatementColumn:"Declaração de conclusão",estimatedStartDateColumn:"Data de Início Estimada",estimatedEndDateColumn:"Data de Término Estimada",actualStartDateColumn:"Data de Início",actualEndDateColumn:"Data de término real",createdColumn:"Data de Criação",attachmentsColumn:"Anexos",escalationRequiredColumn:"Requer Escalonamento",approvalColumn:"Aprovações",libraryColumn:"Biblioteca",libraryClassColumn:"Classes de biblioteca",completionTypeColumn:"Tipo de conclusão"},list:{expandOrCollapse:"Expandir/Recolher",hasRelated:"Sim ({number})",hasRelatedItems:"Sim",noRelated:"Não"},related:{dialogTitle:"Desanexar {number} objeto(s) de {issues} problemas",confirmDetach:"Tem certeza de que deseja desanexar os itens selecionados?",detach:"Desanexar",cancel:"Cancelar"},commands:{properties:"Propriedades",relationalExplorer:"Relations",collaborativeLifecycle:"Maturidade",compare:"Compare",detach:"Remover",attachments:"Anexos",close:"Marcar como concluído","delete":"Excluir",duplicate:"Duplicar",expandAll:"Expandir o conteúdo",collapseAll:"Recolher conteúdo",more:"Mais",sizeColumnToFit:"Ajustar largura da coluna automaticamente",clearSortOrder:"Limpar preferência de classificação",share:"Copiar link",reopen:"Reabrir",move:"Mover",open:{single:"Abrir com",multiple:"Abrir",reportedAgainst:"Itens afetados",resolvedBy:"Resolvido por",resolvedItems:"Itens resolvidos",contexts:"Contextos"},preview:"Visualizar",edit:"Editar",undoEdit:"Desfazer edição",update:"Atualizar",information:"Informações",download:"Fazer Download",approvalOn:"Aprovações (Ativado)",approvalOff:"Aprovações (Desativado)"},tooltips:{reportedAgainst:"{number} item afetado",resolvedBy:"{number} resolvido por",resolvedItems:"{number} itens resolvidos",contexts:"{number} contextos",noReportedAgainst:'Nenhum "item afetado" anexado',noResolvedBy:"Nenhum 'resolvido por' anexado",noResolvedItems:'Nenhum "item resolvido" anexado',noContext:"Nenhum contexto anexado",isLastRevision:"Esta é a revisão mais recente",isNotLastRevision:"Esta não é a revisão mais recente",noIsLastRevision:"Não aplicável",selectedIssues:"{number} problemas selecionados",helper:"Clique para exibir a ajuda do “Issue Management”.",comments:"{number} comentários",attachments:"{number} anexos",creationDate:"Aberto em {date}.",resolutionDate:"Data de vencimento: {date}",assignees:"{number} encarregados",noAssignee:"Nenhum encarregado"},notifications:{refresh:"Os problemas foram atualizados.",attachSuccess:{reportedAgainst:"Você adicionou {count} objetos a {issue} como itens afetados.",resolvedBy:"Você adicionou {count} objetos a {issue} como Resolvido por.",resolvedItems:"Você adicionou {count} objetos a {issue} como itens resolvidos.",contexts:"Você adicionou {count} objetos a {issue} como contextos.",attachments:"Você adicionou {count} objetos a {issue} como anexos."},detachSuccess:"Objetos desanexados com êxito.",serverError:"Ocorreu um erro. Atualize sua página e tente novamente.",serverWarning:"As operações do servidor estão em andamento para esses objetos. Tente novamente mais tarde."},preferences:{securityContext:"Credenciais",tenant:"3DEXPERIENCE Platform",name:{title:"Título do Widget","default":"Meus problemas"},defaultFilterForAll:{title:"Se nenhum filtro estiver selecionado, os problemas exibidos deverão corresponder às suas credenciais atuais",organizationAndProject:"Organização e Espaço Colaborativo",organization:"Organização",project:"Espaço Colaborativo",policy:"Todos os problemas disponíveis"},validation:"Adicione um processo de validação para novos problemas para aplicar a aprovação ou a rejeição da promoção de um problema depois que ele tiver sido analisado ou revisado.",highlights:{soon:"Número de dias restantes até a data de vencimento antes da exibição de um aviso. A coluna Data de Vencimento deve estar visível."},organizationFilter:"Exibir filtros da organização",tagger:"Preencher marcas"},validation:{none:"N/A",loading:"Buscando informações sobre o status de validação...",approved:"A promoção do problema foi aprovada.",rejected:"A promoção do problema foi rejeitada.",inProgress:"Aguardando a validação.",notStarted:"O processo de validação está ativo."},"export":{exporting:"Exportando problemas, aguarde...",confirmation:{confirm:"Confirmar",cancel:"Cancelar"},csv:{name:"IM_Export_"},pptx:{title:"Confirmar exportação para PPTX",content:"Essa ação exportará {number} problemas e pode levar algum tempo. Deseja continuar?",name:"IM_Export_",exporting:"Exportando o PPTX...",done:"O PPTX foi exportado",failure:"Não é possível exportar os problemas como PPTX"},zip:{title:"Confirmar exportação para ZIP",content:"Essa ação exportará {number} problemas e pode levar algum tempo. Deseja continuar?",name:"IM_Export_",primary:"primary-image.png",exporting:"Exportando o ZIP...",images:"Fazendo download das imagens principais...",documents:"Fazendo download dos documentos...",zipping:"Compactando os arquivos...",done:"O ZIP foi exportado"},exportingAll:"Exportando todos os {number} problemas. Aguarde...",nothingToExport:"Não há problemas a serem exportados.",failure:"Falha na exportação. Tente novamente.",printTotalLabel:"Problemas"},dnd:{partiallyNotSupported:"Alguns objetos não são suportados.",notSupported:"Este tipo de conteúdo não é suportado. Use o aplicativo apropriado do Compass para abrir esse tipo de conteúdo.",onlyIssues:"Somente problemas podem ser soltos.",dialogTitle:"Adicionar {number} objetos a {issue}",whereToDrop:"Onde você deseja adicionar esses objetos?",alreadyAttached:"Este objeto já está anexado ao problema.",attach:"Adicionar",cancel:"Cancelar",references:"Referências",instances:"Caminhos"},tasks:{cancel:"Cancelar",cancelLabel:"Forneça um objeto existente para ser adicionado, cuja origem seja um aplicativo 3D compatível."},facets:{attachments:{placeholder:"Esta visualização não suporta seleção múltipla. Selecione apenas um problema para ver somente seus anexos."},comments:{placeholder:"Esta visualização não suporta seleção múltipla. Selecione apenas um problema para ver somente seus comentários."},history:{placeholder:"Esta visualização não suporta seleção múltipla. Selecione apenas um problema para ver somente seu histórico."},relations:{placeholder:"Esta visualização não suporta seleção múltipla. Selecione apenas um problema para ver suas relações."}},tagger:{waiting:{title:"Aplicando 6WTags...",label:"Seus problemas serão filtrados com base em 6WTags anteriores."},cancel:"Cancelar"},summaryview:"",multiTenants:{differentTenant:"Plataforma alterada",mismatchTenant:"Você não tem a função de licença necessária para acessar problemas na plataforma {tenant}.",mismatchTenantSharedTemplate:"Incompatibilidade de plataforma. Este modelo compartilhado não foi adicionado à sua lista de modelos."},approvals:{approvalEnabled:"Aprovação de problema habilitada",approvalDisabled:"Aprovação de problema desabilitada",approvalOn:"ATIVADO",approvalOff:"DESATIVADO"},resolvedBy:{errorSameIssue:"O mesmo objeto de Problema não pode ser adicionado como Resolvido por."},issueManagementAppHeader:"Issue Management",issueManagementAppIntro:"Use o Issue Management para criar e gerenciar problemas",welcomePanelQuickAccess:"Acesso rápido",welcomePanelIssueManagementHeader:"Começar uma nova atividade",welcomePanelIssueManagement:"Meus problemas",welcomePanelIssueTemplate:"Meus templates",createNewIssue:"Criar novo problema",createNewTemplate:"Criar novo template",whatsNew:"Novidades",footer:"Seção do rodapé",issueSummaryLoading:"Carregando problemas, aguarde",templateSummaryLoading:"Carregando seu template, aguarde",templateTitlePlaceholder:"Não há templates para mostrar.",templatePreferenceName:"Meus templates",resetSession:"Redefinir sessão",emptyDataGridPlaceHolder:"",completionType:"Tipo de conclusão",Open:"Abrir",Cancelled:"Cancelado",Resolved:"Resolvido",successPartial:"Operation is partially successfull",switchView:"Switch View"});