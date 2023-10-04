import { useState } from "react";

function App() {
  const [base64Image, setBase64Image] = useState("");

  function handleImageUpload(e) {
    const image = event.target.files[0];
    console.log(image.size);
    if (image.size > 100_000) {
      return alert("too big");
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(image);
  }

  async function handleSubmitImage(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/images/upload", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        base64Image,
      }),
    });
  }
  return (
    <>
      <form onSubmit={handleSubmitImage}>
        <input type="file" onChange={handleImageUpload} />
        <p>Your uploaded image:</p>
        <img src={base64Image}></img>
        <button>Upload Image</button>
      </form>
    </>
  );
}

export default App;
