let container=document.getElementById("present");
let VaccinatedusersData=JSON.parse(localStorage.getItem('vaccinated')) ||[];
// console.log(usersData)
renderData(VaccinatedusersData)
function renderData(data){
    let domTablerows=data.map(item=> createRows(item.uid,item.name,item.age,item.designation,item.Priority,item.vaccine)).join('');
    displaytable(domTablerows)
}

function createRows(uid,name,age,Designation,Priority,Vaccine){
    
    let tr=`
    <tr class="rowoftb" data-uid=${uid} data-name=${name} data-vaccine=${Vaccine}
    data-age=${age} data-priority=${Priority} data-designation=${Designation}
    >
        <td>${uid}</td>
        <td>${name}</td>
        <td>${age}</td>
        <td>${Designation}</td>
        <td>${Priority}</td>
        <td>${Vaccine}</td>
    </tr>
    `;
    return tr;
    }
    function displaytable(tr){
            let card =`
            <table>
                <thead>
                    <th>
                        UNIQUE ID 
                    </th>
                    <th>
                        NAME 
                    </th>
                    <th>
                        AGE 
                    </th>
                    <th>
                        DESIGNATION
                    </th>
                    <th>
                        PRIORITY
                    </th>
                    <th>
                        VACCINE
                    </th>
                </thead>
            ${tr}
        </table>
            `;
            container.innerHTML=`
            <h1>All Vaccinated User's</h1>
            ${card}
            `;
    }

    // filtering sorting 
    let age_u=document.getElementById("Age");
    let prior=document.getElementById("Priority");
    let vacci=document.getElementById("Vaccine");
    vacci.addEventListener("change",(e)=>{
        let c=e.target.value;
        filteringbyvaccine(VaccinatedusersData,c)
    })

    prior.addEventListener("change",(e)=>{
        let c=e.target.value;
        filteringbyprior(VaccinatedusersData,c)
    })

    age_u.addEventListener("change",(e)=>{
        let c=e.target.value;
        sorting(VaccinatedusersData,c)
    })

    function filteringbyvaccine(data,c){
    let newFdata=data.filter(item=>{
        if(item.vaccine==c){
            return item;
        }else if(c==""){
            return item;
        }
    })
    renderData(newFdata)
    }
    function filteringbyprior(data,c){
    let newFdata=data.filter(item=>{
        if(item.Priority==c){
            return item;
        }else if(c==""){
            return item;
        }
    })
    renderData(newFdata)
    }
    function sorting(data,c){
   data.sort((a,b)=>{
        if(c=="Asc"){
            return a.age - b.age;
        }else if(c=="Dsc"){
            return b.age - a.age;
        }
    })
    renderData(data)
    }