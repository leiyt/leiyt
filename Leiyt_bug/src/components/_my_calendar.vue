<template>
	<div class="ryan-datepicker-v3">
		<!-- 确认 t -->
		<div class="mContent" v-if="tipsshow">
			<h1 class="mTitle">确认时间</h1>
			<div class="mBody">
				<p class="p0">请确认输入的时间是否正确</p>
				<p class="p1">农（阴）历：<span>{{nonglistring}}</span></p>
				<p class="p1">公（阳）历：<span>{{gonglistring}}</span></p>
				<div class="btn-wrapper">
					<a class="btn btn0" @click="tipsshow = false">返回修改</a>
					<a class="btn btn1" @click="confirmTime">确认正确</a>
				</div>
			</div>
		</div>
		<!-- 确认 b -->
		<div class="rdp-back" id="rdp-back" @click="hideCalendar()"></div>
		<div class="rdp-front">
			<div class="rdp-nav">
				<div class="rdp-left" @click="hideCalendar()">{{'\u53D6\u6D88'}}</div>
				<div class="rdp-right" @click="confirm()">{{'\u5B8C\u6210'}}</div>
				<div class="rdp-auto">
					<div class="rdp-switch">
						<span @click = "gongli();dateType = 1" :class="gongliActive == true ? 'rdp-mode-active' : '' ">{{'\u516C\u5386'}}</span>
						<span @click = "nonli();dateType = 0" :class="nonliActive == true ? 'rdp-mode-active' : '' ">{{'\u519C\u5386'}}</span>
					</div>
				</div>
			</div>
			<div class="rdp-body">
				<ul class="rdp-container" @click="confirmTime">
					<li id="wrapperYear">
						<ul class="rdp-item" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, -3360px) translateZ(0px);">
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
							<li v-for="val in yearArray">{{val}}</li>
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
						</ul>
					</li>
					<li id="wrapperMonth">
						<ul class="rdp-item" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" v-if="gongliModule">
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
							<li v-for="val in gongliMonthArray">{{val}}</li>
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
						</ul>
						<ul class="rdp-item" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" v-if="!gongliModule">
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
							<li>{{'\u6B63\u6708'}}</li>
							<li>{{'\u4E8C\u6708'}}</li>
							<li v-if="runMonthObj.runer">{{'\u95F0\u4E8C\u6708'}}</li>
							<li>{{'\u4E09\u6708'}}</li>
							<li v-if="runMonthObj.runsan">{{'\u95F0\u4E09\u6708'}}</li>
							<li>{{'\u56DB\u6708'}}</li>
							<li v-if="runMonthObj.runsi">{{'\u95F0\u56DB\u6708'}}</li>
							<li>{{'\u4E94\u6708'}}</li>
							<li v-if="runMonthObj.runwu">{{'\u95F0\u4E94\u6708'}}</li>
							<li>{{'\u516D\u6708'}}</li>
							<li v-if="runMonthObj.runliu">{{'\u95F0\u516D\u6708'}}</li>
							<li>{{'\u4E03\u6708'}}</li>
							<li v-if="runMonthObj.runqi">{{'\u95F0\u4E03\u6708'}}</li>
							<li>{{'\u516B\u6708'}}</li>
							<li v-if="runMonthObj.runba">{{'\u95F0\u516B\u6708'}}</li>
							<li>{{'\u4E5D\u6708'}}</li>
							<li v-if="runMonthObj.runjiu">{{'\u95F0\u4E5D\u6708'}}</li>
							<li>{{'\u5341\u6708'}}</li>
							<li v-if="runMonthObj.runshi">{{'\u95F0\u5341\u6708'}}</li>
							<li>{{'\u5341\u4E00\u6708'}}</li>
							<li>{{'\u5341\u4E8C\u6708'}}</li>
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
						</ul>
					</li>
					<li id="wrapperDay">
						<ul class="rdp-item" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" v-if="gongliModule">
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
							<li v-for="val in gongliDayArray">{{val}}</li>
							<li v-if="TwentyNine">29</li>
							<li v-if="thirty">30</li>
							<li v-if="thirtyOne">31</li>
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
						</ul>
						<ul class="rdp-item" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" v-if="!gongliModule">
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
							<li v-for="val in nonliDayArray">{{val}}</li>
							<li v-if="thirty">{{'\u4E09\u5341'}}</li>
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
						</ul>
					</li>
					<li id="wrapperTime">
						<ul class="rdp-item" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
							<!-- <li>{{'\u65F6\u8FB0\u4E0D\u6E05\u695A'}}</li>
							<li>{{'\u5B50\u65F623\u70B9'}}</li>
							<li>{{'\u5B50\u65F60\u70B9'}}</li>
							<li>{{'\u4E11\u65F61\u70B9'}}</li>
							<li>{{'\u4E11\u65F62\u70B9'}}</li>
							<li>{{'\u5BC5\u65F63\u70B9'}}</li>
							<li>{{'\u5BC5\u65F64\u70B9'}}</li>
							<li>{{'\u536F\u65F65\u70B9'}}</li>
							<li>{{'\u536F\u65F66\u70B9'}}</li>
							<li>{{'\u8FB0\u65F67\u70B9'}}</li>
							<li>{{'\u8FB0\u65F68\u70B9'}}</li>
							<li>{{'\u5DF3\u65F69\u70B9'}}</li>
							<li>{{'\u5DF3\u65F610\u70B9'}}</li>
							<li>{{'\u5348\u65F611\u70B9'}}</li>
							<li>{{'\u5348\u65F612\u70B9'}}</li>
							<li>{{'\u672A\u65F613\u70B9'}}</li>
							<li>{{'\u672A\u65F614\u70B9'}}</li>
							<li>{{'\u7533\u65F615\u70B9'}}</li>
							<li>{{'\u7533\u65F616\u70B9'}}</li>
							<li>{{'\u9149\u65F617\u70B9'}}</li>
							<li>{{'\u9149\u65F618\u70B9'}}</li>
							<li>{{'\u620C\u65F619\u70B9'}}</li>
							<li>{{'\u620C\u65F620\u70B9'}}</li>
							<li>{{'\u4EA5\u65F621\u70B9'}}</li>
							<li>{{'\u4EA5\u65F622\u70B9'}}</li> -->
							<li>{{'\u65F6\u8FB0\u4E0D\u6E05\u695A'}}</li>
							<li>{{'0\u70B9\u5B50\u65F6'}}</li>
							<li>{{'1\u70B9\u4E11\u65F6'}}</li>
							<li>{{'2\u70B9\u4E11\u65F6'}}</li>
							<li>{{'3\u70B9\u5BC5\u65F6'}}</li>
							<li>{{'4\u70B9\u5BC5\u65F6'}}</li>
							<li>{{'5\u70B9\u536F\u65F6'}}</li>
							<li>{{'6\u70B9\u536F\u65F6'}}</li>
							<li>{{'7\u70B9\u8FB0\u65F6'}}</li>
							<li>{{'8\u70B9\u8FB0\u65F6'}}</li>
							<li>{{'9\u70B9\u5DF3\u65F6'}}</li>
							<li>{{'10\u70B9\u5DF3\u65F6'}}</li>
							<li>{{'11\u70B9\u5348\u65F6'}}</li>
							<li>{{'12\u70B9\u5348\u65F6'}}</li>
							<li>{{'13\u70B9\u672A\u65F6'}}</li>
							<li>{{'14\u70B9\u672A\u65F6'}}</li>
							<li>{{'15\u70B9\u7533\u65F6'}}</li>
							<li>{{'16\u70B9\u7533\u65F6'}}</li>
							<li>{{'17\u70B9\u9149\u65F6'}}</li>
							<li>{{'18\u70B9\u9149\u65F6'}}</li>
							<li>{{'19\u70B9\u620C\u65F6'}}</li>
							<li>{{'20\u70B9\u620C\u65F6'}}</li>
							<li>{{'21\u70B9\u4EA5\u65F6'}}</li>
							<li>{{'22\u70B9\u4EA5\u65F6'}}</li>
							<li>{{'23\u70B9\u5B50\u65F6'}}</li>
							<li>&nbsp;&nbsp;</li>
							<li>&nbsp;&nbsp;</li>
						</ul>
					</li>
				</ul>
				<div class="rdp-layer-top"></div>
				<div class="rdp-layer-bottom"></div>
			</div>
		</div>
	</div>
