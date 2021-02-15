import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs';
import * as SpeechCommands from '@tensorflow-models/speech-commands';
import Board from '../Board/Board.js';

export default class Game extends Component {
    state = {
        recognizer: "",
        modelLoaded: false,
        words: [],
        currentCommand: "",
        isListening: false
    }

    componentDidMount() {
        this.loadModel()
    }

    loadModel = async () => {
        let recognizer = SpeechCommands.create('BROWSER_FFT');
    
        recognizer.ensureModelLoaded()
        await recognizer.ensureModelLoaded()
    
        this.setState({
            recognizer: recognizer,
            modelLoaded: true,
            words: recognizer.wordLabels()
        })
    }

    startListening = async () => {
        try {
                this.setState({isListening: true});
                await this.state.recognizer.listen(({scores}) => {
                scores = Array.from(scores).map((s, i) => ({score: s, word: this.state.words[i]}));

                scores.sort((s1, s2) => s2.score - s1.score);
                let validScores = ['up', 'down', 'left', 'right', 'go', 'stop']
                if (validScores.includes(scores[0].word)) this.setState({currentCommand: scores[0].word})
                else {this.setState({currentCommand: 'unknown'})}
                console.log(this.state.currentCommand);
            },
            {
                probabilityThreshold: 0.95
            });
        }
        catch(err) {
            console.log('uh oh stinky ' + err);
        }
    }

    stopListening = async () => {
        try {
            await this.state.recognizer.stopListening();
            this.setState({isListening: false});
        }
        catch (err){
            console.log('uh oh stinky ' + err);
        }
    }

    render() {
        return (
            <div >
                {!this.state.modelLoaded && <p>LOADING MODEL</p>}
                <Board streaming = {this.state.isListening} command = {this.state.currentCommand} start = {this.startListening} stop = {this.stopListening}/>
            </div>
        )
    }
}
