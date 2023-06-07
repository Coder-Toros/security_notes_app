import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import env from "../env.json";

function Note() {
  let { noteURL } = useParams();
  const [noteText, setNoteText] = useState("");
  const [lineClass, setLineClass] = useState("hide");
  const [formClass, setFormClass] = useState("hide");
  const [errorClass, setErrorClass] = useState("hide");

  useEffect(() => {
    if (noteURL !== undefined) {
      fetch(env.urlBackend, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ url: noteURL }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.result) {
            setNoteText(response.note);
            setLineClass("");
            setFormClass("hide");
            setErrorClass("hide");
          } else if (!response.result) {
            setLineClass("hide");
            setFormClass("hide");
            setErrorClass("");
          }
        });
    } else {
      setLineClass("hide");
      setFormClass("");
      setErrorClass("hide");
    }
  }, []);

  function getNote(event) {
    event.preventDefault();
    let url = event.target.elements.url.value;
    url = url.trim();
    if (url === "") {
      alert("Заполните поля");
      return false;
    }
    noteURL = url;
    window.location.href = env.url + "/" + url;
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="text">
          <form action="" onSubmit={getNote} className={formClass}>
            <div className="form-group">
              <label htmlFor="url">Введите hash заметки</label>
              <input type="text" name="url" id="url" className="form-control" />
            </div>
            <div className="form-group text-end">
              <button type="submit" className="btn btn-primary">
                Искать Note
              </button>
            </div>
          </form>
        </div>

        <div className={lineClass}>
          <div className="alert alert-success" role="alert">
            <h1 className="alert-heading">Note: {noteURL}</h1>
            <div>{noteText}</div>
            <hr />
            <p className="mb-0">
              Внимание! Скопируйте заметку. После показа заметка будет удалена!
            </p>
          </div>
          <div className="text-end">
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = env.url)}
            >
              Смотреть еще одно сообщение
            </button>
          </div>
        </div>

        <div className={errorClass}>
          <div className="alert alert-danger" role="alert">
            Произошла ошибка. Такое сообщение не найдено!
          </div>
          <div className="text-end">
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = env.url)}
            >
              Смотреть другое сообщение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
