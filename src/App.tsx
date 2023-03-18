import PhotosProvider from "./contexts/PhotosProvider";
import PhotoList from "./components/PhotoList";
import './App.css';

function App() {
  return (
    <PhotosProvider>
      <PhotoList />
    </PhotosProvider>
  );
}

export default App;