document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      emailjs.sendForm('service_kqlmrsz',  'template_5wkb8sv', this) //gantk template email dan dervice id lu
        .then(function() {
          alert("Pesan berhasil dikirim!");
        }, function(error) {
          alert("Pesan gagal dikirim. Coba lagi! Error: " + JSON.stringify(error));
        });
    });