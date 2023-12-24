import React, { useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import axios from "axios";
import PlusIMG from "./icons/plus.svg";

const date = new Date();
const latestDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;

function UserArray(name, points, email, id) {
  return {
    id: id,
    name: name,
    points: points,
    email: email,
  };
}

// function UserList() {

// }

function WordleAnswer() {
  const [wordleAnsVisible, setWordleAnsVisible] = useState(false);
  const [data, setData] = useState("_____");
  const [currentDate, setCurrentDate] = useState(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );

  const [userContainers, SetUserContainers] = useState([
    UserArray("Noah", 1, "sggpixelgaming@gmail.com", 0),
    UserArray("Justice", 1, "justicedbenezra@gmail.com", 1),
    UserArray("Mom", 1, "sistercrystal@gmail.com", 2),
  ]);

  const AddUser = () => {
    SetUserContainers([
      ...userContainers,
      UserArray("Example", 1, "example@example.com", userContainers.length),
    ]);
    console.log("New User Added");
  };

  useEffect(() => {
    axios
      .get("https://neal.fun/api/password-game/wordle?date=" + currentDate)
      .then((response) => {
        setData(response.data.answer);
        console.log(response.data.answer);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentDate]);

  const revealWord = () => {
    setWordleAnsVisible(!wordleAnsVisible);
  };

  function UserList() {
    const handleChange = (index) => (e) => {
      let newArr = [...userContainers];

      newArr[index].points = e.target.value;

      SetUserContainers(newArr);
    };

    const listItems = userContainers.map((user) => (
      <div className="UserContainer" key={user.id}>
        <Gravatar className="Profile" email={user.email} />
        <p>{user.name}</p>
        <select name="num_try" id="num_try" onChange={handleChange(user.id)}>
          <option value={0}>N/A</option>
          <option value={6}>1st</option>
          <option value={5}>2nd</option>
          <option value={4}>3rd</option>
          <option value={3}>4th</option>
          <option value={2}>5th</option>
          <option value={1}>6th</option>
        </select>
        <select name="num_time" id="num_time" onChange={handleChange(user.id)}>
          <option value={0}>N/A</option>
          <option value={3}>1st</option>
          <option value={1}>2nd</option>
          <option value={0}>3rd+</option>
        </select>
        <p>Points: {user.points}</p>
      </div>
    ));

    return <div className="UserStats">{listItems}</div>;
  }

  // Render Site:

  return (
    <>
    
      <div className="WordleAnswer" onClick={revealWord}>
        <div className="WordleLetter">
          <p className="WordleLetter">
            {data && wordleAnsVisible ? data.toUpperCase().substr(0, 1) : "_"}
          </p>
        </div>
        <div className="WordleLetter">
          <p className="WordleLetter">
            {data && wordleAnsVisible ? data.toUpperCase().substr(1, 1) : "_"}
          </p>
        </div>
        <div className="WordleLetter">
          <p className="WordleLetter">
            {data && wordleAnsVisible ? data.toUpperCase().substr(2, 1) : "_"}
          </p>
        </div>
        <div className="WordleLetter">
          <p className="WordleLetter">
            {data && wordleAnsVisible ? data.toUpperCase().substr(3, 1) : "_"}
          </p>
        </div>
        <div className="WordleLetter">
          <p className="WordleLetter">
            {data && wordleAnsVisible ? data.toUpperCase().substr(4, 1) : "_"}
          </p>
        </div>
      </div>

      <p className="test" onClick={revealWord}>{wordleAnsVisible ? '[Hide Word]' : '[Reveal Word]'}</p>

      <input
        type="date"
        onChange={(e) => {
          setCurrentDate(e.target.value);
          console.log(e.target.value);
        }}
        defaultValue={latestDate}
        max={latestDate}
        className="WordleDate"
      ></input>

      {UserList()}

      <button className="AppButton" img={PlusIMG} alt="" onClick={AddUser}>
        <img className="AppButtonIMG" src={PlusIMG} alt="" />
      </button>
    </>
  );
}

export default WordleAnswer;
