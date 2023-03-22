//Validate form
function validateForm() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("imagename").innerHTML;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let html = ""
    let isPriceReg = /\d/;
	let isNameReg = /^[A-Za-z ]+$/;
    let isIdReg = /^\d{4}$/;
    let isNumber = function (num) {
        var pattern = /^\d+$/;
        return pattern.test(num);
    }
    if (id == "") {
		alert("Id must be filled out");
		return false;
	}

    
    else if (!id.match(isIdReg)) {
        alert("ID must be 4 digit");
        return false;
    }
  
	
	else if (id == "") {
		alert("Id must be filled out");
		return false;
	}

	else if (!id.match(isIdReg)) {
		alert("ID must be 4 digit");
		return false;
	}
	

	else if (name == "") {
		alert("Product Name must be filled out");
		return false;
	}
    else if(!name.match(isNameReg)){
		alert("Must be Alphabet allowed");
		return false;
	}
	else if (image.length == "") {
		alert("image must be filled out");
		return false;
	}


	else if (price == "") {
		alert("Price must be filled out");
		return false;
	}

	else if (!price.match(isPriceReg)) {
		alert("Price must be in Number");
		return false;
	}

	else if (price < 0) {
		alert("Price must be positive");
		return false;
	}

	else if (description == "") {
		alert("Description must be filled out");
		return false;
	}

	else {
		return true;
	}


}


	

//Show data in table
function showData() {
  let productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productList'));
    }

    let table = document.getElementById("table-body");
    let html = "";
    productList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td><img src='images/" + element.image + "' width='30px' height='30px'/></td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.description + "</td>";
        html += "<td><button type='button' class='btn btn-secondary' onclick='update(" + index + ")'>Edit</button><button type='button' class='btn btn-danger'onclick='remove(" + index + ")'>Delete</button></td>";
        html += "</tr>";

    });
    table.innerHTML = html;
}

document.onload = showData();

//Add Product Data
function addProduct() {
    if (validateForm() == true) {
        let id = document.getElementById("id").value;
        let name = document.getElementById("name").value;
        let image = document.getElementById("image").files[0].name;
        let price = document.getElementById("price").value;
        let description = document.getElementById("description").value;
        var productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        }
        else {
            productList = JSON.parse(localStorage.getItem('productList'));
        }
        productList.push({
            id: id,
            name: name,
            image: image,
            price: price,
            description: description
        });
        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("imagename").innerHTML = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
    }
}


//Edit Product Data
function update(index) {
    var row = JSON.parse(localStorage.getItem("productList"))[index];
    document.getElementById("id").value = row.id;
    document.getElementById("name").value = row.name;
    document.getElementById("imagename").innerHTML = row.image;
    document.getElementById("price").value = row.price;
    document.getElementById("description").value = row.description;
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";


    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            let id = document.getElementById("id").value;
            let name = document.getElementById("name").value;
            let img = document.getElementById("image");
            if (img.onchange == true && img.value != null) {
                pressed();
            }
            let image = document.getElementById("imagename").innerHTML;
            let price = document.getElementById("price").value;
            let description = document.getElementById("description").value;
            var productList = JSON.parse(localStorage.getItem('productList'));
            productList[index].id = id;
            productList[index].name = name;
            productList[index].image = image;
            productList[index].price = price;
            productList[index].description = description;
            localStorage.setItem("productList", JSON.stringify(productList));
            showData();
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("imagename").innerHTML = "";
            document.getElementById("price").value = "";
            document.getElementById("description").value = "";
        }
    }

}
//Remove Product Data
function remove(index) {

    if(confirm("Are you sure?")){
        var productList = JSON.parse(localStorage.getItem('productList'));
        productList.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("imagename").innerHTML = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";

    }
   

}

function clearAllData() {
	localStorage.clear();
	showData();
    console.log('hfjfj')

}

function pressed() {
    document.getElementById("imagename").innerHTML = document.getElementById("image").value.replace("C:\\fakepath\\", "");
}

//Filter By Id
function searchId() {
    let filter = document.getElementById("filterid").value;
    let table = document.getElementById("table-body");
    let row = table.getElementsByTagName("tr");
    for (let i = 0; i < row.length; i++) {
        let td = row[i].getElementsByTagName("td")[0];
        if (td) {
            let idvalue = td.textContent || td.innerHTML;
            if (idvalue.indexOf(filter) > -1) {
                row[i].style.display = "";
            }
            else {
                row[i].style.display = "none";
            }
        }
    }
}



function sortProduct() {
	var productList;
	let sortingValue = document.getElementById("sorting").value;
	if (localStorage.getItem("productList") == null) {
		productList = [];
	}
	else {
		productList = JSON.parse(localStorage.getItem("productList"));
	}

	switch (sortingValue) {
		case "p_id":
			productList.sort(byProductId);
			break;
		case "p_name":
			productList.sort(byProductName);
			break;
		case "p_price":
			productList.sort(byProductPrice);
	}
	localStorage.setItem("productList", JSON.stringify(productList));
	location.reload();
	showData();
}


function byProductId(a, b) {
	return a.id - b.id;
}

function byProductName(a, b) {
	if (a.name < b.name) {
		return -1;
	} else if (a.name > b.name) {
		return 1;
	} else {
		return 0;
	}
}

function byProductPrice(a, b) {
	return a.price - b.price;
}