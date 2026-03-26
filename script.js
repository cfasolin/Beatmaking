 const btnPlay = document.getElementById("starttempo") // on récupère les boutons Play et Stop
    const btnStop = document.getElementById("stoptempo")
    let interval // on définit interval dans général pour que Stop puisse avoir accès
    let temps = 1 // on définit le premier temps
    let sonAttente = []
    let actifTempo = false
    const playButtons = document.querySelectorAll(".playbuttons")

    btnPlay.addEventListener ("click", () =>  // quand on clique sur Play
    {   
        actifTempo = true
        const beats = document.querySelectorAll(".bttmnt") // on récupère toute la liste de la classe bttmnt 

        clearInterval(interval) // Si interval est lancé, on le clear avant

        interval = setInterval(() => { 
            beats.forEach(beat => { // pour chaque élément de la liste bttmnt
                beat.classList.remove("active") // on enlève la classe active
            })
            beats[temps-1].classList.add("active") // on met la classe active sur le premier temps 0
            sonAttente.forEach(audio => {
                audio.currentTime = 0
                audio.play()
            })
            sonAttente = []
            temps++ // on augmente, temps 1 temps 2 ...
            if (temps > 4) { 
                temps = 1
            }
        }, 500) // temps toutes les 500ms, donc 120 bpm
    }
)

btnStop.addEventListener("click", () => { // récupère bouton Stop
    actifTempo = false
    clearInterval(interval) // on clear interval si lancé 
    temps = 1
    sonAttente = []
    document.querySelectorAll("audio").forEach(audio => {
        audio.pause()
        audio.currentTime = 0
    })
    document.querySelectorAll(".bttmnt").forEach(beat => {
        beat.classList.remove("active") // on enlèves toutes les classes actives
    })
    playButtons.forEach (button => {
        button.classList.remove("active")
    })
})




playButtons.forEach(button => 
    {
    button.addEventListener("click", () => 
        {
        
        if (!actifTempo) {
            return
        }   
        const audioId = button.id.replace("btn", "")
        const audio = document.getElementById(audioId)

        if (audio) 
            {
            if (audio.paused) 
                {
                    if (button.parentElement.id !== "vocals") 
                        {
                        audio.loop = true
                        }
                    else 
                        {
                        audio.loop = false
                        audio.addEventListener("ended", () => {
                            button.classList.remove("active")
                        })      
                        }
                button.classList.add("active")       
                sonAttente.push(audio)
                }

            else 
                {
                button.classList.remove("active")       
                audio.pause()
                audio.currentTime = 0
                }
            }
        }
    )
    }
)
    