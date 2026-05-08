const PREMIUM_EMOJIS = {
    "пистолет": '<tg-emoji emoji-id="5258278668936945760">🔫</tg-emoji>',
    "мишень": '<tg-emoji emoji-id="5350460637182993292">🎯</tg-emoji>',
    "флаг_пиратов": '<tg-emoji emoji-id="5386372293263892965">🏴‍☠️</tg-emoji>',
    "информация": '<tg-emoji emoji-id="4958529074533238201">ℹ️</tg-emoji>',
    "огонь": '<tg-emoji emoji-id="5402406965252989103">🔥</tg-emoji>',
    "звездочки": '<tg-emoji emoji-id="5325547803936572038">✨</tg-emoji>',
    "цена": '<tg-emoji emoji-id="4958926882994127612">💰</tg-emoji>',
    "люди": '<tg-emoji emoji-id="5303328645329209869">👥</tg-emoji>',
    "галочка": '<tg-emoji emoji-id="5206607081334906820">✔️</tg-emoji>',
    "крестик": '<tg-emoji emoji-id="4958526153955476488">❌</tg-emoji>',
    "лупа": '<tg-emoji emoji-id="4958587679361991667">🔍</tg-emoji>',
    "ничего_не_нашел": '<tg-emoji emoji-id="5305243423354134165">🔎</tg-emoji>',
    "часы": '<tg-emoji emoji-id="5258258882022612173">⏲</tg-emoji>',
    "стрелка_вниз": '<tg-emoji emoji-id="5406745015365943482">⬇️</tg-emoji>',
    "стрелка_вправо": '<tg-emoji emoji-id="4956282853882069908">➡️</tg-emoji>',
    "сердечко_фиолетовое": '<tg-emoji emoji-id="4956606007221421405">❤️‍🔥</tg-emoji>'
};
const EMOJI_INSTRUCTIONS = Object.entries(PREMIUM_EMOJIS).map(([name, tag]) => `- ${name}: ${tag}`).join("\n");

const FORMATTING_RULES = `
ВАЖНОЕ ПРАВИЛО ФОРМАТИРОВАНИЯ И UI TELEGRAM:
В твоем распоряжении есть ПРЕМИУМ ЭМОДЖИ (HTML теги). Ты ОБЯЗАН использовать их вместо обычных смайликов там, где это уместно:
${EMOJI_INSTRUCTIONS}

Оформляй текст КРАСИВО и структурированно:
- <b>жирный текст</b> для выделения главного (цены, названия).
- <i>курсив</i> для эмоций или цитат.
- Для выделения важных блоков, списков услуг или длинных прайсов используй HTML цитаты:
  <blockquote>Короткий важный текст</blockquote>
  <blockquote expandable>Длинный текст, списки меню, длинные прайс-листы, которые можно свернуть</blockquote>
НЕ используй Markdown-звездочки (**), используй строго <b> и <i>!
`;

const INFO_PROMPT = (kb) => `
Ты — вежливый информационный помощник лазертаг-клуба "Лига Миров".
Твоя цель: четко и по делу отвечать на вопросы клиентов (как доехать, что взять с собой, одежда, формат игр, ограничения, банкетные зоны, квесты, доп.услуги, прайсы и т.д.).
Не продавай активно, не будь пиратом. Просто давай полезную информацию из базы знаний.
Если ответа нет в базе знаний, скажи, что менеджер скоро свяжется и добавь тег [CALL_MANAGER]. или если клиент прямо пишет свяжи с менеджером или человеком то в ответе ДОЛЖЕН быть тег [CALL_MANAGER].

${FORMATTING_RULES}

[БАЗА ЗНАНИЙ ИЗ ТАБЛИЦЫ]
${kb}
`;

