define("DS/ENOExportV5WebCommands/ENOExportV5WebCommands_ru",{});define("DS/ENOExportV5WebCommands/assets/nls/ExportV5Cmd",{title:"Экспорт V5",init:"инициализировано! ",loading:"Загрузка объектов для экспорта",option_path:{label:"Экспорт в каталог",option_text:"Введите здесь путь",option_combo:"Выбрать расположение ...",button_add:"Добавить",predefined_paths:"Предопределенные пути",added_path:"Локальное определение"},option_conflict:{option_overwrite:"Перезаписать",option_copy:"Сохранить копию существующего файла в случае конфликта на диске"},generatingfilename:"Создание имен файлов...",buttonLaunch:"Запуск",buttonExport:"Экспорт",buttonCancel:"Отмена",error:{title:"Ошибка",noSelection:"Выберите объекты для экспорта и нажмите на команду Экспорт V5.",empty:{title:"Не удается экспортировать выбранные объекты.",subtitle:"Определенное бизнес-правило создало пустое имя файла. Обратитесь за помощью к администратору."},unicity:{BL:{title:"Не удается экспортировать выбранные объекты.",subtitle:"Определенное бизнес-правило не создало уникальных имен файлов. Обратитесь за помощью к администратору."},noBL:{title:"Не удается экспортировать выбранные объекты.",subtitle:"Созданные имена файлов, основанные на заголовках, не являются уникальными. Обратитесь к администратору для определения правила именования."}},expand_empty:"Содержимое для экспорта отсутствует.",expand_failed:{title:"Не удается экспортировать выбранные объекты.",subtitle:"Обновите виджет и повторите попытку."},type:"Невозможно экспортировать данный тип объекта: {objType}.",CADMaster:"Невозможно экспортировать объекты с форматом CAD {cadmaster}.",launchApp:"Не удается запустить пакетный файл.",errorType:{title:"Возникла непредвиденная ошибка",subtitle:"Обратитесь за помощью к администратору.",message:"ИД ошибки: {errorID}"},fetchFailed:{title:"Не удается извлечь информацию",subtitle:"Убедитесь, что введены правильные учетные данные, или обратитесь за помощью к администратору."},emptyDefinedPath:{title:"Список разрешенных путей пуст.",subtitle:"Обратитесь за помощью к администратору. "},pathInvalid:{title:"Путь, определенный {namesList}, является недопустимым.",subtitle:"Обратитесь за помощью к администратору"},emptyPathIdentifier:{title:" Определенные пути не имеют имени.",subtitle:"Обратитесь за помощью к администратору."},identifierUnicity:{title:"Следующие имена путей не являются уникальными: {namesList}",subtitle:"Обратитесь за помощью к администратору."},emptyobject:"Неверный синтаксис объявления пути. Обратитесь к администратору",timeout:"Время ожидания запроса истекло через {seconds} мс.",security_context_fail:"Запрос сервера не может быть отправлен: сбой при получении контекста безопасности.",expandIssue:"Некоторые данные могут быть еще не проиндексированы. Подождите несколько минут, прежде чем предпринимать новую попытку.",code401:"Ошибка 401. Проблема аутентификации",code400:"Ошибка 400. Неверный запрос",genericError:"Ошибка при обработке запроса",groupnotexpanded:"Свернутая или частично загруженная группа может дать неполный результат. Чтобы выполнить экспорт, разверните группу полностью."},warning:{title:"Предупреждение",title_path:"Недопустимый путь.",empty_path:"Невозможно выполнить экспорт в пустое расположение",invalid_select:"Некоторые выбранные файлы не поддерживаются",invalid_path:"выбранный путь является недопустимым. Исправьте или введите новый.",invalid_fetchanswer:"Некоторые вновь созданные объекты еще не проиндексированы и не могут быть экспортированы."},info:{title:"Информация",message:"Сообщение отправлено."},success:{title:"Успешно",message:"Данные отправлены в CATIA V5 для экспорта."},processing:"Создание имен файлов",launch_batch:"Запуск пакета...","ExportV5.Msg.InvalidInput":"Экспорт в CATIA V5 одних или нескольких выбранных данных не поддерживается.","ExportV5.Msg.ExecutionFailed":"Непредвиденная ошибка.","ExportV5.Msg.ExecutionFailed.Subtitle":"Обратитесь за помощью к администратору.","ExportV5.Msg.InvalidRole":"У вас нет роли для использования экспорта в CATIA V5","ExportV5.Msg.InvalidInputCADMaster":"Одни или несколько выбранных данных имеют неподдерживаемый формат CAD. Экспорт в CATIA V5 не поддерживается.","ExportV5.Msg.ExpandResultEmpty":"Результат развертывания выбранных данных пуст. Экспорт в CATIA V5 невозможен."});