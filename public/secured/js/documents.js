
document.addEventListener("DOMContentLoaded", function(event) {
    let token = sessionStorage.getItem("token");
    verifyToken(token, getDocs);
});


let docs = [];

const getDocs = async function() {

    fetch(baseUrl + '/secured/docs', {
        method: 'GET',
        // headers: {"Content-Type": "application/json", 'x-bsm-token': token},
    }).then(async (res)=>{
        const json = await res.json();
        console.log('docs:', json);

        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody");

        if (res.status == 200) {

            docs = json.data;

            const tbody = document.querySelector("tbody");

            docs.forEach(el => {

                const tr = document.createElement("tr");

                const id = document.createElement("td");
                id.innerHTML = el.id;
                id.style = "display:none;";
                tr.appendChild(id);

                const label = document.createElement("td");
                label.innerHTML = el.label;
                tr.appendChild(label);

                const value = document.createElement("td");
                value.innerHTML = el.value;
                tr.appendChild(value);

                const price = document.createElement("td");
                price.innerHTML = el.price;
                tr.appendChild(price);

                tbody.appendChild(tr);
                
            });
            
        }

    }).catch((error) => {
        console.log('Error getDocs:', error);
    });
}