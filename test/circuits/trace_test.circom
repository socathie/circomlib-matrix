pragma circom 2.0.3;

include "../../circuits/trace.circom";

template Example (m) {
    signal input a[m][m];
    signal output out;

    component comp = trace(m);
    
    for (var i=0; i < m; i++) {
        for (var j=0; j < m; j++) {
            comp.a[i][j] <== a[i][j];
        }
    }

    out <== comp.out;
}

component main = Example(3);

/* INPUT = {
    "a": [["1","2","3"],["4","5","6"],["7","8","9"]]
} */