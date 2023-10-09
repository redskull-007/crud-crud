<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <title> Appointment booking App </title>
  </head>
  <body>
    <body background="s.jpg">
    <div class="container my-5">
      <h2 class="text-center">Book a Slot</h2>
      <h5 class="text-center">Book a Slot and our representative will call you within 1 hr of selected time</h5>
      <form onsubmit="saveToaxios(event)">
      <form id="booking-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Enter your name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" placeholder="Enter your email">
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="tel" class="form-control" id="phone" placeholder="Enter your phone number">
        </div>
        <div class="form-group">
          <label for="time">Time</label>
          <input type="date" class="form-control" id="time" >
        </div>
        <button type="submit" class="btn btn-primary">Get a call</button>
      </form>
    </div>
<ul id='listOfUsers'></ul>
<script src = "https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js"></script>
<script>
  function saveToaxios(event){
      event.preventDefault();
      const name = event.target.name.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const time = event.target.time.value;
      
      
      const obj = {
          name,
          email,
          phone,
          time
      }
      axios.post("https://crudcrud.com/api/ca0e8eb4d0d44d959c8f107610e1427f/appointmentdata",obj)
         .then((response) =>{
          showNewUserOnScreen(response.data)
      })
         .catch((error) =>{
           document.body.innerHTML=document.body.innerHTML + "<h4> something went wrong </h4>"
          console.log(error)
         })
      
  }
  window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/ca0e8eb4d0d44d959c8f107610e1427f/appointmentdata")
         .then((response) =>{
         console.log(response)
         for (var i=0;i<response.data.length; i++)
         {
          showNewUserOnScreen(response.data[i])
         }
     })
         .catch((error) =>{
          document.body.innerHTML=document.body.innerHTML + "<h4> something went wrong </h4>"
          console.log(error)
         })
 })       

  function showNewUserOnScreen(user){
    document.getElementById('email').value=''
    document.getElementById('name').value=''
    document.getElementById('phone').value=''
    document.getElementById('time').value=''
  
const parentNode = document.getElementById('listOfUsers');
const childHTML = `<li id=${user._id}> ${user.email} - ${user.name}- ${user.phone}- ${user.time}
                       <button onclick = deleteUser('${user._id}')>Delete User</button>
                       <button onclick = editUserDetails('${user.email}','${user.name}','${user.phone}','${user.time}','${user._id}')>Edit user</button>
                       </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML
  }

  //edit user

function editUserDetails(email,name,phone,time,userId){
  document.getElementById('email').value=email;
  document.getElementById('name').value=name;
  document.getElementById('phone').value=phone;
  document.getElementById('time').value=time;
   deleteUser(userId)
}


//delete user

function deleteUser(userId){
  axios.delete(`https://crudcrud.com/api/ca0e8eb4d0d44d959c8f107610e1427f/appointmentdata/${userId}`)
  .then((response) =>{
          removeUersFromScreen(userId)
      })
         .catch((error) =>{
           document.body.innerHTML=document.body.innerHTML + "<h4> something went wrong </h4>"
          console.log(error)
         })
}
function removeUersFromScreen(userId){
const parentNode=document.getElementById('listOfUsers');
const childNodetoBeDeleted=document.getElementById(userId)
if(childNodetoBeDeleted){
  parentNode.removeChild(childNodetoBeDeleted)
    }
}
</script>
</body>
</html>