const SALES_PROMPT = (kb) => `
Роль:
Ты — менеджер компании лазертаг "Лига миров". Обрабатываешь заявки, рассказываешь о предложениях и отвечаешь на вопросы клиентов. Также предлагаешь дополнительные услуги после записи клиентов.
Задача — помочь клиенту организовать яркое мероприятие, квалифицировать запрос, предложить формат, предложить доп.услуги и меню.
Рабочее время с 10:00 до 22:00 по московскому времени, используй эту фразу когда просят перевести на менеджера
!!!СТРОГО никогда не приветствуй и не здоровайся с клиентом!!!
!Не выдумывай информацию, используй только источники знаний, не пиши дополнительную информацию, которая придуманна!

🎯 Цели общения:
1. Ответить на вопросы о мероприятиях и локациях
2. Рассказать о всех форматах обращайся к базе знаний файл "Форматы праздников" для подробной консультации
Индивидуальный праздник
Квестовый лазертаг
Классический лазертаг
Легендарный праздник
Праздник Героев
RE:LIGHT
!Для получение данной информации используй базу знаний форматы праздников!
!Не забывай, что есть несколько форматов времени игр: 60 минут, 90 минут и 120 минут!
3. Подобрать оптимальный формат под запрос и !всегда спрашивай время для записи! на формат
4. Зафиксировать желаемое время и дату игры или передать менеджеру
5. После записи — предложить доп.услуги и меню
6. Используй базы знаний: "Диалог День рождения", "Диалог корпоратив", "Диалог выпускной", "Диалог просто поиграть/с друзьями", по назначению в зависимости от ответа пользователя, в базе представлен диалог, которому ты должен следовать в каждом из случаев.
7. Если пользователь спрашивает про стоимость, то вежливо попроси нажать на кнопку в боте для подходящего мероприятия. !!!СТРОГО никогда не пиши о стоимости услуг, всегда проси нажать на кнопку в боте, если пользователь не соглашается то добавь тег [CALL_MANAGER]!!!
!Строго используй базу знаний и пиши клиенту, всю подробную информацию из базы знаний!
Ограничение возраста: от 7 лет на все форматы, но также есть мероприятия для детей младше 7 лет, когда клиент интересуется мероприятиями для детей младше 7 лет добавь тег [CALL_MANAGER] и отвечай так: "У нас есть мероприятия для детей младше 7 лет, для этого с вами свяжется менеджер в рабочее время и уточнит детали."!!
!!Дата: завтра = текущая дата (сегодня) + 1 день
послезавтра = завтра + 1 день = текущая дата (сегодня) + 2 дня!!
!!Не пиши клиенту все время на выбор, просто спроси у клиента, во сколько ему бы хотелось провести мероприятие!!
!Если клиент просит ознакомиться или рассказать про мероприятия, отвечай, используя базу знаний и дополняй сообщением: "Также вы можете перейти на сайт и ознакомиться с возможными квестовыми программами для каждого из трех клубов https://ligamirov.ru/kvesty-v-lazertage"
!Если клиент интересуется проведением дня рождения, то предлагай все комплексные праздники, пользуйся базой знаний!
!Не предлагай отдельно банкетную зону и квестовый лазертаг, всегда предлагай клиенту комплексное предложение!
!Не консультируй клиента по меню и не выдумывай позиции из меню, не вводи в заблуждение, а скрыто добавляй тег [CALL_MANAGER], если клиент спрашивает про меню!
!Не заполняй поля сделки сам, если клиент тебе не ответил, всегда спрашивай у клиента все данные, которые нужны для заполнения сделки, если клиент не сказал, сколько по времени хочет мероприятие - спроси у него обязательно!
!Сначала отвечай на вопросы клиента, дальше задавай свои вопросы!
!Если event = День рождения, то запрашивай дату рождения именинника!
!Никогда не пиши об оплате, не запрашивай каким способом удобнее оплатить!
!Обращайся всегда по имени, если клиент его указал, имя используй только то, которое клиент указал вначале, больше не изменяй его, обращайся всегда только по первому имени, используй имя в каждом сообщение!

💬 Структура диалога:
1. Обязательно выяви интерес (приветствие уже отправлено)
2. Квалификация: кто, когда, во сколько, сколько человек, возраст, формат игры, длительность игры. Задавай постепенно по 1-2 вопроса !На вопрос клиента какое время свободно - отвечай: В рабочее время с вами свяжется менеджер и вы сможете выбрать свободное время!
3. Презентация подходящего формата. Для ответа на вопросы о форматах игр/праздников и о ценах используй Базу знаний.
4. Запись (!!обязательно спроси в диалоге: фамилия и имя, дата, время, формат игры, участники, возраст участников, контакт, место, оплата, попроси документ об оплате - без этого ты не сможешь записать!!):
"Хотите узнать подробнее, что входит в программу, или готовы сразу перейти к бронированию? Наш менеджер может рассчитать для вас индивидуальные условия и подобрать удобную дату и время. Подскажите, пожалуйста, по какому номеру с вами связаться? 📞"
Дату записывай в формате число и месяц
5. Подтверждение, что взять с собой. Всегда спрашивай, в каком клубе клиент хочет забронировать игру. И говори адрес клуба, в котором забронирована игра
!Если клиент уже написал в каком клубе хочет провести мероприятие, не нужно спрашивать адрес, где он хочет провести мероприятие!
!Ни когда не спрашивай у клиента адрес, ты должен предлагать клубы, которые у тебя указаны, и адреса к ним!
Общая информация: "Здравствуйте 👋 Ссылка на правила клуба https://ligamirov.ru/pravila-kluba"
6. Доп.услуги и меню: "Мы поможем создать неповторимый праздник под ключ🌟. Вам достаточно только выбрать наполнение программы — об остальном позаботится команда клуба! Дополнительные услуги Лиги Миров: — Вкусный торт по эксклюзивному дизайну; — Индивидуальное оформление банкетной зоны; — Профессиональная динамичная фотосессия; — Увлекательное продолжение праздника: интеллектуальный квиз, настольные игры, мафия, бумажная дискотека, химическое шоу, Тесла-шоу. О какой услуге рассказать подробнее?"
При ответе на вопросы о дополнительных услугах обращайся к Базе знаний файл Наполнение депозита
Также предложи выбрать блюда для этого обращайся к Базе знаний файл "Банкет". Ссылка на каталог с тортами: https://drive.google.com/file/d/1EZZvtdg-1F62ZDcS9Qxo3M8uXdSgi0DN/view
- Отмена брони: "В случае отмены брони после внесения предоплаты возврат осуществляется в следующем порядке: ➖ Отмена за 7 дней до мероприятия и больше — вернём предоплату или перенесем игру с полным её сохранением. ➖ Отмена за 6 и менее дней до мероприятия — возможен единоразовый перенос мероприятия с сохранением предоплаты в течение 6 месяцев, при повторном переносе или отмене сумма предоплаты сгорает. Предоплата будет возвращена тем же способом, как была внесена."
- Напоминание за 3 дня до игры и за 1 день - используй Базу знаний.
- Если клиент хочет квестовый лазертаг, то сразу отправляй ему ссылку на каталог квестовых лазертагов, !не жди, пока он у тебя спросит про каталог!. Она находится в Источниках знаний.
- Заказ еды на вынос возможен, но с 100% предоплатой, обязательно пиши клиенту о том, что для заказа еды на вынос требуется 100% предоплата, скрытно добавь тег[CALL_MANAGER]
- Открытые игры проводятся по четвергам, за анонсами нужно следить в группе в контакте. Не говори о том, когда проводиться открытая игра, клиент должен сам посмотреть в группе в контакте.
- Не пиши в одном сообщении, что можно принести свой торт и, что есть пробковый сбор на алкогольную продукцию.
- Никогда не пиши про цены из меню, ты их не должен знать и выдумывать тоже не нужно.
- Если клиент просит перевести диалог на менеджера, скрытно добавь тег [CALL_MANAGER]
- Если клиент спрашивает об оформлении или украшении залов, используй базу знаний "Оформление зала"
- За фото взимается дополнительная плата, стоимость можно узнать у менеджера
- !Не пиши "приватная игра"!
- В клубе Фалкон есть VR-игры, используй базу знаний, не выдумывай информацию, игры строго по базе знаний, не пиши игры, которых нет в базе знаний
- Отличие праздников: Индивидуальный праздник - динамичная битва и банкет в общей зоне кафе; Легендарный праздник - активная игра с индивидуальной банкетной зоной, доступной с начала мероприятия; Праздник героев - захватывающие сражения с индивидуальной банкетной зоной доступной после игры.
- !Исключи фразу "не стесняйтесь писать" и замени её на "будем рады вам помочь"!
- !Когда записываешь время и дату игры, дополняй фразу: "Это отличное время, чтобы после игры остаться на ужин и насладиться блюдами нашей кухни"!
- Когда пользователь запрашивает информацию о конкретном квестовом лазертаге, сначала уточни клуб.
- Если клиент при запросе квестового лазертага не указал клуб, обязательно уточни клуб
- !Если клиент отказывается от услуги, используй базу знаний "Возражения", чтобы ответить клиенту и продолжить диалог о покупки услуги!
- !Если клиент интересуется мероприятием, где игроков больше 30 человек, то предлагай формат игры "турнир", когда команды играют по очереди, не пиши про время сессий, а пиши: "игры проходят по временным сессиям"!
- Всегда проверяй, что задал ВСЕ обязательные вопросы (ФИО, телефон, дата, время, количество участников, возраст, формат, длительность, клуб). Если клиент не сказал → уточни обязательно.
- Никогда не отвечай односложно (например, «ок», «да»). Всегда отвечай развёрнуто.
- Не выдумывай время игр и не предлагай все часы подряд. Спрашивай только «Во сколько вам удобно?»
- Если клиент уже записан на игру, добавь тег [CALL_MANAGER] и напиши клиенту о том, что в рабочее время с вами свяжется менеджер.
- Если клиент хочет заказать выездное мероприятие или аренду площадок, добавь тег [CALL_MANAGER] и напиши: "Мы проводим выездные мероприятия, для этого с вами свяжется менеджер в рабочее время для уточнения деталей."

ИНСТРУКЦИЯ ПО ВЫЗОВУ ФУНКЦИЙ (Секретные теги):
1. КОГДА КЛИЕНТ ОТВЕТИЛ НА ВСЕ ВОПРОСЫ И ВСЕ ДАННЫЕ СОБРАНЫ ->
Добавь в конец ответа тег[SAVE_USER_DATA] и СТРОГО на следующей строке выведи JSON со всеми собранными данными.
Пример:
[SAVE_USER_DATA]
{{"name": "Иван", "surname": "Иванов", "phone": "+79991234567", "age": "10", "event": "День рождения", "birth_date": "10.10.2015", "birthday_name": "Петя", "club": "Пандора", "player_count": "10", "visit_date": "20.10.2026"}}

${FORMATTING_RULES}[БАЗА ЗНАНИЙ ИЗ ТАБЛИЦЫ]
${kb}
`;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === "POST" && url.pathname === "/telegram") {
            const update = await request.json();
            await handleTelegramUpdate(update, env, request);
            return new Response("OK", { status: 200 });
        }
        
        if (request.method === "POST" && url.pathname === "/bitrix_install") {
            const rawBody = await request.text();
            const params = new URLSearchParams(rawBody);
            const accessToken = params.get("auth[access_token]") || params.get("access_token");
            const domain = params.get("auth[domain]") || params.get("domain");
            const endpoint = params.get("auth[client_endpoint]") || params.get("client_endpoint");

            if (accessToken) {
                await env.BOT_KV.put("B24_APP_TOKEN", accessToken);
                await env.BOT_KV.put("B24_ENDPOINT", endpoint || `https://${domain}/rest/`);
                await env.BOT_KV.put("B24_DOMAIN", domain);
                return new Response("✅ Бот Лига Миров успешно установлен! Теперь нажми кнопку в Телеграм.", { status: 200 });
            }
            return new Response("Ошибка: Токен не найден в запросе", { status: 400 });
        }

        if (request.method === "POST" && url.pathname === "/bitrix_event") {
            try {
                const contentType = request.headers.get("content-type") || "";
                let eventName, chatId, text;

                if (contentType.includes("application/x-www-form-urlencoded")) {
                    const bodyText = await request.text();
                    const params = new URLSearchParams(bodyText);
                    eventName = params.get("event");
                    chatId = params.get("data[MESSAGES][0][chat][id]") || params.get("data[chat][id]");
                    text = params.get("data[MESSAGES][0][message][text]");
                } else if (contentType.includes("application/json")) {
                    const data = await request.json();
                    eventName = data.event;
                    if (data.data && data.data.MESSAGES && data.data.MESSAGES.length > 0) {
                        chatId = data.data.MESSAGES[0].chat.id;
                        text = data.data.MESSAGES[0].message.text;
                    }
                }

                if (eventName === "ONIMCONNECTORMESSAGEADD" && chatId && text) {
                    text = text.replace(/\[br\]/gi, "\n");
                    text = text.replace(/^\[b\][^\[\]]+\[\/b\]:\s*/i, '');
                    text = text.replace(/^\[b\][^\[\]]+:\[\/b\]\s*/i, '');
                    text = text.replace(/\[\/?b\]/gi, '').replace(/<\/?[^>]+(>|$)/g, "");
                    text = text.replace(/^(?:[A-Za-zА-Яа-яЁё0-9_\-\s]+\s*\()?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\)?:\s*/i, '');
                    text = text.replace(/^([A-Za-zА-Яа-яЁё0-9_-]+(?:\s[A-Za-zА-Яа-яЁё0-9_-]+){0,2}):\s*\n/i, '');
                    text = text.trim();

                    if (!text) return new Response("OK", { status: 200 });
                    await tgSend(env.TG_TOKEN, chatId, text);
                }
                else if (eventName === "ONIMCONNECTORDIALOGFINISH" && chatId) {
                    let state = await getUserState(env, chatId);
                    if (state && state.is_manager_chat) {
                        state.is_manager_chat = false;
                        await saveUserState(env, chatId, state);
                        await tgSend(env.TG_TOKEN, chatId, "<i>Менеджер завершил диалог. ИИ-ассистент снова с вами! Чем могу еще помочь?</i>");
                    }
                }
            } catch (e) {
                console.error(e);
            }
            return new Response("OK", { status: 200 });
        }

        if (request.method === "GET" || url.pathname === "/") {
            const urlParams = new URL(request.url).searchParams;
            const lineId = urlParams.get("LINE") || "1";
            
            return new Response(`
                <!DOCTYPE html>
                <html lang="ru">
                <head>
                    <meta charset="UTF-8">
                    <script src="//api.bitrix24.com/api/v1/"></script>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body style="background: transparent; padding: 20px;">
                    <div class="container">
                        <div class="card shadow-sm">
                            <div class="card-body text-center">
                                <h5 class="mb-3">Коннектор «Лига Миров»</h5>
                                <div class="alert alert-warning py-1">ID линии: <b>${lineId}</b></div>
                                <button id="save-btn" class="btn btn-success w-100">ПОДКЛЮЧИТЬ ЧАТ-БОТА</button>
                                <div id="debug-info" class="mt-2 small text-danger"></div>
                            </div>
                        </div>
                    </div>
                    <script>
                        BX24.init(function() {
                            document.getElementById('save-btn').onclick = function() {
                                const btn = this;
                                const debug = document.getElementById('debug-info');
                                btn.disabled = true;
                                btn.innerText = 'Связываюсь с Битриксом...';
                                debug.innerText = '';
                                BX24.callMethod('imconnector.activate', {
                                    'CONNECTOR': 'ligamirov_bot',
                                    'LINE': '${lineId}',
                                    'ACTIVE': 1
                                }, function(result) {
                                    if(result.error()) {
                                        const err = result.error();
                                        alert('Ошибка Битрикса: ' + JSON.stringify(err));
                                        debug.innerText = 'Ошибка: ' + err.error_description;
                                        btn.disabled = false;
                                        btn.innerText = 'Попробовать снова';
                                    } else {
                                        alert('✅ Бот успешно активирован в линии ${lineId}!');
                                        setTimeout(() => { window.location.reload(); }, 1000);
                                    }
                                });
                            };
                        });
                    </script>
                </body>
                </html>
            `, { headers: { "Content-Type": "text/html; charset=utf-8" } });
        }

        return new Response("Not Found", { status: 404 });
    }
};

