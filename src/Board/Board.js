import React, { Component } from 'react'
import { generateMineCoordinates, GenerateSubCoordinates, isWithinRange, move, collision } from '../utils/utils.js';
import './Board.css';
import Mine from '../Mine/Mine.js';
import Submarine from '../Submarine/Submarine.js';

export default class Board extends Component {
    state = {
        submarine: {},
        mines: [],
        exitX: 0,
        exitY: 0,
        direction: "right",
        go: "stop",
        speed: 400,
        boardSize: 600,
        display: "none",
    }

    componentDidMount() {
        this.createMines();
        this.startGameLoop();
    }

    gameLoop = () => {
        let sub = this.state.submarine
        for (const mine of this.state.mines) {
            if(collision(sub, mine, 10)) this.setState({go : "stop"});
        }

        if(this.props.streaming) {
            let dirArr = ['up', 'down', 'left', 'right'];
            let goArr = ['go', 'stop'];
            if (goArr.includes(this.props.command)) this.setState({go : this.props.command})

            if(this.state.go === 'stop') {
                if (dirArr.includes(this.props.command)) this.setState({direction : this.props.command})
            }
        }

        if(this.state.go === "go") {
            move(this.state.direction, sub, 5);
        }
        this.setState({submarine: sub});
    }

    startGameLoop = () => {
        this.intervalID = setInterval(this.gameLoop, this.state.speed);
    }

    createMines = () => {
        let mineArr = []
        for (let i = 0; i < this.state.boardSize/7; i++) {
            let coordinates = generateMineCoordinates();
            let mine = {
                x: coordinates[0] * (this.state.boardSize/100),
                y: coordinates[1] * (this.state.boardSize/100)
            }     
            mineArr.push(mine);    
        }
        this.setState({mines: mineArr});
    }

    createSubmarine = () => {
        
        this.setState({display: "block"})
        let coordinates = GenerateSubCoordinates();
        let subX = coordinates[0] * (this.state.boardSize/100);
        let subY = coordinates[1] * (this.state.boardSize/100)
        let useCoordinates = false;
        let badCoordinates = false;

        while (useCoordinates === false){
            for (let mine of this.state.mines) {
                badCoordinates = (isWithinRange(mine.x, subX, 10) && isWithinRange(mine.y, subY, 10));

                if (badCoordinates) {
                    useCoordinates = false;
                    console.log('collision');
                    break;
                }
                useCoordinates = true;
            }
            coordinates = GenerateSubCoordinates();
            subX = coordinates[0] * (this.state.boardSize/100);
            subY = coordinates[1] * (this.state.boardSize/100)
            
        }
       
        let sub = {
            x: subX,
            y: subY
        }
        this.setState({submarine: sub});
    }

    render() {
        return (
            <div>
                <div className = "game-board" style = {{width: this.state.boardSize,
                height: this.state.boardSize, display: this.state.display}}>
                {this.state.mines.map(mine => {
                    return <Mine x = {mine.x} y = {mine.y}/>
                })}
                <Submarine x = {this.state.submarine.x} y = {this.state.submarine.y} create = {this.createSubmarine}/>
                </div>
                {this.state.display === "none" && <button onClick = {this.createSubmarine}>Play?</button>}
                {this.state.display !== "none" && <button onMouseDown = {this.props.start} onMouseUp = {this.props.stop} onMouseLeave = {this.props.stop} onClick = {this.props.stop}>talk</button>}
                {this.state.display !== "none" && this.props.streaming && <p>Listening</p>}
            </div>
    
            
        )
    }
}
