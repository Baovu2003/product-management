console.log("Đã vào file script.js bên admin");

// ---------------------Xử lý button status-----------------------
// Đầu tiên lấy ra hết các button status
const buttonStatus = document.querySelectorAll("[button-status]");
console.log(buttonStatus);
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  console.log("url", url);

  buttonStatus.forEach((button) => {
    console.log(button);
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      console.log(status);

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      console.log("url.href", url.href);

      //Sau khi chỉnh sửa URL,
      //trang web sẽ được điều hướng (redirect) đến URL mới với trạng thái vừa chọn.
      window.location.href = url.href;
    });
  });
}

// --------------------------------Phần search--------------------------

//Nếu không xử lý bên dưới thì khi không nhập gì nó sẽ hiện ra cái này:
// http://localhost:3000/admin/products?keyword=

// Xử lý cái này để có thể xoá đc cái keyword trên thanh url khi không nhập gì
// http://localhost:3000/admin/products
const formSeach = document.querySelector("#form-search");
console.log(formSeach);
if (formSeach) {
  let url = new URL(window.location.href);
  formSeach.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.elements.keyword.value);
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

//-------------------------------Phần PAGINATION------------------------------
const buttonPagination = document.querySelectorAll("[button-pagination]");

let url = new URL(window.location.href);
buttonPagination.forEach((button) => {
  button.addEventListener("click", () => {
    const pagination = button.getAttribute("button-pagination");
    url.searchParams.set("page", pagination);
    window.location.href = url.href;
  });
});
