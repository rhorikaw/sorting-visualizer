import DataInput from "./dataEntry";
import Button from '@mui/material/Button'       //'@material-ui/core/Button'
import Container from '@mui/material/Container' //'@material-ui/core';

// Algorithms
import selectionSort from "../algorithms/SelectionSort";
import insertionSort from "../algorithms/InsertionSort";
import bubbleSort from "../algorithms/BubbleSort";
import cocktailSort from "../algorithms/CocktailSort";
import heapSort from "../algorithms/HeapSort";
import quickSort from "../algorithms/QuickSort";
import mergeSort from "../algorithms/MergeSort";
import radixSort from "../algorithms/RadixSort";
import gnomeSort from "../algorithms/GnomeSort";


import React from 'react';

import "../styles.css";


function generateListFromString(numStr){
    return numStr.split(",").map(x=>+x);
}

function generateStringFromList(numList){
    var strToReturn = "";
    for(var i = 0; i < numList.length; i++){
        if( i !== numList.length - 1){
            strToReturn += numList[i] + ","
        } else{
            strToReturn += numList[i] + ""
        }
    }
    return strToReturn;
}

function swapIndexVals(arr, f_index, s_index){
    var temp = arr[f_index];
    arr[f_index] = arr[s_index];
    arr[s_index] = temp;
}

function swapStringValues(numStr, f_index, s_index){
    var list = generateListFromString(numStr);
    swapIndexVals(list, f_index, s_index);
    return generateStringFromList(list);
}

function setStringValue(numStr, index, value){
    var list = generateListFromString(numStr);
    list[index] = value;
    return generateStringFromList(list);
}

function calculateOffset(listLen){
    return (100.5 - listLen)/2;
}

function BarGroup(props){
    let barPadding = 2;
    let heightScale = d => d/2;
    let height = heightScale(props.data);
    let xMid = props.barHeight
    return(
        <>
            <rect className={"bar-color"} id={props.id} x={barPadding * 0.5} height={height} width={props.barHeight - barPadding} />
            <text className={"value-label flip rotate"}y={xMid-13} x={-1*(height)} alignmentBaseline={"middle"}>{props.data}</text>
        </>
    )
}

class App extends React.Component{
    interval = null;

    constructor(props){
        super(props);
        this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.state = {
            values: '',
            algorithm: 'SEL',
            refresh: false,
            speed: 80,
            left: -1,
            right: -1,
        }
    }

    clearAnimation(){
        if(this.timeOut !== null){
            clearTimeout(this.timeOut);
        }
    }

    forceStop(){
        if(this.interval !==  null){
            this.selectPivotRange(-1, -1, generateListFromString(this.state.values).length);
            clearInterval(this.interval);
        }
    }

   animateFinish(){
       const arr = generateListFromString(this.state.values);
       for(let index = 0; index < arr.length; index++){
           setTimeout( () => {
                document.getElementById(`bar-${index}`).className.baseVal = "bar-color-done"
           }, this.state.speed * index)
       }
   }

   selectPivotRange(start, end, arr_len){
        for(let i = 0; i < arr_len; i++){
            if(i >= start && i <= end){
                document.getElementById(`bar-${i}`).className.baseVal = "bar-color-select"
            }else{
                document.getElementById(`bar-${i}`).className.baseVal = "bar-color"
            }
        }
   }

