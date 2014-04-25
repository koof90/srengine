var mongoose = require('lib/mongoose.js');
var async = require('async');
var Problem = require('models/problem').Problem;

var ids = [];

async.series([
    open,
    dropDatabase,
    requireModels,
    generateIds,
    createProblems,
    createUsers,
    createFields
], function (err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/user');
    require('models/problem');
    require('models/fieldMap');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function generateIds(callback) {
    for (var i = 0; i <= 100; i++) {
        ids.push(mongoose.Types.ObjectId(i));
    }
    callback(null);
}

function createProblems(callback) {
    //example of problem:
    /*{
        topic: 'Бабдиты',
            question:
        'наводканабазу',
            answers: ['закрывающийкод'],
        cost: 0,
        hints: [
        { text: 'Хостел', cost: 0}
    ],
        bonuses: [
        { text: 'излучение', cost: 0 },
        { text: 'катастрофа', cost: 0},
        { text: 'соска', cost: 0},
        { text: 'баблоотпчелятины', cost: 0}
    ],
        _id: ids[11]
    }*/

    var problems = [
        {
            topic: 'ЗАДАНИЕ № 1 (Бардоотпускное отделение)',
            question:
                'Сегодня 26 апреля 2014 г.\
                Банда «Бабдитов» не спит. Вернее спит мало, потому что пьет допоздна и работает по ночам.\
                Благодарю их, они хорошо решают проблемы. Есть заказ следующий, и они там постараются нормально. Бабдиты вышли на волю. И сразу в пекло.\
                Ёжик – главный отморозок леса, Анка – стреляет редко, но метко, Мара – в лесу с ней лучше не встречаться. Они готовят бомбу, которая взорвет лес.\
                Работа - эксклюзивная! Следите за ними. Настроение прочувствуйте.\
                Взяли бардоотпускное отделение. Положили где-то за 49 из 51 бойцов… а у них без потерь.\
                Ожидайте встречи с ними.\
                Опасайтесь, ощиплют грамотно. Но их не обойти. Эта зона их.',
            answers: ['колючка'],
            cost: 0,
            hints: [
                { text: 'Лесная 49,51', cost: 0}
             ],
            bonuses: [],
            _id: ids[1]
        },
        {
            topic: 'ЗАДАНИЕ № 2',
            question:
                'Дань времени, бабдиты  на осколках золотоносной империи. Без суждений о морали и вере! Под гнетом новой хищной стратегии - золотой лихорадки,\
                симптом которой – артефакты и деньги.\
                Здесь руки безглазой Фемиды не дотягиваются…Разбитые старые баяны-здания, среди жилых. Их щемят и щемят молодые борзые.\
                Ещё не изданный в мае числа первого, но видимый издали, на ходу щемящий  искрами, лепит инстинкты молочной клыкастой поросли, играет лязгом стали в охрипшем голосе. Меняются лица на морды и рыла, руки - на лапы с когтями, копыта и крылья. И что получишь ты, затеяв спор с зоной? Будь осторожен, сталкер! Держись правее границ угодий.',
            answers: ['валет'],
            cost: 0,
            hints: [
                { text: 'баян во дворе м/у щемиловкой и молочной горой', cost: 0}
            ],
            bonuses: [],
            _id: ids[2]
        },
        {
            topic: 'ЗАДАНИЕ № 3',
            question:
                'Резко, четко, как удары плетки, как остров кидал, больно, как жало, нужно как водка, жирно как сало и так много - что аж плохо стало… Хватит пялиться - ослабится зрение. Надо работать мозгом – упорото, по-моему мнению! Опытный сталкер, герой  - бравый парень. Против тебя неукротимый остров местный, опасный одиночке, ремонтируемый кем-то. И там все делай быстро, четко, чисто. А не то полетят искры. Аккуратно зайди в зону и вскоре, не то 53 бюрера упакоют.  ',
            answers: ['хреннайдешь'],
            cost: 0,
            hints: [
                { text: 'островского, 53', cost: 0}
            ],
            bonuses: [],
            _id: ids[3]
        },
        {
            topic: 'ЗАДАНИЕ № 4 (старый вокзал на ярославской)',
            question:
                'Прочесывая зону, мы забрели в бывшую студию звукозаписи. Проклятые карлики и бюреры побывали и здесь. Разломано всё. Стулья, шкафы, аппаратура…хаос!  Бумаг на полу…хоть жопой жуй! Мы нашли чьи-то зарисовочки. Логика в них есть. Писали они годно.\
                Полупустой вагон ж/д когда-то стоял\
                Меня везет ночной экспресс на старый вокзал\
                И пусть меня никто не ждет у дверей\
                Вези меня ночной экспресс к дядьке Яру скорей.\
                Город плывет в море цветных огней\
                Город живет Славой своих людей\
                Старый вокзал стены свои открой\
                Там мы найдем 3 части кода! Хой!\
                Далее текст размыт. Интересно автор сам бывал там? Посетите зону, будьте осторожны… Монстры не дремлют. Попробуйте собрать все 3 части кода. Безопасный радиус поиска 25-30 метров.',
            answers: ['кровосос'],
            cost: 0,
            hints: [
                { text: 'старый вокзал на ярославской', cost: 0}
            ],
            bonuses: [],
            _id: ids[4]
        },
        {
            topic: 'ЗАДАНИЕ № 5',
            question:
                'Дневник:\
                26.04.2013\
                Упоротые эти жители были. Строили завод. Нашли нефть. Радостно прыгали. Машут и машут руками. Эй-богу, как дети. А в итоге все равно часть забросили. Стоят они такие брошенные за активными. Будьте осторожны… водные аномалии отгорожены остатками сетки и проволоки. Обойдите их. То, что нам нужно находится дальше, почти под прямым от них. Примерно в 200 метрах.',
            answers: ['патолс'],
            cost: 0,
            hints: [
                { text: 'координаты: 57.742458, 40.878735', cost: 0}
            ],
            bonuses: [],
            _id: ids[5]
        },
        {
            topic: 'ЗАДАНИЕ № 6',
            question:
                'Прогулки по Зоне вещь крайне опасная. Есть улицы полные монстров. Есть относительно безопасные. Есть промзоны, укрепленные баррикадами. Пройди по цветной улице, сверни на улицу древнего города, выезжая на нужную улицу, аккуратно проедьте мимо фонтана. Будьте осторожны. Там дикие банды. Не вступайте с ними в диалог. Двигайтесь дальше примерно 100 метров. Поверните направо. Там вы увидите «деревню кровососов». Внимательно обыщите оба дома.  ',
            answers: ['егозваливиталик'],
            cost: 0,
            hints: [
                { text: 'пос. фанерник, ул. центральная 2а', cost: 0}
            ],
            bonuses: [],
            _id: ids[6]
        },
        {
            topic: 'ЗАДАНИЕ № 7',
            question:
                '- Братья! Пришло время вечерней молитвы Золотому Монолиту! Подпевайте мне!\
                \
                - Пятьдесят семь бойцов Долга\
                Плавали в Волге\
                Пытались найти арт "Аквамарин"\
                \
                На них семь кровососов,\
                Девять мертвых матросов,\
                Водичка стала, словно рубин\
                \
                Эхей, семю кровососов,\
                Девять мертвых матросов\
                Послал наш Монолит-господин!\
                \
                Сорок одного снорка\
                Прижали мы к Жарке,\
                Стейк из них очень нами любим\
                \
                Не надо нам их очей,\
                Надо трёх лишь ступней\
                На алтарь тебе, наш господин!\
                \
                Эхей, девять очей,\
                Да тройку ступней,\
                На алтарь тебе, наш господин!',
            answers: [''],
            cost: 0,
            hints: [
                { text: 'координаты: 57.7979 41.0393', cost: 0}
            ],
            bonuses: [],
            _id: ids[7]
        },
        {
            topic: 'ЗАДАНИЕ № 8',
            question:
                'Братья, недавно я видел, как Золотой Монолит покарал неверного. Глупец увидел вдали целую россыпь артефактов и от своей алчности совсем потерял нюх, не заметил отсутствия животных - и угодил прямо в лапы к контроллёру. Я знаю, Монолит показал мне это, чтобы я рассказал вам, что бывает с неверными. Контролёр лишь слегка пришиб мозги тому сталкеру и ушёл, оставив его слоняться буквально в нескольких метрах от заветной цели. О, я до сих пор помню его пустые глаза и это бормотание: "разбуди меня, когда кончится сентябрь, разбуди меня, когда кончится сентябрь". Я не был достоин даровать ему покой и ушёл, оставив его одного скитаться меж трёх сосен.',
            answers: ['золотойносок'],
            cost: 0,
            hints: [
                { text: 'недострой на ул Зеленая м/у  д.3 и д.1', cost: 0}
            ],
            bonuses: [],
            _id: ids[8]
        },
        {
            topic: 'ЗАДАНИЕ № 9',
            question:
                'Мой путь пролегал по самым опасным районам зоны. Повсюду меня поджидали аномалии, мутанты, но хуже всего бабдиты! Эти отмороженные сталкеры отбирали у меня все, что было добыто в зоне. Но несколько артефактов удалось припрятать. Когда я двигался к схрону, наткнулся на бабдитов. Долго пришлось путать следы, уходя от них. Весь город исколесил.\
            Заглянул к "Кристине", потом в приемную президента области... Из последних сил бежал, решил укрыться в юношеской библиотеке. Думал отсиделся. Только собрался двинуть к схрону, как нарвался на Йогу. И снова пришлось побегать...\
            Рванул к другу в "Фотон"...достали и там. Думал смогу в 7 бане укрыться. Перехватили у частного дома с тем же номером. Отбился и прыгнул в реку. Переплыл. Укрылся в Дом.ru...\
            Ушел. Получилось. Можно теперь отправляться к схрону.',
            answers: ['светляк'],
            cost: 0,
            hints: [
                { text: 'подсказка: 57.73.33; 40.93.33, сгоревшая газель', cost: 0}
            ],
            bonuses: [],
            _id: ids[9]
        },
        {
            topic: 'ЗАДАНИЕ № 10',
            question:
                'Мы с напарником к этому НИИ давно присматривались, еще с пятого числа июля месяца, это точно. Уж больно место пустынное. Ни зверья в округе, ни мутантов, метров на семьдесят пять в округе, ей-ей. Только кто бы туда ни пошёл, либо перепуганные вусмерть, с глазами как две восьмерки да с катушек съехавшие возвращались, либо вообще их больше не видали. Решили сами потихоньку разведать. Выехали затемно, а как добрались до места, уже светать начало. Оставили машину в распадочке, пошли лесом к опушке. Там остановились, напарник остался внизу, а я полез на дерево с оптикой - оглядеться, что в окрестностях творится. Вижу - корпуса, и не так чтобы совсем уж заброшенные, стёкла целые почти все, во дворах травы немного, не то что в других местах - по пояс... По всему выходило, что живут тут, однако тишина полнейшая и движения никакого, просто ноль живности. Тут вдруг чуть справа ударили очереди - кто-то из автомата бил, раз девять выстрелили. Я оптикой туда. Вижу, на крыше корпуса незнакомый мужик как сорок крыс затравленных мечется и стреляет без разбору во все стороны. В кого - смотрю и понять не могу. И вот тут… началось... Я всё видел как на ладони. Автомат у него из рук сам собой улетел… Будто девяносто девять крыльев у железки выросло!.. Мужик рот раскрыл, видно, заорал чего-то, достал нож и выставил его перед собой. И тут - ёлки-моталки! - гляжу, а перед ним сам собой висит ещё нож! Вот так в воздухе жалом к нему и висит, и не держит его никто. Что дальше было - это не ночью рассказывать... Минут двадцать семь того мужика резали. Понемногу так, суки, мать их за ногу - там порез, тут укол… Бедолага скоро уже весь в крови был... Потом, как он уж в ногах заплетаться стал, его нож тоже выбило; тут мужика как поднимет в воздух, как завернёт несколько раз… Я такого в жизни не видел - натурально, как тряпку вертело… Я моментально мокрый стал… Потом... Нет, всё, не буду... В общем, как я отдышался, ещё минут пять шарил прицелом по окрестностям. Руки дрожали, оптика от пота мокрая стала… Ну хоть бы какая тварь! Пять раз проверял в обычном диапазоне и в инфакрасном - ни-че-го. Как я слез, напарник на меня поглядел, да и спрашивать раздумал. А как вернулись на базу, я неделю до бровей надирался, не просыхал... Потом, как отошёл чуток, порасспрашивал наших - может, кто про такое чего слышал? Только народ на меня посматривать начал косо - часом, не двинулся ли? Вот такие дела…',
            answers: ['джабе'],
            cost: 0,
            hints: [
                { text: 'подсказка: 57.758809, 40.992755', cost: 0}
            ],
            bonuses: [],
            _id: ids[10]
        },
        {
            topic: 'Бабдиты',
            question:
                'наводканабазу',
            answers: ['закрывающийкод'],
            cost: 0,
            hints: [
                { text: 'Хостел', cost: 0}
            ],
            bonuses: [
                { text: 'излучение', cost: 0 },
                { text: 'катастрофа', cost: 0},
                { text: 'соска', cost: 0},
                { text: 'баблоотпчелятины', cost: 0}
            ],
            _id: ids[11]
        },
        {
            topic: 'Вольные',
            question:
                'наводканабазу',
            answers: ['закрывающийкод'],
            cost: 0,
            hints: [
                { text: 'подсказка', cost: 0}
            ],
            bonuses: [
                { text: 'двустволка', cost: 0 },
                { text: 'сумасшествие', cost: 0},
                { text: 'полушарие', cost: 0},
                { text: 'беспроцентный', cost: 0},
                { text: 'поиск', cost: 0 },
                { text: 'винторез', cost: 0},
                { text: 'ночнаязвезда', cost: 0},
                { text: 'бородабаян', cost: 0}
            ],
            _id: ids[12]
        },
        {
            topic: 'Монолит',
            question:
                'наводканабазу',
            answers: ['закрывающийко2'],
            cost: 0,
            hints: [
                { text: 'подсказка', cost: 0}
            ],
            bonuses: [
                { text: 'живность', cost: 0 },
                { text: 'чириквсмятку', cost: 0},
                { text: 'голодныйкореец', cost: 0}
            ],
            _id: ids[13]
        },
        {
            topic: 'Свобода',
            question:
                'наводканабазу',
            answers: ['закрывающийкод'],
            cost: 0,
            hints: [
                { text: 'подсказка', cost: 0}
            ],
            bonuses: [
                { text: 'вштанах', cost: 0 },
                { text: 'неосилишь', cost: 0},
                { text: 'досвидания', cost: 0}
            ],
            _id: ids[14]
        },
        {
            topic: 'Долг',
            question:
                'наводканабазу',
            answers: ['закрывающийкод'],
            cost: 0,
            hints: [
                { text: 'подсказка', cost: 0}
            ],
            bonuses: [
                { text: 'сушеныйгеракл', cost: 0 },
                { text: 'тупойсапер', cost: 0},
                { text: 'слепойкурей', cost: 0}
            ],
            _id: ids[15]
        },
        {
            topic : 'Глобальный бонус',
            question : 'Оценка за костюмы + количество артефактов',
            answers : ['42'],
            cost: 0,
            hints: [],
            bonuses: [],
            _id: Problem.getGlobalObjectId()
        }
    ];

     async.each(problems, function (problemData, callback) {
        var problem = new mongoose.models.Problem(problemData);
        problem.save(callback);
    }, callback);
}

function createUsers(callback) {
    //example of user: {username: 'admin', password: '123123123', admin: true}

    var users = [
        {username: 'vasya', password: '123'},
        {username: 'petya', password: '123' },
        {username: 'admin', password: '123', admin: true}
    ];

    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.problemHistory.push({problemId: Problem.getGlobalObjectId(),solved:true});
        user.save(callback);
    }, callback);
}

