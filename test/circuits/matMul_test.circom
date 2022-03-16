pragma circom 2.0.3;

include "../../circuits/matMul.circom";

template Example (m,n,p) {
    signal input a[m][n];
    signal input b[n][p];
    signal output out[m][p];

    component comp = matMul(m,n,p);

    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            comp.a[i][j] <== a[i][j];
        }
    }
    
    for (var i=0; i < n; i++) {
        for (var j=0; j < p; j++) {
            comp.b[i][j] <== b[i][j];
        }
    }

    for (var i=0; i < m; i++) {
        for (var j=0; j < p; j++) {
            out[i][j] <== comp.out[i][j];
        }
    }
}

component main = Example(2,3,2);