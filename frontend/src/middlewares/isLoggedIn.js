import Swal from "sweetalert2/dist/sweetalert2.all.min.js"

function isLoggedIn(meta, me, redirect) {
  if (meta == "login" && !me) {
    Swal.fire({
      title: "โปรดลงชื่อเข้าสู่ระบบ",
      icon: "warning",
      showConfirmButton: true,
      timer: 2000,
    })
    return redirect("/signin")
  }
  if (meta == "guest" && me) {
    return redirect("/")
  }
}

export default isLoggedIn
