const TelegramBot = require('node-telegram-bot-api');

// Քո տվյալները
const token = '8584375772:AAHavBwqJdWsblCin8OsCRAlIe7sehm_QXI';
const ADMIN_CHAT_ID = '6478756726'; 

const bot = new TelegramBot(token, { polling: true });

// Օգտատիրոջ վիճակը պահելու համար
const userState = {};

// --- ՄԵՆՅՈՒՆԵՐ ---

const mainKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🌐 Վեբ Կայքեր', callback_data: 'web_main' }, { text: '🤖 Shop Բոտեր', callback_data: 'ecommerce_bot' }],
            [{ text: '⚙️ Աշխատանքային Փուլեր', callback_data: 'process' }, { text: '❓ FAQ', callback_data: 'faq' }],
            [{ text: '📢 Բողոքներ և Առաջարկներ', callback_data: 'feedback' }],
            [{ text: '💎 Ինչու՞ ընտրել մեզ', callback_data: 'why_us' }],
            [{ text: '📁 Portfolio', url: 'https://mkheyan-vazgen-portfolio.vercel.app' }, { text: '📞 Կապ', callback_data: 'contact' }]
        ]
    }
};

const webSubMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📦 Ծանոթանալ Փաթեթներին', callback_data: 'web_packages' }],
            [{ text: '🚀 Պատվիրել Անհատական Կայք', callback_data: 'contact' }],
            [{ text: '🔙 Հետ', callback_data: 'back_to_main' }]
        ]
    }
};

const botSubMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📦 Ծանոթանալ Փաթեթներին', callback_data: 'bot_packages' }],
            [{ text: '🚀 Պատվիրել Բոտ', callback_data: 'contact' }],
            [{ text: '🔙 Հետ', callback_data: 'back_to_main' }]
        ]
    }
};

const backToMain = {
    reply_markup: {
        inline_keyboard: [[{ text: '🔙 Վերադառնալ Գլխավոր Մենյու', callback_data: 'back_to_main' }]]
    }
};

// --- ՖՈՒՆԿՑԻԱՆԵՐ ---

function sendFancyMessage(chatId, text, keyboard) {
    bot.sendChatAction(chatId, 'typing');
    setTimeout(() => {
        bot.sendMessage(chatId, text, keyboard);
    }, 400);
}

// --- ՀՐԱՄԱՆՆԵՐ ---

