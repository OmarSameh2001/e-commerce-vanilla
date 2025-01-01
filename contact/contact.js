
  const form = document.getElementById('contact_form');
  
  form.addEventListener('submit', function(event) {

    event.preventDefault();
    
 
    alert("Your message has been sent!");
    

    form.reset();
  });
