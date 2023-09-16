import './App.css';
import React, {useState} from 'react';

function App() {

  // so that you can't do multiple sorts while on is active
  let sorting = false;

  // used for total number of bars in the display
  const [totalNumBars, setNumBars] = useState(250);
  
  // hook for array of random values
  const [displayArr, setDispArr] = useState(Array.from({length: 250}, (_,index) => Math.floor(Math.random() * (250 - 5 + 1) + 5)));

  // used to change animation speed
  const [animSpeed, setAnimSpeed] = useState(2);

  // change array to new array with random values
  function generateNewArray() {
    setDispArr(Array.from({length: totalNumBars}, (_,index) => Math.floor(Math.random() * (totalNumBars - 5 + 1) + 5)));
  }

  // genare the divs that correspond to the values in the array
  function genArrDivs() {
    return displayArr.map((num, index) => 
      <div key={index} style={{height : ''+((num/totalNumBars)*100)+'%', backgroundColor: "#C0C0C0", width: ''+(100/totalNumBars)+'%'}} 
      className='num-bar'></div>
    )
  }

  function finalLoop(osc1, osc2) {
    let numBars = document.getElementsByClassName("num-bar");
    
    let kft = 0;
    for (let i = 0; i < numBars.length-1; i++) {
      setTimeout(() => {
        osc1.frequency.value = parseInt(numBars[i].style.height) * 20;
        osc2.frequency.value = parseInt(numBars[i+1].style.height) * 20;
        numBars[i].style.backgroundColor = "red";
        numBars[i+1].style.backgroundColor = "red";
      }, kft * 4);
      kft += animSpeed;
      setTimeout(() => {
        numBars[i].style.backgroundColor = "#C0C0C0";
        numBars[i+1].style.backgroundColor = "#C0C0C0";
      }, (kft + 5) * 4);
      kft += animSpeed;
    }
    setTimeout(() => {
      osc1.stop();
      osc2.stop();
      sorting = false;
    }, kft * 4)
  }

  // implementation of bubble-sort
  function bubbleSort() {

      if (sorting)
        return;
      else
        sorting = true;

      let numBars = document.getElementsByClassName("num-bar");
      let swapArr = displayArr;
      let n = swapArr.length;
      let animations = [];

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          
          animations.push(["comparison", j, j+1]);
          if (swapArr[j] > swapArr[j+1]) {

            animations.push(["swap", swapArr[j], swapArr[j+1], j, j+1]);

            let temp = swapArr[j+1];
            swapArr[j+1] = swapArr[j];
            swapArr[j] = temp;
          }
          animations.push(["re-color", j, j+1])
        }
      }

      const audioContext = new AudioContext();
      const gainNode = new GainNode(audioContext);

      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      gainNode.gain.value = 0.01;

      osc1.connect(gainNode).connect(audioContext.destination);
      osc2.connect(gainNode).connect(audioContext.destination);
  
      osc1.start();
      osc2.start();

      // animation for bubble-sort
      let kft = 0;
      for (let x of animations) {
        if (x[0] === "comparison") {
          setTimeout(() => {
            osc1.frequency.value = parseInt(numBars[x[1]].style.height) * 20;
            osc2.frequency.value = parseInt(numBars[x[2]].style.height) * 20;
            numBars[x[1]].style.backgroundColor = "red";
            numBars[x[2]].style.backgroundColor = "red";
          }, (kft) * 4);
          kft += animSpeed;
        } 
        else if (x[0] === "swap") {
          setTimeout(() => {
            numBars[x[3]].style.height = ''+((x[2]/totalNumBars)*100)+'%';
            numBars[x[4]].style.height = ''+((x[1]/totalNumBars)*100)+'%';
          }, (kft) * 4);
          kft += animSpeed;
        }
        else {
          setTimeout(() => {
            numBars[x[1]].style.backgroundColor = "#C0C0C0";
            numBars[x[2]].style.backgroundColor = "#C0C0C0";
          }, (kft) * 4);
          kft += animSpeed;
        }
      }
      setTimeout(() => {
        finalLoop(osc1, osc2)
      }, kft * 4) 
      setDispArr(swapArr);
    }

  // implementaion of insertion-sort
  function insertionSort() {

    if (sorting)
      return;
    else
      sorting = true;


    let numBars = document.getElementsByClassName("num-bar");
    let swapArr = displayArr;
    const n = swapArr.length;
    let animations = [];

    for (let i = 1; i < n; i++) {
      let key = swapArr[i];
      let j = i - 1;

      while (j >= 0 && swapArr[j] > key) {
        
        animations.push(["comparison", j, i]);
        animations.push(["swap", swapArr[j+1], swapArr[j], j+1, j]);

        swapArr[j+1] = swapArr[j];
        j--;  
      }
      animations.push(["swap", swapArr[j+1], key, j+1, i]);
      swapArr[j+1] = key;
    }

    const audioContext = new AudioContext();
    const gainNode = new GainNode(audioContext);

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    gainNode.gain.value = 0.01;

    osc1.connect(gainNode).connect(audioContext.destination);
    osc2.connect(gainNode).connect(audioContext.destination);

    osc1.start();
    osc2.start();
    
    // sorting animation for insertion-sort
    let kft = 0;
    for (let x of animations) {
      if (x[0] === "comparison") {
        setTimeout(() => {
          osc1.frequency.value = parseInt(numBars[x[1]].style.height) * 20;
          osc2.frequency.value = parseInt(numBars[x[2]].style.height) * 20;
          numBars[x[1]].style.backgroundColor = "red";
          numBars[x[2]].style.backgroundColor = "red";
        }, (kft) * 4);
        kft += animSpeed;
      }
      else {
        setTimeout(() => {
          numBars[x[3]].style.height = ''+((x[2]/totalNumBars)*100)+'%'
          numBars[x[4]].style.backgroundColor = "#C0C0C0";
          numBars[x[3]].style.backgroundColor = "#C0C0C0";
        }, (kft) * 4);
        kft += animSpeed;
      }
    }
    setTimeout(() => {
      finalLoop(osc1, osc2);
    }, kft * 4) 
    setDispArr(swapArr);
  }

  // implementation of merge-sort
  function mergeSort(arr, l, r) {
    if (l >= r) 
      return [];
    
    let m = l + parseInt((r-l)/2);
    return merge(arr, [...mergeSort(arr,l,m), ...mergeSort(arr,m+1,r)], l, m, r);
  }

  function merge(arr, anim, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      anim.push(["comparison", l+i, m+j]);
      if (L[i] <= R[j]) {
        anim.push(["change", k, L[i], l+i, m+j]);
        arr[k] = L[i];
        i++;
      }
      // R[j] > L[i]
      else {
        anim.push(["change", k, R[j], l+i, m+j]);
        arr[k] = R[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      anim.push(["change", k, L[i], l+i, m+j]);
      arr[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      anim.push(["change", k, R[j], l+i, m+j]);
      arr[k] = R[j];
      j++;
      k++;
    }

    return anim
  }

  function animateMerge(arr, animations) {
    let numBars = document.getElementsByClassName("num-bar");
    const audioContext = new AudioContext();
    const gainNode = new GainNode(audioContext);

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    gainNode.gain.value = 0.01;

    osc1.connect(gainNode).connect(audioContext.destination);
    osc2.connect(gainNode).connect(audioContext.destination);
    

    osc1.start();
    osc2.start();

    let kft = 0;
    for (let x of animations) {
      if (x[0] === "comparison") {
        setTimeout(() => {
          osc1.frequency.value = parseInt(numBars[x[1]].style.height) * 20;
          osc2.frequency.value = parseInt(numBars[x[2]].style.height) * 20;
          numBars[x[1]].style.backgroundColor = "red";
          numBars[x[2]].style.backgroundColor = "red";
        },(kft) * 4);
        kft += animSpeed;
      }
      else {
        setTimeout(() => {
          numBars[x[1]].style.height = ''+((x[2]/totalNumBars)*100)+'%'
          numBars[x[4]].style.backgroundColor = "#C0C0C0";
          numBars[x[3]].style.backgroundColor = "#C0C0C0";
        }, (kft) * 4);
        kft += animSpeed;
      }
    }
    setTimeout(() => {
      finalLoop(osc1, osc2);
    }, kft * 4)
    setDispArr(arr);
  }

  // quick-sort implementation
  function quickSort(arr, anim, l, r) {
    if (l < r) {
      let [pi, newAnim] = partition(arr, anim, l, r);

      return quickSort(arr, quickSort(arr, newAnim, l, pi - 1), pi + 1, r);
    }
    
    return anim;
  }

  function partition(arr, anim, l, r) {
    let pivot = arr[r];

    let i = l - 1;

    for (let j = l; j <= r - 1; j++) {
      anim.push(["comparison", j, r]);
      if (arr[j] < pivot) {
        i++;
        anim.push(["swap", i, j, arr[i], arr[j]]);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      anim.push(["color-fix", j, r]);
    }
    anim.push(["swap", i+1, r, arr[i+1], arr[r]]);
    let temp = arr[i+1];
    arr[i+1] = arr[r];
    arr[r] = temp;

    return [i+1, anim]
  }

  function animateQuick(arr, animations) {
    let numBars = document.getElementsByClassName("num-bar");
    const audioContext = new AudioContext();
    const gainNode = new GainNode(audioContext);

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    gainNode.gain.value = 0.01;

    osc1.connect(gainNode).connect(audioContext.destination);
    osc2.connect(gainNode).connect(audioContext.destination);

    osc1.start();
    osc2.start();

    let kft = 0;
    for (let x of animations) {
      if (x[0] === "comparison") {
        setTimeout(() => {
          osc1.frequency.value = parseInt(numBars[x[1]].style.height) * 20;
          osc2.frequency.value = parseInt(numBars[x[2]].style.height) * 20;
          numBars[x[1]].style.backgroundColor = "red";
          numBars[x[2]].style.backgroundColor = "red";
        },(kft) * 4);
        kft += animSpeed;
      }
      else if (x[0] === "color-fix") {
        setTimeout(() => {
          numBars[x[1]].style.backgroundColor = "#C0C0C0";
          numBars[x[2]].style.backgroundColor = "#C0C0C0";
        },(kft) * 4);
        kft += animSpeed; 
      }
      else {
        setTimeout(() => {
          numBars[x[1]].style.height = ''+((x[4]/totalNumBars)*100)+'%';
          numBars[x[2]].style.height = ''+((x[3]/totalNumBars)*100)+'%';
          numBars[x[1]].style.backgroundColor = "#C0C0C0";
          numBars[x[2]].style.backgroundColor = "#C0C0C0";
        }, (kft) * 4);
        kft += animSpeed;
      }
    }
    setTimeout(() => {
      finalLoop(osc1, osc2);
    }, kft * 4)
    setDispArr(arr);
  }

  function heapSort(arr) {
    const n = arr.length;
    let animations = [];

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      animations = heapify(arr, n, i, animations);
    }

    for (let j = n - 1; j > 0; j--) {
      animations.push(["swap", j, 0, arr[j], arr[0]]);

      let temp = arr[0];
      arr[0] = arr[j];
      arr[j] = temp;

      animations = heapify(arr, j, 0, animations);
    }
    
    animateHeap(arr, animations);
  }

  function heapify(arr, n, i, anims) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) {
      anims.push(["comparison", l, largest]);
      anims.push(["color-fix", l, largest]);
      largest = l;
    }

    if (r < n && arr[r] > arr[largest]) {
      anims.push(["comparison", r, largest]);
      anims.push(["color-fix", r, largest]);
      largest = r;
    }

    if (largest !== i) { 
      anims.push(["swap", i, largest, arr[i], arr[largest]]);
      
      let temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      return heapify(arr, n, largest, anims);
    }

    return anims;
  }

  function animateHeap(arr, animations) {
    let numBars = document.getElementsByClassName("num-bar");
    const audioContext = new AudioContext();
    const gainNode = new GainNode(audioContext);

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    gainNode.gain.value = 0.01;

    osc1.connect(gainNode).connect(audioContext.destination);
    osc2.connect(gainNode).connect(audioContext.destination);

    osc1.start();
    osc2.start();

    let kft = 0;
    for (let x of animations) {
      if (x[0] === "comparison") {
        setTimeout(() => {
          osc1.frequency.value = parseInt(numBars[x[1]].style.height) * 20;
          osc2.frequency.value = parseInt(numBars[x[2]].style.height) * 20;
          numBars[x[1]].style.backgroundColor = "red";
          numBars[x[2]].style.backgroundColor = "red";
        },(kft) * 4);
        kft += animSpeed;
      }
      else if (x[0] === "color-fix") {
        setTimeout(() => {
          numBars[x[1]].style.backgroundColor = "#C0C0C0";
          numBars[x[2]].style.backgroundColor = "#C0C0C0";
        },(kft) * 4);
        kft += animSpeed;
      }
      else {
        setTimeout(() => {
          numBars[x[1]].style.height = ''+((x[4]/totalNumBars)*100)+'%';
          numBars[x[2]].style.height = ''+((x[3]/totalNumBars)*100)+'%';
          numBars[x[1]].style.backgroundColor = "#C0C0C0";
          numBars[x[2]].style.backgroundColor = "#C0C0C0";
        }, (kft) * 4);
        kft += animSpeed;
      }
    }
    setTimeout(() => {
      finalLoop(osc1, osc2);
    }, kft * 4)
    setDispArr(arr);
  }

  return (
    <div id="sort-container">
      <div id="button-container">
        
        <button onClick={() => 
        { if (sorting) {return;} generateNewArray()}}> New Array </button>
        <button onClick={() => bubbleSort()}> Bubble-Sort </button>
        <button onClick={() => insertionSort()}> Insertion-Sort </button>
        
        <button onClick={() => {if (sorting) {return;} else {sorting = true;} 
          let swapArr = displayArr; 
          let animations = mergeSort(swapArr, 0, displayArr.length-1); 
          animateMerge(swapArr, animations);}}> Merge-Sort
        </button>
        
        <button onClick={() => {if (sorting) {return;} else {sorting = true;}
          let swapArr = displayArr; 
          let animations = quickSort(swapArr, [], 0, swapArr.length-1);
          animateQuick(swapArr, animations);}}> Quick-Sort
        </button>
        
        <button onClick={() => {if (sorting) {return;} else {sorting = true;}
          let swapArr = displayArr; heapSort(swapArr);
          }}>Heap-Sort
        </button>
        
        <div className="input-container">
          <label># of Array Elements: {totalNumBars}</label>
          <input type="range" min="100" max="1000" step="1" value={totalNumBars} 
          onChange={e => {if (!sorting) {setNumBars(Number(e.target.value)); generateNewArray();}}}
          onClick={e => {if (!sorting) {setNumBars(Number(e.target.value)); generateNewArray();}}}/>
        </div>
        <div className="input-container">
          <label>Animation Speed: {animSpeed}</label>
          <input type="range" min="0.5" max="8" step="0.1" value={animSpeed} 
          onChange={e => {if (!sorting) {setAnimSpeed(Number(e.target.value))}}} 
          onClick={e => {if (!sorting) {setAnimSpeed(Number(e.target.value))}}}/>
        </div>
      </div>
      <div id="visual-border">
        <div id="visual-container">
          {genArrDivs()}    
        </div>
      </div>
    </div>
  );
}

export default App;