bot.onText(/\/start/, (msg) => {
    userState[msg.chat.id] = null;
    const welcomeText = `Ողջույն, բարի գալուստ Mkheyan Engineering 🚀

Մենք ստեղծում ենք բարձրակարգ թվային լուծումներ, որոնք կբարձրացնեն Ձեր բիզնեսի վաճառքները և հեղինակությունը ✨

Ընտրեք Ձեզ հետաքրքրող ուղղությունը ստորև 👇`;
    bot.sendMessage(msg.chat.id, welcomeText, mainKeyboard);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'back_to_main') {
        userState[chatId] = null;
        bot.editMessageText(`🏠 Գլխավոր Մենյու: Ինչպե՞ս կարող ենք օգնել Ձեր բիզնեսին 👇`, {
            chat_id: chatId,
            message_id: query.message.message_id,
            ...mainKeyboard
        });
        return;
    }

    switch (data) {
        case 'web_main':
            sendFancyMessage(chatId, `🌐 Վեբ Կայքերի Պրեմիում Մշակում

Մենք ապահովում ենք իդեալական UI/UX դիզայն, կայծակնային արագություն և լիարժեք հարմարեցում բոլոր էկրաններին 📱 Ձեր կայքը կբարձրացնի բրենդի վստահությունը և կրկնապատկի վաճառքները 📈`, webSubMenu);
            break;

        case 'web_packages':
            sendFancyMessage(chatId, `📦 Վեբ Կայքերի Փաթեթներ

💎 Landing Page (Մեկ էջանոց)
Հարմար է կոնկրետ մեկ ապրանքի կամ ծառայության վաճառքի համար: Ներառում է հաճախորդների հայտերի հավաքագրում և ժամանակակից դիզայն:

💎 Corporate Site (Բիզնես կայք)
Լիարժեք ներկայացուցչական կայք՝ ծառայությունների բաժին, բլոգ, Մեր մասին էջ և կոնտակտներ: Բարձրացրեք բիզնեսի հեղինակությունը և վստահությունը:

💎 E-Commerce (Օնլայն խանութ)
Ամբողջական վաճառքի հարթակ՝ ապրանքների կատալոգ, զամբյուղ, վճարային համակարգեր և պատվերների կառավարում: Ավտոմատացրեք վաճառքները և բարձրացրեք եկամուտը 💰`, backToMain);
            break;

        case 'ecommerce_bot':
            sendFancyMessage(chatId, `🤖 Բոտերի Մշակում

Telegram բոտը թույլ է տալիս հաճախորդին կատարել գնում ընդամենը մի քանի վայրկյանում՝ առանց կայք անցնելու ⚡ Սա ավտոմատացնում է ամբողջ սպասարկումը և խնայում ռեսուրսներ ✅`, botSubMenu);
            break;

        case 'bot_packages':
            sendFancyMessage(chatId, `📦 Shop Բոտերի Փաթեթներ

🔵 1. START Shop Bot
Կատալոգ, զամբյուղ և պատվերի ձևակերպում: Հարմար է փոքր բիզնեսի համար:

🔵 2. BUSINESS Shop Bot
Ավելացվում են վճարային համակարգեր, ադմինիստրատիվ պանել և հաճախորդների բազայի կառավարում:

🔵 3. PREMIUM AI Bot
Բոտը համալրվում է արհեստական բանականությամբ, որն ավտոմատ խորհուրդ է տալիս հաճախորդին և իրականացնում վաճառքներ Ձեր փոխարեն 🔥`, backToMain);
            break;

        case 'process':
            sendFancyMessage(chatId, `⚙️ Մեր Աշխատանքային Փուլերը

📍 1. Ռազմավարության մշակում – Անհատական պլան յուրաքանչյուր նախագծի համար
📍 2. Պրոֆեսիոնալ UI/UX դիզայն – Հարմարավետ, user-friendly ինտերֆեյս
📍 3. Ծրագրային մշակում – Նորարար տեխնոլոգիաներով լուծումներ
📍 4. Բազմափուլ թեստավորում – Համակարգերը միշտ պատրաստ են գործարկման
📍 5. Մշտական տեխնիկական աջակցություն – Մենք միշտ ձեր կողքին ենք

Միացեք Mkheyan Engineering-ին և տեսեք բիզնեսի իրական աճը 🚀`, backToMain);
            break;

        case 'faq':
            sendFancyMessage(chatId, `❓ Հաճախակի Տրվող Հարցեր

💡 1. Որքա՞ն է արժեքը
Յուրաքանչյուր նախագիծ ունի իր բարդությունը, գինը հաշվարկվում է անհատական:

💡 2. Ինչպե՞ս է կատարվում սպասարկումը
Մենք տրամադրում ենք երաշխիքային սպասարկում բոլոր պրոդուկտների համար:

💡 3. Հնարավո՞ր է ավելացնել ֆունկցիաներ հետագայում
Այո, մեր կոդը ճկուն է և թույլ է տալիս ցանկացած ընդլայնում:

💡 4. Որքա՞ն ժամանակում է պատրաստ լինում նախագիծը
Ժամկետները կախված են նախագծի բարդությունից, բայց միշտ նշվում են պայմանագրում:

💡 5. Արդյո՞ք տրամադրվում է տեխնիկական աջակցություն
Մենք տրամադրում ենք շարունակական տեխնիկական աջակցություն և խորհրդատվություն 🤝`, backToMain);
            break;

        case 'feedback':
            userState[chatId] = 'AWAITING_FEEDBACK';
            sendFancyMessage(chatId, `📢 Բողոքների և Առաջարկների Բաժին

Գրեք Ձեր հաղորդագրությունը ստորև 👇`, {
                reply_markup: {
                    inline_keyboard: [[{ text: '❌ Չեղարկել', callback_data: 'back_to_main' }]]
                }
            });
            break;

        case 'why_us':
            sendFancyMessage(chatId, `💎 Ինչու՞ ընտրել Mkheyan Engineering

✅ Միջազգային ստանդարտներին համապատասխան որակ
✅ Անհատական լուծումներ յուրաքանչյուր բիզնեսի համար
✅ Հստակ ժամկետների պահպանում
✅ Թափանցիկ գնագոյացում
✅ Կենտրոնանում ենք Ձեր բիզնեսի աճի վրա 🎯`, backToMain);
            break;

        case 'contact':
            sendFancyMessage(chatId, `📞 Կապ և Պատվեր

Պատրաստ ենք սկսել Ձեր թվային հաղթարշավը: Մենք կպատասխանենք Ձեր բոլոր հարցերին ✨

📱 Հեռախոս: +374 77 430886 / +374 99 430886
💬 Telegram: @Mkheyan47
📧 Email: programmer.2010.06@gmail.com`, backToMain);
            break;
    }

    bot.answerCallbackQuery(query.id).catch(() => {});
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (userState[chatId] === 'AWAITING_FEEDBACK' && msg.text) {
        const feedbackToAdmin = `📩 Feedback Mkheyan Engineering

👤 Ումից: ${msg.from.first_name} ${msg.from.last_name || ''}
🔗 Username: @${msg.from.username || 'չկա'}
🆔 ID: ${chatId}

📝 Տեքստ:
${msg.text}`;
        
        bot.sendMessage(ADMIN_CHAT_ID, feedbackToAdmin);
        sendFancyMessage(chatId, `✅ Շնորհակալություն: Ձեր հաղորդագրությունը փոխանցվեց տնօրինությանը`, mainKeyboard);
        userState[chatId] = null;
    } else if (msg.text && !msg.text.startsWith('/')) {
        bot.sendMessage(chatId, `Խնդրում ենք օգտվել կոճակներից՝ ծառայություններին ծանոթանալու համար 😊`, mainKeyboard);
    }
});