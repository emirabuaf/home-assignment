import { createContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { Photo } from "../hooks/useFetch";

interface PhotosContextValue {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

export const PhotosContext = createContext<PhotosContextValue>({
  photos: [],
  loading: false,
  error: null,
});

type Props = {
  children: React.ReactNode;
}

const PhotosProvider = ({ children }: Props) => {
  const { photos, loading, error } = useFetch("https://picsum.photos/v2/list");

  return (
    <PhotosContext.Provider value={{ photos, loading, error }}>
      {children}
    </PhotosContext.Provider>
  );
};

export default PhotosProvider;