


const VALID = ( $Glb , Vue ) => {
	// 验证手机号
	// this.$Glb.validPhone('手机号')
    $Glb.validPhone = ( val , cif )=>{
	    if( val.length<=0 ){
	    	$Glb.PlMessage('请输入手机号码',800)
	        return false
	    }
	    if(val.length!=11||val[0]!='1') {
	    	$Glb.PlMessage('输入的手机号码格式有误',800)
	        return false
	    }
	    return true
	}
	// 时间格式处理
	// this.$Glb.formatTime(this.calendarProp.birthData)
	// 返回：nopoint  ， newBirthData
	$Glb.formatTime = ( time )=>{
	    let point= "",
		    pointnoselect = false,
		    ymd = time.substring(0,11),
		    calendarProp = {},
		    doubleNum = (data)=>{
		        var result = 0;
		        if(data < 10) {
		            result = "0" + data;
		        }else {
		            result = data;
		        }
		        return result;
		    }
	    if(time.indexOf("点") > -1) {
	        point = time.substring(11,time.indexOf("点"))-0;
	        point = doubleNum(point) + ":00";
	    }else {
	        point = "12:00";
	        pointnoselect = true;
	    }
	    if(time.indexOf("时辰不清楚")<=0){
	        calendarProp.nopoint = 0
	    }else{
	    	calendarProp.nopoint = 1
	    }
	    calendarProp.newBirthData = ymd + point
	    return calendarProp
	}
	// 验证时间是否超过当前时间
	// this.$Glb.validTime(this.calendarProp.birthData)
	$Glb.validTime = ( time )=>{
        let calendarProp = $Glb.formatTime( time );
        var starttime = calendarProp.newBirthData.replace(new RegExp("-","gm"),"/");
        var selecttime = (new Date(starttime)).getTime();
        if(selecttime >= new Date().getTime()){
            $Glb.PlMessage('出生日期不能超过当前日期',800)
            return false
        }
        return true
    }
    // 验证姓名
    // this.$Glb.validName(this.form.name)
    $Glb.validName = ( val )=>{
        if( val === '' ){
            $Glb.PlMessage('姓名不能为空',800)
            return false
        }
        if(val.length < 2){
            $Glb.PlMessage('姓名至少两位',800)
            return false
        }
        if(val.length > 10){
            $Glb.PlMessage('姓名长度超过了限制',800)
            return false
        }
        if(!(/^[\u0391-\uFFE5A-Za-z]{2,20}$/.test(val))){
            $Glb.PlMessage('姓名必须为汉字或者字母',800)
            return false
        }
        return true
    }
    // 验证输入输入不为空，限制 100
    // this.$Glb.validNoCot(this.form.proposal)
    $Glb.validNoCot = ( val )=>{
        if( val.length>0 ){
            if( val.length<=100 ){
                return true
            }else{
                $Glb.PlMessage('输入文字太多了',800)
                return false
            }
        }else{
            $Glb.PlMessage('请输入您的评论',800)
            return false
        }
    }



}



export default VALID




