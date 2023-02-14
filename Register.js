let formData=document.getElementById("Registration_form");
let usersData=JSON.parse(localStorage.getItem('AllusersData')) ||[];
formData.addEventListener("submit",(e)=>{
    e.preventDefault();
    let otpnum=getRandomInt(1000, 9999);
   let myformdata={
    uniqueId:formData.UniqueId.value,
    name:formData.uName.value,
    Age:formData.uAge.value,
    Designation:formData.Designation.value,
    Priority:formData.Priority.value,
    Vaccine:formData.Vaccine.value,
    Otp:otpnum
   }
   let flag=true;
   if(usersData.length===0){
    usersData.push(myformdata);
    localStorage.setItem("AllusersData",JSON.stringify(usersData));
    alert(`Registration Scuccessful !!.Please remember your otp after this.`)
    alert(`YOUR OTP FOR VACCINATION IS: ${otpnum}`)
    formData.reset();
   }else{
    for(let i=0;i<usersData.length;i++) {
        if(usersData[i].uniqueId===myformdata.uniqueId){
         alert("This ID is already taken.Please choose other ID!")
         flag=false;
         formData.reset();
         break;
        }       
    }
    if(flag){
        usersData.push(myformdata);
        localStorage.setItem("AllusersData",JSON.stringify(usersData)); 
        alert(`Registration Scuccessful !!.Please remember your otp after this.`)
        alert(`YOUR OTP FOR VACCINATION IS: ${otpnum}`)
        formData.reset();
    }
   }

})

//functions for otp
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

