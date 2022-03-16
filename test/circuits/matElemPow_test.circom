pragma circom 2.0.3;

include "../../circuits/matElemPow.circom";

template Example (m,n,p) {
    signal input a[m][n];
    signal output out[m][n];

    component comp = matElemPow(m,n,p);
    
    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            comp.a[i][j] <== a[i][j];
        }
    }

    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            out[i][j] <== comp.out[i][j];
        }
    }
}

component main = Example(2,3,5);