import React from "react";
import { IComic } from "../../models/comic.modal";
import "./ComicsDetailList.scss";

interface ComicsDetailListProps {
  comics: IComic[];
  error: string | null;
}

const ComicsDetailList: React.FC<ComicsDetailListProps> = ({ comics, error }) => {
  return (
    <div className="character-comics">
      <h2>COMICS</h2>
      <div className="comics-list">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          comics.map((comic, index) => (
            <div
              key={comic.id}
              className="comic-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                className="comic-image"
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <p className="comic-title">{comic.title}</p>
              <p className="comic-release-date">
                {comic.dates.find(date => date.type === "onsaleDate")?.date
                  ? new Date(comic.dates.find(date => date.type === "onsaleDate")!.date).getFullYear()
                  : "Fecha no disponible"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComicsDetailList;