async function handleTelegramUpdate(update, env, request) {
    const adminId = parseInt(env.ADMIN_ID);

    if (update.callback_query) {
        const call = update.callback_query;
        const chatId = call.message.chat.id;
        const data = call.data;
        const userName = call.from.first_name || "Капитан";

        if (data.startsWith("admin_") && chatId === adminId) {
            if (data === "admin_update_db") {
                await tgSend(env.TG_TOKEN, adminId, "⏳ Синхронизирую данные...");
                const success = await loadKnowledgeBase(env);
                if (success) {
                    await tgSend(env.TG_TOKEN, adminId, "✅ База знаний успешно обновлена!");
                } else {
                    await tgSend(env.TG_TOKEN, adminId, "❌ Возникла ошибка при синхронизации.");
                }
            } else if (data === "admin_stats") {
                const stats = `📊 <b>Статистика бота:</b>\n\nСистема функционирует штатно. Данные подключены.`;
                await tgSend(env.TG_TOKEN, adminId, stats);
            }
            return;
        }

        if (data === "mode_info") {
            await saveUserState(env, chatId, { mode: "info", history:[], is_manager_chat: false });
            await tgEditMessage(env.TG_TOKEN, chatId, call.message.message_id, `${PREMIUM_EMOJIS['информация']} <b>Вы в Инфо-режиме</b>\n<blockquote expandable>Я — база знаний Лиги Миров. Спрашивайте меня о том, как доехать, какие есть ограничения, банкетные зоны или форматы игр. Чем могу помочь?</blockquote>`);
        } else if (data === "mode_sales") {
            await saveUserState(env, chatId, { mode: "sales", history:[], is_manager_chat: false });
            const welcomeText = (
                `${PREMIUM_EMOJIS['флаг_пиратов']} <b>Приветствуем на борту, ${userName}!</b>\n\n` +
                `Клубы Лиги Миров — это как портал в мир увлекательных приключений, где веселье ждет как детей, так и взрослых, как сокровища на дне моря! 🌊\n\n` +
                `Здесь вы не просто поиграете в лазертаг, а сможете устроить настоящий пир для души ${PREMIUM_EMOJIS['сердечко_фиолетовое']}\n` +
                `<blockquote expandable>` +
                `<b>Мы работаем по принципу: <i>«максимум эмоций — минимум забот»!</i></b>\n\n` +
                `${PREMIUM_EMOJIS['галочка']} мы организуем банкет, который заставит ваши вкусовые рецепторы танцевать;\n` +
                `${PREMIUM_EMOJIS['галочка']} оформим зал так, что даже капитан Крюк позавидует;\n` +
                `${PREMIUM_EMOJIS['галочка']} Тематические аниматоры и шоу-программы, которые заставят вас получить бурю эмоций;\n` +
                `${PREMIUM_EMOJIS['галочка']} мастер-классы и творческие зоны;\n` +
                `${PREMIUM_EMOJIS['галочка']} эксклюзивные торты и шоколадный фонтан — сладости, которые потопят ваш корабль в удовольствии;\n` +
                `${PREMIUM_EMOJIS['галочка']} и, конечно, фотограф и видеограф, чтобы запечатлеть каждый момент вашего праздника!` +
                `</blockquote>\n\n` +
                `${PREMIUM_EMOJIS['огонь']} Хотите устроить пиратскую вечеринку? Или гламурный день рождения с блеском? Или активный праздник с квестом по мотивам вашего любимого сериала?\n` +
                `Мы готовы рассмотреть любую идею и постараемся воплотить её в жизнь ${PREMIUM_EMOJIS['звездочки']}\n\n` +
                `<b>Какой формат мероприятия вас интересует?</b> ${PREMIUM_EMOJIS['стрелка_вниз']}`
            );
            await tgEditMessage(env.TG_TOKEN, chatId, call.message.message_id, welcomeText);
            
            let state = await getUserState(env, chatId);
            state.history.push({ role: "user", parts:[{ text: "Системное: Ты уже отправил стартовое приветствие. Жди ответа клиента и задавай квалифицирующие вопросы." }] });
            state.history.push({ role: "model", parts:[{ text: "Принято. Жду ответа клиента." }] });
            await saveUserState(env, chatId, state);
        }
        return;
    }

    if (update.message && update.message.text) {
        const msg = update.message;
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === "/start") {
            let state = await getUserState(env, chatId);
            if (state && state.is_manager_chat) {
                state.is_manager_chat = false;
                await saveUserState(env, chatId, state);
            }

            const keyboard = {
                inline_keyboard: [
                    [{ text: "Частые вопросы", callback_data: "mode_info", icon_custom_emoji_id: "4958529074533238201", color: "primary" }],
                    [{ text: "Забронировать праздник", callback_data: "mode_sales", icon_custom_emoji_id: "5386372293263892965", color: "success" }]
                ]
            };
            
            const welcomeMsg = `${PREMIUM_EMOJIS['мишень']} <b>Добро пожаловать в «Лигу Миров»!</b>\n\n` +
                               `Я ваш интеллектуальный помощник ${PREMIUM_EMOJIS['звездочки']}\n\n` +
                               `Помогу ответить на любые вопросы, подобрать идеальный формат мероприятия и забронировать время.\n\n` +
                               `Пожалуйста, выберите нужный раздел кнопками ниже или используйте кнопку <b>Меню</b> слева от клавиатуры ${PREMIUM_EMOJIS['стрелка_вниз']}`;
                               
            await tgSend(env.TG_TOKEN, chatId, welcomeMsg, keyboard);
            return;
        }

        if (text === "/info") {
            await saveUserState(env, chatId, { mode: "info", history:[], is_manager_chat: false });
            await tgSend(env.TG_TOKEN, chatId, `${PREMIUM_EMOJIS['информация']} <b>Вы в Инфо-режиме</b>\n<blockquote expandable>Я — база знаний Лиги Миров. Спрашивайте меня о том, как доехать, какие есть ограничения, банкетные зоны или форматы игр. Чем могу помочь?</blockquote>`);
            return;
        }

        if (text === "/book") {
            await saveUserState(env, chatId, { mode: "sales", history:[], is_manager_chat: false });
            const userName = msg.from.first_name || "Капитан";
            const welcomeText = (
                `${PREMIUM_EMOJIS['флаг_пиратов']} <b>Приветствуем на борту, ${userName}!</b>\n\n` +
                `Клубы Лиги Миров — это как портал в мир увлекательных приключений, где веселье ждет как детей, так и взрослых, как сокровища на дне моря! 🌊\n\n` +
                `Здесь вы не просто поиграете в лазертаг, а сможете устроить настоящий пир для души ${PREMIUM_EMOJIS['сердечко_фиолетовое']}\n` +
                `<blockquote expandable>` +
                `<b>Мы работаем по принципу: <i>«максимум эмоций — минимум забот»!</i></b>\n\n` +
                `${PREMIUM_EMOJIS['галочка']} мы организуем банкет, который заставит ваши вкусовые рецепторы танцевать;\n` +
                `${PREMIUM_EMOJIS['галочка']} оформим зал так, что даже капитан Крюк позавидует;\n` +
                `${PREMIUM_EMOJIS['галочка']} Тематические аниматоры и шоу-программы, которые заставят вас получить бурю эмоций;\n` +
                `${PREMIUM_EMOJIS['галочка']} мастер-классы и творческие зоны;\n` +
                `${PREMIUM_EMOJIS['галочка']} эксклюзивные торты и шоколадный фонтан — сладости, которые потопят ваш корабль в удовольствии;\n` +
                `${PREMIUM_EMOJIS['галочка']} и, конечно, фотограф и видеограф, чтобы запечатлеть каждый момент вашего праздника!` +
                `</blockquote>\n\n` +
                `${PREMIUM_EMOJIS['огонь']} Хотите устроить пиратскую вечеринку? Или гламурный день рождения с блеском? Или активный праздник с квестом по мотивам вашего любимого сериала?\n` +
                `Мы готовы рассмотреть любую идею и постараемся воплотить её в жизнь ${PREMIUM_EMOJIS['звездочки']}\n\n` +
                `<b>Какой формат мероприятия вас интересует?</b> ${PREMIUM_EMOJIS['стрелка_вниз']}`
            );
            await tgSend(env.TG_TOKEN, chatId, welcomeText);
            
            let state = await getUserState(env, chatId);
            state.history.push({ role: "user", parts:[{ text: "Системное: Ты уже отправил стартовое приветствие. Жди ответа клиента и задавай квалифицирующие вопросы." }] });
            state.history.push({ role: "model", parts:[{ text: "Принято. Жду ответа клиента." }] });
            await saveUserState(env, chatId, state);
            return;
        }

        if (text === "/admin" && chatId === adminId) {
            const keyboard = {
                inline_keyboard: [[{ text: "🔄 Синхронизировать базу (Google Sheets)", callback_data: "admin_update_db" }],[{ text: "📊 Сводная статистика бота", callback_data: "admin_stats" }]
                ]
            };
            const adminText = `🛡 <b>Панель управления (Администратор)</b>\n\nЗдесь вы можете обновлять базу знаний и просматривать статусы системы.`;
            await tgSend(env.TG_TOKEN, chatId, adminText, keyboard);
            return;
        }

        let state = await getUserState(env, chatId);
        if (!state || !state.mode) {
            await tgSend(env.TG_TOKEN, chatId, `Капитан, выберите нужный раздел в <b>Меню</b> команд (/info или /book) или нажмите /start! ${PREMIUM_EMOJIS['флаг_пиратов']}`);
            return;
        }

        if (state.is_manager_chat) {
            await sendToBitrixOpenChannel(env, msg.from, text);
            return;
        }

        await tgSendChatAction(env.TG_TOKEN, chatId, "typing");
        
        let kb = await env.BOT_KV.get("KNOWLEDGE_BASE");
        if (!kb) {
            await loadKnowledgeBase(env);
            kb = await env.BOT_KV.get("KNOWLEDGE_BASE");
        }

        const systemInstruction = state.mode === "info" ? INFO_PROMPT(kb) : SALES_PROMPT(kb);
        let historyForAI =[...state.history];
        historyForAI.push({ role: "user", parts: [{ text: text }] });
        
        try {
            let aiReply = await askGemini(env.GEMINI_KEY, historyForAI, systemInstruction);
            
            state.history.push({ role: "user", parts:[{ text: text }] });
            state.history.push({ role: "model", parts:[{ text: aiReply }] });

            if (aiReply.includes("[CALL_MANAGER]")) {
                aiReply = aiReply.replace("[CALL_MANAGER]", "");
                if (state.lead_id) await updateB24LeadStage(env.B24_WEBHOOK_URL, state.lead_id, "WAITING_MANAGER");
                
                state.is_manager_chat = true;
                await sendToBitrixOpenChannel(env, msg.from, "ВНИМАНИЕ! Клиент запросил менеджера. Последний вопрос клиента: " + text);
            }

            if (aiReply.includes("[SAVE_USER_DATA]")) {
                let parts = aiReply.split("[SAVE_USER_DATA]");
                aiReply = parts[0].trim();
                try {
                    let jsonStr = parts[1].replace(/```json/g, "").replace(/```/g, "").trim();
                    let data = JSON.parse(jsonStr);

                    let contactId = await createB24Contact(env.B24_WEBHOOK_URL, data.name, data.surname, data.phone);
                    let leadId = await createB24Lead(env.B24_WEBHOOK_URL, contactId, data);
                    state.lead_id = leadId;

                    await updateB24LeadStage(env.B24_WEBHOOK_URL, leadId, "7");
                } catch (e) {
                    console.error(e);
                }
            }

            await saveUserState(env, chatId, state);

            if (aiReply.trim()) {
                aiReply = aiReply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
                aiReply = aiReply.replace(/(<blockquote[^>]*>)\s*\n+/gi, '$1');
                aiReply = aiReply.replace(/\n+\s*(<\/blockquote>)/gi, '$1');

                await tgSend(env.TG_TOKEN, chatId, aiReply.trim());
            }

        } catch (e) {
            console.error(e);
        }
    }
}

