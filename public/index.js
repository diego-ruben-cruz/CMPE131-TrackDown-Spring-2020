const guideList = document.querySelector(".Inventory");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = user => {
  if (user) {
    // account info
    const html = `
      <div>Logged in as ${user.email}</div>
    `;
    accountDetails.innerHTML = html;
    // toggle user UI elements
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));
  } else {
    // clear account info
    accountDetails.innerHTML = "";
    // toggle user elements
    loggedInLinks.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block"));
  }
};

// setup guides
const setupGuides = data => {
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const Inventory = doc.data();
      let inventoryID = "'" + doc.id + "'";
      const li = `
        <li>
          <div id="itemName" class="collapsible-header grey lighten-4"> ${Inventory.itemName} </div>
          <div id="itemDescription" class="collapsible-body white"> Description: ${Inventory.itemDescription} </div>
          <div id="itemStock" class="collapsible-body white"> Stock: ${Inventory.itemStock} </div> 
          <div class = "collapsible-body">
                <button onclick="deleteButton(${inventoryID})", class ="btn waves-effect red waves-red">Delete</button>
              
            </div>
          
        </li>
      `;

      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML =
      '<h5 class="center-align">Login or Sign Up to access your inventory!</h5>';
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

function deleteButton(id) {
  db.collection('Inventory').doc(id).delete();
}