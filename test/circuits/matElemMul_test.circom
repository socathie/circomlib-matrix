pragma circom 2.0.3;

include "../../circuits/matElemMul.circom";

template Example (m,n) {
    signal input a[m][n];
    signal input b[m][n];
    signal output out[m][n];

    component comp = matElemMul(m,n);
    
    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            comp.a[i][j] <== a[i][j];
            comp.b[i][j] <== b[i][j];
        }
    }

    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            out[i][j] <== comp.out[i][j];
        }
    }
}

component main = Example(2,3);