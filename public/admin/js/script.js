console.log("Đã vào file script.js bên admin");

// Xử lý button status

// Đầu tiên lấy ra hết các button status
const buttonStatus = document.querySelectorAll("[button-status]");
console.log(buttonStatus);
if (buttonStatus.length > 0) {

    let url = new URL( window.location.href);
    console.log("url",url)

  buttonStatus.forEach((button) => {
    console.log(button);
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      console.log(status);

      if(status){
        url.searchParams.set("status", status)
      }else{
        url.searchParams.delete("status")
      }
      console.log("url.href",url.href)

    //Sau khi chỉnh sửa URL,
    //trang web sẽ được điều hướng (redirect) đến URL mới với trạng thái vừa chọn.
      window.location.href = url.href
    });
  });
}
