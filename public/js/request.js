document.addEventListener("DOMContentLoaded", function(event) { 

    const el = document.querySelector("input[name='date']");

    const today = new Date();
    var date = moment(today).format('YYYY-MM-DD');    
    el.min = date;
    el.value = date;

  
    el.addEventListener('input', function(e){
        var day = new Date(this.value).getUTCDay();
        console.log(this.value);
        if([6,0].includes(day)){
            e.preventDefault();
            this.value = '';
            alert('Not available on weekends');
        }
    });
  });