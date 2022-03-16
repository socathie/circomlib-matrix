pragma circom 2.0.3;

include "../../circuits/transpose.circom";

template Example (m,n) {
    signal input a[m][n];
    signal output out[n][m];

    component comp = transpose(m,n);

    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            comp.a[i][j] <== a[i][j];
        }
    }
    
    for (var i=0; i < n; i++) {
        for (var j=0; j < m; j++) {
            out[i][j] <== comp.out[i][j];
        }
    }
}

component main = Example(2,3);