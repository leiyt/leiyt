


const FUNC = ( $Glb , Vue ) => {

	$Glb.urlquery = function (variable){
      var query = window.location.href.slice(window.location.href.indexOf('?')).substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
      }
      return(false);
    }

  $Glb.getAttribute = function(){
    var obj = {};

    function getQD(){
      let arr = window.location.pathname.split('/');
      if(arr.length>3){
        return arr[2]
      }else{
        return $Glb.urlquery('qd')||''
      }
    }
    function getPosid(){
      return $Glb.urlquery('posId')||$Glb.urlquery('posid')||''
    }
    obj['posId'] = getPosid()
    obj['qd'] = getQD()
    return obj
  }

  $Glb.baiduCount = function(label,even){
    label = label+'-'+(this.getAttribute().qd==''?'其他':this.getAttribute().qd);
    window._hmt && window._hmt.push(['_trackEvent', label, even||'click']);
  }





}



export default FUNC




