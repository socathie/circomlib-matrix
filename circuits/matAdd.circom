pragma circom 2.0.3;

// matrix addition
template matAdd (m,n) {
    signal input a[m][n];
    signal input b[m][n];
    signal output out[m][n];
    
    for (var i=0; i < m; i++) {
        for (var j=0; j < n; j++) {
            out[i][j] <== a[i][j] + b[i][j];
        }
    }
}