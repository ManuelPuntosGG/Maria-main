////  Detectar Si Navegador Es Chrome

// document.getElementById("firstAnimation").remove();
// document.documentElement.style.setProperty("--time-chrome", `9s`);
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (isChrome) {
	document.documentElement.style.setProperty("--time-chrome", "0s");
} else {
	// Para Safari y otros, no eliminamos la animación, solo ajustamos el tiempo
	document.documentElement.style.setProperty("--time-chrome", "0s");
	// Si realmente quieres eliminarla en Safari, asegúrate de que no rompa el flujo visual
}

// Formato recomendado: Año, Mes (empezando desde 0), Día, Hora, Minuto, Segundo
// Enero es el mes 0, por lo tanto 24 de enero de 2026 es (2026, 0, 24, 21, 0, 0)
var countDownDate = new Date(2026, 0, 24, 20, 0, 0).getTime();

var x = setInterval(function () {
	var now = new Date().getTime();
	var distance = countDownDate - now;

	// Cálculos de tiempo
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Renderizar en el elemento
	var reloj = document.getElementById("reloj");
	if (reloj) {
		reloj.innerHTML = days + " días " + hours + "hs " + minutes + "m " + seconds + "s ";
	}

	// Al terminar la cuenta
	if (distance < 0) {
		clearInterval(x);
		if (reloj) {
			reloj.innerHTML = "¡LLEGÓ EL GRAN DÍA!";
			// Usando jQuery como en tu ejemplo original
			$(reloj).prev("p").html("Listo...");
		}
	}
}, 1000);
////  Variable --vh y --vw

document.documentElement.style.setProperty(
	"--vh",
	`${window.innerHeight * 0.01}px`
);

document.documentElement.style.setProperty(
	"--vw",
	`${window.innerWidth * 0.01}`
);

const updateViewport = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${window.innerWidth * 0.01}`);
};

window.addEventListener('resize', updateViewport);
window.addEventListener('orientationchange', updateViewport);
updateViewport();

////  Confetti
function confetti() {
	$.each($(".confetti"), function () {
		var confetticount = ($(this).width() / 50) * 8;
		for (var i = 0; i <= confetticount; i++) {
			$(this).append(
				'<span class="particle c' +
				$.rnd(1, 2, 0) +
				'" style="top:' +
				$.rnd(10, 40, 0) +
				"%; left:" +
				$.rnd(0, 100, 0) +
				"%;width: calc(" +
				$.rnd(0.025, 0.875, 3) +
				"vw + 8px) ; height: calc(" +
				$.rnd(0.012, 0.437, 3) +
				"vw + 5px);animation-delay: " +
				$.rnd(25, 45, 0) / 10 +
				's;"></span>'
			);
		}
	});
}

jQuery.rnd = function (m, n, decimales) {
	var precision = Math.pow(10, decimales);
	m = m * precision;
	n = n * precision;
	return Math.floor(Math.random() * (n - m + 1) + m) / precision;
};

confetti();

////  Scroll Transform Gold
let windowHeight = window.innerHeight;
let windowHeight2 = $(window).height();

var $mavi_gold = $("#mavi_gold");
var $mis_quince_gold = $("#mis_quince_gold");
var $mis_quince_gray = $("#mis_quince_gray");
var $marco_gold = $("#marco_gold");

window.onscroll = function () {
    const letterContent = document.querySelector(".letter_content");
    if (!letterContent) return;

    // Obtener posición relativa al viewport
    let rect = letterContent.getBoundingClientRect();
    let letter_num2 = (windowHeight * 1.08) - rect.top;
    
    let letter_num = 0;
    if (letter_num2 > 0) {
        letter_num = Math.min(letter_num2 / (windowHeight * 0.38), 1);
    }

    // Aplicar opacidades con prefijo para asegurar suavidad
    $mavi_gold.css({ "opacity": 1 - letter_num, "webkit-opacity": 1 - letter_num });
    $mis_quince_gold.css({ "opacity": letter_num, "webkit-opacity": letter_num });
    $mis_quince_gray.css({ "opacity": 1 - letter_num, "webkit-opacity": 1 - letter_num });
    $marco_gold.css({ "opacity": 1 - letter_num, "webkit-opacity": 1 - letter_num });
};

////  Horizontal Scroll
$(function () {
	function showSlide(n) {
		// n is relative position from current slide

		// unbind event listener to prevent retriggering
		$body.unbind("mousewheel");

		// increment slide number by n and keep within boundaries
		currSlide = Math.min(Math.max(0, currSlide + n), $slide.length - 1);

		var displacment = $(window).width() * 0.85 * currSlide;
		// translate slides div across to appropriate slide
		$slides.css("transform", "translateX(-" + displacment + "px)");
		// delay before rebinding event to prevent retriggering
		setTimeout(bind, 500);

		// change active class on link
		$("a.active").removeClass("active");
		$($(".nav_a")[currSlide]).addClass("active");
	}

	function bind() {
		// $body.bind("mousewheel", mouseEvent); <-- Viejo
		$body.on("wheel", mouseWheelHandler); // <-- Nuevo estándar
	}

	function mouseWheelHandler(e) {
		const delta = e.originalEvent.deltaY;
		showSlide(delta > 0 ? 1 : -1);
		e.preventDefault();
	}

	function mouseEvent(e, delta) {
		// On down scroll, show next slide otherwise show prev slide
		showSlide(delta >= 0 ? -1 : 1);
		e.preventDefault();
	}

	$("nav a").click(function (e) {
		// When link clicked, find slide it points to
		var newslide = parseInt($(this).attr("href")[1]);
		// find how far it is from current slide
		var diff = newslide - currSlide - 1;
		showSlide(diff); // show that slide
		e.preventDefault();
	});

	$(window).resize(function () {
		// Keep current slide to left of window on resize
		var displacment = $(window).width() * 0.85 * currSlide;
		$slides.css("transform", "translateX(-" + displacment + "px)");

		// document.documentElement.style.setProperty(
		// 	"--vw",
		// 	`${window.innerWidth * 0.01}px`
		// );
	});

	// cache
	var $body = $(".scroll");
	var currSlide = 0;
	var $slides = $(".sections");
	var $slide = $("section");

	// give active class to first link
	$($("nav a")[0]).addClass("active");

	// add event listener for mousescroll
	$body.bind("mousewheel", mouseEvent);

	// add event listener for touch
	var ts;
	$body.bind("touchstart", function (e) {
		ts = e.originalEvent.touches[0].clientX;
	});

	$body.bind("touchend", function (e) {
		var te = e.originalEvent.changedTouches[0].clientX;
		if (ts - 15 > te) {
			showSlide(1);
		} else if (te - 15 > ts) {
			showSlide(-1);
		}
	});

	// document.addEventListener(
	// 	"touchstart",
	// 	function (e) {
	// 		console.log(e.defaultPrevented); // will be false
	// 		e.preventDefault(); // does nothing since the listener is passive
	// 		console.log(e.defaultPrevented); // still false
	// 	},
	// 	Modernizr.passiveeventlisteners ? { passive: true } : false
	// );
});
