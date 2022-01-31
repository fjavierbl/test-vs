function iniciar() 
{
	maximo=700;
	
	medio=document.getElementById('medio');
	reiniciar=document.getElementById("reiniciar");
	retrasar=document.getElementById("retrasar");
	play=document.getElementById('play');
	adelantar=document.getElementById("adelantar");
	silenciar=document.getElementById("silenciar");
	menosVolumen=document.getElementById("menosVolumen");
	masVolumen=document.getElementById("masVolumen");
	barra=document.getElementById('barra');
	progreso=document.getElementById('progreso');
	
	reiniciar.addEventListener("click", accionReiniciar, false);
	retrasar.addEventListener("click", accionRetrasar, false);
	play.addEventListener('click', accionPlay, false);
	adelantar.addEventListener("click", accionAdelantar, false);
	silenciar.addEventListener("click", accionSilenciar, false);
	menosVolumen.addEventListener("click", accionMenosVolumen, false);
	masVolumen.addEventListener("click", accionMasVolumen, false);
	barra.addEventListener('click', desplazarMedio, false);
}

function setVolumen(valor) 
{
	var volumen = medio.volume;
	
	volumen += valor;

	if (volumen >= 0 && volumen <= 1) 
	{
		medio.volume = volumen;
	} 
	else 
	{
		if (volumen < 0)
			medio.volume = 0;
		else
			medio.volume = 1;
	}
}

function accionMenosVolumen()
{
	setVolumen(-.1) 
}

function accionMasVolumen()
{
	setVolumen(.1) 
}

function setTiempo(tValue) 
{
	if (tValue == 0) 
	{
		medio.currentTime = tValue;
	}
	else 
	{
		medio.currentTime += tValue;
	}
	
	redimensionaBarra();
}
			 
function accionRetrasar()
{
	setTiempo(-5);
}

function accionAdelantar()
{
	setTiempo(5);
}

function accionReiniciar()
{
	setTiempo(0);
}

function accionPlay()
{
	if(!medio.paused && !medio.ended) 
	{
		medio.pause();
		play.value='\u25BA';
		window.clearInterval(bucle);
	}
	else
	{
		medio.play();
		play.value='||';
		bucle=setInterval(redimensionaBarra, 1000);
	}
}

function accionSilenciar()
{
	if (medio.muted) 
	{
		medio.muted = false;
		silenciar.value = "silenciar";
	} 
	else 
	{
		medio.muted = true;
		silenciar.value = "escuchar";
	}
}

function redimensionaBarra()
{
	if(!medio.ended)
	{
		var total=parseInt(medio.currentTime*maximo / medio.duration);
		progreso.style.width=total+'px';
	}
	else
	{
		progreso.style.width='0px';
		play.value='\u25BA';
		window.clearInterval(bucle);
	}
}

function desplazarMedio(e)
{
	if(!medio.paused && !medio.ended)
	{
		var ratonX=e.pageX-barra.offsetLeft;
		var nuevoTiempo=ratonX*medio.duration/maximo;
		medio.currentTime=nuevoTiempo;
		progreso.style.width=ratonX+'px';
	}
}

window.addEventListener('load', iniciar, false);