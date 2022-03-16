pragma circom 2.0.3;

include "../../circuits/outer.circom";

template Example (m,n) {
    signal input a[m];
    signal input b[n];
    signal output out[m][n];

    component comp = outer(m,n);

    for (var i=0; i < m; i++) {
        comp.a[i] <== a[i];
    }

    for (var i=0; i < n; i++) {
        comp.b[i] <== b[i];
    }
    
    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            out[i][j] <== comp.out[i][j];
        }
    }
}

component main = Example(2,3);

/* INPUT = {
    "a": ["1","2"],
    "b": ["3","4","5"]
} */