function removeBackground() {
  var fileInput = document.getElementById("file");
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append("image_file", file);

  // Show loading indicator
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = '<p class="loading">Removing background...</p>';

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "EUxiqEScPmMNJy86Zn8EUa5o",
      "X-Api-Key": "8UvDuz97hr15MGsPGKfkadNS",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      var url = URL.createObjectURL(blob);

      // Clear loading indicator
      resultDiv.innerHTML = "";

      var image = new Image();
      image.src = url;
      image.classList.add("animate__animated", "animate__fadeIn");
      resultDiv.appendChild(image);

      // Create download link
      var link = document.createElement("a");
      link.href = url;
      link.download = "background_removed.png";
      var span = document.createElement("span");
      span.innerHTML = "Download <i class='fas fa-download'></i>";
      link.appendChild(span);
      resultDiv.appendChild(link);
    })
    .catch((error) => {
      console.error("Error removing background:", error);
      // Display error message
      resultDiv.innerHTML =
        '<p class="error">Error removing background. Please try again.</p>';
    });
}
