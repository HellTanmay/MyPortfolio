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
const loading=document.getElementById('submit-btn')
const mes=document.getElementById('mes')
form.addEventListener('submit',async function(e){
    e.preventDefault()
    const formData={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        message:document.getElementById('message').value
    }
    // if(!formData.name || formData.email || formData.message){
    //     mes.style.display='flex';
    //     mes.innerhtml='Fields cannot be empty';
    //     mes.style.color='red';
    //     mes.style.backgroundColor='#8923234b';
    //     return;
    // }
    try {
        loading.classList.add('load')
        const response=await fetch('https://myportfolio-ekhc.onrender.com',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        })
        const res=await response.json();
        console.log(res)
        if(res.success){
            mes.style.display = 'flex';
            mes.innerHTML = 'Email sent successfully!';
            mes.style.color = '#9dff00';
            mes.style.backgroundColor = '#5d89234b';
            mes.style.opacity=1;
            form.reset()
        }
        else{
            mes.style.display = 'flex';
            mes.innerHTML = 'Email not sent. Please try again.';
            mes.style.color = 'red';
            mes.style.backgroundColor = '#8923234b';
            mes.style.opacity=1;
        }
    } catch (error) {
        console.log(error)
    }
    finally {
        loading.classList.remove('load');
        setTimeout(() => {
            mes.style.display = 'none';
          }, 5000);
        
      }
})

