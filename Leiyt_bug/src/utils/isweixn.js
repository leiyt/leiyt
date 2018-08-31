export function is_weixn(){ 
	var ua = navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i)=="micromessenger"||window.navigator.userAgent.indexOf("QQ/") > -1) { 
		return true; 
	} else { 
		return false; 
	} 
}