    animateSelectionSort(comparisons){
        var last_left, last_right;
        var i = 0;
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.selectPivotRange(-1, -1, generateListFromString(this.state.values).length);
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i];
                if(comparison[2] === 0){
                    if(last_left !== undefined && last_left !== null){
                        document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color"
                    }
                    if(last_right !== undefined){
                        document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color"
                    }
                    last_left = comparison[0]
                    last_right = comparison[1]
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color-current"
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color-select"
                }else{
                    this.setState({
                        values: swapStringValues(this.state.values, comparison[0], comparison[1])
                    })
                }
            }
            i++;
        }, this.state.speed)
    }

    animateInsertionSort(comparisons){
        var last_i, last_j;
        var i = 0;
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.selectPivotRange(-1, -1, generateListFromString(this.state.values).length);
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i]
                if(comparison[2] === null){
                    if(last_i !== undefined && last_i !== null){
                        document.getElementById(`bar-${last_i}`).className.baseVal = "bar-color"
                    }
                    if(last_j !== undefined){
                        document.getElementById(`bar-${last_j}`).className.baseVal = "bar-color"
                    }
                    this.setState({
                        values: swapStringValues(this.state.values, comparison[0], comparison[1])
                    })
                    
                    last_i = comparison[0]
                    last_j = comparison[3]
                    document.getElementById(`bar-${last_i}`).className.baseVal = "bar-color-select"
                    document.getElementById(`bar-${last_j}`).className.baseVal = "bar-color-current"
                }else{
                    this.setState({
                        values: setStringValue(this.state.values, comparison[0], comparison[2])
                    })
                }
            }
            i++;
        }, this.state.speed)
    }

    animateBubbleSort(comparisons){
        var last_left, last_right;
        var i = 0;
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i]
                if(last_left !== undefined){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color"
                }
                if(last_right !== undefined && last_right !== null){
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color"
                }
                last_left = comparison[0]
                last_right = comparison[1]
                document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color-select"
                document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color-current"

                if(comparison[2] !== 0){
                    if(comparison[2] !== null){
                        this.setState({
                            values: swapStringValues(this.state.values, comparison[0], comparison[1])
                        })
                    }
                }
            }
            i++;
        }, this.state.speed);
        
        
    }

    animateCocktailSort(comparisons){
        var last_left, last_right;
        var i = 0; 
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.animateFinish();               
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i]
                if(last_left !== undefined){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color"
                }
                if(last_right !== undefined && last_right !== null){
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color"
                }
                last_left = comparison[0]
                last_right = comparison[1]
                if(comparison[3]){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color-select"
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color-current"
                }else{
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color-current"
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color-select"
                }
                

                if(comparison[2] === 1){
                    this.setState({
                        values: swapStringValues(this.state.values, comparison[0], comparison[1])
                    })
                }
            }
            i++;
        }, this.state.speed);
    }

    animateHeapSort(comparisons){
        var last_left,last_max;
        var i = 0;
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.selectPivotRange(-1, -1, generateListFromString(this.state.values).length);
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i]
                if(last_left !== undefined && last_left !== null && last_left < generateListFromString(this.state.values).length){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color"
                }
                
                last_left = comparison[0]
                if(last_left < 100){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color-select"
                }
                if(comparison[2] === -1){
                    if(last_max !== undefined && last_max !== comparison[2]){
                        document.getElementById(`bar-${last_max}`).className.baseVal = "bar-color"
                    }
                    last_max = comparison[1];
                    document.getElementById(`bar-${last_max}`).className.baseVal = "bar-color-current"
                }

                if(last_left < 100 && comparison[2] !== 0){
                    this.setState({
                        values: swapStringValues(this.state.values, comparison[0], comparison[1])
                    })
                }
            }
            i++;
        }, this.state.speed);
    }

    animateQuickSort(comparisons){
        var last_left, last_right, pivot;
        var i = 0;
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.selectPivotRange(-1, -1, generateListFromString(this.state.values).length);
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i]
                if(last_left !== undefined && last_left !== null && last_left >= 0){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color"
                }
                if(last_right !== undefined && last_right !== null){
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color"
                }
                if(pivot !== undefined && pivot !== null && pivot !== comparison[2]){
                    document.getElementById(`bar-${pivot}`).className.baseVal = "bar-color"
                }

                last_left = comparison[0]
                last_right = comparison[1]
                pivot = comparison[2]

                this.selectPivotRange(last_left, last_right, generateListFromString(this.state.values).length);

                if(pivot !== undefined && pivot !== null){
                    document.getElementById(`bar-${pivot}`).className.baseVal = "bar-color-pivot"
                }
                if(comparison[3] === 1){
                    this.setState({
                        values: swapStringValues(this.state.values, comparison[0], comparison[1])
                    })
                }
            }
            i++;
        }, this.state.speed);
    }

    animateMergeSort(comparisons){
        var last_left, last_right;
        var i=0;
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i];
                if(last_left !== undefined && last_left !== null && last_left < generateListFromString(this.state.values).length){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color"
                }
                if(last_right !== undefined && last_right !== null && last_right < generateListFromString(this.state.values).length){
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color"
                }
                last_left = comparison[0]
                document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color-select"

                if(comparison.length !== 3){
                    last_right = comparison[1];
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color-select"
                }else{
                    this.setState({
                        values: setStringValue(this.state.values, comparison[0], comparison[1])
                    })
                }
            }
            i++;
        }, this.state.speed);
    }

    animateRadixSort(comparisons){
        var last_index;
        var i=0;
        this.interval = setInterval( () => {
            if(i === comparisons.length ){
                this.selectPivotRange(-1, -1, generateListFromString(this.state.values).length);
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i];
                if(last_index !== undefined && last_index !== null){
                    document.getElementById(`bar-${last_index}`).className.baseVal = "bar-color"
                }
                last_index = comparison[0]
                document.getElementById(`bar-${last_index}`).className.baseVal = "bar-color-select"
                if(comparison[1] !== null){
                    this.setState({
                        values: setStringValue(this.state.values, comparison[0], comparison[1])
                    })
                }
            }
            i++;
        }, this.state.speed);
    }

    animateGnomeSort(comparisons){
        var last_left, last_right;
        var i=0;
        this.interval = setInterval( () => {
            if(i === comparisons.length){
                this.selectPivotRange(-1, -1, generateListFromString(this.state.values).length);
                this.animateFinish();
            }else if(i > comparisons.length){
                clearInterval(this.interval);
            }else{
                const comparison = comparisons[i]
                if(last_left !== undefined){
                    document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color"
                }
                if(last_right !== undefined && last_right !== null){
                    document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color"
                }
                last_left = comparison[0]
                last_right = comparison[1]
                document.getElementById(`bar-${last_left}`).className.baseVal = "bar-color-select"
                document.getElementById(`bar-${last_right}`).className.baseVal = "bar-color-current"

                if(comparison[2] !== 0){
                    this.setState({
                        values: swapStringValues(this.state.values, comparison[0], comparison[1])
                    })
                }
            }
            i++;
        }, this.state.speed);
    }

    visualize(){
        var arr,comparisons;
        arr = generateListFromString(this.state.values)
        if(this.state.algorithm === "SEL"){
            comparisons = selectionSort(arr);
            this.animateSelectionSort(comparisons);
        }else if(this.state.algorithm === "INS"){
            comparisons = insertionSort(arr);
            this.animateInsertionSort(comparisons);
        }else if(this.state.algorithm === "BUB"){
            comparisons = bubbleSort(arr);
            this.animateBubbleSort(comparisons);
        }else if(this.state.algorithm === "COC"){
            comparisons = cocktailSort(arr);
            this.animateCocktailSort(comparisons);
        }else if(this.state.algorithm === "HEA"){
            comparisons = heapSort(arr, arr.length);
            this.animateHeapSort(comparisons);
        }else if(this.state.algorithm === "QUI"){
            comparisons = quickSort(arr, 0, arr.length-1)
            this.animateQuickSort(comparisons);
        }else if(this.state.algorithm === "MER"){
            comparisons = mergeSort(arr, 0, arr.length-1);
            this.animateMergeSort(comparisons);
        }else if(this.state.algorithm === "RAD"){
            comparisons = radixSort(arr);
            this.animateRadixSort(comparisons);
        }else if(this.state.algorithm === "GNO"){
            comparisons = gnomeSort(arr);
            this.animateGnomeSort(comparisons);
        }
    }

    handleAlgorithmChange(algo){
        this.setState({algorithm: algo});
    }

    handleSpeedChange(spd){
        this.setState({
            speed: spd});
    }

    handleValueChange(vals){
        this.setState({values: vals}, () => {
            const numList = generateListFromString(vals)
            for(let i = 0; i < numList.length; i++){
                let barElem = document.getElementById(`bar-${i}`);
                barElem.className.baseVal = "bar-color";
            }
        })
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
        let barHeight = 10;
        let offset = calculateOffset(generateListFromString(this.state.values).length);
        return(
            <div>
                <DataInput values={this.state.values} algorithm={this.state.algorithm} onAlgorithmChange={this.handleAlgorithmChange} onSpeedChange={this.handleSpeedChange} onValueChange={this.handleValueChange}></DataInput>
                <div>
                    <Container maxWidth='lg'>
                        <Container maxWidth='lg'>
                            <h2 className="center">Simulate Sorting</h2>
                            <br></br>
                            <svg className="flex flex-center visualizer" width="91%" height="500px" transform="scale(1,-1)" >
                                {generateListFromString(this.state.values).map((value, index) => (
                                    <g className="bar-group" transform={`translate( ${(index+ offset)*barHeight}, 0)`}>
                                        <BarGroup id={`bar-${index}`} data={value} barHeight={barHeight}/>
                                    </g>
                                ))}
                            </svg>
                            <br></br>
                            <Container className="flex flex-even">
                                <Button className="button-mgn" variant="contained" onClick={() => {this.forceStop()}}>Stop</Button>
                                <Button className="button-mgn" variant="contained" onClick={() => {this.visualize()}}>Visualize</Button>
                            </Container>
                        </Container>
                        
                    </Container>
                </div>
            </div>
        )
    }
}


export default App;
