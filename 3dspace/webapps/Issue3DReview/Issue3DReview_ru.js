define("DS/Issue3DReview/Issue3DReview_ru",{});define("DS/Issue3DReview/assets/nls/Issue3DReview",{titles:{issues:"Неполадок: {number}",noIssuesToShow:"Нет неполадок для отображения.",issuesNotDisplayed:"Неполадки не отображаются.",documentation:"Справка по просмотру неполадки в 3D"},error:{generic:{label:"Возникла непредвиденная ошибка",sub:"Обновите страницу и повторите попытку."},licensing:{label:"Невозможно получить лицензию для {user}.",sub:"Убедитесь, что у вас есть доступная лицензия."}},filter:{title:"Фильтровать",synchronize:{header:"Поделиться фильтрами со списком",title:"Синхронизировано",timeout:"Для синхронизации обоих приложений необходимо открыть Issue Management."},owned:"Владелец: я",assigned:"Исполнитель: я",others:{title:"Другие",reported:"Принадлежит моей организации",responsible:"Назначено моей организации",contributed:"Где я являюсь соавтором",closed:"Выполнено"}},commands:{inspect:"Контроль",properties:"Свойства",relationalExplorer:"Взаимосвязи",collaborativeLifecycle:"Готовность",compare:"Сравнить",detach:"Отсоединить",attachments:"Вложения",close:"Отметить как Завершено","delete":"Удалить",duplicate:"Дублировать",more:"Больше",reportedAgainst:"Затронутые элементы",resolvedBy:"Решено пользователем",resolvedItems:"Решенные элементы",contexts:"Контексты",open:{single:"Открыть с помощью",multiple:"Открыть",reportedAgainst:"Затронутые элементы",resolvedBy:"Решено пользователем",resolvedItems:"Решенные элементы",contexts:"Контексты"},share:"Копировать ссылку"},tooltips:{helper:"Нажмите, чтобы отобразить справку по просмотру неполадки в 3D.",selectedIssues:"Выбрано неполадок: {number}."},preferences:{securityContext:"Учетные данные",tenant:"3DEXPERIENCE Platform",name:{title:"Заголовок виджета","default":"Мои неполадки"},defaultFilterForAll:{title:"Если не выбраны все фильтры, отображаемые неполадки должны соответствовать текущим:",organizationAndProject:"Организация и пространство совместной работы",organization:"Организация",project:"Пространство совместной работы",policy:"Все доступные неполадки"},validation:"Добавьте процесс проверки для новых неполадок, чтобы обеспечить принудительное утверждение или отклонение повышения состояния неполадки после ее анализа или рассмотрения.",tagger:"Заполнить теги",stream:"Использовать упрощенную геометрию как поток геометрии по умолчанию",organizationFilter:"Показать фильтры организации"},notifications:{refreshIssues:"Обновление неполадок...",clearIssues:"Очистка неполадок...",lookingIssues:"Поиск неполадок...",issuesLoaded:"{label}: загружено.",dropPreventedForInspection:"Во время проверки нельзя перетаскивать объекты.",serverError:"Произошла ошибка. Обновите страницу и повторите попытку.",serverWarning:"Для этих объектов выполняются операции сервера. Повторите попытку позже.",noIssuesInSession:"Нет неполадок в сеансе.",commandAlreadyProcessing:"Эта команда уже обрабатывается, подождите.",cannotRelocateBalloon:"Невозможно переместить позицию. Проверьте ответственность.",notValidReportedAgainst:"Это недействительные затронутые элементы. Выберите другой объект.",noFocusedViewWhenColorized:"Фокусированный вид не будет отображаться, если в 6WTags активирован режим Цветность.",noSupportedReportedAgainstData:"Данные, прикрепленные к 'Затронутым элементам' для неполадки {name}, не поддерживаются в данном приложении.",noReportedAgainstData:"Отсутствуют данные, прикрепленные к 'Затронутым элементам' для неполадки {name}."},preview:{modified:"Обновлено {date} назад",comments:"Комментариев: {number}",dueDate:"Установленный срок: {date}",noAssignees:"Нет исполнителей",errorFetch:"Информация недоступна",close:"Закрыть"},inspect:{title:"Проверка неполадок ({number})",withContext:"С контекстом",withContextTooltip:"Покажите контекст проверяемой неполадки. Проверка должна выполняться только для одной неполадки.",switchRelated:"Переключить содержимое",switchRelatedTooltip:"Переключение с затронутых элементов на элементы, которые решены пользователем (и наоборот). Проверка должна выполняться только для одной неполадки.",inspectNotAvailable:"Проверьте только одну неполадку, чтобы загрузить контекст.",noContext:"Нет контекста DMU для загрузки.",noResolvedItemsForSwitch:"Нет решенных объектов для загрузки.",objectLoadError:"Ошибка при загрузке объектов.",relocate:"Изменить местоположение этого маркера?",yes:"Да",no:"Нет"},tasks:{cancel:"Нажмите правую кнопку мыши для отмены"},selectIn3D:{confirmTitle:"Выбрать объект в разделе 'Просмотр неполадки в 3D'",confirmBody:"Подтвердите выбор.",confirmOK:"ОК",confirmCancel:"Отмена",pickIn3D:"Выбор в 3D",selectAffectedItem:"Выбрать затронутый элемент",pickUpFrom3DApplication:"Выберите существующий 3D-объект из совместимого приложения для работы с 3D-объектами",selectApplicableContext:"Выбрать применимый контекст",pickUpOccurrenceFrom3DApplication:"Выберите в 3D-приложении, к какому пути можно применить неполадку",cancel:"Отмена"},largeData:"Визуализация больших объемов данных не поддерживается в Issue3DReview",templateDndErrorMsg:"Шаблон проблемы не разрешен",transitionRejectedInV2:"Из-за обновления 3DNavigate переход временно невозможен. В качестве обходного пути можно закрепить созданный новый виджет и использовать WidgetLink для его привязки к любому другому виджету информационной панели. Подробную информацию о WidgetLink см. в документации.",reopen:"Reopen"});