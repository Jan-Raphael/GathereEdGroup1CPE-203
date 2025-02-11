import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ProfileUser_Header from "../components/ProfileUser_Header";

// Redux actions
const SET_FOR_YOU_DATA = "SET_FOR_YOU_DATA";

// Redux action creator
const setForYouData = (data) => ({
  type: SET_FOR_YOU_DATA,
  payload: data,
});

// Redux reducer
const forYouReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FOR_YOU_DATA:
      return action.payload;
    default:
      return state;
  }
};

// Redux store configuration
import { createStore } from "redux";
const store = createStore(forYouReducer);

export { store, setForYouData };

function ForYouPage() {
  const dispatch = useDispatch();
  const forYouData = useSelector((state) => state);

  useEffect(() => {
    const fetchForYouData = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await axios.get("http://localhost:8000/api/for-you/");
        dispatch(setForYouData(response.data));
      } catch (error) {
        console.error("Error fetching For You data:", error);
      }
    };

    fetchForYouData();
  }, [dispatch]);

  if (!forYouData.title) return <div>Loading...</div>;

  return (
    <div className="for-you-page">
      <ProfileUser_Header />
      <h1>{forYouData.title}</h1>
      <div className="tags">
        {forYouData.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p><strong>Author:</strong> {forYouData.author}</p>
      <p><strong>Premium:</strong> {forYouData.isPremium ? "Yes" : "No"}</p>
      <p><strong>Price:</strong> {forYouData.price || "Free"}</p>
      <div className="actions">
        {forYouData.actions.map((action, index) => (
          <button key={index} className={`action-button ${action.type}`}>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ForYouPage;