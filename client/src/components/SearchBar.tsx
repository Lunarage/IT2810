import React, { Component, FormEvent, useState } from "react";
import { Input, Radio, Form, Accordion, Select } from "semantic-ui-react";

interface Props {
  searchButtonClicked(input: string, titleType: string, orderDir: string): void;
}

interface State {
  inputString: string;
  orderDir: string;
}

/* SearchBar får inn funksjonen serchButtonClicked fra SearchPage.
Denne kalles i handleSubmit, som igjen kalles ved submit av form sin onSubmit.
    this.state.inputString blir sendt til SearchPage.
SearchBar rendrer et inputfelt og en submit-knapp.*/
const SearchBar = (props: Props) => {
  const [inputState, setInputState] = useState<string>("");
  const [orderDirState, setOrderDirState] = useState<string>("");
  const [titleTypeState, setTitleTypeState] = useState<string>("");

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputState(event.currentTarget.value);
  };

  const handleOrderDirChange = (event: FormEvent<HTMLInputElement>) => {
    setOrderDirState(event.currentTarget.value);
  };

  const handleTitleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTitleTypeState(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.searchButtonClicked(inputState, titleTypeState, orderDirState);
  };

  // Panels for the accoridon with extra search options
  const panels = [
    {
      key: "advanced-search",
      title: "Search Options",
      content: {
        content: (
          <div>
            <Form.Group inline>
              <Form.Input disabled label="Order By" placeholder="Year" />
              <div className="radio-div">
                <label htmlFor="asc-radio">Ascending</label>
                <input
                  id="asc-radio"
                  type="radio"
                  value="ASC"
                  checked={orderDirState === "ASC"}
                  onChange={handleOrderDirChange}
                />
                <label htmlFor="desc-radio">Descending</label>
                <input
                  id="desc-radio"
                  type="radio"
                  value="DESC"
                  checked={orderDirState === "DESC"}
                  onChange={handleOrderDirChange}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <div className="field">
                <label htmlFor="title-type-select">Title Type</label>
                <select id="title-type-select" onChange={handleTitleTypeChange}>
                  <option value=""></option>
                  <option value="movie">Movie</option>
                  <option value="tvShort">TV Short</option>
                  <option value="tvMovie">TV Movie</option>
                  <option value="short">Short</option>
                  <option value="tvMiniSeries">TV Miniseries</option>
                  <option value="videoGame">Video Game</option>
                  <option value="tvEpisode">TV Episode</option>
                  <option value="video">Video</option>
                  <option value="tvSpecial">TV Special</option>
                  <option value="tvSeries">TV Series</option>
                </select>
              </div>
            </Form.Group>
          </div>
        ),
      },
    },
  ];

  return (
    <Form className={"search-bar"} onSubmit={handleSubmit}>
      <Input
        icon="search"
        className={"search-input"}
        autoFocus
        placeholder={"Søk i database"}
        value={inputState}
        onChange={handleInputChange}
        tabIndex={0}
        required
      />
      <Accordion defaultActiveIndex={-1} panels={panels} />
      <button
        className={"search-button"}
        type={"submit"}
        value={"submit"}
        tabIndex={0}
      >
        Søk
      </button>
    </Form>
  );
};

export default SearchBar;
