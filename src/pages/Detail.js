import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Col, Divider, List, Row, Image,Modal } from "antd";

export default function Detail() {
  let params = useParams();
  const [data, setData] = useState();
  const [errText, setErrText] = useState();

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

  function catchPokemon(name) {
    const myPoke = localStorage.getItem('myPoke');
    let arr = JSON.parse(myPoke) 

    axios
      .post("http://localhost:3099/catch", {
        name,
      })
      .then((r) => {
        if (r.data.status){
          setErrText(`you successfully catch this pokemon`);
          if (!arr){
            arr = []
          }
          arr.push({name:data.name,nickname: null,url:`https://pokeapi.co/api/v2/pokemon/`+  params.name})
          let temp = JSON.stringify(arr)
          localStorage.setItem('myPoke', temp);

          success();
        } else {
          setErrText(`you failed catch this pokemon`);
          error();

        }
        
      })
      .catch((err)=> {
        console.log(err)
        setErrText(err);

        error();
      })
  }

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + params.name)
      .then((r) => {
        console.log(r.data)
        r.data.stats.push({stat:{name : "weight" }, base_stat : r.data.weight})
        setData(r.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },[params.name]);

  if (data) {
    return (
      <>
        <div>
          <Divider orientation="left">{data.name}</Divider>

          <Row>
            <Col span={12}>
              <Image width={200} src={data.sprites.front_default} />
            </Col>
            <Col span={12}>
              <Divider orientation="left">Stats</Divider>
              <List
                size="small"
                bordered
                dataSource={data.stats}
                renderItem={(s) => (
                  <List.Item>
                    <div>
                      {s.stat.name} : {s.base_stat}
                    </div>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Divider orientation="left">Abilities</Divider>
          <List
            size="small"
            bordered
            dataSource={data.abilities}
            renderItem={(a) => (
              <List.Item>
                <div>name: {a.ability.name}</div>
                {/* <div>url: {a.ability.url}</div> */}
                <div>slot: {a.slot}</div>
              </List.Item>
            )}
          />

          <Divider orientation="left">Forms</Divider>
          <List
            size="small"
            bordered
            dataSource={data.forms}
            renderItem={(f) => (
              <List.Item>
                <div>name: {f.name}</div>
                {/* <div>url: {f.url}</div> */}
              </List.Item>
            )}
          />
          <Divider orientation="left">Held Items</Divider>
          <List
            size="small"
            bordered
            dataSource={data.held_items}
            renderItem={(i) => (
              <List.Item>
                <div>name: {i.item.name}</div>
                {/* <div>url: {i.item.url}</div> */}
              </List.Item>
            )}
          />

          <Divider orientation="left">Moves</Divider>
          <List
            size="large"
            bordered
            dataSource={data.moves}
            renderItem={(m) => (
              <List.Item>
                <div>Name: {m.move.name}</div>
                {/* <div>url: {m.move.url}</div> */}
              </List.Item>
            )}
          />

          <Divider orientation="left">Types</Divider>
          <List
            size="small"
            bordered
            dataSource={data.types}
            renderItem={(t) => (
              <List.Item>
                <div>{t.type.name}</div>
              </List.Item>
            )}
          />
        </div>
        <Button onClick={() => catchPokemon(params.name)}>Catch</Button>
      </>
    );
  } else {
    return (
      <>
        <div>Not Found</div>
      </>
    );
  }
}
