/**
 * @1900-2100区间内的公历',农历互转
 * @charset UTF-8
 * @Author  Jea杨(JJonline@JJonline.Cn) 
 * @Time    2014-7-21
 * @Time    2016-8-13 Fixed 2033hex',Attribution Annals
 * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
 * @Version 1.0.2
 * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
 * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
 */


var calendar = {

        /**
         * 农历1900-2100的润大小信息表
         * @Array Of Property
         * @return Hex 
         */
        lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
            0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
            /**Add By JJonline@JJonline.Cn**/
            0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
            0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
            0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
            0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
            0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
            0x0d520
        ], //2100

        /**
         * 公历每个月份的天数普通表
         * @Array Of Property
         * @return Number 
         */
        solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        /**
         * 天干地支之天干速查表
         * @Array Of Property trans['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
         * @return Cn string 
         */
        Gan: ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678'],
        /**
         * 天干地支之地支速查表
         * @Array Of Property 
         * @trans['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
         * @return Cn string 
         */
        Zhi: ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'],
        /**
         * 天干地支之地支速查表<=>生肖
         * @Array Of Property 
         * @trans['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']
         * @return Cn string 
         */
        Animals: ['\u9f20', '\u725b', '\u864e', '\u5154', '\u9f99', '\u86c7', '\u9a6c', '\u7f8a', '\u7334', '\u9e21', '\u72d7', '\u732a'],
        /**
         * 24节气速查表
         * @Array Of Property 
         * @trans['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至']
         * @return Cn string 
         */
        solarTerm: ['\u5c0f\u5bd2', '\u5927\u5bd2', '\u7acb\u6625', '\u96e8\u6c34', '\u60ca\u86f0', '\u6625\u5206', '\u6e05\u660e', '\u8c37\u96e8', '\u7acb\u590f', '\u5c0f\u6ee1', '\u8292\u79cd', '\u590f\u81f3', '\u5c0f\u6691', '\u5927\u6691', '\u7acb\u79cb', '\u5904\u6691', '\u767d\u9732', '\u79cb\u5206', '\u5bd2\u9732', '\u971c\u964d', '\u7acb\u51ac', '\u5c0f\u96ea', '\u5927\u96ea', '\u51ac\u81f3'],
        /**
         * 数字转中文速查表
         * @Array Of Property 
         * @trans ['日','一','二','三','四','五','六','七','八','九','十']
         * @return Cn string 
         */
        nStr1: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341'],
        /**
         * 日期转农历称呼速查表
         * @Array Of Property 
         * @trans ['初','十','廿','卅']
         * @return Cn string 
         */
        nStr2: ['\u521d', '\u5341', '\u5eff', '\u5345'],
        /**
         * 月份转农历称呼速查表
         * @Array Of Property 
         * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
         * @return Cn string 
         */
        nStr3: ['\u6b63', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u51ac', '\u814a'],
        /**
         * 农历天数
         * @Array Of Property
         * @trans ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十']
         * @return Cn string
         */
        nStr4: ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九'],
        /**
         * 返回农历y年一整年的总天数
         * @param lunar Year
         * @return Number
         * @eg:var count = calendar.lYearDays(1987) ;//count=387
         */
        lYearDays: function(y) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) {
                sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
            }
            return (sum + calendar.leapDays(y));
        },
        /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
        leapMonth: function(y) { //闰字编码 \u95f0
            return (calendar.lunarInfo[y - 1900] & 0xf);
        },
        /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0',29',30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
        leapDays: function(y) {
            if (calendar.leapMonth(y)) {
                return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
            }
            return (0);
        },
        /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1',29',30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
        monthDays: function(y, m) {
            if (m > 12 || m < 1) {
                return -1;
            } //月份参数从1至12，参数错误返回-1
            return ((calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        },
        /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1',28',29',30',31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
        solarDays: function(y, m) {
            if (m > 12 || m < 0) {
                return -1;
            } //若参数错误 返回-1
            var ms = m;
            if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
                return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
            } else {
                return (calendar.solarMonth[ms]);
            }
        },
        /**
         * 农历年份转换为干支纪年
         * @param  lYear 农历年的年份数
         * @return Cn string
         */

        toGanZhiYear: function(y, m, d) {
            var cY;
            if (m < 2) {
                cY = calendar.cyclical(y - 1900 + 36 - 1);
            } else {
                cY = calendar.cyclical(y - 1900 + 36);
            }
            var term2 = calendar.getTerm(y, 3); //立春日期
            if (m === 1 && d >= term2) {
                cY = calendar.cyclical(y - 1900 + 36);
            }
            return cY;
        },
        //============================== 传入 offset 返回干支, 0=甲子
        cyclical: function(num) {
            return (calendar.Gan[num % 10] + calendar.Zhi[num % 12]);
        },
        /**
         * 公历月',日判断所属星座
         * @param  cMonth [description]
         * @param  cDay [description]
         * @return Cn string
         */
        toAstro: function(cMonth, cDay) {
            var s = '\u6469\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u6469\u7faf';
            var arr = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
            return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5ea7'; //座
            // return s.substr(m * 2 - (d < '102223444433'.charAt(m - 1) - -19) * 2, 2) + '\u5ea7';
        },
        /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
        toGanZhi: function(offset) {
            return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
        },
        /**
         * 传入公历(!)y年获得该年第n个节气的公历那个月的日期数值
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
        getTerm: function(y, n) {
            var offset = calendar.getOffsetByTerm(y, n - 1);
            var dateObj = calendar.getDateObjByOffset(y, offset);
            return dateObj.getDate();
        },
        /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
        toChinaMonth: function(m) { // 月 => \u6708
            if (m > 12 || m < 1) {
                return -1;
            } //若参数错误 返回-1
            var s = calendar.nStr3[m - 1];
            s += '\u6708'; //加上月字
            return s;
        },
        /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
        toChinaDay: function(d) { //日 => \u65e5
            var s;
            switch (d) {
                case 10:
                    s = '\u521d\u5341';
                    break;
                case 20:
                    s = '\u4e8c\u5341';
                    break;
                case 30:
                    s = '\u4e09\u5341';
                    break;
                default:
                    s = calendar.nStr2[Math.floor(d / 10)];
                    s += calendar.nStr1[d % 10];
            }
            return (s);
        },
        /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
        getAnimal: function(year, month, day) {
            month--;
            var start = 1900,
                value = '';
            var x = (year - start) % 12;
            if (x !== 0 && calendar.getLichunOffset(year, month, day) < 0) {
                x -= 1;
            }
            value = calendar.Animals[x];
            return value;
        },
        //===================返回属相
        getLichunOffset: function(year, month, day) {
            var lichunDate = new Date(year, 0, 1);
            lichunDate.setDate(lichunDate.getDate() + TermTable[(year - 1900) * 24 + 2]);
            var calDate = new Date(year, month, day);
            return (calDate - lichunDate);
        },
        //返回一种的第几周
        getYearWeek: function(a, b, c) {
            var d1 = new Date(a, b, c),
                d2 = new Date(a, 0, 1),
                d = calendar.dayOfYear(d1);
            var num = Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
            if (num > 1 && b === 11) {
                var nextYearDate = new Date(a + 1, 0, 1);
                var interval = nextYearDate.getDay();
                if (interval > 0 && calendar.getIntervalDays(d1, nextYearDate) <= interval) {
                    num = 1;
                }
            }
            return num;
        },
        isEaster: function(y, m, d) {
            var C = Math.floor(y / 100);
            var N = y - 19 * Math.floor(y / 19);
            var K = Math.floor((C - 17) / 25);
            var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
            I = I - 30 * Math.floor((I / 30));
            I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
            var J = y + Math.floor(y / 4) + I + 2 - C + Math.floor(C / 4);
            J = J - 7 * Math.floor(J / 7);
            var L = I - J;
            var M = 3 + Math.floor((L + 40) / 44);
            var D = L + 28 - 31 * Math.floor(M / 4);
            return m === M && d === D;
        },
        /**
         * 传入阳历年月日获得详细的公历',农历object信息 <=>JSON
         * @param y  solar year
         * @param m  solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
        solar2lunar: function(y, m, d) { //参数区间1900.1.31~2100.12.31
            if (y < 1900 || y > 2100) { //年份限定',上限
                return -1;
            }
            if (y == 1900 && m == 0 && d < 31) { //下限
                return -1;
            }
            var objDate = new Date();
            if (!y) { //未传参  获得当天
                objDate = new Date();
            } else {
                objDate = new Date(y, parseInt(m), d);
            }
            var i, leap = 0,
                temp = 0;
            //修正ymd参数
            y = objDate.getFullYear(), m = objDate.getMonth(), d = objDate.getDate();
            m++;
            var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
            for (i = 1900; i < 2101 && offset > 0; i++) {
                temp = calendar.lYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp;
                i--;
            }
            //是否今天
            var isTodayObj = new Date(),
                isToday = false;
            if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
                isToday = true;
            }
            //星期几
            var nWeek = objDate.getDay(),
                cWeek = calendar.nStr1[nWeek];
            //农历年
            var year = i;
            leap = calendar.leapMonth(i); //闰哪个月
            var isLeap = false;
            //效验闰月
            for (i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if (leap > 0 && i == (leap + 1) && isLeap == false) {
                    --i;
                    isLeap = true;
                    temp = calendar.leapDays(year); //计算农历闰月天数
                } else {
                    temp = calendar.monthDays(year, i); //计算农历普通月天数
                }
                //解除闰月
                if (isLeap == true && i == (leap + 1)) {
                    isLeap = false;
                }
                offset -= temp;
            }

            if (offset == 0 && leap > 0 && i == leap + 1) {
                if (isLeap) {
                    isLeap = false;
                } else {
                    isLeap = true;
                    --i;
                }
            }
            if (offset < 0) {
                offset += temp;
                --i;
            }
            //农历月
            var month = i;
            //农历日
            var day = offset + 1;
            //天干地支处理
            var sm = m - 1;
            var gzY = calendar.toGanZhiYear(y, m - 1, d);
            //月柱 1900年1月小寒以前为 丙子月(60进制12)
            var firstNode = calendar.getTerm(y, (m * 2 - 1)); //返回当月「节」为几日开始
            var secondNode = calendar.getTerm(y, (m * 2)); //返回当月「节」为几日开始
            //依据12节气修正干支月
            var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
            if (d >= firstNode) {
                gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
            }
            //传入的日期的节气与否
            var isTerm = false;
            var Term = null;
            if (firstNode === d) {
                isTerm = true;
                Term = calendar.solarTerm[m * 2 - 2];
            }
            if (secondNode === d) {
                isTerm = true;
                Term = calendar.solarTerm[m * 2 - 1];
            }
            //日柱 当月一日与 1900/1/1 相差天数
            var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
            var gzD = calendar.toGanZhi(dayCyclical + d - 1);
            //该日期所属的星座
            var astro = calendar.toAstro(m, d);
            return {
                'lYear': year,
                'lMonth': month,
                'lDay': day,
                'Animal': calendar.getAnimal(y, m, d),
                'IMonthCn': (isLeap ? '\u95f0' : '') + calendar.toChinaMonth(month),
                'IDayCn': calendar.toChinaDay(day),
                'cYear': y,
                'cMonth': m,
                'cDay': d,
                'gzYear': gzY,
                'gzMonth': gzM,
                'gzDay': gzD,
                'isToday': isToday,
                'isLeap': isLeap,
                'nWeek': nWeek,
                'ncWeek': '\u661f\u671f' + cWeek,
                'isTerm': isTerm,
                'Term': Term,
                'astro': astro
            };
        },
        /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历',农历object信息 <=>JSON
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
        lunar2solar: function(y, m, d, isLeapMonth) { //参数区间1900.1.31~2100.12.1
            isLeapMonth = !!isLeapMonth;
            // var leapOffset = 0;
            var leapMonth = calendar.leapMonth(y);
            // var leapDay = calendar.leapDays(y);
            if (isLeapMonth && (leapMonth != m)) { //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
                return -1;
            }
            if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) { //超出了最大极限值 
                return -1;
            }
            var day = calendar.monthDays(y, m);
            var _day = day;
            //bugFix 2016-9-25 
            //if month is leap, _day use leapDays method 
            if (isLeapMonth) {
                _day = calendar.leapDays(y, m);
            }
            if (y < 1900 || y > 2100 || d > _day) { //参数合法性效验 
                return -1;
            }
            //计算农历的时间差
            var offset = 0;
            for (var i = 1900; i < y; i++) {
                offset += calendar.lYearDays(i);
            }
            var leap = 0,
                isAdd = false;
            for (i = 1; i < m; i++) {
                leap = calendar.leapMonth(y);
                if (!isAdd) { //处理闰月
                    if (leap <= i && leap > 0) {
                        offset += calendar.leapDays(y);
                        isAdd = true;
                    }
                }
                offset += calendar.monthDays(y, i);
            }
            //转换闰月农历 需补充该年闰月的前一个月的时差
            if (isLeapMonth) {
                offset += day;
            }
            //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
            var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
            var calObj = new Date((offset + d - 31) * 86400000 + stmap);
            var cY = calObj.getUTCFullYear();
            var cM = calObj.getUTCMonth();
            var cD = calObj.getUTCDate();
            return calendar.solar2lunar(cY, cM, cD);
        },
        BASE_STEMS_DATE: new Date(1899, 1, 4, 0, 0),
        BASE_STEMS_YEAR: 1899,
        JXNames: ['吉', '凶'],
        JXStatusUnknown: -1,
        JXStatusJi: 0,
        JXStatusXiong: 1,
        JXTable: [
            0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB34, //甲子，乙丑，丙寅，丁卯，戊辰，己巳，庚午，辛未，壬申，癸酉
            0x2DD, 0x4A3, 0xD2C, 0x34B, 0xCD2, 0xB34, 0x2C5, 0x4B2, 0xD2C, 0x34B, //甲戌，乙亥，丙子，丁丑，戊寅，己卯，庚辰，辛巳，壬午，癸未
            0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34A, 0xCD2, 0xB34, 0x2CD, 0x4B3, //甲申，乙酉，丙戌，丁亥，戊子，己丑，庚寅，辛卯，壬辰，癸巳
            0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB24, //甲午，乙未，丙申，丁酉，戊戌，己亥，庚子，辛丑，壬寅，癸卯
            0x2CD, 0x4A3, 0xD28, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4A3, 0xD2C, 0x34B, //甲辰，乙巳，丙午，丁未，戊申，己酉，庚戌，辛亥，壬子，癸丑
            0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCF2, 0xB34, 0x2CD, 0x4B3 //甲寅，乙卯，丙辰，丁巳，戊午，己未，庚申，辛酉，壬戌，癸亥
        ],
        mPzStemArray: ['甲不开仓财物耗散', '乙不栽植千株不长', '丙不修灶必见灾殃', '丁不剃头头必生疮', '戊不受田田主不祥',
            '己不破券二比并亡', '庚不经络织机虚张', '辛不合酱主人不尝', '壬不汲水更难提防', '癸不词讼理弱敌强'
        ],
        mPzBranchArray: ['子不问卜自惹祸殃', '丑不冠带主不还乡', '寅不祭祀神鬼不尝', '卯不穿井水泉不香', '辰不哭泣必主重丧', '巳不远行财物伏藏',
            '午不苫盖屋主更张', '未不服药毒气入肠', '申不安床鬼祟入房', '酉不宴客醉坐颠狂', '戌不吃犬作怪上床', '亥不嫁娶不利新郎'
        ],
        CompassUnknown: -1,
        CompassNorth: 0,
        CompassNortheast: 1,
        CompassEast: 2,
        CompassSoutheast: 3,
        CompassSouth: 4,
        CompassSouthwest: 5,
        CompassWest: 6,
        CompassNorthwest: 7,
        CompassNames: ['正北', '东北', '正东', '东南', '正南', '西南', '正西', '西北'],
        ANIMAL: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
        mWxMap: {
            '甲子': '海中金',
            '乙丑': '海中金',
            '丙寅': '炉中火',
            '丁卯': '炉中火',
            '戊辰': '大林木',
            '己巳': '大林木',
            '庚午': '路旁土',
            '辛未': '路旁土',
            '壬申': '剑锋金',
            '癸酉': '剑锋金',
            '甲戌': '山头火',
            '乙亥': '山头火',
            '丙子': '涧下水',
            '丁丑': '涧下水',
            '戊寅': '城头土',
            '己卯': '城头土',
            '庚辰': '白腊金',
            '辛巳': '白腊金',
            '壬午': '杨柳木',
            '癸未': '杨柳木',
            '甲申': '泉中水',
            '乙酉': '泉中水',
            '丙戌': '屋上土',
            '丁亥': '屋上土',
            '戊子': '霹雳火',
            '己丑': '霹雳火',
            '庚寅': '松柏木',
            '辛卯': '松柏木',
            '壬辰': '长流水',
            '癸巳': '长流水',
            '甲午': '沙中金',
            '乙未': '沙中金',
            '丙申': '山下火',
            '丁酉': '山下火',
            '戊戌': '平地木',
            '己亥': '平地木',
            '庚子': '壁上土',
            '辛丑': '壁上土',
            '壬寅': '金箔金',
            '癸卯': '金箔金',
            '甲辰': '覆灯火',
            '乙巳': '覆灯火',
            '丙午': '天河水',
            '丁未': '天河水',
            '戊申': '大驿土',
            '己酉': '大驿土',
            '庚戌': '钗钏金',
            '辛亥': '钗钏金',
            '壬子': '桑拓木',
            '癸丑': '桑拓木',
            '甲寅': '大溪水',
            '乙卯': '大溪水',
            '丙辰': '沙中土',
            '丁巳': '沙中土',
            '戊午': '天上火',
            '己未': '天上火',
            '庚申': '石榴木',
            '辛酉': '石榴木',
            '壬戌': '大海水',
            '癸亥': '大海水'
        },
        querySAByDay: function(date, jxData, fetusData) {
            var hlObj = {};
            var gzDay = calendar.getStemsBranchDay(date);
            var gzMonth = calendar.getStemsBranchMonth(date.getFullYear(), calendar.dayOfYear(date) - 1);
            var gzStr = calendar.getStemsBranchDayAsString(date);
            var dayTg = gzDay % 10;
            var dayDz = gzDay % 12;
            var pzbj = calendar.mPzStemArray[dayTg] + ' ' + calendar.mPzBranchArray[dayDz]; //彭祖百忌
            hlObj.pzbj = pzbj;
            var jsyq = ''; //
            var xsyj = ''; //
            var value = (gzMonth + 10) % 12 + 1;
            if (jxData[value + '-' + gzStr]) {
                jsyq = jxData[value + '-' + gzStr].JSYQ; //吉神宜趋
                xsyj = jxData[value + '-' + gzStr].XSYJ; //凶神宜忌
                hlObj.jsyq = jsyq;
                hlObj.xsyj = xsyj;
            }
            var wx = ''; //五行
            if (calendar.mWxMap[gzStr]) {
                wx = calendar.mWxMap[gzStr];
                hlObj.wx = wx;
            }
            var cs = calendar.cxInfoOfDateTime(date, -2); //冲煞
            hlObj.cs = cs;
            var zhishen = calendar.zhiShenOfMonth(gzMonth % 12, gzDay % 12);
            hlObj.zhishen = zhishen;
            var jianchu = calendar.jianChuOfDate(date);
            hlObj.jianchu = jianchu;
            var stars28 = calendar.stars28OfDate(date);
            hlObj.stars28 = stars28;
            var monthDizhiString = calendar.getStemsBranchMonthAsString(date.getFullYear(), calendar.dayOfYear(date) - 1);
            var dayDzString = calendar.getStemsBranchDayAsString(date);
            var taishen = calendar.taiShenOfMonthDiZhi(monthDizhiString, dayDzString, fetusData);
            hlObj.taishen = taishen;
            return hlObj;
        },
        getStemsBranchDayAsString: function(date) {
            return calendar.formatStemsBranchString(calendar.getStemsBranchDay(date));
        },
        jianChuOfDate: function(date) {
            var baseDate = new Date(1901, 0, 1);
            var thisDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var arr = calendar.twentyFourTermdaysOf(thisDate);
            var jx = -1;
            if (arr.length == 2) {
                var a = parseInt(arr[0]);
                var b = parseInt(arr[arr.length - 1]);
                var offsetDayCount = a % 2 == 0 ? a / 2 : a / 2 + 1;
                if (b && a % 2 == 0) {
                    offsetDayCount += 1;
                }
                var interval = Math.abs((thisDate.getTime() - baseDate.getTime()) / 1000);
                var day = interval / (24 * 60 * 60);
                jx = Math.ceil((5 + day - offsetDayCount) % 12);
            }
            var jianchuIndex = 0;
            if (jx >= 2) {
                jianchuIndex = jx - 2;
            } else {
                jianchuIndex = jx + 10;
            }
            var jianchuArray = ['建日', '除日', '满日', '平日', '定日', '执日', '破日', '危日', '成日', '收日', '开日', '闭日'];
            return jianchuArray[jianchuIndex];
        },
        stars28OfDate: function stars28OfDate(date) {
            var B = (date.getFullYear() - 1) * 365;
            for (var i = 0; i < date.getMonth(); i++) {
                B += calendar.dayCountOfMonth(i, 0);
            }
            B += date.getDate();
            var fixValue1 = 0; //常值为0，，切在3月1日以后(31+29+1)，则为1，其他仍然为0
            var fixValue2 = 13; //1900-1999年修正值为13，2000-2099的修正值也为13
            if (calendar.isLeapYear(date.getFullYear())) {
                if (date.getMonth() + 1 > 3 || (date.getMonth() + 1 == 3 && date.getDate() >= 1)) {
                    fixValue1 = 1;
                }
            }
            var C = Math.floor((date.getFullYear() - 1) / 4 - fixValue2 + fixValue1);
            var A = B + C;
            var index_28Stars = (A + 23) % 28;
            var star28Arr = ['轸水蚓宿星', '角木蛟宿星', '亢金龙宿星', '氐土貉宿星', '房日兔宿星', '心月狐宿星', '尾火虎宿星', '箕水豹宿星', '斗木獬宿星', '牛金牛宿星', '女土蝠宿星', '虚日鼠宿星', '危月燕宿星', '室火猪宿星', '璧水貐宿星', '奎木狼宿星', '娄金狗宿星', '胃土雉宿星',
                '昴日鸡宿星', '毕月乌宿星', '觜火猴宿星', '参水猿宿星', '井木犴宿星', '鬼金羊宿星', '柳土獐宿星', '星日马宿星', '张月鹿宿星', '翼火蛇宿星'
            ];
            return star28Arr[index_28Stars];
        },
        //JS判断闰年代码
        isLeapYear: function(Year) {
            if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
                return true;
            } else {
                return false;
            }
        },
        dayCountOfMonth: function(month, isLeap) {
            switch (month + 1) {
                case 1:
                    return 31;
                case 2:
                    if (!isLeap) {
                        return 28;
                    }
                    return 29;
                case 3:
                    return 31;
                case 4:
                    return 30;
                case 5:
                    return 31;
                case 6:
                    return 30;
                case 7:
                    return 31;
                case 8:
                    return 31;
                case 9:
                    return 30;
                case 10:
                    return 31;
                case 11:
                    return 30;
                case 12:
                    return 31;
                default:
                    break;
            }
            return 0;
        },
        taiShenOfMonthDiZhi: function(monthDizhi, tgdzDay, fetusData) {
            var code = calendar.codeForMonthDizhi(monthDizhi);
            var result = calendar.taiShenWithCode(code, tgdzDay, fetusData);
            return result;
        },
        codeForMonthDizhi: function(monthDizhi) {
            var zhiCode = {
                '子': 11,
                '丑': 12,
                '寅': 1,
                '卯': 2,
                '辰': 3,
                '巳': 4,
                '午': 5,
                '未': 6,
                '申': 7,
                '酉': 8,
                '戌': 9,
                '亥': 10
            };
            return zhiCode[monthDizhi];
        },
        taiShenWithCode: function(code, tgdzDay, fetusData) {
            var codeString = code + '-' + tgdzDay;
            var taishen = fetusData[codeString];
            return taishen ? taishen : '暂无';
        },
        getStemsBranchMonthAsString: function(year, dayInYear) {
            return calendar.formatBranchMonthString(calendar.getStemsBranchMonth(year, dayInYear));
        },
        formatBranchMonthString: function(index) {
            if (index < 0) {
                return '';
            }
            return calendar.Zhi[index % 12];
        },
        /**
         * 冲煞
         *
         * @param solar
         * @param lunar
         * @return
         */
        cxInfoOfDateTime: function(solar, lunar) {
            var branchIndex = calendar.branchIndexOfSolar(solar, lunar);
            var cindex = calendar.chongIndexOfDateTime(branchIndex);
            var sindex = calendar.shaDirectionOfDateTime(branchIndex);
            try {
                return '冲' + calendar.ANIMAL[cindex] + '煞' + calendar.CompassNames[sindex].replace('正', '');
            } catch (e) {
                return '';
            }
        },
        /**
         * branchIndex
         *
         * @param solar
         * @param hour  -2:ignoreTime -1:currenttime
         * @return
         */
        branchIndexOfSolar: function(solar, hour) {
            var branchIndex = -1;
            if (hour == -2) {
                return calendar.getBranchDay(solar);
            } else {
                branchIndex = calendar.getStemBranchHour(solar, hour) % 12;
            }
            return branchIndex;
        },
        getBranchDay: function(solar) {
            var dayOffset = calendar.getIntervalDays(calendar.BASE_STEMS_DATE, solar);
            if (dayOffset > 0) {
                return Math.floor((dayOffset + 3) % 12);
            }
            return 0;
        },
        /*
         子午相冲，丑未相冲，寅申相冲，辰戌相冲，巳亥相冲，卯酉相冲
         */
        chongIndexOfDateTime: function(branchIndex) {
            var value = -1;
            switch (branchIndex) {
                case 0:
                    value = 6;
                    break;
                case 1:
                    value = 7;
                    break;
                case 2:
                    value = 8;
                    break;
                case 3:
                    value = 9;
                    break;
                case 4:
                    value = 10;
                    break;
                case 5:
                    value = 11;
                    break;
                case 6:
                    value = 0;
                    break;
                case 7:
                    value = 1;
                    break;
                case 8:
                    value = 2;
                    break;
                case 9:
                    value = 3;
                    break;
                case 10:
                    value = 4;
                    break;
                case 11:
                    value = 5;
                    break;
                default:
                    break;
            }
            return value;
        },
        /*
         逢巳日、酉日、丑日必是“煞东”；亥日、卯日、未日必“煞西”；申日、子日、辰日必“煞南”；寅日、午日、戌日必“煞北”
         */
        shaDirectionOfDateTime: function(branchIndex) {
            var value = calendar.CompassUnknown;
            switch (branchIndex) {
                case 0: //子
                case 4: //辰
                case 8: //申
                    value = calendar.CompassSouth;
                    break;
                case 1: //丑
                case 5: //巳
                case 9: //酉
                    value = calendar.CompassEast;
                    break;
                case 2: //寅
                case 6: //午
                case 10: //戌
                    value = calendar.CompassNorth;
                    break;
                case 3: //卯
                case 7: //未
                case 11: //亥
                    value = calendar.CompassWest;
                    break;
                default:
                    break;
            }
            return value;
        },
        /*
         * 获取干支计时
         *
         * @param _date
         * @param lunarHour
         * @return
         */
        getStemsBranchHourAsString: function(date, hour) {
            var lunarHour = calendar.getLunarHourIndex(hour);
            return calendar.formatStemsBranchString(calendar.getStemBranchHour(date, lunarHour));
        },
        //小时获取时辰
        getLunarHourIndex: function(hour) {
            return (Math.floor(hour / 2) + hour % 2) % 12;
        },
        getStemBranchHour: function(_date, lunarHour) {
            var dayOffset = calendar.getIntervalDays(calendar.BASE_STEMS_DATE, _date);
            var dt = parseInt((dayOffset + 9) % 10);
            var hb = lunarHour;
            var ht = (hb + ((dt > 4) ? (dt - 5) : dt) * 2) % 10;
            var termHour = ((6 * ht - 5 * hb) + 60) % 60;
            return termHour;
        },
        formatStemsBranchString: function(index) {
            if (index < 0) {
                return '';
            }
            return calendar.Gan[index % 10] + calendar.Zhi[index % 12];
        },
        getIntervalDays: function(base_date, _date) {
            _date.setHours(0);
            _date.setMinutes(0);
            _date.setSeconds(0);
            _date.setMilliseconds(0);
            return Math.floor((_date - base_date) / (1000 * 60 * 60 * 24));
        },
        /**
         * 得到宜忌查询需要的参数
         * <p/>
         * param dateObj
         * return
         */
        getYJSqlFields: function(dateObj) {
            var field = ['-1', '-1'];
            var arr = calendar.twentyFourTermdaysOf(dateObj);
            if (arr.length == 2) {
                var a = arr[0];
                var b = arr[1];
                var offsetDayCount = Math.floor(a % 2 == 0 ? a / 2 : a / 2 + 1);
                if (b > 0 && a % 2 == 0) {
                    offsetDayCount += 1;
                }
                // 计算当前日期距离1901-1-1多少天
                var baseDate = new Date(1901, 0, 1); //JCalendar.createFromString('1901-01-01');
                var day = Math.abs(calendar.getIntervalDays(baseDate, dateObj));
                field[0] = (15 + day) % 60 + '';
                field[1] = Math.floor(Math.abs((5 + day - offsetDayCount) % 12)) + '';
            }
            return field;
        },
        twentyFourTermdaysOf: function(dateObj) {
            try {
                var year = dateObj.getFullYear();
                var yearOffset = year - 1900;
                var offset = calendar.dayOfYear(dateObj) - 1;
                var index = 0;
                var st = 0; // 改日是否为24节气
                for (var i = 0; i < 24; i++) {
                    var num = TermTable[yearOffset * 24 + i];
                    if (num > offset) {
                        index = i;
                        st = 0;
                        break;
                    } else if (num == offset) {
                        index = i;
                        st = 1;
                        break;
                    }
                }
                var a = index + yearOffset * 24 - 24; // 莫日之前的节气数目
                var b = st;
                return [a, b];
            } catch (e) {
                return null;
            }
        },
        /**
         * 根据日期对象获得是当前年份的第几天
         * 
         * @param {any} 日期对象
         * @returns
         */
        dayOfYear: function(date) {
            var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            var day = date.getDate();
            var month = date.getMonth(); //getMonth()是从0开始
            var year = date.getFullYear();
            var result = 0;
            for (var i = 0; i < month; i++) {
                result += dateArr[i];
            }
            result += day;
            //判断是否闰年
            if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                result += 1;
            }
            return result;
        },
        /**
         * 计算当前时辰吉凶
         *
         * @param solar
         * @return
         */
        jixiongStatusOfDateTime: function(solar, hourNow) {
            var status = calendar.JXStatusUnknown;
            var stemIndex = calendar.getStemsBranchDay(solar); //[self.lunarMgr stemBranchDayOfSolarDate:solar];
            if (stemIndex > -1 && stemIndex < 60) {
                var hexValue = calendar.JXTable[stemIndex];
                var chineseHour = calendar.getLunarHourIndex(hourNow); //[datetime ylChineseNumHour];
                var moveCount = (11 - chineseHour);
                var value = (hexValue >> moveCount) & 0x1;
                status = value > 0 ? calendar.JXStatusJi : calendar.JXStatusXiong;
            }
            return calendar.getJXName(status);
        },
        getStemsBranchDay: function(date) {
            var dayOffset = calendar.getIntervalDays(calendar.BASE_STEMS_DATE, date);
            if (dayOffset > 0) {
                var t = parseInt((dayOffset + 9) % 10);
                var b = parseInt((dayOffset + 3) % 12);
                return ((6 * t - 5 * b) + 60) % 60;
            }
            return -1;
        },
        /**
         * 吉凶名称
         *
         * @param value
         * @return
         */
        getJXName: function(value) {
            if (value < 0 || value > calendar.JXNames.length) {
                return '';
            }
            return calendar.JXNames[value];
        },
        zhiShenOfMonth: function(monthDz, dayDz) {
            var beginIndex = monthDz;
            var qinglongBeginIndex = 0;
            if (beginIndex == 0 || beginIndex == 6) {
                qinglongBeginIndex = 8;
            } else if (beginIndex == 1 || beginIndex == 7) {
                qinglongBeginIndex = 10;
            } else if (beginIndex == 2 || beginIndex == 8) {
                qinglongBeginIndex = 0;
            } else if (beginIndex == 3 || beginIndex == 9) {
                qinglongBeginIndex = 2;
            } else if (beginIndex == 4 || beginIndex == 10) {
                qinglongBeginIndex = 4;
            } else if (beginIndex == 5 || beginIndex == 11) {
                qinglongBeginIndex = 6;
            }

            var ishen_12 = (dayDz - qinglongBeginIndex);
            if (ishen_12 < 0) {
                ishen_12 += 12;
            }
            var shiershenArr = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
            var shen_12 = shiershenArr[ishen_12];
            return shen_12;
        },
        getStemsBranchMonth: function(year, dayInYear) {
            var term = calendar.findPreTerm(year, dayInYear);
            var monthOffset = Math.floor((year - calendar.BASE_STEMS_YEAR) * 12 + (term + 2) / 2 - 2);
            var t = (monthOffset + 2) % 10;
            var b = (monthOffset + 2) % 12;
            return ((6 * t - 5 * b) + 60) % 60;
        },
        MIN: 1900, //最小年
        MAX: 2135, //最大年
        findPreTerm: function(year, dayInYear) {
            var index = year - calendar.MIN;
            if (index > 0 && index < TermTable.length / 24) {
                var begin = index * 24;
                return calendar.findPreTerm1(TermTable, dayInYear, begin);
            }
            return -1;
        },
        findPreTerm1: function(termTable, dayInYear, begin) {
            var value = new Array(24);
            for (var j = begin; j <= begin + 23; j++) {
                value[j - begin] = termTable[j];
            }
            var index = -1,
                i = 0;
            for (i = 0; i < value.length; i++) {
                if (dayInYear === value[i]) {
                    index = i;
                    break;
                } else if (dayInYear < value[i]) {
                    index = i - 1;
                    break;
                }
            }
            if (i === value.length && index === -1) {
                index = i - 1;
            }
            return index;
        },
        /**
         * 获取伏天信息
         */
        getDogDayInfo: function(dateObj) {
            var dogDays = calendar.getDogDaysBeginDates(dateObj.getFullYear());
            if (dogDays == null || dogDays.length < 3) {
                return '';
            }
            var DOG_FIRST_FORMATE = '初伏第';
            var DOG_SECOND_FORMATE = '中伏第';
            var DOG_THIRD_FORMATE = '末伏第';
            var interval1 = calendar.getIntervalDays(dogDays[0], dateObj);
            var interval2 = calendar.getIntervalDays(dogDays[1], dateObj);
            var interval3 = calendar.getIntervalDays(dogDays[2], dateObj);
            if (interval1 >= 0 && interval2 < 0) {
                return DOG_FIRST_FORMATE + (interval1 + 1) + '天';
            } else if (interval2 >= 0 && interval3 < 0) {
                return DOG_SECOND_FORMATE + (interval2 + 1) + '天';
            } else if (interval3 >= 0 && interval3 < 10) {
                return DOG_THIRD_FORMATE + (interval3 + 1) + '天';
            }
            return '';
        },
        /**
         * 获取三伏开始时间
         */
        getDogDaysBeginDates: function(year) {
            var offsetTerm = calendar.getOffsetByTerm(year, StemsBranch.TERMS_XZ);
            if (offsetTerm < 0) {
                return null;
            }
            var begindates = new Array(3);
            var termDate = calendar.getDateObjByOffset(year, offsetTerm);
            var baseDay = calendar.getStemsDay(termDate);
            begindates[0] = calendar.getNextDay(termDate, 20 + (baseDay > 6 ? 16 - baseDay : 6 - baseDay));
            begindates[1] = calendar.getNextDay(begindates[0], 10);
            offsetTerm = calendar.getOffsetByTerm(year, StemsBranch.TERMS_LQ);
            if (offsetTerm < 0) {
                return null;
            }
            termDate = calendar.getDateObjByOffset(year, offsetTerm);
            baseDay = calendar.getStemsDay(termDate);
            begindates[2] = calendar.getNextDay(termDate, (baseDay > 6) ? (16 - baseDay) : (6 - baseDay));
            return begindates;
        },
        /**
         * 第n个节气的偏移日期 n从0开始
         */
        getOffsetByTerm: function(year, n) {
            if (n < 0) {
                return -1;
            }
            return TermTable[(year - 1900) * 24 + n];
        },
        /**
         * 干日
         *
         * @param date
         * @return
         */
        getStemsDay: function(date) {
            var dayOffset = calendar.getIntervalDays(calendar.BASE_STEMS_DATE, date);
            if (dayOffset > 0) {
                return Math.floor((dayOffset + 9) % 10);
            }
            return 0;
        },
        //根据年份和偏移日期获得data对象
        getDateObjByOffset: function(year, offset) {
            var dateObj = new Date(year, 0, 1, 0, 0, 0, 0);
            dateObj.setDate(dateObj.getDate() + offset);
            return dateObj;
        },
        //为指定日期添加天数
        getNextDay: function(dateObj, day) {
            var resultObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
            resultObj.setDate(resultObj.getDate() + day);
            return resultObj;
        },
        MIN_YEAR: 1900, //最小年
        MAX_YEAR: 2135, //最大年
        CHINESE_NUM: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        /**
         * 获取当前时间九九的信息
         *
         * @return
         * @see [类',类#方法',类#成员]
         */
        getColdInfo: function(dateObj) {
            var COLD_FORMATE = '九第';
            var daysInterval = calendar.getIntervalDays(calendar.getColdBeginDate(dateObj), dateObj);
            if (daysInterval >= 0) {
                var section = Math.floor((daysInterval / 9));
                var row = Math.floor(daysInterval % 9 + 1);
                if (section >= 0 && section < 9) {
                    return calendar.CHINESE_NUM[section + 1] + COLD_FORMATE + row + '天';
                }
            }
            return '';
        },
        /**
         * 获取九九的开始时间
         *
         * @return
         * @see [类',类#方法',类#成员]
         */
        getColdBeginDate: function(dateObj) {
            var year = dateObj.getFullYear();
            if (year >= calendar.MIN_YEAR && year <= calendar.MAX_YEAR) {
                var days = calendar.dayOfYear(dateObj);
                var offset = 0;
                if (days < 100) {
                    offset = calendar.getOffsetByTerm(year - 1, StemsBranch.STEMS_DZ); // 23表示九九开始
                    return calendar.getDateObjByOffset(year - 1, offset);
                } else {
                    offset = calendar.getOffsetByTerm(year, StemsBranch.STEMS_DZ);
                    return calendar.getDateObjByOffset(year, offset);
                }
            }
            return null;
        }
};
var StemsBranch = {
        'TERMS_XZ': 11,
        'TERMS_LQ': 14,
        'STEMS_DZ': 23
};



