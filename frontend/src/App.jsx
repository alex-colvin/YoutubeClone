// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { DATA } from "./localData";
import axios from "axios";
import { KEY } from "./localKey";
import 'bootstrap/dist/css/bootstrap.min.css'

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VideoPage from "./pages/VideoPage/VideoPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import React, { useEffect, useState } from "react";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Navigate, useNavigate } from 'react-router-dom';



function App() {

  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [defaultSearch, setDefaultSearch] = useState('React Tutorials')
  const [searchedVideos, setSearchedVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState('')
  const navigate = useNavigate()
  const [comments, setComments] = useState([])

  async function getVideoComments(videoId){
    let response = await axios.get(`http://127.0.0.1:8000/api/comments/all/${videoId}/`);
    setComments(response.data);}

  async function searchVideos(searchQuery=defaultSearch){
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=${KEY}&type=video&part=snippet&fields=items(id,snippet)&maxResults=20`)
    setSearchedVideos(response.data.items)
  }

  async function getRelatedVideos(videoId){
    let response = await axios.get(`//https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${KEY}`)
    setSearchedVideos(response.data.items)
  }

  function pickVideo(id) {
    let result = searchedVideos.filter((el) => {
      if(el.id.videoId === id){
        return true;
      }
      else{
        return false;
      }
    })
    setSelectedVideo(result[0])
  }

  useEffect(() => {
    if(selectedVideo !== ''){
    console.log('selectedVideo:',selectedVideo)
    navigate(`/video/${selectedVideo.id.videoId}`)
    }},[selectedVideo])
  return (
    <div className="bg">
      <Navbar searchVideos={searchVideos}/>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage videos={searchedVideos} getSuggestedVideos={searchVideos} submitVideoInfo={pickVideo} />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/video/:videoId" element={
        <VideoPage selectedVideo={selectedVideo} searchedVideos={searchedVideos} getRelatedVideos={getRelatedVideos} pickVideo={pickVideo} comments={comments} getVideoComments={getVideoComments} submitVideoInfo={pickVideo}/>} 
          
        />
        <Route path="/results" element={<SearchPage videos={searchedVideos} submitVideoInfo={pickVideo} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;