import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/accounts/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main className="content">
        <section className="profile-container">
          <h2>Profile</h2>
          <div className="profile-details">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio || "No bio provided."}</p>
            {user.profile_picture && (
              <img src={user.profile_picture} alt="Profile" className="profile-picture" />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;