import Swal from 'sweetalert2'
import axios from "axios";

export default async (message = 'server connection error'):Promise<void> => {
  let out = true;
  let msg = message
  while (out) {
    const result = await Swal.fire({
      title: msg,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: 'check server connection',
      cancelButtonText: `ok`
    })
    if (result.isConfirmed) {
      msg = 'server connection error'
      try {
        const res = await axios.get(`${process.env.SERVER_URL}/hotels`)
        if (res.status === 200) {
          Swal.fire(`there is an server connection`)
          out = false
        }
      } catch (e){}
    } else if (result.isDenied || result.isDismissed) {
      out = false
    }

  }
}