var TermTable = [
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1900
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1901
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1902
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1903
    6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 327, 341, 356, //1904
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1905
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1906
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1907
    6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 327, 341, 356, //1908
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1909
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1910
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1911
    6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 326, 341, 356, //1912
    5, 19, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1913
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1914
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1915
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356, //1916
    5, 19, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1917
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1918
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1919
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356, //1920
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1921
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1922
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1923
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356, //1924
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1925
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1926
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1927
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1928
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1929
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1930
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1931
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1932
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1933
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1934
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1935
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1936
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1937
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1938
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1939
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1940
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1941
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1942
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1943
    5, 20, 35, 50, 65, 80, 95, 110, 125, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1944
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1945
    5, 19, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1946
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1947
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1948
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1949
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1950
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1951
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1952
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1953
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1954
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1955
    5, 20, 35, 50, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1956
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1957
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1958
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1959
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1960
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1961
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1962
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1963
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1964
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1965
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1966
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1967
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1968
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1969
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1970
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1971
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1972
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1973
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1974
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1975
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1976
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1977
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //1978
    5, 19, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1979
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1980
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1981
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1982
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1983
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1984
    4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1985
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1986
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1987
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1988
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //1989
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1990
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1991
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1992
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //1993
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1994
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1995
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1996
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //1997
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1998
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1999
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2000
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2001
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2002
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2003
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2004
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2005
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2006
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2007
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2008
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2009
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2010
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2011
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2012
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2013
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2014
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2015
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2016
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2017
    4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2018
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2019
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2020
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2021
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2022
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2023
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2024
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2025
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2026
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2027
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2028
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2029
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2030
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2031
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2032
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2033
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2034
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2035
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2036
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2037
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2038
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2039
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2040
    4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2041
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2042
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2043
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2044
    4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2045
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2046
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2047
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2048
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2049
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2050
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2051
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2052
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2053
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2054
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2055
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2056
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2057
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2058
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2059
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2060
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2061
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2062
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2063
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2064
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2065
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2066
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2067
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2068
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2069
    4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2070
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2071
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2072
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 279, 295, 310, 325, 339, 354, //2073
    4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2074
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2075
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2076
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 279, 295, 310, 325, 339, 354, //2077
    4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2078
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2079
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2080
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354, //2081
    4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2082
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2083
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2084
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354, //2085
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2086
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2087
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2088
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354, //2089
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2090
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2091
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2092
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 294, 309, 324, 339, 354, //2093
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2094
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2095
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2096
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 217, 233, 249, 264, 279, 294, 309, 324, 339, 354, //2097
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2098
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2099
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2100
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2101
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2102
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2103
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2104
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2105
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2106
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 187, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2107
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2108
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2109
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2110
    5, 20, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2111
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2112
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2113
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2114
    5, 20, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2115
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2116
    4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2117
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2118
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2119
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2120
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2121
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 311, 325, 340, 355, //2122
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2123
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2124
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2125
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2126
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2127
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2128
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2129
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2130
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2131
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2132
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2133
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2134
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355 //2135
];
/**
 * 节气时间表
 */