function createFields(callback) {
    //example of fieldmap: {X:1, Y:1, BS:false, ProblemId: ids[1]}

    var fields = [
        {X: 8, Y: 1},{X: 9, Y: 1},{X: 10, Y: 1},{X: 11, Y: 1},{X: 12, Y: 1},{X: 13, Y: 1},{X: 14, Y: 1},
        {X: 1, Y: 2},{X: 2, Y: 2},{X: 3, Y: 2},{X: 4, Y: 2},{X: 5, Y: 2},{X: 6, Y: 2},{X: 7, Y: 2},{X: 10, Y: 2},{X: 11, Y: 2},{X: 12, Y: 2},{X: 13, Y: 2},{X: 14, Y: 2},{X: 15, Y: 2},{X: 16, Y: 2},{X: 17, Y: 2},{X: 18, Y: 2},
        {X: 1, Y: 3},{X: 2, Y: 3},{X: 3, Y: 3},{X: 4, Y: 3},{X: 5, Y: 3},{X: 6, Y: 3},{X: 7, Y: 3},{X: 8, Y: 3},{X: 10, Y: 3},{X: 11, Y: 3},{X: 12, Y: 3},{X: 13, Y: 3},{X: 14, Y: 3},{X: 15, Y: 3},{X: 16, Y: 3},{X: 17, Y: 3},{X: 18, Y: 3},{X: 19, Y: 3},
        {X: 1, Y: 4},{X: 2, Y: 4},{X: 3, Y: 4},{X: 4, Y: 4},{X: 5, Y: 4},{X: 6, Y: 4},{X: 7, Y: 4},{X: 8, Y: 4},{X: 10, Y: 4},{X: 11, Y: 4},{X: 12, Y: 4},{X: 13, Y: 4},{X: 14, Y: 4},{X: 15, Y: 4},{X: 16, Y: 4},{X: 17, Y: 4},{X: 18, Y: 4},{X: 19, Y: 4},{X: 20, Y: 4},
        {X: 1, Y: 5},{X: 2, Y: 5},{X: 3, Y: 5},{X: 4, Y: 5},{X: 5, Y: 5},{X: 6, Y: 5},{X: 7, Y: 5},{X: 8, Y: 5},{X: 10, Y: 5, BS: true},{X: 11, Y: 5},{X: 12, Y: 5},{X: 13, Y: 5},{X: 14, Y: 5},{X: 15, Y: 5},{X: 16, Y: 5},{X: 17, Y: 5},{X: 18, Y: 5},{X: 19, Y: 5},{X: 20, Y: 5},
        {X: 1, Y: 6},{X: 2, Y: 6},{X: 3, Y: 6},{X: 4, Y: 6},{X: 5, Y: 6},{X: 6, Y: 6},{X: 7, Y: 6},{X: 8, Y: 6},{X: 10, Y: 6},{X: 11, Y: 6},{X: 12, Y: 6},{X: 13, Y: 6},{X: 14, Y: 6},{X: 15, Y: 6},{X: 16, Y: 6},{X: 17, Y: 6},{X: 18, Y: 6},{X: 19, Y: 6},{X: 20, Y: 6},
        {X: 2, Y: 7, BS: true},{X: 3, Y: 7},{X: 4, Y: 7},{X: 5, Y: 7},{X: 6, Y: 7},{X: 7, Y: 7},{X: 8, Y: 7},{X: 9, Y: 7},{X: 10, Y: 7},{X: 11, Y: 7},{X: 12, Y: 7},{X: 13, Y: 7},{X: 14, Y: 7},{X: 15, Y: 7},{X: 16, Y: 7},{X: 17, Y: 7},{X: 18, Y: 7},{X: 19, Y: 7, BS: true},{X: 20, Y: 7},
        {X: 2, Y: 8},{X: 3, Y: 8},{X: 4, Y: 8},{X: 5, Y: 8},{X: 6, Y: 8},{X: 7, Y: 8},{X: 8, Y: 8},{X: 10, Y: 8},{X: 11, Y: 8},{X: 12, Y: 8},{X: 13, Y: 8},{X: 14, Y: 8},{X: 15, Y: 8},{X: 16, Y: 8},{X: 17, Y: 8},{X: 18, Y: 8},{X: 19, Y: 8},{X: 20, Y: 8},
        {X: 10, Y: 9},{X: 11, Y: 9},{X: 12, Y: 9},{X: 13, Y: 9},{X: 14, Y: 9},{X: 15, Y: 9},{X: 16, Y: 9},{X: 17, Y: 9},{X: 18, Y: 9},{X: 19, Y: 9},{X: 20, Y: 9},
        {X: 9, Y: 10},{X: 10, Y: 10},{X: 11, Y: 10},{X: 12, Y: 10},{X: 13, Y: 10},{X: 14, Y: 10},{X: 15, Y: 10},{X: 16, Y: 10},{X: 17, Y: 10},{X: 18, Y: 10},{X: 19, Y: 10},{X: 20, Y: 10},
        {X: 9, Y: 11},{X: 10, Y: 11},{X: 11, Y: 11},{X: 12, Y: 11},{X: 13, Y: 11},{X: 14, Y: 11},{X: 15, Y: 11},{X: 16, Y: 11},{X: 17, Y: 11},{X: 18, Y: 11, BS: true},{X: 19, Y: 11},{X: 20, Y: 11},
        {X: 8, Y: 12},{X: 9, Y: 12},{X: 10, Y: 12},{X: 11, Y: 12},{X: 12, Y: 12},{X: 13, Y: 12},{X: 14, Y: 12},{X: 15, Y: 12},{X: 16, Y: 12},{X: 17, Y: 12},{X: 18, Y: 12}
    ];


    async.each(fields, function (fieldData, callback) {
        if(!fieldData.ProblemId){
            fieldData.ProblemId = Problem.getGlobalObjectId();
        }
        var field = new mongoose.models.FieldMap(fieldData);
        field.save(callback);
    }, callback);
}