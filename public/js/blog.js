
//creation de la navbar
(() => {
    
    //Declaration des variables et constants

    let head = document.querySelector(".header")
    let height = head.getBoundingClientRect().height + 100 //On recupere la hauteur du header
    let navbar = head.querySelector(".navbar")
    let cloneNavbar = navbar.cloneNode(true) //On clone le navbar ainsi que ses enfants
    let rect = navbar.getBoundingClientRect()
    let newNavbar = document.createElement("nav") //On creer le nouveau navbar
    let befor = head.querySelector(".container-body")
    let hasScrollHeader = false 
    let isAppend = false
    let items = document.querySelector(".items").cloneNode(true)
        
    //Fonctions

    /**
     * On verifie si on a beaucooup scroller que la hauteur du header
     * On ajoute un navbar sinon on le retire
     * 
     */
    let createNewNavbar = function()
    {
        if(window.scrollY > height && !hasScrollHeader){
            //Si newNavbar n'est pas encore ajoute a son parent (head)
            if(!isAppend){
                cloneNavbar.querySelector(".menu").appendChild(items)
                newNavbar.appendChild(cloneNavbar)
                head.appendChild(newNavbar) 
                hidNewNavbar() //On cache le nouveau navbar
                isAppend = true
            }

            newNavbar.style.display = ""
            window.pageXOffset
            newNavbar.classList.remove("nav--hidden")
            navbar.style.width = rect.width + "px"
            hasScrollHeader = true

        }else if(window.scrollY < height && hasScrollHeader){
            hidNewNavbar()     
            hasScrollHeader = false
        }
    }

    /**
     * On va cacher le nouveau navbar
     */
    let hidNewNavbar = function()
    {
        newNavbar.classList.add("nav--hidden")
        //newNavbar.style.display = "none"
    }

    let onResize = function()
    {
        if(hasScrollHeader === true){
            hidNewNavbar()
        }
        height = head.getBoundingClientRect().height
        navbar.style.width = "auto"
        rect = navbar.getBoundingClientRect()
        hasScrollHeader = false
        createNewNavbar()
    }


    window.addEventListener("scroll", createNewNavbar) //On ecoute le scrole 
    window.addEventListener("resize", onResize)  //On ecoute le redimentionnement

    
    newNavbar.setAttribute("class", "nav")
    

    
})();


//Ajout et suppression de la classe active (scrollSpy)
(() => {

    const ratio = .6;
    let items = document.querySelectorAll('[data-spy]')
    let observer = null


    /**
     * @param {HTMLElement} element 
     *
     */
    const activate = (element) =>
    {
        let id = element.getAttribute("id")
        let anchre = document.querySelector(`[href="#${id}"]`)
        if(anchre === null){
            return 
        }


        anchre.parentElement
            .querySelectorAll(".active")
            .forEach(node => node.classList.remove("active"))
        
        anchre.classList.add("active")
    }

    /**
     * @param {IntersectionObserverEntry} entries 
     * @param {IntersectionObserver} observer 
     */
    const callback = (entries, observer) => 
    {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0){
                activate(entry.target)
            }
        })
        
    }

    /**
     * @param {NodeListOf<HTMLElement>} elements 
     */
    const observe = (elements) => 
    {
        if(observer !== null){
            elements.forEach(element => observer.unobserve(element))
        }

        const y = Math.round(window.innerHeight * ratio)
        observer = new IntersectionObserver(callback, {
            rootMargin: `-${window.innerHeight - y -1}px 0px -${y}px 0px`,
        })

        elements.forEach(element => observer.observe(element))
    }

    /**
     * @param {Function} callback
     * @param {number} delay
     * @return {Function} 
     */
    const debounce = (callback, delay) => 
    {   
        let timer
        return function()
        {
            let args = arguments;
            let context = this;
            clearTimeout(timer);
            timer = setTimeout(function(){
                callback.apply(context, args);
            }, delay)
        }

    }

      
    if(items.length > 0){
        observe(items)
    }

    window.addEventListener("resize", debounce(function(){
        () => observe(items)
    }, 500))


})();

//animation au scroll
(() => {
    const ratio = .4
    let option = {
        root: null,
        rootMargin: '0px',
        threshold: ratio
    }

    const handleIntersect = function (entries, observer)
    {
        entries.forEach(entry => {
            if(entry.intersectionRatio > ratio){

                entry.target.classList.remove("reveal")
                observer.unobserve(entry.target)
            }
        })
    }

    document.documentElement.classList.add("reveal-loaded")
    const observer = new IntersectionObserver(handleIntersect, option);
    document.querySelectorAll('.reveal').forEach(r => {
        observer.observe(r)

    })


})();

//Typing animation
(() => {
    let typing = document.querySelector(".typing")
    let typingIn = document.createElement("span")
    let childrens = [].slice.call(typing.childNodes)
    let height = typing.getBoundingClientRect().height

    typingIn.setAttribute("class", "typing-in")
    childrens.forEach(child => typingIn.appendChild(child))
    typing.appendChild(typingIn)
    typing.style.height = height + "px"
    //typingIn.style.animation = "type 10s linear infinite"
    
    console.log(typing);

})();