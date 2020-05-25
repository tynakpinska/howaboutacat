import React, { Component } from "react";
import styled from "styled-components";
import cat from "./img/cat.jpg";

const Container = styled.div`
  background: url(${cat}) no-repeat center center;
  background-size: cover;
  height: 100vh;
  padding: 30px;
`;

const Fact = styled.p`
  background: rgba(55, 55, 150, 0.6);
  padding: 30px;
  height: 40%;
  color: #fff;
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
    };
  }

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

  render({ factsArr, currentFactId } = this.state) {
    return (
      <Container>
        {factsArr[currentFactId] ? (
          <Fact key={factsArr[currentFactId].id}>
            {factsArr[currentFactId].text}
          </Fact>
        ) : null}
        <Nav>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </Nav>
      </Container>
    );
  }
}

export default CatsSlider;
