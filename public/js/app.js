let result = "";

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

    load();
  });

const load = async function() {
    console.log('fetching...');
    fetch("http://localhost:8000/blogs").then((res) => {
        res.json().then((data)=>{
            

            data.blogs.forEach(({ title, avatar, intro } = rows) => {
            result += `
            <div class="card">
                    <img class="card-avatar" src="/${avatar}"/>
                    <h1 class="card-title">${title}</h1>
                    <p class="intro">${intro}</p>
                    <a class="card-link" href="#">Read</a>
                </div>
            `;
            });
            document.querySelector(".container").innerHTML = result;
        });

    }).catch((e) => {
        console.log(e);
      });
}
