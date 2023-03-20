import 'matchmedia-polyfill';
import { render, screen, fireEvent } from "@testing-library/react";
import { PhotosContext } from "./contexts/PhotosProvider";
import Photolist from "./components/PhotoList";
import 'matchmedia-polyfill/matchMedia.addListener';
import '@testing-library/jest-dom';


const mockPhotos = [
  { id: 1, author: "Emir A.", download_url: "https://example.com/1.jpg" },
  { id: 2, author: "Emir B.", download_url: "https://example.com/2.jpg" },
  { id: 3, author: "Emir C.", download_url: "https://example.com/3.jpg" },
];

describe("Photolist component", () => {
  it("renders loading state when loading is true", () => {
    render(
      <PhotosContext.Provider value={{ photos: [], loading: true, error: null }}>
        <Photolist />
      </PhotosContext.Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when error is not null", () => {
    const error = "Something went wrog!";
    render(
      <PhotosContext.Provider value={{ photos: [], loading: false, error }}>
        <Photolist />
      </PhotosContext.Provider>
    );
    expect(screen.getByText(`Error: ${error}`)).toBeInTheDocument();
  });

  it("renders photos in grid view by default", () => {
    render(
      <PhotosContext.Provider value={{ photos: mockPhotos, loading: false, error: null }}>
        <Photolist />
      </PhotosContext.Provider>
    );
    mockPhotos.forEach((photo) => {
      expect(screen.getByAltText(photo.author)).toBeInTheDocument();
    });
    expect(screen.getByTestId("grid-view")).toBeInTheDocument();
  });

  it("renders photos in list view when list view button is clicked", () => {
    render(
      <PhotosContext.Provider value={{ photos: mockPhotos, loading: false, error: null }}>
        <Photolist />
      </PhotosContext.Provider>
    );
    fireEvent.click(screen.getByText("list"));
    mockPhotos.forEach((photo) => {
      expect(screen.getByAltText(photo.author)).toBeInTheDocument();
    });
    expect(screen.getByTestId("list-view")).toBeInTheDocument();
  });

  it("renders photos in slider view when slider view button is clicked", () => {
    render(
      <PhotosContext.Provider value={{ photos: mockPhotos, loading: false, error: null }}>
        <Photolist />
      </PhotosContext.Provider>
    );
    fireEvent.click(screen.getByText("slider"));
    mockPhotos.forEach((photo) => {
      expect(screen.getByAltText(photo.author)).toBeInTheDocument();
    });
    expect(screen.getByTestId("slider-view")).toBeInTheDocument();
  });

  it("renders photos in card view when card view button is clicked", () => {
    render(
      <PhotosContext.Provider value={{ photos: mockPhotos, loading: false, error: null }}>
        <Photolist />
      </PhotosContext.Provider>
    );
    fireEvent.click(screen.getByText("card"));
    mockPhotos.forEach((photo) => {
      expect(screen.getByAltText(photo.author)).toBeInTheDocument();
    });
    expect(screen.getByTestId("card-view")).toBeInTheDocument();
  });
});