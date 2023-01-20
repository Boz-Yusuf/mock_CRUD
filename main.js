const tableParent = document.getElementById("tableParent");
const addModal = document.getElementById("addModal");
const modalAddButton = document.getElementById("modalAddButton");
const modalUpdateButton = document.getElementById("modalUpdateButton");
let inputUsername = document.getElementById("inputUsername");
let inputPhoneNumber = document.getElementById("inputPhoneNumber");
let inputCity = document.getElementById("inputCity");
let inputCountry = document.getElementById("inputCountry");

let newUser;
let userList;
getList();

// deleteUser();

function writeUser(id, fullName, phoneNumber, city, country) {
  newUser = document.createElement("tr");
  newUser.innerHTML = `                  
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${id}</td>
<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  ${fullName}
</td>
<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  ${phoneNumber}
</td>
<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  ${city}
</td>
<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  ${country}
</td>
<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  <div class="flex justify-center gap-5">
  <input class="bg-slate-600 text-white font-medium px-4 w-full py-2  hover:shadow-lg hover:bg-gray-800" type="button" value="UPDATE" onClick="updateUser(${id} ,this)">
  <input class="bg-slate-600 text-white font-medium px-4 w-full  py-2  hover:shadow-lg hover:bg-gray-800" type="button" value="DELETE" onClick="deleteUser(${id})">
  
  </div>

</td>`;

  tableParent.append(newUser);
}

async function getList() {
  tableParent.innerHTML = "";
  userList = await fetch("https://63c7cbdce52516043f44ab03.mockapi.io/users");
  //.then((response) => response.json());
  let i = await userList.json();
  i.forEach((user) => {
    writeUser(user.id, user.name, user.phoneNumber, user.city, user.country);
  });
}

async function deleteUser(id) {
  const response = await fetch(
    `https://63c7cbdce52516043f44ab03.mockapi.io/users/${id}`,
    {
      method: "DELETE",
    }
  );
  // await response.text();
  await getList();
}

function updateUser(id, obj) {
  modalAddButton.classList =
    "px-6 py-2.5 bg-blue-600 text-white font-medium text-xs hidden leading-tight  shadow-md hover:bg-blue-700 hover:shadow-lg  ml-1";

  modalUpdateButton.classList =
    "px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  shadow-md hover:bg-blue-700 hover:shadow-lg  ml-1";
  console.log("id: ", id);
  console.log("obj: ", obj.parentElement.parentElement.parentElement);

  addModal.classList = "top-0 left-0 fixed";
  let parent = obj.parentElement.parentElement.parentElement;
  inputUsername.value = parent.childNodes[3].innerHTML;
  inputPhoneNumber.value = parent.childNodes[5].innerHTML;
  inputCity.value = parent.childNodes[7].innerHTML;
  inputCountry.value = parent.childNodes[9].innerHTML;
}

function openModal() {
  modalAddButton.classList =
    "px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  shadow-md hover:bg-blue-700 hover:shadow-lg  ml-1";
  modalUpdateButton.classList =
    "px-6 py-2.5 bg-blue-600 text-white font-medium hidden text-xs hidden leading-tight  shadow-md hover:bg-blue-700 hover:shadow-lg  ml-1";
  addModal.classList = "top-0 left-0 fixed";
}

function discardUser() {
  addModal.classList = "top-0 left-0 fixed hidden";
}

async function addUser() {
  const response = await fetch(
    "https://63c7cbdce52516043f44ab03.mockapi.io/users",
    {
      method: "POST",
      body: JSON.stringify({
        name: inputUsername.value,
        phoneNumber: inputPhoneNumber.value,
        city: inputCity.value,
        country: inputCountry.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  addModal.classList = "top-0 left-0 fixed hidden";
  await getList();
}

async function updateUserInfo() {
  const response = await fetch(
    `https://63c7cbdce52516043f44ab03.mockapi.io/users/4`,
    {
      method: "PUT",
      body: JSON.stringify({
        name: inputUsername.value,
        phoneNumber: inputPhoneNumber.value,
        city: inputCity.value,
        country: inputCountry.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  addModal.classList = "top-0 left-0 fixed hidden";
  await getList();
}

document.deleteUser = deleteUser;
document.updateUser = updateUser;
document.openModal = openModal;
document.discardUser = discardUser;
document.addUser = addUser;
document.updateUserInfo = updateUserInfo;
