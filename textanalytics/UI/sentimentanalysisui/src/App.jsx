import { useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [sentiment, setSentiment] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (value.trim() === "") {
      setSentiment(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8091/sentiment/", formData);
      setSentiment(res.data);

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to translate.");
    }
  };

  return (
    <>
      <div className="conatiner">
        <div className="header">
          <h1>Sentiment Analysis</h1>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <h2>Check For Sentiment</h2>
            <input
              type="search"
              name="text"
              placeholder="Enter Text"
              value={formData.text}
              onChange={handleChange}
              required
            />

            <button type="submit">Check For Sentiment</button>
          </form>
          {sentiment && (
            <div className="res">
              <p>Based On Your Text It's Observed To Be : <b>{sentiment.sentiment}</b></p>

              <p>% That It Could be Positive Is :<b> {sentiment.confidence_scores.positive}</b></p>
              <p>% That It Could be Neutral Is :<b> {sentiment.confidence_scores.neutral}</b></p>
              <p>% That It Could be Negative Is : <b> {sentiment.confidence_scores.negative}</b></p>
            </div>


          )}
        </div>


      </div>
    </>
  )
}

export default App
