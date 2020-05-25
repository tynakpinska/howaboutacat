import React, { Component } from "react";
import styled from "styled-components";
import cat0 from "./img/0.jpg";
import cat1 from "./img/1.jpg";
import cat2 from "./img/2.jpg";
import cat3 from "./img/3.jpg";
import cat4 from "./img/4.jpg";

const Container = styled.div`
  background: url(${cat0}) no-repeat center center;
  background-size: cover;
  height: 100vh;
  padding: 30px;
`;

const Fact = styled.p`
  background: rgba(55, 55, 150, 0.6);
  padding: 30px;
  color: #fff;
  width: 50%;
  margin: auto;
`;

const Nav = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  margin-left: -40vw;
  width: 80vw;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 10%;
  height: 1rem;
  background: rgba(255, 55, 55, 0.8);
  border: none;
  border-radius: 5px;
  margin: 5px;
  &:hover {
    background: rgba(155, 55, 55, 0.8);
    cursor: pointer;
  }
`;

class CatsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factsArr: [],
      currentFactId: 0,
      imagesArr: [cat0, cat1, cat2, cat3, cat4],
    };
  }

  handleOnClick = e => {
    this.setState({ currentFactId: parseInt(e.target.id) });
  };

  componentDidMount = async () => {
    const randomArr = [];

    for (let i = 0; i < 5; i++) {
      randomArr.push(Math.floor(Math.random() * 231));
    }

    await fetch("https://cat-fact.herokuapp.com/facts")
      .then(resp => resp.json())
      .then(resp => {
        randomArr.forEach(n => {
          this.setState({
            factsArr: [
              ...this.state.factsArr,
              { text: resp.all[n].text, id: resp.all[n]._id },
            ],
          });
        });
      })
      .catch(err => console.log(err));

    this.timer = setInterval(() => {
      if (this.state.currentFactId === 4) {
        this.setState({ currentFactId: 0 });
      } else {
        this.setState({ currentFactId: this.state.currentFactId + 1 });
      }
    }, 5000);
  };

  componentWillUnmount = timer => {
    clearInterval(timer);
  };

  render({ factsArr, currentFactId, imagesArr } = this.state) {
    return (
      <Container
        style={{ backgroundImage: `url(${imagesArr[currentFactId]})` }}
      >
        {factsArr[currentFactId] ? (
          <Fact key={factsArr[currentFactId].id}>
            {factsArr[currentFactId].text}
          </Fact>
        ) : null}
        <Nav>
          <Button
            id="0"
            style={{
              background:
                currentFactId === 0
                  ? "rgba(155, 55, 55, 0.8)"
                  : "rgba(255, 55, 55, 0.8)",
            }}
            onClick={this.handleOnClick}
          ></Button>
          <Button
            id="1"
            style={{
              background:
                currentFactId === 1
                  ? "rgba(155, 55, 55, 0.8)"
                  : "rgba(255, 55, 55, 0.8)",
            }}
            onClick={this.handleOnClick}
          ></Button>
          <Button
            id="2"
            style={{
              background:
                currentFactId === 2
                  ? "rgba(155, 55, 55, 0.8)"
                  : "rgba(255, 55, 55, 0.8)",
            }}
            onClick={this.handleOnClick}
          ></Button>
          <Button
            id="3"
            style={{
              background:
                currentFactId === 3
                  ? "rgba(155, 55, 55, 0.8)"
                  : "rgba(255, 55, 55, 0.8)",
            }}
            onClick={this.handleOnClick}
          ></Button>
          <Button
            id="4"
            style={{
              background:
                currentFactId === 4
                  ? "rgba(155, 55, 55, 0.8)"
                  : "rgba(255, 55, 55, 0.8)",
            }}
            onClick={this.handleOnClick}
          ></Button>
        </Nav>
      </Container>
    );
  }
}

export default CatsSlider;
