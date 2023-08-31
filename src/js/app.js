let imagesForUpload = [];

const types = ['image/jpg', 'image/png']

let dragAndDrop = document.querySelector('.drag-and-drop'),
    imagesList = document.querySelector('.images-list'),
    btn = document.querySelector('.btn')

dragAndDrop.addEventListener('dragenter', (e) => {
    e.preventDefault()
    dragAndDrop.classList.add('active')
})
dragAndDrop.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dragAndDrop.classList.remove('active')
})
dragAndDrop.addEventListener('dragover', (e) => {
    e.preventDefault()
})

dragAndDrop.addEventListener('drop', (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    for (let key in files) {
        if (!types.includes(files[key].type)) {
            continue;
        }
        imagesForUpload.push(files[key])
        let imageTmpUrl = URL.createObjectURL(files[key])
        imagesList.innerHTML += `<img src="${imageTmpUrl}" class="images-list-picture" alt="">`
    }
    if (imagesForUpload.length > 0) {
        btn.removeAttribute('disabled')
    }
})

const uploadImages = () => {
    let formData = new FormData();
    for (let key in imagesForUpload) {
        formData.append(key, imagesForUpload[key])
    }
    fetch('/core/upload.php', {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            if (result.status) {
                imagesForUpload = []
                imagesList.innerHTML = ``
                btn.setAttribute('disabled', true)
                alert('File uploaded successfully')
            }
            else {
                alert('File not uploaded')
            }
        })
}