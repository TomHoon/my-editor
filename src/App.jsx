import { useRef } from 'react';

export default function App() {
  const editorRef = useRef();

  const test = () => {
    console.log('editorRef > ', editorRef.current.innerHTML);
  };

  const fileUpload = async (e) => {
    console.log('e >>> ', e.target.files[0]);
    const formData = new FormData();
    const data = e.target.files[0];
    formData.append('file', data);
    const res = await fetch('http://localhost:23000/api/v1/file/upload', {
      method: 'POST',
      body: formData,
    });

    const { imageUrl } = await res.json();
    console.log('imageUrl >> ', imageUrl);

    const realPath = 'http://localhost:23000/' + imageUrl;
    editorRef.current.innerHTML += `<img src=${realPath} class="testimg"/>`;
  };

  return (
    <>
      <div ref={editorRef} className="editor" contentEditable="true"></div>

      <button onClick={() => test()}>test</button>
      <input type="file" onChange={(e) => fileUpload(e)} />
    </>
  );
}
