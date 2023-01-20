const tableParent = document.getElementById("tableParent");
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
  <input class="bg-slate-600 text-white font-medium px-4 w-full py-2  hover:shadow-lg hover:bg-gray-800" type="button" value="UPDATE" onClick="updateUser(${id})">
  <input class="bg-slate-600 text-white font-medium px-4 w-full  py-2  hover:shadow-lg hover:bg-gray-800" type="button" value="DELETE" onClick="deleteUser(${id})">
  

  </div>

</td>`;
  // px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg
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

function updateUser() {
  console.log("deneme");
}

document.deleteUser = deleteUser;
document.updateUser = updateUser;
