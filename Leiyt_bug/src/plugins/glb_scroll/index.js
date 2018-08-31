


const SCROLL = ( $Glb , Vue ) => {

	$Glb.scroll = function(calback){
			
	    window.addEventListener('scroll',function(event){
	        let topPX = document.documentElement.scrollTop||document.body.scrollTop;
	        let fontSIZE = (window.innerWidth/750)*100;
	        let topREM = topPX/fontSIZE;
	    	calback( topPX , topREM , fontSIZE )
	      })
	}

}



export default SCROLL




