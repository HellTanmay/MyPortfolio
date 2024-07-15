// import '../styles/style.css'
// import '../styles/normalizeCss.css'

document.addEventListener('DOMContentLoaded', () => {
  
    // const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    //     target: '#navbar-example2',
    // });
    const menuIcon = document.getElementById('menu-icon');
    const navHeader = document.querySelector('.nav-header');
    const navLinks = document.querySelectorAll('.nav-item1 a');
    const sections=document.querySelectorAll('section')

    menuIcon.addEventListener('click', () => {
        navHeader.classList.toggle('show');
        menuIcon.classList.toggle('open')
    });
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(link => link.classList.remove('active'));
           link.classList.add('active');
            navHeader.classList.remove('show');
            menuIcon.classList.remove('open')
        });
    })
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const link = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    };

    // Intersection Observer options
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value as needed
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    sections.forEach(section => observer.observe(section));
});


document.addEventListener('DOMContentLoaded', () => {
    const options = {
        strings: ["Mern Stack Developer", "Full Stack Developer", "Frontend Developer", "Backend Developer"],
        typeSpeed: 50,
        backSpeed: 25,
        
        loop: true
    };

    const typed = new Typed("#typed", options);
});


const form =document.getElementById('contact-form')

form.addEventListener('submit',async function(e){
    e.preventDefault()
    const formData={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        message:document.getElementById('message').value
    }
    try {
        const response=await fetch('http://localhost:4000',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        })
        const res=await response.json();
        console.log(res)
        if(res.success){
            alert('email sent')
            form.reset()
        }
        else{
            console.log('not sent')
        }
    } catch (error) {
        console.log(error)
    }
})