async function getUserState(env, chatId) {
    const data = await env.BOT_KV.get(`USER_${chatId}`);
    return data ? JSON.parse(data) : null;
}

async function saveUserState(env, chatId, state) {
    if (state.history && state.history.length > 30) {
        state.history = state.history.slice(state.history.length - 30);
    }
    await env.BOT_KV.put(`USER_${chatId}`, JSON.stringify(state));
}

function parseCSV(text) {
    let rows = [], row =[], inQuotes = false, val = '';
    for (let i = 0; i < text.length; i++) {
        let c = text[i], nc = text[i+1];
        if (c === '"' && inQuotes && nc === '"') { val += '"'; i++; }
        else if (c === '"') { inQuotes = !inQuotes; }
        else if (c === ',' && !inQuotes) { row.push(val); val = ''; }
        else if (c === '\n' && !inQuotes) { row.push(val); rows.push(row); row =[]; val = ''; }
        else if (c === '\r' && !inQuotes) {}
        else { val += c; }
    }
    if (val || row.length > 0) row.push(val);
    if (row.length > 0) rows.push(row);
    return rows;
}

async function loadKnowledgeBase(env) {
    try {
        const sheetId = "14FmZn71cMY4ssiTjlJEUoa8-xlLLS4A2VZc4PxEWrvU";
        const sheetBaseUrl = `https://docs.google.com/spreadsheets/d/${sheetId}`;
        
        const htmlRes = await fetch(`${sheetBaseUrl}/export?format=html`);
        const html = await htmlRes.text();
        
        const regex = /id="sheet-button-(\d+)"[\s\S]*?<a[^>]*>(.*?)<\/a>/gi;
        let match;
        const sheets =[];
        while ((match = regex.exec(html)) !== null) {
            sheets.push({ gid: match[1], name: match[2] });
        }
        
        let mdContent = "# БАЗА ЗНАНИЙ ЛАЗЕРТАГ КЛУБОВ «ЛИГА Миров»\n\n";
        
        if (sheets.length === 0) {
            const csvRes = await fetch(`${sheetBaseUrl}/export?format=csv`);
            const csvText = await csvRes.text();
            const rows = parseCSV(csvText);
            mdContent += `## РАЗДЕЛ: Основной\n\n`;
            rows.forEach(row => {
                if (row.length >= 2) {
                    let title = (row[0] || "").trim();
                    let content = (row[1] || "").trim();
                    if (title && content) {
                        content = content.replace(/<br>/g, '\n');
                        mdContent += `### ${title}\n${content}\n\n`;
                    }
                }
            });
        } else {
            for (const sheet of sheets) {
                mdContent += `## РАЗДЕЛ: ${sheet.name}\n\n`;
                const csvRes = await fetch(`${sheetBaseUrl}/export?format=csv&gid=${sheet.gid}`);
                const csvText = await csvRes.text();
                
                const rows = parseCSV(csvText);
                for (const row of rows) {
                    if (row.length >= 2) {
                        let title = (row[0] || "").trim();
                        let content = (row[1] || "").trim();
                        if (title && content && title !== "undefined") {
                            content = content.replace(/<br>/g, '\n');
                            mdContent += `### ${title}\n${content}\n\n`;
                        }
                    }
                }
            }
        }

        await env.BOT_KV.put("KNOWLEDGE_BASE", mdContent);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function askGemini(apiKey, historyForAI, systemPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const payload = {
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        contents: historyForAI,
        generationConfig: { temperature: 0.1 }
    };

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        if(res.status === 404) {
             const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
             const res2 = await fetch(fallbackUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data2 = await res2.json();
            return data2.candidates[0].content.parts[0].text;
        }
        throw new Error(`Gemini API error: ${res.status} - ${await res.text()}`);
    }

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
}

async function createB24Contact(webhook, name, surname, phone) {
    const payload = { fields: { NAME: name, LAST_NAME: surname, PHONE:[{ VALUE: phone, VALUE_TYPE: "WORK" }] } };
    const res = await fetch(`${webhook}crm.contact.add`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    return data.result;
}

async function createB24Lead(webhook, contactId, data) {
    const leadTitle = `ТГ Заявка: ${data.event || 'Мероприятие'} | ${data.visit_date || 'Дата'}`;
    const comments = `
        <b>Новая заявка из Telegram-бота</b><br><br>
        <b>Клуб:</b> ${data.club || 'Не указан'}<br>
        <b>Формат мероприятия:</b> ${data.event || 'Не указан'}<br>
        <b>Дата визита:</b> ${data.visit_date || 'Не указана'}<br>
        <b>Количество игроков:</b> ${data.player_count || 'Не указано'}<br>
        <b>Возраст участников:</b> ${data.age || 'Не указан'}<br>
        <b>Имя именинника:</b> ${data.birthday_name || '-'}<br>
        <b>Дата рождения:</b> ${data.birth_date || '-'}
    `;

    const payload = {
        fields: {
            TITLE: leadTitle,
            CONTACT_ID: contactId,
            STATUS_ID: "NEW",
            SOURCE_ID: "TELEGRAM",
            COMMENTS: comments
        }
    };
    
    const res = await fetch(`${webhook}crm.lead.add`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const resData = await res.json();
    return resData.result;
}

async function updateB24LeadStage(webhook, leadId, stageId) {
    const payload = { id: leadId, fields: { STATUS_ID: stageId } };
    await fetch(`${webhook}crm.lead.update`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
}

async function sendToBitrixOpenChannel(env, user, text) {
    const token = await env.BOT_KV.get("B24_APP_TOKEN");
    const endpoint = await env.BOT_KV.get("B24_ENDPOINT");
    const lineId = env.B24_LINE_ID ? parseInt(env.B24_LINE_ID) : 2;

    if (!token || !endpoint) return;
    
    const payload = {
        CONNECTOR: "ligamirov_bot",
        LINE: lineId,
        MESSAGES:[{
            user: { 
                id: String(user.id), 
                name: user.first_name, 
                last_name: user.last_name || "", 
                url: user.username ? `https://t.me/${user.username}` : "" 
            },
            message: { 
                id: String(Date.now()), 
                date: Math.floor(Date.now() / 1000), 
                text: text 
            },
            chat: { 
                id: String(user.id), 
                name: `TG: ${user.first_name}` 
            }
        }]
    };
    
    try {
        await fetch(`${endpoint}imconnector.send.messages?auth=${token}`, { 
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(payload) 
        });
    } catch (e) {
        console.error(e);
    }
}

async function handleBitrixManagerReply(data, env) {
    try {
        if (!data.data || !data.data.MESSAGES || !data.data.MESSAGES.length) return;
        const msgObj = data.data.MESSAGES[0];
        const chatId = msgObj.chat.id;
        
        let text = msgObj.message.text;
        text = text.replace(/\[b\](.*?)\[\/b\]/gi, "<b>$1</b>").replace(/\[br\]/gi, "\n");
        
        await tgSend(env.TG_TOKEN, chatId, text);
    } catch(e) {
        console.error(e);
    }
}

async function handleBitrixDialogFinish(data, env) {
    try {
        if (!data.data || !data.data.MESSAGES || !data.data.MESSAGES.length) return;
        const chatId = data.data.MESSAGES[0].chat.id;
        let state = await getUserState(env, chatId);
        if (state && state.is_manager_chat) {
            state.is_manager_chat = false;
            await saveUserState(env, chatId, state);
            await tgSend(env.TG_TOKEN, chatId, "<i>Менеджер завершил диалог. ИИ-ассистент снова с вами! Чем могу еще помочь?</i>");
        }
    } catch(e) {
        console.error(e);
    }
}

async function tgSend(token, chatId, text, replyMarkup = null) {
    const payload = { chat_id: chatId, text: text, parse_mode: "HTML" };
    if (replyMarkup) payload.reply_markup = replyMarkup;
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

async function tgEditMessage(token, chatId, messageId, text) {
    const payload = { chat_id: chatId, message_id: messageId, text: text, parse_mode: "HTML" };
    await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

async function tgSendChatAction(token, chatId, action) {
    await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, action: action })
    });
                                }
