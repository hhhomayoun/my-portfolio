const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
const date = document.querySelector("#date");
navToggle.addEventListener('click', () => {
  const linksContainerHeigth = linksContainer.getBoundingClientRect().height;
  const linksHeigth = links.getBoundingClientRect().height;
  if (linksContainerHeigth === 0) {
    linksContainer.style.height = `${linksHeigth}px`;
  } else {
    linksContainer.style.height = 0;
  }

})

const navBar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll', () => {
  const scrollHeigth = window.pageYOffset;
  const navHeigth = navBar.getBoundingClientRect().height;

  if (scrollHeigth > navHeigth) {
    navBar.classList.add('fixed-nav');
  } else {
    navBar.classList.remove('fixed-nav');

  }

  if (scrollHeigth > 500) {
    topLink.classList.add('show-link');

  } else {
    topLink.classList.remove('show-link');
  }
})


const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    // calculate the heigths
    const navHeight = navBar.getBoundingClientRect().height;
    const linksContainerHeigth = linksContainer.getBoundingClientRect().height;
    const fixedNav = navBar.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 84) {
      position = position + linksContainerHeigth;
    }
    console.log(position);
    window.scrollTo({
      left: 0, top: position,
    })
    linksContainer.style.height = 0;
  })
})

date.innerHTML = new Date().getFullYear()