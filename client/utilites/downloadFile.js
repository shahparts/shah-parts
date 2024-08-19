import axios from 'axios'
import fileDownload from 'js-file-download'


export const downloadFile = (url, filename) => {
    axios.get(url, {
        responseType: 'blob',
    })
        .then((res) => {
            fileDownload(res.data, filename)
        })
}

