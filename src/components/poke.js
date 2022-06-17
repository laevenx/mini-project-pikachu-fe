import { Button, Modal, Card } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Poke({ data,list }) {
  let navigate = useNavigate();
  const [errText, setErrText] = useState();
  const [num, setNum] = useState(0);

  const success = () => {
    Modal.success({
      content: errText,
    });
  };

  const error = () => {
    Modal.error({
      title: "This is an error message",
      content: errText,
    });
  };

  function redirect(url) {
    let fix = url.replace("https://pokeapi.co/api/v2/pokemon/", "");
    navigate("/detail/" + fix);
  }

  function rename(nickname, name) {
    let req = "";
    nickname ? (req = nickname) : (req = name);
    axios
      .put(`http://localhost:3099/rename?nickname=${req}&num=${num}`)
      .then((result) => {
        setErrText(`nickname changed to ${result.data.data}`);

        success();
        data.nickname = result.data.data;
        setNum(num+1);
      })
      .catch((err) => {
        setErrText(err);
        error();

        console.log(err);
      });
  }

  return (
   
        <Card title={data.name} style={{ width: 400 }}>
      {list ? null:  <div>
        Nickname : {data.nickname ? data.nickname : data.name}{" "}
        <Button
          onClick={() => {
            rename(data.nickname, data.name);
          }}
        >
          Rename
        </Button>
      </div>}
      <div>
        Url : <a onClick={() => redirect(data.url)}>{data.url}</a>
      </div>
    </Card>
    
     
     
     
  );
}
