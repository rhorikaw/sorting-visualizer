import React from 'react';
import TextField from '@mui/material/TextField' //'@material-ui/core/TextField';
import MenuItem from '@mui/material/MenuItem'   //'@material-ui/core/MenuItem';
import Button from '@mui/material/Button'       //'@material-ui/core/Button';
import Container from '@mui/material/Container' //'@material-ui/core';

import "../styles.css";


function generateIntSetString(){
    const numSet = new Set();
    var numStr = "";
    var prevSize = 0;
    while(numSet.size < 100){
        var intToAdd = Math.floor(Math.random() * 1000)
        numSet.add(intToAdd)
        if(prevSize < numSet.size){
            prevSize = numSet.size;
            if(numSet.size !== 100){
                numStr += intToAdd + ","
            }else{
                numStr += intToAdd + ""
            }
        }
    }
    return numStr;
}


const algorithms = [
    {
        value: 'SEL',
        label: 'Selection Sort',
    },
    {
        value: 'INS',
        label: 'Insertion Sort',
    },
    {
        value: 'BUB',
        label: 'Bubble Sort',
    },
    {
        value: 'COC',
        label: 'Cocktail Sort'
    },
    {
        value: 'HEA',
        label: 'Heap Sort',
    },
    {
        value: 'QUI',
        label: 'Quick Sort',
    },
    {
        value: 'MER',
        label: 'Merge Sort',
    },
    {
        value: 'RAD',
        label: 'Radix Sort',
    },
    {
        value: 'GNO',
        label: 'Gnome Sort',
    },
  ];

  const speeds = [
    {
        value: 160,
        label: 'Slowest'
    },
    {
        value: 80,
        label: 'Slow'
    },
    {
        value: 40,
        label: 'Normal'
    },
    {
        value: 20,
        label: 'Fast'
    },
    {
        value: 10,
        label: 'Fastest'
    },
  ];

  

  class DataInput extends React.Component{
    constructor(props){
        super(props);
        this.handleRandomValues = this.handleRandomValues.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
        this.state = {
            values: '',
            algorithm: 'SEL',
            speed: 80,
            refresh: false
        }
    }
    
    handleRandomValues = () =>{
        var intStr = generateIntSetString();
        this.props.onValueChange(intStr)
        this.setState(
            {
                values: intStr,
                refresh: true
            }
        )
    }

    handleValueChange = (event) =>{
        this.props.onValueChange(event.target.value);
        this.setState(
            {
                values: event.target.value,
                refresh: true
            }
        )
    }

    handleAlgorithmChange = (event) =>{
        this.props.onAlgorithmChange(event.target.value);
        this.setState(
            {
                algorithm: event.target.value,
                refresh: true
            }
        )
    }

    handleSpeedChange = (event) =>{
        this.props.onSpeedChange(event.target.value);
        this.setState(
            {
                speed: event.target.value,
                refresh: true
            }
        )
    }

    componentDidUpdate(prevProps){
        if(this.props.refresh !== prevProps.refresh){
            this.setState(prevState => {
                return{
                    refresh: !prevState.refresh
                }
            })
        }
    }

    render(){
        return(
            <div>
                <Container maxWidth='lg'>
                    <Container maxWidth='sm'>
                        <h2>Enter Values: </h2>
                        <form>
                            <TextField
                                id="input-values"
                                multiline
                                rows={5}
                                value={this.state.values}
                                variant="outlined"
                                helperText="Enter up to 100 numerical values separated by commas. (e.g. 1,2,3,...)"
                                onChange={this.handleValueChange}
                                fullWidth
                            />
                            <Container className="flex flex-end">
                                <Button variant="contained" onClick={this.handleRandomValues}>Random</Button>
                            </Container>
                            <h2>Settings: </h2>
                            <Container className="flex flex-even">
                                <TextField className="btn-width" id="sorting-algorithm" select variant="outlined" label="Select Algorithm" value={this.state.algorithm} onChange={this.handleAlgorithmChange}>
                                    {algorithms.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField className="btn-width" id="sorting-speed" select variant="outlined" label="Select Speed" value={this.state.speed} onChange={this.handleSpeedChange}>
                                    {speeds.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Container>
                        </form>
                    </Container>
                    
                </Container>
            </div>
        )
    }
  }


export default DataInput
