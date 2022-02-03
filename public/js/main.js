// Responsive navbar
const navToggler = document.querySelector('.nav-toggler')
const navMenu = document.querySelector('.site-navbar ul')
const navLinks = document.querySelectorAll('.site-navbar a')
const navbar = document.querySelector('.navbar-area')

allEventListners()

function allEventListners() {
    navToggler.addEventListener('click', togglerClick)
    navLinks.forEach(elem => elem.addEventListener('click', navLinkClick))
}

function togglerClick() {
    navToggler.classList.toggle('toggle-open')
    navMenu.classList.toggle('open')
    navbar.classList.toggle('open')
}

function navLinkClick() {
    if (navMenu.classList.contains('open')) {
        navToggler.click()
    }
}



// Navbar links (onClick function)
const btns = document.querySelectorAll(".site-navbar ul li a")
const navElmt = [...btns]

navElmt.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()

        const href = btn.getAttribute('href')
        const div = document.querySelector(href)

        const getCumulativeOffset = obj => {
            let left, top;
            left = top = 0;
            if (obj.offsetParent) {
                do {
                    left += obj.offsetLeft;
                    top += obj.offsetTop;
                } while (obj === obj.offsetParent);
            }
            return {
                x: left,
                y: top
            };
        };

        window.scrollTo({
            top: getCumulativeOffset(div).y,
            left: getCumulativeOffset(div).x,
            behavior: "smooth"
        })
    })
})



// Navbar active if on screen
// Selector helper
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

// Event listener
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
            selectEl.addEventListener(type, listener)
        }
    }
}

// Scroll listener
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}

const navbarlinksActive = () => {
    let position = window.scrollY + 330

    for (let btn of btns) {
        if (!btn.hash) return
        let section = select(btn.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            btn.classList.add('active')
        } else {
            btn.classList.remove('active')
        }
    }
}
window.addEventListener('load', navbarlinksActive)
onscroll(document, navbarlinksActive)



// Scroll down homepage
document.querySelector('.arrows').addEventListener("click", () => {
    document.querySelector("#presentation").scrollIntoView({ behavior: "smooth" })
})



// Back to top button
const btnBackTop = document.getElementById("backTop")

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        btnBackTop.classList.add("show")
    } else {
        btnBackTop.classList.remove("show")
    }
})

btnBackTop.addEventListener("click", e => {
    e.preventDefault()
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})



// Filter portfolio
const categories = document.querySelectorAll("#portfolio-filters > li")
const itemsList = document.querySelector("#items-list").children

categories.forEach(elmt => {
    elmt.addEventListener("click", () => {
        categories.forEach(liA => {
            if (liA.classList.contains("filter-active")) {
                liA.classList.remove("filter-active")
            }
        })

        elmt.classList.add('filter-active')

        const filter = elmt.getAttribute('data-filter');

        if (filter === "*") {
            for (let item of itemsList) {
                if (item.classList.contains('hidden')) {
                    item.classList.remove("hidden")
                }
            }
        } else {
            for (let item of itemsList) {
                if (item.classList.contains(filter)) {
                    if (item.classList.contains('hidden')) {
                        item.classList.remove("hidden")
                    }
                } else {
                    item.classList.add("hidden")
                }
            }
        }
    })
})



// Filter portfolio
const projectsList = document.querySelectorAll("#projects .content")

projectsList.forEach(project => {
    project.addEventListener("click", () => {
        if (project.classList.contains("show")) {
            project.classList.remove("show")
        } else {
            projectsList.forEach(projectElmt => {
                if (projectElmt.classList.contains("show")) {
                    projectElmt.classList.remove('show')
                }
            })
            project.classList.add("show")
        }
    })
})



// Card skills
const cardsList = document.getElementsByClassName("skill-item")

for (let card of cardsList) {
    card.addEventListener("click", () => {
        const cardClass = card.classList

        const textClass = card.children.item(2).classList
        const text = card.children.item(2)

        const parent = card.parentElement
        const parentClass = card.parentElement.classList

        const height = parent.offsetHeight + text.offsetHeight


        if (textClass.contains("hidden")) {
            textClass.remove("hidden")
            cardClass.remove("hidden")
            parentClass.remove("hidden")

            parent.setAttribute("style", "height:" + height + "px")
            parent.style.transition = "height .4s"
            return;
        }

        textClass.add("hidden")
        cardClass.add("hidden")
        parentClass.add("hidden")

        parent.setAttribute("style", "height: 75px")
        parent.style.transition = "height .4s"
    })
}