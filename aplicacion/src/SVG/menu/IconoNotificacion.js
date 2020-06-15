import React from 'react';

const IconoNotificacion = (props) => { return(
<svg width="30px" height="30px" viewBox="0 0 512 512" {...props}>
<title/>
<linearGradient id="rojo_naranja">
<stop offset="0" stopColor="#EE7752"/>
<stop offset=".5" stopColor="#E51b1b"/>
<stop offset="1" stopColor="#FA1212"/>
</linearGradient>

<path fill="url(#rojo_naranja)" d="M467.819,431.851l-36.651-61.056c-16.896-28.181-25.835-60.437-25.835-93.312V224
	c0-82.325-67.008-149.333-149.333-149.333S106.667,141.675,106.667,224v53.483c0,32.875-8.939,65.131-25.835,93.312
	l-36.651,61.056c-1.984,3.285-2.027,7.403-0.149,10.731c1.899,3.349,5.461,5.419,9.301,5.419h405.333
	c3.84,0,7.403-2.069,9.301-5.419C469.845,439.253,469.803,435.136,467.819,431.851z M72.171,426.667l26.944-44.907
	C118.016,350.272,128,314.219,128,277.483V224c0-70.592,57.408-128,128-128s128,57.408,128,128v53.483
	c0,36.736,9.984,72.789,28.864,104.277l26.965,44.907H72.171z"/>

</svg>
)}

export default IconoNotificacion;