//audio.play(); 


const PIANO = document.querySelector('.piano')
const pianoKeys = document.querySelectorAll('.piano-key')
const btnContainer = document.querySelector('.btn-container')
const btns = document.querySelectorAll('.btn')
const btnFullscreen = document.querySelector('.fullscreen')
//===========================================================

const playAudio = (x) => {
	let audio = new Audio(`assets/audio/${x}.mp3`);
	audio.play();
}
//=============================================================
btnContainer.addEventListener('click', (event) => {

	
	btns.forEach((item) => {
		item.classList.remove('btn-active')
		event.target.classList.add('btn-active')
	})
	
	
	if (event.target.classList.contains('btn-notes')) {
		pianoKeys.forEach((item) => {
		item.classList.remove('piano-key-letter')
		})
	}

	if (event.target.classList.contains('btn-letters')) {
		pianoKeys.forEach((item) => {
		item.classList.add('piano-key-letter')
		})
	}
})


//================================================================

const startSound = (event) => {
	event.target.classList.add('piano-key-active')
	
	if (event.target.classList.contains('piano-key')) {
		
		let note = event.target.getAttribute('data-note')
		
		playAudio(note)
		
	}
}

const stopSound = (event) => {
	event.target.classList.remove('piano-key-active')
}

const startPlayMusic = (event) => {

	pianoKeys.forEach((item) => {
		
		item.addEventListener('mouseover', startSound)
			
		item.addEventListener('mouseout', stopSound)
		
	})

	startSound(event)
	
}

const endPlayMusic = (event) => {
	pianoKeys.forEach((item) => {
		item.classList.remove('piano-key-active')

		item.removeEventListener('mouseover', startSound)
			
		item.removeEventListener('mouseout', stopSound)
		
	})
}


PIANO.addEventListener('mousedown', startPlayMusic)
PIANO.addEventListener('mouseup', endPlayMusic)

//==========================================================


window.addEventListener('keydown', (event) => {
	let letter = event.code[3]
	
	pianoKeys.forEach((item) => {
		
		if (item.getAttribute('data-letter') == letter) {
	
			let note = item.getAttribute('data-note').toLowerCase()
			
			item.classList.add('piano-key-active')

			playAudio(note)
		}
	})

});

window.addEventListener('keyup', (event) => {
	pianoKeys.forEach((item) => {
		item.classList.remove('piano-key-active')	
	})
})

//===========================================================

btnFullscreen.addEventListener('click', () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}	
})