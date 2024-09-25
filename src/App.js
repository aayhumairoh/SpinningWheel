import { useState, useEffect } from "react";
import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";

export default function App() {
  const [value, setValue] = useState("");
  const [segments, setSegments] = useState([]);
  const [segColors, setSegColors] = useState([]);
  const [modal, setModal] = useState(false);
  const [winner, setWinner] = useState("");
  const [name, setNames] = useState([]);

  useEffect(() => {
    // Fungsi untuk mengambil data dari Instagram API
    const fetchInstagramComments = async () => {
      const accessToken = 'f040549c6efa6f7459468bb89bf33d17';
      const mediaId = '510773451555497';

      try {
        const response = await fetch(`https://graph.instagram.com/${mediaId}/comments?access_token=${accessToken}`);
        const data = await response.json();
        const usernames = data.data.map(comment => comment.username); // Ambil username dari tiap komentar
        setNames(usernames);
      } catch (error) {
        console.error('Error fetching Instagram comments:', error);
      }
    };

    fetchInstagramComments();
  }, []);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  // Function to generate a random color for each segment
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Add name to the segments and assign random colors
  const handleAddToArray = () => {
    if (value.trim() !== "") {
      setSegments([...segments, value]);
      setSegColors([...segColors, getRandomColor()]);
      setValue(""); // Reset input field after adding the name
    }
  };

  // Function to remove a specific name from the list
  const handleRemoveItem = (index) => {
    const updatedSegments = segments.filter((_, i) => i !== index);
    const updatedSegColors = segColors.filter((_, i) => i !== index);
    setSegments(updatedSegments);
    setSegColors(updatedSegColors);
  };

  // Function to reset all the names
  const handleRemoveAll = () => {
    setSegments([]);
    setSegColors([]);
  };

  // Event handler when wheel finishes spinning
  const onFinished = (winner) => {
    console.log("winner", winner);

    // Remove the winner from the segments and segColors
    const updatedSegments = segments.filter(segment => segment !== winner);
    const winnerIndex = segments.indexOf(winner);
    const updatedSegColors = segColors.filter((_, i) => i !== winnerIndex);

    // Update the segments and colors before setting the winner
    setSegments(updatedSegments);
    setSegColors(updatedSegColors);
    setWinner(winner);

    // Show modal after removing the winner from the list
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="App">
      <p>Random Name Picker</p>
      <div className="container">
        {/* Left side: Input form and names list */}
        <div className="input-container">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Enter a name"
          />
          <button className="add-btn" onClick={handleAddToArray}>Add</button>
          <button className="remove-all-btn" onClick={handleRemoveAll}>Reset All</button>
          <h2>Names List:</h2>
          <ul className="name-list">
            {segments.map((item, index) => (
              <li key={index} className="name-item">
                {item}
                <button className="remove-item" onClick={() => handleRemoveItem(index)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Wheel component */}
        {segments.length > 0 && (
          <div className="wheel-container">
            <WheelComponent
              key={segments.join(",")} // Ensures the wheel re-renders when segments change
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="Spin"
              isOnlyOnce={false}
              size={window.innerWidth < 768 ? 200 : 250}
              upDuration={200}
              downDuration={800}
              fontFamily="Arial"
            />
          </div>
        )}
      </div>
      <Modal showModal={modal} closeModal={closeModal}>
        <h1>Congratulations!</h1>
        <h2>The Winner is: {winner}</h2>
        <button className="modalClose" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
