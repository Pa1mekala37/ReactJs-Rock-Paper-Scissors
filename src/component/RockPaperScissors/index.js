import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

import './index.css'

class RockPaperScissors extends Component {
  state = {
    score: 0,
    resultStatus: '',
    playerOneChoice: '',
    playerTwoChoice: '',
    showResult: false,
  }

  calculateScore = () => {
    const {playerOneChoice, playerTwoChoice} = this.state
    let resultScore
    let msg
    if (
      (playerOneChoice === 'ROCK' && playerTwoChoice === 'PAPER') ||
      (playerOneChoice === 'PAPER' && playerTwoChoice === 'SCISSORS') ||
      (playerOneChoice === 'SCISSORS' && playerTwoChoice === 'ROCK')
    ) {
      resultScore = -1
      msg = 'YOU LOSE'
    } else if (playerOneChoice === playerTwoChoice) {
      resultScore = 0
      msg = 'IT IS DRAW'
    } else {
      resultScore = 1
      msg = 'YOU WON'
    }
    console.log(resultScore)
    const {score} = this.state
    this.setState(prevState => ({
      score: prevState.score + resultScore,
      resultStatus: msg,
    }))
  }

  generateRandomNumBW1and3 = () => Math.floor(Math.random() * 3)

  onClickRPCBTN = id => {
    const {choicesList} = this.props
    const index = this.generateRandomNumBW1and3()
    const resultList = choicesList[index]
    this.setState(
      {
        playerOneChoice: id,
        playerTwoChoice: resultList.id,
        showResult: true,
      },
      this.calculateScore,
    )
  }

  onClickPlayAgain = () => {
    this.setState({
      showResult: false,
    })
  }

  renderHeaderComponent = () => {
    const {score} = this.state
    return (
      <div className="header-container">
        <div className="header-sub-container">
          <h1 className="header-heading">Rock Paper Scissors</h1>
        </div>
        <div className="header-sub-container-2">
          <p className="score-heading">Score</p>
          <p className="score-count">{score}</p>
        </div>
      </div>
    )
  }

  renderRockPaperScissorsComponent = () => {
    const {choicesList} = this.props

    return (
      <div className="rock-paper-scissors-container">
        {choicesList.map(each => {
          const onClickEachBTN = () => {
            this.onClickRPCBTN(each.id)
          }
          return (
            <button
              data-testid={`${each.id.toLowerCase()}Button`}
              key={each.id}
              type="button"
              className="each-button"
              onClick={onClickEachBTN}
            >
              <img src={each.imageUrl} alt={each.id} className="button-image" />
            </button>
          )
        })}
      </div>
    )
  }

  renderResultComponent = () => {
    const {playerTwoChoice, playerOneChoice, score, resultStatus} = this.state
    const {choicesList} = this.props
    const filteredPlayerOne = choicesList.filter(each =>
      each.id === playerOneChoice ? each : null,
    )

    const filteredPlayerTwo = choicesList.filter(each =>
      each.id === playerTwoChoice ? each : null,
    )

    return (
      <div className="results-main-container">
        <div className="results-container">
          <div className="player">
            <p className="result-heading">YOU</p>
            <div>
              <img
                src={filteredPlayerOne[0].imageUrl}
                alt="your choice"
                className="result-image"
              />
            </div>
          </div>
          <div className="player">
            <p className="result-heading">OPPONENT</p>
            <div>
              <img
                src={filteredPlayerTwo[0].imageUrl}
                alt="opponent choice"
                className="result-image"
              />
            </div>
          </div>
        </div>
        <div className="result-status">
          <p className="result-status-text">{resultStatus}</p>
          <button
            type="button"
            className="play-again-button"
            onClick={this.onClickPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {playerOneChoice, playerTwoChoice, showResult} = this.state

    return (
      <div className="bg-container">
        <div className="main-container">
          {this.renderHeaderComponent()}
          <div className="RPS-main-container">
            {showResult
              ? this.renderResultComponent()
              : this.renderRockPaperScissorsComponent()}
          </div>
        </div>
        <div className="rules-container">
          <Popup
            modal
            trigger={<button className="rules-button">Rules</button>}
          >
            {close => (
              <div className="main-popup">
                <div className="popup-container">
                  <button
                    type="button"
                    className="close-button"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    className="popup-image"
                    alt="rules"
                  />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default RockPaperScissors
