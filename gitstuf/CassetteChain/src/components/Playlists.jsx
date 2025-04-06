

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import playImg from "../assets/Screenshot 2025-03-31 143024.png"
import Card from "./Card"
import Navbar from "./Navbar" // Import the Navbar component

const Playlists = ({ token, setToken }) => {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      setLoading(true)
      fetch("http://localhost:5000/api/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          console.log("Fetched Playlists: ", JSON.stringify(playlists, null, 2))

          if (data.items) {
            setPlaylists(data.items)
          } else {
            setError("Invalid response from server.")
          }
        })
        .catch((error) => {
          console.error("Error fetching playlists:", error)
          setError(error.message || "Failed to load playlists.")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [token])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add the Navbar at the top */}
      <Navbar token={token} setToken={setToken} />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col items-center p-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${playImg})` }}
      >
        <h2 className="text-pink-900 mt-10 press-start text-3xl font-bold mb-6">Your Playlists</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-white">Loading playlists...</p>
        ) : playlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-5">
            {playlists.map((playlist) => (
              <Card
                key={playlist.id}
                name={playlist.name}
                url={playlist.external_urls?.spotify}
                image={playlist.images?.[0]?.url}
              />
            ))}
          </div>
        ) : (
          <p className="text-white">No playlists available.</p>
        )}
      </div>
    </div>
  )
}

export default Playlists

