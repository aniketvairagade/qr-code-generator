const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
 downloadBtn = wrapper.querySelector(".qr-code button"); // download btn code start



generateBtn.addEventListener("click", () => {
    console.log("genrating QR Code ");

    let qrValue = qrInput.value;
    if(!qrValue) return; // if the input is empty then return form here
    generateBtn.innerText = "Generating QR Code...";
    // getting a QR code of user entered value using the qrserver
    // api and passing the api returned img src to qrImg
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImg.addEventListener("load", () => { // once QR code img loaded
        wrapper.classList.add("active");
        generateBtn.innerText = "Generating QR Code";
    });
    console.log("genrating QR Code sucessfully");
});


// download btn code start
downloadBtn.addEventListener("click", () => {
    console.log("download QR Code called ");
    let img = document.querySelector(".qr-code img");

    if(img !== null){
        let imgAtrr = img.getAttribute("src"); 
        console.log(imgAtrr);
        downloadImage(imgAtrr);
        
        // downloadBtn.getElementById("downloadBtns", imgAtrr);
        // document.getElementById('downloadBtn').src = imgAtrr;
    }
    else{
        downloadBtn.setAttribute("href", `${document.querySelector("canvas").toDataURL}`);

    }
});


async function downloadImage(
    imageSrc,
    nameOfDownload = 'Qr_Code.png',
  ) {
    const response = await fetch(imageSrc);
  
    const blobImage = await response.blob();
  
    const href = URL.createObjectURL(blobImage);
  
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;
  
    document.body.appendChild(anchorElement);
    anchorElement.click();
  
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }

// download btn code end


qrInput.addEventListener("keyup", () => {
    if(!qrValue.value) {
        wrapper.classList.remove("active");
    } 
});