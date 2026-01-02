const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// --- ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ ---
const token = '8584375772:AAHavBwqJdWsblCin8OsCRAlIe7sehm_QXI';
const ADMIN_CHAT_ID = '6478756726'; 

const bot = new TelegramBot(token, { polling: true });
const userState = {};

// --- ՄԵՆՅՈՒՆԵՐ ---

const mainKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🌐 Վեբ Կայքեր', callback_data: 'web_main' }, { text: '🤖 Smart Բոտեր', callback_data: 'ecommerce_bot' }],
            [{ text: '🚀 DIGITAL ՓԱԹԵԹՆԵՐ (PREMIUM)', callback_data: 'digital_packages' }],
            [{ text: '⚙️ Ինչպես ենք աշխատում', callback_data: 'process' }, { text: '❓ Հարց ու Պատասխան', callback_data: 'faq' }],
            [{ text: '📢 Առաջարկներ', callback_data: 'feedback' }],
            [{ text: '💎 Ինչու հենց մենք', callback_data: 'why_us' }],
            [{ text: '📁 Պորտֆոլիո', url: 'https://mkheyan-vazgen-portfolio.vercel.app' }, { text: '📞 Կապ մեզ հետ', callback_data: 'contact' }]
        ]
    }
};

const digitalSubMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📦 Digital START', callback_data: 'd_start' }],
            [{ text: '⚡ Digital PRO', callback_data: 'd_pro' }],
            [{ text: '🔥 Digital MAX', callback_data: 'd_max' }],
            [{ text: '🔙 Հետ', callback_data: 'back_to_main' }]
        ]
    }
};

const webSubMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📦 Վեբ Փաթեթներ', callback_data: 'web_packages' }],
            [{ text: '🚀 Անհատական Պատվեր', callback_data: 'contact' }],
            [{ text: '🔙 Հետ', callback_data: 'back_to_main' }]
        ]
    }
};

const botSubMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📦 Բոտերի Տեսակները', callback_data: 'bot_packages' }],
            [{ text: '🚀 Պատվիրել Smart Բոտ', callback_data: 'contact' }],
            [{ text: '🔙 Հետ', callback_data: 'back_to_main' }]
        ]
    }
};

const backToMain = {
    reply_markup: {
        inline_keyboard: [[{ text: '🔙 Գլխավոր Մենյու', callback_data: 'back_to_main' }]]
    }
};

// --- ՕԳՆՈՂ ՖՈՒՆԿՑԻԱ ---

function sendFancyMessage(chatId, text, keyboard = backToMain, parseMode = 'Markdown') {
    bot.sendChatAction(chatId, 'typing');
    setTimeout(() => {
        bot.sendMessage(chatId, text, {
            ...keyboard,
            parse_mode: parseMode
        });
    }, 400);
}

// --- START ---

bot.onText(/\/start/, (msg) => {
    userState[msg.chat.id] = null;

    const welcomeText = `
Ողջույն 👋 Բարի գալուստ *Mkheyan Engineering* 🚀  

Մենք ստեղծում ենք **վաճառող վեբ կայքեր և խելացի բոտեր**, որոնք աշխատում են Ձեր փոխարեն՝  
💰 բերում են հաճախորդ  
⚡ խնայում են ժամանակ  
📈 և մեծացնում են շահույթը  

Եթե ուզում եք, որ Ձեր բիզնեսը աշխատի *24/7* — ճիշտ տեղում եք 😉  

Ընտրեք՝ ինչն է պետք Ձեզ այսօր 👇
    `;

    bot.sendMessage(msg.chat.id, welcomeText, { ...mainKeyboard, parse_mode: 'Markdown' });
});

