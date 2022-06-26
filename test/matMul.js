const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Matrix multiplication test", function () {
    this.timeout(100000000);

    it("should a 2 by 3 matrix with a 3 by 2 matrix", async () => {
        const circuit = await wasm_tester(path.join(__dirname, "circuits", "matMul_test.circom"));
        //await circuit.loadConstraints();
        //assert.equal(circuit.nVars, 25);
        //assert.equal(circuit.constraints.length, 12);

        const INPUT = {
            "a": [["1","2","3"],["4","5","6"]],
            "b": [["1","2"],["3","4"],["5","6"]]
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        //console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1*1+2*3+3*5)));
        assert(Fr.eq(Fr.e(witness[2]),Fr.e(1*2+2*4+3*6)));
        assert(Fr.eq(Fr.e(witness[3]),Fr.e(4*1+5*3+6*5)));
        assert(Fr.eq(Fr.e(witness[4]),Fr.e(4*2+5*4+6*6)));
    });
});