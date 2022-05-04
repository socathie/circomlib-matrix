pragma circom 2.0.3;

include "../../circuits/matPow.circom";

component main = matPow(3,3);

/* INPUT = {
    "a": [["1","2","3"],["4","5","6"],["7","8","9"]]
} */