</template>
<style lang='scss'>
    @import "../style/_my_calendar.scss";
</style>
<script>
    import Iscroll from '@/utils/iscroll.js'
    import Base from '@/utils/base.js'
    import Calendar from '@/utils/calendar.js'

    export default {
	    props: ['calendarProp'],
        data () {
            return {
                yearArray: [],
	            gongliMonthArray: [],
	            gongliDayArray: [],
	            nonliDayArray: [],
	            gongliActive: true,
	            nonliActive: false,
	            year: "",
	            month: "",
	            day: "",
	            time: "",
	            indexY: 0,
	            indexM: 0,
	            indexD: 0,
	            indexT: 0,
	            myScrollYear: "",
	            myScrollMonth: "",
	            myScrollDay: "",
	            myScrollTime: "",
	            isFebruary: false,
	            isRun: false,
	            TwentyNine: true,
	            thirty: true,
	            thirtyOne: true,
	            arr1: [1, 3, 5, 7, 8, 10, 12],

	            gongliModule: true,
	            runMonthObj: {
	                runer: false,
	                runsan: false,
	                runsi: false,
	                runwu: false,
	                runliu: false,
	                runqi: false,
	                runba: false,
	                runjiu: false,
	                runshi: false
	            },
	            transformationGongliYear: 0,
	            transformationGongliMonth: 0,
	            transformationGongliDay: 0,

	            transformationNonliYear: 0,
	            transformationNonliMonth: 0,
	            transformationNonliDay: 0,
	            isRunPosition: false,

	            'nonglistring':'1989年十二月初五 时辰不清楚',
	            'gonglistring':'1990年01月01日 时辰不清楚',
	            'tipsshow':false,
	            'dateType':1,
	            
            }
        },
        computed:{
        },
        created () {
        },
    
	    watch : {
            'calendarProp.selectCalendar' : {   
                handler(){
                    if(this.calendarProp.selectCalendar===true){
                    	this.dateType = 1;
                    	this.showCalendar()
                    }
                },
                'deep': true ,
            },
        },
        
        mounted () {
        	var _this = this;
	        //阻止滑动穿透
	        document.getElementById("rdp-back").addEventListener("touchmove",function () {
	            event.preventDefault();
	            event.stopPropagation();
	        });

	        document.getElementsByClassName("rdp-front")[0].addEventListener("touchmove",function () {
	            event.preventDefault();
	            event.stopPropagation();
	        });
	        //滑动选择时间
	        this.intervalTimer_1 = setInterval(function () {
	            if (document.getElementById("wrapperYear").getElementsByClassName('rdp-item')[0].offsetHeight !== 0) {
	                clearInterval(_this.intervalTimer_1);
	                _this.selectCalendarFun();
	                //解决用户滑动日历时突然点击位置对不齐的bug
	                document.getElementById("wrapperYear").onclick=()=>{_this.alignment(_this.myScrollYear)}
	                document.getElementById("wrapperMonth").onclick=()=>{_this.alignment(_this.myScrollMonth)}
	                document.getElementById("wrapperDay").onclick=()=>{_this.alignment(_this.myScrollDay)}
	                document.getElementById("wrapperTime").onclick=()=>{_this.alignment(_this.myScrollTime)}
	            }
	        }, 200);

	        //其他
	        _this.productionYearData();
	        _this.productionGongliMonthData();
	        _this.productionGongliDayData();
	        _this.nonliDayArray = Calendar.nStr4;
        },
        
        destroyed(){
        	// vue 实例销毁后 停止 intervalTimer_1
            clearInterval(this.intervalTimer_1)
        },
        
        methods: {

	        //动态生成年份li的数据
	        productionYearData() {
	            var yearValue = 1909;
	            var nowTime = new Date();
	            for (var i = 0; i < nowTime.getFullYear() - 1909; i++) {
	                yearValue += 1;
	                this.yearArray.push(yearValue);
	            }
	        },

	        //动态生成公历月份li的数据
	        productionGongliMonthData() {
	            var monthValue = 0;
	            for (var i = 0; i < 12; i++) {
	                monthValue += 1;
	                this.gongliMonthArray.push(monthValue);
	            }
	        },

	        //动态生成公历天数li的数据
	        productionGongliDayData() {
	            var dayValue = 0;
	            for (var i = 0; i < 28; i++) {
	                dayValue += 1;
	                this.gongliDayArray.push(dayValue);
	            }
	                // console.log('=====',this.gongliDayArray)
	        },

	        //滚动农历年份或者月份，更新相应月份的天数（条件：月份未动）
	        actionRefreshMonth() {
	            var _this = this;
	            if (!_this.year) {
	                _this.defaultYearMonthDayTime();
	            }
	            //判断农历闰月有多少天
	            if (Calendar.leapMonth(_this.year) === _this.indexM - 1 && Calendar.leapMonth(_this.year) !== 0) {
	                if (Calendar.leapDays(_this.year) === 29) {
	                    _this.thirty = false;
	                    _this.refreshDay();
	                }
	                if (Calendar.leapDays(_this.year) === 30) {
	                    _this.thirty = true;
	                    _this.refreshDay();
	                }
	            } else {
	                var fictitiousIndexM = _this.indexM;
	                //除闰月后，选择到其余月份，天数的变化，是否29，30?
	                if (_this.indexM > Calendar.leapMonth(_this.year) && Calendar.leapMonth(_this.year) !== 0) {
	                    fictitiousIndexM = fictitiousIndexM - 1;
	                    if (Calendar.monthDays(_this.year, fictitiousIndexM) === 29) {
	                        _this.thirty = false;
	                        _this.refreshDay();
	                    }
	                    if (Calendar.monthDays(_this.year, fictitiousIndexM) === 30) {
	                        _this.thirty = true;
	                        _this.refreshDay();
	                    }
	                } else {
	                    if (Calendar.monthDays(_this.year, _this.indexM) === 29) {
	                        _this.thirty = false;
	                        _this.refreshDay();
	                    }
	                    if (Calendar.monthDays(_this.year, _this.indexM) === 30) {
	                        _this.thirty = true;
	                        _this.refreshDay();
	                    }
	                }
	            }
	        },

	        //所有的闰月都不显示
	        hideRunMonth() {
	            for (var i in this.runMonthObj) {
	                this.runMonthObj[i] = false;
	            }
	        },

	        //天数DOM结构发生改变刷新函数
	        refreshDay() {
	            var _this = this;
	            setTimeout(function () {
	                _this.myScrollDay.refresh();
	            }, 100);//注意这里的值在0的时候会有问题
	        },

	        //月数DOM结构发生改变刷新函数
	        refreshMonth() {
	            var _this = this;
	            setTimeout(function () {
	                _this.myScrollMonth.refresh();
	            }, 100);//注意这里的值在0的时候会有问题
	        },

	        //已知年月日，获得相应位置
	        getYMDposition(y, m, d, t) {
	            var yPosition = (y - 1910) * -40;
	            var mPosition = (m - 1) * -40;
	            var dPosition = (d - 1) * -40;
	            var tPosition = (t + 2) * -40;
	            console.info(yPosition, mPosition, dPosition, tPosition);
	            this.myScrollYear.scrollTo(0, yPosition, 0);
	            this.myScrollMonth.scrollTo(0, mPosition, 0);
	            this.myScrollDay.scrollTo(0, dPosition, 0);
	            if(!isNaN(tPosition)) {
	                this.myScrollTime.scrollTo(0, tPosition, 0);
	            }
	            this.refreshDay();
	            this.refreshMonth();
	        },

	        //切换公历背景色
	        gongli() {
	        	

	            this.transformation();
	            this.gongliActive = true;
	            this.nonliActive = false;
	            this.gongliModule = true;
	            //已知农历年份，且已换算成公历年份，想得到公历相应位置
	            this.getYMDposition(this.transformationGongliYear, this.transformationGongliMonth, this.transformationGongliDay);
	        },

	        //切换农历背景色
	        nonli() {
	        	

	            this.refreshDay();
	            this.transformation();
	            this.gongliActive = false;
	            this.nonliActive = true;
	            this.gongliModule = false;
	            //已知公历年份，且已换算成农历年份，想得到农历相应位置
	            if (this.isRunPosition) {
	                this.getYMDposition(this.transformationNonliYear, this.transformationNonliMonth + 1, this.transformationNonliDay);
	            } else {
	                this.getYMDposition(this.transformationNonliYear, this.transformationNonliMonth, this.transformationNonliDay);
	            }
	        },

	        //滑动选择日期函数
	        selectCalendarFun() {
	            var _this = this;
	            //年
	            _this.myScrollYear = new Iscroll("wrapperYear", {
	                snap: "li",
	                hScroll: false,
	                vScroll: true,
	                hScrollbar: false,
	                vScrollbar: false,
	                hideScrollbar: true,
	                y: -3200,
	                onScrollEnd() {
	                    _this.indexY = this.y / 40 * -1 + 1;
	                    _this.year = document.querySelectorAll("#wrapperYear ul li")[_this.indexY + 1].innerHTML;

	                    //公历
	                    if (_this.gongliActive) {
	                        //判断是否闰年
	                        _this.isRun = Base.isRunYear(_this.year); //闰年
	                        //如果没有滑动月份,取默认
	                        if (_this.indexM === 0) {
	                            _this.indexM = _this.myScrollMonth.y / 40 * -1 + 1;
	                        }
	                        if (_this.isRun) {
	                            if (_this.indexM === 2) {
	                                _this.TwentyNine = true;
	                                _this.thirty = false;
	                                _this.thirtyOne = false;
	                                _this.refreshDay();
	                            }
	                        } else {
	                            if (_this.indexM === 2) {
	                                _this.TwentyNine = false;
	                                _this.thirty = false;
	                                _this.thirtyOne = false;
	                                _this.refreshDay();
	                            }
	                        }
	                    }

	                    //农历
	                    if (_this.nonliActive) {
	                        //                            //调用此函数，当滚动年份，而月份未滑动的情况下，更新相应月份的天数
	                        _this.actionRefreshMonth();

	                        //获取农历某年是否有闰月(无返回0)，闰哪个月(返回1-12)
	                        var runMonth = Calendar.leapMonth(_this.year);
	                        _this.hideRunMonth();
	                        if (runMonth === 0) {
	                            _this.hideRunMonth();
	                            _this.refreshMonth();
	                        } else {
	                            //2,3,4,5,6,7,8,9,10
	                            if (runMonth === 2) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runer = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 3) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runsan = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 4) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runsi = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 5) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runwu = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 6) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runliu = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 7) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runqi = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 8) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runba = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 9) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runjiu = true;
	                                _this.refreshMonth();
	                            }
	                            if (runMonth === 10) {
	                                _this.hideRunMonth();
	                                _this.runMonthObj.runshi = true;
	                                _this.refreshMonth();
	                            }
	                        }
	                    }
	                }
	            });
	            //月
	            _this.myScrollMonth = new Iscroll("wrapperMonth", {
	                snap: "li",
	                hScroll: false,
	                vScroll: true,
	                hScrollbar: false,
	                vScrollbar: false,
	                hideScrollbar: true,
	                mouseWheel: true,
	                onScrollEnd() {
	                    _this.indexM = this.y / 40 * -1 + 1;
	                    _this.year = document.querySelectorAll("#wrapperYear ul li")[_this.indexY + 1].innerHTML;
	                    //公历
	                    if (_this.gongliActive) {
	                        //如果是2月，再判断是否为闰年，
	                        if (_this.indexM === 2) {
	                            _this.isFebruary = true;
	                            if (_this.indexY === 0) {
	                                _this.indexY = _this.myScrollYear.y / 40 * -1 + 1;
	                            }
	                            _this.isRun = Base.isRunYear(_this.year); //闰年
	                            if (_this.isRun) {
	                                _this.TwentyNine = true;
	                                _this.thirty = false;
	                                _this.thirtyOne = false;
	                                _this.refreshDay();
	                            } else {
	                                _this.TwentyNine = false;
	                                _this.thirty = false;
	                                _this.thirtyOne = false;
	                                _this.refreshDay();
	                            }
	                            //不是2月,再判断是否（1,3,5,7,8,10,12），为31天
	                        } else {
	                            _this.isFebruary = false;
	                            for (var i = 0; i < _this.arr1.length + 1; i++) {
	                                if (_this.indexM === _this.arr1[i]) {
	                                    _this.TwentyNine = true;
	                                    _this.thirty = true;
	                                    _this.thirtyOne = true;
	                                    _this.refreshDay();
	                                    break; //break必须加
	                                } else {
	                                    _this.TwentyNine = true;
	                                    _this.thirty = true;
	                                    _this.thirtyOne = false;
	                                    _this.refreshDay();
	                                }
	                            }
	                        }
	                    }

	                    //农历
	                    if (_this.nonliActive) {
	                        _this.actionRefreshMonth();
	                    }
	                }
	            });
	            //日
	            _this.myScrollDay = new Iscroll("wrapperDay", {
	                snap: "li",
	                hScroll: false,
	                vScroll: true,
	                hScrollbar: false,
	                vScrollbar: false,
	                hideScrollbar: true,
	                mouseWheel: true,
	                onScrollEnd() {
	                    _this.indexD = this.y / 40 * -1 + 1;
	                }
	            });
	            //时
	            _this.myScrollTime = new Iscroll("wrapperTime", {
	                snap: "li",
	                hScroll: false,
	                vScroll: true,
	                hScrollbar: false,
	                vScrollbar: false,
	                hideScrollbar: true,
	                mouseWheel: true,
	                onScrollEnd() {
	                    _this.indexT = this.y / 40 * -1 + 1;
	                }
	            });
	        },

	        //点开日历框的时候自动滑到当前选择日期位置
	        currentDatePos:function currentDatePos(obj) {
	            var year = "";
	            var month = "";
	            var day = "";
	            var time = "";
	            year = parseInt(obj.substring(0,4));
	            if(obj.substring(5,7).substr(0,1) == "0") {
	                month = parseInt(obj.substring(5,7).substr(1,1))
	            }else {
	                month = parseInt(obj.substring(5,7))
	            }
	            if(obj.substring(8,10).substr(0,1) == "0") {
	                day = parseInt(obj.substring(8,10).substr(1,1))
	            }else {
	                day = parseInt(obj.substring(8,10))
	            }
	            if(obj.substring(12) === "时辰不清楚" || obj.substring(12) === "") {
	                time = -2;
	            }else if(obj.substring(12) === "子时23点") {
	                time = -1;
	            }else {
	                var pointA = parseInt(obj.substring(12).indexOf("时")) + 1;
	                var pointB = parseInt(obj.substring(12).indexOf("点"));
	                time = parseInt(obj.substring(12).substring(pointA,pointB))
	            }
	            console.info(time);
	            this.getYMDposition(year,month,day,time);
	        },

	        //点击显示选择日历
	        showCalendar() {
	            this.calendarProp.selectCalendar = true;
	            this.gongliModule = true;
	            this.nonliActive = false;
	            // 点开的时候执行找位置函数
	            console.log(this.myScrollYear)
	            if(this.myScrollYear) {
	                if(this.calendarProp.judge == "A") {
	                	// alert(this.calendarProp.birthDataA)
	                    this.currentDatePos(this.calendarProp.birthDataA);
	                }else if(this.calendarProp.judge == "B") {
	                    this.currentDatePos(this.calendarProp.birthDataB);
	                }else {
	                    this.currentDatePos(this.calendarProp.birthData);
	                }
	            }
	        },

	        //点击隐藏选择日历
	        hideCalendar() {
				this.tipsshow = false;
	        	
	        	// alert(this.calendarProp.selectCalendar)
	            this.calendarProp.selectCalendar = false;
	            this.gongliActive = true;
	            this.nonliActive = false;
	        	// alert(this.calendarProp.selectCalendar)
	        },

	        //取年月日时值
	        defaultYearMonthDayTime() {
	            this.indexY = this.myScrollYear.y / 40 * -1 + 1;
	            this.indexM = this.myScrollMonth.y / 40 * -1 + 1;
	            this.indexD = this.myScrollDay.y / 40 * -1 + 1;
	            this.indexT = this.myScrollTime.y / 40 * -1 + 1;
	            this.year = document.querySelectorAll("#wrapperYear ul li")[this.indexY + 1].innerHTML;
	            this.month = document.querySelectorAll("#wrapperMonth ul li")[this.indexM + 1].innerHTML;
	            this.day = document.querySelectorAll("#wrapperDay ul li")[this.indexD + 1].innerHTML;
	            this.time = document.querySelectorAll("#wrapperTime ul li")[this.indexT + 1].innerHTML;
	        },

	        //点击确认日历选择并显示在页面上
	        confirm() {






	        	var time_1,time_2,time_status=1;
	            var _this = this;
	        	let gongliActive = ()=>{
	            	_this.defaultYearMonthDayTime();
	                this.month = Base.doubleNum(this.month);
	                this.day = Base.doubleNum(this.day);
	                if(this.calendarProp.judge == "A") {
	                    time_1 = this.year + "年" + this.month + "" + this.day + "  " + this.time;
	                }else if(this.calendarProp.judge == "B") {
	                    time_1 = this.year + "年" + this.month + "" + this.day + "  " + this.time;
	                }else {
	                    time_1 = this.year + "年" + this.month + "" + this.day + "  " + this.time;
	                }
	            }
	            let nonliActive = ()=>{
	            	_this.defaultYearMonthDayTime();
	                //用月份的坐标位置来代替月份的时候，闰月的情况代替月份会不正确，要减1
	                var temporaryVar = 0;
	                if (_this.indexM > Calendar.leapMonth(_this.year) && Calendar.leapMonth(_this.year) !== 0) {
	                    temporaryVar = _this.indexM - 1;
	                } else {
	                    temporaryVar = _this.indexM;
	                }
	                //传入农历，获得公历信息
	                var isrun = false;
	                if (_this.month.indexOf("闰") > -1) {
	                    isrun = true;
	                }
	                var NumYear = parseInt(_this.year);
	                var NumMonth = parseInt(temporaryVar);
	                var NumDay = parseInt(_this.indexD);
	                var gongliObj = Calendar.lunar2solar(NumYear, NumMonth, NumDay, isrun);
	                _this.transformationGongliYear = gongliObj.cYear;
	                _this.transformationGongliMonth = gongliObj.cMonth;
	                _this.transformationGongliDay = gongliObj.cDay;
	                if(this.calendarProp.judge == "A") {
	                    time_2 = _this.transformationGongliYear + "年" + Base.doubleNum(_this.transformationGongliMonth) + "月" + Base.doubleNum(_this.transformationGongliDay) + "日  " + this.time;
	                }else if(this.calendarProp.judge == "B") {
	                    time_2 = _this.transformationGongliYear + "年" + Base.doubleNum(_this.transformationGongliMonth) + "月" + Base.doubleNum(_this.transformationGongliDay) + "日  " + this.time;
	                }else {
	                    time_2 = _this.transformationGongliYear + "年" + Base.doubleNum(_this.transformationGongliMonth) + "月" + Base.doubleNum(_this.transformationGongliDay) + "日  " + this.time;
	                }
	            }
	            
	        	// 防止滑动时点击确认

	        	let wY = document.getElementById("wrapperYear").getElementsByClassName('rdp-item')[0].style.transform;
	        	let wM = document.getElementById("wrapperMonth").getElementsByClassName('rdp-item')[0].style.transform;
	        	let wD = document.getElementById("wrapperDay").getElementsByClassName('rdp-item')[0].style.transform;
	        	let wT = document.getElementById("wrapperTime").getElementsByClassName('rdp-item')[0].style.transform;

	        	setTimeout(()=>{
	        		let wYn = document.getElementById("wrapperYear").getElementsByClassName('rdp-item')[0].style.transform;
					let wMn = document.getElementById("wrapperMonth").getElementsByClassName('rdp-item')[0].style.transform;
					let wDn = document.getElementById("wrapperDay").getElementsByClassName('rdp-item')[0].style.transform;
					let wTn = document.getElementById("wrapperTime").getElementsByClassName('rdp-item')[0].style.transform;


					if((wY==wYn)&&(wM==wMn)&&(wD==wDn)&&(wT==wTn)){
								
						this.tipsshow = true;
			            if (_this.gongliActive){
							this.nonli()
							setTimeout(()=>{
					            gongliActive()
								nonliActive()
					            console.log('===',time_1,time_2)
					            this.nonglistring = time_1
					            this.gonglistring = time_2


					            this.gongli()
							},80)
			            }else{
			            	setTimeout(()=>{
					            gongliActive()
								nonliActive()
					            console.log('2===1',time_1,time_2)
					            this.nonglistring = time_1
					            this.gonglistring = time_2
							},80)
			            }

					}

	        	},200)

	            
	        },
	        confirmTime(){

	        	this.calendarProp.dateType = this.dateType

				this.tipsshow = false;

	            var _this = this;
	            //如果当前公历高亮，就取当前日期
	            if (_this.gongliActive) {
	                _this.defaultYearMonthDayTime();
	                this.month = Base.doubleNum(this.month);
	                this.day = Base.doubleNum(this.day);
	                if(this.calendarProp.judge == "A") {
	                    this.calendarProp.birthDataA = this.year + "-" + this.month + "-" + this.day + "  " + this.time;
	                }else if(this.calendarProp.judge == "B") {
	                    this.calendarProp.birthDataB = this.year + "-" + this.month + "-" + this.day + "  " + this.time;
	                }else {
	                    this.calendarProp.birthData = this.year + "-" + this.month + "-" + this.day + "  " + this.time;
	                }
	            }
	            //如果当前农历高亮，换算成公历日期
	            if (_this.nonliActive) {
	                _this.defaultYearMonthDayTime();
	                //用月份的坐标位置来代替月份的时候，闰月的情况代替月份会不正确，要减1
	                var temporaryVar = 0;
	                if (_this.indexM > Calendar.leapMonth(_this.year) && Calendar.leapMonth(_this.year) !== 0) {
	                    temporaryVar = _this.indexM - 1;
	                } else {
	                    temporaryVar = _this.indexM;
	                }
	                //传入农历，获得公历信息
	                var isrun = false;
	                if (_this.month.indexOf("闰") > -1) {
	                    isrun = true;
	                }
	                var NumYear = parseInt(_this.year);
	                var NumMonth = parseInt(temporaryVar);
	                var NumDay = parseInt(_this.indexD);
	                var gongliObj = Calendar.lunar2solar(NumYear, NumMonth, NumDay, isrun);
	                _this.transformationGongliYear = gongliObj.cYear;
	                _this.transformationGongliMonth = gongliObj.cMonth;
	                _this.transformationGongliDay = gongliObj.cDay;
	                if(this.calendarProp.judge == "A") {
	                    this.calendarProp.birthDataA = _this.transformationGongliYear + "-" + Base.doubleNum(_this.transformationGongliMonth) + "-" + Base.doubleNum(_this.transformationGongliDay) + "  " + this.time;
	                }else if(this.calendarProp.judge == "B") {
	                    this.calendarProp.birthDataB = _this.transformationGongliYear + "-" + Base.doubleNum(_this.transformationGongliMonth) + "-" + Base.doubleNum(_this.transformationGongliDay) + "  " + this.time;
	                }else {
	                    this.calendarProp.birthData = _this.transformationGongliYear + "-" + Base.doubleNum(_this.transformationGongliMonth) + "-" + Base.doubleNum(_this.transformationGongliDay) + "  " + this.time;
	                }
	            }

			            this.calendarProp.gonglistring = this.gonglistring
			            this.calendarProp.nonglistring = this.nonglistring
					            
			        	console.log('0====')
			        	console.log('000-',this.calendarProp)

	            //一些其它布尔值的修改
	            this.hideCalendar();
	                // alert(_this.nonliActive)
	            // alert(this.calendarProp.birthData)
	        },

	        //滚动年月日，获得相应的日期年、月、日、时，再转化成对应的公历或者农历
	        transformation() {
	            var _this = this;
	            //如果当前公历高亮
	            if (_this.gongliActive) {
	                _this.defaultYearMonthDayTime();
	                //传入公历，获得农历信息
	                var nonliObj = Calendar.solar2lunar(_this.year, _this.month - 1, _this.day);
	                _this.transformationNonliYear = nonliObj.lYear;
	                _this.transformationNonliMonth = nonliObj.lMonth;
	                _this.transformationNonliDay = nonliObj.lDay;
	                //传入农历判断是否有闰月,闰那个月？然后确定在闰月之后的月份
	                var isRun = Calendar.leapMonth(_this.transformationNonliYear);
	                if (isRun !== 0) {
	                    if (nonliObj.IMonthCn.indexOf("闰") > -1) {
	                        _this.isRunPosition = true;
	                    } else {
	                        if (nonliObj.lMonth > isRun) {
	                            _this.isRunPosition = true;
	                        }
	                    }
	                } else {
	                    _this.isRunPosition = false;
	                }
	                console.info(nonliObj);
	                console.info("农历：" + _this.transformationNonliYear + "-" + _this.transformationNonliMonth + "-" + _this.transformationNonliDay);
	            }

	            //如果当前农历高亮
	            if (_this.nonliActive) {
	                _this.defaultYearMonthDayTime();
	                //用月份的坐标位置来代替月份的时候，闰月的情况代替月份会不正确，要减1
	                var temporaryVar = 0;
	                if (_this.indexM > Calendar.leapMonth(_this.year) && Calendar.leapMonth(_this.year) !== 0) {
	                    temporaryVar = _this.indexM - 1;
	                } else {
	                    temporaryVar = _this.indexM;
	                }
	                //传入农历，获得公历信息
	                var isrun = false;
	                if (_this.month.indexOf("闰") > -1) {
	                    isrun = true;
	                }
	                var NumYear = parseInt(_this.year);
	                var NumMonth = parseInt(temporaryVar);
	                var NumDay = parseInt(_this.indexD);
	                var gongliObj = Calendar.lunar2solar(NumYear, NumMonth, NumDay, isrun);
	                _this.transformationGongliYear = gongliObj.cYear;
	                _this.transformationGongliMonth = gongliObj.cMonth;
	                _this.transformationGongliDay = gongliObj.cDay;
	                console.info("公历：" + _this.transformationGongliYear + "-" + _this.transformationGongliMonth + "-" + _this.transformationGongliDay);
	            }
	        },

	        //解决用户在日历滚动过程中，突然点击导致滚动停止造成对不齐的bug
	        alignment(obj) {
            // return function () {
                var currentP = obj.y;
                if(currentP % 40 === 0) {
                    console.info("当前滚动结束的位置是正确的");
                    console.info(currentP);
                }else {
                    var correctP = parseInt(currentP) - parseInt(currentP) % 40;
                    obj.scrollTo(0, correctP, 200);
                }
            // };
	        }
        }
    }
</script>