import { useEffect ,useState} from "react";
import './App.css';
import axios from "axios";
const translator=()=>{
  const[lang,setLang]=useState([]);
  const [formData, setFormData] = useState({  text: "", to_language: "" });
  const [translatedText, setTranslatedText] = useState("");

  
  useEffect(()=>{
    fetch("http://127.0.0.1:8089/languages")
    .then((res)=>res.json())
    .then((data)=>setLang(Object.entries(data.supported_languages.translation)))
   
  },[])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8089/translate/", formData);
      setTranslatedText(res.data.translated_text);
      setFormData({ text: "", to_language: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to translate.");
    }
  };

    return(
       <>

<div className="container">
<div className="header">
        <h1>Translator Ai</h1>
      </div>
        <h2>Translate Into Your Language</h2>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              placeholder="Enter Text"
              value={formData.text}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="to_language"
              placeholder="Enter To Language"
              value={formData.to_language}
              onChange={handleChange}
              required
            />
          
            <button type="submit">Translate language</button>
          </form>
        </div>
        {translatedText && (  
          <div className="res">
            <h3>Translated Text:</h3>
            <p>-----------------{translatedText}-----------------</p>
          </div>
        )}
  
       <h1> Azure Suppported  Translation Lanaguages are:</h1>
     
       <table>
        <tr>
  <th>Language</th>
  <th>Code To Enter</th>
  <th>Native Name</th>
        </tr>
        {lang.map(([code, language]) => (
          <tr key={code}>
            <td>{language.name}</td>
            <td>{code}</td>
            <td>{language.nativeName}</td>
          </tr>
        ))}
       </table>
       
       
       </div>

       
       </>
    )
}
export default translator;