let container=document.getElementById("displayalldata");
let usersData=JSON.parse(localStorage.getItem('AllusersData')) ||[];
// console.log(usersData)
renderData(usersData)
function renderData(data){
    let domTablerows=data.map(item=> createRows(item.uniqueId,item.name,item.Age,item.Designation,item.Priority,item.Vaccine)).join('');
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
        <td class="redDelete">Delete</td>
        <td class="greenVaccinate">Vaccinate</td>
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
                    <th>
                        DELETE
                    </th>
                    <th>
                        VACCINATE
                    </th>
                </thead>
            ${tr}
        </table>
            `;
            container.innerHTML=`
            <h1>All User's Data</h1>
            ${card}
            `;
            handleDeleteClick(usersData);
            // handlevaccinateBtnsClick(usersData)
    }
  
    function handleDeleteClick(usersData) {
        let deleteBtns = document.getElementsByClassName("redDelete");
        for (let el of deleteBtns) {
            el.addEventListener("click", (event) => {
                let uid = el.parentElement.dataset.uid;
                for (let i = 0; i < usersData.length; i++) {
                    if (usersData[i].uniqueId === uid) {
                        usersData.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem("AllusersData", JSON.stringify(usersData));
                renderData(usersData);
                location.reload();
            })
        }
    }
  

                //  functionality for sorting and filtering 
    let age_u=document.getElementById("Age");
    let prior=document.getElementById("Priority");
    let vacci=document.getElementById("Vaccine");
    vacci.addEventListener("change",(e)=>{
let c=e.target.value;
filteringbyvaccine(usersData,c)
    })
    prior.addEventListener("change",(e)=>{
let c=e.target.value;
filteringbyprior(usersData,c)
    })
    age_u.addEventListener("change",(e)=>{
let c=e.target.value;
sorting(usersData,c)
    })

    function filteringbyvaccine(data,c){
    let newFdata=data.filter(item=>{
        if(item.Vaccine==c){
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
            return a.Age - b.Age;
        }else if(c=="Dsc"){
            return b.Age - a.Age;
        }
    })
    renderData(data)
    }
                    //otp functionality part
                    //OTP VERIFIACTON
     function verifyOTP(uid, enteredOTP) {
                        let UsersData = JSON.parse(localStorage.getItem("AllusersData")) || [];
                        for(let i=0;i<UsersData.length;i++){
                            if(UsersData[i].uniqueId === uid){
                                if(UsersData[i].Otp===(+enteredOTP)){
                                    UsersData.splice(i,1)
                                    localStorage.setItem("AllusersData", JSON.stringify(UsersData));
                                    return true;
                                }  
                            } 
                        }  
                        return false;
                    }
                    

                                // OTP GENRATION AND HANDELING ALL PROCESS
    let vaccinateButtons = document.querySelectorAll(".greenVaccinate");
    vaccinateButtons.forEach(function(button) {
                        button.addEventListener("click", function() {
                            let row = button.parentNode;
                            let uid = row.dataset.uid;
                            // Verify OTP
                            let otp = prompt("Enter OTP:");
                            if (verifyOTP(uid, otp)) {
                                alert(`${row.dataset.name} added to queue. Please wait...`);
                                let otpcont=document.getElementById("otp");
                                 otpcont.classList.toggle("my-otp")
                                // Show alerts
                                setTimeout(() => {
                                    alert(`Vaccinating ${row.dataset.vaccine}`);
                                }, 5000);
                                setTimeout(() => {
                                    otpcont.classList.toggle("my-otp")
                                    alert(`${row.dataset.name} vaccinated`);
                                }, 10000);
                    
                                // Remove row from table
                                // renderData(usersData)
                                row.remove();
                    
                                // Store user in local storage
                                let vaccinated = JSON.parse(localStorage.getItem("vaccinated")) || [];
                                vaccinated.push({
                                    uid: uid,
                                    name: row.dataset.name,
                                    vaccine: row.dataset.vaccine,
                                    age:row.dataset.age,
                                    Priority:row.dataset.priority,
                                    designation:row.dataset.designation

                                });
                                localStorage.setItem("vaccinated", JSON.stringify(vaccinated));
                            } else {
                                alert("Invalid OTP");
                            }
                        });
    });
                    



























// let optvar=0;
// function myuser(){
//     let otpform=document.getElementById("otpform");
  
//     otpform.addEventListener("submit",(e)=>{
//         e.preventDefault();
//         let otp=`${otpform.istdigit.value}${otpform.nddigit.value}${otpform.rddigit.value}${otpform.thdigit.value}`;
//        optvar=(+otp);
        
//     })
// }
//                     //otp functionality part

// // completing vaccination button click and funciton 
// let arrforvaccinated=[];

// function handlevaccinateBtnsClick(usersData) {
//     let vaccinateBtns = document.getElementsByClassName("greenVaccinate");
//     for (let el of vaccinateBtns) {
//         el.addEventListener("click", (event) => {
//             let uid = el.parentElement.dataset.uid;
//             let otpcont=document.getElementById("otp");
//                     otpcont.classList.toggle("my-otp")
                    
//             for (let i = 0; i < usersData.length; i++) {
//                 if (usersData[i].uniqueId === uid) {
//                     console.log(usersData[i].uniqueId,uid,usersData[i].Otp,optvar)
                    
//                     myuser();
//                     if(usersData[i].Otp==optvar){
//                         alert("otp is correct")
//                         arrforvaccinated.push(usersData[i])
//                         // usersData.splice(i, 1);
//                         break;
//                     }else{
//                         alert("Enter correct otp")
//                     }

                    
//                 }
//             }
//             localStorage.setItem("AllusersData", JSON.stringify(usersData));
//             localStorage.setItem("vaccinated", JSON.stringify(arrforvaccinated));
//             renderData(usersData);
//         })
//     }
// }

