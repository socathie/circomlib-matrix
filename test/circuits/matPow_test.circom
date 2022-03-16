pragma circom 2.0.3;

include "../../circuits/matPow.circom";

template Example (n,p) {
    signal input a[n][n];
    signal output out[n][n];

    component comp = matPow(n,p);
    
    for (var i=0; i < n; i++) {
        for (var j=0; j < n; j++) {
            comp.a[i][j] <== a[i][j];
        }
    }

    for (var i=0; i < n; i++) {
        for (var j=0; j < n; j++) {
            out[i][j] <== comp.out[i][j];
        }
    }
}

component main = Example(3,3);

/* INPUT = {
    "a": [["1","2","3"],["4","5","6"],["7","8","9"]]
} */