var termTimeTable = [
    0, 0, 49891, 36074, 30112, 34741, 49961, 77226, 28512, 76615, 45535, 20385, 83408, 59767, 31834, 83989, 40598, 73211, 7989, 17716, 16784, 6470, 75350, 52894, //1900
    28403, 4588, 70792, 56694, 51053, 55415, 71061, 11606, 49824, 11079, 66987, 41266, 18454, 80625, 53166, 18449, 61815, 7736, 29188, 38774, 38069, 27673, 10357, 74195,
    49893, 25916, 5890, 77982, 72452, 76593, 5846, 32648, 70728, 32011, 1187, 62108, 38779, 14992, 73336, 39183, 81985, 28520, 49510, 59738, 58666, 48923, 31261, 9331,
    71023, 47612, 27077, 13248, 7132, 11686, 26753, 53919, 5122, 53101, 22027, 83095, 59796, 35925, 8150, 60095, 16941, 49421, 70904, 80583, 80003, 69684, 52519, 30025,
    5822, 68271, 48247, 33891, 28299, 32314, 47931, 74528, 26314, 73735, 43258, 17481, 81101, 56975, 29511, 81384, 38278, 70812, 5734, 15542, 14698, 4553, 73520, 51236,
    26826, 3116, 69349, 55258, 49536, 53851, 69268, 9825, 47644, 9076, 64413, 39082, 15599, 78337, 50217, 16116, 58906, 5396, 26376, 36475, 35386, 25493, 7847, 72221,
    47607, 24194, 3834, 76467, 70566, 75167, 4036, 31150, 68909, 30295, 85734, 60108, 36916, 12752, 71494, 36812, 80172, 26099, 47693, 57283, 56814, 46431, 29365, 6796,
    69085, 45047, 25129, 10698, 5225, 9179, 24887, 51433, 3215, 50594, 19976, 80579, 57550, 33476, 5758, 57803, 14522, 47332, 68562, 78690, 77777, 67923, 50366, 28292,
    3667, 66484, 46033, 32034, 26014, 30434, 45586, 72675, 23900, 71886, 40743, 15541, 78480, 54845, 26802, 79019, 35536, 68295, 3051, 13007, 12121, 2077, 71017, 48804,
    24313, 655, 66751, 52699, 46847, 51176, 66565, 7064, 45050, 6292, 62036, 36331, 13437, 75626, 48148, 13410, 56795, 2669, 24188, 33750, 33183, 22815, 5689, 69587,
    45477, 21536, 1642, 73687, 68190, 72172, 1375, 27942, 65960, 27008, 82580, 56921, 33662, 9776, 68228, 34040, 76930, 23444, 44465, 54668, 53603, 43850, 26213, 4303, //1910
    66052, 42683, 22216, 8416, 2330, 6860, 21872, 48955, 18, 47913, 16672, 77730, 54295, 30516, 2665, 54777, 11596, 44250, 65696, 75491, 74820, 64553, 47254, 24789,
    449, 62946, 42811, 28534, 22859, 26959, 42495, 69141, 20823, 68226, 37649, 11811, 75402, 51220, 23830, 75679, 32739, 65279, 402, 10200, 9518, 85688, 68333, 45879,
    21474, 83944, 63758, 49452, 43738, 47875, 63351, 3771, 41679, 2991, 58404, 32966, 9532, 72221, 44147, 10089, 52944, 85961, 20620, 30889, 29862, 20112, 2461, 66891,
    42171, 18709, 84556, 70674, 64548, 69042, 84110, 24792, 62403, 23858, 79196, 53700, 30432, 6412, 65111, 30574, 73946, 20027, 41687, 51436, 51061, 40821, 23825, 1342,
    63616, 39570, 19526, 4983, 85696, 3074, 18555, 44926, 82964, 43823, 13207, 73760, 50865, 26781, 85661, 51298, 8225, 41025, 62452, 72579, 71858, 62006, 44633, 22544,
    84467, 60813, 40438, 26279, 20241, 24410, 39469, 66275, 17385, 65150, 33939, 8661, 71613, 48068, 20095, 72511, 29099, 62083, 83271, 7031, 6135, 82664, 65169, 43109,
    18567, 81438, 61052, 47084, 41088, 45431, 60594, 1042, 38742, 86311, 55390, 29656, 6613, 68865, 41407, 6818, 50361, 82806, 18128, 27817, 27414, 17092, 59, 63937,
    39863, 15872, 82385, 67961, 62455, 66337, 81912, 21923, 59891, 20727, 76257, 50374, 27127, 3083, 61644, 27427, 70526, 17137, 38417, 48767, 47932, 38282, 20789, 85287,
    60688, 37240, 16763, 2845, 83129, 1145, 16124, 43115, 80520, 41944, 10596, 71610, 48030, 24266, 82681, 48496, 5257, 38118, 59600, 69674, 69090, 59107, 41867, 19621,
    81647, 57860, 37586, 23337, 17462, 21555, 36894, 63547, 15077, 62503, 31822, 5985, 69516, 45293, 17894, 69675, 26792, 59285, 80948, 4359, 3894, 80123, 63016, 40616, //1920
    16420, 78879, 58812, 44396, 38709, 42658, 58121, 84734, 36257, 83800, 52885, 27335, 3994, 66615, 38605, 4507, 47379, 80382, 15036, 25335, 24330, 14667, 83485, 61643,
    37015, 13674, 79584, 65769, 59629, 64113, 79080, 19712, 57170, 18613, 73815, 48399, 25045, 1178, 59828, 25449, 68779, 14972, 36565, 46372, 45912, 35709, 18638, 82612,
    58440, 34485, 14417, 86380, 80666, 84522, 13547, 39933, 77894, 38713, 8058, 68562, 45731, 21629, 80669, 46305, 3429, 36210, 57802, 67849, 67220, 57216, 39873, 17593,
    79533, 55701, 35372, 21076, 15132, 19205, 34387, 61113, 12339, 60025, 28891, 3558, 66564, 43047, 15134, 67673, 24330, 57493, 78729, 2662, 1751, 78382, 60779, 38724,
    13994, 76808, 56205, 42179, 35990, 40326, 55347, 82265, 33471, 81173, 50182, 24594, 1494, 63887, 36425, 1985, 45601, 78199, 13642, 23462, 23173, 12924, 82337, 59795,
    35657, 11545, 77896, 63283, 57581, 61268, 76697, 16563, 54500, 15266, 70897, 44998, 21936, 84284, 56652, 22434, 65751, 12392, 33891, 44294, 43662, 34053, 16719, 81198,
    56677, 33108, 12602, 84853, 78616, 82742, 11166, 37898, 75184, 36467, 5085, 66127, 42595, 19001, 77483, 43523, 325, 33412, 54905, 65197, 64614, 54835, 37578, 15506,
    77471, 53796, 33382, 19152, 13034, 17051, 32071, 58600, 9809, 57139, 26229, 383, 63855, 39733, 12450, 64385, 21705, 54326, 76191, 86068, 85770, 75612, 58636, 36216,
    12121, 74530, 54523, 40008, 34317, 38085, 53473, 79815, 31220, 78453, 47447, 21633, 84698, 60794, 32921, 85272, 41974, 75135, 10022, 20484, 19647, 10083, 78984, 57161,
    32552, 9176, 75067, 61185, 54993, 59382, 74242, 14745, 52019, 13319, 68282, 42765, 19180, 81713, 53818, 19577, 62902, 9352, 31048, 41157, 40812, 30865, 13837, 77969, //1930
    53735, 29847, 9638, 81614, 75726, 79574, 8426, 34785, 72575, 33321, 2505, 62880, 39934, 15680, 74692, 40213, 83835, 30195, 52011, 62126, 61791, 51878, 34815, 12571,
    74703, 50805, 30560, 16099, 10159, 14012, 29179, 55681, 6908, 54393, 23263, 84154, 60735, 37079, 9108, 61570, 18172, 51349, 72578, 83030, 82180, 72605, 55102, 33252,
    8600, 71559, 50956, 36975, 30684, 34983, 49829, 76694, 27705, 75405, 44239, 18705, 81857, 57922, 30330, 82339, 39446, 72066, 7433, 17283, 16978, 6804, 76265, 53846,
    29787, 5811, 72217, 57697, 51980, 55673, 71019, 10807, 48644, 9291, 64881, 38871, 15865, 78127, 50618, 16320, 59768, 6308, 27899, 38175, 37601, 27860, 10591, 74962,
    50539, 26897, 6521, 78716, 72610, 76663, 5181, 31804, 69122, 30287, 85295, 59871, 36332, 12774, 71268, 37436, 80644, 27487, 48940, 59349, 58651, 48922, 31490, 9423,
    71197, 47533, 26956, 12780, 6546, 10668, 25604, 52264, 3390, 50844, 19840, 80494, 57498, 33470, 6190, 58228, 15635, 48354, 70345, 80282, 80078, 69900, 52933, 30397,
    6224, 68457, 48333, 33641, 27864, 31501, 46882, 73148, 24635, 71827, 40968, 15116, 78355, 54413, 26720, 79069, 35963, 69174, 4254, 14790, 14115, 4587, 73576, 51696,
    27068, 3522, 69298, 55173, 48826, 52982, 67719, 8081, 45309, 6608, 61597, 36212, 12681, 75422, 47561, 13546, 56888, 3567, 25284, 35624, 35299, 25562, 8518, 72801,
    48471, 24640, 4226, 76155, 69971, 73706, 2244, 28505, 66062, 26798, 82298, 56362, 33500, 9396, 68607, 34268, 78121, 24565, 46596, 56749, 56610, 46708, 29820, 7555,
    69820, 45843, 25652, 11022, 5038, 8621, 23674, 49852, 976, 48180, 17042, 77782, 54481, 30843, 3089, 55710, 12554, 45932, 67343, 77958, 77206, 67735, 50271, 28481, //1940
    3834, 66817, 46184, 32181, 25804, 30019, 44695, 71424, 22190, 69767, 38352, 12795, 75784, 51968, 24352, 76611, 33828, 66762, 2292, 12429, 12243, 2267, 71758, 49446,
    25338, 1408, 67714, 53206, 47360, 51034, 66230, 5945, 43610, 4118, 59551, 33373, 10306, 72443, 45018, 10690, 54367, 984, 22902, 33308, 33067, 23421, 6407, 70771,
    46490, 22732, 2404, 74413, 68310, 72154, 670, 27089, 64401, 25369, 80337, 54737, 31130, 7470, 65910, 32099, 75308, 22301, 43829, 54495, 53923, 44486, 27170, 5344,
    67155, 43624, 22975, 8825, 2426, 6512, 21238, 47865, 85183, 46246, 15053, 75734, 52562, 28549, 1131, 53186, 10532, 43295, 65323, 75356, 75279, 65250, 48458, 26085,
    2066, 64416, 44362, 29691, 23879, 27430, 42706, 68811, 20195, 67212, 36324, 10320, 73606, 49523, 21903, 74116, 31087, 64184, 85747, 9814, 9251, 86111, 68859, 47012,
    22579, 85475, 65033, 50910, 44678, 48757, 63512, 3728, 40889, 2033, 56922, 31457, 7848, 70620, 42695, 8779, 52045, 85234, 20447, 30879, 30429, 20775, 3611, 67997,
    43580, 19890, 85821, 71513, 65276, 69158, 84008, 23962, 61377, 22140, 77472, 51527, 28548, 4449, 63651, 29336, 73263, 19715, 41837, 51950, 51862, 41856, 24971, 2563,
    64813, 40702, 20520, 5798, 86273, 3403, 18560, 44690, 82333, 43055, 12019, 72632, 49408, 25649, 84377, 50550, 7499, 40899, 62416, 73077, 72392, 62927, 45457, 23593,
    85268, 61712, 40969, 26823, 20356, 24481, 39116, 65835, 16594, 64238, 32809, 7363, 70295, 46599, 18896, 71291, 28449, 61548, 83462, 7377, 7186, 83762, 66804, 44571,
    20323, 82775, 62446, 47849, 41726, 45306, 60267, 86346, 37481, 84427, 53460, 27360, 4397, 66593, 39311, 4989, 48819, 81812, 17499, 27883, 27823, 18149, 1300, 65598, //1950
    41422, 17522, 83606, 68978, 62800, 66341, 81158, 20883, 58155, 18922, 73952, 48288, 24831, 1237, 59846, 26165, 69490, 16610, 38183, 48960, 48396, 39063, 21738, 1,
    61785, 38302, 17574, 3400, 83238, 822, 15302, 41797, 78841, 39829, 8418, 69150, 45878, 22045, 81057, 46967, 4422, 37419, 59545, 69730, 69694, 59736, 42933, 20586,
    82922, 58878, 38753, 24065, 18146, 21630, 36756, 62721, 13938, 60767, 29764, 3593, 66894, 42726, 15275, 67509, 24763, 57952, 79825, 3974, 3657, 80523, 63419, 41485,
    17117, 79861, 59441, 45138, 38912, 42803, 57550, 83972, 34690, 82042, 50449, 24840, 1150, 63894, 35944, 2152, 45471, 78913, 14238, 24979, 24634, 15250, 84509, 62659,
    38152, 14510, 80256, 65925, 59457, 63304, 77924, 17870, 55078, 15859, 71005, 45079, 21952, 84270, 57002, 22733, 66706, 13250, 35528, 45781, 45909, 36051, 19366, 83452,
    59417, 35296, 15115, 277, 80667, 84015, 12669, 38605, 76198, 36752, 5747, 66221, 43079, 19192, 78012, 44086, 1136, 34502, 56153, 66859, 66354, 56990, 39726, 17967,
    79825, 56315, 35677, 21478, 15007, 18987, 33529, 60072, 10702, 58223, 26683, 1228, 64089, 40488, 12723, 65251, 22331, 55562, 77398, 1450, 1201, 77940, 60956, 38914,
    14660, 77307, 56951, 42506, 36292, 39947, 54741, 80818, 31750, 78660, 47531, 21411, 84805, 60626, 33430, 85553, 43129, 76129, 11948, 22278, 22313, 12546, 82175, 59980,
    35898, 11930, 78130, 63453, 57395, 60869, 75782, 15387, 52722, 13325, 68403, 42584, 19192, 81925, 54244, 20609, 64074, 11304, 32988, 43858, 43323, 34013, 16636, 81258,
    56547, 33002, 12189, 84377, 77766, 81758, 9813, 36351, 73353, 34408, 2914, 63735, 40359, 16645, 75584, 41662, 85522, 32330, 54519, 64909, 64921, 55100, 38264, 15953, //1960
    78156, 54066, 33746, 18987, 12879, 16324, 31327, 57302, 8476, 55334, 24360, 84604, 61595, 37414, 10099, 62310, 19752, 52945, 75056, 85641, 85571, 76060, 59154, 37166,
    12896, 75473, 55040, 40474, 34169, 37771, 52454, 78640, 29368, 76590, 45075, 19445, 82265, 58676, 30820, 83547, 40520, 74111, 9473, 20399, 20094, 10910, 80199, 58514,
    33986, 10431, 76064, 61714, 55029, 58779, 73119, 12967, 49917, 10687, 65666, 39840, 16657, 79151, 51924, 17849, 61910, 8607, 30974, 41328, 41539, 31760, 15156, 79312,
    55340, 31263, 11095, 82637, 76559, 79790, 8300, 34028, 71461, 31785, 703, 61007, 37927, 13963, 72969, 39061, 82766, 29798, 51690, 62440, 62106, 52733, 35583, 13771,
    75717, 52131, 31566, 17268, 10838, 14684, 29203, 55563, 6092, 53413, 21726, 82540, 58882, 35289, 7476, 60160, 17270, 50757, 72667, 83395, 83192, 73748, 56732, 34823,
    10460, 73179, 52668, 38267, 31881, 35574, 50189, 76290, 27026, 73921, 42577, 16401, 79619, 55390, 28136, 80262, 37921, 70988, 7003, 17445, 17715, 8045, 77865, 55688,
    31699, 7650, 73849, 59018, 52913, 56206, 71081, 10507, 47846, 8272, 63378, 37369, 13999, 76549, 48891, 15144, 58662, 5881, 27671, 38624, 38243, 29066, 11848, 76577,
    51970, 28446, 7643, 79753, 73065, 76921, 4853, 31267, 68147, 29150, 83945, 58396, 34897, 11243, 70031, 36171, 79884, 26770, 48863, 59374, 59357, 49711, 32895, 10785,
    73008, 49090, 28732, 14068, 7834, 11284, 26091, 52011, 2987, 49782, 18689, 78901, 55891, 31688, 4446, 56600, 14125, 47213, 69400, 79862, 79880, 70264, 53478, 31421,
    7299, 69827, 49542, 34906, 28707, 32179, 46904, 72896, 23627, 70639, 39133, 13358, 76231, 52612, 24846, 77633, 34673, 68339, 3692, 14654, 14263, 5072, 74239, 52540, //1970
    27906, 4359, 69925, 55615, 48884, 52686, 66960, 6853, 43688, 4499, 59331, 33574, 10267, 72883, 45612, 11714, 55812, 2692, 25114, 35588, 35797, 26036, 9342, 73433,
    49310, 25139, 4813, 76283, 70084, 73285, 1730, 27449, 64870, 25169, 80519, 54370, 31373, 7350, 66509, 32581, 76506, 23565, 45705, 56487, 56363, 46961, 29922, 7973,
    69919, 46092, 25452, 10869, 4356, 7946, 22433, 48621, 85583, 46429, 14810, 75634, 52041, 28532, 768, 53607, 10764, 44466, 66435, 77409, 77258, 68040, 51023, 29261,
    4795, 67540, 46805, 32321, 25626, 29198, 43500, 69531, 20032, 66962, 35499, 9456, 72666, 48610, 21430, 73720, 31504, 64706, 879, 11436, 11878, 2307, 72277, 50156,
    26250, 2174, 68352, 53381, 47147, 50199, 64890, 4032, 41231, 1420, 56521, 30385, 7164, 69704, 42293, 8617, 52397, 86112, 21724, 32761, 32556, 23442, 6369, 71133,
    46642, 23106, 2368, 74395, 67686, 71376, 85587, 25376, 62064, 22864, 77473, 51851, 28250, 4706, 63501, 29895, 73692, 20891, 43083, 53881, 53914, 44488, 27656, 5706,
    67863, 44065, 23605, 9025, 2649, 6135, 20744, 46632, 83760, 44060, 12721, 72824, 49672, 25418, 84614, 50414, 8141, 41353, 63836, 74439, 74749, 65219, 48649, 26588,
    2592, 65039, 44817, 30057, 23891, 27214, 41960, 67772, 18512, 65306, 33785, 7773, 70617, 46814, 19060, 71806, 28944, 62724, 84654, 9429, 9241, 276, 69601, 48057,
    23493, 86396, 65538, 51193, 44378, 48115, 62277, 2121, 38830, 86030, 54311, 28569, 5077, 67712, 40253, 6403, 50385, 83782, 19802, 30470, 30767, 21246, 4668, 68985,
    44933, 20917, 568, 72098, 65789, 68980, 83682, 22961, 60268, 20522, 75824, 49620, 26636, 2519, 61710, 27638, 71607, 18520, 40754, 51450, 51493, 42083, 25275, 3364, //1980
    65558, 41758, 21323, 6698, 307, 3769, 18302, 44311, 81287, 41965, 10359, 71080, 47512, 23983, 82629, 49090, 6193, 39911, 61772, 72769, 72509, 63356, 46275, 24631,
    155, 63053, 42328, 27991, 21274, 24950, 39161, 65247, 15599, 62573, 30953, 4979, 68075, 44123, 16905, 69313, 27103, 60371, 82929, 7067, 7446, 84198, 67685, 45489,
    21522, 83816, 63582, 48634, 42432, 45524, 60263, 85809, 36651, 83186, 51942, 25721, 2593, 65047, 37777, 4049, 48003, 81697, 17464, 28457, 28332, 19100, 2020, 66595,
    42051, 18302, 83924, 69373, 62679, 66259, 80540, 20286, 57057, 17856, 72517, 46934, 23346, 86292, 58673, 25210, 68990, 16373, 38555, 49539, 49532, 40238, 23283, 1368,
    63305, 39453, 18707, 4041, 83781, 823, 15215, 41146, 78152, 38575, 7196, 67447, 44315, 20186, 79456, 45341, 3181, 36447, 59073, 69712, 70169, 60646, 44181, 22060,
    84482, 60372, 40062, 25051, 18728, 21761, 36367, 61928, 12636, 59275, 27863, 1797, 64845, 41063, 13536, 66347, 23677, 57532, 79605, 4451, 4369, 81860, 64856, 43327,
    18780, 81623, 60700, 46197, 39217, 42718, 56648, 82652, 32735, 79801, 47938, 22245, 85119, 61562, 34153, 590, 44647, 78316, 14380, 25252, 25540, 16163, 85932, 63952,
    39810, 15857, 81769, 66907, 60392, 63515, 77944, 17087, 54103, 14200, 69293, 42991, 19974, 82265, 55215, 21240, 65491, 12530, 35070, 45846, 46135, 36719, 20068, 84473,
    60355, 36419, 16029, 1230, 81248, 84495, 12594, 38336, 75235, 35612, 3913, 64380, 40765, 17128, 75832, 42373, 86033, 33577, 55639, 66908, 66812, 57877, 40857, 19320,
    81194, 57693, 36840, 22441, 15558, 19155, 33176, 59192, 9326, 56243, 24378, 84766, 61228, 37290, 9932, 62449, 20248, 53729, 76429, 836, 1410, 78415, 62050, 40019, //1990
    16087, 78425, 58104, 43100, 36735, 39716, 54282, 79703, 30413, 76814, 45497, 19127, 82379, 58268, 31035, 83571, 41241, 74886, 10867, 21910, 22070, 12945, 82560, 60818,
    36511, 12749, 78497, 63810, 57128, 60484, 74708, 14213, 50920, 11528, 66139, 40448, 16815, 79729, 52044, 18606, 62300, 9766, 31889, 43027, 43022, 33951, 17052, 81793,
    57391, 33769, 13029, 84910, 78152, 81639, 9431, 35341, 72103, 32503, 913, 61184, 37922, 13849, 73078, 39018, 83267, 30150, 52802, 63428, 63933, 54411, 38029, 15948,
    78487, 54444, 34256, 19298, 13062, 16081, 30708, 56160, 6845, 53308, 21892, 82052, 58762, 34860, 7462, 60225, 17707, 51553, 73745, 84961, 84936, 75958, 58973, 37363,
    12845, 75627, 54771, 40244, 33364, 36867, 50886, 76889, 27003, 74051, 42148, 16462, 79260, 55780, 28304, 81290, 38914, 72780, 8832, 19891, 20135, 10883, 80535, 58607,
    34287, 10350, 76074, 61243, 54579, 57784, 72121, 11393, 48362, 8586, 63647, 37424, 14400, 76722, 49729, 15770, 60145, 7206, 29922, 40722, 41193, 31764, 15240, 79553,
    55468, 31351, 10917, 82289, 75847, 78880, 6976, 32569, 69566, 29873, 84751, 58796, 35363, 11726, 70578, 37151, 80929, 28547, 50710, 62085, 62078, 53253, 36292, 14822,
    76689, 53164, 32212, 17693, 10635, 14072, 27897, 53803, 3790, 50726, 18802, 79354, 55825, 32122, 4790, 57536, 15355, 49031, 71745, 82715, 83303, 74052, 57695, 35787,
    11829, 74241, 53823, 38810, 32262, 35150, 49477, 74760, 25260, 71545, 40147, 13747, 77099, 53046, 26046, 78665, 36599, 70291, 6501, 17534, 17871, 8690, 78447, 56628,
    32442, 8583, 74424, 59598, 52960, 56115, 70318, 9570, 46210, 6564, 61114, 35263, 11636, 74561, 46979, 13711, 57550, 5255, 27493, 38848, 38884, 29960, 13022, 77846, //2000
    53356, 29778, 8929, 80836, 73948, 77444, 5062, 30953, 67490, 27852, 82415, 56263, 32802, 8774, 67941, 34028, 78371, 25468, 48301, 59136, 59812, 50428, 34133, 12090,
    74610, 50521, 30245, 15198, 8853, 11767, 26297, 51628, 2238, 48546, 17086, 77064, 53771, 29691, 2358, 55018, 12662, 46523, 68958, 80269, 80509, 71624, 54854, 33262,
    8863, 71555, 50720, 36013, 29092, 32386, 46349, 72168, 22229, 69145, 37183, 11428, 74139, 50648, 23058, 76090, 33614, 67609, 3633, 14907, 15191, 6201, 75909, 54228,
    29913, 6142, 71773, 56999, 50138, 53318, 67399, 6625, 43348, 3552, 58426, 32211, 9076, 71409, 44376, 10395, 54775, 1790, 24558, 35329, 35913, 26500, 10137, 74496,
    50579, 26494, 6182, 77517, 71110, 74006, 2057, 27435, 64370, 24444, 79312, 53167, 29794, 6042, 65001, 31527, 75400, 22991, 45198, 56540, 56546, 47698, 30761, 9296,
    71217, 47718, 26836, 12334, 5320, 8734, 22531, 48363, 84639, 45093, 13019, 73551, 49887, 26262, 85247, 51754, 9541, 43402, 66083, 77188, 77691, 68505, 52009, 30125,
    6010, 68449, 47892, 32936, 26279, 29245, 43479, 68825, 19223, 65516, 34024, 7586, 70904, 46810, 19874, 72477, 30568, 64273, 689, 11723, 12241, 2993, 72844, 50868,
    26690, 2611, 68424, 53373, 46728, 49697, 63951, 3068, 39805, 53, 54703, 28761, 5209, 68087, 40570, 7334, 51248, 85469, 21397, 32918, 33033, 24259, 7337, 72225,
    47647, 24020, 2987, 74766, 67651, 71018, 84826, 24265, 60649, 21070, 75543, 49530, 26009, 2142, 61269, 27513, 71856, 19115, 42003, 53008, 53775, 44553, 28334, 6407,
    68926, 44861, 24471, 9337, 2781, 5532, 19829, 44988, 81841, 41633, 10163, 70104, 46943, 22872, 82147, 48417, 6280, 40142, 62789, 74104, 74549, 65673, 49102, 27507, //2010
    3277, 65912, 45176, 30319, 23398, 26444, 40318, 65846, 15792, 62470, 30440, 4589, 67320, 43908, 16406, 69638, 27253, 61477, 83945, 9018, 9295, 468, 70139, 48601,
    24234, 589, 66143, 51455, 44462, 47665, 61536, 724, 37180, 83731, 51953, 25728, 2443, 64851, 37832, 4010, 48540, 82139, 18702, 29613, 30356, 21007, 4735, 69095,
    45217, 21102, 805, 72095, 65691, 68515, 82947, 21798, 58689, 18570, 73399, 47036, 23676, 86158, 58821, 25301, 69376, 17048, 39509, 50988, 51232, 42486, 25711, 4259,
    66250, 42674, 21795, 7169, 135, 3426, 17199, 42932, 79165, 39542, 7382, 67873, 44085, 20481, 79348, 45958, 3685, 37744, 60449, 71823, 72400, 63491, 47045, 25381,
    1232, 63794, 43107, 28187, 21339, 24307, 38347, 63710, 13955, 60285, 28689, 2273, 65534, 41425, 14483, 67035, 25173, 58831, 81767, 6401, 7116, 84315, 67999, 46075,
    22101, 84424, 63960, 48821, 42210, 45008, 59249, 84563, 34910, 81386, 49708, 23649, 198, 63010, 35578, 2306, 46262, 80465, 16400, 27930, 28058, 19340, 2465, 67447,
    42942, 19413, 84841, 70276, 63160, 66515, 80236, 19618, 55859, 16253, 70593, 44646, 21038, 83718, 56398, 22809, 67114, 14504, 37325, 48396, 49065, 39874, 23555, 1673,
    64121, 40138, 19705, 4677, 84486, 924, 15163, 40349, 77118, 36873, 5344, 65232, 42107, 18016, 77434, 43710, 1777, 35641, 58477, 69738, 70299, 61284, 44748, 22958,
    85132, 61167, 40454, 25431, 18579, 21500, 35481, 60910, 10960, 57541, 25578, 86049, 62425, 39016, 11577, 64913, 22606, 57002, 79532, 4777, 5055, 82728, 65901, 44358,
    19799, 82473, 61392, 46613, 39404, 42569, 56282, 81921, 31876, 78549, 46698, 20613, 83660, 59804, 32763, 85488, 43674, 77432, 14107, 25165, 26026, 16778, 561, 64932, //2020
    40997, 16782, 82719, 67429, 60812, 63439, 77698, 16394, 53221, 13018, 67917, 41520, 18319, 80776, 53628, 20088, 64366, 12055, 34733, 46260, 46717, 38014, 21415, 86349,
    62034, 38336, 17436, 2570, 81814, 84795, 12003, 37447, 73546, 33745, 1537, 62020, 38269, 14809, 73737, 40559, 84727, 32611, 55336, 66931, 67518, 58818, 42364, 20881,
    83079, 59360, 38541, 23645, 16562, 19454, 33172, 58406, 8314, 54539, 22690, 82657, 59429, 35415, 8561, 61266, 19591, 53386, 76523, 1239, 2123, 79349, 63164, 41229,
    17349, 79628, 59213, 43978, 37351, 39972, 54123, 79173, 29391, 75557, 43780, 17446, 80389, 56651, 29341, 82488, 40266, 74607, 10783, 22472, 22789, 14176, 83807, 62420,
    37951, 14392, 79813, 65178, 58022, 61274, 74901, 14145, 50217, 10463, 64576, 38520, 14683, 77351, 49879, 16415, 60701, 8344, 31257, 42639, 43428, 34518, 18260, 82968,
    58973, 35079, 14511, 85899, 79123, 81942, 9583, 34731, 71307, 30988, 85684, 59052, 35800, 11568, 70946, 37111, 81659, 29096, 52139, 63459, 64306, 55383, 39134, 17395,
    79779, 55772, 35160, 19990, 13154, 15864, 29832, 55040, 5093, 51475, 19529, 79830, 56204, 32660, 5187, 58439, 16088, 50483, 73006, 84753, 85095, 76554, 59841, 38510,
    14059, 76897, 55853, 41142, 33867, 37009, 50565, 76150, 25911, 72568, 40539, 14499, 77397, 53618, 26450, 79235, 37309, 71099, 7690, 18783, 19614, 10442, 80659, 58759,
    34894, 10832, 76825, 61654, 55035, 57697, 71882, 10520, 47244, 6930, 61776, 35275, 12121, 74503, 47482, 13874, 58292, 5889, 28665, 40065, 40583, 31741, 15205, 80025,
    55811, 32041, 11284, 82774, 75775, 78703, 6037, 31393, 67554, 27642, 81846, 55854, 32105, 8669, 67616, 34560, 78746, 26790, 49492, 61210, 61700, 53052, 36433, 14953, //2030
    76964, 53253, 32275, 17430, 10238, 13234, 26879, 52249, 2087, 48449, 16517, 76603, 53306, 29403, 2551, 55374, 13785, 47694, 70953, 82141, 83115, 73931, 57747, 35707,
    11740, 73853, 53312, 37909, 31188, 33689, 47830, 72823, 23125, 69273, 37652, 11299, 74427, 50658, 23536, 76673, 34647, 69027, 5398, 17147, 17629, 9044, 78772, 57329,
    32859, 9140, 74468, 59602, 52314, 55337, 68861, 7960, 43998, 4230, 58378, 32440, 8669, 71541, 44117, 10882, 55193, 3072, 26008, 37628, 38436, 29742, 13467, 78332,
    54242, 30409, 9641, 80983, 73914, 76621, 3945, 28994, 65320, 24984, 79572, 53022, 29829, 5751, 65317, 31636, 76409, 23944, 47196, 58557, 59589, 50668, 34579, 12810,
    75313, 51226, 30664, 15339, 8468, 10932, 24801, 49708, 86065, 45776, 13819, 73958, 50439, 26891, 86029, 53019, 10918, 45506, 68230, 80139, 80600, 72161, 55500, 34221,
    9779, 72631, 51565, 36826, 29478, 32539, 45944, 71398, 20931, 67461, 35188, 9102, 71820, 48128, 20904, 73912, 32067, 66166, 2906, 14297, 15247, 6285, 76529, 54740,
    30811, 6791, 72664, 57502, 50738, 53383, 67409, 5986, 42535, 2094, 56777, 30112, 6875, 69122, 42148, 8488, 53100, 751, 23836, 35358, 36210, 27470, 11203, 76031,
    51973, 28097, 7392, 78693, 71695, 74404, 1733, 26878, 63037, 22928, 77103, 50929, 27116, 3559, 62444, 29373, 73542, 21700, 44459, 56405, 57016, 48644, 32148, 10904,
    72964, 49384, 28339, 13509, 6147, 9086, 22511, 47831, 83853, 43817, 11693, 71810, 48333, 24453, 83849, 50284, 8606, 42540, 65800, 77067, 78137, 69095, 53068, 31199,
    7380, 69626, 49157, 33792, 27037, 29465, 43494, 68337, 18524, 64506, 32844, 6346, 69516, 45611, 18565, 71561, 29608, 63857, 294, 11947, 12520, 3893, 73765, 52333, //2040
    28049, 4360, 69870, 54998, 47832, 50771, 64318, 3258, 39232, 85692, 53347, 27312, 3470, 66362, 38882, 5737, 49974, 84354, 20779, 32478, 33147, 24519, 8108, 73060,
    48869, 25163, 4331, 75829, 68708, 71559, 85200, 23947, 60131, 19836, 74253, 47710, 24396, 339, 59888, 26246, 71088, 18652, 41994, 53332, 54418, 45402, 29313, 7403,
    69880, 45655, 25085, 9660, 2825, 5227, 19175, 44026, 80484, 40108, 8248, 68262, 44829, 21166, 80404, 47346, 5369, 39976, 62822, 74769, 75308, 66863, 50200, 28833,
    4309, 67004, 45816, 30907, 23454, 26392, 39744, 65162, 14687, 61271, 28998, 3026, 65713, 42158, 14874, 68038, 26149, 60429, 83556, 8735, 9677, 875, 71070, 49373,
    25309, 1290, 66935, 51700, 44660, 47216, 60995, 85930, 35928, 81917, 50178, 23591, 441, 62765, 35936, 2307, 47084, 81133, 17996, 29508, 30547, 21787, 5691, 70463,
    46516, 22509, 1822, 72894, 65824, 68230, 81855, 20293, 56398, 16067, 70291, 44035, 20373, 83277, 55956, 23027, 67355, 15659, 38502, 50569, 51206, 42932, 26433, 5265,
    67298, 43753, 22637, 7780, 273, 3116, 16317, 41508, 77267, 37151, 4808, 64965, 41384, 17684, 77108, 43808, 2246, 36441, 59817, 71270, 72396, 63452, 47417, 25589,
    1718, 63981, 43432, 28065, 21203, 23585, 37472, 62201, 12224, 58038, 26252, 85990, 62762, 38771, 11886, 64904, 23240, 57593, 80759, 6118, 6965, 84764, 68403, 46890,
    22677, 85227, 64356, 49292, 42130, 44872, 58417, 83563, 33112, 79383, 46978, 20792, 83283, 59732, 32229, 85595, 43486, 78112, 14655, 26666, 27458, 19111, 2752, 67883,
    43626, 19981, 85380, 70458, 63116, 65929, 79347, 18085, 54072, 13803, 68043, 41534, 18066, 80437, 53503, 19914, 64793, 12465, 35963, 47463, 48774, 39932, 24060, 2275, //2050
    64884, 40680, 20120, 4601, 84077, 86305, 13734, 38393, 74780, 34239, 2396, 62273, 38921, 15132, 74464, 41303, 85833, 33997, 56981, 68960, 69682, 61325, 44872, 23601,
    85666, 62006, 40931, 25971, 18527, 21320, 34593, 59830, 9241, 55693, 23321, 83727, 59953, 36485, 9149, 62443, 20483, 54895, 77943, 3264, 4146, 81913, 65683, 44186,
    20121, 82708, 61936, 46868, 39751, 42397, 56023, 80970, 30768, 76727, 44812, 18202, 81382, 57326, 30554, 83369, 41871, 75933, 12918, 24389, 25522, 16681, 666, 65351,
    41491, 17414, 83229, 67847, 60885, 63222, 76938, 15259, 51425, 10933, 65203, 38785, 15181, 77992, 50772, 17861, 62328, 10724, 33686, 45844, 46531, 38286, 21758, 551,
    62508, 38895, 17702, 2793, 81640, 84472, 11247, 36467, 72185, 32127, 86108, 59948, 36267, 12677, 72016, 38868, 83687, 31680, 55096, 66753, 67919, 59124, 43062, 21291,
    83694, 59530, 38783, 23351, 16282, 18618, 32353, 57080, 7032, 52871, 21094, 80849, 57694, 33689, 6918, 59898, 18392, 52725, 76100, 1476, 2554, 80369, 64209, 42653,
    18557, 80965, 60104, 44799, 37574, 40031, 53510, 78406, 27952, 74069, 41732, 15500, 78100, 54597, 27190, 80656, 38599, 73352, 9923, 22095, 22922, 14756, 84833, 63727,
    39467, 15916, 81224, 66292, 58747, 61456, 74593, 13207, 48914, 8598, 62638, 36199, 12646, 75183, 48269, 14879, 59835, 7660, 31228, 42819, 44182, 35402, 19580, 84253,
    60505, 36347, 15791, 268, 79678, 81812, 9100, 33571, 69792, 29029, 83490, 56792, 33483, 9608, 69117, 35965, 80748, 28967, 52191, 64202, 65094, 56712, 40370, 19033,
    81185, 57442, 36444, 21389, 13999, 16666, 29938, 54996, 4323, 50564, 18048, 78293, 54390, 30900, 3503, 56928, 14991, 49646, 72765, 84759, 85686, 77272, 61008, 39641, //2060
    15460, 78112, 57177, 42145, 34853, 37531, 50977, 75946, 25543, 71491, 39352, 12689, 75679, 51575, 24724, 77542, 36107, 70238, 7401, 18988, 20346, 11606, 82177, 60486,
    36717, 12565, 78376, 62850, 55838, 58004, 71680, 9833, 46000, 5342, 59640, 33039, 9460, 72086, 44890, 11853, 56379, 4750, 27828, 40057, 40906, 32782, 16422, 81715,
    57387, 33793, 12624, 84035, 76417, 79108, 5769, 30854, 66453, 26333, 80209, 54070, 30282, 6755, 65960, 32884, 77567, 25649, 48969, 60754, 61880, 53257, 37199, 15621,
    78030, 54037, 33244, 17915, 10717, 13074, 26616, 51307, 1066, 46860, 14962, 74695, 51532, 27518, 814, 53756, 12336, 46580, 70033, 81692, 82853, 74161, 58111, 36482,
    12526, 74887, 54173, 38811, 31702, 34048, 47590, 72309, 21879, 67798, 35485, 9105, 71765, 48220, 20912, 74437, 32472, 67312, 3910, 16136, 16910, 8750, 78727, 57602,
    33242, 9681, 74915, 59998, 52401, 55145, 68219, 6872, 42475, 2203, 56107, 29740, 6068, 68733, 41771, 8565, 53554, 1577, 25206, 36939, 38309, 29571, 13663, 78287,
    54378, 30129, 9394, 80196, 73066, 75173, 2391, 26872, 63086, 22331, 76834, 50116, 26904, 2993, 62660, 29490, 74493, 22735, 46212, 58263, 59381, 50992, 34792, 13342,
    75521, 51554, 30496, 15160, 7690, 10096, 23338, 48219, 83990, 43756, 11328, 71582, 47767, 24356, 83423, 50592, 8705, 43562, 66739, 78973, 79959, 71775, 55525, 34316,
    10053, 72743, 51604, 36496, 28908, 31459, 44594, 69479, 18837, 64816, 32555, 6033, 69013, 45097, 18315, 71312, 29993, 64269, 1575, 13285, 14803, 6173, 76895, 55279,
    31606, 7455, 73263, 57629, 50500, 52450, 65942, 3825, 39842, 85352, 53235, 26511, 3079, 65697, 38751, 5785, 50583, 85446, 22356, 34658, 35688, 27611, 11400, 76715, //2070
    52510, 28900, 7805, 79136, 71511, 74036, 591, 25448, 60868, 20534, 74232, 48005, 24122, 690, 59904, 27068, 71832, 20220, 43633, 55705, 56877, 48477, 32402, 10987,
    73332, 49465, 28575, 13343, 6012, 8420, 21777, 46456, 82378, 41695, 9552, 69183, 45866, 21804, 81516, 48105, 6863, 41226, 64952, 76747, 78186, 69582, 53743, 32117,
    8286, 70574, 49920, 34441, 27358, 29556, 43112, 67649, 17223, 62924, 30595, 3976, 66607, 42869, 15569, 69030, 27154, 62073, 85233, 11238, 12202, 4243, 74380, 53398,
    29120, 5605, 70832, 55879, 48213, 50888, 63864, 2459, 37945, 84055, 51416, 25063, 1215, 63900, 36750, 3590, 48452, 82983, 20190, 32105, 33539, 25030, 9221, 74071,
    50228, 26147, 5392, 76276, 69038, 71150, 84617, 22660, 58738, 17932, 72358, 45583, 22365, 84765, 58059, 24750, 69793, 17886, 41443, 53393, 54653, 46227, 30224, 8781,
    71180, 47217, 26349, 10962, 3611, 5888, 19177, 43875, 79659, 39246, 6830, 66964, 43181, 19737, 78830, 46019, 4098, 38972, 62050, 74297, 75166, 67020, 50687, 29560,
    5266, 68080, 46944, 31970, 24367, 27022, 40081, 65022, 14241, 60258, 27831, 1365, 64209, 40388, 13547, 66665, 25347, 59708, 83405, 8717, 10174, 1478, 72105, 50406,
    26644, 2441, 68199, 52564, 45432, 47409, 60923, 85212, 34855, 80321, 48243, 21435, 84485, 60614, 33807, 792, 45776, 80629, 17718, 29989, 31121, 22931, 6723, 71836,
    47567, 23713, 2550, 73662, 66017, 68399, 81402, 19792, 55297, 14950, 68714, 42517, 18661, 81710, 54519, 21819, 66576, 15148, 38564, 50836, 51985, 43738, 27560, 6199,
    68334, 44417, 23236, 7903, 268, 2607, 15722, 40420, 76199, 35625, 3426, 63205, 39897, 15970, 75746, 42438, 1305, 35745, 59619, 71481, 73078, 64511, 48791, 27128, //2080
    3321, 65463, 44715, 28984, 21723, 23614, 36994, 61252, 10757, 56278, 24030, 83743, 60170, 36449, 9382, 62904, 21237, 56229, 79553, 5632, 6726, 85232, 69067, 48111,
    23876, 308, 65492, 50382, 42569, 44999, 57748, 82484, 31337, 77287, 44491, 18158, 80666, 57142, 30039, 83567, 42115, 76938, 14211, 26365, 27816, 19488, 3654, 68640,
    44730, 20740, 86263, 70774, 63335, 65392, 78578, 16488, 52257, 11290, 65479, 38594, 15310, 77706, 51131, 17915, 63231, 11459, 35329, 47382, 48903, 40498, 24669, 3163,
    65661, 41577, 20758, 5207, 84265, 86331, 13189, 37622, 73338, 32626, 125, 59996, 36170, 12596, 71743, 38989, 83623, 32309, 55596, 68118, 69174, 61263, 45032, 24038,
    86140, 62579, 41354, 26335, 18592, 21175, 34061, 58931, 7945, 53900, 21237, 81132, 57342, 33529, 6529, 59748, 18411, 52973, 76790, 2373, 4019, 81996, 66387, 44887,
    21182, 83459, 62748, 47085, 39796, 41682, 55020, 79196, 28698, 74042, 41882, 14939, 77967, 53943, 27169, 80417, 39109, 73897, 11187, 23493, 24905, 16817, 916, 66123,
    42118, 18278, 83674, 68283, 60682, 62864, 75834, 13992, 49446, 8905, 62633, 36323, 12442, 75459, 48222, 15545, 60225, 8863, 32215, 44618, 45756, 37714, 21584, 474,
    62679, 39003, 17851, 2686, 81385, 83789, 10331, 35018, 70567, 29975, 83964, 57367, 33921, 10056, 69780, 36536, 81802, 29863, 53744, 65589, 67205, 58628, 42966, 21338,
    84037, 59858, 39242, 23595, 16443, 18363, 31789, 55977, 5474, 50844, 18594, 78144, 54630, 30786, 3844, 57313, 15804, 50784, 74242, 288, 1451, 79881, 63740, 42690,
    18485, 81244, 60100, 44959, 37254, 39683, 52537, 77268, 26167, 72092, 39261, 12922, 75359, 51896, 24731, 78397, 36914, 71929, 9188, 21527, 22925, 14717, 85154, 63782, //2090
    39681, 15693, 81013, 65544, 57944, 60082, 73173, 11222, 46949, 6129, 60293, 33506, 10217, 72660, 46132, 12945, 58370, 6621, 30649, 42719, 44406, 35987, 20274, 85082,
    61211, 36957, 16093, 325, 79322, 81185, 8038, 32329, 68141, 27358, 81429, 54869, 31220, 7631, 66925, 34186, 78937, 27678, 51064, 63673, 64817, 56999, 40828, 19885,
    81987, 58391, 37080, 21935, 14029, 16442, 29139, 53880, 2744, 48693, 15961, 75994, 52202, 28611, 1627, 55074, 13747, 48505, 72325, 84467, 86112, 77824, 62203, 40815,
    17064, 79409, 58588, 42926, 35451, 37264, 50366, 74421, 23709, 68946, 36683, 9709, 72806, 48831, 22263, 75584, 34529, 69362, 6884, 19180, 20768, 12622, 83251, 61968,
    38067, 14113, 79589, 64050, 56486, 58467, 71419, 9325, 44720, 3920, 57590, 31101, 7226, 70224, 43084, 10549, 55373, 4236, 27714, 40334, 41525, 33629, 17462, 82818,
    58522, 34859, 13578, 84806, 76957, 79343, 5711, 30369, 65706, 25080, 78832, 52216, 28563, 4737, 64371, 31261, 76587, 24852, 48889, 60945, 62721, 54296, 38717, 17141,
    79820, 55601, 34886, 19146, 11866, 13673, 26981, 51049, 459, 45689, 13390, 72771, 49250, 25228, 84741, 51696, 10339, 45319, 69021, 81556, 82999, 75131, 59233, 38213,
    14153, 76824, 55707, 40371, 32608, 34795, 47564, 72074, 20900, 66664, 33771, 7346, 69708, 46225, 18960, 72665, 31089, 66219, 3443, 15981, 17408, 9454, 79941, 58816,
    34723, 10906, 76137, 60726, 52925, 55030, 67853, 5845, 41311, 466, 54433, 27665, 4269, 66743, 40180, 6994, 52416, 633, 24698, 36742, 38525, 30124, 14563, 79427,
    55724, 31520, 10785, 81403, 74041, 75787, 2596, 26680, 62424, 21405, 75455, 48699, 25110, 1404, 60813, 28026, 72886, 21596, 45041, 57609, 58774, 50921, 34775, 13820, //2100
    75979, 52395, 31162, 16026, 8179, 10564, 23249, 47910, 83076, 42531, 9653, 69657, 45733, 22215, 81553, 48765, 7411, 42364, 66160, 78453, 80022, 71815, 56059, 34705,
    10796, 73174, 52212, 36613, 29028, 30929, 43936, 68068, 17257, 62522, 30166, 3178, 66238, 42242, 15739, 69063, 28169, 63028, 760, 13069, 14840, 6639, 77365, 55936,
    32043, 7875, 73317, 57551, 49969, 51757, 64748, 2513, 38004, 83501, 50886, 24316, 542, 63497, 36447, 3943, 48861, 84239, 21419, 34200, 35477, 27728, 11589, 77012,
    52651, 28946, 7506, 78614, 70558, 72818, 85390, 23593, 58792, 18219, 71894, 45425, 21727, 84482, 57690, 24762, 70096, 18542, 42635, 54872, 56730, 48476, 32964, 11514,
    74191, 50012, 29190, 13383, 5897, 7556, 20625, 44528, 80164, 38879, 6546, 65895, 42497, 18501, 78234, 45222, 4101, 39096, 63019, 75556, 77205, 69336, 53632, 32594,
    8700, 71306, 50292, 34811, 27062, 29018, 41719, 65953, 14684, 60210, 27261, 730, 63122, 39710, 12552, 66463, 25007, 60381, 84079, 10427, 11865, 4079, 74537, 53553,
    29410, 5714, 70874, 55552, 47634, 49774, 62408, 375, 35589, 81093, 48406, 21623, 84460, 60603, 34033, 1010, 46574, 81395, 19261, 31473, 33423, 25108, 9635, 74507,
    50827, 26587, 5842, 76409, 69030, 70708, 83890, 21459, 57161, 15962, 69975, 43011, 19431, 81956, 55059, 22216, 67273, 16056, 39769, 52472, 53896, 46150, 30186, 9248,
    71491, 47829, 26609, 11343, 3483, 5738, 18411, 42965, 78103, 37476, 4523, 64476, 40430, 16912, 76122, 43410, 1982, 37116, 60930, 73491, 75139, 67223, 51532, 30414,
    6488, 68999, 47915, 32354, 24572, 26468, 39267, 63410, 12430, 57733, 25261, 84701, 61291, 37286, 10761, 64039, 23176, 57989, 82226, 8132, 10085, 1929, 72875, 51501, //2110
    27804, 3642, 69200, 53349, 45791, 47410, 60374, 84336, 33429, 78752, 46204, 19514, 82243, 58720, 31760, 85604, 44164, 79503, 16684, 29453, 30737, 23026, 6934, 72440,
    48160, 24545, 3180, 74337, 66297, 68541, 81041, 19181, 54246, 13632, 67173, 40750, 16958, 79842, 52991, 20227, 65511, 14094, 38116, 50427, 52184, 43965, 28346, 6939,
    69529, 45424, 24540, 8827, 1283, 3018, 16005, 39930, 75459, 34135, 1720, 61018, 37632, 13612, 73466, 40452, 85917, 34507, 58614, 71097, 72865, 64862, 49196, 27963,
    4067, 66461, 45457, 29792, 22093, 23907, 36696, 60818, 9643, 55061, 22182, 81960, 58005, 34576, 7485, 61480, 20101, 55630, 79397, 5913, 7373, 86101, 70089, 49121,
    24811, 1046, 65984, 50565, 42427, 44506, 56963, 81346, 30039, 75637, 42861, 16205, 78961, 55234, 28624, 82145, 41342, 76319, 14278, 26641, 28695, 20494, 5074, 69977,
    46245, 21925, 1018, 71414, 63810, 65285, 78265, 15663, 51264, 9962, 64011, 37004, 13564, 76062, 49349, 16486, 61744, 10535, 34463, 47202, 48842, 41134, 25362, 4419,
    66786, 43025, 21823, 6340, 84786, 335, 12849, 37094, 72087, 31246, 84623, 58131, 34105, 10702, 69973, 37460, 82479, 31430, 55267, 68041, 69696, 61987, 46288, 25355,
    1385, 64027, 42829, 27309, 19311, 21147, 33632, 57650, 6323, 51510, 18757, 78163, 54633, 30707, 4247, 57679, 16993, 51957, 76391, 2392, 4509, 82790, 67459, 46082,
    22475, 84685, 63898, 47978, 40419, 41896, 54789, 78516, 27490, 72512, 39863, 12891, 75605, 51915, 25069, 78912, 37693, 73158, 10589, 23513, 24999, 17393, 1420, 66952,
    42720, 19069, 84111, 68795, 60734, 62880, 75314, 13328, 48253, 7493, 60826, 34287, 10269, 73126, 46113, 13457, 58701, 7523, 31616, 44231, 46096, 38160, 22601, 1394, //2120
    63949, 39949, 18943, 3268, 81954, 83699, 10107, 34027, 69384, 28022, 81846, 54654, 31139, 6998, 66801, 33683, 79217, 27777, 52083, 64623, 66675, 58769, 43392, 22224,
    84948, 60918, 40028, 24236, 16564, 18182, 30964, 54873, 3707, 48932, 16080, 75692, 51751, 28186, 1082, 54991, 13588, 49110, 72881, 85883, 1003, 79894, 63987, 43208,
    19000, 81785, 60365, 45012, 36823, 38884, 51208, 75544, 24069, 69658, 36731, 10139, 72769, 49143, 22422, 76028, 35121, 70151, 8022, 20428, 22437, 14310, 85298, 63924,
    40240, 16073, 81615, 65742, 58147, 59685, 72612, 9990, 45506, 4126, 58124, 31033, 7635, 70070, 43483, 10562, 55967, 4678, 28720, 41343, 43057, 35211, 19505, 84837,
    60898, 37047, 15979, 436, 79036, 80930, 7178, 31345, 66420, 25477, 78887, 52318, 28307, 4919, 64221, 31822, 76874, 25983, 49817, 62720, 64300, 56652, 40801, 19870,
    82109, 58342, 36972, 21481, 13364, 15291, 27705, 51866, 486, 45832, 13015, 72564, 48971, 25167, 85100, 52254, 11637, 46722, 71265, 83754, 85960, 77855, 62535, 41079,
    17390, 79447, 58526, 42440, 34767, 36122, 48982, 72653, 21698, 66710, 34222, 7248, 70158, 46448, 19794, 73623, 32597, 68089, 5718, 18692, 20354, 12774, 83314, 62394,
    38176, 14365, 79324, 63764, 55570, 57464, 69788, 7631, 42520, 1726, 55101, 28673, 4734, 67793, 40837, 8399, 53658, 2696, 26793, 39624, 41493, 33761, 18182, 83535,
    59607, 35684, 14498, 85196, 77202, 78844, 4931, 28753, 63846, 22462, 76160, 49051, 25576, 1597, 61573, 28620, 74369, 23033, 47539, 60120, 62350, 54452, 39233, 18048,
    80891, 56799, 35962, 20029, 12320, 13697, 26365, 49965, 85080, 43612, 10724, 70149, 46298, 22704, 82210, 49840, 8695, 44399, 68377, 81526, 83162, 75736, 59871, 39124, //2130
    14919, 77698, 56255, 40857, 32599, 34566, 46745, 70939, 19243, 64690, 31523, 4869, 67318, 43766, 16980, 70802, 29960, 65296, 3302, 16004, 18119, 10206, 81213, 59957,
    36202, 12083, 77499, 61638, 53892, 55417, 68178, 5501, 40830, 85729, 53145, 25895, 2390, 64689, 38128, 5145, 50723, 85876, 23808, 36540, 38579, 30828, 15387, 80725,
    56943, 32984, 11968, 82631, 74825, 76489, 2718, 26658, 61715, 20553, 73924, 47152, 23077, 85946, 58790, 26356, 71390, 20593, 44483, 57595, 59297, 51911, 36185, 15484,
    77780, 54145, 32722, 17248, 8974, 10843, 23041, 47138, 81935, 40861, 7843, 67412, 43633, 19854, 79633, 46808, 6097, 41218, 65748, 78317, 80597, 72629, 57439, 36147,
    12584, 74776, 53914, 37874, 30160, 31451, 44186, 67710, 16621, 61461, 28910, 1785, 64723, 40875, 14295, 67988, 27041, 62407, 109, 12979, 14732, 7091, 77767, 56837 //2135
];
export default calendar;
