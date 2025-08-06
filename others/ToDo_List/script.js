function addTask(){
  
    const name = document.getElementById("userName").value;
      const email = document.getElementById("emailInput").value;
        const phone = document.getElementById("phoneInput").value;

    if(name.trim() === "" || email.trim() === "" || phone.trim() === ""){
        window.alert("Please enter a task");
        return;
    }

    // New task creation
    const newName = document.createElement("div");
    newName.className = "task";
      newName.innerText = name 
    document.getElementById("taskList1").appendChild(newName);

    const newEmail = document.createElement("div");
    newEmail.className = "task";
    newEmail.innerText = email
    document.getElementById("taskList2").appendChild(newEmail);

    const newPhone = document.createElement("div");
    newPhone.className = "task";   
    newPhone.innerText = phone
    document.getElementById("taskList3").appendChild(newPhone);

     

    const allTasks = document.getElementsByClassName("task");
    for(let i = 0; i < allTasks.length; i++){
        allTasks[i].computedStyleMap.backgroundColor = "#e6ffe6";
    }

    

    document.getElementById("userName").value = "";
     document.getElementById("emailInput").value = "";
      document.getElementById("phoneInput").value = "";
}