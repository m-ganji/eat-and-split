import { useState } from "react";
import "./styles.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);

  function handlerAddFriend({ friend }) {
    setFriends((friends) => [...friends, friend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friend={friends} />
      </div>
      <FormSplit />
    </div>
  );
}

function FriendsList({ friend }) {
  const [showAddForm, setShowAddForm] = useState(true);

  return (
    <ul>
      {friend.map((friend) => (
        <Friends friend={friend} key={friend.id} />
      ))}
      {showAddForm && <FormAddFriend />}
      {!showAddForm ? (
        <Button OnClick={() => setShowAddForm(!showAddForm)}>Add friend</Button>
      ) : (
        <Button OnClick={() => setShowAddForm(!showAddForm)}>Close</Button>
      )}
    </ul>
  );
}

function Friends({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you </p>}
      {friend.balance == 0 && <p>You and {friend.name} are even </p>}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, OnClick }) {
  return (
    <button className="button" onClick={OnClick}>
      {children}
    </button>
  );
}

function FormAddFriend() {
  const [inputValue, setInputValue] = useState("");
  const [inputValueURL, setInputValueURL] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChangeURL = (event) => {
    setInputValueURL(event.target.value);
  };

  function handleSubmitForm(e) {
    e.preventDefault();

    if (!inputValue || !inputValueURL) return;

    const id = crypto.randomUUID();

    const newUser = {
      id: crypto.randomUUID(),
      name: inputValue,
      image: `https://i.pravatar.cc/48?=${id}`,
      balance: 0,
    };

    setInputValue("");
    setInputValueURL("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitForm}>
      <label>👫Friend name</label>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <label>🌄Image URL</label>
      <input
        type="text"
        value={inputValueURL}
        onChange={handleInputChangeURL}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplit() {
  return (
    <form className="form-split-bill">
      <h2>split a bil</h2>

      <label>Bill VALUE</label>
      <input type="text" />

      <label> Your expense</label>
      <input type="text" />

      <label>X'S expense</label>
      <input type="text" disabled />

      <label>Who's paying the bill</label>
      <select>
        <option value="user">user</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
}