// --- CALLBACKS ---

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'back_to_main') {
        userState[chatId] = null;
        bot.editMessageText(`🏠 *Գլխավոր Մենյու*\n\nԸնտրեք Ձեր բիզնեսի աճի ուղղությունը 👇`, {
            chat_id: chatId,
            message_id: query.message.message_id,
            ...mainKeyboard,
            parse_mode: 'Markdown'
        });
        return;
    }

    switch (data) {
        case 'web_main':
            sendFancyMessage(chatId, `
🌐 *Վեբ Կայքեր, որոնք ՎԱՃԱՌՈՒՄ ԵՆ* Ձեր կայքը պարզապես էջ չէ — դա Ձեր **գլխավոր վաճառողն է** 👇  

🎨 Պրեմիում դիզայն՝ վստահություն առաջին վայրկյանից  
📈 Վաճառող կառուցվածք՝ այցելու ➜ հաճախորդ  
⚡ Գերարագ բեռնավորում  
🔍 SEO՝ որպեսզի Ձեզ գտնեն Google-ում  
            `, webSubMenu);
            break;

        case 'web_packages':
            sendFancyMessage(chatId, `
📦 *Վեբ Փաթեթներ*  
💎 *Landing Page* — մաքսիմալ կոնվերսիա (60,000-90,000 դրամ)  
💎 *Business Website* — ընկերության կայք (150,000-220,000 դրամ)  
💎 *E-Commerce* — լիարժեք օնլայն խանութ (250,000-450,000 դրամ)  

💡 Կօգնենք ընտրել լավագույն տարբերակը Ձեր բիզնեսի համար։
            `);
            break;

        case 'ecommerce_bot':
            sendFancyMessage(chatId, `
🤖 *Smart Բոտեր — Ձեր թվային աշխատակիցը*  

📩 Պատասխանել հաճախորդներին  
🛒 Ընդունել պատվերներ 24/7  
📊 Հավաքել տվյալներ  
💬 Ուղարկել վաճառող հաղորդագրություններ  

⏰ Աշխատում է nonstop՝ առանց հոգնելու։
            `, botSubMenu);
            break;

        case 'bot_packages':
            sendFancyMessage(chatId, `
📦 *Բոտերի Տեսակներ*  
🔹 *Basic* — FAQ, կոնտակտներ (50,000 դրամ)  
🔹 *Standard* — ապրանքներ + պատվերներ (120,000 դրամ)  
🔹 *AI Smart* — ավտոմատ վաճառք + CRM ինտեգրացիա (250,000 դրամ)  
📈 Բիզնեսը ավտոմատացնելու ամենաարագ ճանապարհը։
            `, botSubMenu);
            break;

        case 'digital_packages':
            sendFancyMessage(chatId, `
🚀 *Digital Փաթեթներ (All-in-One)*  
💼 *START*, *PRO*, *MAX* փաթեթներ
            `, digitalSubMenu);
            break;

        case 'd_start':
            sendFancyMessage(chatId, `
📦 *Digital START* — 90,000 դրամ  

✅ Վաճառող Landing Page  
✅ Տեղեկատվական բոտ  
✅ QR լուծում  
            `, {
                reply_markup: { inline_keyboard: [[{ text: '🚀 Պատվիրել START', callback_data: 'contact' }], [{ text: '🔙 Հետ', callback_data: 'digital_packages' }]] }
            });
            break;

        case 'd_pro':
            sendFancyMessage(chatId, `
⚡ *Digital PRO* — 240,000 դրամ  

✅ Մինչև 5 էջ վեբ կայք  
✅ Shop բոտ (պատվեր + վճարում)  
✅ Analytics + SMM  
            `, {
                reply_markup: { inline_keyboard: [[{ text: '🚀 Պատվիրել PRO', callback_data: 'contact' }], [{ text: '🔙 Հետ', callback_data: 'digital_packages' }]] }
            });
            break;

        case 'd_max':
            sendFancyMessage(chatId, `
🔥 *Digital MAX* — 450,000+ դրամ  

✅ E-Commerce կայք (անսահմանափակ ապրանքներ)  
✅ AI Smart Bot  
✅ Branding + Marketing  
🎁 1 տարի հոսթինգ + դոմեն
            `, {
                reply_markup: { inline_keyboard: [[{ text: '🚀 Պատվիրել MAX', callback_data: 'contact' }], [{ text: '🔙 Հետ', callback_data: 'digital_packages' }]] }
            });
            break;

        case 'process':
            sendFancyMessage(chatId, `
⚙️ *Ինչպես ենք աշխատում*  
1️⃣ Վերլուծում ենք բիզնեսը  
2️⃣ Կառուցում վաճառող ռազմավարություն  
3️⃣ Մշակում ենք արագ ու մաքուր  
4️⃣ Թեստավորում  
5️⃣ Աջակցում գործարկումից հետո
            `);
            break;

        case 'faq':
            sendFancyMessage(chatId, `
❓ *Հաճախ տրվող հարցեր*  
⏳ Ժամկետ — 5–21 աշխատանքային օր  
💰 Գին — ֆիքսված, առանց թաքնված վճարների  
🛠 Աջակցություն — նաև հանձնումից հետո  
📞 Սկիզբ — պարզապես գրեք մեզ
            `);
            break;

        case 'why_us':
            sendFancyMessage(chatId, `
💎 *Ինչու՞ ընտրել Mkheyan Engineering*  
🎯 Վաճառող մտածողություն  
⚡ Արագ կապ  
🛡 Անվտանգ և մաքուր կոդ  
🤝 Անհատական մոտեցում
            `);
            break;

        case 'contact':
            sendFancyMessage(chatId, `
📞 *Կապ մեզ հետ*  

📱 Հեռախոսահամարներ:  
- +374 77 430886  
- +374 99 430886  

💬 Telegram: @Mkheyan47  
📧 Email: programmer.2010.06@gmail.com

🚀 *Mkheyan Engineering* — կայքեր և բոտեր, որոնք բերում են վաճառք
            `, backToMain);
            break;

        case 'feedback':
            userState[chatId] = 'AWAITING_FEEDBACK';
            sendFancyMessage(chatId, `
📢 Գրեք Ձեր հարցը կամ առաջարկը, մեր մասնագետը կպատասխանի Ձեզ հնարավորինս արագ 👇
            `, {
                reply_markup: { inline_keyboard: [[{ text: '❌ Չեղարկել', callback_data: 'back_to_main' }]] }
            });
            break;
    }
    bot.answerCallbackQuery(query.id).catch(() => {});
});

// --- MESSAGES ---

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (userState[chatId] === 'AWAITING_FEEDBACK' && msg.text && !msg.text.startsWith('/')) {
        const feedbackText = `📩 *Նոր Feedback:*\n👤 Անուն: ${msg.from.first_name}\n🆔 ID: ${chatId}\n📝 Հաղորդագրություն: ${msg.text}`;
        bot.sendMessage(ADMIN_CHAT_ID, feedbackText, { parse_mode: 'Markdown' });
        sendFancyMessage(chatId, `✅ Շնորհակալություն! Ձեր հաղորդագրությունը ստացված է: Մենք կկապնվենք Ձեզ հետ շատ շուտով:`, mainKeyboard);
        userState[chatId] = null;
    } else if (msg.text && !msg.text.startsWith('/')) {
        bot.sendMessage(chatId, `Օգտվեք մենյուից՝ ավելին իմանալու համար 😊`, mainKeyboard);
    }
});

// --- SERVER ---

http.createServer((req, res) => {
    res.write('Service Online');
    res.end();
}).listen(process.env.PORT || 3000);

console.log("Bot 🚀 has been started successfully!");
